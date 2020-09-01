/* global fetch */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter()

  const logout = async () => {
    console.log('help me here')
    await fetch('/api/logout')
    router.push('/')
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <></>
  )
}

export default Logout
