import { create } from "zustand";
import { api } from "@/lib/api";
import type { BoardResponse } from "@/Board/type";
import type { CardResponse } from "@/Card/type";

type BoardState = {
  boards: BoardResponse[];
  //   cards: CardResponse[];
  actions: BoardActions;
};

type BoardActions = {
  freshBoards: () => Promise<void>;
  deleteCard: (card: CardResponse) => Promise<void>;
};

const useBoardStore = create<BoardState>()((set) => ({
  boards: [],
  actions: {
    freshBoards: async () => {
      const { data } = await api.get<BoardResponse[]>("/boards");
      set({ boards: data });
    },
    deleteCard: async (card: CardResponse) => {
      await api.delete(`/card/${card.id}`);
      const { data } = await api.get<BoardResponse>(`/board/${card.boardId}`);

      set((state) => ({
        boards: state.boards.map((b) => {
          if (b.id === data.id) {
            return {
              ...b,
              cards: data.cards,
            };
          }
          return b;
        }),
      }));
    },
  },
}));

export const useFetchBoards = () =>
  useBoardStore((state) => state.actions.freshBoards);

export const useBoards = () => useBoardStore((state) => state.boards);

export const useDeleteCard = () =>
  useBoardStore((state) => state.actions.deleteCard);
