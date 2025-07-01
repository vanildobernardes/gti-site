// src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importe Link também para navegação

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Campo de email
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Para confirmar a senha
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores
        setSuccessMessage(''); // Limpa mensagens de sucesso anteriores

        // Validação básica no frontend
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        if (!username || !password || !email) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            // Envia os dados para o endpoint de registro do backend
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                username,
                email,
                password,
            });

            setSuccessMessage(response.data.message || "Registro realizado com sucesso!");
            console.log("Registro bem-sucedido:", response.data);

            // Opcional: Redirecionar para a página de login após um pequeno atraso
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redireciona após 2 segundos

        } catch (err) {
            console.error("Erro no registro:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || "Falha ao registrar. Tente novamente.");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registre-se agora!</h1>
                    <p className="py-6">
                        Crie sua conta para acessar todas as funcionalidades do sistema de estoque.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>

                        <label className="fieldset-label">Nome de Usuário</label>
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="Nome de Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <label className="fieldset-label mt-4">Email</label>
                        <input
                            type="email"
                            className="input input-bordered"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label className="fieldset-label mt-4">Senha</label>
                        <input
                            type="password"
                            className="input input-bordered"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <label className="fieldset-label mt-4">Confirmar Senha</label>
                        <input
                            type="password"
                            className="input input-bordered"
                            placeholder="Confirme sua Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}

                        <button type="submit" className="btn btn-primary mt-6">
                            Registrar
                        </button>

                        <div className="text-center mt-4">
                            Já tem uma conta? <Link to="/login" className="link link-hover text-primary">Faça Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}