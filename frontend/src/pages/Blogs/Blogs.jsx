import { useEffect, useState } from "react";
import { getAllBlogs } from "../../utils/api";
import BlogCard from "../../components/BlogCard/BlogCard";
import "./Blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then((data) => setBlogs(data));
  }, []);

  return (
    <div className="blogs-container">
      {blogs.length === 0 && <p>No blogs found.</p>}
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
