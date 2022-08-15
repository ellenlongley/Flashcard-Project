import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import CardForm from "../CardForm";
import { readDeck } from "../utils/api";

function CreateCardScreen() {
    // if creating, use readDeck function
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState();

    useEffect(() => {
        async function fetchDeck() {
            if (deckId) {
                const foundDeck = await readDeck(deckId);
                setDeck(foundDeck);
            }
        }
        fetchDeck()
    }, [deckId])
    return <>
    {deck &&
        <> 
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><a href="#" onClick={() => history.push(`/decks/${deckId}`)}>{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>Create Card</h1>
            <CardForm deckId={deckId} />
        </>
    }
</>
}

export default CreateCardScreen;