/* eslint-disable no-unused-vars */
import { HiOutlineHome } from "react-icons/hi";
import { GoBell } from "react-icons/go";
import Select from 'react-select'
import { MdAccountCircle } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FaAngleDown, FaPowerOff } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

import { IoPersonOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase/Firebase";



function TopHeader(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [filters, setFilters] = useState([])
  const navigate = useNavigate();
  const firebase = useFirebase();
  const id = firebase.userId;
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 45) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      
      background: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexWrap: 'nowrap',
      borderColor: state.isFocused ? 'transparent' : 'transparent',
      width: '25rem',
      color: 'rgb(209 213 219)'
    }),
    option: (provided,state) => ({
      ...provided,
      
      background : state.isFocused ? 'rgba(0,0,0,0)' : 'rgba(0, 0, 0, 0.3)',
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
      
      background : 'rgba(0, 0, 0, 0.3)',
      
    }),
    multiValueLabel: (provided,) => ({
      ...provided,
      
      color : 'white',
      
    }),
  
    
    menu: (provided) => ({
      ...provided,
      background: 'rgba(23, 37, 84, 0.94)',
      width: '100%',
      color: 'white',
    }),
};

  const options = [
    { value: 'League of Legends', label: 'League of Legends', type: "game" },
    { value: 'Rocket League', label: 'Rocket League', type: "game" },
    { value: 'Valorant', label: 'Valorant', type: "game" },
    { value: 'Fortnite', label: 'Fortnite', type: "game" },
    { value: 'Apex Legends', label: 'Apex Legends', type: "game" },
    { value: 'Other: FPS', label: 'Other: FPS', type: "game" },
    { value: 'Other: Singleplayer', label: 'Other: Singleplayer', type: "game" },
    { value: 'Other: Strategy', label: 'Other: Strategy', type: "game" },
    { value: 'Other', label: 'Other', type: "game" },
    { value: 'Peak', label: 'Peak', type: "tag" },
    { value: 'Funny', label: 'Funny', type: "tag" },
    { value: 'Clutch', label: 'Clutch', type: "tag" },
    { value: 'Ranked', label: 'Ranked', type: "tag" },
    { value: 'Casual', label: 'Casual', type: "tag" },
    { value: 'Toxic', label: 'Toxic', type: "tag" },
    { value: 'Wholesome', label: 'Wholesome', type: "tag" },

  ]

  const [notificationsOpen, setNotificationsOpen] = useState(true)
  const notifications = [
    {
      id: 43128188132,
      date: "1 day ago",
      name: "Violet Moore",
      action: "Liked your post",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 174119235182,
      date: "3 days ago",
      name: "Beatrice Soto",
      action: "Started following you",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 13242143,
      date: "5 days ago",
      name: "Mittie Steele",
      action: "Liked your post",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 171544119,
      date: "1 weeks ago",
      name: "Herbert McLaughlin",
      action: "Mentioned you",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 55191,
      date: "3 weeks ago",
      name: "Martha Parker",
      action: "Liked your post",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 922494,
      date: "1 month ago",
      name: "Kyle Young",
      action: "Wants you in his basement",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 171544119,
      date: "1 weeks ago",
      name: "Herbert McLaughlin",
      action: "Mentioned you",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 55191,
      date: "3 weeks ago",
      name: "Martha Parker",
      action: "Liked your post",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 922494,
      date: "1 month ago",
      name: "Kyle Young",
      action: "Wants you in his basement",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 171544119,
      date: "1 weeks ago",
      name: "Herbert McLaughlin",
      action: "Mentioned you",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 55191,
      date: "3 weeks ago",
      name: "Martha Parker",
      action: "Liked your post",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 922494,
      date: "1 month ago",
      name: "Kyle Young",
      action: "Wants you in his basement",
      img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },

  ];
  return (
    <div
      className={`${
        scroll
          ? " w-full flex items-center justify-around py-5 sticky top-0 z-50 bg-blue-950/90 "
          : " w-full flex items-center justify-around py-5 sticky top-0 z-50"
      }`}
    >
      {/*  logo and Search input */}
      <span className=" w-auto lg:w-1/2 flex items-center justify-center relative ">
        {/* <span
          className="lg:w-12 lg:h-10 w-7 h-7 bg-white rounded-3xl shadow-md mx-2 lg:mx-5 cursor-pointer flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <span
            className="lg:w-5 lg:h-5 w-3 h-3 bg-[#cab651] cursor-pointer"
            onClick={() => navigate("/")}
          ></span>
        </span> */}
        <button onClick={()=>navigate("/")}><img src="/sq.png" className="w-20 cursor-pointer"/></button>
        <span className="lg:mx-5 lg:flex hidden w-full">
          {/* <input
            type="text"
            className="bg-gray-700 hidden lg:flex w-11/12 sm:w-full md:w-1/2 h-8 outline-none border-2 text-gray-300 px-3 text-sm border-gray-700 shadow-2xl rounded-md"
            placeholder="#Explore"
          /> */}
            <Select 
            className="lg:w-1/3"
            isMulti = {true}
            options={options}
            styles={customStyles}
            value={filters}
            placeholder = "#Explore"
            onChange={(e) => {
              // eslint-disable-next-line react/prop-types
              let empty = []
              e.forEach(element => {
                empty.push(element.label)
              });
              // eslint-disable-next-line react/prop-types
              props.changeFilters(empty)
              console.log(empty)
              setFilters(e)
            }}
   />
        </span>
        {/* <span
          className="absolute left-8 top-0 lg:block hidden w-1 h-6 bg-black -rotate-45 cursor-pointer"
          onClick={() => navigate("/")}
        ></span> */}
      </span>

      {/*  menu buttons */}
      <span className=" w-auto lg:w-1/6 flex items-center justify-center absolute">
        <HiOutlineHome
          className="text-yellow-400 cursor-pointer text-2xl font-extrabold mx-3 lg:mr-7"
          onClick={() => navigate("/")}
        />
        
        <IoPersonOutline className="text-yellow-400 cursor-pointer text-2xl font-extrabold mx-3 lg:mx-7" onClick={()=> navigate(`/users/${id}`)}/>
        {/* <GoBell onClick={() => setNotificationsOpen(!notificationsOpen)} className="text-white cursor-pointer text-lg mx-3 lg:mx-7" /> */}
        {notificationsOpen ? (

          <div></div>
        )
        :
        (
          <div className="w-80  h-96 max-h-96 p-1 overflow-y-scroll absolute flex flex-row justify-center items-center translate-x-1/4 rounded-lg bg-black/90 top-20">

<div className='w-full '>
    


    <div className="w-full  my-2 bg-black/30 shadow-md rounded-3xl p-2 overflow-hidden relative hidden lg:flex items-center justify-center flex-col text-white">
    {/* <span className="w-full px-5 font-bold text-xl flex items-center justify-start overflow-y-auto my-2">
      Comments
    </span> */}
    <div className="mb-[28rem]"></div>
    {notifications.map((item) => {
      return (
        <div key={item.id} className="w-full h-full px-1">
          <span className="w-full bg-gray-900 rounded-lg shadow-lg my-1 flex items-start justify-center flex-col">
            <span className="w-full flex items-center justify-start p-1  relative">
              <img
                src={item.img}
                alt=""
                className="w-5 h-5 border-2 border-gray-300 mx-5 rounded-lg cursor-pointer"
                onClick={() => navigate(`users/${item.id}`)}
              />
              <div className='flex flex-col'>
                <div className='flex flex-row w-full justify-start items-center '>
                  <h1
                    className="text-xs text-gray-300 font-semibold cursor-pointer my-1 mr-2"
                    onClick={() => navigate(`users/${item.id}`)}
                  >
                    {item.name}
                  </h1>
                  <h1 className='text-[11px] text-white/60'> {item.date}</h1>
                  
                </div>
                <p className='text-sm text-white/60 mb-2'>

                {item.action}
                </p>
              </div>

            </span>
          </span>
        </div>
      );
    })}
  </div>

</div>


          </div>
          

        )
      }
        
      </span>

      {/* user menu  */}
      <span onClick={() => setShowMenu(!showMenu)} className="w-auto  md:w-2/6 flex items-center justify-start md:justify-end cursor-pointer p-1 relative  z-50">
        <span
          className=" w-16 mr-1 lg:w-48 h-12 shadow-md bg-black/40 flex items-center justify-center rounded-md"
          
        >
          {!firebase.url ? (
            <img
              src="/user.png"
              alt="userPic"
              className="w-9 h-5/6 object-cover rounded-lg "
            />
          ) : (
            <img
              src={firebase.url}
              alt="userPic"
              className="w-9 h-5/6 object-cover rounded-lg "
            />
          )}

          {!firebase.name ? (
            <h2 className="text-[10px] text-white mx-2 font-semibold lg:flex hidden">
              {firebase.email}
            </h2>
          ) : (
            <h2 className="text-xs text-white mx-2 font-semibold lg:flex hidden">
              {firebase.name}
            </h2>
          )}
          <FaAngleDown className="mx-1 text-white" />
        </span>
        {/* dropdown menu */}
        {showMenu && (
          <div className="absolute w-full md:w-32 h-48  top-2 right-0 md:right-4  flex items-center justify-center flex-col">
            <li
              className="w-36 h-1/4 bg-blue-950 shadow flex  items-center justify-start list-none px-1 text-white text-xs font-bold hover:bg-black/40 transition-all duration-300"
              onClick={() => {

                navigate(`/users/${id}`);
                setShowMenu(false);
              }}
            >
              <MdAccountCircle fontSize={16} className="mx-2" />
              Profile
            </li>
            {/* <li
              className="w-36 h-1/4 bg-black/90 shadow flex items-center justify-start list-none px-1 text-white text-xs font-bold hover:bg-gray-900 transition-all duration-300"
              onClick={() => setShowMenu(false)}
            >
              <BiHelpCircle fontSize={16} className="mx-2" />
              Help
            </li>
            <li
              className="w-36 h-1/4 bg-black/90 shadow flex items-center justify-start list-none px-1 text-white text-xs font-bold hover:bg-gray-900 transition-all duration-300"
              onClick={() => setShowMenu(false)}
            >
              <FiSettings fontSize={16} className="mx-2" />
              Setting
            </li> */}
            <li 
            className="w-36 h-1/4 bg-blue-950 shadow flex items-center justify-start list-none px-1 text-white text-xs font-bold hover:bg-gray-900 transition-all duration-300" 
            onClick={() => { 
              firebase.LoggedOut()
              navigate("/login") }
            }>
              <FaPowerOff fontSize={16} className="mx-2" />
              Log Out
            </li>
          </div>
        )}
      </span>
    </div>
  );
}

export default TopHeader;
