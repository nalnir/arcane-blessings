export enum EffectType {
    ON_CARD_PLACEMENT = "ON_CARD_PLACEMENT",
    AFTER_BASIC_ATTACK = "AFTER_BASIC_ATTACK",
    AFTER_OPPONENT_BASIC_ATTACK = "AFTER_OPPONENT_BASIC_ATTACK",
    AFTER_END_TURN = "AFTER_END_TURN",
    AFTER_OPPONENT_END_TURN = "AFTER_OPPONENT_END_TURN"
}
type NumberBetweenOneAndTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface PowerEntry {
    creator: string; // Ethereum address
    description: string; // Up to 50 characters
    takesEffect: EffectType; // Enum for effect type
    level: NumberBetweenOneAndTen,
    fee: NumberBetweenOneAndTen,
    execute: (data: SpecialAttackData) => SpecialAttackData;
}
  

export interface OriginalCard {
    name: string,
    description: string,
    image_url: string,
    metadata: {
        health: number,
        attackPower: number,
        manaCost?: number,
        special?: string,
        creatorPlayerName: string,
        creatorAddress: string,
        creatorLoreName: string,
        cardType: string,
        cardTypeId: string,
        collection?: string,
        generation: number,
        ipfsCID?: string,
        imageId: string
    },
    orders?: {
        sell_orders?: Array<{
            buy_decimals: number,
            buy_quantity: {
                hex: string,
                type: string
            },
            order_id: number,
            status: string,
            user: string
        }>
    },
    token_id?: string,
    token_address?: string
}

export interface Hero {
    health: number;
}

export interface SpecialAttackData {
    attackingCard: OriginalCard
    attackerCardsOnBoard: OriginalCard[]
    attackerCardInHand: OriginalCard[]
    attackerDeck: OriginalCard[]
    attackerDiscardedCards: OriginalCard[]
    attackerHero: Hero

    attackedCard: OriginalCard
    opponentCardsOnBoard: OriginalCard[]
    opponentCardInHand: OriginalCard[]
    opponentDeck: OriginalCard[]
    opponentDiscardedCards: OriginalCard[]
    opponentHero: Hero
}