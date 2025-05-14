import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { profileAvatar } from "../constants/staticData";
import {
  TabButton,
  SingleTweetCard,
  SkeletonTweetCard,
} from "../component/component";
import { getProfile } from "../utils/getProfile";

const profileTabs = [{ title: "Posts" }, { title: "Replies" }];

const ProfilePage: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [mode, setMode] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <SkeletonTweetCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Something went wrong</div>;
  }

  const user = data?.data?.data.user;
  const followers = data?.data?.followers || [];
  const posts = user?.tweets || [];
  const replies = data?.data?.data?.comments || [];

  return (
    <div id="profile" className="max-w-[700px]">
      {/* Profile Header */}
      {user && (
        <div className="flex items-center p-6 gap-4 pb-6 border-r-2 border-gray-700">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={profileAvatar}
            alt={`${user.username} avatar`}
          />
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.bio}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>
                <b className="text-white">{user.following?.length || 0}</b>{" "}
                Following
              </span>
              <span>
                <b className="text-white">{followers.length}</b> Followers
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-700 border-r-2 flex justify-between w-full">
        {profileTabs.map((tab, index) => (
          <TabButton
            key={tab.title}
            label={tab.title}
            isActive={mode === index}
            onClick={() => setMode(index)}
          />
        ))}
      </div>

      {/* Posts */}
      {mode === 0 && (
        <>
          {posts.length > 0 ? (
            posts.map((tweet: any) => (
              <SingleTweetCard
                key={tweet._id}
                id={tweet._id}
                username={user?.username || ""}
                authorId={user?._id || ""}
                commentCount={tweet.commentCount}
                likeCount={tweet.likeCount}
                content={tweet.content}
                retweetCount={tweet.retweetCount}
                original={tweet.original}
                createdAt={tweet.createdAt}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No Posts yet</div>
          )}
        </>
      )}

      {/* Replies */}
      {mode === 1 && (
        <>
          {replies.length > 0 ? (
            replies.map((reply: any) => (
              <SingleTweetCard
                key={reply._id}
                id={reply.tweetId?._id}
                username={user?.username || ""}
                authorId={user?._id || ""}
                commentCount={reply.commentCount || 0}
                likeCount={reply.likeCount || 0}
                content={reply.comment}
                retweetCount={0}
                original={false}
                createdAt={reply.createdAt}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No Replies yet</div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
