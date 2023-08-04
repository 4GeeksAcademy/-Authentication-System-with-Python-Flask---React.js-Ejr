import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


const Likes = ({ reviewId }) => {
  const { store, actions } = useContext(Context)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false);
  const [userData, setUserData] = useState([])


  useEffect(() => {
    console.log(reviewId);
    actions.getLikes(reviewId).then(likes => {

      if (likes !== null) {
        setLikes(likes.likes_len)
        setUserData(likes.user_data)
      }
    })
  }, [reviewId])

  const handleLikes = async () => {
    const success = await actions.likeReview(reviewId, store.user.id)
    // if (success) {
    //   setLikes(prevLikes => prevLikes + 1)
    //   setIsLiked(true)
    // }
  }

  return (

    <span className="like-review" onClick={handleLikes}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
      </svg>
      <span className="likes-review">{likes}</span>
    </span>
  );
};

export default Likes;