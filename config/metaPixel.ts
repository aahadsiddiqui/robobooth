// Meta Pixel Configuration
// Replace this with your actual Meta Pixel ID from Facebook Ads Manager
export const META_PIXEL_CONFIG = {
  PIXEL_ID: '1125962542706222', // Updated to your actual pixel ID
  
  // Optional: Add conversion values for different events
  CONVERSION_VALUES: {
    LEAD: 10, // Value in CAD for lead generation
    BOOKING_INQUIRY: 25, // Value in CAD for booking inquiries
    FORM_SUBMISSION: 15, // Value in CAD for form submissions
    CONTACT_CLICK: 5, // Value in CAD for contact clicks
  },
  
  // Optional: Add content categories for better tracking
  CONTENT_CATEGORIES: {
    WEDDING: 'Wedding Photobooth',
    CORPORATE: 'Corporate Photobooth',
    PARTY: 'Party Photobooth',
    ROBOT: 'Robot Photobooth',
    THREE_SIXTY: '360 Photo Booth',
  },
  
  // Optional: Add custom parameters for your business
  CUSTOM_PARAMS: {
    BUSINESS_TYPE: 'Photobooth Rental',
    SERVICE_AREA: 'GTA',
    PROVINCE: 'Ontario',
    COUNTRY: 'Canada',
    CURRENCY: 'CAD',
  }
}; 