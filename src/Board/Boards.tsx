import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { BoardResponse } from "./type";
import BoardItem from "./BoardItems";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Boards() {
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  async function fetchBoards() {
    try {
      const { data } = await api.get<BoardResponse[]>("/boards");
      setBoards(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6 mt-6">
        <h1 className="text-2xl font-bold ">Boards</h1>
        <Button asChild>
          <Link to="/boards/new">+ New board</Link>
        </Button>
      </div>
      <div>
        {boards.map((board) => (
          <div key={board.id} className="flex flex-col gap-4">
            {/* {board.name} */}
            {board.cards && (
              <BoardItem board={board} fetchBoards={fetchBoards} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
