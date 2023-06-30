import {Player} from "../models/player";
import {ActionPhase, ActionType} from "../models/action-phase";
import {getRequestResponse, pickAction, pickCardId, pickPersonToMug, requestSeat} from "../models/game-input";
import {Card} from "../models/card";
import {Game} from "../models/game";
import {Deck} from "../models/deck";
import {fight} from "../models/fight";

jest.mock("../models/game-input", () => ({
    pickAction: jest.fn(),
    pickCardId: jest.fn(),
    requestSeat: jest.fn(),
    getRequestResponse: jest.fn(),
    pickPersonToMug: jest.fn()
}));

jest.mock("../models/fight", () => ({
    fight: jest.fn()
}));

describe('action phase', () => {
    test('when the player does nothing', () => {
        (pickAction as jest.Mock).mockReturnValue(ActionType.DO_NOTHING);
        let player = new Player();
        let game = new Game();

        const actionType = ActionPhase(player, game);

        expect(actionType).toEqual(ActionType.DO_NOTHING);
    })

    test('when the player rows', () => {
        let player = new Player();
        const card1 = new Card();
        const card2 = new Card();
        const card3 = new Card();
        let game = new Game();
        game.navigationDeck = new Deck([card1, card2, card3]);

        (pickAction as jest.Mock).mockReturnValue(ActionType.ROW);
        (pickCardId as jest.Mock).mockReturnValue(card2.id);

        const actionType = ActionPhase(player, game);

        expect(actionType).toEqual(ActionType.ROW);
        expect(player.hasRowed).toBeTruthy();
        expect(game.rowDeck.cards).toEqual([card2]);
        expect(game.navigationDeck.cards).toEqual([card3, card1]);
    })

    /// player takes the change seat action

    test('p1 change seat with p3: win with no fight', () => {
        /// setup
        let player1 = new Player();
        let player2 = new Player();
        let player3 = new Player();

        let game = new Game();
        game.seats = [player1, player2, player3];

        (pickAction as jest.Mock).mockReturnValue(ActionType.CHANGE_SEAT);
        (requestSeat as jest.Mock).mockReturnValue(2);
        (getRequestResponse as jest.Mock).mockReturnValue(true);

        /// action
        const actionType = ActionPhase(player1, game);

        /// result
        expect(actionType).toEqual(ActionType.CHANGE_SEAT);
        expect(game.seats).toEqual([player3, player2, player1]);
    })

    test('p1 change seats with p3: win fight', () => {
        /// setup
        let player1 = new Player();
        let player2 = new Player();
        let player3 = new Player();

        let game = new Game();
        game.seats = [player1, player2, player3];

        (pickAction as jest.Mock).mockReturnValue(ActionType.CHANGE_SEAT);
        (requestSeat as jest.Mock).mockReturnValue(2);
        (getRequestResponse as jest.Mock).mockReturnValue(false);
        (fight as jest.Mock).mockReturnValue(true);

        /// action
        const actionType = ActionPhase(player1, game);

        /// result
        expect(fight).toHaveBeenCalled();
        expect(actionType).toEqual(ActionType.CHANGE_SEAT);
        expect(game.seats).toEqual([player3, player2, player1]);
    })

    test('p1 change seats with p3: lose fight', () => {
        /// setup
        let player1 = new Player();
        let player2 = new Player();
        let player3 = new Player();

        let game = new Game();
        game.seats = [player1, player2, player3];

        (pickAction as jest.Mock).mockReturnValue(ActionType.CHANGE_SEAT);
        (requestSeat as jest.Mock).mockReturnValue(2);
        (getRequestResponse as jest.Mock).mockReturnValue(false);
        (fight as jest.Mock).mockReturnValue(false);

        /// action
        const actionType = ActionPhase(player1, game);

        /// result
        expect(fight).toHaveBeenCalled();
        expect(actionType).toEqual(ActionType.CHANGE_SEAT);
        expect(game.seats).toEqual([player1, player2, player3]);
    })

    /// player takes the mug action

    test('p1 mugs p2: p2 accepts with no fight', () => {
        /// setup
        let player1 = new Player();
        let player2 = new Player();
        let card = new Card();
        player2.hand.addCard(card);

        let game = new Game();

        (pickPersonToMug as jest.Mock).mockReturnValue(player2);
        (pickAction as jest.Mock).mockReturnValue(ActionType.MUG);
        (getRequestResponse as jest.Mock).mockReturnValue(true);
        (pickCardId as jest.Mock).mockReturnValue(card.id);

        /// action
        const actionType = ActionPhase(player1, game);

        /// result
        expect(actionType).toEqual(ActionType.MUG);
        expect(player1.hand.cards).toEqual([card]);
        expect(player2.hand.cards).toEqual([]);
    })

    test('p1 mugs p2: p2 declines. p1 wins fight', () => {
        /// setup
        let player1 = new Player();
        let player2 = new Player();
        let card = new Card();
        player2.hand.addCard(card);

        let game = new Game();

        (pickPersonToMug as jest.Mock).mockReturnValue(player2);
        (pickAction as jest.Mock).mockReturnValue(ActionType.MUG);
        (getRequestResponse as jest.Mock).mockReturnValue(false);
        (fight as jest.Mock).mockReturnValue(true);
        (pickCardId as jest.Mock).mockReturnValue(card.id);

        /// action
        const actionType = ActionPhase(player1, game);

        /// result
        expect(actionType).toEqual(ActionType.MUG);
        expect(player1.hand.cards).toEqual([card]);
        expect(player2.hand.cards).toEqual([]);
    })

    test('p1 mugs p2: p2 declines. p1 loses fight', () => {
        /// setup
        let player1 = new Player();
        let player2 = new Player();
        let card = new Card();
        player2.hand.addCard(card);

        let game = new Game();

        (pickPersonToMug as jest.Mock).mockReturnValue(player2);
        (pickAction as jest.Mock).mockReturnValue(ActionType.MUG);
        (getRequestResponse as jest.Mock).mockReturnValue(false);
        (fight as jest.Mock).mockReturnValue(false);

        /// action
        const actionType = ActionPhase(player1, game);

        /// result
        expect(actionType).toEqual(ActionType.MUG);
        expect(player1.hand.cards).toEqual([]);
        expect(player2.hand.cards).toEqual([card]);
    })

    /// play card
    test('when playing a card', () => {
        let player1 = new Player();
        let game = new Game();

        const actionType = ActionPhase(player1, game);

        expect(actionType).toEqual(ActionType.MUG);
    })
});
