import React, { useState, useEffect } from "react";
import Comment from "./comments";
import Layout from "../../pages/Layout/Layout1";
import axios from "axios";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePostComment = async () => {
    if (commentText.trim()) {
      const response = await axios.post(
        "http://localhost:5000/api/comments/postComments",
        {
          text: commentText,
          parent_id: null,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      );
      setComments([...comments, { ...response.data, replies: [] }]);
      setCommentText("");
    }
  };

  const fetchComments = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/comments/comments"
    );
    setComments(response.data);
  };
  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="Write a comment..."
          ></textarea>
          <button
            onClick={handlePostComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Post Comment
          </button>
        </div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </Layout>
  );
};

export default CommentsSection;
