import { OriginalCard } from "./types";

export class Charge {
    execute(activeDeck: OriginalCard[], playableCards: OriginalCard[], cardsOnTable: OriginalCard[]): string {
        return 'charge';
    }
}