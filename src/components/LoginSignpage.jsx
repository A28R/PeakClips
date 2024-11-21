import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function LoginSignpage() {
  return (
    <div className="from-[#1f295d] to-[#3e6fb3]">
      <div className="lg:flex  items-center justify-center overflow-hidden relative">
      <img
        src="/rect.png"
        alt="logo"
        className="w-1/3 my-2 absolute lg:top-2 top-2 left-2 lg:left-1/2 lg:-translate-x-1/2"
      />
        <Login />
        <hr />
        <SignUp />
      </div>
    </div>
  );
}

export default LoginSignpage;
