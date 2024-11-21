import { BsImage, BsFillSendFill  } from "react-icons/bs";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useFirebase } from "../../firebase/Firebase";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { ImCross} from "react-icons/Im"
import { HiOutlineTag } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
import Select from 'react-select'


function NewpostUploader() {
  const [cover, setCover] = useState("");
  const [disc, setDisc] = useState("");
  const [value, setValue] = useState("Post")
  const [refresh, setRefresh] = useState(false)
  const [uploadVideo, setUploadVideo] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [tags, setTags] = useState([])
  const [game, setGame] = useState(null)
  const [addGame, setAddGame] = useState(false)
  const [addTags, setAddTags] = useState(false)


  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    if (!cover && !videoUrl) {
     alert("Post needs either a photo or video!")
    } else {
    setValue("Posting..");
    e.preventDefault()
    const yay = await firebase.handleCreatePost(disc, cover, videoUrl, game, tags)
    if (yay == "Post successfully created!") {
    
    setValue("Posted!")
    setTimeout(() => {
      document.getElementById('myInput').value = ""
      setCover(null)
      setVideoUrl(null)
      setDisc(null)
      setValue("Post")
      setRefresh(true)
      setGame(null)
      setTags(null)
    }, 800) } else {
      alert(yay)
      setValue("Post")
    }
  }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      
      background: 'rgb(55 65 81)',
      display: 'flex',
      flexWrap: 'nowrap',
      borderColor: state.isFocused ? 'transparent' : 'transparent',
      width: '13rem',
      color: 'rgb(209 213 219)'
    }),
    option: (provided,state) => ({
      ...provided,
      
      background : state.isFocused ? ' rgb(107 114 128)' : 'rgb(55 65 81)',
    }),

    input: (provided,state) => ({
      ...provided,
      borderColor : state.isFocused ? 'rgb(253 224 71': 'transparent',
      color : 'rgb(209 213 219)',
    }),
    placeholder: (provided) => ({
      ...provided,
      
      color : 'rgb(209 213 219)',
    }),
    dropdownIndicator: (provided,) => ({
      ...provided,
      
      color : 'white',
      
    }),
    multiValue: (provided,) => ({
      ...provided,
      
      background : 'rgb(107 114 128)',
      
    }),
    multiValueLabel: (provided,) => ({
      ...provided,
      
      color : 'white',
      
    }),
    singleValue: (provided,) => ({
      ...provided,
      
      color: 'white',
      
    }),
    singleValueLabel: (provided,) => ({
      ...provided,
      
      color : 'white',
      
    }),
  
    
    menu: (provided) => ({
      ...provided,
      background: 'rgb(55 65 81)',
      width: '100%',
      color: 'white',
    }),
};

  const gameOptions = [
    { value: 'League of Legends', label: 'League of Legends' },
    { value: 'Rocket League', label: 'Rocket League' },
    { value: 'Valorant', label: 'Valorant' },
    { value: 'Fortnite', label: 'Fortnite' },
    { value: 'Apex Legends', label: 'Apex Legends' },
    { value: 'Other: FPS', label: 'Other: FPS' },
    { value: 'Other: Singleplayer', label: 'Other: Singleplayer' },
    { value: 'Other: Strategy', label: 'Other: Strategy' },
    { value: 'Other', label: 'Other' },
  ]

  const tagOptions = [
    { value: 'Peak', label: 'Peak' },
    { value: 'Funny', label: 'Funny' },
    { value: 'Clutch', label: 'Clutch' },
    { value: 'Ranked', label: 'Ranked' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Toxic', label: 'Toxic' },
    { value: 'Wholesome', label: 'Wholesome' },
  ]


  const isYoutubeUrl = (urlTest) => {
    // eslint-disable-next-line no-useless-escape
    // var ytRegex = new RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm
    // )
    // return ytRegex.test(urlTest)
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = urlTest.match(regExp);
    return (match&&match[7].length==11)? "https://www.youtube.com/embed/"+ match[7] : false;
  }
  function refreshPage(){ 
    window.location.reload(); 
  }
  

  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    
      <div className="w-full lg:w-4/5  rounded-xl px-3 py-2  bg-black/30  flex items-center justify-center flex-col">
        <form onSubmit={handleSubmit} className="w-full  items-center justify-center h-full">
        <span className="flex items-center justify-center w-full">
          {!firebase.url ? (
            <img
              src="/user.png"
              alt=""
              className="lg:w-12 bg-black lg:h-12 w-10 h-10 rounded-2xl border-2 border-gray-500 object-cover overflow-hidden "
            />
          ) : (
            <img
              src={firebase.url}
              alt=""
              className="lg:w-12 lg:h-12 w-10 h-10 rounded-2xl border-2 border-gray-500 object-cover overflow-hidden"
            />
          )}
          
            <input
              type="text"
              className="w-3/4 lg:h-9 h-8 bg-black/40 mx-2  rounded-lg px-4 text-gray-300 outline-none text-xs lg:text-sm"
              placeholder="Title your post here"
              maxLength={40}
              onChange={(e) => setDisc(e.target.value)}
              required
              id="myInput"
            />
                    </span>
                    {cover &&
            <span className="flex items-center justify-center w-full  my-5">

              <img src={file} className="w-1/3" />
            </span>
                    }
                    {videoUrl && !uploadVideo &&
            <span className="flex items-center justify-center w-full my-5">

              <iframe className="w-2/3 h-72" src={videoUrl}/>
            </span>
                    }


                    <span className=" flex flex-row items-center justify-center w-full my-3">
            
            <label
              className="flex items-center justify-center  bg-black/40 px-3 rounded-lg cursor-pointer py-2  lg:mr-8"
            >
              <BsImage className="text-green-600 mx-1" />
              <h3 className="text-white text-xs">Photo</h3>
              <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      setCover(e.target.files[0])
                      console.log(cover)
                      setVideoUrl(null)
                      handleChange(e)
                    }}
                  />
            </label>
                    {/* <h3 className="text-white/80 text-xs"> OR </h3> */}
            <label
              className="flex items-center justify-center  bg-black/40 px-3 rounded-lg cursor-pointer py-2 mr-1 lg:mr-8"
              htmlFor="video"
            >
              {/* <input type="file" id='video' className='hidden' accept="video/mp4,video/mkv, video/x-m4v,video/*"/> */}
              <MdOutlineSlowMotionVideo
                fontSize={18}
                className="text-blue-600 mx-1"
              />
              <h3 className="text-white text-xs">Video</h3>
              <input
                    type="button"
                    id="video"
                    className="hidden"
                    onClick={() => {setAddGame(false); setAddTags(false); setUploadVideo(true) }}
                  />
            </label>

            <label className="flex items-center justify-center  bg-black/40 px-3 rounded-lg cursor-pointer py-2 mr-1 lg:mr-8">
              <HiOutlineTag fontSize={18} className="text-orange-600 mx-1" />
              <h3 className="text-white text-xs">Tags</h3>
              <input
                    type="button"
                    id="video"
                    className="hidden"
                    onClick={() => {setAddGame(false); setAddTags(true); setUploadVideo(false) }}
                  />
            </label>
            <label className="flex items-center justify-center  bg-black/40 px-3 rounded-lg cursor-pointer py-2 lg:mr-4 lg:ml-4" title="Label the game you're posting about! (Required)">
              <IoGameControllerOutline  className="text-yellow-600 mx-1" 
              />
              <input
                    type="button"
                    id="video"
                    className="hidden"
                    onClick={() => {setAddGame(true); setAddTags(false); setUploadVideo(false) }}
                  />
              <h3 className="text-white text-xs">Game</h3>
            </label>
            <label className="flex items-center justify-center  bg-[#fbe161] px-3 rounded-lg cursor-pointer ml-8 py-2" onClick={handleSubmit}>
              <BsFillSendFill className="text-blue-950 mx-1" />
              <h3 className="text-blue-950 font-bold text-xs">{value}</h3>
              <input
                    type="submit"
                    className="hidden"
                    value={value}
                    // onClick={()=>{
                    //   handleSubmit()
                    // }}
                  />
            </label>
            { refresh ? 
            <label className="flex items-center justify-center cursor-pointer py-2 ml-8 mr-0">
              <MdRefresh className="text-white mx-0 text-xl" />
              <input type="button" className="hidden" onClick={refreshPage} />
            </label> : <label className="hidden" /> }
          
        </span>

        </form>
        
    
      
    {uploadVideo && (

        <form
          className="w-full flex items-center justify-center h-full"
          onSubmit={(e) => {
            e.preventDefault()
            if (isYoutubeUrl(videoUrl)) {
            setVideoUrl(isYoutubeUrl(videoUrl))
            setUploadVideo(false)
            setCover(null)
            return true
            } else {
             alert("Please Input a Valid YouTube URL")
             return false
            }
            
          }}
        >
          <div className="md:w-1/2  bg-gray-800 relative shadow-lg rounded-md flex items-center justify-center flex-col my-2 text-white pt-6 pb-1 px-5">
            
            <input
              type="text"
              maxLength={150}
              placeholder="YouTube URL"
              onChange={(e) => setVideoUrl(e.target.value)}
              value={videoUrl}
              className="w-full my-3 bg-gray-700 border border-gray-900 rounded px-2 text-sm outline-none py-2 placeholder:text-gray-300"
              required
            />

            <input
              type="submit"
              className="bg-blue-400 px-5 py-2 my-4 text-white font-semibold rounded-md cursor-pointer submit"
              value="Submit"
            />
            <ImCross
              fontSize={15}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setUploadVideo(false)
                setVideoUrl("")
              }}
            />
          </div>
        </form>

    )}
    {addGame && (

        <form
          className="w-full flex items-center justify-center h-full"
          onSubmit={(e) => {
            e.preventDefault()
           
            
          }}
        >
          <div className="md:w-1/2 mt-3 p-3  bg-gray-800 relative shadow-lg rounded-md flex items-center justify-center flex-col text-white px-3">
            
            <Select options={gameOptions} 
            value={game}
            styles={customStyles}
            onChange={(e) => {
              setGame(e)
              console.log(game)
            }}/>
            <ImCross
              fontSize={15}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setAddGame(false)
              }}
            />
          </div>
        </form>

    )}
    {addTags && (

        <form
          className="w-full flex items-center justify-center h-full"
          onSubmit={(e) => {
            e.preventDefault()
           
            
          }}
        >
          <div className="md:w-1/2 mt-3 p-3 bg-gray-800 relative shadow-lg rounded-md flex items-center justify-center flex-col text-white px-3">
            
            <Select options={tagOptions} 
            value={tags}
            isMulti
            styles={customStyles}
            onChange={(e) => {
              setTags(e)
              console.log(tags)
            }}
            />
            <ImCross
              fontSize={15}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setAddTags(false)
              }}
            />
          </div>
        </form>

    )}
  </div>
              
              
    
  );
}

export default NewpostUploader;
