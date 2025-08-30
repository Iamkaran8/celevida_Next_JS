import styles from '@/styles/login/Login.module.css'
import Image from 'next/image'

export default function login() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.left_container}>
                    <Image src='/images/Signin-left-image.png' alt='image' height={338} width={500} />

                </div>
                <div className={styles.right_container}>
                    <div className={styles.right_inner_container}>
                        <div className={styles.header_container}>
                            <div>
                                <p>Welcome to Celevida</p>
                                <h4>Sign in</h4>
                            </div>
                            <div>
                                <Image src="/images/SugarCoach-DigiSlate-img.png" alt='Logo' width={107} height={50} />
                            </div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.input_box_container} >
                                <p>Email ID</p>
                                <input className={styles.phone_number_input} style={{ fontSize: '20px' }} id="" type="text"
                                    placeholder="Enter Email" required />
                            </div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.input_box_container} >
                                <p>Password</p>
                                <input className={styles.phone_number_input} style={{ fontSize: '20px' }} id="" type="password"
                                    placeholder="Enter Password " required />
                            </div>
                        </div>
                        <div className={styles.btn_container}>
                            <button className={styles.sign_in_btn}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}