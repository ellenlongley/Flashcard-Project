// This tells the edit form to create a new deck of flashcards.

import { useHistory } from "react-router-dom";
import DeckForm from "../DeckForm";

function CreateDeckScreen() {
    const history = useHistory();

    return (
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <DeckForm />
            
        </div>
    )
}

export default CreateDeckScreen;