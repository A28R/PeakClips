/* eslint-disable react/prop-types */
import { useFirebase } from "../../firebase/Firebase";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

function Post(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const firebase = useFirebase();
  const includesAny = (arr, values) => values.some(v => arr.includes(v));

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (props.id == "user" && props.user) {
      // eslint-disable-next-line react/prop-types
      firebase.getUserPosts(props.user).then((post) => {
        setIsLoading(false);
        setPosts(post.docs);
        setIsLoading(true);
      })
    } else {
    firebase.listPost().then((post) => {
      let empty = []
      console.log("2")
      setIsLoading(false);
      setPosts(post.docs);
      if (props.filters != null && props.filters.length != 0) {
        console.log(props.filters)
        post.docs.forEach(element => {
          if ( props.filters.includes(element.data().game) || includesAny(element.data().tags, props.filters)) empty.push(element)
        });
        setPosts(empty)
      }
      
      setIsLoading(true);
    })}
    
  // eslint-disable-next-line react/prop-types
  }, [firebase, props.id, props.user, props.filters]);
  if (!isLoading) {
    return (
      <>
        <div className="w-full lg:w-4/5  my-5  lg:px-3 py-2 flex items-center justify-center flex-col-reverse">
          <section className="bg-black/20 dark:bg-gray-900  w-full px-5 rounded-2xl">
            <div className="w-full py-10 mx-auto animate-pulse">
              <div className="w-full ">
                <h1 className="w-12 h-12 mb-7 bg-gray-700 rounded-3xl dark:bg-gray-700"></h1>
                <div className="w-full h-72 bg-gray-600 rounded-lg dark:bg-gray-600"></div>

                <h1 className="w-36 h-7 mt-7 bg-gray-700 rounded dark:bg-gray-700"></h1>
                <p className="w-full h-10 mt-7 bg-gray-700 rounded-md dark:bg-gray-700"></p>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full lg:w-4/5  my-5  lg:px-3 py-2 flex items-center justify-center flex-col-reverse">
          <section className="bg-black/20 dark:bg-gray-900  w-full px-5 rounded-2xl">
            <div className="w-full py-10 mx-auto animate-pulse">
              <div className="w-full ">
                <h1 className="w-12 h-12 mb-7 bg-gray-700 rounded-3xl dark:bg-gray-700"></h1>
                <div className="w-full h-72 bg-gray-600 rounded-lg dark:bg-gray-600"></div>

                <h1 className="w-36 h-7 mt-7 bg-gray-700 rounded dark:bg-gray-700"></h1>
                <p className="w-full h-10 mt-7 bg-gray-700 rounded-md dark:bg-gray-700"></p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
  return (<div className="w-full lg:w-4/5  my-2  lg:px-3 py-2 flex items-center justify-center flex-col-reverse">
    
        {posts.length>0 ? (

          posts?.map((item) => {
            return <SinglePost key={item.id} {...item.data()} id={item.id} />;
          })
    
        )
    
        : (
          <div className="w-full flex flex-col mt-24 mb-[40rem] items-center justify-center">
            
            <div className="text-3xl text-gray-200 font-bold"> No Posts</div>
            <div className="text-1xl text-gray-200 font-light my-2"> There are no posts to display with the given criteria.</div>
            
            </div>

        )
      }
  </div>




  );
}

export default Post;
