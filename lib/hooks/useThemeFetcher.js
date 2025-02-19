import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";
import axios from "axios";
import { ApiRoutes } from "../models/routes";
import { getEnvVar, ENV_VAR } from "../getEnvVar";

const apiKey = getEnvVar(ENV_VAR.API_KEY);
const baseURL = getEnvVar(ENV_VAR.API_URL);
const replaceDomain = getEnvVar(ENV_VAR.REPLACE_URL);

export const getDomain = async () => {
  try {
    const response = await axios.get("api/domain");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useFetchTheme = () => {
  const { setTheme, setLoading, setError } = useThemeStore();

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);

      try {
        const url = `${baseURL}${ApiRoutes.v2DomainConfig}?key=${apiKey}&domain=${replaceDomain}`;
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
