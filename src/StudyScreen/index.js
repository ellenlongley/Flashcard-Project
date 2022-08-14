// Screen to study flashcards, flashcard shows front first, then flip button shows back
// When on back, it needs to show a next button instead

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
function StudyScreen() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    const [cardIndex, setCardIndex] = useState(0);
    const [isCardFlipped, setIsCardFlipped] = useState(false);

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

    // function for when flip button is clicked.
    function flipClick() {
        setIsCardFlipped(!isCardFlipped);
    }

    function nextClicked() {
        if (cardIndex < deck.cards.length - 1) {
            setCardIndex(cardIndex + 1);
            setIsCardFlipped(false);
        } else {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.") == true) {
                setCardIndex(0);
                setIsCardFlipped(false);
              } else {
                history.push("/")
              }
        }
    }
    
    return <>
    {deck && <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" onClick={() => history.push("/")}>Home</a></li>
                <li class="breadcrumb-item active" aria-current="page"><a href="#" onClick={() => history.push(`/decks/${deckId}`)}>{deck.name}</a></li>
                <li class="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h1>{`Study: ${deck.name}`}</h1>
        {
            deck.cards?.length > 2 ? 
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{`Card ${cardIndex + 1} of ${deck.cards.length}`}</h5>
                    <p class="card-text">{isCardFlipped ? deck.cards[cardIndex].back : deck.cards[cardIndex].front}</p>
                    {/* // flip button */}
                    <button type="button" class="btn btn-secondary" onClick={flipClick}>Flip</button>
                    {isCardFlipped && <button type="button" class="btn btn-primary" onClick={nextClicked}>Next</button> }
                </div>
            </div> :
            <div>
                <h2>Not enough cards.</h2>
                <p>{`You need at least 3 cards to study. There are ${deck.cards.length} in this deck.`}</p>
                <button type="button" class="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                    Add Cards
                </button>
            </div>
        }
    </>
    }
    </>
}

export default StudyScreen;