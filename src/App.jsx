import React from "react"
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./HomePage";
import BookShelf from './BookShelf.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/BookShelf" element={<BookShelf/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;