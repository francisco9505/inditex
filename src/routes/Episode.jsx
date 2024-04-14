import {useParams} from "react-router-dom";
import './Episode.css';
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";

export const Episode = ({list}) => {
  const {episodeId} = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const [ state ] = list.filter(episode => episode.trackId === +episodeId);
    setPodcast(state);
  }, []);

  return (<>
    {podcast && <div className='podcast__episode podcast__card'>
      <span dangerouslySetInnerHTML={{__html: podcast.trackName}} className="podcast__episode-name"></span>
      <span dangerouslySetInnerHTML={{__html: podcast.description}} className="podcast__description"></span>
      <audio className="podcast__player" controls src={ podcast.episodeUrl }></audio>
    </div>}
  </>)
}

Episode.propTypes = {list: PropTypes.array};
