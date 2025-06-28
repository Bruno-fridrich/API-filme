import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn, GenreFilter } from "./style";
import { Link } from "react-router-dom";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`)
            .then((res) => res.json())
            .then((data) => setGenres(data.genres));
    }, [KEY]);

    useEffect(() => {
        const url = selectedGenre
            ? `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=${selectedGenre}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovies(data.results));
    }, [KEY, selectedGenre]);

    return (
        <Container>
            <h1>Movies</h1>
            <GenreFilter onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">Todos os gêneros</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </GenreFilter>
            <MovieList>
                {movies.map((movie) => {
                    return (
                        <Movie key={movie.id}>
                            <img
                                src={`${imagePath}${movie.poster_path}`}
                                alt="{movie.title}"
                            />
                            <span>{movie.title}</span>

                            <Link to={`/${movie.id}`}>
                                <Btn>Detalhes</Btn>
                            </Link>
                        </Movie>
                    );
                })}
            </MovieList>
        </Container>
    );
}

export default Home;