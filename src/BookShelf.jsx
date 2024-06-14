import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function HomePage() {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
      const item = JSON.parse(localStorage.getItem(`BookData${i}`));
      if (item) {
        array.push(item);
      }
    }
    setFinalData(array);
  }, []);



  if(finalData.length == 0){
    return <div className="App">
      <Link className="link" to="../">
        Go to HomePage
      </Link>
    
      <div className="containerBookList">
        <h4>List is empty :(</h4>
      </div>
    </div>
  }

  return (
    <div className="App">
      <Link className="link" to="../">
        Go to HomePage
      </Link>
      <div className="containerBookList">

        {finalData.map((input, index) => (
          <div key={index} className="card">
            <h4>Title: {input[0]}</h4>
            <p>Author Name: {input[1]}</p>
            {/* <button
              onClick={() => {
                localStorage.setItem(
                  `BookData${bookCount}`,
                  JSON.stringify([titleData[index], author])
                );
                setBookCounter(bookCount + 1);
              }}
            >
              Remove from BookList
            </button> */}
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default HomePage;
