import React, { useState, useEffect } from "react";
import { POSTS, getPostById } from "./data/posts";
import PostCard from "./components/PostCard";
import PostDetail from "./components/PostDetail";
import "./index.css";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postIdFromURL, setPostIdFromURL] = useState(null);

  useEffect(() => {
    // Get post ID from URL path instead of query params
    const path = window.location.pathname;
    const match = path.match(/\/post\/(\d+)/);
    if (match) {
      const id = match[1];
      setPostIdFromURL(id);
      const post = getPostById(id);
      if (post) {
        setSelectedPost(post);
        setShowModal(true);
      }
    }
  }, []);

  const handleViewPost = (post) => {
    // Update URL to /post/id
    window.history.pushState({}, "", `/post/${post.id}`);
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeDetail = () => {
    setShowModal(false);
    setSelectedPost(null);
    window.history.pushState({}, "", "/");
  };

  return (
    <div className="app">
      <h1 className="app-title">📝 Blog Posts</h1>

      <div className="card-grid">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} onViewPost={handleViewPost} />
        ))}
      </div>

      {showModal && selectedPost && (
        <PostDetail post={selectedPost} onClose={closeDetail} />
      )}
    </div>
  );
}

export default App;
