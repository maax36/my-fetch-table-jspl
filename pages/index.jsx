import React, { useState } from "react";
import useSWR from "swr";
import { TableUsers } from "../components/TableUsers";
import toast from 'react-hot-toast';
import { Search } from "@/components/Search";

/*const API_URL = 'http://localhost:3333/users',*/


/*Тут немного подсмотрел и чуть изменил ваш код чисто в ознакомительных целях с SWR и hot toast*/
const fetcher = async (url) => {
  const myPromise = fetch(url).then((res) => {
    if (!res.ok) throw new Error("fetch " + res.status);
    return res.json();
  });

  return toast.promise(myPromise, {
    loading: "Loading",
    success: "Got the data",
    error: (err) => `Error: ${err.message}`,
  });
};

export default function App() {
  const { data } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);
  const [search, setSearch] = useState("");

  const resSearch = (value) => {
    setSearch(value);
  };

  const getAllValues = (obj) => {
    const values = [];
  
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        values.push(...getAllValues(obj[key]));
      } else {
        values.push(obj[key]);
      }
    }
  
    return values;
  };
  const searchData = data?.filter((user) =>
    getAllValues(user).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <main>
      <Search resSearch={resSearch} />
      {searchData && <TableUsers dataUsers={searchData} />}
    </main>
  );
}
