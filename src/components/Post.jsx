import "./Post.css";
import { useNavigate } from "react-router-dom";

export const Post = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="post" onClick={() => navigate(`/podcast/${props.id.attributes['im:id']}`)}>
        <div className="post__image-container">
          <img alt='podcast-img'className="post__image" src={props["im:image"][2].label} />
        </div>
        <div className="post__details">
          <span className="post__name">{props["im:name"].label}</span>
          <span className="post__author">{props["im:artist"].label}</span>
        </div>
      </div>
    </>
  );
};
