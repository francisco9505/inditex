import * as PropTypes from "prop-types";
import "./PodcastMainSide.css";
import { useNavigate, useParams } from "react-router-dom";

PodcastMainSide.propTypes = { podcast: PropTypes.object };

export function PodcastMainSide({ podcast }) {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  function openPodcast() {
    navigate(`/podcast/${podcastId}`);
  }

  return (
    <div className="podcast__main-side podcast__card">
      <div className="podcast__main-side--img">
        <img className="podcast__pointer-cursor"
          onClick={openPodcast}
          alt="podcast-img"
          src={podcast["im:image"][2].label}
        />
      </div>
      <hr className="podcast__main-side--division" />
      <div className="podcast__main-side--vertical-align">
        <span
          className="podcast__main-side--podcast-name podcast__pointer-cursor"
          onClick={openPodcast}
        >
          {podcast["im:name"].label}
        </span>
        <span className="podcast__main-side--artist-name podcast__pointer-cursor" onClick={openPodcast}>
          by {podcast["im:artist"].label}
        </span>
      </div>
      <hr className="podcast__main-side--division" />
      <div className="podcast__main-side--vertical-align">
        <span className="podcast__main-side--description">Description:</span>
        <span
          className="podcast__main-side--summary"
          dangerouslySetInnerHTML={{ __html: podcast.summary.label }}
        ></span>
      </div>
    </div>
  );
}
