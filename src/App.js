import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PostDetails from "./PostDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;