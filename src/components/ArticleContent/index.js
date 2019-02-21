import React from "react";

export function ArticleContent({ title, subtitle, wordCount }) {
  return (
    <div>
      <div>
        <span content={title}>{title}</span>
        <span content={subtitle}>{subtitle}</span>
        <span>
          <span content={`${wordCount} words`}>{wordCount}</span> words
        </span>
      </div>
    </div>
  );
}

export default React.memo(ArticleContent);
