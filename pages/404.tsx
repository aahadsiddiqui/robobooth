import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/robot-404.png" // Add a cute robot illustration
            alt="404 Robot"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-600 mb-8">
          Oops! Our robot seems lost...
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for has been moved or doesn't exist.
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
} 