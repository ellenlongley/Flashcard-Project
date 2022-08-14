import { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { useHistory } from "react-router-dom";

function DecksList () {
    const [decks, setDecks] = useState([])
    const history = useHistory();

    async function getDecks() {
        const foundDecks = await listDecks();
        setDecks(foundDecks)
    }

    useEffect(() => {
        const abortController = new AbortController(); // Create a new `AbortController
        getDecks();
        return () => {
            abortController.abort(); // Cancels any pending request or response
        };
    }, [])


    async function handleDeleteClick(id) {
        if (window.confirm("Delete this deck? You will not be able to recover it.") == true) {
          await deleteDeck(id);
          await getDecks();
        }
      }

    return <div class="container">
        {decks.map((deck, index) => {
            return <div key={deck.id} class="card">
            <div class="card-body">
              <h5 class="card-title">{deck.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</h6>
              <p class="card-text">{deck.description}</p>
              <button type="button" class="btn btn-secondary" onClick={() => history.push(`/decks/${deck.id}`)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
                  View
              </button>
              <button type="button" class="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                </svg>
                  Study
              </button>
              <button type="button" class="btn btn-danger" onClick={() => handleDeleteClick(deck.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </button>
            </div>
          </div>
        })}

  </div>
}

export default DecksList;