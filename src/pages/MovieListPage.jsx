import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MovieListPage() {
  const [search, setSearch] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`
    )
      .then((response) => response.json())
      .then((data) => setFilmes(data.results))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-5 py-10">
      <h2 className="text-4xl font-semibold text-center text-white mb-8">
        Veja o catálogo completo de filmes
      </h2>

      {/* Barra de pesquisa */}
      <div className="flex justify-center mb-6">
        <input
          className="w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          type="text"
          id="search"
          value={search}
          onChange={handleSearch}
          placeholder="Pesquise por um filme..."
        />
      </div>

      {/* Lista de filmes */}
      <section className="flex flex-wrap justify-center gap-6">
        {isLoading ? (
          <div className="text-center text-xl text-gray-400">Carregando...</div>
        ) : filmesFiltrados.length > 0 ? (
          filmesFiltrados.map((filme) => (
            <MovieCard key={filme.id} {...filme} />
          ))
        ) : (
          <div className="text-center text-xl text-gray-400">
            Filme não encontrado
          </div>
        )}
      </section>
    </div>
  );
}
