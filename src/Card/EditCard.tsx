import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import type { CardResponse, CardStatus } from "./type";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpdateCard } from "@/stores/boardStore";

export default function EditCard({
  card,
  onCancel,
  onClosing,
}: {
  card: CardResponse;
  onCancel: () => void;
  onClosing: () => void;
}) {
  const [form, setForm] = useState<CardResponse>({
    ...card,
    position: card.position + 1,
  });

  const updateCard = useUpdateCard();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCard(form);

    onClosing();
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={form.title}
          name="title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        ></Input>
        <Label htmlFor="description"> Description</Label>
        <Input
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          name="description"
        ></Input>
        <Label htmlFor="position"> position</Label>
        <Input
          id="position"
          value={form.position}
          onChange={(e) =>
            setForm({ ...form, position: Number(e.target.value) })
          }
          name="position"
        ></Input>
        <Label htmlFor="status"> Status </Label>
        <Input
          id="status"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as CardStatus })
          }
          name="status"
        ></Input>
        <Label htmlFor="boardId"> boardId</Label>
        <Input
          id="boardId"
          value={form.boardId}
          onChange={(e) =>
            setForm({ ...form, boardId: Number(e.target.value) })
          }
          name="boardId"
        ></Input>
        <Button type="submit">Create</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Card>
  );
}
