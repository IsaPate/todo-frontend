import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import type { BoardResponse } from "@/Board/type";
import type { CardResponse } from "@/Card/type";

type BoardState = {
  boards: BoardResponse[];
  cards: CardResponse[];
  fetchBoards: () => Promise<void>;
  deleteCard: (card: CardResponse) => Promise<void>;
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [],
      cards: [],
      fetchBoards: async () => {
        const { data } = await api.get<BoardResponse[]>("/boards");
        set({ boards: data });
      },
      deleteCard: async (card: CardResponse) => {
        await api.delete(`/card/${card.id}`);
        const { data } = await api.get<BoardResponse>(`/board/${card.boardId}`);
        set({ cards: data.cards });
      },
    }),
    { name: "boards" }
  )
);
