// src/pages/LoginPage.tsx
// There is no real password check -- typing a name is enough for this demo.
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button"; // <-- SESSION 8
import { Input } from "@/components/ui/input"; // <-- SESSION 8
import { Label } from "@/components/ui/label"; // <-- SESSION 8

function LoginPage() {
  const [name, setName] = useState<string>("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name); // 1. put the token in the store
    navigate("/submissions"); // 2. then send them where they were going
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Login
      </h2>

      <Label htmlFor="name" className="text-foreground">
        Your name
      </Label>
      <Input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Juan dela Cruz"
      />

      <Button onClick={handleLogin} disabled={name === ""} className="mt-3">
        Log In
      </Button>
    </div>
  );
}

export default LoginPage;
