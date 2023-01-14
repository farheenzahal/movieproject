import React from 'react'
import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import API from './API';
import Table from 'react-bootstrap/Table';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete  } from "react-icons/ai";

const AddMovie = ({onAdd}) => {
    const[name,setName] = useState("");
    const[genre,setGenre] = useState("");
    const[starring,setStarring] = useState("");
    const[movieId,setMovie] = useState(null);
    const[movies,setMovies] = useState([]);

    useEffect(() => {
        refreshMovies();
    },[]);

    const refreshMovies = () =>{
        API.get("/")
        .then((res) => {
            setMovies(res.data);
        })
        .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item= {name,genre,starring};
        API.post("/",item).then(() => refreshMovies());
    };

    const onUpdate = (id) => {
        let item= {name,genre,starring};
        API.patch(`/${id}/`,item).then((res) => refreshMovies());
    };

    const onDelete = (id) => {
       
        API.delete(`/${id}/`).then((res) => refreshMovies());
    };

    function selectMovie(id){
        let item=movies.filter((movie) => movie.id === id)[0];
        setName(item.name);
        setGenre(item.genre);
        setStarring(item.starring);
        setMovie(item.id);
    }
  return (
    <div>
        <h2>Create a New movie</h2><br/>

        
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>{movieId}Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={name}
        onChange={(e) => setName(e.target.value)} />
    
      </Form.Group>

      <Form.Group className="mb-3" controlId="genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" placeholder="Enter Genre" value={genre}
        onChange={(e) => setGenre(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="staring">
        <Form.Label>Starring</Form.Label>
        <Form.Control type="text" placeholder="Enter Starring" value={starring}
        onChange={(e) => setStarring(e.target.value)} />
      </Form.Group>
      <Button  variant="primary" type="submit" onClick={onSubmit}>
        Save
      </Button>
      <Button variant="primary" type="button" onClick={() => onUpdate(movieId)}>
        Update
      </Button>
    </Form>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Movie Name</th>
          <th scope="col">Genre</th>
          <th scope="col">Starring</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie,index) =>{
            return(
                <tr key="">
                    <th scope="row">{movie.id}</th>
                    <td>{movie.name}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.starring}</td>
                    <td>
                        <Button variant ="primary" type="submit" onClick={() => selectMovie(movie.id)}><CiEdit/></Button>
                    </td>
                    <td>
                        <Button variant ="primary" type="submit" onDelete={() => (movie.id)}><AiOutlineDelete/></Button>
                    </td>
                </tr>
            );
        })}
      </tbody>
    </Table>
    </div>
  );
};

export default AddMovie
