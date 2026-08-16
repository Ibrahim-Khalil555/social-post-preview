import React from "react";

const PostCard = ({ post, onViewPost }) => {
  return (
    <div className="post-card">
      <img
        src={post.image}
        alt={post.title}
        className="card-image"
        loading="lazy"
      />
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-excerpt">{post.excerpt}</p>
        <button className="view-btn" onClick={() => onViewPost(post)}>
          View Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
