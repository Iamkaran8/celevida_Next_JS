import Image from "next/image";
import styles from "../../styles/dashboard/sidebar.module.css";



const navlinks = [
    {
        id: 1,
        title: "Dashboard",
        logo: <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18.955H15C20 18.955 22 17.3156 22 13.2171V8.29893C22 4.20043 20 2.56104 15 2.56104H9C4 2.56104 2 4.20043 2 8.29893V13.2171C2 17.3156 4 18.955 9 18.955Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.2812 12.078C15.1512 13.0042 13.5312 13.2911 12.1012 12.9223L9.51117 15.0371C9.33117 15.1928 8.96117 15.2912 8.69117 15.2584L7.49117 15.1272C7.09117 15.0863 6.73117 14.7748 6.67117 14.4551L6.51117 13.4715C6.47117 13.2583 6.60117 12.955 6.78117 12.7993L9.36117 10.6845C8.92117 9.51231 9.26117 8.1844 10.3912 7.25814C12.0112 5.93023 14.6512 5.93023 16.2812 7.25814C17.9012 8.57786 17.9012 10.7419 16.2812 12.078Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.4516 14.2665L9.60156 13.5615" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.3945 9.69287H13.4035" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


    },
    {
        id: 2,
        title: "Patient",
        logo: <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18.955H15C20 18.955 22 17.3156 22 13.2171V8.29893C22 4.20043 20 2.56104 15 2.56104H9C4 2.56104 2 4.20043 2 8.29893V13.2171C2 17.3156 4 18.955 9 18.955Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.2812 12.078C15.1512 13.0042 13.5312 13.2911 12.1012 12.9223L9.51117 15.0371C9.33117 15.1928 8.96117 15.2912 8.69117 15.2584L7.49117 15.1272C7.09117 15.0863 6.73117 14.7748 6.67117 14.4551L6.51117 13.4715C6.47117 13.2583 6.60117 12.955 6.78117 12.7993L9.36117 10.6845C8.92117 9.51231 9.26117 8.1844 10.3912 7.25814C12.0112 5.93023 14.6512 5.93023 16.2812 7.25814C17.9012 8.57786 17.9012 10.7419 16.2812 12.078Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.4516 14.2665L9.60156 13.5615" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.3945 9.69287H13.4035" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    },
]

export const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Image className={styles.logo_img} src="/logo.png" alt="Logo" width={107} height={50} />
            <div className={styles.sidebar_nav}>
                <ul>
                    {navlinks.map((nav) => (
                        <li className={styles.sidebar_btn} key={nav.id}>
                            {nav.logo} <span>{nav.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.Sidebar_logout}>
                <button className={styles.Sidebar_logout_btn}>
                    <Image src="/images/logout-icon.svg" width={19} height={18} alt="logout-icon" /><span> Logout</span>
                </button>
            </div>
        </div>
    );
};
