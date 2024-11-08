export default function Login({ isLogged, handleLogin }) {


    return (
        <div className="flex gap-4 items-center">
            {isLogged && <p>Olá, usuário</p>}
            <button
                onClick={handleLogin}
                className={`${isLogged ? "bg-blue-800 border-white text-white" : "bg-white text-blue-800"}  px-4 py-1 rounded`}>
                {isLogged ? "Logout" : "Login"}
            </button>
        </div>
    )
}