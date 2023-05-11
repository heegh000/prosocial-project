import { AddPost } from "./components/AddPost";
import { ViewPost } from "./components/ViewPost";
import { Footer } from "./components/Footer";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AddPost></AddPost>
        <ViewPost></ViewPost>
        <Footer></Footer>
        <Routes>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
