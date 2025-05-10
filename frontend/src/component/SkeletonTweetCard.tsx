import { FC } from "react";

const SkeletonTweetCard: FC = () => {
  return (
    <div className="p-4 animate-pulse border-b border-gray-700 w-full max-w-[700px]">
      <div className="flex items-center space-x-4 mb-2">
        <div className="w-10 h-10 bg-gray-700 rounded-full" />
        <div className="w-1/3 h-4 bg-gray-700 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-700 rounded" />
        <div className="h-3 w-3/4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default SkeletonTweetCard;
