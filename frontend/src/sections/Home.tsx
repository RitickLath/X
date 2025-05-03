import { FC, useState } from "react";
import Post from "../component/Post";
import TabButton from "../component/TabButton";
import SingleTweetCard from "../component/SingleTweetCard";

const tabs = ["For you", "Following", "Trending"];

const Home: FC = () => {
  const [mode, setMode] = useState<string>("For you");

  return (
    <div>
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
    </div>
  );
};

export default Home;
