import { useEffect } from "react";
import axios from "axios";
import { ApiRoutes } from "../models/routes";
import { getEnvVar, ENV_VAR } from "../getEnvVar";

import { useAgentStore } from "../store/useAgentStore";
import { apiADAOFetcher } from "./useADAOFetcher";

const apiKey = getEnvVar(ENV_VAR.API_KEY_ADAO);
const baseURL = getEnvVar(ENV_VAR.API_URL_ADAO);

export const useFetchAgent = () => {
  const { setAgents, setLoading, setError } = useAgentStore();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true); 
      
      try {
        const url = `${ApiRoutes.agents}?api_key=${apiKey}`;
        const response = await apiADAOFetcher("GET", url);
        const { data } = response;
        setAgents(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch referral");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [setLoading, setError, setAgents]);
};


