import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { CardResponse, CardStatus } from "./type";
import { useCreateCard } from "@/stores/boardStore";

export default function AddNewCard({
  boardId,
  status,
  position,
  onClosing,
}: {
  boardId: number;
  status: string;
  position: number;
  onClosing: () => void;
  cards: CardResponse[];
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);

  const [reqError, setReqError] = useState<string | null>(null);

  const createCard = useCreateCard();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "" && description.trim() === "") {
      setDescError("Description cannot be blank.");
      setTitleError("Title cannot be blank.");
      return;
    }
    if (title.trim() === "") {
      setDescError(null);
      setTitleError("Title cannot be blank.");
      return;
    }
    if (description.trim() === "") {
      setTitleError(null);
      setDescError("Description cannot be blank.");
      return;
    }

    setDescError(null);
    setTitleError(null);
    setReqError(null);
    try {
      const casted = status as CardStatus;
      await createCard({
        title,
        description,
        status: casted,
        position,
        boardId,
      });
      onClosing();
    } catch (error) {
      setReqError("Error on form submit.");
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
          {titleError && (
            <p className="text-sm text-destructive">{titleError}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description"> Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          ></Input>
          {descError && <p className="text-sm text-destructive">{descError}</p>}
        </div>
        {reqError && <p className="text-sm text-destructive">{reqError}</p>}

        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
}
