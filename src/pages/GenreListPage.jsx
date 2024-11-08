import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function GenresPage() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Requisição para obter os gêneros de filmes
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
            .then(response => response.json())
            .then(data => setGenres(data.genres))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold text-center py-5">Selecione um Gênero</h1>
            <div className="flex flex-wrap justify-center space-x-6">
                {genres.map((genre) => (
                    <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-4"
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
