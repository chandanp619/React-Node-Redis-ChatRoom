import React, { useEffect } from 'react'

export default function LogoutComponent() {
  useEffect(() => {
      localStorage.removeItem("user_token");
      window.location.href = "/login";
  })
  return (
    <div className='text-center'>Logging you out...</div>
  )
}
