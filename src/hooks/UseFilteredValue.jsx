import {useEffect} from "react";

export const useFilteredValue = (filterValue, setFilteredPostList, postList) => {
  useEffect(() => {
    if (!filterValue) {
      setFilteredPostList(postList);
      return;
    }
    const filteredList = postList.filter((post) => {
      const filter = filterValue.trim().toLowerCase();
      const name = post['im:name'].label.toLowerCase();
      const author = post['im:artist'].label.toLowerCase();
      return name.includes(filter) || author.includes(filter);
    });
    setFilteredPostList(filteredList);
  }, [postList, filterValue])
}