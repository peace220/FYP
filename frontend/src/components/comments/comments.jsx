import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postComments } from "../../API/commentsApi";
import { useThemedStyles } from "../../hooks/ThemeContrast";
const Comment = ({ comment, refetchComments }) => {
  const { textColor } = useThemedStyles();

  const { courseId } = useParams();
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = async () => {
    if (replyText.trim()) {
      await postComments(replyText, comment.id, courseId);
      refetchComments();
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <p className={`${textColor}`}>
        <strong>{comment.username}</strong>: {comment.text}
      </p>
      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-blue-500 text-sm mt-2"
      >
        {showReplyBox ? "Cancel" : "Reply"}
      </button>
      {showReplyBox && (
        <div className="mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder={`Replying to @${comment.username}`}
          ></textarea>
          <button
            onClick={handleReply}
            className={`${textColor} bg-blue-500 text-white px-4 py-2 rounded-lg`}
          >
            Post Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;