import React, { Fragment } from "react";
import {
  FeaturedWrap,
  FeaturedApp,
  ImageWrap,
  ContentWrap,
  FeaturedLink
} from "./styled";
import busApp from "../../assets/featured/bus-app.png";
import forzaApp from "../../assets/featured/forza-app.png";
import web from "../../assets/featured/web.png";

const featured = [
  {
    name: "Portfolio",
    src: web,
    url: "https://icyjoseph.github.io/",
    repo: "https://github.com/icyJoseph/icyJoseph.github.io",
    desc: "This website."
  },
  {
    name: "Bus App",
    src: busApp,
    url: "https://wiry-coal.surge.sh/",
    repo: "https://github.com/icyJoseph/gbgtraffic",
    desc: "List nearby stops."
  },
  {
    name: "Football Predictions",
    src: forzaApp,
    url: "https://talented-reaction.surge.sh/",
    repo: "https://github.com/icyJoseph/forza",
    desc: "Coding challenge."
  }
];

export const Featured = () => (
  <Fragment>
    <Header as="div" inverted size="huge">
      Recent Activity
    </Header>
    <FeaturedWrap>
      {featured.map(({ src, url, name, desc, repo }) => (
        <FeaturedApp key={name}>
          <FeaturedLink href={url} target="_blank" rel="noopener noreferrer">
            <ImageWrap>
              <Image
                src={src}
                centered
                style={{ width: "64px", height: "64px" }}
              />
            </ImageWrap>
          </FeaturedLink>
          <ContentWrap>
            <h4>{name}</h4>
          </ContentWrap>
          <ContentWrap>{desc}</ContentWrap>
          <FeaturedLink href={repo} target="_blank" rel="noopener noreferrer">
            <ContentWrap>
              <code style={{ fontWeight: "bold", textDecoration: "underline" }}>
                To Repository
              </code>
            </ContentWrap>
          </FeaturedLink>
        </FeaturedApp>
      ))}
    </FeaturedWrap>
  </Fragment>
);

export default Featured;
