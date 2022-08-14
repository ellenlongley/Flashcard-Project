// This is the form for creating or editing a deck of flashcards.

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";

function DeckForm({isEditing, defaultDeck}) {
    const [name, setName] = useState(defaultDeck?.name || "");
    const [description, setDescription] = useState(defaultDeck?.description || "");
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isEditing) {
            const deck = {...defaultDeck, name, description}
            const updatedDeck = await updateDeck(deck)
            if (updatedDeck) {
                history.push(`/decks/${updatedDeck.id}`);
            }
        } else {
            const deck = {name, description};
            const newDeck = await createDeck(deck);
            if (newDeck) {
                history.push(`/decks/${newDeck.id}`);
            }
        }
        
    };

    return <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input placeholder="Deck Name" type="text" class="form-control" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" value={description} onChange={handleDescriptionChange} placeholder="Brief description of the deck" rows="3"></textarea>
        </div>
        <button class="btn btn-secondary"onClick={() => history.push("/")} >Cancel</button>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
}

export default DeckForm;