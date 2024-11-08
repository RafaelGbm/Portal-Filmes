import { useEffect, useState } from 'react';

export default function MovieListsPage() {
    const [watchList, setWatchList] = useState([]);
    const [watchedList, setWatchedList] = useState([]);

    useEffect(() => {
        const savedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];
        const savedWatchedList = JSON.parse(localStorage.getItem("watchedList")) || [];
        setWatchList(savedWatchList);
        setWatchedList(savedWatchedList);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-5">
            <h1 className="text-3xl font-bold mb-5">Minha Lista de Filmes</h1>

            <h2 className="text-2xl font-semibold mt-10">Para Ver Depois</h2>
            <ul className="mt-4 flex flex-row gap-10">
                {watchList.length > 0 ? (
                    watchList.map(movie => (
                        <li key={movie.id} className="mb-4">
                            <h3 className="text-xl font-semibold">{movie.title}</h3>
                            <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} />
                            <p className="text-gray-400">{movie.release_date}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">Nenhum filme na lista "Para Ver Depois".</p>
                )}
            </ul>

            <h2 className="text-2xl font-semibold mt-10">Assistidos</h2>
            <ul className="mt-4 flex flex-row gap-10">
                {watchedList.length > 0 ? (
                    watchedList.map(movie => (
                        <li key={movie.id} className="mb-4">
                            <h3 className="text-xl font-semibold">{movie.title}</h3>
                            <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} />
                            <p className="text-gray-400">{movie.release_date}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">Nenhum filme na lista de "Assistidos".</p>
                )}
            </ul>
        </div>
    );
}
