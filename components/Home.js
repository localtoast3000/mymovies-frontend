import { useState, useEffect } from 'react';
import { Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Movie from './Movie';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';

function Home() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    return async () => {
      const res = await fetch('https://mymovies-web-api-xgex.vercel.app/movies');
      const data = await res.json();

      setMoviesData(
        data.movies.map(({ title, poster_path, vote_average, vote_count, overview }) => ({
          title: title,
          poster: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          voteAverage: vote_average,
          voteCount: vote_count,
          overview: overview,
        }))
      );
    };
  }, []);

  // useEffect(() => {
  //   console.log(moviesData);
  // }, [moviesData]);

  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className='likedMovie'>{data}</span>
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => updateLikedMovies(data)} className={styles.crossIcon} />
      </div>
    );
  });

  const popoverContent = <div className={styles.popoverContent}>{likedMoviesPopover}</div>;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src='logo.png' alt='Logo' />
          <img className={styles.logo} src='logoletter.png' alt='Letter logo' />
        </div>
        <Popover title='Liked movies' content={popoverContent} className={styles.popover} trigger='click'>
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>
        {moviesData.map((data, i) => (
          <Movie
            key={i}
            updateLikedMovies={updateLikedMovies}
            isLiked={likedMovies.some((movie) => movie === data.title)}
            title={data.title}
            overview={data.overview}
            poster={data.poster}
            voteAverage={data.voteAverage}
            voteCount={data.voteCount}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
