import React,{useContext} from 'react'
import { Context } from "../store/appContext";

const alertSuccess = () => {
    const { store } = useContext(Context);
  return (
    <div className={`text-center alert alert-${store.success ? "success" : "warning"}`} role="alert">
                {store.msg}
                </div>
  )
}

export default alertSuccess