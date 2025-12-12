import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

type Photo = {
  id: number
  src: string
  title: string
  event: string
  date: string
  category: string
}

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [filter, setFilter] = useState('all')

  const photos: Photo[] = [
    {
      id: 1,
      src: '/placeholder-1.jpg',
      title: 'Wedding Celebration',
      event: 'Sarah & John\'s Wedding',
      date: 'June 15, 2023',
      category: 'weddings'
    },
    {
      id: 2,
      src: '/placeholder-2.jpg',
      title: 'Annual Tech Conference',
      event: 'TechCorp Summit 2023',
      date: 'July 22, 2023',
      category: 'corporate'
    },
    {
      id: 3,
      src: '/placeholder-3.jpg',
      title: 'Birthday Bash',
      event: 'Emma\'s Sweet 16',
      date: 'August 5, 2023',
      category: 'parties'
    },
    {
      id: 4,
      src: '/placeholder-4.jpg',
      title: 'Corporate Holiday Party',
      event: 'StartUp Inc. Year End',
      date: 'December 15, 2023',
      category: 'corporate'
    },
    {
      id: 5,
      src: '/placeholder-5.jpg',
      title: 'Beach Wedding',
      event: 'Mike & Lisa\'s Wedding',
      date: 'September 3, 2023',
      category: 'weddings'
    },
    {
      id: 6,
      src: '/placeholder-6.jpg',
      title: 'Graduation Party',
      event: 'Class of 2023 Celebration',
      date: 'May 28, 2023',
      category: 'parties'
    }
  ]

  const filteredPhotos = photos.filter(photo => 
    filter === 'all' ? true : photo.category === filter
  )

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <Head>
        <title>Gallery - Robo Booth Photos</title>
        <meta name="description" content="Browse through amazing moments captured by Robo Booth at various events" />
      </Head>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">Photo Gallery</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'weddings', 'corporate', 'parties'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:scale-102'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold">{photo.title}</h3>
                  <p className="text-sm">{photo.event}</p>
                  <p className="text-xs opacity-75">{photo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhoto(null)
              }}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
            <div 
              className="relative w-full max-w-4xl aspect-[3/2]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
                <h3 className="text-xl font-bold">{selectedPhoto.title}</h3>
                <p className="text-sm">{selectedPhoto.event} - {selectedPhoto.date}</p>
                <p className="text-xs opacity-75 mt-1">Category: {selectedPhoto.category}</p>
              </div>
            </div>
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No photos found for this category.</p>
          </div>
        )}
      </div>
    </div>
  )
} 