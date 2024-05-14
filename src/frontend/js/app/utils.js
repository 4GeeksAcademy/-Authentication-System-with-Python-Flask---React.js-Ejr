const Utils= {
  constants: Object.freeze({

    COOKIE_SAMESITE_NONE: "None",
    COOKIE_SAMESITE_NONE_SECURE: "None; Secure",
    COOKIE_SAMESITE_LAX: "Lax",
    COOKIE_SAMESITE_STRICT: "Strict",

    SESSION_MODE_SIGNUP: 0,
    SESSION_MODE_LOGIN: 1,
    SESSION_MODE_LOGOUT: 2,
    SESSION_MODE_RECOVER: 3,
    SESSION_MODE_DELETED: 4

  }),

  /** short for writing preventDefault and stopPropagation */
  cancelEvent: (e)=> { e.preventDefault(); e.stopPropagation() },
  
  // given an event e, returns true if the mouse button was the one which triggered the event, false otherwise
  isMouseLeft: (e)=> __isMouseButton(e, 0),
  isMouseRight: (e)=> __isMouseButton(e, 2),
  isMouseCenter: (e)=> __isMouseButton(e, 1),

  // read a cookie and returns it, or undefined if not found */
  getCookie: (cookie)=>{
    return document.cookie.split(", ")?.find(e=>e.startsWith(`${cookie}=`))?.split('=')[1] ?? undefined
  },

  /** writes a cookie, if given, expire must be an array of 3 int as in: [days, hours, mins] */
  setCookie: (cookie, value, expire=null, path=null, samesite=null)=>{
    const cexpire= expire ? (()=>{
      try{
        const d = new Date()
        d.setTime(d.getTime() + (expire[0]*86400 + expire[1]*3600 + expire[2]*60) * 1000)
        return ";Expires=" + d.toUTCString()
      } catch(e){
        console.log(`invalid expiration data for cookie: ${cookie}, setting it to expire in 5 min`)
        const d = new Date()
        d.setTime(d.getTime() + 300000)
        return ";Expires=" + d.toUTCString()
      }
    })() : ""
    const cpath= path ? (";Path=" + path) : ""
    const csamesite= samesite ? (";SameSite=" + samesite) : ""
    const result= `${cookie}=${value}${cexpire}${cpath}${csamesite}`
    console.log("saved cookie: ", result)
    document.cookie= result
  },

  // decodes binary data from a base64 string, returns the data as byteArray, or null if no str/no data
  base64str2bytes: (str)=>{
    if(!str) return null
    const data= window.atob(str) // base64 decode
    return data ? Uint8Array.from(data, b=>b.codePointAt(0)) : null
  },

  // encode binary data to base64 string, returns a base64 string if succeed, null if not
  base64bytes2str: (bytes)=>{
    const str = Array.from(bytes, b=>String.fromCodePoint(b)).join("")
    return window.btoa(str) // base64 encode
  },
}

export default Utils

// common function for the mouse Utils above
function __isMouseButton(e, idx){
  if(e && e.button) return e.button === idx
  else console.log("isMouseLeft(): event was not a mouse event", e)
  return false
}

function __setCookie(cookie, value, expire=null, path="/", samesite=null){
  const cexpire= expire ? ()=>{
    try{
      const d = new Date()
      d.setTime(d.getTime())
      d.setTime(d.getTime() + (expire[0]*86400 + expire[1]*3600 + expire[2]*60) * 1000)
      return
    } catch(e){
      console.log(`invalid expiration data for cookie: ${cookie}, setting it to expire in 5 min`)
      const d = new Date()
      d.setTime(d.getTime() + 300000)
      return ";expires=" + d.toUTCString()
    }
  } : ""
  const cpath= path ? (";path=" + path) : ""
  const csamesite= samesite ? (";samesite=" + samesite) : ""
  document.cookie= `${cookie}=${value}${cexpire}${cpath}${samesite}`
}