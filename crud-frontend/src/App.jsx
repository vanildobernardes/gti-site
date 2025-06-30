import { useState, useEffect } from "react";
import "./App.css";
import Table from "./componentes/Table.jsx";
import Navbar from "./componentes/Navbar.jsx";
import Footer from "./componentes/Footer.jsx";
import Modal from "./componentes/Modal.jsx";
import Profissionais from "./componentes/Profissionais.jsx";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [aparelhoData, setAparelhoData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/aparelho");
      setTableData(response.data);
    } catch (error) {
      setError("Error fetching aparelho data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode, aparelho) => {
    setIsOpen(true);
    setAparelhoData(aparelho);
    setModalMode(mode);
  };

  const handleSubmit = async (newAparelhoData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/aparelho",
          newAparelhoData
        );
        console.log("aparelho added", response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.error("Erro ao adidionar aparelho: ", error);
      }
      console.log("modal mode added");
    } else {
      console.log("Update aparelho com id: ", aparelhoData.id_aparelho);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/aparelho/${aparelhoData.id_aparelho}`,
          newAparelhoData
        );
        console.log("aparelho updated", response.data);
        setTableData((prevData) =>
          prevData.map(
            (aparelhoData) =>
              (aparelho.id_aparelho = aparelhoData.id_aparelho
                ? response.data
                : aparelho)
          )
        );
      } catch (error) {
        console.error("Error no update", error);
      }
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <Modal
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        aparelhoData={aparelhoData}
      />
      <Table
        setTableData={setTableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
        tableData={tableData}
      />
      <Profissionais />
      <Footer />
    </>
  );
}

export default App;
