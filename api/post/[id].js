// api/post/[id].js
export const config = {
  runtime: "edge",
};

const POSTS = [
  {
    id: "1",
    title: "The Future of Web Development",
    description:
      "Exploring modern frameworks, edge functions, and the evolving landscape of frontend architecture.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=center",
  },
  // ... other posts
];

export default async function handler(request) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const postId = pathParts[pathParts.length - 1];

  const post = POSTS.find((p) => p.id === postId);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${post.title}</title>
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${post.image}" />
  <meta property="og:url" content="${url.origin}/post/${post.id}" />
  <meta name="twitter:card" content="summary_large_image" />
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
