"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (allowedRoles && !allowedRoles.includes(user?.role)) {
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  if (!isAuthenticated) return <p>Loading...</p>;

  return children;
}
