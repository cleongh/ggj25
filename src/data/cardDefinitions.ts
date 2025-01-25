import { CardData, TokenType } from "../core/CardData";
import { shuffleArray } from "../core/utils";

export const playerDefinitions: CardData[] = [
  // export const cardDefinitions = [
  {
    text: "Peleas como una vaca.",
    damage: 1,
    tokens: [TokenType.PHYSICAL],
  },
  {
    text: "No le gustas a nadie.",
    damage: 1,
    tokens: [TokenType.PHYSICAL, TokenType.PHYSICAL],
  },
  {
    text: "Eres lo contrario al éxito.",
    damage: 2,
    tokens: [TokenType.WORK],
  },
  {
    text: "Tu belleza es lo equivalente al cero.",
    damage: 2,
    tokens: [TokenType.PHYSICAL],
  },
  {
    text: "Si te dicen 'no es por ti, es por mi' es mentira. Es por ti.",
    damage: 2,
    tokens: [TokenType.RELATIONSHIPS],
  },
  {
    text: "Ha llamado McDonalds. Han hecho un mal semestre y quieren que vayas a cenar para que las finanzas cuadren.",
    damage: 3,
    tokens: [TokenType.RELATIONSHIPS, TokenType.PHYSICAL, TokenType.WORK],
  },
  {
    text: "¿Qué relación de parentesco tienen tus padres?",
    damage: 1,
    tokens: [TokenType.RELATIONSHIPS, TokenType.RELATIONSHIPS],
  },
  {
    text: "No esperaba nada de ti, y aun así has conseguido decepcionarme.",
    damage: 2,
    tokens: [TokenType.PHYSICAL, TokenType.WORK],
  },
  {
    text: "No vales para nada. No en serio, PARA NADA.",
    damage: 3,
    tokens: [TokenType.RELATIONSHIPS, TokenType.PHYSICAL, TokenType.WORK],
  },
  {
    text: "Si estuviera en una isla desierta y te necesitase para procrear, se extinguiría la vida en el planeta.",
    damage: 1,
    tokens: [TokenType.PHYSICAL, TokenType.PHYSICAL],
  },
  {
    text: "Si tener un amigo es tener un tesoro, contigo tengo una deuda.",
    damage: 2,
    tokens: [TokenType.RELATIONSHIPS, TokenType.RELATIONSHIPS],
  },
  {
    text: "En tu caso, cualquier despido es procedente.",
    damage: 1,
    tokens: [TokenType.WORK, TokenType.PHYSICAL],
  },
];

export const getInitialDeck = (): CardData[] => {
  return playerDefinitions.slice(0, 10);
};

export const getRandomRewardChoice = (nCardsToOffer: number): CardData[] => {
  const shuffled = playerDefinitions.slice(10);
  shuffleArray(shuffled);
  return shuffled.slice(0, nCardsToOffer);
};
// export const playerDefinitions: CardData[] = [
//   {
//     text: "You will never finish your thesis, loser.",
//     damage: 2,
//     tokens: [TokenType.WORK, TokenType.WORK],
//   },
//   {
//     text: "You are a terrible friend.",
//     damage: 2,
//     tokens: [TokenType.RELATIONSHIPS, TokenType.RELATIONSHIPS],
//   },
//   {
//     text: "You are so out of shape.",
//     damage: 1,
//     tokens: [TokenType.PHYSICAL],
//   },
//   {
//     text: "You are a loser.",
//     damage: 3,
//     tokens: [TokenType.WORK, TokenType.RELATIONSHIPS],
//   },
//   {
//     text: "Nobody likes you.",
//     damage: 2,
//     tokens: [TokenType.RELATIONSHIPS, TokenType.RELATIONSHIPS],
//   },
//   {
//     text: "Do you really want another donut?",
//     damage: 1,
//     tokens: [TokenType.PHYSICAL],
//   },
//   {
//     text: "No work... no friends... no girlfriend...",
//     damage: 3,
//     tokens: [TokenType.WORK, TokenType.RELATIONSHIPS],
//   },
// ];
