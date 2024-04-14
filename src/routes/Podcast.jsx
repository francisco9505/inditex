import "./Podcast.css";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { PodcastMainSide } from "../components/PodcastMainSide.jsx";
import { isAfter, subDays } from "date-fns";

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

Podcast.propTypes = {
  setIsLoading: PropTypes.func,
  postHashList: PropTypes.object,
  setList: PropTypes.func,
};

export function Podcast({ setIsLoading, postHashList , setList }) {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    setIsLoading(true);
    setPodcast(postHashList.get(podcastId));
    const fetchData = async () => {
      const list = await getPodcastList(podcastId);
      setList(list);
      localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(list));
      localStorage.setItem(
        `podcastRequestTime_${podcastId}`,
        `${new Date().getTime()}`
      );
      setIsLoading(false);
    };
    if (
      localStorage.getItem(`podcastRequestTime_${podcastId}`) &&
      localStorage.getItem(`podcast_${podcastId}`) &&
      isAfter(
        new Date(+localStorage.getItem(`podcastRequestTime_${podcastId}`)),
        subDays(new Date(), 1)
      )
    ) {
      setList(JSON.parse(localStorage.getItem(`podcast_${podcastId}`)));
      setIsLoading(false);
      return;
    }
    fetchData().then();
  }, []);

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
