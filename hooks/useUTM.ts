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
        if (!router.isReady) return;

        const query = router.query;
        const utmParams: UTMData = {};

        // Standard UTM parameters
        const standardParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
        // Facebook specific parameters provided by user
        const fbParams = ['hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_net', 'hsa_ver'];

        const allParams = [...standardParams, ...fbParams];

        let hasNewParams = false;

        allParams.forEach((param) => {
            if (query[param]) {
                utmParams[param] = query[param] as string;
                hasNewParams = true;
            }
        });

        if (hasNewParams) {
            // Store in session storage to persist across page navigations
            sessionStorage.setItem('utm_data', JSON.stringify(utmParams));
            setUtmData(utmParams);
        } else {
            // Try to load from session storage if not in URL
            const savedUtm = sessionStorage.getItem('utm_data');
            if (savedUtm) {
                setUtmData(JSON.parse(savedUtm));
            }
        }
    }, [router.isReady, router.query]);

    return utmData;
};
