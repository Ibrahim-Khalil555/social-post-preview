import React from "react";

const MetaTags = ({ title, description, image, url }) => {
  const metaTitle = title || "Default Title";
  const metaDescription = description || "Default description";
  const metaImage = image || "https://via.placeholder.com/600x400";
  const metaUrl = url || window.location.href;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="My Blog" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <link rel="canonical" href={metaUrl} />
    </>
  );
};

export default MetaTags;
