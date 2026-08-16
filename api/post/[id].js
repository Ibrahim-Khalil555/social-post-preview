// api/post/[id].js
export const config = {
  runtime: "edge",
};

// Mock post data (should come from your API/database)
const POSTS = [
  {
    id: "1",
    title: "The Future of Web Development",
    description:
      "Exploring modern frameworks, edge functions, and the evolving landscape of frontend architecture.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "2",
    title: "Mastering CSS Grid & Flexbox",
    description:
      "Learn how to build complex, responsive layouts with ease using CSS Grid and Flexbox.",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "3",
    title: "JavaScript Async/Await Explained",
    description:
      "A deep dive into asynchronous JavaScript, promises, and async/await patterns.",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop&crop=center",
  },
];

export default async function handler(request, context) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const postId = pathParts[pathParts.length - 1];

  // Find the post
  const post = POSTS.find((p) => p.id === postId);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  // Build the HTML with meta tags
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title}</title>
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${post.image}" />
  <meta property="og:url" content="${url.origin}/post/${post.id}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="My Blog" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${post.image}" />
  
  <!-- Additional Meta Tags -->
  <meta name="description" content="${post.description}" />
  <link rel="canonical" href="${url.origin}/post/${post.id}" />
  
  <!-- Placeholder for React -->
  <meta property="og:title" content="__META_TITLE__" />
  <meta property="og:description" content="__META_DESCRIPTION__" />
  <meta property="og:image" content="__META_IMAGE__" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
