

"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Safely extract role (handles multiple API shapes)
  const role =
    user?.data?.data?.[0]?.role?.toLowerCase() ||
    user?.data?.role?.toLowerCase() ||
    user?.role?.toLowerCase() ||
    null;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    // redirect only if role is known
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      if (role === "super admin") {
        router.replace("/wellthyteam/dashboard");
      } else if (role === "doctor") {
        router.replace("/doctor/dashboard");
      } else if (role === "brand team") {
        router.replace("/brandteam/dashboard");
      } else {
        router.replace("/"); // fallback
      }
    }
  }, [isAuthenticated, role, router, allowedRoles]);

  if (!isAuthenticated) return <p>Loading...</p>;

  return children;
}
