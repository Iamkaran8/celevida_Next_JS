



"use client";

import "../../styles/dashboard/OffCanvas.css";
import Image from "next/image";
import { LogoutButton } from "../LogoutButton";

export default function OffCanvas({ open, setOpen, name }) {
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
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px' }}>
                    <Image src='/images/Profile-pic.png' alt="profile-img" height={42} width={42} />
                    <p>{name}</p>
                </div>
                <div>

                </div>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </>
    );
}
