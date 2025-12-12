# Meta Pixel Setup Guide for Robo Booth

## 🚀 Quick Setup

### 1. Get Your Meta Pixel ID

1. Go to [Facebook Ads Manager](https://business.facebook.com/adsmanager)
2. Navigate to **Events Manager** → **Data Sources**
3. Click **Add Data Source** → **Web**
4. Choose **Facebook Pixel**
5. Name your pixel (e.g., "Robo Booth Pixel")
6. Copy your Pixel ID (it looks like: `123456789012345`)

### 2. Update Your Configuration

Open `config/metaPixel.ts` and replace `YOUR_META_PIXEL_ID_HERE` with your actual Pixel ID:

```typescript
export const META_PIXEL_CONFIG = {
  PIXEL_ID: '123456789012345', // Your actual pixel ID here
  // ... rest of config
};
```

### 3. Update _document.tsx

In `pages/_document.tsx`, replace `YOUR_META_PIXEL_ID_HERE` with your actual Pixel ID in the noscript tag:

```html
<img 
  height="1" 
  width="1" 
  style={{ display: 'none' }}
  src="https://www.facebook.com/tr?id=123456789012345&ev=PageView&noscript=1"
/>
```

## 📊 What's Being Tracked

### Automatic Tracking
- ✅ Page views on all pages
- ✅ Route changes in your Next.js app

### Manual Tracking Available
- ✅ Lead generation (form submissions)
- ✅ Contact button clicks
- ✅ Package views
- ✅ Booking inquiries
- ✅ Video views
- ✅ Gallery views
- ✅ Phone number clicks
- ✅ Email clicks
- ✅ Location-based events (GTA cities)

## 🎯 How to Use Tracking in Your Components

### Basic Usage

```typescript
import { useMetaPixel } from '../hooks/useMetaPixel';

export default function MyComponent() {
  const { 
    trackLead, 
    trackFormSubmission, 
    trackContactClick,
    trackBookingInquiry 
  } = useMetaPixel();

  const handleFormSubmit = () => {
    trackFormSubmission('Wedding Inquiry', 'Toronto');
    // Your form logic here
  };

  const handleContactClick = () => {
    trackContactClick('Home Page', 'Toronto');
    // Your contact logic here
  };

  return (
    <button onClick={handleContactClick}>
      Contact Us
    </button>
  );
}
```

### Location-Based Tracking

```typescript
import { useMetaPixel } from '../hooks/useMetaPixel';

export default function LocationComponent() {
  const { trackLocationBasedEvent, GTA_CITIES } = useMetaPixel();

  const handleCityClick = (city: string) => {
    trackLocationBasedEvent('City Interest', city, {
      content_name: `${city} Photobooth Interest`,
      content_category: 'Location Interest'
    });
  };

  return (
    <div>
      {GTA_CITIES.map(city => (
        <button key={city} onClick={() => handleCityClick(city)}>
          {city}
        </button>
      ))}
    </div>
  );
}
```

## 📈 Event Types Available

### Lead Generation
```typescript
trackLead('Source', 'Location'); // e.g., trackLead('Wedding Page', 'Toronto')
```

### Form Submissions
```typescript
trackFormSubmission('Form Type', 'Location'); // e.g., trackFormSubmission('Wedding Inquiry', 'Toronto')
```

### Package Views
```typescript
trackPackageView('Package Type'); // e.g., trackPackageView('Robot Photobooth')
```

### Contact Actions
```typescript
trackContactClick('Page', 'Location'); // e.g., trackContactClick('Home Page', 'Toronto')
trackPhoneClick('Page', 'Location');
trackEmailClick('Page', 'Location');
```

### Booking Inquiries
```typescript
trackBookingInquiry('Event Type', 'Location'); // e.g., trackBookingInquiry('Wedding', 'Toronto')
```

### Content Views
```typescript
trackVideoView('Video Type'); // e.g., trackVideoView('Wedding Robot Photobooth')
trackGalleryView('Gallery Type'); // e.g., trackGalleryView('Wedding Gallery')
```

## 🔧 Customization

### Adding Custom Events

In `utils/metaPixel.ts`, add new tracking functions:

```typescript
export const trackPhotoboothEvents = {
  // ... existing events
  
  // Add your custom event
  customEvent: (param1: string, param2: string) => {
    trackEvent('CustomEvent', {
      content_name: param1,
      content_category: param2,
      value: 1,
      currency: 'CAD',
    });
  },
};
```

### Updating Conversion Values

In `config/metaPixel.ts`, modify the conversion values:

```typescript
CONVERSION_VALUES: {
  LEAD: 15, // Increase value for leads
  BOOKING_INQUIRY: 30, // Increase value for bookings
  // ... other values
},
```

## 🧪 Testing

### 1. Facebook Pixel Helper
- Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
- Visit your website
- Check that events are firing correctly

### 2. Facebook Events Manager
- Go to Events Manager in Facebook Ads Manager
- Check the "Test Events" tab
- Verify events are being received

### 3. Browser Console
- Open browser developer tools
- Check for any JavaScript errors
- Verify `window.fbq` is available

## 🚨 Common Issues

### Pixel Not Loading
- ✅ Check your Pixel ID is correct
- ✅ Ensure no ad blockers are active
- ✅ Check browser console for errors

### Events Not Firing
- ✅ Verify `useMetaPixel()` is called in your component
- ✅ Check that tracking functions are called
- ✅ Ensure Meta Pixel is initialized before tracking

### Duplicate Events
- ✅ Check for multiple `useMetaPixel()` calls
- ✅ Ensure tracking functions aren't called multiple times

## 📱 Mobile Tracking

The Meta Pixel automatically tracks mobile users. No additional setup required.

## 🔒 Privacy Compliance

### GDPR Considerations
- Consider adding cookie consent banners
- Implement opt-out mechanisms if needed
- Update privacy policy to mention Meta Pixel usage

### CCPA Considerations
- Add "Do Not Sell My Personal Information" options
- Implement opt-out mechanisms for California residents

## 📞 Support

If you need help with Meta Pixel setup:
1. Check Facebook's [Meta Pixel documentation](https://developers.facebook.com/docs/facebook-pixel/)
2. Use Facebook's [Pixel Helper](https://developers.facebook.com/docs/facebook-pixel/implementation/debugging)
3. Contact Facebook Business Support

## 🎉 Success Metrics

Track these key metrics in Facebook Ads Manager:
- ✅ Lead generation rate
- ✅ Cost per lead
- ✅ Conversion rate from leads to bookings
- ✅ Return on ad spend (ROAS)
- ✅ Audience insights and demographics 