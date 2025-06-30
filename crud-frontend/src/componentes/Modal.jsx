import { useState, useEffect } from "react";

export default function Modal({
  isOpen,
  mode,
  OnSubmit,
  aparelhoData,
  onClose,
}) {
  const [tipo_aparelho, setTipo_aparelho] = useState("");
  const [modelo_aparelho, setModelo_aparelho] = useState("");
  const [numero_serie_aparelho, setNumero_serie_aparelho] = useState("");
  const [numero_telefone_aparelho, setNumero_telefone_aparelho] = useState("");
  const [patrimonio_aparelho, setPatrimonio_aparelho] = useState("");
  const [data_entrega_aparelho, setData_entrega_aparelho] = useState("");
  const [entregou_aparelho, setEntregou_aparelho] = useState("");
  const [profissional_aparelho, setProfissional_aparelho] = useState("");
  const [aparelho_proprio, setAparelhoProprio] = useState(false);

  const handleStatusChange = (e) => {
    setAparelhoProprio(e.target.value === "Sim");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const aparelhoData = {
        id_aparelho: aparelhoData.id_aparelho || "",
        tipo_aparelho,
        modelo_aparelho,
        numero_serie_aparelho,
        numero_telefone_aparelho,
        patrimonio_aparelho,
        data_entrega_aparelho,
        entregou_aparelho, // Remover isactive e manter este
        profissional_aparelho,
        aparelho_proprio,
      };
      await OnSubmit(aparelhoData);
    } catch (err) {
      console.log("Error ao add aparelho", err);
    }
    onClose();
  };
  useEffect(() => {
    if (mode === "edit" && aparelhoData) {
      setTipo_aparelho(aparelhoData.tipo_aparelho);
      setModelo_aparelho(aparelhoData.modelo_aparelho);
      setNumero_serie_aparelho(aparelhoData.numero_serie_aparelho);
      setNumero_telefone_aparelho(aparelhoData.numero_telefone_aparelho);
      setPatrimonio_aparelho(aparelhoData.patrimonio_aparelho);
      setData_entrega_aparelho(aparelhoData.data_entrega_aparelho);
      setEntregou_aparelho(aparelhoData.entregou_aparelho);
      setProfissional_aparelho(aparelhoData.profissional_aparelho);
      setAparelhoProprio(aparelhoData.aparelho_proprio);
    } else {
      setTipo_aparelho("");
      setModelo_aparelho("");
      setNumero_serie_aparelho("");
      setNumero_telefone_aparelho("");
      setPatrimonio_aparelho("");
      setData_entrega_aparelho("");
      setEntregou_aparelho("");
      setProfissional_aparelho("");
      setAparelhoProprio(false);
    }
  }, [mode, aparelhoData]);

  return (
    <>
      {/* Put this part before </body> tag */}

      <div className="modal" role="dialog" id="my_modal_1" open={isOpen}>
        <div className="modal-box" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold w-full">
            {mode === "edit" ? "Editar um aparelho" : "Cadastrar um aparelho"}
          </h3>
          <br></br>
          <label className="floating-label">
            <span>Tipo do aparelho</span>
            <input
              value={tipo_aparelho}
              onChange={(e) => setTipo_aparelho(e.target.value)}
              type="input"
              className="input validator w-full"
              required
              placeholder="Tipo do aparelho"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              title="Apenas Letras, números ou acentos"
            />
            <p className="validator-hint">
              Apenas letras ou número. Sem caracteres especiais ou espaço
            </p>
          </label>
          <br></br>
          <label className="floating-label">
            <span>Modelo do aparelho</span>
            <input
              value={modelo_aparelho}
              onChange={(e) => setModelo_aparelho(e.target.value)}
              type="input"
              className="input validator w-full"
              required
              placeholder="Tipo do aparelho"
              pattern="[A-Za-z][A-Za-z0-9\- ]*"
              title="Apenas Letras, números ou acentos"
            />
            <p className="validator-hint">
              Apenas letras ou número. Sem caracteres especiais
            </p>
          </label>
          <br></br>
          <label className="floating-label">
            <span>Número de série do aparelho</span>
            <input
              value={numero_serie_aparelho}
              onChange={(e) => setNumero_serie_aparelho(e.target.value)}
              type="input"
              className="input validator w-full"
              required
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              title="Apenas Letras, números ou acentos"
              placeholder="Número de série do aparelho"
            />
            <p className="validator-hint">
              Apenas letras ou número. Sem caracteres especiais
            </p>
          </label>
          <br></br>
          <label className="floating-label">
            <span>Número do telefone</span>
            <input
              value={numero_telefone_aparelho}
              onChange={(e) => setNumero_telefone_aparelho(e.target.value)}
              type="number"
              className="input validator w-full"
              required
              placeholder="Número do telefone"
              pattern="[z0-9\-]*"
              title="Apenas Letras, números ou acentos"
            />
            <p className="validator-hint">
              Apenas números. Sem caracteres especiais ou letras
            </p>
          </label>
          <br></br>
          <label className="floating-label">
            <span>Patrimônio do aparelho</span>
            <input
              value={patrimonio_aparelho}
              onChange={(e) => setPatrimonio_aparelho(e.target.value)}
              type="number"
              className="input validator w-full"
              required
              pattern="[0-9]*"
              title="Apenas números"
              placeholder="Patrimônio do aparelho"
            />
            <p className="validator-hint">
              Apenas número. Sem caracteres especiais ou letras
            </p>
          </label>
          <br></br>
          <label className="floating-label">
            <span>Data da entrega do aparelho</span>
            <input
              value={data_entrega_aparelho}
              onChange={(e) => setData_entrega_aparelho(e.target.value)}
              type="date"
              className="input validator w-full"
              required
              placeholder="Data da entrega do aparelho"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              title="Apenas data informada"
            />
            <p className="validator-hint">
              Apenas letras ou número. Sem caracteres especiais ou espaço
            </p>
          </label>
          <br></br>
          <label className="floating-label">
            <span>Profissional GTI responsável pelo aparelho</span>
            <input
              value={entregou_aparelho}
              onChange={(e) => setEntregou_aparelho(e.target.value)}
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Apenas palavras"
              type="text"
              className="input w-full"
              placeholder="Profissional GTI responsável pelo aparelho"
            />
          </label>
          <br></br>

          <br></br>
          <select className="select validator" required>
            <option
              disabled
              value={aparelho_proprio ? "Próprio" : "Comodato"}
              onChange={handleStatusChange}
            >
              {aparelho_proprio ? "Próprio" : "Comodato"}
            </option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <br></br>
          <form>
            <button className="btn" type="submit">
              {mode === "edit" ? "Salvar Alteração" : "Adicionar aparelho"}
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
