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
      catfact1.key > ((factList.length < 10) ? 1 : (factList.length - 10)) &&
      catfact1.key < factList.length - 1 &&
      catfact1.key < factList.length - 1 && <p> {catfact1.string}</p>
  );
}

function catFactsAll(factList) {
  return factList.map(
    (catfact1) =>
      <p> {catfact1.string}</p>
  );
}

function App() {
  const [index, setIndex] = useState(1);
  const [boxIndex, setBoxIndex] = useState(2);

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
          <p className="current"> {catFact}</p>
          {catfs}
          <button
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            {"New Fact"}
          </button>
        </header>
      </div>
      <div className="columns">
        <p className = "box"> {catfsAll[boxIndex]} </p>
        <p> {boxIndex - 1} out of { index} </p>
        <button
            onClick={() => {
              setBoxIndex(boxIndex - 1);
            }}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              setBoxIndex(boxIndex + 1);
            }}
          >
            {">"}
          </button>
      </div>
    </div>
  );
}

export default App;
