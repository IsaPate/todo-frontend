import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { BoardResponse } from "./type";

export default function Board() {
  const [board, setBoard] = useState<BoardResponse>({} as BoardResponse);
  let params = useParams();

  console.log(typeof params.id);
  useEffect(() => {
    async function fetchBoard() {
      try {
        const { data } = await api.get<BoardResponse>(`/board/${params.id}`);
        console.log(data);
        setBoard(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBoard();
  }, []);

  return (
    <div>
      <h1>{board.name}</h1>
      <h2>Cards</h2>
      <Button>Add new Card</Button>
      {board.cards &&
        board.cards.map((c) => (
          <ul>
            <li key={c.id}>{c.title}</li>
          </ul>
        ))}
    </div>
  );
}
