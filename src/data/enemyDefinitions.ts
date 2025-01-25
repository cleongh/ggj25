import { TokenType } from "../core/CardData";
import { EnemyData } from "../core/EnemyData";

// export const enemyDefinitions: { [key: string]: EnemyData } = {
//   phdStudent: {
//     name: "Assistant Professor",
//     health: 32,
//     deck: [
//       {
//         text: "I'm not THAT tiny.",
//         damage: 5,
//         tokens: [TokenType.PHYSICAL, TokenType.PHYSICAL],
//       },
//       {
//         text: "I don't give a f**k about your failed experiment.",
//         damage: 3,
//         tokens: [TokenType.WORK, TokenType.WORK],
//       },
//       {
//         text: "You are gonna graduate with your grandchildren.",
//         damage: 2,
//         tokens: [TokenType.RELATIONSHIPS],
//       },
//       {
//         text: "Tiny or not, at least I have a PhD. What do you have? Not even a friend.",
//         damage: 8,
//         tokens: [TokenType.PHYSICAL, TokenType.RELATIONSHIPS, TokenType.WORK],
//       },
//     ],
//   },
// };

const shower = {
  text: "Yo me ducho para ir al trabajo. ¿Y tú?",
  damage: 1,
  tokens: [
    TokenType.WORK,
  ]
};
const surgery = {
  text: "No hay cirugía estética que arregle tu cara.",
  damage: 2,
  tokens: [
    TokenType.PHYSICAL
  ]
};
const noOneLoves = {
  text: "Lo que te pasa es que nadie te quiere.",
  damage: 2,
  tokens: [
    TokenType.RELATIONSHIPS
  ]
};
const mop = {
  text: "Promocionaría a una bayeta antes que a ti.",
  damage: 2,
  tokens: [
    TokenType.WORK,
    TokenType.WORK
  ]
};
const contest = {
  text: "En un concurso de feos te descalificarían por feo.",
  damage: 3,
  tokens: [
    TokenType.PHYSICAL,
    TokenType.PHYSICAL,
  ]
};
const noOne = {
  text: "Todos tenemos alguien que nos quiera. Todos menos tú.",
  damage: 3,
  tokens: [
    TokenType.RELATIONSHIPS,
    TokenType.RELATIONSHIPS,
  ]
};
const noBar = {
  text: "Al salir del trabajo tus compañeros te dicen que han quedado en un bar que no existe.",
  damage: 2,
  tokens: [
    TokenType.RELATIONSHIPS,
    TokenType.WORK
  ]
};
const noJob = {
  text: "Eres como la persona guapa del trabajo. Pero no eres guapo y no tienes trabajo.",
  damage: 3,
  tokens: [
    TokenType.PHYSICAL,
    TokenType.WORK
  ]
};
const opportunity = {
  text: "Si el físico no importa para el amor igual tienes alguna oportunidad. Bueno, igual no.",
  damage: 3,
  tokens: [
    TokenType.PHYSICAL,
    TokenType.RELATIONSHIPS
  ]
};
const marketing = {
  text: "No vales ni para director de marketing.",
  damage: 3,
  tokens: [
    TokenType.PHYSICAL,
    TokenType.WORK,
    TokenType.WORK,
  ]
};
const soUgly = {
  text: "Eres tan feo que no se nota lo insoportable que eres.",
  damage: 4,
  tokens: [
    TokenType.RELATIONSHIPS,
    TokenType.PHYSICAL,
    TokenType.PHYSICAL,
  ]
};
const sheSaid = {

  text: "That’s what she said.",
  damage: 5,
  tokens: [
    TokenType.RELATIONSHIPS,
    TokenType.PHYSICAL,
    TokenType.WORK
  ]
};

const allEnemyCards = [shower, surgery, noOneLoves, mop, contest, noOne, noBar, noJob, opportunity, marketing, soUgly, sheSaid];

// bat, drop (pez), magoo (oso)
export const enemyDefinitions: { [key: string]: EnemyData } = {
  guille: {
    name: "Will Magoo",
    health: 5,
    texture: "magoo",
    deck: allEnemyCards.slice(0, 5)
  },
  ishmael: {
    name: "Ishmael",
    health: 5,
    texture: "bat",
    deck: allEnemyCards.slice(0, 6)
  },
  maria: {
    name: "Marisánchez",
    health: 7,
    texture: "drop",
    deck: allEnemyCards.slice(0, 7)
  },
  cleon: {
    name: "cleon",
    health: 7,
    texture: "magoo",
    deck: allEnemyCards.slice(0, 9)
  },
  pablo: {
    name: "Typescript hipster",
    health: 7,
    texture: "bat",
    deck: allEnemyCards.slice(0, 11)
  },
  tony: {
    name: "HormigaCebolla",
    health: 7,
    texture: "drop",
    deck: allEnemyCards.slice(0, 12)
  },
  ana: {
    name: "cleon",
    health: 7,
    texture: "bat",
    deck: allEnemyCards.slice(0, 12)
  }
};