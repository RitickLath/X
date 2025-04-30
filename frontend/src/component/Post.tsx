import { FC, useState } from "react";
import { postStyles } from "../constants/style";
import { profileAvatar } from "../constants/staticData";

const Post: FC = () => {
  const [content, setContent] = useState<string>("");

  const handlePost = () => {};

  // textarea rows based on content length (max 3)
  const rows = Math.min(3, Math.ceil(content.length / 42) || 1);

  return (
    <div className={postStyles.wrapper}>
      {/* User avatar */}
      <img
        className={postStyles.avatar}
        src={profileAvatar}
        alt="User avatar"
      />

      {/* Text input area */}
      <div className={postStyles.contentContainer}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={postStyles.textarea}
          placeholder="What's happening?"
          rows={rows}
          maxLength={280}
        />

        {/* Bottom row: character count and Post button */}
        <div className={postStyles.bottomRow}>
          <span className={postStyles.counter}>{content.length}/280</span>
          <button
            onClick={handlePost}
            disabled={!content.trim()}
            className={`${postStyles.postButtonBase} ${
              content.trim().length > 0
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
