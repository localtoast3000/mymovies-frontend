import Home from '../components/Home';

function Index(props) {
  return <Home {...props} />;
}

export async function getStaticProps() {
  const res = await fetch('https://mymovies-web-api-xgex.vercel.app/movies');
  const data = await res.json();

  return {
    props: {
      moviesData: data.movies.map(({ title, poster_path, vote_average, vote_count, overview }) => ({
        title: title,
        poster: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        voteAverage: vote_average,
        voteCount: vote_count,
        overview: overview,
      })),
    },
  };
}

export default Index;
