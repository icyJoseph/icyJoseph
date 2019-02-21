import React from "react";
import ArticleContent from "../ArticleContent";
import { ArticlesWrapper, Article } from "./styled";
import { imageSrc } from "../../helpers";

export function Articles({
  articles,
  loadedImages,
  handleImageLoaded,
  handleImageError
}) {
  return (
    <ArticlesWrapper>
      {Object.keys(articles).map(id => {
        const article = articles[id];
        const {
          title,
          virtuals: {
            subtitle,
            previewImage: { imageId },
            wordCount
          }
        } = article;
        return (
          <Article key={id} words={wordCount}>
            <img
              src={`${imageSrc(512)}/${imageId}`}
              alt="user"
              onLoad={handleImageLoaded(id)}
              onError={handleImageError(id)}
            />
            {loadedImages.includes(id) && (
              <ArticleContent
                title={title}
                subtitle={subtitle}
                wordCount={wordCount}
              />
            )}
          </Article>
        );
      })}
    </ArticlesWrapper>
  );
}

export default Articles;
