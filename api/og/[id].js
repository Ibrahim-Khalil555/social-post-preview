// api/og/[id].js
//
// Generates a branded 1200x630 PNG on the fly for posts that don't have a
// real photo. Used as a fallback og:image by api/post/[id].js — most posts
// already have a real image, so this is only hit when post.image is empty.
import { ImageResponse } from "@vercel/og";
import { getPostById } from "../../src/data/posts.js";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const post = getPostById(id);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #1a1a2e, #16213e)",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: "30px",
            color: "#a0aec0",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          {post.excerpt || post.description}
        </p>
        <div
          style={{
            marginTop: "30px",
            padding: "10px 30px",
            background: "#4299e1",
            borderRadius: "50px",
            color: "white",
            fontSize: "24px",
          }}
        >
          Read More →
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
