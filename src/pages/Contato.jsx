import { useState } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Seu nome é ${nome}, seu e-mail é ${email} e a mensagem é ${mensagem}`);

    setNome("");
    setEmail("");
    setMensagem("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white">Entre em Contato</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-300">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-300">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows="5"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-800  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
