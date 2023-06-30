import {Card} from "./card";
import {Player} from "./player";
import {pickCardId} from "./game-input";

export class Deck {
    cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    isEmpty(): boolean {
        return this.cards.length === 0;
    }

    pickCard(player: Player): Card {
        const id = pickCardId(this);
        return this.removeCard(id);
    }

    removeCard(id: string): Card {
        const index = this.cards.findIndex((card) => card.id === id);
        return this.cards.splice(index, 1)[0];
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    addDeck(deck: Deck) {
        this.cards = this.cards.concat(deck.cards);
        deck.cards = [];
    }

    drawCards(n: number): Deck {
        return new Deck(this.cards.splice(0, n));
    }
}
