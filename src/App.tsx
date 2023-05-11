import { AddPost } from "./components/AddPost";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Board } from "./components/Board";
import './App.css'

function App() {

  return (
    <div className="body">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Board></Board>}></Route>
          <Route path="/add" element={<AddPost></AddPost>}></Route>
        </Routes>
      </Router>
      <div className="footer"><Footer></Footer></div>
    </div>
  );
}

export default App;
