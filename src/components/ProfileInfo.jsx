/* eslint-disable react/prop-types */
import Followers from "../components/Followers";
import Following from "../components/Following";
import { AiOutlineEdit } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { FaTrashAlt} from "react-icons/fa";
import Modal from "../components/Modal"
import { useState, useEffect } from "react"
import '../../src/Scrollbar.css'; // Tell webpack that Button.js uses these styles
import { useFirebase } from "../../firebase/Firebase";

const ProfileInfo = (props) => {
  const firebase = useFirebase();

  const [displayName, setDisplayName] = useState(props.displayName)
  const [bio, setBio] = useState(props.bio)
  const [trashOpen, setTrashOpen] = useState(false)
  const [followersOpen, setFollowersOpen] = useState(false)
  const [followingOpen, setFollowingOpen] = useState(false)
  const [usernameOpen, setUsernameOpen] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState("")
  const [PW, setPW] = useState("")


    // change follower/following counts here
  var followers = props.followers.length;
  var following = props.following.length; 

    //change bio here

  //this is the variable that is used for the input field

  const deletefunc = () => {
    firebase.deleteSelf(PW)
  }

  const handleSubmitBio = (newb) => {
    if (newb !== bio && newb !== "" ) {
    firebase.updateBio(newb.toString()).then(() => {
      setBio(newb)
    }) } else alert("Please enter a new valid bio")
  }

  const handleSubmitDisplayName = () => {
    if (newDisplayName !== displayName && newDisplayName !== "" ) {
      firebase.updateDisplayName(newDisplayName).then(() => {
        setDisplayName(newDisplayName)
      }) } else alert ("Please enter a new valid username")
  }

  


  useEffect(() => {
    setBio(props.bio)
    setDisplayName(props.displayName)
  }, [setBio, props.bio, setDisplayName, props.displayName])

  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
  return (
    <div className="w-3/4 h-[30rem] my-5 pt-2 shadow-2xl rounded-3xl overflow-hidden relative hidden bg-black/30 lg:flex items-start justify-start flex-col text-white">
      <div className='font-bold text-2xl px-5 pt-3 my-2'>
        My Profile
        </div>
      <div className="flex flex-row w-full h-16 px-5 justify-between my-2">

        <div className='flex w-36 h-16 cursor-pointer  bg-black/20 hover:bg-gray-700 transition-colors rounded-xl flex-col items-center justify-evenly' onClick={() => setFollowersOpen(true)}>

            {/* followers */}
            <div className=' text-xs text-white/60 '>
                Followers
            </div>
            <div className=' text-3xl font-bold text-white '>
                {kFormatter(followers)}
            </div>

        </div>
        <div onClick={() => setFollowingOpen(true)} className='flex w-36 h-16 cursor-pointer bg-black/20 hover:bg-gray-700 rounded-xl flex-col items-center justify-evenly'>
            {/* following */}
            <div className=' text-xs text-white/60 '>
                Following
            </div>
            <div className=' text-3xl font-bold text-white '>
                {kFormatter(following)}
            </div>

        </div>
        


      </div>

      <div onClick={() => setBioOpen(true)} className='flex flex-row  items-center font-bold text-2xl px-5 pt-3 my-1 mb-3'>
      
      Bio

      <AiOutlineEdit
            fontSize={24}
            className=" text-white/60 hover:text-white/40 transition-colors cursor-pointer mx-2"
          />

    </div>
    <p className='px-5 text-white/80'>

    {bio}

    </p>
    
{/* 
    <div className='flex flex-row  items-center font-bold text-2xl px-5 pt-3 my-1'>
      
      Dark Mode

    </div>

    <div className = "px-5 pt-3 my-1">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer"/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">      
          
          <CgDarkMode
            fontSize={24}
            className=" text-white/60 hover:text-white/40 transition-colorscursor-pointer mx-2"
          />
          
          </span>
        </label>
    </div> */}
    <div onClick={() => setUsernameOpen(true)} className='flex flex-row  items-center font-bold text-2xl px-5 pt-3 my-1 mb-3'>
      
      Username 

      <AiOutlineEdit
            fontSize={24}
            className="hover:text-white/40 transition-colors text-white/60 cursor-pointer mx-2"
          />

    </div>

    <span className='px-5 text-white/60'>
        {displayName}
    </span>

    
    <div className='flex w-3/4 self-center m-6 h-12 bg-red-600 hover:bg-red-700 transition-colors text-red-200 rounded-xl items-center justify-center cursor-pointer' onClick={() => setTrashOpen(true)}>
        Delete Account

    </div>

    {/* Trash Popup */}
      <Modal open={trashOpen} onClose={() => setTrashOpen(false)}>
        <div className="text-center w-56" >
          <FaTrashAlt size={56} className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-300">Confirm Delete</h3>
            <p className="text-sm text-gray-400">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            <input
              type="password"
              maxLength={150}
              placeholder="Enter Password to Delete"
              onChange={(e) => setPW(e.target.value)}
              value={PW}
              className="w-full my-3 bg-transparent border border-gray-900 rounded px-2 text-sm outline-none py-2 placeholder:text-gray-300"
              required
              
            />
          </div>
          <div className="flex gap-4">
            <button className=" w-full  p-3 rounded-xl bg-red-500"
            onClick={deletefunc}
            > 
            Delete
            </button>

            <button
              className=" w-full p-3 rounded-xl shadow-3xl shadow-red-500 bg-gray-200 text-red-600"
              onClick={() => setTrashOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>


    {/* Followers Popup */}
    <Modal open={followersOpen} onClose={() => setFollowersOpen(false)}>
        <div className="text-center w-96" >

          <div className="mx-auto my-4 w-88 flex flex-col items-center justify-center">
            <h3 className="text-lg font-black text-gray-300">Followers</h3>
            <Followers followers={props.followers}/>
          </div>

        </div>
      </Modal>


    {/* Following Popup */}
    <Modal open={followingOpen} onClose={() => setFollowingOpen(false)}>
    <div className="text-center w-96" >

    <div className="mx-auto my-4 w-88 flex flex-col items-center justify-center">
    <h3 className="text-lg font-black text-gray-300">Following</h3>
    <Following following={props.following}/>
    </div>

    </div>
      </Modal>

    {/* Username Popup */}
    <Modal open={usernameOpen} onClose={() => {
      setUsernameOpen(false)
      document.getElementById('usernameInput').value = ""
      }}>
    <div className="text-center w-[24rem]" >

<div className="mx-auto flex flex-col items-center justify-center mb-2 w-[22rem]">
  <h3 className="text-lg font-black text-gray-300 mb-2"> Change Username</h3>
  <p className="mb-5 text-gray-400  italic">
    Usernames can be changed once every century

  </p>

  <input
    
    type="text"
    className="w-full lg:h-12 h-64 bg-black/40 mx-2 mb-2  rounded-lg p-4 text-gray-300 outline-none text-xs lg:text-sm"
    placeholder= "Write your new username here"
    maxLength={20}
    onChange={(e) =>( setNewDisplayName(e.target.value))}
    id="usernameInput"
    />

  <p className="mb-4 self-start ml-1 text-sm text-gray-300/90">
    Current username: {displayName}
  </p>

</div>

<div className="flex gap-4">
<button
    className=" w-full p-3 rounded-xl shadow-3xl shadow-red-500 bg-red-500/90 text-white"
    onClick={() => {
      
      setUsernameOpen(false);
      setNewDisplayName("")
  }
}
  >
    Cancel
  </button>
  <button className=" w-full  p-3 rounded-xl bg-green-700"
  //add onclick function here for delete account functionality
  onClick={() => {
      handleSubmitDisplayName()
      setUsernameOpen(false);
  }
}
  > 
  Confirm
  </button>


</div>
</div>
      </Modal>


    {/* Bio Popup */}
    <Modal open={bioOpen} onClose={() => {
      setBioOpen(false)
      document.getElementById('bioInput').value = bio
      }}>
        <div className="text-center w-[24rem]" >

          <div className="mx-auto flex flex-col items-center justify-center mb-2 w-[22rem]">
            <h3 className="text-lg font-black text-gray-300 mb-5"> Edit Bio</h3>
            <textarea
              
              type="text"
              className="w-full lg:h-64 h-64 bg-black/40 mx-2 mb-3  rounded-lg p-4 text-gray-300 outline-none text-xs lg:text-sm"
              placeholder= "Write your bio"
              maxLength={100}
              defaultValue={bio}
             

              id="bioInput"
              >
              </textarea>
          </div>
          
          <div className="flex gap-4">
          <button
              className=" w-full p-3 rounded-xl shadow-3xl shadow-red-500 bg-red-500/90 text-white"
              onClick={() => {
                
                setBioOpen(false);
            }
        }
            >
              Cancel
            </button>
            <button className=" w-full  p-3 rounded-xl bg-green-700"
            //add onclick function here for delete account functionality
            onClick={() => {
                handleSubmitBio(document.getElementById('bioInput').value)
                setBioOpen(false);
            }
        }
            > 
            Confirm
            </button>


          </div>
        </div>
      </Modal>







    </div>
    
  )
}

export default ProfileInfo