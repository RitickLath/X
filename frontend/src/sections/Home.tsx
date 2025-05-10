import { FC, useState } from "react";
import Post from "../component/Post";
import TabButton from "../component/TabButton";
import SingleTweetCard from "../component/SingleTweetCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const tabs = ["For you", "Following", "Trending"];

const getTweets = async () => {
  const token = localStorage.getItem("authorization");

  const response = await axios.get("http://localhost:3000/api/v1/feed", {
    headers: { Authorization: token },
  });
  return response;
};

const Home: FC = () => {
  const [mode, setMode] = useState<string>("For you");

  const { data, isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: getTweets,
  });
  console.log(data?.data.data);

  if (isLoading) {
    return (
      <>
        <div className="max-w-[700px] border border-gray-700 flex w-full">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              isActive={mode === tab}
              onClick={() => setMode(tab)}
            />
          ))}
        </div>
        <Post />
        <SingleTweetCard />
      </>
    );
  }

  return (
    <div id="home">
      <div className="max-w-[700px] border border-gray-700 flex w-full">
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            label={tab}
            isActive={mode === tab}
            onClick={() => setMode(tab)}
          />
        ))}
      </div>
      <Post />
      {data?.data.data.map((element) => (
        <SingleTweetCard
          key={element._id}
          id={element._id}
          username={element.author?.username || "rr"}
          commentCount={element.commentCount}
          likeCount={element.likeCount}
          content={element.content}
          retweetCount={element.retweetCount}
          original={element.original}
          createdAt={element.createdAt}
        />
      ))}
    </div>
  );
};

export default Home;
