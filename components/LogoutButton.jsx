import Image from "next/image"
import styles from '../styles/LogoutButton.module.css'
import { useDispatch } from "react-redux"
import { logout } from "../app/store/slices/authSlice"

export const LogoutButton = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <button className={styles.btn} onClick={() => handleLogout()} >
                <Image src="/images/logout-icon.svg" width={25} height={24} alt="logout-icon" /><span> Logout</span>
            </button>
        </>
    )
}