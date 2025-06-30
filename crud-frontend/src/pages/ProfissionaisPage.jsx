// src/pages/ProfissionaisPage.jsx
import Profissionais from "../componentes/Profissionais.jsx"; // Seu componente Profissionais

export default function ProfissionaisPage() {
  // Pode adicionar lógica de estado e modal para profissionais aqui, se necessário
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Profissionais</h1>
      {/* Adicione botões de adicionar profissional ou busca se for o caso */}
      <Profissionais />
    </div>
  );
}