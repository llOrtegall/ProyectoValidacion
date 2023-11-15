import React, { useState } from 'react'
import axios from 'axios'

export function ChangedPassword () {
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/changePassword', {
        username,
        oldPassword,
        newPassword,
        confirmPassword
      })

      console.log(response.data)
      // Handle the response here
    } catch (error) {
      console.error(error)
      // Handle the error here
    }
  }

  return (
    <form onSubmit={handleChangePassword}>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
      <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Current Password' required />
      <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' required />
      <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm New Password' required />
      <button type='submit'>Change Password</button>
    </form>
  )
}
