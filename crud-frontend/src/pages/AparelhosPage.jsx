// src/pages/AparelhosPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../componentes/Table.jsx"; // O componente Table será usado aqui
import Modal from "../componentes/Modal.jsx"; // O Modal também

export default function AparelhosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [aparelhoData, setAparelhoData] = useState(null); // Aparelho selecionado para edição
  const [tableData, setTableData] = useState([]); // Dados da tabela de aparelhos

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/aparelho");
      setTableData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de aparelhos:", error); // Use console.error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (mode, aparelho = null) => { // aparelho pode ser null para 'add'
    setIsOpen(true);
    setAparelhoData(aparelho);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setAparelhoData(null); // Limpa os dados do aparelho selecionado
    setModalMode("add"); // Volta para o modo de adição
  };

  const handleSubmitAparelho = async (dataToSave) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/aparelho",
          dataToSave
        );
        console.log("Aparelho adicionado:", response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.error("Erro ao adicionar aparelho:", error);
        // Implementar feedback ao usuário (ex: toast notification)
      }
    } else { // mode === "edit"
      try {
        // O id_aparelho deve vir de dataToSave, que é o objeto completo enviado pelo Modal
        const response = await axios.put(
          `http://localhost:3000/api/aparelho/${dataToSave.id_aparelho}`,
          dataToSave
        );
        console.log("Aparelho atualizado:", response.data);
        setTableData((prevData) =>
          prevData.map((aparelho) =>
            aparelho.id_aparelho === response.data.id_aparelho
              ? response.data // Substitui o aparelho antigo pelo atualizado
              : aparelho
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar aparelho:", error);
        // Implementar feedback ao usuário
      }
    }
    handleCloseModal(); // Fecha o modal após a operação
  };

  // Função de busca (se o componente Navbar estiver fora desta página)
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      try {
        const response = await axios.get(`http://localhost:3000/api/aparelho/search?q=${term}`);
        setTableData(response.data);
      } catch (error) {
        console.error("Erro ao buscar aparelhos:", error);
        setTableData([]); // Limpa a tabela em caso de erro na busca
      }
    } else {
      fetchData(); // Se a busca estiver vazia, recarrega todos os dados
    }
  };


  return (
    <div className="container mx-auto p-4"> {/* Adicione um container para melhor layout */}
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Aparelhos</h1>
      {/* O botão de "Cadastrar aparelho" e a barra de busca podem ser movidos para cá ou passados via props para o Navbar */}
      <div className="flex justify-between items-center mb-4">
          <button onClick={() => handleOpenModal("add")} className="btn btn-primary">
              Cadastrar novo aparelho
          </button>
          {/* Se a barra de busca for específica para aparelhos */}
          <input
            type="search"
            required
            placeholder="Pesquisar aparelho..."
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-bordered"
          />
      </div>

      <Modal
        isOpen={isOpen}
        onSubmit={handleSubmitAparelho}
        onClose={handleCloseModal}
        mode={modalMode}
        aparelhoData={aparelhoData}
      />
      <Table
        setTableData={setTableData} // Ainda necessário para o delete na Table
        handleOpen={handleOpenModal} // Passa a função para abrir o modal em modo edição
        searchTerm={searchTerm} // Passa o termo de busca para a Table para filtrar
        tableData={tableData} // Passa os dados filtrados ou todos os dados
      />
    </div>
  );
}