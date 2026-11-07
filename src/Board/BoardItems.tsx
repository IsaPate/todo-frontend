import AddNewCard from "@/Card/AddNewCard";
import type { BoardResponse } from "./type";
import BoardCardItem from "@/Card/BoardCardItem";
import { type CardResponse } from "@/Card/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router";
import { api } from "@/lib/api";

export default function BoardItem({
  board,
  fetchBoards,
}: {
  board: BoardResponse;
  fetchBoards: () => Promise<void>;
}) {
  const status = ["TODO", "IN_PROGRESS", "DONE"];
  const [openColumn, setOpenColumn] = useState<{
    boardId: number;
    status: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const incard_status = (c: CardResponse) => {
    return status.find((s) => s === c.status);
  };

  const isOpen = (board: BoardResponse, status: string) => {
    return board.id === openColumn?.boardId && openColumn?.status === status;
  };
  const groudedCards = (board: BoardResponse): Map<String, CardResponse[]> => {
    const map = new Map<String, CardResponse[]>();

    for (let card of board.cards) {
      if (!map.has(card.status)) {
        map.set(card.status, [card]);
      } else {
        const arr = map.get(card.status);
        arr.push(card);
        map.set(card.status, arr);
      }
    }
    return map;
  };
  const getPosition = (board: BoardResponse, s: string) => {
    return groudedCards(board).has(s)
      ? groudedCards(board).get(s).length + 1
      : 1;
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/board/${board.id}`);
      await fetchBoards();
      setError(null);
    } catch (error) {
      setError("Error on board deleting.");
    }
  };
  return (
    <Card key={board.id}>
      <CardHeader>
        <CardTitle>
          <Link to={`/board/${board.id}`}>{board.name}</Link>
          <Badge variant="secondary">{board.cards.length}</Badge>
          <Button onClick={handleDelete}>Delete</Button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {board.cards &&
            status.map((s) => (
              <div
                key={s}
                className="bg-muted rounded-lg flex flex-col gap-2 p-3 min-h-32"
              >
                <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span className="size-2 rounded-full bg-amber-500" />
                  {s}
                  <span className="text-xs font-normal">
                    {groudedCards(board).has(s)
                      ? groudedCards(board).get(s).length
                      : 0}
                  </span>
                </h4>
                {groudedCards(board).has(s) ? (
                  groudedCards(board)
                    .get(s)
                    .map((c) => (
                      <BoardCardItem
                        key={c.id}
                        card={c}
                        fetchBoards={fetchBoards}
                      />
                    ))
                ) : (
                  <p className="rounded-md border border-dashed py-6 text-center text-xs text-muted-foreground">
                    No cards
                  </p>
                )}
                {isOpen(board, s) ? (
                  <>
                    <AddNewCard
                      boardId={openColumn.boardId}
                      status={openColumn.status}
                      position={getPosition(board, s)}
                      fetchBoards={fetchBoards}
                      onClosing={() => setOpenColumn(null)}
                    />
                    <Button
                      className="mt-auto"
                      onClick={() => {
                        setOpenColumn(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    className="mt-auto"
                    onClick={() => {
                      setOpenColumn({
                        boardId: board.id,
                        status: s,
                      });
                    }}
                  >
                    Add Card
                  </Button>
                )}
              </div>
            ))}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
