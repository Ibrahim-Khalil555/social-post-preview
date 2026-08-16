import React from "react";
import {
  SOCIAL_PLATFORMS,
  getSocialShareUrl,
  getShareUrl,
} from "../utils/socialShare";

const PostDetail = ({ post, onClose }) => {
  if (!post) return null;

  const shareUrl = getShareUrl(post.id);

  return (
    <div className="post-detail-overlay" onClick={onClose}>
      <div className="post-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img src={post.image} alt={post.title} className="detail-image" />

        <h2 className="detail-title">{post.title}</h2>
        <p className="detail-desc">{post.description}</p>

        <div className="social-section">
          <span className="social-label">📤 Share this post:</span>
          <div className="social-buttons">
            {SOCIAL_PLATFORMS.map((platform) => {
              const url = getSocialShareUrl(
                platform.id,
                shareUrl,
                post.title,
                post.image,
              );

              return (
                <a
                  key={platform.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  style={{ backgroundColor: platform.color }}
                >
                  <span className="icon">{platform.icon}</span>
                  {platform.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
