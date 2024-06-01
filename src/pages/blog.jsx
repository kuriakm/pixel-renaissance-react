import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogPost from "../components/blogpost-view";
import AboutWriter from "../components/about-writer";
import "../styles/blog.css";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://kuriakm.github.io/json/post.json"
      );
      setBlogPosts(response.data);
    })();
  }, []);

  return (
    <main id="main-content" className="columns">
      <section id="information" className="four">
        <section id="blog-page">
          <h2>Blog Posts</h2>
          <section id="posts">
            {blogPosts.map((blogPost) => (
              <BlogPost
                key={blogPost.seo}
                seo={blogPost.seo}
                game={blogPost.game}
                thumbnail={blogPost.thumbnail}
                headline={blogPost.headline}
              />
            ))}
          </section>
        </section>
      </section>
      <AboutWriter />
    </main>
  );
};

export default Blog;
