import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
export default function AddNewBoard() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("system sending" + name);
    await api.post("/board", { name });
    navigate("/boards");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new Board </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          ></Input>
          <div>
            <Button type="submit">Create</Button>
            <Button asChild variant="outline">
              <Link to="/">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
