



"use client";
import styles from "../../styles/header/header.module.css";
import "../../styles/dashboard/OffCanvas.css";
import Image from "next/image";
import { LogoutButton } from "../LogoutButton";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { CircleUserRound } from "lucide-react";

export default function OffCanvas({ open, setOpen, name }) {
    const { user } = useSelector((state) => state.auth)
    const navigations = [
        {
            id: 1,
            name: "Doctor",
            route: 'doctor/dashboard'
        },
        {
            id: 2,
            name: "Brand Team",
            route: 'brandteam/dashboard'
        },
        {
            id: 3,
            name: "FE",
            route: 'https://fieldexecutive.celevida.in/'
        },
        {
            id: 4,
            name: 'Users',
            route: 'wellthyteam/users'
        },
        {
            id: 5,
            name: 'Add Users',
            route: 'wellthyteam/adduser'
        },
        {
            id: 6,
            name: 'Super Admin',
            route: 'wellthyteam/dashboard'
        },
    ]
    const router = useRouter();
    const handleNavigate = (url) => {
        if (url.startsWith("http")) {

            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            // Internal Next.js navigation
            router.push(`/${url}`);
        }
    };
    return (
        <>
            {/* Overlay */}
            <div
                className={`Offcavas_overlay ${open ? "show" : ""}`}
                onClick={() => setOpen(false)}
            ></div>

            {/* Sidebar */}
            <div className={`Offcavas_sidebar ${open ? "open" : ""}`}>
                <div className="Offcavas_sidebar-header">
                    <h2>Profile</h2>
                    <button className="Offcavas_close-btn" onClick={() => setOpen(false)}>
                        ✖
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px', marginBottom:'30px' }}>
                    {/* <Image src='/images/Profile-pic.png' alt="profile-img" height={42} width={42} /> */}
                    <CircleUserRound size={44} />
                    <p>{name}</p>
                </div>
                <div>
                    {
                        user?.data?.data[0]?.role === "Super Admin" ? (<div className={styles.header_navbar}>
                            {
                                navigations.map((nav) => (

                                    <button className={styles.NavButton} key={nav.id} onClick={() => handleNavigate(nav.route)} >{nav.name}</button>

                                ))
                            }
                        </div>) : ""
                    }
                </div>
                <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                    <LogoutButton />
                </div>
            </div>
        </>
    );
}
