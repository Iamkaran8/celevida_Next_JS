'use client'

import { fetchAllUsersAccount } from "@/app/store/slices/usersSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './page.module.css'
import { Loader } from "../../../components/loader/Loader"
import { Header } from "../../../components/header/Header"

export default function Page() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllUsersAccount())
    }, [dispatch])

    const { accounts, loading } = useSelector((state) => state.users)

    if (loading) {
        return <Loader />
    }

    const allAccounts = accounts?.data?.data || []
    console.log(allAccounts)

    return (
        <>
            <Header />
            <div className={styles.container}>

                <h2>Account Details</h2>
                {/* Table Header */}
                <div className={styles.table_header}>
                    <div className={styles.No}><p>No</p></div>
                    <div className={styles.Name}><p>Name</p></div>
                    <div className={styles.Email}><p>Email</p></div>
                    <div className={styles.Password}><p>Password</p></div>
                    <div className={styles.Role}><p>Role</p></div>
                    <div className={styles.Id}><p>Id</p></div>
                    <div className={styles.City}><p>City</p></div>
                    <div className={styles.Area}><p>Area</p></div>
                </div>

                {/* Table Content */}
                {allAccounts.map((acc, index) => (
                    <div className={styles.Table_content} key={index}>
                        <div className={styles.No}><p>{index + 1}.</p></div>
                        <div className={styles.Name}><p>{acc.Name}</p></div>
                        <div className={styles.Email}><p>{acc.Email}</p></div>
                        <div className={styles.Password}><p>{acc.password}</p></div>
                        <div className={styles.Role}><p>{acc.role}</p></div>
                        <div className={styles.Id}><p>{acc.id}</p></div>
                        <div className={styles.City}><p>{acc.city}</p></div>
                        <div className={styles.Area}><p>{acc.area}</p></div>
                    </div>
                ))}
            </div>
        </>
    )
}
