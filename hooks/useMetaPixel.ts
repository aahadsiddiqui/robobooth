import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { 
  initMetaPixel, 
  trackPageView, 
  trackPhotoboothEvents, 
  trackLocationEvent,
  GTA_CITIES 
} from '../utils/metaPixel';

export const useMetaPixel = () => {
  const router = useRouter();

  // Initialize Meta Pixel on mount
  useEffect(() => {
    initMetaPixel();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Photobooth-specific tracking functions
  const trackLead = useCallback((source: string, location?: string) => {
    trackPhotoboothEvents.leadGenerated(source, location);
  }, []);

  const trackFormSubmission = useCallback((formType: string, location?: string) => {
    trackPhotoboothEvents.formSubmitted(formType, location);
  }, []);

  const trackPackageView = useCallback((packageType: string) => {
    trackPhotoboothEvents.packageViewed(packageType);
  }, []);

  const trackContactClick = useCallback((page: string, location?: string) => {
    trackPhotoboothEvents.contactClicked(page, location);
  }, []);

  const trackBookingInquiry = useCallback((eventType: string, location?: string) => {
    trackPhotoboothEvents.bookingInquiry(eventType, location);
  }, []);

  const trackVideoView = useCallback((videoType: string) => {
    trackPhotoboothEvents.videoViewed(videoType);
  }, []);

  const trackGalleryView = useCallback((galleryType: string) => {
    trackPhotoboothEvents.galleryViewed(galleryType);
  }, []);

  const trackPhoneClick = useCallback((page: string, location?: string) => {
    trackPhotoboothEvents.phoneClicked(page, location);
  }, []);

  const trackEmailClick = useCallback((page: string, location?: string) => {
    trackPhotoboothEvents.emailClicked(page, location);
  }, []);

  const trackLocationBasedEvent = useCallback((eventName: string, city: string, additionalParams?: Record<string, any>) => {
    trackLocationEvent(eventName, city, additionalParams);
  }, []);

  return {
    trackLead,
    trackFormSubmission,
    trackPackageView,
    trackContactClick,
    trackBookingInquiry,
    trackVideoView,
    trackGalleryView,
    trackPhoneClick,
    trackEmailClick,
    trackLocationBasedEvent,
    GTA_CITIES,
  };
}; 