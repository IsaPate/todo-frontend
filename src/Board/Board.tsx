import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { BoardResponse } from "./type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card key={board.id}>
      <CardHeader>
        <CardTitle>
          {board.name}
          {/* <Badge variant="secondary">{board.cards.length}</Badge> */}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
