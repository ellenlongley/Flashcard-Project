import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import CreateDeckScreen from "../CreateDeckScreen";
import { Switch } from "react-router-dom";
import DeckScreen from "../DeckScreen";
import EditDeckScreen from "../EditDeckScreen";
import StudyScreen from "../StudyScreen";
import CardForm from "../CardForm";
import CreateCardScreen from "../CreateCardScreen";
import EditCardScreen from "../EditCardScreen";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/decks/new" component={CreateDeckScreen} />
          <Route exact path="/decks/:deckId" component={DeckScreen} />
          <Route exact path="/decks/:deckId/edit" component={EditDeckScreen} />
          <Route exact path="/decks/:deckId/study" component={StudyScreen} />
          <Route exact path="/decks/:deckId/cards/new" component={CreateCardScreen} />
          <Route exact path="/decks/:deckId/cards/:cardId/edit" component={EditCardScreen} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
