import { Route, Routes } from "react-router-dom";
import TopHeader from "./components/TopHeader";
import Home from "./pages/Home";
import ProfileSinglePage from "./pages/ProfileSinglePage";
import { useFirebase } from "../firebase/Firebase";
import LoginSignpage from "./components/LoginSignpage";
import NotFound from "./components/NotFound";
import { useState } from "react";

function App() {
  const firebase = useFirebase();
  const [filters, setFilters] = useState(null)

  if (!firebase.isLoggedIn) {
    return <LoginSignpage />;
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#1f295d] to-[#3e6fb3]">
        <TopHeader changeFilters={(pr) => {
          setFilters(pr)
          console.log("weww")
        }}/>
        <Routes>
          <Route path="/" element={<Home filters={filters}/>} />

          <Route path="/login" element={<LoginSignpage />} />
          <Route path="users">
            <Route path=":id" element={<ProfileSinglePage />} />
          </Route>
          <Route path="*" element={<NotFound /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
