import axios from "axios";
import { headers } from "next/headers";

import { ApiRoutes } from "./models/routes";
import { getEnvVar, ENV_VAR } from "./getEnvVar";

const apiKey = getEnvVar(ENV_VAR.API_KEY);
const baseURL = getEnvVar(ENV_VAR.API_URL);

export function getDomain() {
  let DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;
  const headersList = headers();
  const referrer = headersList.get("host");
  const domainName = referrer.includes("localhost") ? DOMAIN : referrer;
  return domainName.replace("www.", "");
}

export async function getData() {
  try {
    const domain = getDomain();
    
    // Check if API URL is defined
    const apiUrl = process.env.NEXT_PUBLIC_CONTRIB_API1;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_CONTRIB_API1 environment variable is not set");
      return { data: {} };
    }
    
    const url = apiUrl + `&domain=${domain}`;

    console.log("Fetching data from:", url);

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", res.status, errorText);
      return { data: {} };
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return { data: {} };
  }
}

export async function getScript(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log("error getScript", e);
    return { error: "error getScript" };
  }
}

export const getLayoutMetadata = async () => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const originUrl = `${protocol}://${host}`;
  try {
    const getDomain = await axios.get(`${originUrl}/api/domain`);
    const { domain } = getDomain.data;
    const url = `${baseURL}${ApiRoutes.v2DomainConfig}?key=${apiKey}&domain=${domain}`;
    const response = await axios.get(url);
    const { data } = response.data;
    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      author: data.domainName,
    };
  } catch (error) {
    console.error("Error fetching getLayoutMetadata", error);
    throw error;
  }
};
