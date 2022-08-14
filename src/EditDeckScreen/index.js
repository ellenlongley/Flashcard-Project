// This is after clicking the edit button, you get routed here

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeckForm from "../DeckForm";
import { readDeck } from "../utils/api";

// Route will be /decks/:deckId/edit
function EditDeckScreen() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    const history = useHistory();

    useEffect(() => {
        async function fetchDeck() {
            if (deckId) {
                // readDeck from API using readDeck()
                const foundDeck = await readDeck(deckId);
                setDeck(foundDeck);
            }
        }
        fetchDeck()
    }, [deckId])

    // return the same form as the edit screen, but with the deck information in there
    return <>

        {deck && 
            <>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page"><a href="#" onClick={() => history.push(`/decks/${deckId}`)}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                </nav>
                <h1>Edit</h1>
                <DeckForm isEditing={true} defaultDeck={deck} />
            </>
        }
    </>
}

export default EditDeckScreen;