import {v4 as uuid} from 'uuid';

export class Card {
    id: string;
    isFaceUp: boolean;

    constructor() {
        this.id = uuid();
        this.isFaceUp = false;
    }
}
