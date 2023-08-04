import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
library.add(faThumbsUp);

const Likes = ({ reviewId }) => {
  const { store, actions } = useContext(Context);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    actions.getLikes(reviewId).then((likes) => {
      if (likes !== null) {
        setLikes(likes.likes_len);
        setUserData(likes.user_data);
        setIsLiked(likes.user_data.includes(store.user.id));
      }
    });
  }, [reviewId, store.user.id]);

  const handleLikes = async () => {
    const success = await actions.likeReview(reviewId, store.user.id);
    if (success) {
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
      setIsLiked((prevIsLiked) => !prevIsLiked)
    } else if (store.business_user) {
      alert("Una empresa no puede hacer click acá!!");
    }

  };

  return (
    <span className={`like-review ${isLiked ? "like-off" : "like-on"}`} onClick={handleLikes}>
      <FontAwesomeIcon icon={faThumbsUp} />
      <span className="likes-review">{likes}</span>
    </span>
  );
};

export default Likes;