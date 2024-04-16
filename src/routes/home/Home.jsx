import { useEffect, useState } from "react";
import "./Home.css";
import { PodcastCard } from "../../components/podcast-card/PodcastCard";
import * as PropTypes from "prop-types";
import {useFilteredValue} from "../../hooks/UseFilteredValue.jsx";

export const Home = ({ postList, setList }) => {
  const [filteredPostList, setFilteredPostList] = useState(postList);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setList([]);

  }, [])

  useFilteredValue(filterValue, setFilteredPostList, postList);


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
          <PodcastCard key={post.id.attributes["im:id"]} {...post} />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = { postList: PropTypes.array, setList: PropTypes.func };
