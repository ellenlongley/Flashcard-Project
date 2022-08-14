import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import FlashCardItem from "../FlashCardItem";
import { deleteDeck, listDecks, readDeck } from "../utils/api";

function DeckScreen() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    const history = useHistory();
    const { url } = useRouteMatch();

    useEffect(() => {
        const abortController = new AbortController(); // Create a new `AbortController
        async function findDeck() {
            const foundDeck = await readDeck(deckId)
            setDeck(foundDeck);
        }
        findDeck();
        return () => {
            abortController.abort(); // Cancels any pending request or response
        };
    }, [deckId])

    async function handleDeleteClick() {
        if (window.confirm("Delete this deck? You will not be able to recover it.") == true) {
          await deleteDeck(deckId);
          history.push("/");
        }
      }

    return (
        // create a breadcrumb
        // show the deck info
        // show the buttons for the deck
        // show a CardList component
        <div class="container">
            {deck && 
            <>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
                </nav>
                <div class="card border-light mb-3">
                    <div class="card-body">
                        <h2>{deck.name}</h2>
                        <p class="card-text">{deck.description}</p>
                        <button type="button" class="btn btn-secondary" onClick={() => history.push(`${url}/edit`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                            Edit
                        </button>
                        <button type="button" class="btn btn-primary" onClick={() => history.push(`${url}/study`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>
                            Study
                        </button>
                        <button type="button" class="btn btn-primary" onClick={() => history.push(`${url}/cards/new`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                            Add Cards
                        </button>
                        <button type="button" class="btn btn-danger" onClick={handleDeleteClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <h1>Cards</h1>
                {deck.cards.map((card) => <FlashCardItem key={card.id} card={card} />)}
            </>
            }
        </div>
    )
}

export default DeckScreen;