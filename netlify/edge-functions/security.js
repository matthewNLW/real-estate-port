export default async (request, context) => {
  const userAgent = request.headers.get("user-agent") || "";
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  // 1. Block Suspicious File Extensions (Vulnerability Scanners)
  // These files don't exist in our static site, providing a 403 saves resources.
  const blockedExtensions = [".php", ".env", ".git", ".sql", ".config", ".bak"];
  if (blockedExtensions.some((ext) => path.endsWith(ext))) {
    return new Response("Access Denied", { status: 403 });
  }

  // 2. Block Known Bad Bots / Scrapers 
  // (You can expand this list based on your traffic logs)
  const blockedAgents = [
    "semrushbot", 
    "ahrefsbot", 
    "dotbot", 
    "mj12bot", 
    "petalbot", 
    "bytespider",
    "liebaofast"
  ];
  
  if (blockedAgents.some((bot) => userAgent.toLowerCase().includes(bot))) {
    return new Response("Bot access denied", { status: 403 });
  }

  // 3. Simple Rate Limiting (Optional - Logic Placeholder)
  // For static sites, blocking bad agents is usually most effective.
  
  return context.next();
};
