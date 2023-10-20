import { LingerEffect, LingerEffectOpTarget, LingerEffectOperation, OriginalCard, SpecialAttackData } from "./types";
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
        const randomIndex = Math.floor(Math.random() * newData.opponentCardsOnBoard.length);
        const randomCard = newData.opponentCardsOnBoard[randomIndex];

        const damagedCard = damage(randomCard, newData.attackingCard);
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
        const attackingCardIndex = newData.attackerCardsOnBoard.findIndex((card) => card.token_id === newData.attackingCard.token_id)
        newData.attackingCard.metadata.health -= newData.attackedCard.metadata.attackPower
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

export function dragonBreath(data: SpecialAttackData): SpecialAttackData {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.opponentCardsOnBoard.length > 0) {
        newData.opponentCardsOnBoard = newData.opponentCardsOnBoard.map((card) => {
            if (card.token_id !== newData.attackedCard.token_id) {
                if (randomChance(35)) {
                    card.metadata.health -= 2;
                } else {
                    card.metadata.health -= 1;
                }
                if (card.metadata.health <= 0) {
                    newData.opponentDiscardedCards.push(card);
                    return null;
                }
                return card;
            }
            return card;
        }).filter((card): card is OriginalCard => card !== null); // Use type assertion here

        return newData;
    }
    return data;
}

export function frostNova(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if(newData.opponentCardsOnBoard.length > 0) {
        const randomIndex = Math.floor(Math.random() * newData.opponentCardsOnBoard.length);
        const randomCard = newData.opponentCardsOnBoard[randomIndex];

        const newLingerEffect: LingerEffect = {
            turns: 1,
            target: [randomCard],
            effects: [{
                operation: LingerEffectOperation.FREEZE,
                opTarget: LingerEffectOpTarget.HEALTH,
                strength: 0
            }],
            shouldRestoreToPreviousState: true,
        }

        newData.lingerEffect = [newLingerEffect];
        return newData
    }
    return data
}

export function infernalRage(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if(newData.opponentCardsOnBoard.length > 0) {
        newData.attackedCard.metadata.health -= data.attackerDiscardedCards.length
        return newData;
    }
    return data
}

export function lycanthropy(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.opponentCardsOnBoard.length > 0) {
        const randomIndex = Math.floor(Math.random() * newData.attackerCardsOnBoard.length);
        const randomCard = newData.attackerCardsOnBoard[randomIndex];

        const takeLifeEffect: LingerEffect = {
            turns: 2,
            target: [newData.attackedCard],
            effects: [{
                operation: LingerEffectOperation.SUBTRACT,
                opTarget: LingerEffectOpTarget.HEALTH,
                strength: 2
            }],
            shouldRestoreToPreviousState: false,
        }

        const addLifeEffect: LingerEffect = {
            turns: 2,
            target: [randomCard],
            effects: [{
                operation: LingerEffectOperation.ADD,
                opTarget: LingerEffectOpTarget.HEALTH,
                strength: 1
            }],
            shouldRestoreToPreviousState: false,
        }

        newData.lingerEffect = [takeLifeEffect, addLifeEffect];
        return newData
    }
    return data
}

export function ressurect(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.attackerDiscardedCards.length > 0) {
        let highestAttack = 0;
        let ressurectedCard: OriginalCard = undefined;
        let ressurectedCardIdx = 0;
        newData.attackerDiscardedCards.forEach((card, index) => {
            if(card.metadata.attackPower > highestAttack) {
                highestAttack = card.metadata.attackPower;
                ressurectedCard = card;
                ressurectedCardIdx = index
            }
        })
        newData.attackerDiscardedCards.splice(ressurectedCardIdx, 1)

        const randomIndex = Math.floor(Math.random() * newData.attackerDeck.length);
        newData.attackerDeck.splice(randomIndex, 0, ressurectedCard);
        return newData;
    }
    return data
}

export function stealth(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.attackerCardsOnBoard.length > 0) {
        const randomIndex = Math.floor(Math.random() * newData.attackerCardsOnBoard.length);
        const randomCard = newData.attackerCardsOnBoard[randomIndex];

        const renderUnblockable: LingerEffect = {
            turns: 3,
            target: [randomCard],
            effects: [{
                operation: LingerEffectOperation.UNBLOCKABLE,
                opTarget: LingerEffectOpTarget.HEALTH,
                strength: 1
            }],
            shouldRestoreToPreviousState: true,
        }

        newData.lingerEffect = [renderUnblockable];
        return newData
    }
    return data
}

export function suddenStrike(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.opponentCardsOnBoard.length > 0) {
        const randomIndex = Math.floor(Math.random() * newData.attackerCardsOnBoard.length);
        const randomCard = newData.attackerCardsOnBoard[randomIndex];
        const chanceDamage = Math.ceil(Math.random() * 6);

        if(randomChance(35)) {
            newData.opponentHero.health -= chanceDamage
            return newData
        }
        randomCard.metadata.health -= chanceDamage
        if(shouldDiscard(randomCard)) {
            const resDiscard = discard(randomCard, newData.opponentCardsOnBoard, newData.opponentDiscardedCards)
            newData.opponentCardsOnBoard = resDiscard.discardFrom;
            newData.opponentDiscardedCards = resDiscard.discardTo;
        } else {
            newData.opponentCardsOnBoard[randomIndex] = randomCard;
        }
        return newData;
    }
    return data
}

export function thunderStrike(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.opponentCardsOnBoard.length > 0) {
        const discardedOpponentCards: OriginalCard[] = []
        newData.opponentCardsOnBoard = newData.opponentCardsOnBoard.map((card) => {
            const chanceDamage = Math.floor(Math.random() * 3);
            card.metadata.health -= chanceDamage
            if (card.metadata.health <= 0) {
                discardedOpponentCards.push(card);
                return null;
            }
            return card
        }).filter((card): card is OriginalCard => card !== null);
        newData.opponentDiscardedCards = [...discardedOpponentCards]
        if(randomChance(30)) {
            const randomIndex = Math.floor(Math.random() * newData.attackerCardsOnBoard.length);
            const randomCard = newData.attackerCardsOnBoard[randomIndex];
            const chanceDamageToOwn = Math.floor(Math.random() * 3);
            randomCard.metadata.health -= chanceDamageToOwn
            if(shouldDiscard(randomCard)) {
                const resDiscard = discard(randomCard, newData.attackerCardsOnBoard, newData.attackerDiscardedCards)
                newData.attackerCardsOnBoard = resDiscard.discardFrom;
                newData.attackerDiscardedCards = resDiscard.discardTo;
            }
        }
        return newData;
    }
    return data
}

export function wisdomGaze(data: SpecialAttackData): SpecialAttackData  {
    const newData: SpecialAttackData = JSON.parse(JSON.stringify(data));
    if (newData.attackerCardsOnBoard.length > 0) {
        const randomIndex = Math.floor(Math.random() * newData.attackerCardsOnBoard.length);
        const randomCard = newData.attackerCardsOnBoard[randomIndex];
        randomCard.metadata.manaCost = 1
        newData.attackerCardsOnBoard[randomIndex] = randomCard

        return newData;
    }
    return data
}