import React, { useState, useEffect } from "react";
import { POSTS, getPostById } from "./data/posts";
import PostCard from "./components/PostCard";
import PostDetail from "./components/PostDetail";
import MetaTags from "./components/MetaTags";
import "./index.css";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if URL has /post/id format
    const path = window.location.pathname;
    const match = path.match(/\/post\/(\d+)/);
    if (match) {
      const id = match[1];
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
      {/* Updates the browser tab title/description while navigating inside
          the SPA. This has no effect on social media previews — crawlers
          don't run JS, so those are handled server-side by api/post/[id].js */}
      {selectedPost && (
        <MetaTags
          title={selectedPost.title}
          description={selectedPost.description}
          image={selectedPost.image}
          url={`${window.location.origin}/post/${selectedPost.id}`}
        />
      )}
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
