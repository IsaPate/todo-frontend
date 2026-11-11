import { useEffect, useState } from "react";
import BoardItem from "./BoardItems";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import NotFound from "@/error/NotFound";
import { useBoards, useFetchBoards } from "@/stores/boardStore";

export default function Boards() {
  const [status, setStatus] = useState<string>("loading");
  const freshBoards = useFetchBoards();
  const boards = useBoards();

  async function fetchBoards() {
    try {
      await freshBoards();
      setStatus("success");
    } catch (error) {
      setStatus("Not Found");
      console.error(error);
    } finally {
    }
  }
  useEffect(() => {
    fetchBoards();
  }, []);

  if (status === "loading") {
    return;
  }

  if (status === "Not Found") {
    return <NotFound word={"Boards"} />;
  }

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
