export function getRecommendedRobots(guestCount: number): number {
  if (!guestCount || guestCount <= 0) return 0
  if (guestCount <= 150) return 1
  if (guestCount <= 300) return 2
  return 3
}

export function getRobotRecommendationCopy(guestCount: number): {
  count: number
  headline: string
  description: string
} {
  const count = getRecommendedRobots(guestCount)

  if (count === 0) {
    return {
      count: 0,
      headline: '',
      description: '',
    }
  }

  if (count === 1) {
    return {
      count,
      headline: '1 Robot Recommended',
      description:
        'For events up to 150 guests, one robot photobooth keeps every guest engaged with short lines and full coverage throughout your celebration.',
    }
  }

  if (count === 2) {
    return {
      count,
      headline: '2 Robots Recommended',
      description:
        'For 151–300 guests, we recommend two robot photobooths to cut wait times in half and ensure every guest gets the full interactive experience.',
    }
  }

  return {
    count,
    headline: '3 Robots Recommended',
    description:
      'For 301+ guests, three robot photobooths deliver maximum throughput — shorter queues, more photos, and the best guest experience at scale.',
  }
}
