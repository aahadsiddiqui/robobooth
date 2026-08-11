export type GalleryCategory = 'weddings' | 'birthdays'

export type GalleryImage = {
  id: number
  src: string
  title: string
  category: GalleryCategory
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/wedding/wedding-1.png', title: "Aman & Aarushi's Wedding", category: 'weddings' },
  { id: 2, src: '/images/wedding/wedding-2.png', title: "Nithya & Michael's Wedding", category: 'weddings' },
  { id: 3, src: '/images/wedding/wedding-3.png', title: "Tealyah & Josh's Wedding", category: 'weddings' },
  { id: 4, src: '/images/wedding/wedding-4.png', title: "Chantal & Matthew's Wedding", category: 'weddings' },
  { id: 5, src: '/images/wedding/wedding-5.png', title: "The Whyte's Wedding", category: 'weddings' },
  { id: 6, src: '/images/wedding/wedding-6.png', title: "J & M's Wedding", category: 'weddings' },
  { id: 7, src: '/images/wedding/wedding-7.png', title: "Carla & Scott's Wedding", category: 'weddings' },
  { id: 8, src: '/images/wedding/wedding-8.png', title: "Michael & Chloe's Wedding", category: 'weddings' },
  { id: 9, src: '/images/wedding/wedding-9.png', title: "Gianpaolo & Milly's Wedding", category: 'weddings' },
  { id: 10, src: '/images/wedding/wedding-10.png', title: "Shehryar & Mahnoor's Wedding", category: 'weddings' },
  { id: 11, src: '/images/wedding/wedding-11.png', title: "The Toors' Wedding", category: 'weddings' },
  { id: 12, src: '/images/wedding/wedding-12.png', title: "Chloe & Todd's Wedding", category: 'weddings' },
  { id: 13, src: '/images/wedding/wedding-13.png', title: "Abdullah & Sara's Wedding", category: 'weddings' },
  { id: 14, src: '/images/birthday/birthday-1.png', title: "Nora's 1st Birthday", category: 'birthdays' },
  { id: 15, src: '/images/birthday/birthday-2.png', title: "Evelyn's 65th", category: 'birthdays' },
  { id: 16, src: '/images/birthday/birthday-3.png', title: "Kulwant's 80th Birthday", category: 'birthdays' },
  { id: 17, src: '/images/birthday/birthday-4.png', title: "Rose's 18th Birthday", category: 'birthdays' },
  { id: 18, src: '/images/birthday/birthday-5.png', title: 'Amira Turns One', category: 'birthdays' },
  { id: 19, src: '/images/birthday/birthday-6.png', title: "Sashvika's 1st Birthday", category: 'birthdays' },
  { id: 20, src: '/images/birthday/birthday-7.png', title: "Michal's 40th", category: 'birthdays' },
  { id: 21, src: '/images/birthday/birthday-8.png', title: "Viyaan's 1st Birthday", category: 'birthdays' },
  { id: 22, src: '/images/birthday/birthday-9.png', title: 'Happy 1st Birthday Zayd', category: 'birthdays' },
  { id: 23, src: '/images/birthday/birthday-10.png', title: "Rob's 50th", category: 'birthdays' },
  { id: 24, src: '/images/birthday/birthday-11.png', title: "Melia's Sweet 16", category: 'birthdays' },
  { id: 25, src: '/images/birthday/birthday-12.png', title: "Okpe's Birthday Shindig", category: 'birthdays' },
]

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'birthdays', label: 'Birthdays' },
]
