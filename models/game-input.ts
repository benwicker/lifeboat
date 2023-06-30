import {Deck} from "./deck";
import {ActionType} from "./action-phase";
import {Player} from "./player";

export function pickCardId(deck: Deck): string {
    const card = deck.cards[Math.floor(Math.random() * deck.cards.length)];
    return card.id;
}

export function pickAction(): ActionType {
    return ActionType.DO_NOTHING
}

export function requestSeat(): number {
    return 0;
}

export function getRequestResponse(player: Player): boolean {
    return true;
}

export function pickPersonToMug(): Player {
    return new Player;
}
