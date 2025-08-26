import Image from 'next/image'
import styles from '../../styles/header/header.module.css'
// import profile_Img from '@/images/Profile-img.png'

export const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_cont_left}>
                    <h2>Hello Doctor</h2>
                </div>
                <div className={styles.header_cont_right}>
                    <div className={styles.profile_cont}>
                        <Image className={styles.profile_img} src='/images/Profile-pic.png' height={42} width={42} alt='profile-Image' />
                        <p>Dr John</p>
                    </div>
                </div>
            </div>
        </>
    )
}