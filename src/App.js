import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Principles from "./Principles";
import Login from "./Login";
import Register from "./Register";
import Videos from "./Videos";
import Payment from "./Payment";
import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/principles" element={<Principles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
