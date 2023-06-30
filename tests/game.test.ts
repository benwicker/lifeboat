import { Game } from "../models/game";
import {Player} from "../models/player";

describe('swap seats', () => {
    test('swaps players seats', () => {
        const player1 = new Player();
        const player2 = new Player();
        let game = new Game();
        game.seats = [player1, player2];

        game.swapSeats(player1, player2)

        expect(game.seats).toEqual([player2, player1])
    })
});
