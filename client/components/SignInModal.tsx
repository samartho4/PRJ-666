"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { loginUser } from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface SignInModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onLoginSuccess: (username: string) => void;
}

export default function SignInModal({ open, setOpen, onLoginSuccess }: SignInModalProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      handleLogin();
    }
  }, [open]);

  const handleLogin = async () => {
    try {
      const email = "Ken@example.com"; // adjust to match your backend user data
      const password = "123";

      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      
      onLoginSuccess(data.name);

      toast({ title: "Logged in successfully!" });
      setOpen(false);
    } catch (error) {
      console.error("Login error:", error);
      toast({ title: "Login failed!", description: "Please check your credentials." });
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:4000/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
    window.location.href = "/login"
  }
  
  // Inside JSX:
  <button onClick={handleLogout} className="text-sm text-amber-800 hover:underline">
    Logout
  </button>
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signing you in...</DialogTitle>
        </DialogHeader>
        <p>Please wait, you're being logged in automatically.</p>
      </DialogContent>
    </Dialog>
  );
}
