export type CardResponse = {
  id: number;
  title: string;
  description: string;
  status: CardStatus;
  position: number;
  boardId: number;
};

export enum CardStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
