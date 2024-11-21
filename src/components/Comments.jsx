/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from "react-router-dom";

// import { useEffect, useState } from "react";

function Comments(props) {
  

  const navigate = useNavigate();
  const comments = props.comments
  






  return (
  <div className='w-full flex flex-row justify-center items-center'>
    

{comments.length>0? (  
      <div className="w-full  my-2 bg-black/10 shadow-md rounded-3xl p-2 overflow-hidden relative hidden lg:flex items-center justify-center flex-col text-white">
      {/* <span className="w-full px-5 font-bold text-xl flex items-center justify-start overflow-y-auto my-2">
        Comments
      </span> */}

      {comments.map((item) => {
        
        const itemData = item.data()
        return (
          <div key={item.id} className="w-full px-3">
            <span className="w-full bg-black/20 rounded-lg shadow-lg my-2 flex items-start justify-center flex-col">
              <span className="w-full flex items-center justify-start p-1  relative">
                {itemData.photoUrl ? (<img
                  src={itemData.photoUrl}
                  alt=""
                  className="w-10 h-10 border-2 border-gray-300 mx-5 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/users/${itemData.sender}`)}
                />) : (
                <img
                  src="/user.png"
                  alt=""
                  className="w-10 h-10 border-2 border-gray-300 mx-5 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/users/${itemData.sender}`)}
                /> )}
                <div className='flex flex-col'>
                  <div className='flex flex-row w-full justify-start items-center '>
                    <h1
                      className="text-md text-gray-300 font-semibold cursor-pointer my-2 mr-4"
                      onClick={() => navigate(`/users/${itemData.sender}`)}
                    >
                      {itemData.userName}
                    </h1>
                    {/* <h1 className='text-sm text-white/60'> {item.date}</h1> */}
                  </div>
                  <p className='text-sm text-white/80 mb-2'>

                    {itemData.body}
                  </p>
                </div>

              </span>
            </span>
          </div>
        );
      })}
    </div>
)
:(
  <div className=" w-1/3 mt-6 my-2   rounded-3xl p-3 overflow-hidden relative hidden text-md lg:flex items-center justify-center flex-col text-white">
    No comments yet
    </div>
)
}
  </div>
  )
}

export default Comments