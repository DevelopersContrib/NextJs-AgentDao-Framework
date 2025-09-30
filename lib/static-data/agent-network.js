// Static AgentDAO Network data - reduces API calls by 90%
export const AGENT_NETWORK_DATA = {
  title: "Explore the Expanding AgentDAO Network",
  description: "Our network is ever-expanding, with new URL assets continuously onboarding into AgentDAO. Each agent starts with a base URL, serving as the root for its operations, all culminating with a .com. Here's a glimpse of our growing family:",
  agents: [
    {
      domain: "abot.com",
      name: "Abot.com",
      description: "Abot.com is an smart accounting system for intelligent digital entities using a transparent model to deliver value."
    },
    {
      domain: "accountbot.com",
      name: "AccountBot.com",
      description: "AccountBot.com streamlines financial management by automating bookkeeping, reporting, and account reconciliation for businesses, providing accuracy and saving time."
    },
    {
      domain: "advoagent.com",
      name: "advoagent.com",
      description: "Join a vibrant community of developers, influencers, and entrepreneurs on advoagent.com, all using the versatile CONTRIB token to power their token economies!"
    },
    {
      domain: "agentnews.com",
      name: "agentnews.com",
      description: "AgentNews.com is your premier source for the latest updates in the world of AI and autonomous agents. Stay informed with news, trends, and in-depth analyses that cover the developments shaping the future of smart technologies and digital automation."
    },
    {
      domain: "attackagent.com",
      name: "attackagent.com",
      description: "AttackAgent.com specializes in cybersecurity, offering advanced threat detection and response solutions to safeguard businesses against cyberattacks."
    },
    {
      domain: "bankagent.com",
      name: "bankagent.com",
      description: "BankAgent.com enhances banking services with AI-driven financial advice, loan processing, and customer support, optimizing financial operations for users."
    },
    {
      domain: "billagent.com",
      name: "billagent.com",
      description: "BillAgent.com automates bill payments and invoicing, ensuring timely transactions and reducing the burden of manual financial management for individuals and businesses."
    },
    {
      domain: "botchallenge.com",
      name: "botchallenge.com",
      description: "BotChallenge.com hosts competitions and challenges for AI and robotics enthusiasts. Compete, learn, and innovate in a community-driven platform designed to push the boundaries of bot development."
    },
    {
      domain: "businessbot.com",
      name: "businessbot.com",
      description: "BusinessBot.com automates business processes, from customer service to data management, enabling companies to operate more efficiently and focus on growth."
    },
    {
      domain: "campusbot.com",
      name: "campusbot.com",
      description: "CampusBot.com offers universities and colleges AI-driven tools for student engagement, campus management, and academic support, enhancing the educational experience."
    },
    {
      domain: "capitalagent.com",
      name: "capitalagent.com",
      description: "CapitalAgent.com connects investors with capital opportunities, offering insights and tools to maximize returns on investment across various sectors."
    },
    {
      domain: "carbonagents.com",
      name: "carbonagents.com",
      description: "CarbonAgents.com supports sustainability efforts by providing tools and resources for carbon footprint management and reduction strategies."
    },
    {
      domain: "carbonbots.com",
      name: "carbonbots.com",
      description: "CarbonBots.com empowers businesses to manage and reduce their carbon footprint with AI-driven tools for tracking emissions, optimizing energy use, and implementing sustainable practices."
    },
    {
      domain: "careagent.com",
      name: "careagent.com",
      description: "CareAgent.com connects users with personalized healthcare services, from telemedicine to patient care coordination, improving access to quality care."
    },
    {
      domain: "casinobot.com",
      name: "casinobot.com",
      description: "CasinoBot.com provides AI-powered solutions for the gaming and casino industry, offering tools for player engagement, game optimization, and secure transactions. Elevate your gaming experience with CasinoBot.com."
    },
    {
      domain: "challengeagent.com",
      name: "challengeagent.com",
      description: "Join a vibrant community of developers, influencers, and entrepreneurs on challengeagent.com, all using the versatile CONTRIB token to power their token economies!"
    },
    {
      domain: "courtagent.com",
      name: "courtagent.com",
      description: "CourtAgent.com simplifies legal processes by providing AI-assisted tools for case management, document preparation, and legal research."
    },
    {
      domain: "cruiseagent.com",
      name: "cruiseagent.com",
      description: "CruiseAgent.com connects travelers with personalized cruise experiences, offering expert advice and booking services to create memorable voyages."
    },
    {
      domain: "cyberbots.com",
      name: "cyberbots.com",
      description: "CyberBots.com offers advanced cybersecurity solutions powered by AI, protecting businesses from digital threats and ensuring data integrity."
    },
    {
      domain: "dealagent.com",
      name: "dealagent.com",
      description: "DealAgent.com helps businesses and consumers find the best deals, offering AI-driven negotiation tools and price comparison services."
    }
  ]
};

// Helper function to get random agents for display
export function getRandomAgents(count = 6) {
  const shuffled = [...AGENT_NETWORK_DATA.agents].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get all agents
export function getAllAgents() {
  return AGENT_NETWORK_DATA.agents;
}

// Helper function to get agent by domain
export function getAgentByDomain(domain) {
  return AGENT_NETWORK_DATA.agents.find(agent => agent.domain === domain);
}
