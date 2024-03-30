const mongoose = require("mongoose")

const blogPostSchema = mongoose.Schema({
    title: String,
    description: String,
},
    { timestamps: true }
);

const BlogPost = mongoose.model("BlogPosts", blogPostSchema)
module.exports = BlogPost;