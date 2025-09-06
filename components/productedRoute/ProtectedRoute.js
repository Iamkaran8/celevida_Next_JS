"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "../loader/Loader";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else if (allowedRoles && !allowedRoles.includes(user?.role)) {
      if (user.role === "admin") {
        router.replace("/wellthyteam/dashboard");
      } else if (user.role === "doctor") {
        router.replace("/doctor/dashboard");
      } else if (user.role === "brand") {
        router.replace("/brandteam/dashboard");
      }
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  if (!isAuthenticated) return <Loader />;

  return children;
}
