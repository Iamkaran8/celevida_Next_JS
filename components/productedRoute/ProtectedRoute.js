// "use client";

// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { Loader } from "../loader/Loader";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const router = useRouter();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

// useEffect(() => {
//   if (!isAuthenticated) {
//     router.replace("/");
//   } else {
//     const role =
//       user?.data?.data?.[0]?.role?.toLowerCase() ||
//       user?.data?.role?.toLowerCase() ||
//       user?.role?.toLowerCase();

//     if (allowedRoles && !allowedRoles.includes(role)) {
//       if (role === "admin") {
//         router.replace("/wellthyteam/dashboard");
//       } else if (role === "doctor") {
//         router.replace("/doctor/dashboard");
//       } else if (role === "brand") {
//         router.replace("/brandteam/dashboard");
//       }
//     }
//   }
// }, [isAuthenticated, user, router, allowedRoles]);


//   if (!isAuthenticated) return <Loader />;

//   return children;
// }


"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "../loader/Loader";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      // Not logged in → send to login page
      router.replace("/");
      return;
    }

    // Normalize role (handle different API response shapes)
    const role =
      user?.data?.data?.[0]?.role?.toLowerCase() ||
      user?.data?.role?.toLowerCase() ||
      user?.role?.toLowerCase();

    if (!role) {
      // No role found → force logout or back to home
      router.replace("/");
      return;
    }

    // If allowedRoles is set but user’s role not in it → redirect them
     if (!isAuthenticated) {
    router.replace("/");
    return;
  }

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
  }, [isAuthenticated, user, router, allowedRoles]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  return children;
}
