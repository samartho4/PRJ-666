"use client"

export default function LoginPage() {
  const handleClick = () => {
    alert("Clicked!")
  }

  return (
    <div className="p-8">
      <h1>Login</h1>
      <button onClick={handleClick} className="bg-amber-800 text-white px-4 py-2">
        Sign In
      </button>
    </div>
  )
}
