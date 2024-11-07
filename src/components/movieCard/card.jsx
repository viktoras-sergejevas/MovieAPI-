const MovieCard = ({ data = [] }) => {
  const movie10 = data.slice(0, 10);
  console.log(data);
  return (
    <div className="movieCardContainer">
      {movie10?.map((item) => {
        return (
          <div key={item.id} className="movieCard">
            <div className="innerCard">
              <div className="movieImage">
                <img
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                  alt={item.title}
                />
              </div>
              <div className="movieDescription">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.overview}</p>
                <p className="text-muted">Average score: {item.vote_average}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
