export const POSTS = [
  {
    id: "1",
    title: "The Future of Web Development",
    description:
      "Exploring modern frameworks, edge functions, and the evolving landscape of frontend architecture. Learn how SPAs, SSR, and edge computing are shaping the future of web development.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=center",
    excerpt: "From SPAs to SSR and beyond – what's next for the web?",
  },
  {
    id: "2",
    title: "Mastering CSS Grid & Flexbox",
    description:
      "Learn how to build complex, responsive layouts with ease using CSS Grid and Flexbox. This comprehensive guide covers everything from basic concepts to advanced techniques.",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop&crop=center",
    excerpt: "Become a layout expert with these powerful CSS tools.",
  },
  {
    id: "3",
    title: "JavaScript Async/Await Explained",
    description:
      "A deep dive into asynchronous JavaScript, promises, and async/await patterns. Master the art of writing cleaner, more readable asynchronous code.",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop&crop=center",
    excerpt: "Write cleaner, more readable asynchronous code.",
  },
];

export const getPostById = (id) => {
  return POSTS.find((post) => post.id === id);
};
