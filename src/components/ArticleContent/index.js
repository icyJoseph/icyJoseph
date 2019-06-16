import React from "react";

export function ArticleContent({ title, subtitle, wordCount }) {
  return (
    <div>
      <span content={`${wordCount} words`}>{wordCount} words</span>
      <span content={title}>{title}</span>
      <span content={subtitle}>{subtitle}</span>
    </div>
  );
}

export default React.memo(ArticleContent);
