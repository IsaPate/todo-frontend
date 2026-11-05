import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { BoardResponse } from "./type";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import NotFound from "@/error/NotFound";
import axios from "axios";
import type { Status } from "@/error/types";

export default function Board() {
  const [board, setBoard] = useState<BoardResponse>({} as BoardResponse);
  const [status, setStatus] = useState<Status>("loading");

  let params = useParams();

  useEffect(() => {
    async function fetchBoard() {
      try {
        const { data } = await api.get<BoardResponse>(`/board/${params.id}`);
        setStatus("success");

        setBoard(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setStatus("notFound");
          } else {
            setStatus("Server-Error");
          }
        } else {
          setStatus("Server-Error");
        }

        console.error(error);
      }
    }
    fetchBoard();
  }, [params.id]);

  if (status === "loading") {
    return;
  }

  if (status === "notFound") {
    return <NotFound word={"Board"} />;
  }

  if (status === "Server-Error") {
    return <NotFound word={"Server-Error"} />;
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
