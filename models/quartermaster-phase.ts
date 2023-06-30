import { Player } from "./player";
import { Deck } from "./deck";

// convert to a function
export class QuartermasterPhase {
    perform(conscious_players: Player[], provisionDeck: Deck): void {
        conscious_players.forEach((player) => {
            if (provisionDeck.isEmpty()) { return }

            const card = provisionDeck.pickCard(player);
            player.hand.addCard(card);
        })
    }
}
