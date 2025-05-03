import { profileAvatar } from "../constants/staticData";
import { postStyles } from "../constants/style";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";

const SingleTweetCard = () => {
  return (
    <div className={postStyles.wrapper}>
      <img
        className={postStyles.avatar}
        src={profileAvatar}
        alt="User avatar"
      />
      <div className="max-w-[450px] lg:max-w-[600px] text-md">
        <h1>Ritick Lath</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsam
          debitis culpa omnis! Amet velit culpa sapiente aspernatur sit. Ullam
          dolorem laboriosam eum voluptatum! Culpa animi labore minus qui quia.
        </p>
        <div className="flex justify-between mt-4 text-gray-500 text-lg max-w-[400px]">
          <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition">
            <FaRegComment />
            <span className="text-sm font-semibold">12</span>
          </div>
          <div className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition">
            <FaRetweet />
            <span className="text-sm font-semibold">8</span>
          </div>
          <div className="flex items-center gap-2 hover:text-pink-500 cursor-pointer transition">
            <FaRegHeart />
            <span className="text-sm font-semibold">35</span>
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
