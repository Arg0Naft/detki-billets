import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAuthed } from "@/lib/auth";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/admin" });
    } else {
      setReady(true);
    }
  }, [navigate]);
  if (!ready) return null;
  return <AdminDashboard />;
}
