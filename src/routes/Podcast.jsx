import './Podcast.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {PodcastMainSide} from "../components/PodcastMainSide.jsx";

async function getPodcastList(podcastId) {
  const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  const {results} = JSON.parse(((await response.json()).contents));
  return results;
}

Podcast.propTypes = {setIsLoading: PropTypes.func , postHashList: PropTypes.object};

export function Podcast({ setIsLoading, postHashList }) {
  let {podcastId} = useParams();
  const [list, setList] = useState([]);
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setList(await getPodcastList(podcastId));
      setPodcast(postHashList.get(podcastId));
      setIsLoading(false);
    }
    fetchData().then();
  }, []);

  return <>{
    podcast &&
    <div className="podcast">
      <PodcastMainSide podcast={podcast}/>
      <div className="podcast__episode-list">

      </div>
    </div>
  }</>
}