import "../styles/App.scss";
// import list from "../services/list.json";
import { useEffect, useState } from "react";

function App() {
  //guardar datos de los inputs en un setState, uno para cada uno
  //en el onSubmit pasar una funcion que pushee a list un nuevo objeto con los datos que hay en los state
  const [dataFiles, setDataFiles] = useState([]);
  const [dataLines, setDataLines] = useState("");
  const [dataCharacter, setDataCharacter] = useState("");

  const handleLine = (e) => {
    setDataLines(e.target.value);
  };

  const handleCharacter = (e) => {
    setDataCharacter(e.target.value);
  };
  const handleBtn = (e) => {
    e.preventDefault()
    const newLine = {quote: dataLines, character: dataCharacter}
    setDataFiles([...dataFiles, newLine])
    setDataLines("")
    setDataCharacter("")
  };


  // Fetch
  useEffect(() => {
    fetch(
      "https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json"
    )
      .then((response) => response.json())
      .then((responseData) => {
        setDataFiles(responseData);
      });
  }, []);

  return (
    <div>
      <header>
        <h1 className="title">Frases de Friends</h1>
        <form>
          <label htmlFor="quote">Filtrar por frases</label>
          <input type="text" name="quote" id="quote" />
          <label htmlFor="chracter">Filtrar por personaje</label>
          <select name="character" id="character">
            <option value="all">Todos</option>
            <option value="ross">Ross</option>
            <option value="monica">Mónica</option>
            <option value="joey">Joey</option>
            <option value="phoebe">Phoebe</option>
            <option value="chandler">Chandler</option>
            <option value="rachel">Rachel</option>
          </select>
        </form>
        {dataFiles.map((phrase) => (
          <p>
            {phrase.quote} - {phrase.character}
          </p>
        ))}
      </header>
      <main>
        <ul></ul>
        <form>
          <h2 className="subtitle">Añadir una nueva frase</h2>
          <label htmlFor="newQuote">Frase</label>
          <input
            type="text"
            name="newQuote"
            id="newQuote"
            onChange={handleLine}
            value={dataLines}
          />
          <label htmlFor="character2">Personaje</label>
          <input
            type="text"
            name="character2"
            id="character2"
            onChange={handleCharacter}
            value={dataCharacter}
          />
          <input type="submit" onClick={handleBtn} value="Añadir una nueva frase" />
        </form>
      </main>
    </div>
  );
}

export default App;
