
"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/header/header.module.css";
import OffCanvas from "../offCanvas/OffCanvas";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const Header = ({ title }) => {
    const [open, setOpen] = useState(false);


    const { user } = useSelector((state) => state.auth)

    console.log(user.data.data[0].role)


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
            route: 'http://celevida.in/'
        },
    ]
    const router = useRouter();
    const handleNavigate = (url) => {
        router.push(`/${url}`);
    };

    return (
        <>

            {
                user?.data?.data[0]?.role === "Super Admin" ? (<div className={styles.header_navbar}>
                    {
                        navigations.map((nav) => (

                            <button className={styles.NavButton} key={nav.id} onClick={() => handleNavigate(nav.route)} >{nav.name}</button>

                        ))
                    }
                </div>) : ""
            }

            <div className={styles.header}>
                <div className={styles.header_cont_left}>
                    <h2> {title} {user.data.data[0].Name}</h2>
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
                        <p>{user.data.data[0].Name}</p>
                    </div>
                </div>
            </div>

            {/*  OffCanvas component only handles sidebar */}
            <OffCanvas open={open} setOpen={setOpen} name={user.data.data[0].Name} />
        </>
    );
};
