/* eslint-disable react/prop-types */
import NewpostUploader from "../components/NewpostUploader";
import Post from "../components/Post";
import ProfileCom from "../components/ProfileCom";
import Following from "../components/Following";
import { useFirebase } from "../../firebase/Firebase";
import { useEffect, useState } from "react";

function Home(props) {
  const firebase = useFirebase()
  const [userFollowing, setUserFollowing] = useState(null)
  const [userFollowers, setUserFollowers] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getUserFollowing() {
      const userFollowing = await firebase.getFollowing(firebase.userId)
      setUserFollowing(userFollowing.docs)
      const userFollowers = await firebase.getFollowers(firebase.userId)
      setUserFollowers(userFollowers.docs)
    }
    if (userFollowing === null ) getUserFollowing()

  }, [props.filters]);


  return (
    <div className="w-full flex items-start justify-center">
      {/* Left side components */}

      <div className="hidden lg:flex items-center justify-center flex-col p-3 w-0 md:w-1/4 sticky left-0 top-16">
        <ProfileCom followStuff={userFollowers ? [userFollowers, userFollowing] : null}/>
        
      </div>

      {/* Center side components */}

      <div className="flex items-center justify-center flex-col w-full lg:w-1/2 gap-5">
        <NewpostUploader />
        <Post filters={props.filters}/>
      </div>

      {/* Right side components */}
      

      <div className="hidden lg:flex items-center justify-center flex-col  p-3 w-1/4 sticky right-0 top-16">
          <Following following={userFollowing}/>
      </div> 
    </div>
  );
}

export default Home;
