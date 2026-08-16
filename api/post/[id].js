// api/post/[id].js
// Using Node.js runtime instead of Edge for better compatibility

// Mock post data - keep this in sync with your frontend data
const POSTS = [
  {
    id: "1",
    title: "The Future of Web Development",
    description:
      "Exploring modern frameworks, edge functions, and the evolving landscape of frontend architecture. Learn how SPAs, SSR, and edge computing are shaping the future of web development.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "2",
    title: "Mastering CSS Grid & Flexbox",
    description:
      "Learn how to build complex, responsive layouts with ease using CSS Grid and Flexbox. This comprehensive guide covers everything from basic concepts to advanced techniques.",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "3",
    title: "JavaScript Async/Await Explained",
    description:
      "A deep dive into asynchronous JavaScript, promises, and async/await patterns. Master the art of writing cleaner, more readable asynchronous code.",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop&crop=center",
  },
];

export default async function handler(req, res) {
  // Get the post ID from the URL
  const { id } = req.query;

  // Find the post
  const post = POSTS.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Post Not Found</title></head>
        <body>
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist.</p>
          <a href="/">Go back home</a>
        </body>
      </html>
    `);
  }

  // Get the full URL for the post
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const fullUrl = `${protocol}://${host}/post/${post.id}`;

  // Build HTML with meta tags
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
  <meta property="og:url" content="${fullUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="My Blog" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${post.image}" />
  
  <!-- Additional Meta Tags -->
  <meta name="description" content="${post.description}" />
  <link rel="canonical" href="${fullUrl}" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.status(200).send(html);
}
