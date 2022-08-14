// This is the form for editing OR creating a card.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";

function CardForm() {
    // if editing, use readDeck function AND readCard function
    // if creating, use readDeck function
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState();
    const history = useHistory();
    const [card, setCard] = useState();

    useEffect(() => {
        async function fetchDeck() {
            if (deckId) {
                const foundDeck = await readDeck(deckId);
                setDeck(foundDeck);
            }
        }
        fetchDeck()
    }, [deckId])

    useEffect(() => {
        async function fetchCard() {
            if (cardId) {
                const foundCard = await readCard(cardId);
                setCard(foundCard);
            }
        }
        fetchCard()
    }, [cardId])

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
        if (cardId) {
            // editing
            const updatedCard = updateCard(card);
        } else {
            //creating
            const createdCard = createCard(deckId, card);
        }
        setCard(undefined);
    }

    return <>
        {deck &&
            <> 
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page"><a href="#" onClick={() => history.push(`/decks/${deckId}`)}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{cardId ? `Edit Card ${cardId}`: "Add Card" }</li>
                    </ol>
                </nav>
                <h1>{cardId ? `Edit Card`: `${deck.name}: Add Card` }</h1>
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
    </>
}

export default CardForm;