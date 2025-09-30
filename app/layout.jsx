import "./globals.css";
import "./custom.css";
import { getData, getDomain } from "../lib/data";
import Script from "next/script";
import FOMONotification from "../components/FOMONotification";

import { getLayoutMetadata } from "../lib/data";

export async function generateMetadata({ params, searchParams }, parent) {
  const response = await getLayoutMetadata();
  const { title, description, keywords, author } = response;

  const siteTitle = title?.trim() || "Welcome to CONTRIB Network";
  const siteDesc =
    description?.trim() ||
    "Explore the CONTRIB Network: a hub for digital opportunities, token economies, and collaborative ventures.";
  const siteKeywords = keywords?.trim()
    ? keywords.split(",")
    : ["contrib", "token", "decentralized", "collaboration"];
  const siteAuthor = author || "contrib";

  const domain = process.env.NEXT_PUBLIC_VERCEL_URL || "yourdomain.com";

  return {
    title: siteTitle,
    description: siteDesc,
    keywords: siteKeywords,
    authors: [{ name: siteAuthor }],
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      siteName: domain,
      type: "website",
      locale: "en_US",
      url: `https://${domain}`,
      images: [`https://${domain}/images/og-image.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDesc,
      images: [`https://${domain}/images/twitter-image.jpg`],
    },
  };
}


export default async function RootLayout({ children }) {
  const domain = getDomain();

  const c = await getData();
  return (
    <html lang="en">
      <head>
        {c.data.adsenseClientId !== "" ? (
          <Script
            id="g-ads"
            async=""
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${c.data.adsenseClientId}`}
            crossorigin="anonymous"
            data-checked-head="true"
          ></Script>
        ) : (
          ""
        )}
        <Script
          id="g-manager"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${c.data.accountGA}`}
        ></Script>
        <Script id="g-tag">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${c.data.accountGA}');
          `}
        </Script>
        <Script
          id="g-matomo"
          type="text/javascript"
        >
          {`
            var _paq = window._paq || [];
            _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
            _paq.push(["setCookieDomain", "*.${domain}"]);
            _paq.push(["setDomains", ["*.${domain}"]]);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//stats.numberchallenge.com/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', ${c.data.piwikId}]);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
        {/*
        <noscript>{`<p><img src="${"//stats.numberchallenge.com/matomo.php?idsite="+c.data.piwikId}" alt="" /></p>`}</noscript>
         
        <Script id="test-script" src="https://tools.contrib.com/js/test.js"></Script>
        */}
      </head>
      <body className="animated-bg tw-text-white">{children}</body>
    </html>
  );
}
