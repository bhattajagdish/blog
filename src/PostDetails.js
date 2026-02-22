import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading  post...Wait for it</h2>;
  if (error) return <h2 style={{color:"red"}}>{error}</h2>;

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={btnStyle}>
        ⬅ Back
      </button>

      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

const containerStyle = {
  maxWidth: "600px",
  margin: "auto"
};

const btnStyle = {
  marginBottom: "15px",
  padding: "5px 10px",
  cursor: "pointer"
};

export default PostDetails;