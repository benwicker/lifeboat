import {Player} from "../models/player";
import {Deck} from "../models/deck";
import {NavigationPhase} from "../models/navigation-phase";
import {NavigationCard} from "../models/navigation-card";
import {Game} from "../models/game";
import {pickCardId} from "../models/game-input";


jest.mock("../models/game-input", () => ({
    pickCardId: jest.fn(),
}));

describe('navigation phase', () => {
    test('when bird count triggers game end', () => {
        let player = new Player();
        player.health = 5;
        player.hasRowed = true;
        player.hasFought = true;
        let card = new NavigationCard(true, false, true, true);
        let game = new Game();
        game.birdCount = game.configuration.NUM_BIRDS_TO_END_GAME - 1;
        game.rowDeck = new Deck([card]);
        (pickCardId as jest.Mock).mockReturnValue(card.id);

        let shouldEndGame = NavigationPhase(player, game);

        expect(shouldEndGame).toBeTruthy();
        expect(player.health).toEqual(5);
    })

    test('when there are 0 cards in the row deck', () => {
        // draw and resolve the top card of the navigation deck
        let player = new Player();
        let card = new NavigationCard(true, false, false, false);

        let game = new Game();
        game.navigationDeck = new Deck([card]);
        game.rowDeck = new Deck([]);

        NavigationPhase(player, game);

        expect(game.birdCount).toEqual(1);
    })
});
