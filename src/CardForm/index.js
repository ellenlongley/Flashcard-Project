// This is the form for editing OR creating a card.

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

function CardForm({deckId, defaultCard}) {   
    const history = useHistory(); 
    const [card, setCard] = useState(defaultCard || undefined);

    function handleCardFrontChange(e) { 
        const updatedCardValue = {...card, front: e.target.value};
        setCard(updatedCardValue);
    }

    function handleCardBackChange(e) { 
        const updatedCardValue = {...card, back: e.target.value};
        setCard(updatedCardValue);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (defaultCard) {
            // editing
            const updatedCard = updateCard(card);
        } else {
            //creating
            const createdCard = createCard(deckId, card);
        }
        setCard(undefined);
    }

    return <>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="front" class="form-label">Front</label>
                <textarea class="form-control" id="front" value={card ? card.front : ""} onChange={handleCardFrontChange} placeholder="Front side of card" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <label for="back" class="form-label">Back</label>
                <textarea class="form-control" id="back" value={card ? card.back : ""} onChange={handleCardBackChange} placeholder="Back side of card" rows="3"></textarea>
            </div>
            <button class="btn btn-secondary"onClick={() => history.push(`/decks/${deckId}`)} >Done</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>
}

export default CardForm;