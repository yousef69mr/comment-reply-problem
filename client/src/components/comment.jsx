import React, { useEffect, useState } from "react";
import CommentForm from "./forms/comment-form";
import { apiInstance } from "../axios";
import axios from "axios";
import toast from "react-hot-toast";

const Comment = (props) => {
  const { comment, postId } = props;
  const [showForm, setShowForm] = useState(false);
  const [replies, setReplies] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //api call

  const fetchCommentReplies = async (postId, commentId) => {
    const cancelToken = axios.CancelToken.source();
    try {
      const repliesPromise = await apiInstance.get(
        `/posts/${postId}/comments/${commentId}/replies`,
        {
          cancelToken: cancelToken.token,
        }
      );

      if (repliesPromise.status !== 200) {
        if (repliesPromise.response.data) {
          throw new Error(Object.values(repliesPromise.response.data)[0]);
        } else {
          throw new Error(repliesPromise.statusText);
        }
      }

      return await repliesPromise.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("cancelled");
      } else {
        if (
          typeof error === "object" &&
          error.response &&
          error.response.data
        ) {
          toast.error(Object.values(error.response.data)[0]);
        } else {
          toast.error("Something went wrong!");
        }
      }
    }

    return () => {
      cancelToken.cancel("Request canceled");
    };
  };
  useEffect(() => {
    // Fetch replies data from your API
    if (postId && comment) {
      fetchCommentReplies(postId, comment.id).then((data) =>
        setReplies(data || [])
      );
    }
  }, [postId, comment?.id]);

  const onAddCommentReply = (reply) => {
    setShowForm(false);
    setReplies([...replies, reply]);
  };

  return (
    <div>
      <p>{comment?.content}</p>
      <button onClick={toggleForm}>Reply</button>
      {replies && (
        <div style={{ marginLeft: "50px" }}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              // onAddComment={onAddCommentReply}
            />
          ))}
        </div>
      )}
      {showForm && (
        <CommentForm
          postId={postId}
          commentId={comment.id}
          onAddComment={onAddCommentReply}
        />
      )}
    </div>
  );
};

export default Comment;
