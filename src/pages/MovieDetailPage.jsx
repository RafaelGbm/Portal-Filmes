import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [message, setMessage] = useState(""); // Novo estado para a mensagem

    useEffect(() => {
        // Requisição para detalhes do filme
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error(error));

        // Requisição para o elenco do filme
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
            .then(response => response.json())
            .then(data => setCast(data.cast))
            .catch(error => console.error(error));

        // Requisição para o trailer do filme
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
            .then(response => response.json())
            .then(data => {
                const trailerVideo = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
                if (trailerVideo) {
                    setTrailer(trailerVideo.key);
                }
            })
            .catch(error => console.error(error));
    }, [id]);

    const addToList = (listName) => {
        const list = JSON.parse(localStorage.getItem(listName)) || [];
        if (!list.some(item => item.id === movie.id)) {
            list.push(movie);
            localStorage.setItem(listName, JSON.stringify(list));
            setMessage(`${movie.title} foi adicionado à lista de ${listName === 'watchList' ? 'ver depois' : 'assistidos'}.`);
            setTimeout(() => setMessage(""), 3000); // Limpa a mensagem após 3 segundos
        }
    };

    const removeFromList = (listName) => {
        let list = JSON.parse(localStorage.getItem(listName)) || [];
        list = list.filter(item => item.id !== movie.id);
        localStorage.setItem(listName, JSON.stringify(list));
        setMessage(`${movie.title} foi removido da lista de ${listName === 'watchList' ? 'ver depois' : 'assistidos'}.`);
        setTimeout(() => setMessage(""), 3000); // Limpa a mensagem após 3 segundos
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Banner do filme */}
            <div 
                className="relative h-64 md:h-96 bg-cover bg-center" 
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                </div>
            </div>

            {/* Seção de detalhes do filme */}
            <div className="container mx-auto px-5 py-10 md:flex md:space-x-10">
                {/* Poster do filme */}
                <div className="flex-shrink-0 mb-5 md:mb-0">
                    <img 
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={`Poster do filme ${movie.title}`} 
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Informações do filme */}
                <div className="flex-grow">
                    <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
                    <p className="text-gray-300 text-lg mb-4">{movie.overview}</p>

                    <p className="text-lg"><strong>Data de Lançamento:</strong> {movie.release_date}</p>
                    <p className="text-lg"><strong>Avaliação:</strong> {movie.vote_average} / 10</p>

                    {/* Elenco */}
                    <h3 className="text-2xl font-semibold mt-8 mb-4">Elenco</h3>
                    <ul className="text-gray-300">
                        {cast.slice(0, 5).map((actor) => (
                            <li key={actor.id} className="mb-2">
                                <strong>{actor.name}</strong> como {actor.character}
                            </li>
                        ))}
                    </ul>

                    {/* Trailer do filme */}
                    {trailer && (
                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold mb-4">Trailer Oficial</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                    )}

                    {/* Mensagem de sucesso */}
                    {message && (
                        <div className="bg-green-600 text-white text-center py-2 mt-4 rounded-lg">
                            {message}
                        </div>
                    )}

                    {/* Botões para adicionar/remover das listas */}
                    <div className="flex space-x-4 mt-8">
                        <button
                            onClick={() => addToList("watchList")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Adicionar para Ver Depois
                        </button>
                        <button
                            onClick={() => removeFromList("watchList")}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Remover de Ver Depois
                        </button>
                        <button
                            onClick={() => addToList("watchedList")}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Marcar como Assistido
                        </button>
                        <button
                            onClick={() => removeFromList("watchedList")}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                            Remover de Assistidos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
