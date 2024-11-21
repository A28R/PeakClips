/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import { useFirebase } from "../../firebase/Firebase";



function Followers(props) {
  const firebase = useFirebase()

  const navigate = useNavigate();
  const followers = props.followers
  const [followerData, setFollowerData] = useState(null)
  useEffect(() => {
    const empty = []
    let usableUrl = ""
    followers.forEach(i => {
      
      
      // console.log(i.data())
      firebase.getUserData(i.data().sender).then((pr) => {
        if (pr.photoUrl) firebase.getImageURL(pr.photoUrl).then((url) => usableUrl = url);
       empty.push({
          id: i.data().sender,
          photoUrl: usableUrl,
          userName: pr.displayName
        })
        
      })
      
    })
    if (followerData === null) setFollowerData(empty)
    console.log(followerData)
    
    
  });
  // const request = [
  //   {
  //     id: 43128188132,
  //     name: "Violet Moore",
  //     img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  //   },
    
  // ];

  return (
    
    <div className="w-full my-4 h-108 max-h-[32rem] bg-black/30 overflow-auto scrollbar-thumb-red-500 scrollbar-track-red-300 shadow-md rounded-3xl p-2 relative hidden lg:flex items-center justify-center flex-col text-white">

      {followerData && followerData.map((item) => {
        return (
          <div key={item.id} className="w-full  px-5">
            <span className="w-full h-[3rem] bg-black/40 rounded-lg shadow-lg my-2 flex items-start justify-center flex-col">
              <span className="w-full h-full flex items-center justify-between p-2  relative">
              {item.photoUrl ? (<img
                  src={item.photoUrl}
                  alt=""
                  className="w-10 h-10 border-2 border-gray-300 mx-1 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/users/${item.id}`)}
                />) : (<img
                  src="/user.png"
                  alt=""
                  className="w-10 h-10 border-2 border-gray-300 mx-1 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/users/${item.id}`)}
                />)}
                <h1
                  className="text-xs text-gray-300 font-semibold cursor-pointer"
                  onClick={() => navigate(`/users/${item.id}`)}
                >
                  {item.userName}
                </h1>
                {/* <button className="bg-yellow-300 font-semibold text-xs text-gray-700 px-3 py-1 my-1 rounded-xl">
                  Unfollow
                </button> */}

              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Followers;
