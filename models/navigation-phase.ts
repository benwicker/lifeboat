import {Player} from "./player";
import {Game} from "./game";
import {NavigationCard} from "./navigation-card";

// return value signifies game over
export function NavigationPhase(player: Player, game: Game): Boolean {
    let cardToResolve: NavigationCard;

    if (game.rowDeck.isEmpty()) {
        cardToResolve = game.navigationDeck.drawCards(1).cards[0] as NavigationCard;
    } else {
        cardToResolve = game.rowDeck.pickCard(player) as NavigationCard;
    }

    if (cardToResolve.addBird) {
        game.birdCount++;
        if (game.birdCount >= 4) {
            return true;
        }
    }

    if (cardToResolve.removeBird) {
        if (game.birdCount > 0) {
            game.birdCount--;
        }
    }

    if (cardToResolve.hasThirst) {
        // resolve thirst
    }

    if (cardToResolve.hasFight) {
        // resolve fight
    }

    return false;
}
