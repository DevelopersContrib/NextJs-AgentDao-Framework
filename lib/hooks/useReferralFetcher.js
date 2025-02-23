import { useEffect } from "react";
import axios from "axios";
import { ApiRoutes } from "../models/routes";
import { getEnvVar, ENV_VAR } from "../getEnvVar";

import { getDomain } from "./useThemeFetcher";
import { useReferralStore } from "../store/useReferralStore";
import { apiADAOFetcher } from "./useADAOFetcher";

const apiKey = getEnvVar(ENV_VAR.API_KEY_ADAO);
const baseURL = getEnvVar(ENV_VAR.API_URL_ADAO);

export const useFetchReferral = () => {
  const { setCampaignId, setLoading, setError } = useReferralStore();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { domain } = await getDomain();

      try {
        const url = `${ApiRoutes.Referrals}?api_key=${apiKey}&tld=${domain}`;
        const response = await apiADAOFetcher("GET", url);
        const { data } = response;
        setCampaignId(data.campaign_id);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch referral");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [setLoading, setError, setCampaignId]);
};

export const getReferralCampaignId = async () => {
  const { domain } = await getDomain();
  try {
    const url = `${baseURL}${ApiRoutes.Referrals}?key=${apiKey}&tld=${domain}`;
    const response = await axios.get(url);
    const { data } = response.data;
    return data.campaignId;
  } catch (error) {
    console.error("Error fetching getReferralCampaignId:", error);
    throw error;
  }
};
