import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";
import axios from "axios";
import { ApiRoutes } from "../models/routes";
import { getEnvVar, ENV_VAR } from "../getEnvVar";

const apiKey = getEnvVar(ENV_VAR.API_KEY);
const baseURL = getEnvVar(ENV_VAR.API_URL);
const domain = getEnvVar(ENV_VAR.NEXT_PUBLIC_VERCEL_URL);

export const useFetchTheme = () => {
  const { setTheme, setLoading, setError } = useThemeStore();

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);
      try {
        const url = `${baseURL}${ApiRoutes.v2DomainConfig}?key=${apiKey}&domain=${domain}`;
        const response = await axios.get(url);
        const { data } = response.data;
        setTheme(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch theme");
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [setLoading, setError, setTheme]);
};
