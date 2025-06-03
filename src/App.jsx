
import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = 'a09b0a93';
const DEBOUNCE_DELAY = 500;

function App() {
  const [term, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [term]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const search = debouncedTerm || 'Avengers'; 
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [debouncedTerm]);

  return (
    <>
      <h3>Movies</h3>
      <input
        type="text"
        value={term}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter movie title"
      />

      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies to show</p>
        ) : (
          movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
