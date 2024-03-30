const express = require("express");
const cors = require("cors");
const connectDb = require("./connection")
const BlogPost = require("./models/BlogPost")
const app = express();


// connect database
connectDb();


//middlewares
app.use(express.json())
app.use(cors())


// Routes
app.get("/", async (req, res) => {
  res.send("Bilal api is running")
})


// Route 1 : Get all blogs
app.get("/get-blogs", async (req, res) => {
    let blogs = await BlogPost.find();
    if (!blogs) {
        res.status(404).json({ message: "No blogs found" })
    }
    res.json({ blogs })
})

// Route 2 : Post the blog
app.post("/post-blog", async (req, res) => {

    let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description,
    })

    await blog.save();
    res.json({ message: "Blog post saved successfully", blog });
})

// Route 3 : Delete a blog
app.delete("/delete-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "No blog found" })
    }
    res.status(200).json({ message: "Blog deleted successfully" })
})

// Route 4 : Update a blog
app.put("/update-blog/:id", async (req, res) => {

    let blog = await BlogPost.findByIdAndUpdate(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "No blog found" })
    }

    if (!req.body.title && !req.body.description) {
        res.json({ message: "Please enter title or description" })
    } else if (!req.body.title) {
        blog.description = req.body.description;
    } else if (!req.body.description) {
        blog.title = req.body.title;
    } else {
        blog.title = req.body.title;
        blog.description = req.body.description;
    }
    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog })
})

// Listen server
let port =  8000;
let host =  "127.0.0.1";

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
})