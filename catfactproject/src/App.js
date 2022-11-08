import "./App.css";
import { useEffect, useState } from "react";

function useCatFact(index) {
  const [catFact, setCatFact] = useState("");
  useEffect(() => {
    fetch(`https://catfact.ninja/fact`)
      .then((res) => res.json())
      .then((data) => setCatFact(data.fact));
  }, [index]);
  return catFact;
}

var once = false;

function useFactList(catFact, index) {
  const [factList, setFactList] = useState([]);
  useEffect(() => {
    if (!once) {
      setFactList({ string: catFact, key: 0 });
      once = true;
    } else {
      setFactList([...factList, { string: catFact, key: factList.length }]);
    }
  }, [catFact]);
  return factList;
}

function catFactsDisplay(factList) {
  return factList.map(
    (catfact1) =>
      catfact1.key > (factList.length < 13 ? 1 : factList.length - 12) &&
      catfact1.key < factList.length - 1 &&
      catfact1.key < factList.length - 1 && <p> {catfact1.string}</p>
  );
}

function paginationDisplay(catFactsAll, boxIndex) {
  return catFactsAll.map(
    (catft) =>
    catft.key > ((boxIndex - 1) * 10) - 9 &&
    catft.key <= ((boxIndex - 1) * 10) + 1 && <p className="hist"> {catft.string}</p>
  );
}

function App() {
  const [index, setIndex] = useState(1);
  const [boxIndex, setBoxIndex] = useState(2);
  const [favs, setFavs] = useState([]);
  const catFact = useCatFact(index);
  const factList = useFactList(catFact, index);
  const catfs = catFactsDisplay(factList);
  const catfsPgDisplay = paginationDisplay(factList, boxIndex);

  return (
    <div className="App">
      <div className="columns">
        
          <header className="App-header">
          <div className="top">
            <p className="current"> {catFact}</p>
            <button className = "newfact"
              onClick={() => {
                setIndex(index + 1);
              }}
            >
              {"New Fact"}
            </button>
            </div>
            {catfs}
          </header>
      </div>
      <div className="columns">
        <p className="history">Fact History</p>
        <p className="histHeader">Up to 10 facts displayed at one time.</p>
        <p
          className="box"
          style={{
            backgroundColor: favs
              .map((e) => e.boxIndexCurrent)
              .includes(boxIndex - 1)
              ? "lightyellow"
              : "lightgrey",
          }}
        >
          <div className = "page">
          { catfsPgDisplay }
          </div>
        </p>
        <p>
          {boxIndex - 1} out of { Math.trunc((index+9) / 10) }{" "}
        </p>
        <button
          className="fav"
          onClick={() => {
            const boxIndexCurrent = boxIndex - 1;
            setFavs(
              !favs.map((e) => e.boxIndexCurrent).includes(boxIndex - 1)
                ? favs.length === 0
                  ? [{ boxIndexCurrent }]
                  : [...favs, { boxIndexCurrent }]
                : favs.filter((e) => e.boxIndexCurrent !== boxIndex - 1)
            );
          }}
        >
          { (favs.map((e) => e.boxIndexCurrent).includes(boxIndex - 1)) ? "Unfavorite" : "Favorite" }
        </button>
        <div className="leftright">
          <button
            className="lrbutton"
            onClick={() => {
              setBoxIndex(boxIndex < 3 ? boxIndex : boxIndex - 1);
            }}
          >
            {"<"}
          </button>
          <button
            className="lrbutton"
            onClick={() => {
              setBoxIndex(boxIndex >  Math.trunc((index+9) / 10) ? boxIndex : boxIndex + 1);
            }}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
