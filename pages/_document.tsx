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
            
            // Configure AI Bot after Crisp loads
            window.addEventListener('load', function() {
              setTimeout(function() {
                if (window.$crisp) {
                  // Configure AI Bot with JSON configuration
                  const aiBotConfig = {
                    "name": "MagicReply AI Bot",
                    "enabled": true,
                    "description": "A bot using AI to automatically converse with your users, using all your imported data sources.",
                    "flow": {
                      "live": {
                        "blocks": [
                          {"id":"0_id","position":{"x":840,"y":0},"type":"entry"},
                          {"id":"1_id","position":{"x":840,"y":214},"type":"action","data":{"type":"infer-answer","settings":{"quality":75,"greetings":true,"unclosed":true}}},
                          {"id":"2_id","position":{"x":840,"y":96},"type":"event","data":{"type":"message-new","settings":{"negate":false}}},
                          {"id":"3_id","position":{"x":840,"y":432},"type":"action","data":{"type":"wait","settings":{"seconds":8}}},
                          {"id":"4_id","position":{"x":840,"y":555},"type":"action","data":{"type":"message-send","subtype":"picker","settings":{"default":{"type":"picker","content":{"id":"picker_747cab92-afd1-4ac1-9a32-b8b00c2fdf0b","text":"Was this answer helpful?","choices":[{"value":"choice_dafd17a6-745c-44dc-8f41-5b64782af26b","label":"My issue is resolved","selected":false,"id":"choice_dafd17a6-745c-44dc-8f41-5b64782af26b","icon":"✅"},{"id":"choice_08de851f-7fb8-4e69-aa14-e1f7efc084e8","value":"choice_08de851f-7fb8-4e69-aa14-e1f7efc084e8","label":"I would like to speak with someone","selected":false,"icon":"👩‍⚕️"},{"id":"choice_bf591ff6-5e2c-452c-a285-7d0c0b49df27","value":"choice_bf591ff6-5e2c-452c-a285-7d0c0b49df27","label":"I have another question","selected":false,"icon":"❓"}]},"memorize":{"enabled":false}}}}},
                          {"id":"5_id","position":{"x":560,"y":778},"type":"event","data":{"type":"message-action","settings":{"type":"button-click","match":"choice_dafd17a6-745c-44dc-8f41-5b64782af26b"}}},
                          {"id":"6_id","position":{"x":840,"y":778},"type":"event","data":{"type":"message-action","settings":{"type":"button-click","match":"choice_08de851f-7fb8-4e69-aa14-e1f7efc084e8"}}},
                          {"id":"7_id","position":{"x":1120,"y":778},"type":"event","data":{"type":"message-action","settings":{"type":"button-click","match":"choice_bf591ff6-5e2c-452c-a285-7d0c0b49df27"}}},
                          {"id":"8_id","position":{"x":560,"y":896},"type":"action","data":{"type":"message-send","subtype":"text","settings":{"default":{"type":"text","content":"My pleasure, wishing you a nice day ahead! :)"}}}},
                          {"id":"9_id","position":{"x":1120,"y":896},"type":"action","data":{"type":"message-send","subtype":"text","settings":{"default":{"type":"text","content":"Sure thing, how can I help?"}}}},
                          {"id":"10_id","position":{"x":840,"y":898},"type":"action","data":{"type":"message-send","subtype":"text","settings":{"default":{"type":"text","content":"Sure thing, how can I help?"}}}},
                          {"id":"11_id","position":{"x":560,"y":1036},"type":"exit","data":{"type":"stop"}},
                          {"id":"12_id","position":{"x":1120,"y":1007},"type":"proxy","data":{"type":"loop","settings":{"id":"2_id"}}},
                          {"id":"13_id","position":{"x":1120,"y":214},"type":"action","data":{"type":"message-send","subtype":"text","settings":{"default":{"type":"text","content":"I'm not sure that my AI can answer to that correctly, and I do not want to provide a misleading response.\n\nMind asking something else? :)"}}}},
                          {"id":"14_id","position":{"x":1120,"y":432},"type":"proxy","data":{"type":"loop","settings":{"id":"2_id"}}}
                        ],
                        "wires": [
                          {"id":"0_edge_id","source":"0_id","target":"2_id"},
                          {"id":"1_edge_id","source":"2_id","target":"1_id"},
                          {"id":"2_edge_id","source":"1_id","target":"3_id"},
                          {"id":"3_edge_id","source":"3_id","target":"4_id"},
                          {"id":"4_edge_id","source":"4_id","target":"5_id"},
                          {"id":"5_edge_id","source":"4_id","target":"6_id"},
                          {"id":"6_edge_id","source":"4_id","target":"7_id"},
                          {"id":"7_edge_id","source":"5_id","target":"8_id"},
                          {"id":"8_edge_id","source":"7_id","target":"9_id"},
                          {"id":"9_edge_id","source":"6_id","target":"10_id"},
                          {"id":"10_edge_id","source":"8_id","target":"11_id"},
                          {"id":"11_edge_id","source":"9_id","target":"12_id"},
                          {"id":"12_edge_id","source":"2_id","target":"13_id"},
                          {"id":"13_edge_id","source":"13_id","target":"14_id"},
                          {"id":"14_edge_id","source":"10_id","target":"11_id"}
                        ]
                      }
                    },
                    "updated_at": 1754361402995,
                    "author": "381d2dee-fb3a-45fa-807f-1e114174630b",
                    "priority": 0
                  };
                  
                  // Apply AI Bot configuration
                  window.$crisp.push(["do", "ai:scenario:set", aiBotConfig]);
                }
              }, 3000);
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