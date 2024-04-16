import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./routes/Home.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Podcast } from "./routes/Podcast.jsx";
import { PodcastEpisodeList } from "./routes/PodcastEpisodeList.jsx";
import { Episode } from "./routes/Episode.jsx";
import { useFetchCache } from "./hooks/useFetchCatche.jsx";
import { podcastListApi } from "./apis/podcastListApi.js";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [postHashList, setPostHashList] = useState(new Map());
  const [list, setList] = useState([]);

  function updateHashList(entry) {
    const hashList = entry.reduce((hash, post) => {
      hash.set(post.id.attributes["im:id"], post);
      return hash;
    }, new Map());
    setPostHashList(hashList);
  }

  useFetchCache(
    setPostList,
    async () => await podcastListApi.get(),
    `podcast_list`,
    setIsLoading
  );

  useEffect(() => {
    updateHashList(postList);
  }, [postList]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavBar isLoading={isLoading} />
        {postHashList.size > 0 && (
          <Routes>
            <Route
              path="/"
              element={<Home postList={postList} setList={setList} />}
            />
            <Route
              path="/podcast/:podcastId"
              element={
                <Podcast
                  setIsLoading={setIsLoading}
                  postList={postList}
                  postHashList={postHashList}
                  setList={setList}
                />
              }
            >
              <Route path="" element={<PodcastEpisodeList list={list} />} />
              <Route
                path="episode/:episodeId"
                element={<Episode list={list} />}
              />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
