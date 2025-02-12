// components/featuresData.js
const API_URL = "https://api.agentdao.com/dna/getall?api_key=a088239f8263dc8f&page=1&filter=&limit=100";
const DEFAULT_ICON_URL = "https://cdn.vnoc.com/icons/agentdao-common-icon-1.png";

const allowedDomains = new Set([
  "bitagent.com", "storyagents.com", "serveragents.com", "hashagent.com", "socialagent.com",
  "codeagent.com", "personnelagent.com", "contentagent.com", "advoagent.com", "govagent.com",
  "networkagent.com", "utilityagent.com", "linkagent.com", "capitalagent.com", "securityagent.com",
  "liveagent.com", "supportagent.com", "statsagent.com", "portfolioagent.com", "pitchagent.com",
  "testagent.com", "growagent.com", "fundagent.com", "referagent.com", "partneragent.com",
  "attackagent.com", "bankagent.com", "billagent.com", "careagent.com", "dealagent.com",
  "equityagent.com", "gamingagent.com", "gridagent.com", "ipagent.com", "mobileagent.com",
  "pollagent.com", "scienceagent.com", "supplyagent.com", "voiceagent.com", "agentchallenge.com",
  "agentnews.com", "agentmanager.com", "financeagent.com", "cryptoagent.com", "abot.com",
  "accountbot.com", "botchallenge.com", "businessbot.com", "campusbot.com", "carbonagents.com",
  "carbonbots.com", "casinobot.com", "challengeagent.com", "corpbots.com", "courtagent.com",
  "cruiseagent.com", "cyberbot.com", "cyberbots.com", "debtagent.com", "designbots.com",
  "dockeragent.com", "eduagent.com", "energybots.com", "fantasybot.com", "grantagent.com",
  "healthagent.com", "healthagents.com", "historybot.com", "homebot.com", "ibot.com",
  "javabot.com", "lawyerbot.com", "leaseagent.com", "liveagents.com", "loanbots.com",
  "marketbot.com", "mediabot.com", "medicalagent.com", "nodeagent.com", "nutriagent.com",
  "oceanbot.com", "partyagent.com", "partybots.com", "peacebot.com", "picturebot.com",
  "playagents.com", "politicalagent.com", "pollutionbot.com", "pornagents.com", "pragent.com",
  "productbot.com", "profileagents.com", "profilebot.com", "propertybot.com", "purchaseagent.com",
  "realtoragent.com", "realtybot.com", "schoolbot.com", "securitybot.com", "seedagent.com",
  "serviceagents.com", "servicebot.com", "softwarebot.com", "sportsbot.com", "storebot.com",
  "streamagent.com", "studentagent.com", "stylebot.com", "talkbot.com", "techbot.com",
  "ticketbot.com", "titlebot.com", "tourbot.com", "tradebots.com", "tradingbot.com",
  "vbot.com", "vendorbot.com", "venturebot.com", "vetbot.com", "virtualbot.com",
  "wellnessagent.com", "widgetagent.com"
]);

export async function fetchFeaturesData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data || !data.tlds || !Array.isArray(data.tlds)) {
      throw new Error("Unexpected API response format.");
    }

    const filteredData = data.tlds
      .filter((item) => allowedDomains.has(item.tld))
      .map((item) => ({
        id: item.id,
        icon: item.logo || DEFAULT_ICON_URL,
        title: item.tld,
        description: item.description || `Explore ${item.tld}`,
        link: `https://${item.tld}`,
      }));

    filteredData.sort((a, b) => a.title.localeCompare(b.title));

    return filteredData;
  } catch (error) {
    console.error("Error fetching features data:", error);
    throw error;
  }
}

