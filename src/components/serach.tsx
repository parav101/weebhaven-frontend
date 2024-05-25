import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { querySerach } from "../features/search";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";

export function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
  }, []);


  function handleSearch() {
    dispatch(querySerach({ search: query }));
    navigate(`/shop/?name=${query}`)
    setQuery("")
  }
  return (
    <div className="relative flex w-[200px] gap-2 md:w-max  ">
    <Input
      type="search"
      color="gray"
      label="Type here..."
      value={query} onChange={(e) => setQuery(e.target.value)}
      className="pr-24 focus:ring-0 focus:b-0 "
      containerProps={{
        className: "md:min-w-[288px] w-[100px] ",
      }}
      crossOrigin={undefined}
    />
    <Button size="sm" onClick={() => handleSearch()} color="gray" className="!absolute right-1 top-1 rounded">
      Search
    </Button>
  </div>
  );
}
