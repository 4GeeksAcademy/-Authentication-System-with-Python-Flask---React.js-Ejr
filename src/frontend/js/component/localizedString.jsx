import React from "react"
import { Context } from "../store/appContext.jsx"

const LocalizedString= ({ label, fallbacktext=null })=>{
  const { language }= React.useContext(Context)

  return label[0][0]=='/' ? language.get(label.substring(1))?? fallbacktext?? "--err--" : label
}

export default LocalizedString

