import React from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../store/appContext.jsx"

const WorkspaceCard= ({ data })=>{
  const 
    { language }= React.useContext(Context),
    nav= useNavigate()

  // TEMP, REMOVE ON PRODUCTION
  data.thumbnail= "/assets/img/default/workspace.png"

  return (
    <div className="flex flex-col gap-3">
    <p className="ml-1 text-sm">{data.title[0]=='/' ? language.get(data.title.substring(1)) : data.title}</p>
    <button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden" onClick={()=>nav(`/workspace/${data.id}`)}>
      <img className="transition duration-300 ease-in-out hover:scale-105 w-full" src={data.thumbnail} alt="workspace thumbnail" /> 
    </button>
  </div>
  ) 
}

export default WorkspaceCard

