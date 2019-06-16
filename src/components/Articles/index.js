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
        const isLoaded = loadedImages.includes(id);
        return (
          <Article
            key={id}
            words={wordCount}
            hidden={!isLoaded}
            className={isLoaded ? "fade-in" : ""}
          >
            <img
              src={`${imageSrc(512)}/${imageId}`}
              alt={title}
              onLoad={() => handleImageLoaded(prev => [...prev, id])}
              onError={() => handleImageError(prev => [...prev, id])}
            />
            {
              <ArticleContent
                title={title}
                subtitle={subtitle}
                wordCount={wordCount}
              />
            }
          </Article>
        );
      })}
    </ArticlesWrapper>
  );
}

export default Articles;
