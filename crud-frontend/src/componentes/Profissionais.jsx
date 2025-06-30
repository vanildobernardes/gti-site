import axios from "axios";
import { useState, useEffect } from "react";

export default function () {
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    const fetchprofissionais = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/profissional"
        );
        setProfissionais(response.data);
      } catch (error) {
        console.error("Error fetching profissionais:", error);
      }
    };

    fetchprofissionais();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>id_profissional</th>
              <th>Nome do profissional</th>
              <th>Função do profissional</th>
              {/* Add any other necessary columns */}
            </tr>
          </thead>
          <tbody className="hover">
            {profissionais.map((profissionais) => (
              <tr key={profissionais.id_profissional}>
                <td>{profissionais.id_profissional}</td>
                <td>{profissionais.nome_profissional}</td>
                <td>{profissionais.funcao_profissional}</td>
                {/* Add any other necessary data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
