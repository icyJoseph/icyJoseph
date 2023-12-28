# Blog

Welcome to my blog. Here I publish analysis of coding challenges, and document things I learn while learning both front and back end frameworks.

## Problem-Solving

During the year, when I am not working with my personal projects, I put time into coding competitions and coding challenges.

I focus mostly on Google Competitions, that is Hash Code, Code Jam and Kick-Start.

Of course, I also solve Advent of Code, though I am not as fast as I would like to.

Otherwise, I solve any time of problems that come my way.

The actual code and solutions for these challenges, live on their own repository. On this repository I only document a few problems, and explore my thought process.

A very nice side effect of problem-solving like this, is that I have learned the Rust programming language.

## Frameworks

Developers are always learning. I started with a heavy focus on front end development, using React, but eventually became quite confident with JavaScript and TypeScript for any type of development, including back end in NodeJS.

## Article Structure

All articles must have front matter in YAML format that matches the following schema:

```rust
struct Post {
    // Unchangeable publication date
    publish_date: Option<i64>,
    // Last time post was edited
    update_date: Option<i64>,
    // Post title as seen by the reader
    title: String,
    // Post human readable resource name
    slug: String,
    // To be used when previewing thepost
    summary: String,
    // Post content
    content: Option<String>,
    // Optional image to use for previews
    image: Option<String>,
    // What subjects is the post about
    tags: Vec<String>,
    // Who wrote the post
    authors: Vec<String>,
}
```
