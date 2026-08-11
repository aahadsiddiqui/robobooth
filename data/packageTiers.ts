export type PackageTierId = 'bronze' | 'gold' | 'platinum'

export type PackageTierContent = {
  badge: string
  title: string
  desc: string
  robotCount: number
  robotLabel: string
  robotBenefits: string[]
  boothAddOn?: string
  photographyBenefits: string[]
}

export const defaultPhotographyBenefits = {
  bronze: [
    'Key moment coverage throughout your event',
    'Professionally edited highlight images',
    'Digital gallery delivered within ~1 week',
  ],
  gold: [
    'Full event photography alongside both robots',
    'Candid guest shots and group photos captured',
    'High-resolution edited gallery within ~1 week',
  ],
  platinum: [
    'Comprehensive photography across every activation',
    'Coverage of booth traffic, candid moments, and highlights',
    'Full-resolution gallery with commercial usage rights, delivered within ~1 week',
  ],
}

export function getDefaultPackageTiers(context?: {
  bronzeDesc?: string
  goldDesc?: string
  platinumDesc?: string
  bronzeBenefits?: string[]
  goldBenefits?: string[]
  platinumBenefits?: string[]
}): Record<PackageTierId, PackageTierContent> {
  return {
    bronze: {
      badge: 'Bronze Package',
      title: '1 Robot Photobooth',
      desc: context?.bronzeDesc ?? 'Perfect for intimate events — one roaming robot photobooth, fully set up and managed by our team.',
      robotCount: 1,
      robotLabel: '1 Robot',
      robotBenefits: context?.bronzeBenefits ?? [
        "Canada's First Robot Photobooth roaming guest-to-guest",
        'Physical prints delivered on the spot',
        'Branded photo overlays and custom filters',
        'Dedicated on-site attendant handling everything',
        'Guests receive digital copies instantly to their phones',
      ],
      photographyBenefits: defaultPhotographyBenefits.bronze,
    },
    gold: {
      badge: 'Most Popular · Gold',
      title: '2 Robot Photobooths',
      desc: context?.goldDesc ?? 'Ideal for mid-size events — two robots keep lines short and guests fully engaged.',
      robotCount: 2,
      robotLabel: '2 Robots',
      robotBenefits: context?.goldBenefits ?? [
        'Two Robot Photobooths roaming simultaneously',
        'Double the throughput — shorter wait times for guests',
        'Branded overlays and custom filters on every robot',
        'Dedicated attendants managing both activations',
        'Instant digital delivery and on-site prints',
      ],
      photographyBenefits: defaultPhotographyBenefits.gold,
    },
    platinum: {
      badge: 'Platinum Package',
      title: '3 Robots + Additional Booths',
      desc: context?.platinumDesc ?? 'The ultimate setup — three robots plus your choice of add-on booth for maximum coverage.',
      robotCount: 3,
      robotLabel: '3 Robots',
      boothAddOn: '360 Booth, Premium Photobooth, or Aerial Booth',
      robotBenefits: context?.platinumBenefits ?? [
        'Three Robot Photobooths for large-scale events',
        'Add-on booth: 360, Premium Photobooth, or Aerial',
        'Multiple activations running simultaneously',
        'Maximum guest engagement across your venue',
        'One coordinated team managing everything',
      ],
      photographyBenefits: defaultPhotographyBenefits.platinum,
    },
  }
}

export const weddingPackageTiers = getDefaultPackageTiers({
  bronzeDesc: 'The standalone wedding activation — elegant, personalized, and fully managed from ceremony to last dance.',
  bronzeBenefits: [
    'One Robot Photobooth visiting every table at your reception',
    'Physical prints with your names & wedding date',
    'Custom couple overlay designed to match your theme',
    'Dedicated on-site attendant the entire evening',
    'Instant digital delivery to every guest',
  ],
  goldDesc: 'Two robots for mid-size weddings — double the coverage, shorter lines, and happier guests.',
  goldBenefits: [
    'Two Robot Photobooths roaming your reception simultaneously',
    'Double the throughput — guests never wait long',
    'Custom couple overlays designed around your wedding aesthetic',
    'Physical prints with your names & wedding date',
    'Dedicated attendants managing both activations',
  ],
  platinumDesc: 'The ultimate wedding experience — three robots plus your choice of add-on booth.',
  platinumBenefits: [
    'Three Robot Photobooths for large-scale wedding receptions',
    'Add-on booth: Premium Photobooth, Aerial Booth, or 360 Booth',
    'Multiple activations running throughout your celebration',
    'Maximum guest engagement across your venue',
    'One coordinated team managing everything seamlessly',
  ],
})

