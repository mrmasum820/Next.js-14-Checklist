"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [name, setName] = useState("");
  console.log("Dashboard client component");

  return (
    <div>
      <h2>Dashboard page</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
      <p>Welcome, {name}!</p>
    </div>
  );
}
