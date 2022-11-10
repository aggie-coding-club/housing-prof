import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import ListingPage from "./pages/ListingPage";
import Profile from "./pages/Profile";
import "./App.css"


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/my-listings" element={<ListingPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
