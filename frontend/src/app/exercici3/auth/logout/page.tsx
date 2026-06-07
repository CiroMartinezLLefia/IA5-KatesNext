"use client";

import React, { useEffect } from "react";
import { handleSignOut } from "@/actions/auth";

export default function LogoutPage() {
  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center font-sans">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-bold">Tancant la sessió...</h1>
        <p className="text-zinc-500 text-sm mt-1">Us estem redirigint a la pàgina principal.</p>
      </div>
    </div>
  );
}
