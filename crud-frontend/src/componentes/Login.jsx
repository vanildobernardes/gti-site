// src/componentes/Login.jsx
import { useState } from 'react'; // Importa useState para gerenciar o estado dos campos
import axios from 'axios';       // Importa axios para fazer requisições HTTP
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate para redirecionar e Link para navegação SPA

// O componente Login agora recebe `onLoginSuccess` como prop.
// A prop `onOpen` foi removida, pois não estava sendo utilizada no componente.
export default function Login ({onLoginSuccess}){
    // Estados para armazenar os valores dos campos de input
    const [username, setUsername] = useState(''); // O backend espera 'username' para login
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para exibir mensagens de erro

    const navigate = useNavigate(); // Hook para navegação programática após o login

    // Função que será executada ao submeter o formulário de login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        setError(''); // Limpa qualquer mensagem de erro anterior

        try {
            // Faz uma requisição POST para o seu endpoint de login no backend
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                username, // Envia o nome de usuário (ou email, se o backend aceitar assim)
                password, // Envia a senha
            });

            // Se a requisição for bem-sucedida, o backend deve retornar o token e talvez dados do usuário
            const { token, user } = response.data;

            // Armazena o token JWT no localStorage para persistência da sessão
            localStorage.setItem('token', token);
            // Opcional: Armazenar informações básicas do usuário (sem a senha!)
            localStorage.setItem('user', JSON.stringify(user));

            console.log("Login bem-sucedido!", response.data); // Log para depuração

            // Notifica o componente pai (App.jsx) que o login foi um sucesso
            // Isso acionará a atualização do estado de autenticação no App.jsx
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            // Redireciona o usuário para uma página protegida da aplicação (ex: /aparelhos)
            navigate('/aparelhos');

        } catch (err) {
            // Captura erros da requisição (ex: 401 Unauthorized do backend por credenciais inválidas)
            console.error("Erro de login:", err.response ? err.response.data : err.message);
            // Exibe uma mensagem de erro amigável para o usuário
            setError(err.response?.data?.error || "Erro ao tentar login. Verifique suas credenciais.");
        }
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login agora!</h1>
                        <p className="py-6">
                            Acesse sua conta para gerenciar o estoque de aparelhos.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        {/* O onSubmit deve ser na tag <form> para que a submissão funcione corretamente */}
                        <form className="card-body" onSubmit={handleSubmit}>
                            <label className="fieldset-label">Nome de Usuário</label>
                            <input
                                type="text" // 'text' é adequado para username
                                className="input input-bordered" // Classes DaisyUI para estilização
                                placeholder="Nome de Usuário"
                                value={username} // Vincula o valor ao estado 'username'
                                onChange={(e) => setUsername(e.target.value)} // Atualiza o estado ao digitar
                                required // Campo obrigatório
                            />
                            <label className="fieldset-label mt-4">Senha</label> {/* Adicionado mt-4 para espaçamento */}
                            <input
                                type="password" // Tipo 'password' para ocultar a senha
                                className="input input-bordered"
                                placeholder="Senha"
                                value={password} // Vincula o valor ao estado 'password'
                                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
                                required // Campo obrigatório
                            />
                            {/* Exibe a mensagem de erro se o estado 'error' não estiver vazio */}
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                            <div><a className="link link-hover">Esqueceu a senha?</a></div>
                            {/* Botão de submit único para o formulário de login */}
                            <button type="submit" className="btn btn-neutral mt-4">Login</button>

                            {/* Link para a página de registro */}
                            <div className="text-center mt-4">
                                Não tem uma conta? <Link to="/register" className="link link-hover text-primary">Registre-se</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}