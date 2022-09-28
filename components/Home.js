import { useState, useEffect } from 'react';
import { Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Movie from './Movie';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';

function Home({ moviesData }) {
  const [likedMovies, setLikedMovies] = useState([]);

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
