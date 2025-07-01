// src/componentes/Navbar.jsx
import { Link } from "react-router-dom"; // Importe Link

export default function Navbar({ isAuthenticated, onLogout }) {
  // As props onSearch e onOpen foram removidas, pois a busca e o modal
  // serão gerenciados diretamente dentro de AparelhosPage.jsx

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow" // class -> className
            >
              <li><Link to="/">Homepage</Link></li>
              {isAuthenticated && ( // Mostra links apenas se autenticado
                <>
                  <li><Link to="/aparelhos">Aparelhos</Link></li>
                  <li><Link to="/profissionais">Profissionais</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl">Controle de Estoque - GTI</Link>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <>
              {/* Ícones de notificação e busca (se forem globais) */}
              <button className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
              <button onClick={onLogout} className="btn btn-sm btn-outline btn-error ml-2">Sair</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
          )}
        </div>
      </div>
    </>
  );
}