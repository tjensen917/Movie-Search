import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import {searchMovies, getPopularMovies} from "../services/api"
import "../css/Home.css"


function Home() {
    // name of state, function to update the state... keeps info while re-rendering occurs
    const [searchQuery, setSearchQuery] = useState("");
    // storing in state so that when movies list is updated, it will re-render
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // load movies by calling api, loading data, catching errors
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies() 
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        //prevents the page from refreshing after clicking button
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
        //sets value of text
        setSearchQuery("")
    };


    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery} //user input
                    onChange={(e) => setSearchQuery(e.target.value)} //allows user to enter input and update the search box
                    > 
                </input>
                <button type="submit" className="search-button">Search</button>

            </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading...</div> 
        ) : (
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        )}
        </div>
    );
}

export default Home;