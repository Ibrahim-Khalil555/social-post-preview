import { useEffect } from "react";

// Client-side only helper: keeps the browser tab's title/description in sync
// while the user navigates inside the SPA (e.g. opening a post modal).
//
// IMPORTANT: this does NOT affect social media link previews. Crawlers for
// Facebook/Twitter/LinkedIn/WhatsApp etc. fetch the raw HTML and never run
// this JavaScript, so they'd never see changes made here. The actual preview
// image/title/description come from the server-rendered HTML returned by
// api/post/[id].js. This component only improves the experience for a human
// browsing the app in a tab.
const MetaTags = ({ title, description, image, url }) => {
  useEffect(() => {
    const metaTitle = title || "My Blog";
    const metaDescription = description || "A blog about web development";
    const metaImage = image || "";
    const metaUrl = url || window.location.href;

    const previousTitle = document.title;
    document.title = metaTitle;

    const setMeta = (selector, attr, value) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.startsWith("link") ? "link" : "meta");
        if (selector.includes('name="description"')) el.setAttribute("name", "description");
        else if (selector.includes('property="')) {
          el.setAttribute("property", selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('name="')) {
          el.setAttribute("name", selector.match(/name="([^"]+)"/)[1]);
        } else if (selector.startsWith("link")) {
          el.setAttribute("rel", "canonical");
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", metaDescription);
    setMeta('meta[property="og:title"]', "content", metaTitle);
    setMeta('meta[property="og:description"]', "content", metaDescription);
    setMeta('meta[property="og:image"]', "content", metaImage);
    setMeta('meta[property="og:url"]', "content", metaUrl);
    setMeta('meta[name="twitter:title"]', "content", metaTitle);
    setMeta('meta[name="twitter:description"]', "content", metaDescription);
    setMeta('meta[name="twitter:image"]', "content", metaImage);
    setMeta('link[rel="canonical"]', "href", metaUrl);

    // Restore the default tab title when this view unmounts (e.g. modal closed)
    return () => {
      document.title = previousTitle;
    };
  }, [title, description, image, url]);

  return null;
};

export default MetaTags;
