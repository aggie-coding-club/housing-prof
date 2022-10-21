import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Zach from "./pages/Zach";
import Josh from "./pages/Josh";
import John from "./pages/John";
import Adnan from "./pages/Adnan";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zach" element={<Zach />} />
            <Route path="/john" element={<John />} />
            <Route path="/josh" element={<Josh />} />
            <Route path="/adnan" element={<Adnan />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
