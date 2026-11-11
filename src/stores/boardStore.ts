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
  createCard: (cardToCreate: Omit<CardResponse, "id">) => Promise<void>;
  updateCard: (cardToCreate: Omit<CardResponse, "id">) => Promise<void>;
  deleteBoard: (boardId: number) => Promise<void>;
};

const useBoardStore = create<BoardState>()((set, get) => ({
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
    createCard: async (cardToCreate: Omit<CardResponse, "id">) => {
      const { data } = await api.post<CardResponse>("/card", {
        title: cardToCreate.title,
        description: cardToCreate.description,
        status: cardToCreate.status,
        position: cardToCreate.position,
        boardId: cardToCreate.boardId,
      });
      set((state) => ({
        boards: state.boards.map((b) => {
          if (b.id === data.boardId) {
            b.cards.push(data);
          }
          return b;
        }),
      }));
    },
    updateCard: async (cardToCreate: CardResponse) => {
      const { data } = await api.put<CardResponse>(`/card/${cardToCreate.id}`, {
        ...cardToCreate,
        position: cardToCreate.position - 1,
      });

      if (data.boardId !== cardToCreate.boardId) {
        await get().actions.freshBoards();
      } else {
        const res = await api.get<BoardResponse>(`/board/${data.boardId}`);

        set((state) => ({
          boards: state.boards.map((b) => {
            if (b.id === data.boardId) {
              return {
                ...b,
                cards: res.data.cards,
              };
            }
            return b;
          }),
        }));
      }
    },
    deleteBoard: async (boardId: number) => {
      await api.delete(`/board/${boardId}`);

      set((state) => ({
        boards: state.boards.filter((b) => b.id !== boardId),
      }));
    },
  },
}));

export const useFetchBoards = () =>
  useBoardStore((state) => state.actions.freshBoards);

export const useBoards = () => useBoardStore((state) => state.boards);

export const useDeleteCard = () =>
  useBoardStore((state) => state.actions.deleteCard);

export const useCreateCard = () =>
  useBoardStore((state) => state.actions.createCard);

export const useUpdateCard = () =>
  useBoardStore((state) => state.actions.updateCard);

export const useDeleteBoard = () =>
  useBoardStore((state) => state.actions.deleteBoard);
