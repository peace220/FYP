import React, { useState } from "react";
import axios from "axios";
const Comment = ({ comment }) => {
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = async () => {
    if (replyText.trim()) {
      const response = await axios.post(
        "http://localhost:5000/api/comments/postComments",
        {
          text: replyText,
          parent_id: comment.id,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      );
      setReplies([...replies, { ...response.data, replies: [] }]);
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
          ></textarea>
          <button
            onClick={handleReply}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Post Reply
          </button>
        </div>
      )}
      <div className="ml-4 mt-4">
        {replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
