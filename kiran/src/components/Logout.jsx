import React from 'react'

const Logout = () => {
    localStorage.removeItem("token");
    window.location.href="/";
  return (
    <div>
        Logout successfully
    </div>
  )
}
export default Logout
