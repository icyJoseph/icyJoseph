use serde::{Deserialize, Serialize};
use std::{fs::File, io::prelude::*};

use clap::{AppSettings, Parser, Subcommand};

use meilisearch_sdk::{client::*, document::*};

use futures::executor::block_on;
use gray_matter::engine::YAML;
use gray_matter::Matter;

#[derive(Serialize, Deserialize, Debug)]
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

impl Document for Post {
    type UIDType = String;
    fn get_uid(&self) -> &Self::UIDType {
        &self.slug
    }
}

#[derive(Parser, Debug)]
#[clap(author, version, about, long_about=None)]
#[clap(global_setting(AppSettings::PropagateVersion))]
#[clap(global_setting(AppSettings::UseLongFormatForHelpSubcommand))]
struct Cli {
    #[clap(long = "server-url")]
    server_url: String,
    #[clap(long = "server-key")]
    server_key: String,
    #[clap(subcommand)]
    action: Actions,
}

#[derive(Subcommand, Clone, Debug)]
enum Actions {
    QueryKey,
    AddDocument {
        #[clap(short, long)]
        post: String,
    },
    SortAttributes,
}

fn main() {
    let cli = Cli::parse();

    match &cli.action {
        Actions::SortAttributes => block_on(async move {
            let sortable_attributes: Vec<String> = Client::new(cli.server_url, cli.server_key)
                .index("blog-posts")
                .get_sortable_attributes()
                .await
                .unwrap();

            println!("{:?}", sortable_attributes);
        }),
        Actions::QueryKey => block_on(async move {
            let client = Client::new(cli.server_url, cli.server_key);

            let keys = client.get_keys().await.unwrap();

            println!("Public Key: {:?}", keys);
        }),
        Actions::AddDocument { post } => {
            let mut documents: Vec<Post> = Vec::new();

            let mut file = File::open(post).expect("Something went wrong reading the file");

            let mut content = String::new();

            file.read_to_string(&mut content).unwrap();

            let matter = Matter::<YAML>::new();

            let result = matter.parse(&content);

            let mut post: Post = result.data.unwrap().deserialize().unwrap();

            post.content = Some(result.content);

            documents.push(post);

            block_on(async move {
                let client = Client::new(cli.server_url, cli.server_key);

                client
                    .index("blog-posts")
                    .add_documents(&documents, Some("slug"))
                    .await
                    .unwrap();
            });
        }
    }
}
