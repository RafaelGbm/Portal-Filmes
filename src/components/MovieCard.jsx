import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path, backdrop_path }) {
    return (
        <div className=" flex flex-col items-center p-4 gap-4 hover:scale-105 transition duration-300 ease-in-out">
            {/* <h2>{title}</h2> */}
            <h2 className="font-bold text-xl">{title ? title : "Filme sem Nome"}</h2>
            <img src={`https://image.tmdb.org/t/p/w154${poster_path}`} />
            <Link to={`/movies/${id}`}>Saber mais</Link>
        </div>
    )

}