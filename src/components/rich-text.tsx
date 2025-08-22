"use client";

import DOMPurify from "dompurify";
type RichTextProps = {
  content: string;
  className?: string;
};

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content) return null;

  return (
    <div
      className={`prose prose-loose rich-text max-w-none text-justify ${className}`}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default RichText;
