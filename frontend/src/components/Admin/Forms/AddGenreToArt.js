import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Search from "../../Search/Search";
import {addGenreToArt} from "../../../services/art_service";

const AddGenreToArt = () => {
    const [genreId, setGenreId] = useState(null)
    const [artId, setArtId] = useState(null)

    const addGenre = async () => {
        await addGenreToArt(artId, genreId)
    }

    return (
        <Container>
            <div className="w-100">
                <Form>
                    <Search setter={setArtId} title='Арт' target='arts'/>
                    <Search setter={setGenreId} title='Жанр' target='genres'/>
                    <div className='mt-3'>
                        <Button onClick={() => addGenre()}>Добавить</Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};
export default AddGenreToArt;