import "./Podcast.css";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { PodcastMainSide } from "../../components/post-cast-main-side/PodcastMainSide.jsx";
import { useFetchCache } from "../../hooks/UseFetchCache.jsx";
import { episodeListApi } from "../../apis/episodeListApi.js";

Podcast.propTypes = {
  setIsLoading: PropTypes.func,
  postHashList: PropTypes.object,
  setList: PropTypes.func,
};

export function Podcast({ setIsLoading, postHashList, setList }) {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    setPodcast(postHashList.get(podcastId));
  }, []);

  useFetchCache(
    setList,
    async () => await episodeListApi.get(podcastId),
    `podcast_${podcastId}`,
    setIsLoading
  );

  return (
    <>
      {podcast && (
        <div className="podcast">
          <PodcastMainSide podcast={podcast} />
          <Outlet />
        </div>
      )}
    </>
  );
}
