import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export interface UTMData {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    hsa_acc?: string;
    hsa_cam?: string;
    hsa_grp?: string;
    hsa_ad?: string;
    hsa_src?: string;
    hsa_net?: string;
    hsa_ver?: string;
    [key: string]: string | undefined;
}

export const useUTM = () => {
    const router = useRouter();
    const [utmData, setUtmData] = useState<UTMData>({});

    useEffect(() => {
        // Function to extract UTM parameters from URL
        const extractUTMParams = (url: string): UTMData => {
            const utmParams: UTMData = {};
            try {
                const urlObj = new URL(url);
                const params = urlObj.searchParams;
                
                // Standard UTM parameters
                const standardParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
                // Facebook specific parameters
                const fbParams = ['hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_net', 'hsa_ver'];
                const allParams = [...standardParams, ...fbParams];

                allParams.forEach((param) => {
                    const value = params.get(param);
                    if (value) {
                        utmParams[param] = value;
                    }
                });
            } catch (e) {
                // If URL parsing fails, try to parse as relative URL
                const match = url.match(/[?&]([^=]+)=([^&]+)/g);
                if (match) {
                    const standardParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
                    const fbParams = ['hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_net', 'hsa_ver'];
                    const allParams = [...standardParams, ...fbParams];
                    
                    match.forEach((pair) => {
                        const [key, value] = pair.substring(1).split('=');
                        if (allParams.includes(key)) {
                            utmParams[key] = decodeURIComponent(value);
                        }
                    });
                }
            }
            return utmParams;
        };

        // Check current URL (from router)
        if (router.isReady && typeof window !== 'undefined') {
            const currentUrl = window.location.href;
            const queryParams = router.query;
            const utmParams: UTMData = {};

            // Standard UTM parameters
            const standardParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
            // Facebook specific parameters
            const fbParams = ['hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_net', 'hsa_ver'];
            const allParams = [...standardParams, ...fbParams];

            let hasNewParams = false;

            // First, check router query params
            allParams.forEach((param) => {
                if (queryParams[param]) {
                    utmParams[param] = queryParams[param] as string;
                    hasNewParams = true;
                }
            });

            // Also check the actual URL in case router didn't capture it
            if (!hasNewParams) {
                const urlParams = extractUTMParams(currentUrl);
                if (Object.keys(urlParams).length > 0) {
                    Object.assign(utmParams, urlParams);
                    hasNewParams = true;
                }
            }

            if (hasNewParams) {
                // Store in session storage to persist across page navigations
                sessionStorage.setItem('utm_data', JSON.stringify(utmParams));
                setUtmData(utmParams);
                console.log('UTM parameters captured:', utmParams);
            } else {
                // Try to load from session storage if not in URL
                try {
                    const savedUtm = sessionStorage.getItem('utm_data');
                    if (savedUtm) {
                        const parsed = JSON.parse(savedUtm);
                        setUtmData(parsed);
                        console.log('UTM parameters loaded from session:', parsed);
                    }
                } catch (e) {
                    console.error('Error loading UTM from session:', e);
                }
            }
        }
    }, [router.isReady, router.query]);

    return utmData;
};
