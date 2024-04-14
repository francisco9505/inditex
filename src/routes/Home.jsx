import { useEffect, useState } from "react";
import "./Home.css";
import { Post } from "../components/Post.jsx";
import { isAfter, subDays } from "date-fns";

const Home = ({ setIsLoading }) => {
  const [postList, setPostList] = useState([]);
  const [filteredPostList, setFilteredPostList] = useState(postList);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
