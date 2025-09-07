"use client";

import { useEffect, useState } from "react";

type WorkSession = {
  id: string;
  sessionDate: string; // ISO string
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
};

export default function DataPage() {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState<number | "">("");
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/sessions", { cache: "no-store" });
    if (res.ok) setSessions(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function fmtDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  function fmtDuration(mins: number) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || hours === "" || Number(hours) <= 0) {
      return alert("Please choose a date and enter hours > 0");
    }
    setSaving(true);
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, hours: Number(hours) }),
    });
    setSaving(false);
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Failed" }));
      return alert(error || "Failed to save");
    }
    setDate("");
    setHours("");
    await load();
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: 20 }}>Add Work / Focus Hours</h1>

      <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-2">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Hours</label>
        <input
          type="number"
          min={0.1}
          step={0.1}
          placeholder="e.g., 2 or 1.5"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
        />

        <button className="btn" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>

      <h3 style={{ marginTop: 24 }}>Your entries</h3>
      <ul className="list" style={{ width: "100%", maxWidth: 600 }}>
        {sessions.map((s) => (
          <li key={s.id}>
            <div>
              <strong>{fmtDate(s.sessionDate)}</strong>
            </div>
            <div style={{ alignSelf: "center" }}>
              {fmtDuration(s.durationMinutes)}
            </div>
          </li>
        ))}
        {sessions.length === 0 && <li>No entries yet.</li>}
      </ul>
      <div>
        {sessions.length > 0 && (
            <i>
            Total time: {
              (() => {
              const total = sessions.map(s => s.durationMinutes).reduce((a, b) => a + b, 0);
              const h = Math.floor(total / 60);
              const m = total % 60;
              if (h > 0 && m === 0) return `${h} hour${h > 1 ? "s" : ""}`;
              if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ${m} min`;
              return `${m} min`;
              })()
            }
            </i>
        )}
      </div>
    </div>
  );
}
