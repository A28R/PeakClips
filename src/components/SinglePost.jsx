/* eslint-disable react/prop-types */
import { BsThreeDotsVertical, BsFillSendFill } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart  } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "../../firebase/Firebase";
import {MdOutlineExpandMore, MdOutlineExpandLess} from 'react-icons/md'
import Comments from "./Comments"
import Modal from "../components/Modal"

function SinglePost(props) {
  const [url, setUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("")
  const [likes, setLikes] = useState(null)
  const [uid, setUid] = useState("")
  const [commentValue, setCommentValue] = useState("")
  const [posterData, setPosterData] = useState("")
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState(null)
  const [likeLoading, setLikeLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  // const currDate = props.createdTime.toLocaleDateString();
  // const currTime = props.createdTime.toLocaleTimeString();
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.handleComment(commentValue, props.id)
    setCommentValue("")

  }

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!uid) setUid(firebase.userId.toString())
    if (likes === null) firebase.getLikes(props.id).then((pr)=>{
      setLikes([])
      setLikes(pr.docs)
      pr.docs.forEach(element => {
        if (element.data().sender == firebase.userId) setLiked(true)
      });
    })
    if(props.imageUrl) firebase.getImageURL(props.imageUrl).then((url) => setUrl(url));
    async function getPosterData(uid) {
      const posterData = await firebase.getUserData(uid)
      setPosterData(posterData)
      if (posterData.photoUrl) firebase.getImageURL(posterData.photoUrl).then((url) => setPosterUrl(url));
    }
    async function getComments() {
      const comments = await firebase.getComments(props.id)
      setComments(comments.docs)
    }
    if (!posterData) getPosterData(props.userID)
    if (!comments) getComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleClick(){
    // const prevLikes = [...likes]
    // if(likes.toString().indexOf(uid) > -1) {
    //   setLikes(likes.splice(likes.toString().indexOf(uid), 1))
    //   console.log(likes)
    //   } else {
    //     setLikes(likes.push(uid.toString()))
    //   }
    if (!likeLoading) {
    if (!liked) {
      setLiked(true)
      setLikeLoading(true)
      firebase.handleLike(props.id).then((pr) => {
        setLikeLoading(false)
        setLikes(pr.docs)
      }) } else {
        setLiked(false)
        setLikeLoading(true)
        firebase.handleUnlike(props.id).then((pr) => {
          setLikeLoading(false)
          setLikes(pr.docs)
          
        })
      }
    }
  }

  return (
    <div
      className=" bg-black/20 w-full lg:px-4 py-2 my-3  rounded-3xl flex items-center justify-center flex-col"
      // eslint-disable-next-line react/prop-types
      //key={props.id}
    >
      {/* post top section  */}
      <span className="w-full flex items-center justify-center my-2">
        <span className="w-1/6 flex items-center justify-center">
          {!posterUrl ? (
            <img
              // eslint-disable-next-line react/prop-types
              src="/user.png"
              alt="userPic"
              className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 bg-gray-500 border-gray-500 cursor-pointer"
              // eslint-disable-next-line react/prop-types
              onClick={() => navigate(`/users/${props.userID}`)}
            />
          ) : (
            <img
              // eslint-disable-next-line react/prop-types
              src={posterUrl}
              alt="userPic"
              className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 border-gray-500 cursor-pointer"
              // eslint-disable-next-line react/prop-types
              onClick={() => navigate(`/users/${props.userID}`)}
            />
          )}
        </span>
        <span className="w-3/4  flex items-start justify-center  flex-col">
          <h3
            className="mx-2 text-gray-400 text-xs cursor-pointer font-semibold my-1"
            // eslint-disable-next-line react/prop-types
            onClick={() => navigate(`/users/${props.userID}`)}
            // eslint-disable-next-line react/prop-types
          >
            {posterData.displayName}
          </h3>

          <h3
            className="mx-2 text-gray-200 text-xs lg:text-sm cursor-pointer font-semibold flex items-center justify-center"
            onClick={() => navigate(`/users/${props.userID}`)}
          >
            <span className="mx-2 text-xs text-gray-500 flex items-center justify-center">
              {" "}
             
                <p className="mx-2"> {props.createdDate}</p>
                <p> {props.createdTime}</p>
            </span>
          </h3>
        </span>

        <span className="w-full h-3/4 flex justify-end flex-wrap ">
        {props.tags.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center  cross mx-1"
            >
              <span className="capitalize bg-black/20 px-4 p-2 text-xs text-white font-semibold rounded-xl ">
                {item}
              </span>
              
            </div>
          );
        })}
        
            <div
              
              className="flex items-center justify-center  cross mx-1"
            >
              <span className="capitalize bg-black/30 px-4 p-2 text-xs text-white font-semibold rounded-xl ">
                {props.game}
              </span>
              
            </div>
          
        
      </span>

        {props.userID == firebase.userId && <span className="w-1/12  ml-8 mx-5 flex items-center justify-center">
          <IoTrashOutline
            fontSize={22}
            className="text-red-500 cursor-pointer my-2 "
            onClick={() => setDeleteOpen(true)}
          />
        </span>}
      </span>
      <span className="text-white text-[24px] lg:text-m w-full px-5 my-2 font-light tracking-wider">
        {/* eslint-disable-next-line react/prop-types */}
        {props.title}
      </span>
      {/* post image section  */}
      {url &&
      <span className="w-full object-cover px-5 my-4">
        {!url ? (
          <img
            src=""
            className="w-full h-72 bg-gray-600 rounded-lg dark:bg-gray-600 border-none"
          />
        ) : (
          <img
            src={url}
            alt="post"
            className="w-full h-1/2 object-cover rounded-2xl"
          />
        )}
      </span>
      /*Video section */
      }


      {props.videoUrl &&
      <span className="aspect-video w-full">
      <iframe src={props.videoUrl} frameBorder="0" className="h-full w-full rounded-lg" width="200%" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </span>
      }
      {/* like comment  */}

      <span className="w-full flex items-center justify-start text-white px-5 my-1 border-b border-gray-700 py-3">
        
        
        <label >
          {liked ? (
          <AiFillHeart fontSize={19} className="ml-5 mr-3 cursor-pointer" /> )
          : (
            <AiOutlineHeart fontSize={19} className="ml-5 mr-3 cursor-pointer" />
          )}
          <button className="hidden" onClick={handleClick} />


          
        </label>
        {likes && likes.length}
        <FaRegCommentDots fontSize={19} className="ml-5 mr-3 cursor-pointer" />
        {comments && comments.length}
       
      </span>

      {/* comments part  */}
      <span className="w-full px-1 py-2 flex items-center justify-center">
        {!firebase.url ? (
          <img
            src="/user.png"
            alt="userPic"
            className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 border-gray-500 cursor-pointer"
          />
        ) : (
          <img
            src={firebase.url}
            alt="userPic"
            className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 border-gray-500 cursor-pointer"
          />
        )}
        <form onSubmit={handleSubmit} className="w-full  items-center justify-center h-full">
          <span className="flex items-center justify-end w-full lg:w-full my-3">
            <input
              type="text"
              placeholder="Write your comment"
              className="w-full mx-4 text-gray-200 outline-none bg-black/20 h-9 rounded-lg text-sm px-3 placeholder:text-gray-600"
              maxLength={100}
              onChange={(e) => setCommentValue(e.target.value)}
              value={commentValue}
            />
            <label className=" w-1/5 flex items-center justify-center  bg-[#fbe161] px-3 rounded-xl cursor-pointer py-2 ml-0" >
                <BsFillSendFill className="text-blue-900 mx-1" />
                <h3 className="text-blue-900 font-bold text-xs">Submit</h3>
                <input
                      type="submit"
                      className="hidden"
                      onClick={()=>{
                        alert("Your comment has been submitted.")
                      }}
                    />
              </label>
          </span>
        </form>
      </span>
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
    <div className="text-center w-56" >
      <IoTrashOutline size={56} className="mx-auto text-red-500" />
      <div className="mx-auto my-4 w-48">
        <h3 className="text-lg font-black text-gray-300">Confirm Delete</h3>
        <p className="text-sm text-gray-400">
          Are you sure you want to delete this post?
        </p>

      </div>
      <div className="flex gap-4">
        <button className=" w-full  p-3 rounded-xl text-white bg-red-500"
        onClick={()=>{
          firebase.deletePost(props.id, props.photoUrl)
          setDeleteOpen(false)
          alert("Post has been deleted, refresh the page.")

        }
        }
        > 
        Delete
        </button>

        <button
          className=" w-full p-3 rounded-xl shadow-3xl shadow-red-500 bg-gray-200 text-red-600"
          onClick={() => setDeleteOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
      <div className="w-full flex flex-col justify-start items-center">

          <div className="flex flex-row justify-center items-center  py-2 px-6 hover:bg-black/20 cursor-pointer transition-colors rounded-lg">
            <div onClick={() => setCommentsOpen(!commentsOpen)} className="text-lg font-bold text-white select-none">Comments</div>
            { commentsOpen ? (
            <div className="text-xl font-bold text-white "><MdOutlineExpandLess/></div>)
            :
            (
              <div className="text-xl font-bold text-white "><MdOutlineExpandMore/></div>
            )

            }
          </div>
         {commentsOpen?   
        (<Comments comments={comments} />)
      :
      (
        <div></div>
      )
      
      }
      </div>
      
    </div>





  );
}

export default SinglePost;
