import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { AnthropicAnalyzer, GeminiAnalyzer } from "./analyzer/index.js";
import { formatAnalysisResults } from "./helpers.js";
import tools from "./tools.js";

// Create server instance
const server = new McpServer(
  {
    name: "code-analysis-mcp-server",
    version: "1.0.0",
    tools,
  }
);

// Initialize code analyzer
// const codeAnalyzer = new AnthropicAnalyzer();
const codeAnalyzer = new GeminiAnalyzer();

server.tool("analyze_file", {
  filePath: z.string(),
  promptPath: z.string(),
  analysisTypes: z.array(z.enum(["security", "complexity", "antipatterns"])).default(["security", "complexity", "antipatterns"]),
}, async (args) => {
  const {
    filePath,
    promptPath,
    analysisTypes = ["security", "complexity", "antipatterns"],
  } = args;

  // Resolve the file path to an absolute path
  const absoluteFilePath = `${process.env.WORKSPACE_FOLDER_PATHS}/${filePath}`;
  const absolutePromptPath = `${process.env.WORKSPACE_FOLDER_PATHS}/${promptPath}`;

  try {
    const results = await codeAnalyzer.analyzeFile(absoluteFilePath, absolutePromptPath, analysisTypes);

    return {
      content: [
        {
          type: "text",
          text: formatAnalysisResults(results, filePath),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
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
