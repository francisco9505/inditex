import "./Podcast.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { PodcastMainSide } from "../components/PodcastMainSide.jsx";

async function getPodcastList(podcastId) {
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    )}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  const { results } = JSON.parse((await response.json()).contents);
  return results;
}

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

Podcast.propTypes = {
  setIsLoading: PropTypes.func,
  postHashList: PropTypes.object,
};

export function Podcast({ setIsLoading, postHashList }) {
  let { podcastId } = useParams();
  const [list, setList] = useState([]);
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setList(await getPodcastList(podcastId));
      setPodcast(postHashList.get(podcastId));
      setIsLoading(false);
    };
    fetchData().then();
  }, []);

  return (
    <>
      {podcast && (
        <div className="podcast">
          <PodcastMainSide podcast={podcast} />
          <div className="podcast__episode-list">
            <div className="podcast__episode-list-count podcast__card">
              Episodes: {list.length}
            </div>
            <div className="podcast__card">
              <table className="podcast__table">
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
                {list.map(
                  (
                    { trackId, trackName, releaseDate, trackTimeMillis },
                    index
                  ) => (
                    <tr
                      className={
                        index % 2 === 0
                          ? "podcast__episode-row gray"
                          : "podcast__episode-row"
                      }
                      key={trackId}
                    >
                      <td className="blue">{trackName}</td>
                      <td>{new Date(releaseDate).toLocaleDateString()}</td>
                      <td>{millisToMinutesAndSeconds(trackTimeMillis)}</td>
                    </tr>
                  )
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
