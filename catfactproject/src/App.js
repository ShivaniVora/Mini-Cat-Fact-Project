import "./App.css";
import { useEffect, useState } from "react";

function useCatFact(index) {
  // console.log(index);
  const [catFact, setCatFact] = useState("");
  useEffect(() => {
    fetch(`https://catfact.ninja/fact`)
      .then((res) => res.json())
      .then((data) => setCatFact(data.fact));
    // console.log(catFact)
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

function catFactsAll(factList) {
  return factList.map(
    (catfact1) => catfact1.key > 0 && <p> {catfact1.string}</p>
  );
}

function App() {
  const [index, setIndex] = useState(1);
  const [boxIndex, setBoxIndex] = useState(2);

  const [favs, setFavs] = useState([]);
  console.log("favs: " + favs.length);
  console.log(favs);

  const catFact = useCatFact(index);

  console.log(index + "HELLO");
  const factList = useFactList(catFact, index);
  const catfs = catFactsDisplay(factList);
  const catfsAll = catFactsAll(factList);
  console.log(factList);
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
          {" "}
          {catfsAll[boxIndex]}{" "}
        </p>
        <p>
          {boxIndex - 1} out of {index}{" "}
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
            console.log("favs: " + favs.length);
            console.log(favs);
          }}
        >
          {"Favorite"}
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
              setBoxIndex(boxIndex > index ? boxIndex : boxIndex + 1);
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
