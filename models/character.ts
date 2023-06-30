enum CharacterState {
    ALIVE,
    UNCONSCIOUS,
    DEAD
}

class Character {
    id: number;
    name: string;
    size: number;
    survivalValue: number;
    state: CharacterState;
}
