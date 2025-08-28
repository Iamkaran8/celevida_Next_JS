
"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/header/header.module.css";
import OffCanvas from "../offCanvas/OffCanvas";

export const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_cont_left}>
                    <h2>Hello Doctor</h2>
                </div>
                <div className={styles.header_cont_right}>
                    <div className={styles.profile_cont} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                        <Image
                            className={styles.profile_img}
                            src="/images/Profile-pic.png"
                            height={42}
                            width={42}
                            alt="profile-Image"
                        />
                        <p>Dr John</p>
                    </div>
                </div>
            </div>

            {/*  OffCanvas component only handles sidebar */}
            <OffCanvas open={open} setOpen={setOpen} />
        </>
    );
};
