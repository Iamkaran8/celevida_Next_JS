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
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  if (!isAuthenticated) return <Loader />;

  return children;
}
