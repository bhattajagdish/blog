import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then(data => {
        setPosts(data.slice(0, 10));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading posts...</h2>;
  if (error) return <h2 style={{color:"red"}}>{error}</h2>;

  return (
    <div style={containerStyle}>
      <h1>📝 Blog Posts</h1>

      {posts.map(post => (
        <div key={post.id} style={cardStyle}>
          <Link to={`/post/${post.id}`} style={linkStyle}>
            <h3>{post.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

const containerStyle = {
  maxWidth: "600px",
  margin: "auto"
};

const cardStyle = {
  padding: "15px",
  marginBottom: "10px",
  background: "#f4f4f4",
  borderRadius: "8px"
};

const linkStyle = {
  textDecoration: "none",
  color: "#333"
};

export default Home;