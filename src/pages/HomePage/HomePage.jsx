import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getFilms } from '../../movieSearch-api';
import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getFilms();
        setTrendingMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <h1>КиноКодер</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <h2>Программисты Ищут Фильмы, А Фильмы Ищут Ответы В Их Коде</h2>
      {trendingMovies.length > 0 && <MovieList results={trendingMovies} />}
    </div>
  );
}

export default HomePage;
