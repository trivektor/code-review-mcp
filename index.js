import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import server from "./server.js";

async function main() {
  const transport = new StdioServerTransport();

  try {
    // Then connect the server
    await server.connect(transport);
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

main();
