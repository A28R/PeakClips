import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  limit,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//import { update } from "firebase/database";
// import {useNavigate} from "react-router-dom"
import axios from 'axios';
import FormData from "form-data";
// import fs from "fs"
// import image_moderation from "image-moderation"



const firebaseContext = createContext();

const firebaseConfig = {
  apiKey: INSERT API KEY HERE,
  authDomain: "web-app-project-bbfed.firebaseapp.com",
  projectId: "web-app-project-bbfed",
  storageBucket: "web-app-project-bbfed.appspot.com",
  messagingSenderId: "626119858790",
  appId: "1:626119858790:web:b2888da7ab851d3bdceba7",
  measurementId: "G-GR6YHY13TM"
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebase = () => useContext(firebaseContext);

const FirebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(FirebaseApp);
const GoogleProvider = new GoogleAuthProvider();
const firestore = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);


// eslint-disable-next-line react/prop-types
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("user");
  const [email, setEmail] = useState(null);
  const [url, setUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null)
  const [bannerUrl, setBannerUrl] = useState(null);
  const [bio, setBio] = useState("");
  // sign up user

  const feedQuery = query(collection(firestore, "posts"), orderBy("created", "asc"))
  

  const signupUser = async (email, password, displayName, something) => {
    
    var uid = ""
    if (!something) await createUserWithEmailAndPassword(firebaseAuth, email, password).then((promise) => 
      {uid = promise.user.uid
        console.log(uid)
      });
    await setDoc(doc(firestore, "users", uid),  {
      photoUrl: "",
      displayName,
      bio: "",
      bannerUrl: "",
      accountCreated: new Date().toLocaleDateString()
    })
  }
  // sign in user
  const signInUser = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
    
  // google login
  const signinWithGoogle = () =>
    signInWithPopup(firebaseAuth, GoogleProvider);
    
  // check user login or not

  const getUserData = async (userId) =>
    {
      return (await getDoc(doc(firestore, "users", userId))).data();
    }


  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user)
        setEmail(user.email)
        getUserData(user.uid).then((pr) => {
          setUserData(pr)
          setName(pr.displayName)
          getImageURL(pr.photoUrl).then((e)=>setUrl(e))
          getImageURL(pr.bannerUrl).then((e)=>setBannerUrl(e))
          setBio(pr.bio)
        })
      }
      else setUser(null);
    });
  }, []);

  const isLoggedIn = user ? true : false;

  // LoggedOut user
  const LoggedOut = () => {
    signOut(firebaseAuth);
  };
  // get user name in display

  const updatePhotoUrl = async (cover) => {
    if (url) {
    const currentRef = ref(storage, url) 
    deleteObject(currentRef)
  }
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
    const uploadResult = await uploadBytes(imageRef, cover)
    await updateDoc(doc(firestore, "users", userId),  {
      photoUrl: uploadResult.ref.fullPath
  })
  setUrl(uploadResult.ref.fullPath)
  return uploadResult.ref.fullPath
  }
  const updateBannerUrl = async (cover) => {
    if (bannerUrl) {
      const currentRef = ref(storage, bannerUrl) 
      deleteObject(currentRef)
    }
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    await updateDoc(doc(firestore, "users", user.uid),  {
      bannerUrl: uploadResult.ref.fullPath
  })
  setBannerUrl(uploadResult.ref.fullPath)
  return uploadResult.ref.fullPath
  }

  const getUserPosts = (usid) => {
    console.log("read")
    return getDocs(query(collection(firestore, "posts"), where("userID", "==", usid), orderBy("created"), limit(5)));
  };


  
  
  const updateBio = async (bio) => {
    await updateDoc(doc(firestore, "users", user.uid),  {
      bio
  }).then(() => {return bio})

  }

  const updateDisplayName = async (displayName) => {
    await updateDoc(doc(firestore, "users", user.uid),  {
      displayName
  }).then(() => {return displayName})

  }



  const getLikes = async (postId) => {
    console.log("read")
    return await getDocs(query(collection(firestore, "likes"), where("target", "==", postId)))
  }

  const handleLike = async (postId) => {
    await addDoc(collection(firestore, "likes"),  {
      sender: userId,
      target: postId
  })
  return await getLikes(postId)
  }

  const handleUnlike = async (postId) => {
    getDocs(query(collection(firestore, "likes"), where("sender", "==", userId), where("target", "==", postId))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
  return await getLikes(postId)
  }

  const getFollowers = async (target) => {
    console.log("read")
    return await getDocs(query(collection(firestore, "follows"), where("target", "==", target)))
  }

  const getFollowing = async (sender) => {
    console.log("read")
    return await getDocs(query(collection(firestore, "follows"), where("sender", "==", sender)))
  }

  const handleFollow = async (target, mode) => {
    await addDoc(collection(firestore, "follows"),  {
      sender: userId,
      target
  })
  return await mode == "followers" ? getFollowers(target) : getFollowing(userId)
  }

  const handleUnfollow = async (target, mode) => {
    getDocs(query(collection(firestore, "follows"), where("sender", "==", userId), where("target", "==", target))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
    return await mode == "followers" ? getFollowers(target) : getFollowing(userId)
  }

  const deleteSelf = (pw) => {
    //delete comments
    //delete likes
    if (url) {
      const currentRef = ref(storage, url) 
      deleteObject(currentRef)
    }
    if (bannerUrl) {
      const currentRef = ref(storage, bannerUrl) 
      deleteObject(currentRef)
    }

    getDocs(query(collection(firestore, "posts"), where("userID", "==", userId))).then((pr) => {
      pr.docs.forEach(element => {
        deletePost(element.id)
      });
    })
    getDocs(query(collection(firestore, "likes"), where("sender", "==", userId))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
    getDocs(query(collection(firestore, "comments"), where("sender", "==", userId))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
    getDocs(query(collection(firestore, "follows"), where("sender", "==", userId))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
    deleteDoc(doc(firestore, "users", userId))
    const credential = EmailAuthProvider.credential(
        email, 
        pw
    );
    reauthenticateWithCredential( user, credential ).then(() => {
    deleteUser(user)
    })
    
  }
  const deletePost = (postId, imageUrl) => {
    //delete comments
    //delete likes
    if (imageUrl) {
      const currentRef = ref(storage, imageUrl) 
      deleteObject(currentRef)
    }

    getDocs(query(collection(firestore, "likes"), where("target", "==", postId))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
    getDocs(query(collection(firestore, "comments"), where("target", "==", postId))).then((pr) => {
      pr.docs.forEach(element => {
        deleteDoc(element.ref)
      });
    })
    deleteDoc(doc(firestore, "posts", postId))
    
    
  }

  // get  user post data
  const handleCreatePost = async (title, cover, video, game, tags) => {
    
    
    
    
    let result = ""
    const imageRef = cover ? ref(storage, `uploads/images/${Date.now()}-${cover.name}`) : null;
    const uploadResult = imageRef ? await uploadBytes(imageRef, cover) : null;
    const usableUrl = uploadResult && await getImageURL(uploadResult.ref.fullPath)
    if (usableUrl) {


      await axios.get('https://api.sightengine.com/1.0/check-workflow.json', {
        params: {
          'url': usableUrl,
          'workflow': 'wfl_gAFMmnUeWf46Fh4Q1G64j',
          'api_user': '1783493150',
          'api_secret': 'pNBmrLZB9pvpi7jGER5gZ3vNQxza87FB',
        }
      })
      .then((response) => {
        // on success: handle response
        result = response.data.summary.action
        
      })
      .catch(function (error) {
        // handle error
        if (error.response) return (error.response.data);
        else return (error.message);
      });
    }
    
    if (result == "reject") {
      return "Naught Naughty..."
    }


    

    if(!cover && !video) {return "Post needs either a photo or video!"} 
    if(!game) {return "Post needs to have a game labeled!"}
    if(!title) {return "Post needs a title!"}
    else {
      let empty = []
      tags.forEach(i => {
        empty.push(i.value)
      })


     await addDoc(collection(firestore, "posts"), {
      title,
      imageUrl: uploadResult ? uploadResult.ref.fullPath : "",
      userID: user.uid,
      createdDate: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString(),
      videoUrl: video ? video : "",
      likes: [],
      created: new Date(),
      game: game.value,
      tags: tags ? empty : []
    }) 
    return "Post successfully created!"
  }
    
  };
  // set user post data
  const listPost = () => {
    console.log("read")
    return getDocs(feedQuery);
  };
  const listGames = () => {
    return getDocs(collection(firestore, "games"));
  };

  const listTags = () => {
    return getDocs(collection(firestore, "tags"));
  };

  const getImageURL = (path) => {
    console.log("read")
    return getDownloadURL(ref(storage, path));
  };

  const handleComment = async (text, postId) => {
    if (text=="") {
      alert("Comment needs a body!")
      return false
    } else
    return await addDoc(collection(firestore, "comments"), {
      body: text,
      sender: user.uid,
      target: postId,
      photoUrl: url,
      userName: name
    })
  }

  const getComments = (postId) => {
    console.log("read")
    return getDocs(query(collection(firestore, "comments"), where("target", "==", postId)))
  }

  // get image for post data
  


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);
  return (
    <firebaseContext.Provider
      value={{
        signupUser,
        signInUser,
        signinWithGoogle,
        isLoggedIn,
        LoggedOut,
        name,
        email,
        url,
        handleCreatePost,
        listPost,
        getImageURL,
        userId,
        getUserData,
        user,
        updatePhotoUrl,
        updateBio,
        handleLike,
        handleComment,
        userData,
        handleFollow,
        handleUnfollow,
        getUserPosts,
        updateDisplayName,
        listTags,
        listGames,
        deleteSelf,
        updateBannerUrl,
        bannerUrl,
        bio,
        getLikes,
        handleUnlike,
        getComments,
        getFollowers,
        getFollowing,
        deletePost
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
