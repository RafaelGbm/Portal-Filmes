import { useState, useEffect } from "react";

const CarrosselInfinito = ({ imagens }) => {
    const [startIndex, setStartIndex] = useState(0);
    const itensPorPagina = 7;

    // Função para avançar para a próxima "página" do carrossel
    const avancar = () => {
        setStartIndex((prevIndex) => (prevIndex + itensPorPagina) % imagens.length);
    };

    // Função para voltar para a página anterior
    const voltar = () => {
        setStartIndex((prevIndex) =>
            (prevIndex - itensPorPagina + imagens.length) % imagens.length
        );
    };

    // Pegando o conjunto de imagens visíveis
    const imagensVisiveis = [
        ...imagens.slice(startIndex, startIndex + itensPorPagina),
        ...imagens.slice(0, Math.max(0, startIndex + itensPorPagina - imagens.length)),
    ];

    return (
        <div className="relative w-full overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-4">Carrossel Infinito</h2>

            <div className="relative flex items-center">
                {/* Botão para a esquerda */}
                <button
                    className="absolute left-0 z-10 p-2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full ml-2"
                    onClick={voltar}
                >
                    &lt;
                </button>

                {/* Carrossel de Imagens */}
                <div className="flex space-x-4 overflow-hidden w-full">
                    {imagensVisiveis.map((imagem, index) => (
                        <div
                            key={index}
                            className="min-w-[14.285%] flex-shrink-0 transition-transform duration-500 ease-in-out"
                        >
                            <img
                                src={imagem}
                                alt={`Imagem ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Botão para a direita */}
                <button
                    className="absolute right-0 z-10 p-2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full mr-2"
                    onClick={avancar}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default CarrosselInfinito;
