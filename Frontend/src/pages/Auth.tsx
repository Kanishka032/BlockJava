import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLogin
      ? "${BASE_URL}/api/auth/login"
      : "${BASE_URL}/api/auth/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      const student = await response.json();

      // save student in localStorage
      localStorage.setItem("student", JSON.stringify(student));

      navigate("/"); // home page
    } else {
      alert("Login / Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          {isLogin ? "Login" : "Create Account"}
        </Button>

        <p
          className="text-sm text-center cursor-pointer text-primary"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New student? Sign up"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
