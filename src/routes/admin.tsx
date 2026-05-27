import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { isAuthed } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthed()) navigate({ to: "/admin/dashboard" });
  }, [navigate]);
  return <AdminLogin />;
}