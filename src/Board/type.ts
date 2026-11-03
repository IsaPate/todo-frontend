import type { CardResponse } from "../Card/type";

export type BoardResponse = {
  id: number;
  name: string;
  cards: Array<CardResponse>;
};
