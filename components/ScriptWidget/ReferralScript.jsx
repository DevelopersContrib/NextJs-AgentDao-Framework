"use client";
import { useEffect, useState, useCallback } from "react";

const ReferralWidget = ({ campaignId }) => {
  const loadScript = useCallback((id) => {
    if (!document.getElementById("referral-script") && id) {
      const script = document.createElement("script");
      script.src = `https://www.referrals.com/extension/widget.js?key=${id}`;
      script.async = true;
      script.id = "referral-script";

      const widgetContainer = document.getElementById("referral-widget");
      if (widgetContainer) {
        widgetContainer.appendChild(script);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      loadScript(campaignId);
    };

    fetchData();
  }, [campaignId, loadScript]);

  return (
    <div className="w-full rounded-md p-4 shadow-md">
      <div
        id="referral-widget"
        className="min-h-[530px] w-full overflow-hidden rounded-md p-4"
      ></div>

      <style
        jsx
        global
      >{`
        #referral-widget {
          width: 100% !important;
          min-height: 530px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #referral-widget iframe {
          width: 100% !important;
          height: auto !important;
        }
      `}</style>
    </div>
  );
};

export default ReferralWidget;
