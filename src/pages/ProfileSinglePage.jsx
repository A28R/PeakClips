import { useEffect, useState } from "react";
// import {useSearchParams, useMatch, useResolvedPath} from "react-router-dom"
import NewpostUploader from "../components/NewpostUploader";
import Post from "../components/Post";
import ProfileInfo from "../components/ProfileInfo";
import {useParams } from "react-router-dom"
import { LuImagePlus } from "react-icons/lu";
import { useFirebase } from "../../firebase/Firebase";



function ProfileSinglePage() {
  let { id } = useParams();
  let [userData, setUserData] = useState(null)
  const [pUrl, setPUrl] = useState(null)
  const [bUrl, setBUrl] = useState(null)
  const [following, setFollowing] = useState(false)
  const [userFollowing, setUserFollowing] = useState(null)
  const [userFollowers, setUserFollowers] = useState(null)
  const [thisId, setThisId] = useState(null)
  const firebase = useFirebase();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getUserData(uid) {
      const userData = await firebase.getUserData(uid)
      setUserData(userData)
      if (userData.photoUrl) firebase.getImageURL(userData.photoUrl).then((url) => setPUrl(url))
      if (userData.bannerUrl) firebase.getImageURL(userData.bannerUrl).then((url) => setBUrl(url))
        setThisId(uid)
    }
    async function getUserFollowers(uid) {
      const userFollowers = await firebase.getFollowers(uid)
      setUserFollowers(userFollowers.docs)
      userFollowers.docs.forEach(element => {
        if (element.data().sender == firebase.userId) setFollowing(true)
      });
    }
    async function getUserFollowing(uid) {
      const userFollowing = await firebase.getFollowing(uid)
      setUserFollowing(userFollowing.docs)
      
    }
    if (userData == null || (thisId && thisId != id) ) getUserData(id)
    if (userFollowers === null || (thisId && thisId != id)) getUserFollowers(id)
    if (userFollowing === null || (thisId && thisId != id)) getUserFollowing(id)
  
  
    
  } );

  const setPhoto = (e) => {
    console.log(e)
    firebase.updatePhotoUrl(e).then((pr) => {
      firebase.getImageURL(pr).then((url) => setPUrl(url)
    )})
  }

  const setBanner = (e) => {
    firebase.updateBannerUrl(e).then((pr) => {
      firebase.getImageURL(pr).then((url) => setBUrl(url)
    )})
  }


  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

  const handleFollow = () => {
    setFollowing(true)
    firebase.handleFollow(id, "followers").then((pr) => {
      setUserFollowers(pr.docs)
    })
  }
  const handleUnfollow = () => {
    setFollowing(false)
    firebase.handleUnfollow(id, "followers").then((pr) => {
      setUserFollowers(pr.docs)
    })
  }




 return (
    userData &&
    <div className="w-full bg-black/10  flex items-center justify-center flex-col">
      
      <span className="w-full  lg:w-11/12 mt-4 flex bg-black rounded-2xl items-center justify-center relative">
        {!bUrl ? (
          <img
            src="/user.png"
            alt=""
            className="w-full h-96 object-contain   rounded-2xl overflow-hidden shadow-md relative"
          />
        ) : (
          <img
            src={bUrl}
            alt=""
            className="w-full h-96 object-cover rounded-2xl transition-opacity duration-300 bg-black hover:opacity-60 overflow-hidden shadow-md relative"
          />
        )} 
      
        {!pUrl ? (
          <img
            src="/user.png"
            alt=""
            className="w-36 h-36 absolute left-2/4 bg-black -translate-x-1/2 -bottom-20 border-8 border-gray-900 rounded-2xl object-cover"
          />
        ) : (
          <img
            src={pUrl}
            alt=""
            className="w-36 h-36 absolute left-2/4 -translate-x-1/2 -bottom-20 border-8 border-gray-900 rounded-2xl object-cover"
          />
        )}
        {firebase.userId === id && 
        <div>
          
          <div className="flex flex-col items-center justify-center opacity-0  bg-black/70 hover:opacity-100 transition w-32 h-32 absolute left-2/4 -translate-x-1/2 -bottom-[72px] rounded-lg">
          
            <input type="file" id="image" className="hidden" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} />
            <label htmlFor="image">
              <LuImagePlus
                fontSize={35}
                className="flex text-white/80 cursor-pointer"
              />
            </label>
           </div>
          
          <input type="file" id="image2" className="hidden" accept="image/*" onChange={(e)=>setBanner(e.target.files[0])}/>
          <label htmlFor="image2">
            <LuImagePlus
              fontSize={25}
              className="absolute right-3 text-white bottom-2 cursor-pointer"
            />
          </label>
        </div>
        }
      </span> 


      


      {id === firebase.userId && userData && userFollowing && userFollowers ? (
      <div className="w-full flex items-start justify-center mt-24">
      {/* Left Side Components */}



  
        <div className="hidden lg:flex items-center justify-center flex-col p-3 w-0 md:w-1/4 sticky left-0 top-16">
        <ProfileInfo {...userData} followers={userFollowers} following={userFollowing}/>
          
        </div>

  
        <div className="flex items-center justify-center flex-col   w-full lg:w-1/2 gap-5">
  
          <NewpostUploader />
          <Post id="user" user={id}/>
        </div>

  
        <div className="hidden lg:flex items-center justify-center flex-col  p-3 w-1/4 sticky right-0 top-16">
            
        </div>
        </div>

)
:
(<div className="w-full flex flex-col items-center justify-center">
  
    <div className="w-2/3 flex flex-col items-center justify-center mt-24">
    <div className="w-full h-[18rem] bg-black/30 rounded-xl mb-10 flex flex-col justify-start items-center">
  
      <div className="bg-black/20rounded-lg w-1/2 h-1/4 mt-5 flex flex-col p-1 justify-center items-center text-white">
  
            <span className="font-bold text-3xl">{userData.displayName}</span>
  
            <span className="text-white/80">June 5th, 2024</span>
  
        </div>
  
      <div className="flex flex-row w-full h-3/5 justify-center items-center">
  
        <div className="w-3/6 h-5/6 rounded-lg p-5 m-5 text-white bg-black/20 flex flex-col justify-center items-center">
        <span className="font-bold text-2xl">Bio</span>
        <span className="text-white/80 px-4  text-center my-3">{userData.bio}</span>
  
        </div>
  
  
        <div className="w-2/6 h-5/6 my-5 bg-black/20 p-2 rounded-lg flex gap-2 flex-col justify-around items-center">
  
          <div className="flex flex-row w-full h-1/2 justify-evenly items-center">
          <div className='flex w-1/2 h-[4rem] mx-2 cursor-pointer  bg-black/30 transition-colors rounded-xl flex-col items-center justify-evenly' >
  
              {/* followers */}
              <div className=' text-xs text-white/60 '>
                  Followers
              </div>
              <div className=' text-3xl font-bold text-white '>
                  {kFormatter(userFollowers && userFollowers.length)}
              </div>
  
          </div>
          <div  className='flex w-1/2 h-[4rem] mx-2 cursor-pointer bg-black/30  rounded-xl flex-col items-center justify-evenly'>
              {/* following */}
              <div className=' text-xs text-white/60 '>
                  Following
              </div>
              <div className=' text-3xl font-bold text-white '>
                  {kFormatter(userFollowing && userFollowing.length)}
              </div>
  
          </div>
  
          </div>
  
          {!following ? (
          <button  className='flex w-1/2 h-[3rem] mx-2 cursor-pointer  hover:bg-yellow-600  transition-colors shadow-md bg-yellow-500/90 rounded-xl flex-col items-center justify-evenly'
          onClick={()=>handleFollow()}>
              {/* following */}
  
              <div className=' text-xl font-bold text-white '>
                  Follow
              </div>
  
          </button>) : (
            <button  className='flex w-1/2 h-[3rem] mx-2 cursor-pointer  hover:bg-red-600  transition-colors shadow-md bg-red-500/90 rounded-xl flex-col items-center justify-evenly'
            onClick={()=>handleUnfollow()}>
            {/* following */}

            <div className=' text-xl font-bold text-white '>
                Unfollow
            </div>

        </button>
          )}
  
        </div>
  
  
  
  
      </div>
  
  
  
  
      </div>
    </div>
    <div className="flex items-center justify-center flex-col   w-full lg:w-1/2 gap-3">
  
  <Post id="user" user={id}/>
</div>

</div>
)}

</div>

    
  );
}

export default ProfileSinglePage;
