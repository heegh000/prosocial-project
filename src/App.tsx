import { AddPost } from "./components/AddPost";
import { ViewPost } from "./components/ViewPost";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Board } from "./components/Board";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Board></Board>}></Route>
          <Route path="/add" element={<AddPost></AddPost>}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
