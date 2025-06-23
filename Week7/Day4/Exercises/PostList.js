import React from "react";
import posts from "./posts.json";

const PostList = () => {
  return (
    <div>
      {posts.map((post, i) => (
        <div key={i}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
