import { useEffect, useState } from "react";
import "./Home.css";
import { Post } from "../components/Post.jsx";
import { mockData } from "../mockData.js";

const Home = () => {
  const [postList, setPostList] = useState(mockData);
  const [filteredPostList, setFilteredPostList] = useState(mockData);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (!filterValue) {
      setFilteredPostList(postList);
      return;
    }
    const filteredList = postList.filter((post) => {
      const filter = filterValue.trim().toLowerCase();
      const name = post["im:name"].label.toLowerCase();
      const author = post["im:artist"].label.toLowerCase();
      return name.includes(filter) || author.includes(filter);
    });
    setFilteredPostList(filteredList);
  }, [postList, filterValue]);

  return (
    <div className="home">
      <div className="home__controls">
        <span className="home__filtered-list-length">
          {filteredPostList.length}
        </span>
        <input
          className="home__filter-input"
          type="text"
          placeholder="Filter podcast"
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <div className="home__podcast-list-container">
        {filteredPostList.map((post) => (
          <Post key={post.id.attributes["im:id"]} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
