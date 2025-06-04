import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AnthropicAnalyzer, GeminiAnalyzer } from "./analyzer/index.js";
import tools from "./tools.js";
import { formatAnalysisResults } from "./helpers.js";

const codeAnalyzer = new GeminiAnalyzer();

const server = new McpServer(
  {
    name: "code-analysis-mcp-server",
    version: "1.0.0",
    tools,
  }
);

export default server;

server.tool("analyze_file", {
  filePath: z.string(),
  promptPath: z.string(),
  analysisTypes: z.array(z.enum(["security", "code smells"])).default(["security", "code smells"]),
}, async (args) => {
  const {
    filePath,
    promptPath,
    analysisTypes = ["security", "code smells"],
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

server.tool("analyze_directory", {
  directoryPath: z.string(),
  promptPath: z.string(),
  analysisTypes: z.array(z.enum(["security", "code smells"])).default(["security", "code smells"]),
}, async (args) => {
  const {
    directoryPath,
    promptPath,
    analysisTypes = ["security", "code smells"],
  } = args;

  const absoluteDirectoryPath = `${process.env.WORKSPACE_FOLDER_PATHS}/${directoryPath}`;
  const absolutePromptPath = `${process.env.WORKSPACE_FOLDER_PATHS}/${promptPath}`;

  try {
    const results = await codeAnalyzer.analyzeDirectory(absoluteDirectoryPath, absolutePromptPath, analysisTypes);

    return {
      content: [
        {
          type: "text",
          text: formatAnalysisResults(results, directoryPath),
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


