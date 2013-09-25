api-docs
========

Eagle Eye Networks API Documentation

Uses Swagger and SwaggerUI to auto-generate a front-end GUI for the EEN API Docs, builts from JSON files that were manually created and maintained.

Deploy steps:

1. Add "application/json json;" to "/etc/nginx/mime.types"
1. Add "index.json" to "index" of "location /" in nginx conf
1. Add "api" symlink in "html" root dir pointing to directory that this repo was checked out in
