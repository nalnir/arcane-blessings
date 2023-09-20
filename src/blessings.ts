import { OriginalCard, SpecialAttackData } from "./types";
import { damage, discard, randomChance, shouldDiscard } from "./utils/helper_functions";

export function arcaneAffinity(data: SpecialAttackData): SpecialAttackData  {
    if(data.attackerCardsOnBoard.length > 0) {
        const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
        const randomIndex = Math.floor(Math.random() * newData.attackerCardsOnBoard.length);
        const randomCard = newData.attackerCardsOnBoard[randomIndex];
        if(randomCard?.metadata.manaCost) {
            let manaCost = randomCard.metadata.manaCost;
            if (manaCost > 2) {
                manaCost -= 2;
            } else {
                manaCost = 1;
            }
            randomCard.metadata.manaCost = manaCost;
            newData.attackerCardsOnBoard[randomIndex] = randomCard;
            return newData
        }
        return data
    }
    return data
}

export function arcaneMastery(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if(newData.attackerCardsOnBoard.length > 1) {
        let highestManaCard: OriginalCard = newData.attackerCardsOnBoard[0];
        let highestManaCardIndex = 0
        for (let i = 0; i < newData.attackerCardsOnBoard.length; i++) {
            const card = newData.attackerCardsOnBoard[i];
            if (card?.metadata?.manaCost ?? 0 > highestManaCard?.metadata?.manaCost ?? 0) {
                highestManaCard = card;
                highestManaCardIndex = i;
            }
        }
        highestManaCard!.metadata.manaCost = 1;
        newData.attackerCardsOnBoard[highestManaCardIndex] = highestManaCard;
        return newData;
    }
    return data;
}

export function divineFury(data: SpecialAttackData): SpecialAttackData  {
    let newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if(newData.opponentCardsOnBoard.length > 1 && randomChance(35)) {
        const randomIndex = Math.floor(Math.random() * data.opponentCardsOnBoard.length);
        const randomCard = data.opponentCardsOnBoard[randomIndex];

        const damagedCard = damage(randomCard, data.attackingCard);
        if(shouldDiscard(damagedCard)) {
            const resDiscard = discard(damagedCard, newData.opponentCardsOnBoard, newData.opponentDiscardedCards)
            newData.opponentCardsOnBoard = resDiscard.discardFrom;
            newData.opponentDiscardedCards = resDiscard.discardTo;
        } else {
            newData.opponentCardsOnBoard[randomIndex] = damagedCard;
        }
        return newData;
    }
    return data
}

export function divineShield(data: SpecialAttackData): SpecialAttackData  {
    let newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if(randomChance(45)) {
        const attackingCardIndex = data.attackerCardsOnBoard.findIndex((card) => card.token_id === newData.attackingCard.token_id)
        newData.attackingCard.metadata.health -= newData.attackingCard.metadata.attackPower
        const damagedCard = damage(newData.attackingCard, newData.attackingCard);
        if(shouldDiscard(damagedCard)) {
            const resDiscard = discard(damagedCard, newData.attackerCardsOnBoard, newData.attackerDiscardedCards)
            newData.attackerCardsOnBoard = resDiscard.discardFrom;
            newData.attackerDiscardedCards = resDiscard.discardTo;
        } else {
            newData.attackerCardsOnBoard[attackingCardIndex] = damagedCard;
        }
        return newData;
    }
    return data
}

export function dragonBreath(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if(newData.opponentCardsOnBoard.length > 0) {
        newData.opponentCardsOnBoard.map((card, index) => {
            if(card.token_id !== data.attackedCard.token_id) {
                if(randomChance(35)) {
                    card.metadata.health -= 2
                } else {
                    card.metadata.health -= 1
                }
                if(card.metadata.health <= 0) {
                    newData.opponentDiscardedCards.push(card);
                    return null;
                }
                return card;
            }
            return card;
        }).filter(card => card !== null);
        return newData;
    }
    return data
}

export function frostNova(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function infernalRage(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function lycanthropy(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function ressurect(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function stealth(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function suddenStrike(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function thunderStrike(data: SpecialAttackData): SpecialAttackData  {
    return data
}

export function wisdomGaze(data: SpecialAttackData): SpecialAttackData  {
    return data
}