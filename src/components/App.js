import Home from "./Home";
import About from "./About";
import Leaderboard from "./Leaderboard";
import Layout from "./Layout";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookMark from "./BookMark";
import { useEffect } from "react";
import booksData from "../data/booksData";
import Social from "./Social";
import Descriptions from "./Descriptions";
import Story from "./Books";
import Book from "./Books/Book";


<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>

const App = () => {
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(booksData));
    console.log(booksData);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          {/* <Route path="descriptions/:id" element={<Descriptions />} /> */}
          <Route path="about/:id" element={<About />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="bookmark" element={<BookMark />} />
          <Route path="social" element={<Social />} />
          {/* need to make path for profile section, can include a delete button for reviews */}
          <Route path="profile" element={<Profile />} />
          <Route path="descriptions/:id" element={<Descriptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;