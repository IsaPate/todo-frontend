import { Button } from "@/components/ui/button";
import type { CardResponse } from "./type";
import { useState, type Dispatch, type SetStateAction } from "react";
import EditCard from "./EditCard";
import { api } from "@/lib/api";
import type { BoardResponse } from "@/Board/type";

export default function BoardCardItem({
  card,
  fetchBoards,
  cards,
  setCards,
}: {
  card: CardResponse;
  cards: CardResponse[];
  setCards: Dispatch<SetStateAction<CardResponse[]>>;
  fetchBoards: () => Promise<void>;
}) {
  const [open, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/card/${card.id}`);

      const { data } = await api.get<BoardResponse>(`/board/${card.boardId}`);

      setCards([...data.cards]);
    } catch (error) {
      setError("Error on card deleting.");
    }
  };

  if (open) {
    return (
      <EditCard
        card={card}
        onCancel={() => setIsOpen(!open)}
        onClosing={() => setIsOpen(!open)}
        cards={cards}
        setCards={setCards}
        fetchBoards={fetchBoards}
      />
    );
  }

  return (
    <div
      className="bg-background border rounded-md p-3 shadow-sm hover:shadow-md
    transition-shadow"
    >
      <p key={card.id} className="text-sm font-medium">
        {card.title}
        <p>
          {card.status}
          <span className="size-2 rounded-full bg-amber-500" />
        </p>
      </p>
      <p className="text-xs text-muted-foreground">
        Position: {card.position + 1}
      </p>

      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
        {card.description}
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button onClick={() => setIsOpen(!open)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}
