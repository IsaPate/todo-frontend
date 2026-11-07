import { Button } from "@/components/ui/button";
import type { CardResponse } from "./type";
import { useState } from "react";
import EditCard from "./EditCard";
import { api } from "@/lib/api";

export default function BoardCardItem({
  card,
  fetchBoards,
}: {
  card: CardResponse;
  fetchBoards: () => Promise<void>;
}) {
  const [open, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/card/${card.id}`);
      await fetchBoards();
    } catch (error) {}
  };

  if (open) {
    return (
      <EditCard
        card={card}
        onCancel={() => setIsOpen(!open)}
        fetchBoards={fetchBoards}
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

      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
        {card.description}
      </p>
      <Button onClick={() => setIsOpen(!open)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}
