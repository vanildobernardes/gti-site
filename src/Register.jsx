import React from "react";

const Register = () => {
  return (
    <div className="register-container">
      <span className="title">Login profissional</span>
      <span className="sub-title">
        Registro dos profissionais do GTI que irão inserir e administrar a
        plataforma
      </span>
      <form>
        <input type="text" placeholder="Digite o nome" />
        <input type="email" placeholder="Digite o e-mail" />
        <input type="password" placeholder="Digite a senha" />
        <input type="text" placeholder="Digite a função" />
        <button>Registrar</button>
        <p>Você tem conta? Login</p>
      </form>
    </div>
  );
};

export default Register;
