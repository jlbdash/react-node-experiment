import "./App.css";

function AddMovie(props) {
const [movie, setMovie] = useState(defaultMovie);

const onSubmit = (event) => {
    // prevent the form from doing it's normal job, we want to do everything async
    event.preventDefault();
    // make a fetch request
    fetch("http://localhost:4000/movies", {
      method: "POST",
      body: JSON.stringify(movie),
    }).then(() => {
      props.onChange();
      setMovie(defaultMovie);
    });
  };

    return (
        <>
            Add to the List!

            <form name="handlemovie" id="handlemovie" onSubmit={onSubmit}>
                <label>Title: <input type="text" name="name" id="name" onChange={(event) => setMovie({ ...movie, name: event.target.value })} required /> </label> <br />
                <label>Genre: <input type="text" name="genre" id="genre" onChange={(event) => setMovie({ ...movie, genre: event.target.value })} required /></label> <br />
                <label>Release Date: <input type="text" name="date" id="date" onChange={(event) => setMovie({ ...movie, date: event.target.value })} required /></label> <br />
                <label>Rating: <input type="text" name="rating" id="rating" onChange={(event) => setMovie({ ...movie, rating: event.target.value })} required /></label> <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    );

}

export default AddMovie;
