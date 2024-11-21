import { MdClose } from "react-icons/md";

function SkillCom() {
  const skill = [
    "Stroking",
    "Caressing",
    "Touching",
    "Tickling",
    "Yanking",
    "Rubbing",
    "Jerking",


  ];
  return (
    <div className="w-3/4 h-72 my-5  shadow-2xl rounded-3xl overflow-hidden relative hidden bg-black/30 lg:flex items-center justify-center flex-col text-white">
      <span className="w-full px-5 font-bold text-xl flex items-center justify-between">
        <span>Search by Tags/Games</span>{" "}
        <input
          type="text"
          className="w-40 h-6 bg-transparent outline-none border border-gray-700 text-sm font-thin px-2 rounded-md placeholder:text-xs text-gray-300"
          placeholder="Type your tags here.."
          maxLength={40}

          // onChange={(e) => {
            
          //   // This is where the tag code will go for after you enter a tag

          // }
        //}
          id="myInput"
        />
      </span>
      <span className="w-full h-3/4 flex items-stretch justify-start flex-wrap p-2">
        {skill.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center  cross mx-1"
            >
              <span className="capitalize bg-gray-800 px-4 p-2 text-xs font-semibold rounded-xl ">
                {item}
              </span>
              <MdClose className="icon opacity-0 cursor-pointer mr-0" />
            </div>
          );
        })}
      </span>
    </div>
  );
}

export default SkillCom;
