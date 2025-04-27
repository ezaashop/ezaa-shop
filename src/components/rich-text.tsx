"use client";

import DOMPurify from "dompurify"; // Install: npm install dompurify
import React from "react";

type RichTextProps = {
  content: string;
  className?: string;
};

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content) return null; // Prevent rendering empty content

  return (
    <div
      className={`prose prose-loose rich-text max-w-none text-justify ${className}`} // Tailwind prose for styling
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} // Sanitizing HTML
    />
  );
};

export default RichText;
