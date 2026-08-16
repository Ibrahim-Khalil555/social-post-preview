// api/post/[id].js
export default async function handler(req, res) {
  const { id } = req.query;

  // Mock post data
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

  const post = POSTS.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title}</title>
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${post.image}" />
  <meta property="og:url" content="${req.headers.host}/post/${post.id}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${post.image}" />
  <meta name="description" content="${post.description}" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
