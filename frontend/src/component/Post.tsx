import { FC, useState } from "react";
import { postStyles } from "../constants/style";
import { profileAvatar } from "../constants/staticData";
import axios from "axios";

const Post: FC = () => {
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handlePost = async () => {
    try {
      const token = localStorage.getItem("authorization");
      const response = await axios.post(
        "http://localhost:3000/api/v1/tweet",
        { content },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage(response.data.message || "Tweet posted!");
      setContent("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Failed to post tweet.");
    }
    // Show message for 2 second and then clear content and messsge
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const rows = Math.min(3, Math.ceil(content.length / 42) || 1);

  return (
    <div className={postStyles.wrapper}>
      <img
        className={postStyles.avatar}
        src={profileAvatar}
        alt="User avatar"
      />

      <div className={postStyles.contentContainer}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={postStyles.textarea}
          placeholder="What's happening?"
          rows={rows}
        />

        {content.length > 280 && (
          <div className="p-4 mt-4 bg-[#0e1a43] rounded-lg text-sm">
            <p className="text-gray-300">
              Your post is too long. Upgrade to{" "}
              <span className="text-white font-semibold">Premium+</span> to
              write longer posts and articles.
            </p>
            <p className="text-blue-400 underline mt-2 cursor-pointer hover:text-blue-300">
              Upgrade to Premium+
            </p>
          </div>
        )}

        {/* Feedback message */}
        {message && (
          <div className="text-sm text-green-400 mt-2">{message}</div>
        )}

        <div className={postStyles.bottomRow}>
          <span
            className={`text-sm ${
              content.length > 280 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {content.length}/280
          </span>

          <button
            onClick={handlePost}
            disabled={!content.trim() || content.length > 280}
            className={`${postStyles.postButtonBase} ${
              content.trim().length > 0 && content.length <= 280
                ? postStyles.postButtonActive
                : postStyles.postButtonDisabled
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
