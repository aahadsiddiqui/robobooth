import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2S593P23DG"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2S593P23DG');
          `,
        }} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NWKRRGVB');`,
        }} />
        {/* End Google Tag Manager */}
        
        {/* Crisp Chatbot */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="d4528218-28ba-4427-8f91-717dc3a2cf36";
            (function(){
              d=document;
              s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
            
            // Configure Crisp Chat form
            window.addEventListener('load', function() {
              setTimeout(function() {
                if (window.$crisp) {
                  // Set up form fields
                  window.$crisp.push(["safe", true]);
                  
                  // Configure form to ask for required information
                  window.$crisp.push(["do", "form:show", [
                    "text", 
                    "What's your name?", 
                    "name", 
                    "Please enter your full name"
                  ]]);
                  
                  window.$crisp.push(["do", "form:show", [
                    "tel", 
                    "What's your phone number?", 
                    "phone", 
                    "Please enter your phone number"
                  ]]);
                  
                  window.$crisp.push(["do", "form:show", [
                    "textarea", 
                    "Tell us about your event (date, location, and any relevant details)", 
                    "description", 
                    "Please provide your event date, location, and any other relevant information"
                  ]]);
                  
                  // Set form submission handler
                  window.$crisp.push(["on", "form:submit", function(form) {
                    // Handle form submission
                    console.log("Crisp form submitted:", form);
                  }]);
                }
              }, 2000);
            });
          `,
        }} />
        {/* End Crisp Chatbot */}
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Robo Booth" />
        <meta property="og:title" content="Robo Booth - Interactive Photo Experience" />
        <meta property="og:description" content="Experience the future of event photography with our interactive robot photo booth" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" />
        
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWKRRGVB"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* Meta Pixel (Facebook Pixel) Code */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1125962542706222&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </Html>
  )
} 