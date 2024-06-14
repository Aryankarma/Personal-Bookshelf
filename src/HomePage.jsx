import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function HomePage() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [titleData, setTitleData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [bookCount, setBookCounter] = useState(0);

  useEffect(() => {
    const debouncing = setTimeout(() => {
      setSearchQuery(query);
    }, 350);

    return () => clearTimeout(debouncing);
  }, [query]);

  async function getBookData(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("error, status code: ", response.status);
      }

      const finalData = await response.json();

      const newAuthorData = finalData.docs.map((book) =>
        book.author_name ? book.author_name[0] : "Unknown",
      );
      const newTitleData = finalData.docs.map((book) =>
        book.title ? book.title : "Unknown"
      );

      setAuthorData(newAuthorData);
      setTitleData(newTitleData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchQuery
    )}&limit=9`;

    if (searchQuery !== "") {
      setAuthorData([]);
      setTitleData([]);

      getBookData(apiUrl);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log(bookCount);
  }, [bookCount]);

  return (
    <div className="App">
      <input
        autoFocus={true}
        type="text"
        placeholder="Enter book name"
        onChange={(e) => setQuery(e.target.value)}
      />

      <Link className="link" to='./bookshelf'>Go to BookShelf</Link>
      
      <div className="container">
        {authorData.map((author, index) => (
          <div key={index} className="card">
            <h4>Title: {titleData[index]}</h4>
            <p>Author Name: {author}</p>
            <button
              onClick={() => {
                localStorage.setItem(
                  `BookData${localStorage.length}`,
                  JSON.stringify([titleData[index], author])
                );
                // setBookCounter(bookCount + 1);
              }}
            >
              Add to BookList
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
