import axios from "axios";
import { useState } from "react";

export default function Table({
  handleOpen,
  searchTerm,
  tableData,
  setTableData,
}) {
  const [error, setError] = useState([null]);

  const filteredData = tableData.filter(
    (aparelhos) =>
      aparelhos.tipo_aparelho
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      aparelhos.responsabilidade_aparelho
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      aparelhos.profissional_aparelho
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      aparelhos.modelo_aparelho
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      aparelhos.patrimonio_aparelho
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id_aparelho) => {
    const confirmDelete = window.confirm(
      "Tem certeza que vais deletar essa porra?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/aparelho/${id_aparelho}`);
        setTableData((prevData) =>
          prevData.filter((aparelhos) => aparelhos.id_aparelho !== id_aparelho)
        );
      } catch (error) {
        console.error("Error ao deletar:", error);
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>id_aparelho</th>
              <th>Tipo Aparelho</th>
              <th>Modelo Aparelho</th>
              <th>Número série aparelho</th>
              <th>Patrimônio do aparelho</th>
              <th>Responsável pelo aparelho</th>
              <th>Entregue?</th>
              <th>Usuário do aparelho</th>
            </tr>
          </thead>
          <tbody className="hover">
            {filteredData.map((aparelhos) => (
              <tr key={aparelhos.id_aparelho}>
                <td>{aparelhos.id_aparelho}</td>
                <td>{aparelhos.tipo_aparelho}</td>
                <td>{aparelhos.modelo_aparelho}</td>
                <td>{aparelhos.numero_serie_aparelho}</td>
                <td>{aparelhos.patrimonio_aparelho}</td>
                <td>{aparelhos.entregou_aparelho}</td>
                <td>
                  <button
                    className={`btn btn-active btn-secondary w-32 ${
                      aparelhos.entregou_aparelho ? `bg-success` : `btn-primary`
                    }`}
                  >
                    {aparelhos.entregou_aparelho ? "Entregue" : "Não entregue"}
                  </button>
                </td>
                <td>{aparelhos.profissional_aparelho}</td>
                <td>
                  <button
                    className="btn btn-accept"
                    onClick={() => handleOpen("edit", aparelhos)}
                  >
                    <i class="fa-solid fa-edit"></i>
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-soft"
                    onClick={() => handleDelete(aparelhos.id_aparelho)}
                  >
                    <i class="fa-solid fa-trash"></i>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
