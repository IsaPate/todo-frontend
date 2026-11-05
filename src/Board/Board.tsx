import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { BoardResponse } from "./type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/error/NotFound";

export default function Board() {
  const [board, setBoard] = useState<BoardResponse>({} as BoardResponse);
  const [status, setStatus] = useState<string>("loading");

  let params = useParams();

  useEffect(() => {
    async function fetchBoard() {
      try {
        const { data } = await api.get<BoardResponse>(`/board/${params.id}`);
        setStatus("success");

        setBoard(data);
      } catch (error) {
        setStatus("Not Found");

        console.error(error);
      }
    }
    fetchBoard();
  }, []);

  if (status === "loading") {
    return;
  }

  if (status === "Not Found") {
    return <NotFound word={"Board"} />;
  }
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
