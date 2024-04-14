import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {Home} from "./routes/Home.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Podcast } from "./routes/Podcast.jsx";
import { isAfter, subDays } from "date-fns";

async function getPostList() {
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )}`
  );
  if (response.ok) {
    console.error("Network response was not ok.");
  }
  const {
    feed: { entry },
  } = JSON.parse((await response.json()).contents);
  return entry;
}

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [postHashList, setPostHashList] = useState(new Map());

  function updateHashList(entry) {
    const hashList = entry.reduce((hash, post) => {
      hash.set(post.id.attributes["im:id"], post);
      return hash;
    }, new Map());
    setPostHashList(hashList);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const entry = await getPostList();
      setPostList(entry);
      localStorage.setItem("postList", JSON.stringify(entry));
      localStorage.setItem("postListRequestTime", `${new Date().getTime()}`);
      setIsLoading(false);
    };
    if (
      localStorage.getItem("postListRequestTime") &&
      localStorage.getItem("postList") &&
      isAfter(
        new Date(+localStorage.getItem("postListRequestTime")),
        subDays(new Date(), 1)
      )
    ) {
      setIsLoading(true);
      setPostList(JSON.parse(localStorage.getItem("postList")));
      setIsLoading(false);
      return;
    }
    fetchData().then();
  }, []);

  useEffect(() => {
    updateHashList(postList);
  }, [postList]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavBar isLoading={isLoading} />
        {postHashList.size > 0 && (
          <Routes>
            <Route path="/" element={<Home postList={postList} />} />
            <Route
              path="/podcast/:podcastId"
              element={
                <Podcast
                  setIsLoading={setIsLoading}
                  postList={postList}
                  postHashList={postHashList}
                />
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
