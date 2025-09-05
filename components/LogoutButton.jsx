import Image from "next/image"
import styles from '../styles/LogoutButton.module.css'

export const LogoutButton = () => {
    const handleLogout = () => {

    }
    return (
        <>
            <button className={styles.btn} onClick={() => handleLogout()} >
                <Image src="/images/logout-icon.svg" width={25} height={24} alt="logout-icon" /><span> Logout</span>
            </button>
        </>
    )
}