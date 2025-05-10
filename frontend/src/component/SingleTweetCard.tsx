import { profileAvatar } from "../constants/staticData";
import { postStyles } from "../constants/style";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { formatDistanceToNowStrict, format, isValid } from "date-fns";

type SingleTweetCardProps = {
  username: string;
  commentCount: number;
  content: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  original?: boolean;
  id: string;
};

const SingleTweetCard = ({
  username,
  commentCount,
  content,
  createdAt,
  likeCount,
  retweetCount,
  id,
}: SingleTweetCardProps) => {
  const createdDate = new Date(createdAt);
  const isDateValid = isValid(createdDate);

  const timeAgo = isDateValid
    ? formatDistanceToNowStrict(createdDate, { addSuffix: true })
    : "just now";

  const formattedDate = isDateValid
    ? format(createdDate, "MMM d, yyyy h:mm a")
    : "";

  return (
    <div className={postStyles.wrapper}>
      <img
        className={postStyles.avatar}
        src={profileAvatar}
        alt="User avatar"
      />
      <div className="max-w-[450px] lg:max-w-[600px] text-md">
        <div className="flex items-center gap-2 text-sm mb-1">
          <h1 className="font-semibold">{username}</h1>
          <span>·</span>
          <span title={formattedDate}>{timeAgo}</span>
        </div>
        <p>{content}</p>
        <div className="flex justify-between mt-4 text-gray-500 text-lg max-w-[400px]">
          <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition">
            <FaRegComment />
            <span className="text-sm font-semibold">{commentCount}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition">
            <FaRetweet />
            <span className="text-sm font-semibold">{retweetCount}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-pink-500 cursor-pointer transition">
            <FaRegHeart />
            <span className="text-sm font-semibold">{likeCount}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer transition">
            <FaRegBookmark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTweetCard;
