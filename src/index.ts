/// <reference path="./types.ts" />
import { arcaneAffinity, arcaneMastery, divineFury, divineShield, dragonBreath, frostNova } from "./blessings";
import { EffectType, PowerEntry, SpecialAttackData } from "./types";


// Create a mapping of power names to power classes or functions
const powerRegistry: Record<string, PowerEntry> = {
  arcaneAffinity: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Decreases a mana cost by 2 for random player card on the board.',
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 1,
    fee: 1,
    execute: (data: SpecialAttackData) => arcaneAffinity(data)
  },
  arcaneMastery: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Decreases a mana cost to 1 for the card with the highest mana cost on the board.',
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 3,
    fee: 3,
    execute: (data: SpecialAttackData) => arcaneMastery(data)
  },
  divineFury: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Has 35% percent chance of attacking again a random opponent card on the board.',
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => divineFury(data)
  },
  divineShield: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Has 45% percent chance of rebounding opponent attack.',
    takesEffect: EffectType.AFTER_OPPONENT_BASIC_ATTACK,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => divineShield(data)
  },
  dragonBreath: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Has 100% chance to take 1 health or 35% chance to take 2 health of all other opponent cards on board.',
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => dragonBreath(data)
  },
  // frostNova: {
  //   creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
  //   description: 'Freezes a random opponent card for 1 turn',
  //   takesEffect: EffectType.ON_CARD_PLACEMENT,
  //   level: 2,
  //   fee: 2,
  //   execute: (data: SpecialAttackData) => frostNova(data)
  // },
};

// Export the registry
export default powerRegistry;