import { useHistory } from "react-router-dom";
import DecksList from "../DecksList";

function Home() {
    // list of decks
    const history = useHistory();
    return <div>
        {/* onClick in button needs to history.push to the /decks/new route */}
        <button type="button" class="btn btn-secondary" onClick={() => history.push("/decks/new")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            Create Deck
        </button>
        <DecksList></DecksList>
    </div>
}

export default Home;
