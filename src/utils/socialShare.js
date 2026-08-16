export const getShareUrl = (postId) => {
  return `${window.location.origin}/post/${postId}`;
};

export const getSocialShareUrl = (platform, url, title, image) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = encodeURIComponent(image || "");

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    instagram: `https://www.instagram.com/`,
    youtube: `https://www.youtube.com/results?search_query=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  return shareUrls[platform] || "#";
};

export const SOCIAL_PLATFORMS = [
  { id: "facebook", label: "Facebook", icon: "📘", color: "#1877f2" },
  { id: "twitter", label: "Twitter", icon: "🐦", color: "#000000" },
  { id: "instagram", label: "Instagram", icon: "📸", color: "#e4405f" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", color: "#25d366" },
  { id: "youtube", label: "YouTube", icon: "▶️", color: "#ff0000" },
  { id: "linkedin", label: "LinkedIn", icon: "🔗", color: "#0a66c2" },
  { id: "pinterest", label: "Pinterest", icon: "📌", color: "#e60023" },
  { id: "reddit", label: "Reddit", icon: "🤖", color: "#ff4500" },
];
