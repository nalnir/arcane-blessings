/// <reference path="./types.ts" />
import { arcaneAffinity, arcaneMastery, divineFury, divineShield, dragonBreath, frostNova, infernalRage, lycanthropy, ressurect, stealth, suddenStrike, thunderStrike, wisdomGaze } from "./blessings";
import { PowerEntry, SpecialAttackData } from "./types";

export enum EffectType {
  ON_CARD_PLACEMENT = "ON_CARD_PLACEMENT",
  AFTER_BASIC_ATTACK = "AFTER_BASIC_ATTACK",
  AFTER_OPPONENT_BASIC_ATTACK = "AFTER_OPPONENT_BASIC_ATTACK",
  AFTER_END_TURN = "AFTER_END_TURN",
  AFTER_OPPONENT_END_TURN = "AFTER_OPPONENT_END_TURN"
}
export enum LingerEffectOperation {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  FREEZE = "FREEZE",
  UNBLOCKABLE = "UNBLOCKABLE"
}
export enum LingerEffectOpTarget {
  MANA = "MANA",
  HEALTH = "HEALTH",
  POWER = "POWER"
}


// Create a mapping of power names to power classes or functions
const powerRegistry: Record<string, PowerEntry> = {
  arcaneAffinity: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Decreases a mana cost by 2 for random player card on the board.',
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 1,
    fee: 1,
    execute: (data: SpecialAttackData) => arcaneAffinity(data),
    usageTimes: 1
  },
  arcaneMastery: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Decreases a mana cost to 1 for the card with the highest mana cost on the board.',
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 3,
    fee: 3,
    execute: (data: SpecialAttackData) => arcaneMastery(data),
    usageTimes: 1
  },
  divineFury: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Has 35% percent chance of attacking again a random opponent card on the board.',
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => divineFury(data),
    usageTimes: 2
  },
  divineShield: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Has 45% percent chance of rebounding opponent attack.',
    takesEffect: EffectType.AFTER_OPPONENT_BASIC_ATTACK,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => divineShield(data),
    usageTimes: 2
  },
  dragonBreath: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Has 100% chance to take 1 health or 35% chance to take 2 health of all other opponent cards on board.',
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => dragonBreath(data),
    usageTimes: 1
  },
  frostNova: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Freezes a random opponent card for 1 turn',
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 2,
    fee: 2,
    execute: (data: SpecialAttackData) => frostNova(data),
    usageTimes: 1
  },
  infernalRage: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: 'Inflicts damage equal to the number of creatures the player has lost during the game.',
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 5,
    fee: 5,
    execute: (data: SpecialAttackData) => infernalRage(data),
    usageTimes: 1
  },
  lycanthropy: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: "Takes 2 health from opponent card and adds 1 health to a random player card.",
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 5,
    fee: 5,
    execute: (data: SpecialAttackData) => lycanthropy(data),
    usageTimes: 1
  },
  ressurect: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: "Resurrects the card with the highest attack stat from the player's discard pile and puts it into the player deck.",
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 6,
    fee: 6,
    execute: (data: SpecialAttackData) => ressurect(data),
    usageTimes: 1
  },
  stealth: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: "Renders a random players card on board unblockable.",
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => stealth(data),
    usageTimes: 1
  },
  suddenStrike: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: "Deals damage between 1-5 to random opponent card. Has 35% chance to damage opponent hero.",
    takesEffect: EffectType.ON_CARD_PLACEMENT,
    level: 4,
    fee: 4,
    execute: (data: SpecialAttackData) => suddenStrike(data),
    usageTimes: 1
  },
  thunderStrike: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: "Takes 1-3 health of all opponet cards on board. Has 30% chance to also damage one of its own cards with 1-2 damage.",
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 5,
    fee: 5,
    execute: (data: SpecialAttackData) => thunderStrike(data),
    usageTimes: 1
  },
  wisdomGaze: {
    creator: '0x8CA049B20731fF92Fe8fc8535531497FB83247FE',
    description: "Sets mana usage to 1 for a random player card on board.",
    takesEffect: EffectType.AFTER_BASIC_ATTACK,
    level: 5,
    fee: 5,
    execute: (data: SpecialAttackData) => wisdomGaze(data),
    usageTimes: 2
  }
};


// Export the registry
export default powerRegistry;