'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary text-secondary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>We use cookies to improve your experience on our site.</p>
        <Button onClick={handleAccept}>Accept</Button>
      </div>
    </div>
  )
}

