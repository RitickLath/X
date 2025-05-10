import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { tabs } from "../constants/tabs";
import {
  Post,
  SingleTweetCard,
  SkeletonTweetCard,
  TabButton,
} from "../component/component";
import { getTweets } from "../utils/getTweet";

const Home: FC = () => {
  const [mode, setMode] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["tweets", tabs[mode].title],
    queryFn: () => getTweets(tabs[mode].path, 0),
  });

  return (
    <div id="home">
      <div className="max-w-[700px] border border-gray-700 flex w-full">
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.title}
            label={tab.title}
            isActive={tabs[mode].title === tab.title}
            onClick={() => setMode(index)}
          />
        ))}
      </div>
      <Post />

      {isLoading
        ? [...Array(5)].map((_, i) => <SkeletonTweetCard key={i} />)
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data.data.map((element: any) => (
            <SingleTweetCard
              key={element?._id}
              id={element?._id}
              username={element?.author?.username || "rr"}
              commentCount={element?.commentCount}
              likeCount={element?.likeCount}
              content={element?.content}
              retweetCount={element?.retweetCount}
              original={element?.original}
              createdAt={element?.createdAt}
            />
          ))}
    </div>
  );
};

export default Home;
