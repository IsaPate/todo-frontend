import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AddNewCard({
  boardId,
  status,
  position,
  fetchBoards,
  onClosing,
}: {
  boardId: number;
  status: string;
  position: number;
  fetchBoards: () => Promise<void>;
  onClosing: () => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.post("/card", {
      title,
      description,
      status,
      position,
      boardId,
    });
    await fetchBoards();
    onClosing();
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <Label htmlFor="description"> Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        ></Input>
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
}
