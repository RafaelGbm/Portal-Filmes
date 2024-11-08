import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);
    const [filmesRecomendados, setFilmesRecomendados] = useState([]); // Estado para filmes recomendados
    const [startIndexPopulares, setStartIndexPopulares] = useState(0);
    const [startIndexTrending, setStartIndexTrending] = useState(0);
    const [startIndexUpcoming, setStartIndexUpcoming] = useState(0);
    const itensPorPagina = 7;

    // Função para recuperar os filmes salvos no LocalStorage
    const fetchRecomendados = () => {
        const filmesSalvos = JSON.parse(localStorage.getItem('watchedList')) || [];
        setFilmesRecomendados(filmesSalvos);
    };

    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
            ]);

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results || []);
            setFilmesTrending(trendingData.results || []);
            setFilmesUpcoming(upcomingData.results || []);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchRecomendados(); // Carrega filmes recomendados ao montar o componente
    }, []);

    const avancar = (setStartIndex, filmes) => {
        setStartIndex((prevIndex) => (prevIndex + itensPorPagina) % filmes.length);
    };

    const voltar = (setStartIndex, filmes) => {
        setStartIndex((prevIndex) => (prevIndex - itensPorPagina + filmes.length) % filmes.length);
    };

    const renderCarrossel = (filmes, startIndex, setStartIndex) => {
        if (!filmes || filmes.length === 0) return null; // Verifica se filmes não está vazio ou undefined

        const imagensVisiveis = [
            ...filmes.slice(startIndex, startIndex + itensPorPagina),
            ...filmes.slice(0, Math.max(0, startIndex + itensPorPagina - filmes.length)),
        ];

        return (
            <div className="relative w-full p-8 overflow-hidden mb-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                    <button
                        className="absolute left-0 z-10 p-3 text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-80 transition-all rounded-full ml-2 transform hover:scale-110"
                        onClick={() => voltar(setStartIndex, filmes)}
                    >
                        &lt;
                    </button>

                    <div className="flex space-x-6 overflow-hidden w-full">
                        {imagensVisiveis.map((filme, index) => (
                            <div
                                key={filme.id}
                                className="min-w-[14.285%] flex-shrink-0 transition-transform duration-700 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 rounded-lg"
                            >
                                <MovieCard {...filme} />
                            </div>
                        ))}
                    </div>

                    <button
                        className="absolute right-0 z-10 p-3 text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-80 transition-all rounded-full mr-2 transform hover:scale-110"
                        onClick={() => avancar(setStartIndex, filmes)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-tl from-gray-900 to-black text-white px-8 py-12">
            <h2 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">Populares</h2>
            {renderCarrossel(filmesPopulares, startIndexPopulares, setStartIndexPopulares)}

            <h2 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">Trending</h2>
            {renderCarrossel(filmesTrending, startIndexTrending, setStartIndexTrending)}

            <h2 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">Upcoming</h2>
            {renderCarrossel(filmesUpcoming, startIndexUpcoming, setStartIndexUpcoming)}

            {/* Se houver filmes no LocalStorage, mostrar o carrossel "Recomendados para você" */}
            {filmesRecomendados.length > 0 && (
                <div>
                    <h2 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">Recomendados para Você</h2>
                    {renderCarrossel(filmesRecomendados, startIndexPopulares, setStartIndexPopulares)} {/* Reutilizando startIndexPopulares para o carrossel */}
                </div>
            )}
        </div>
    );
}
