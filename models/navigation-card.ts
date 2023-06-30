import {v4 as uuid} from 'uuid';
import {Card} from "./card";

export class NavigationCard extends Card {
    addBird: Boolean;
    removeBird: Boolean;
    hasThirst: Boolean;
    hasFight: Boolean;

    constructor(addBird: Boolean, removeBird: Boolean, hasThirst: Boolean, hasFight: Boolean) {
        super();
        this.addBird = addBird;
        this.removeBird = removeBird;
        this.hasThirst = hasThirst;
        this.hasFight = hasFight;
    }
}
