const express = require('express') // CommonJS Modules

const postsRouter = require('./data/posts-router')
const server = express();

// teaches express how to read json from the body
server.use(express.json())

server.use("/api/posts", postsRouter)

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port}`));