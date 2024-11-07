const NoMovie = ( {search} ) => {
    return (
        <div className="noMovieFound">
        No results found for: {search.length ?  search : 'your query'}
        </div>
    )
}

export default NoMovie
