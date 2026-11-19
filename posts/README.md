# Blog

Welcome to my blog. Here I publish small studies of things I want to understand, mostly React and Next.js, and the occasional coding challenge.

## Problem-Solving

For years I put a lot of time into coding competitions: Google's Hash Code, Code Jam and Kick Start, and Advent of Code. Google has since retired its competitions, but that practice is part of my foundation, and it is how I learned Rust. I still enjoy a challenge every now and then.

The solutions live in their own repositories. Here I only document a few problems, and my thought process.

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
