"use client"

import React from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 40, fontFamily: "Inter, Arial, sans-serif" }}>
      <h1>Algo deu errado</h1>
      <p style={{ color: "#c00" }}>{error?.message}</p>
      <button onClick={() => reset()} style={{ padding: "8px 12px", borderRadius: 6 }}>
        Tentar novamente
      </button>
    </div>
  )
}
