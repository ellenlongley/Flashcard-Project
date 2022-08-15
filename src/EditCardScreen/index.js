import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CardForm from "../CardForm";
import { readCard, readDeck } from "../utils/api";

function EditCardScreen() {
    // if editing, use readDeck function AND readCard function
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

    return <>
    {deck && card &&
        <> 
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><a href="#" onClick={() => history.push(`/decks/${deckId}`)}>{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{`Edit Card ${cardId}`}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <CardForm deckId={deck.id} defaultCard={card} />
        </>
    }
</>
}

export default EditCardScreen;