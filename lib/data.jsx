import axios from 'axios'
import { headers } from 'next/headers'

export function getDomain() {
  let DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;
  const headersList = headers()
  const referrer = headersList.get('host')
  const domainName = referrer.includes("localhost") ? DOMAIN : referrer
  return domainName.replace('www.',''); 
}

export async function getData() {
  try {
    const domain = getDomain();
    const url = process.env.NEXT_PUBLIC_CONTRIB_API1 + `&domain=${domain}`;

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
  try{
    const res = await axios.get(url);
    return res.data;
  }catch(e){
    console.log('error getScript',e)
    return {error:'error getScript'}
  }
}