import { useNavigate } from "react-router-dom"
import { Context } from "../../store/appContext"

const BoardCard= ({id, name, thumbnail})=>{
  const 
    { language }= React.useContext(Context),
    nav= useNavigate()

  return (
    <div className="flex flex-col gap-3">
    <p className="ml-1 text-sm">{name[0]=='$' ? language.get(name) : name}</p>
    <button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden" onClick={()=>nav(`/board/${id}`)}>
      <img className="transition duration-300 ease-in-out hover:scale-105" src={thumbnail} alt="workspace thumbnail" /> 
    </button>
  </div>
  ) 
}

export default BoardCard