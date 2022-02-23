# Meilisearch DB

This sub project contains binding code to maintain a Meilisearch instance, which is used to feed the blog section of this website.

This uses the Meilisearch Rust SDK.

## Uploading a post

```shell
cargo run -- --post <path_to_post> --server-url <url_to_instance> --server-key <master_key>
```
