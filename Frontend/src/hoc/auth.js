import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Auth() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
    }, [])
    return (
        <Outlet />
    )
}
