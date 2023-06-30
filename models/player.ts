import {v4 as uuid} from 'uuid';
import {Deck} from "./deck";

export class Player {
    id: string
    health: number
    hand: Deck
    hasRowed: boolean
    hasFought: boolean

    constructor() {
        this.hand = new Deck([]);
        this.hasRowed = false;
        this.hasFought = false;
        this.id = uuid();
        this.health = 5;
    }

    swapItem(playerToSwapWith: Player, mySwapItemIds: string[], theirSwapItemIds: string[]) {
        mySwapItemIds.forEach(card_id => {
            let card = this.hand.removeCard(card_id);
            playerToSwapWith.hand.addCard(card);
        })

        theirSwapItemIds.forEach(card_id => {
            let card = playerToSwapWith.hand.removeCard(card_id);
            this.hand.addCard(card);
        })
    }

    allCards(): Deck {
        // this needs to eventually also return all cards in front of a player as well
        return this.hand
    }
}
