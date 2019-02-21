import React from "react";
import { AuthorCard } from "./styled";
import { imageSrc } from "../../constants";

export function Author({ imageId, name, username, bio }) {
  return (
    <AuthorCard>
      <img src={`${imageSrc()}/${imageId}`} alt="user" />
      <div>
        <span>{name}</span>
        <span>
          <code>@{username}</code>
        </span>
        <span>{bio}</span>
      </div>
    </AuthorCard>
  );
}

export default React.memo(Author);
