import { useState } from "react";
import "./Home.css";
import { Post } from "../components/Post.jsx";
import {mockData} from '../mockData.js';

const Home = () => {
  const [podcastTotal, setPodcastTotal] = useState(0);
  const [postList, setPostList] = useState(mockData);
  return (
    <div className="home">
      <div className="home__controls">
        <span>{podcastTotal}</span>
        <input type="text" />
      </div>
      <div className="home__podcast-list-container">
        {postList.map((post) => (
          <Post key={post.id.attributes["im:id"]} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
