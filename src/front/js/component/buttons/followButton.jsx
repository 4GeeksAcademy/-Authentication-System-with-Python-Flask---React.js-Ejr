import React from 'react'
import { useState } from 'react'
import "../../../styles/followButton.css"

const FollowButton = () => {
    const [isFollowing, setIsFollowing] = useState(false)
    const handleClick = () => setIsFollowing(!isFollowing) 
    const buttonClassName = isFollowing ? "custom-button rounded-pill py-2 px-3 followed" : "custom-button rounded-pill py-2 px-3"
  return (
    <>
     <button
     className={buttonClassName}
     onClick={handleClick}>
        {isFollowing ? "Siguiendo" : "Seguir"}
     </button>
    </>
  )
}

export default FollowButton