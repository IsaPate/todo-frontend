import { Button } from "@/components/ui/button";
import type { CardResponse } from "./type";
import { useState } from "react";
import EditCard from "./EditCard";
import { useDeleteCard } from "@/stores/boardStore";

export default function BoardCardItem({ card }: { card: CardResponse }) {
  const [open, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCards = useDeleteCard();

  const handleDelete = async () => {
    try {
      await deleteCards(card);
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