export const birthdayPackageTiers = getDefaultPackageTiers({
  bronzeDesc: 'The standalone birthday robot photobooth — fully set up, operated, and managed by our team.',
  bronzeBenefits: [
    'One Robot Photobooth roaming table-to-table',
    'Physical prints delivered on the spot',
    'Custom photo overlays with name, age & theme',
    'Dedicated on-site attendant handling everything',
    'Guests receive digital copies instantly to their phones',
  ],
  goldDesc: 'Two robots for bigger celebrations — keep the energy high and lines short all party long.',
  goldBenefits: [
    'Two Robot Photobooths roaming throughout your party',
    'Double the photo moments for every guest',
    'Custom themed overlays and personalized experience',
    'Physical prints and instant digital delivery',
    'Dedicated attendants managing both robots',
  ],
  platinumDesc: 'The ultimate birthday setup — three robots plus an add-on booth for maximum fun.',
  platinumBenefits: [
    'Three Robot Photobooths for large birthday celebrations',
    'Add-on: 360 Booth, Premium Photobooth, or Aerial Booth',
    'Multiple activations running simultaneously',
    'Maximum guest engagement for larger parties',
    'One team coordinating everything seamlessly',
  ],
})

export const corporatePackageTiers = getDefaultPackageTiers({
  bronzeDesc: 'The standalone corporate robot photobooth — fully set up, operated, and managed by our team.',
  bronzeBenefits: [
    'One corporate Robot Photobooth roaming guest-to-guest',
    'Physical prints delivered on the spot',
    'Branded photo overlays with your company logo',
    'Dedicated on-site attendant handling everything',
    'Guests receive digital copies instantly to their phones',
  ],
  goldDesc: 'Two robots for corporate events — scale engagement across larger venues and guest lists.',
  goldBenefits: [
    'Two Robot Photobooths roaming your event floor',
    'Branded overlays and custom filters on every robot',
    'Shorter wait times for high-volume corporate crowds',
    'Dedicated attendants managing both activations',
    'Instant digital delivery and on-site prints',
  ],
  platinumDesc: 'The ultimate corporate activation — three robots plus your choice of add-on booth.',
  platinumBenefits: [
    'Three Robot Photobooths for large-scale corporate events',
    'Add-on: 360 Booth, Premium Photobooth, or Aerial Booth',
    'Multiple branded touchpoints across your venue',
    'Maximum guest engagement and content volume',
    'One team coordinating everything seamlessly',
  ],
})

export const brandActivationsPackageTiers = getDefaultPackageTiers({
  bronzeDesc: 'The standalone brand activation — one robot photobooth drawing crowds and generating shareable content.',
  bronzeBenefits: [
    'One Robot Photobooth with full brand customization',
    'Branded overlays putting your logo on every photo',
    'Instant photo delivery via SMS, email, or QR',
    'Lead capture flows available for qualified contacts',
    'Dedicated on-site operator for your activation',
  ],
  goldDesc: 'Two robots for high-traffic activations — double the throughput and brand impressions.',
  goldBenefits: [
    'Two Robot Photobooths with full brand customization',
    'Double the content volume and social reach',
    'Branded overlays and custom voice messaging',
    'Lead capture and instant sharing built in',
    'Dedicated operators managing both activations',
  ],
  platinumDesc: 'The ultimate brand activation — three robots plus an add-on booth for maximum impact.',
  platinumBenefits: [
    'Three Robot Photobooths for large-scale brand activations',
    'Add-on: 360 Booth, Premium Photobooth, or Aerial Booth',
    'Multiple branded touchpoints across your venue',
    'Maximum content volume and guest engagement',
    'White-glove coordination across every activation',
  ],
})
