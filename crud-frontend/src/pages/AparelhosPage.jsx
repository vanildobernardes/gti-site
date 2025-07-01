// src/pages/AparelhosPage.jsx
import { useState, useEffect, useCallback } from "react"; // Adicione useCallback
import axios from "axios";
import Table from "../componentes/Table.jsx";
import Modal from "../componentes/Modal.jsx";
import Navbar from "../componentes/Navbar.jsx"; // Pode ser necessário para a barra de busca e botão de adicionar
// importamos o Navbar para a AparelhosPage para que o botão de adicionar e a busca
// possam manipular o estado da página de aparelhos diretamente.

export default function AparelhosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [aparelhoData, setAparelhoData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  // Estados para Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Use useCallback para memorizar a função fetchData
  const fetchData = useCallback(async () => {
    setError(null); // Limpa erros anteriores
    try {
      // Ajuste a URL para incluir os parâmetros de paginação
      const response = await axios.get(
        `http://localhost:3000/api/aparelho?page=${currentPage}&limit=${itemsPerPage}`
      );
      setTableData(response.data.data); // Os dados estão em response.data.data
      setTotalItems(response.data.pagination.totalItems);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error("Erro ao buscar dados de aparelhos:", err);
      setError("Não foi possível carregar os dados. Verifique sua conexão ou se está logado.");
      setTableData([]); // Limpa os dados da tabela em caso de erro
    }
  }, [currentPage, itemsPerPage]); // fetchData depende de currentPage e itemsPerPage

  useEffect(() => {
    fetchData(); // Chama a busca inicial de dados e sempre que currentPage/itemsPerPage mudar
  }, [fetchData]); // Agora useEffect depende de fetchData memorizada

  const handleOpenModal = (mode, aparelho = null) => {
    setIsOpen(true);
    setAparelhoData(aparelho);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setAparelhoData(null);
    setModalMode("add");
    fetchData(); // Recarrega os dados após fechar o modal
  };

  const handleSubmitAparelho = async (dataToSave) => {
    setError(null); // Limpa erros anteriores
    try {
      if (modalMode === "add") {
        await axios.post("http://localhost:3000/api/aparelho", dataToSave);
      } else { // mode === "edit"
        // Certifique-se de que dataToSave.id_aparelho existe para o PUT
        if (!dataToSave.id_aparelho) {
            throw new Error("ID do aparelho não fornecido para atualização.");
        }
        await axios.put(
          `http://localhost:3000/api/aparelho/${dataToSave.id_aparelho}`,
          dataToSave
        );
      }
    } catch (err) {
      console.error("Erro ao salvar aparelho:", err);
      setError("Erro ao salvar o aparelho. Verifique os dados e tente novamente.");
    } finally {
      handleCloseModal(); // Fecha o modal sempre, mesmo com erro (pode adicionar um delay ou feedback visual)
    }
  };

  // Função de busca que interage com o backend (se o backend já tiver busca paginada)
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setError(null);
    if (term) {
      try {
        // Se o endpoint de busca no backend aceitar paginação, inclua os parâmetros aqui
        const response = await axios.get(
          `http://localhost:3000/api/aparelho/search?q=${term}&page=${currentPage}&limit=${itemsPerPage}`
        );
        // Assumindo que o endpoint de busca também retorna a estrutura de paginação
        setTableData(response.data.data);
        setTotalItems(response.data.pagination.totalItems);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(1); // Resetar para a primeira página ao fazer uma nova busca
      } catch (err) {
        console.error("Erro ao buscar aparelhos:", err);
        setError("Erro ao realizar a busca. Tente novamente.");
        setTableData([]);
      }
    } else {
      // Se a busca estiver vazia, volta para a paginação normal
      setCurrentPage(1); // Volta para a primeira página
      fetchData(); // Recarrega todos os dados paginados
    }
  };

  // Funções para controle de Paginação
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Aparelhos</h1>

      <div className="flex justify-between items-center mb-4">
        <button onClick={() => handleOpenModal("add")} className="btn btn-primary">
          Cadastrar novo aparelho
        </button>
        <input
          type="search"
          placeholder="Pesquisar aparelho..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="input input-bordered"
        />
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onSubmit={handleSubmitAparelho}
        onClose={handleCloseModal}
        mode={modalMode}
        aparelhoData={aparelhoData}
      />
      <Table
        handleOpen={handleOpenModal}
        tableData={tableData} // Passa os dados da página atual
        setTableData={setTableData} // Ainda necessário para o delete na Table.jsx
      />

      {/* Controles de Paginação */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`join-item btn ${
                pageNumber === currentPage ? "btn-active" : ""
              }`}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="join-item btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
        <div className="ml-4 flex items-center">
            <span>Itens por página:</span>
            <select
                className="select select-bordered select-sm ml-2"
                value={itemsPerPage}
                onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(1); // Volta para a primeira página ao mudar o limite
                }}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            <span className="ml-2 text-sm">
                Total de itens: {totalItems}
            </span>
        </div>
      </div>
    </div>
  );
}