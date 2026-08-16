// api/post/[id].js
//
// Runs at the edge for every /post/:id request. Social media crawlers
// (Facebook, Twitter/X, LinkedIn, WhatsApp, Discord, etc.) do NOT execute
// JavaScript — they only read the raw HTML response. That means Open Graph
// tags set client-side by React (see MetaTags.jsx) are invisible to them.
// This function returns real, server-rendered HTML with the correct
// per-post <meta> tags baked in, which is what makes the image preview show
// up when a link is shared.
import { getPostById } from "../../src/data/posts.js";

export const config = {
  runtime: "edge",
};

// Prevent broken/unsafe HTML if a title or description ever contains
// characters like & < > " '
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(request) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const postId = pathParts[pathParts.length - 1];

  const post = getPostById(postId);

  // Fetch the real, already-built index.html for this deployment instead of
  // hardcoding a script path. In production Vite outputs hashed filenames
  // like /assets/index-Cx7f2A9d.js, so hardcoding "/src/main.jsx" (which
  // only exists in `vite dev`) would leave the page blank once deployed.
  const indexRes = await fetch(new URL("/index.html", url.origin));
  let html = await indexRes.text();

  if (!post) {
    return new Response(html, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const title = escapeHtml(post.title);
  const description = escapeHtml(post.description);
  const image = post.image || `${url.origin}/api/og/${post.id}?id=${post.id}`;
  const pageUrl = `${url.origin}/post/${post.id}`;

  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="My Blog" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content="${title}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="canonical" href="${pageUrl}" />`;

  // Strip the generic fallback tags already baked into index.html, then
  // inject the post-specific ones right before </head>.
  html = html
    .replace(/<title>.*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/i, "")
    .replace("</head>", `${metaTags}\n  </head>`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Cache at the edge for 5 min, allow serving stale for a day while
      // revalidating in the background — keeps crawler responses fast.
      "Cache-Control":
        "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
