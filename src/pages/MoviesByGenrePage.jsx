import { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';

export default function MoviesByGenrePage() {
    const { genreId } = useParams(); // Obter o id do gênero da URL
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Requisição para obter os filmes filtrados pelo gênero
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br&with_genres=${genreId}`)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => console.error(error));
    }, [genreId]);

    return (
        <div className="min-h-screen bg-gray-900 text-white px-5 py-10">
            <h1 className="text-3xl font-bold mb-6">Filmes de Gênero</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 p-4 rounded-sm">
                        <img 
                            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} 
                            alt={movie.title}
                            className="rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                        <p className="text-sm">{movie.release_date}</p>
                    </div>
                ))}
            </div>

            {/* Outlet para exibir conteúdos adicionais ou detalhes */}
            <Outlet />
        </div>
    );
}
