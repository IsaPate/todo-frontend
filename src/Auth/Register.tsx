import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/stores/authStore";
import type { UserRole } from "@/stores/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("USER");
  const [error, setError] = useState<string | null>(null);
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await register(username, password, userRole);
      navigate("/login");
    } catch {
      setError("Η εγγραφή απέτυχε (μήπως υπάρχει ήδη το username;)");
    }
  };

  return (
    <Card className="mx-auto mt-12 max-w-sm">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <Label htmlFor="userRole">Role</Label>
          <select
            id="userRole"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit">Register</Button>
          <p className="text-sm text-muted-foreground">
            Έχεις ήδη λογαριασμό;{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
