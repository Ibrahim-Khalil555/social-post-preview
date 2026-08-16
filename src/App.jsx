import React, { useState, useEffect } from "react";
import { POSTS, getPostById } from "./data/posts";
import PostCard from "./components/PostCard";
import PostDetail from "./components/PostDetail";
import MetaTags from "./components/MetaTags";
import "./index.css";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check URL for shared post
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("post");
    if (postId) {
      const post = getPostById(postId);
      if (post) {
        setSelectedPost(post);
        setShowModal(true);
      }
    }
  }, []);

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeDetail = () => {
    setShowModal(false);
    setSelectedPost(null);
    // Clean URL params
    if (window.history.pushState) {
      window.history.pushState({}, document.title, window.location.pathname);
    }
  };

  return (
    <div className="app">
      {/* Meta Tags for the main page */}
      <MetaTags
        title="My Blog - Social Preview Demo"
        description="A demo showing how to implement social media previews in a React app"
        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=center"
      />

      <h1 className="app-title">📝 Blog Posts</h1>

      <div className="card-grid">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} onViewPost={handleViewPost} />
        ))}
      </div>

      {/* Post Detail Modal */}
      {showModal && selectedPost && (
        <PostDetail post={selectedPost} onClose={closeDetail} />
      )}
    </div>
  );
}

export default App;
