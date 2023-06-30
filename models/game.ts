import {Deck} from "./deck";
import {GameConfiguration} from "./game-configuration";
import {Player} from "./player";

export class Game {
    navigationDeck: Deck
    rowDeck: Deck
    configuration: GameConfiguration
    seats: Player[]
    birdCount: number

    constructor() {
        this.navigationDeck = new Deck([]);
        this.rowDeck = new Deck([]);
        this.configuration = new GameConfiguration();
        this.seats = [];
        this.birdCount = 0;
    }

    swapSeats(player1: Player, player2: Player) {
        const p1Index = this.seats.indexOf(player1);
        const p2Index = this.seats.indexOf(player2);

        this.seats[p1Index] = player2;
        this.seats[p2Index] = player1;
    }
}
