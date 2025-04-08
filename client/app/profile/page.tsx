// app/profile/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:4000/api/users/profile", {
        method: "GET",
        credentials: "include", // ✅ send cookie
      })

      if (res.status === 401) {
        router.push("/login") // redirect if not logged in
      } else {
        const data = await res.json()
        setUser(data)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  if (loading) return <p className="p-4">Loading...</p>
  if (!user) return null

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  )
}
