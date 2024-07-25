import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comment = ({ comment, refetchComments }) => {
  const { courseId } = useParams();
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = async () => {
    if (replyText.trim()) {
      const response = await axios.post(
        "http://localhost:5000/api/comments/postComments",
        {
          text: replyText,
          parent_id: comment.id,
          course_id: courseId,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      );
      refetchComments();
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <p>
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Post Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;