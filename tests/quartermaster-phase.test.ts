import { QuartermasterPhase } from "../models/quartermaster-phase";
import {Player} from "../models/player";
import {Deck} from "../models/deck";
import {Card} from "../models/card";

describe('quartermaster phase', () => {
    test('when there are no cards in the provision deck', () => {
        // it skips the phase

        let player = new Player();
        let provisionDeck = new Deck([]);
        let quartermasterPhase = new QuartermasterPhase();

        quartermasterPhase.perform([player], provisionDeck);

        expect(player.hand.isEmpty()).toBeTruthy();
    })

    test('when there are enough cards for all conscious players', () => {
        // it draws the top n cards and each player chooses one and adds it to their hand

        let player = new Player();
        let card = new Card();
        let provisionDeck = new Deck([card]);
        let quartermasterPhase = new QuartermasterPhase();

        quartermasterPhase.perform([player], provisionDeck);

        expect(provisionDeck.isEmpty()).toBeTruthy();
        expect(player.hand.cards).toEqual([card]);
    })

    test('when there are cards but not enough for all players', () => {
        let player1 = new Player();
        let player2 = new Player();
        let card = new Card();
        let provisionDeck = new Deck([card]);
        let quartermasterPhase = new QuartermasterPhase();

        quartermasterPhase.perform([player1, player2], provisionDeck);

        expect(provisionDeck.isEmpty()).toBeTruthy();
        expect(player1.hand.cards).toEqual([card]);
        expect(player2.hand.isEmpty()).toBeTruthy();
    })
});
