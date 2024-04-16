import * as PropTypes from "prop-types";
import "./PodcastEpisodeList.css";
import { useNavigate, useParams } from "react-router-dom";

function millisToMinutesAndSeconds(millis) {
  if (!!millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return "00:00";
}

PodcastEpisodeList.propTypes = { list: PropTypes.array };

export function PodcastEpisodeList({ list }) {
  const navigate = useNavigate();
  const { podcastId } = useParams();

  function openTrack(trackId) {
    navigate(`/podcast/${podcastId}/episode/${trackId}`);
  }

  return (
    <div className="podcast__episode-list">
      <div className="podcast__episode-list-count podcast__card">
        Episodes: {list.length}
      </div>
      <div className="podcast__card">
        <table className="podcast__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {list.map(
              ({ trackId, trackName, releaseDate, trackTimeMillis }, index) => (
                <tr
                  className={
                    index % 2 === 0
                      ? "podcast__episode-row gray"
                      : "podcast__episode-row"
                  }
                  key={trackId}
                  onClick={() => openTrack(trackId)}
                >
                  <td className="blue">{trackName}</td>
                  <td>{new Date(releaseDate).toLocaleDateString()}</td>
                  <td>{millisToMinutesAndSeconds(trackTimeMillis)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
