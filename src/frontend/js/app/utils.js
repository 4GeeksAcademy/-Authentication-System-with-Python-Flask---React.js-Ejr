const Utils= {
  /** short for writing preventDefault and stopPropagation */
  cancelEvent: (e)=> { e.preventDefault(); e.stopPropagation() },
  
  // given an event e, returns true if the mouse button was the one which triggered the event, false otherwise
  isMouseLeft: (e)=> __isMouseButton(e, 0),
  isMouseRight: (e)=> __isMouseButton(e, 2),
  isMouseCenter: (e)=> __isMouseButton(e, 1),

  /** read a cookie and returns it, or undefined if not found */
  getCookie: (cookie)=>{
    const result= document.cookie.split("; ")?.find(e=>e.startsWith(`${cookie}=`))
    console.log(`loaded cookie:`, result)
    return result?.split('=')[1] ?? undefined
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
    console.log("saved cookie:", result)
    document.cookie= result
  },

  /** decodes binary data from a base64 string, returns the data as byteArray, or null if no str/no data */
  base64str2bytes: (str)=>{
    if(!str) return null
    const data= window.atob(str) // base64 decode
    return data ? Uint8Array.from(data, b=>b.codePointAt(0)) : null
  },

  /** encode binary data to base64 string, returns a base64 string if succeed, null if not */
  base64bytes2str: (bytes)=>{
    const str = Array.from(bytes, b=>String.fromCodePoint(b)).join("")
    return window.btoa(str) // base64 encode
  },

  // generate logarithmic zoom levels
  generateZoomLevels: (min, max, steps, one)=>{
    const
      m= Math.log(min),
      b= Math.log(1.0),
      M= Math.log(max),
      over= steps-one-1,
      levels= []

    for(let i=0; i < one; i++) levels.push(Math.exp(m + (b-m) * i / one))
    levels.push(1.0)
    for(let i=0; i < over; i++) levels.push(Math.exp(b + (M-b) * i / over))

    return levels
  }
}

export default Utils

// common function for the mouse Utils above
function __isMouseButton(e, idx){
  if(e && e.button !== undefined) return e.button === idx
  else console.log("isMouseLeft(): event was not a mouse event", e)
  return false
}