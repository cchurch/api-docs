api-docs
========

Eagle Eye Networks API Documentation

Uses Swagger and SwaggerUI to auto-generate a front-end GUI for the EEN API Docs, built from JSON files that were manually created and maintained.

The core REST docs live in "/docs/*/index.json" files.  The "More Info" content lives in "/docs/*/info.html" files.

The "Definition of Terms" content lives in "/docs/terms.html".

Sandbox deploy steps:

1. Add "application/json json;" to "/etc/nginx/mime.types"
1. Add "index.json" to "index" of "location /" in nginx conf
1. Add "api" symlink in "html" root dir pointing to directory that this repo was checked out in

Prod deploy steps: TBD