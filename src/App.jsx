import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // ...State (Estado)
  const [tituloPagina, setMessage] = useState("GTI - Base de conhecimento");

  return (
    <div>
      <h1>{tituloPagina}</h1>
      <button
        onClick={() => {
          setMessage("Trouxa!");
        }}
      >
        Mudar Mensagem
      </button>
    </div>
  );
}

export default App;
