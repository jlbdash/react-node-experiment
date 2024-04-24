import Button from "./Button.js";
import "./App.css";

function MovieRow(props) {

    const movie = props.movie;

    return (
        <tr id="select" key={movie.id}>
            <td>{movie.name}</td>
            <td>{movie.genre}</td>
            <td>{movie.date}</td>
            <td>{movie.rating}</td>
            <td>
                <div className="App-div">
                    <button onClick={props.onClick}> Update </button>
                 
                    <Button id={movie.id} />
                </div>
            </td>
        </tr>
    );
}

export default MovieRow;