import {Player} from "./player";
import {getRequestResponse, pickAction, pickCardId, pickPersonToMug, requestSeat} from "./game-input";
import {Game} from "./game";
import {fight} from "./fight";

export enum ActionType {
    DO_NOTHING,
    ROW,
    CHANGE_SEAT,
    MUG,
    PLAY_CARD
}

export function ActionPhase(player: Player, game: Game): ActionType {
    const actionType = pickAction();

    switch(actionType) {
        case ActionType.DO_NOTHING:
            return actionType;
        case ActionType.ROW:
            player.hasRowed = true;

            let choseDeck = game.navigationDeck.drawCards(game.configuration.NUM_DRAW_ON_ROW);
            let chosenCard = choseDeck.removeCard(pickCardId(choseDeck));
            game.rowDeck.addCard(chosenCard);
            game.navigationDeck.addDeck(choseDeck);
            return actionType;
        case ActionType.CHANGE_SEAT:
            const requestedSeatIndex = requestSeat();
            const seatHolder = game.seats[requestedSeatIndex];
            let shouldChangeSeats = getRequestResponse(seatHolder);

            if(!shouldChangeSeats) {
                shouldChangeSeats = fight(player, seatHolder, game);
            }

            if(shouldChangeSeats) {
                game.swapSeats(player, seatHolder);
            }

            return actionType;
        case ActionType.MUG:
            const personToMug = pickPersonToMug();
            let shouldTakeItem = getRequestResponse(personToMug);

            if(!shouldTakeItem) {
                shouldTakeItem = fight(player, personToMug, game);
            }

            if(shouldTakeItem) {
                let cardToTake = pickCardId(personToMug.allCards());
                player.swapItem(personToMug, [], [cardToTake]);
            }

            return actionType;
        case ActionType.PLAY_CARD:
            // resolve card effect?

            return actionType;
    }
}
