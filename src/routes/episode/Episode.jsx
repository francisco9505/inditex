import {useParams} from "react-router-dom";
import './Episode.css';
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";

export const Episode = ({list,setIsLoading}) => {
  const {episodeId} = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    const [ state ] = list.filter(episode => episode.trackId === +episodeId);
    setPodcast(state);
    return ()=>setIsLoading(false)
  }, []);

  return (<>
    {podcast && <div className='podcast__episode podcast__card'>
      <span dangerouslySetInnerHTML={{__html: podcast.trackName}} className="podcast__episode-name"></span>
      <span dangerouslySetInnerHTML={{__html: podcast.description}} className="podcast__description"></span>
      <audio onLoadedData={()=>setIsLoading(false)} className="podcast__player" controls src={ podcast.episodeUrl }></audio>
    </div>}
  </>)
}

Episode.propTypes = {list: PropTypes.array, setIsLoading: PropTypes.func};
