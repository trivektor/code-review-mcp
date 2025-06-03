#!/usr/bin/env node

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { CodeAnalyzer } from "./code_analyzer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define tools
const tools = {
  analyze_file: {
    name: "analyze_file",
    description:
      "Analyze a file for code issues, security vulnerabilities, and anti-patterns",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Path to the file to analyze",
        },
        analysisTypes: {
          type: "array",
          items: {
            type: "string",
            enum: ["security", "complexity", "antipatterns"],
          },
          default: ["security", "complexity", "antipatterns"],
        },
      },
      required: ["filePath"],
    },
  },
  analyze_directory: {
    name: "analyze_directory",
    description: "Analyze all files in a directory for code issues",
    inputSchema: {
      type: "object",
      properties: {
        directoryPath: {
          type: "string",
          description: "Path to the directory to analyze",
        },
        filePatterns: {
          type: "array",
          items: { type: "string" },
          description: 'File patterns to include (e.g., "**/*.js", "**/*.ts")',
          default: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
        },
        analysisTypes: {
          type: "array",
          items: {
            type: "string",
            enum: ["security", "complexity", "antipatterns"],
          },
          default: ["security", "complexity", "antipatterns"],
        },
      },
      required: ["directoryPath"],
    },
  },
  get_issue_details: {
    name: "get_issue_details",
    description:
      "Get detailed explanation and fix suggestions for a specific issue type",
    inputSchema: {
      type: "object",
      properties: {
        issueType: {
          type: "string",
          description: "The type/rule name of the issue to explain",
        },
        codeContext: {
          type: "string",
          description: "The problematic code snippet (optional)",
        },
      },
      required: ["issueType"],
    },
  },
};

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Create server instance
const server = new Server(
  {
    name: "code-review-server",
    version: "1.0.0",
  }
);

// Initialize code analyzer
const codeAnalyzer = new CodeAnalyzer();

server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Return tools directly from our tools definition
  return {
    tools: Object.values(tools),
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "analyze_file":
        return await handleAnalyzeFile(args);

      case "analyze_directory":
        return await handleAnalyzeDirectory(args);

      case "get_issue_details":
        return await handleGetIssueDetails(args);

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error(`Error in tool call ${name}: ${error.message}`);
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

// Tool handlers
async function handleAnalyzeFile(args) {
  const {
    filePath,
    analysisTypes = ["security", "complexity", "antipatterns"],
  } = args;

  console.error({ filePath, analysisTypes });

  try {
    const results = await codeAnalyzer.analyzeFile(filePath, analysisTypes);

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
}

async function handleAnalyzeDirectory(args) {
  const {
    directoryPath,
    filePatterns = ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    analysisTypes = ["security", "complexity", "antipatterns"],
  } = args;

  try {
    const results = await codeAnalyzer.analyzeDirectory(
      directoryPath,
      filePatterns,
      analysisTypes
    );

    return {
      content: [
        {
          type: "text",
          text: formatDirectoryResults(results),
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
}

async function handleGetIssueDetails(args) {
  const { issueType, codeContext } = args;

  const details = await codeAnalyzer.getIssueDetails(issueType, codeContext);

  return {
    content: [
      {
        type: "text",
        text: details,
      },
    ],
  };
}

// Formatting functions
function formatAnalysisResults(results, filePath) {
  let output = `# 🔍 Code Analysis Results for ${filePath}\n\n`;
  output += `*Analysis performed by MCP Code Review Server*\n\n`;

  if (results.issues.length === 0) {
    output += "✅ No issues found!\n";
  } else {
    output += `Found ${results.issues.length} issues:\n\n`;

    const groupedIssues = groupIssuesBySeverity(results.issues);

    for (const [severity, issues] of Object.entries(groupedIssues)) {
      output += `## ${severity.toUpperCase()} Issues (${issues.length})\n\n`;

      issues.forEach((issue) => {
        const icon = getSeverityIcon(severity);
        output += `${icon} **${issue.rule}** (Line ${issue.line})\n`;
        output += `   ${issue.message}\n`;
        if (issue.suggestion) {
          output += `   💡 *Suggestion: ${issue.suggestion}*\n`;
        }
        output += "\n";
      });
    }
  }

  if (results.metrics) {
    output += `## 📊 Code Metrics\n`;
    output += `- Complexity Score: ${results.metrics.complexity}\n`;
    output += `- Lines of Code: ${results.metrics.linesOfCode}\n`;
    output += `- Maintainability Index: ${results.metrics.maintainability}\n\n`;
  }

  output += `---\n*Powered by MCP Code Review Server v1.0.0*`;

  return output;
}

function formatDirectoryResults(results) {
  let output = `# 📂 Directory Analysis Summary\n\n`;

  const totalIssues = results.reduce(
    (sum, file) => sum + file.issues.length,
    0
  );

  output += `📊 **Summary**: Analyzed ${results.length} files, found ${totalIssues} total issues\n\n`;

  // Group by severity across all files
  const allIssues = results.flatMap((file) =>
    file.issues.map((issue) => ({ ...issue, file: file.filePath }))
  );

  const groupedIssues = groupIssuesBySeverity(allIssues);

  for (const [severity, issues] of Object.entries(groupedIssues)) {
    output += `## ${severity.toUpperCase()} Issues (${issues.length})\n\n`;

    const fileGroups = {};
    issues.forEach((issue) => {
      if (!fileGroups[issue.file]) fileGroups[issue.file] = [];
      fileGroups[issue.file].push(issue);
    });

    for (const [file, fileIssues] of Object.entries(fileGroups)) {
      output += `### ${file}\n`;
      fileIssues.forEach((issue) => {
        const icon = getSeverityIcon(severity);
        output += `${icon} **${issue.rule}** (Line ${issue.line}): ${issue.message}\n`;
      });
      output += "\n";
    }
  }

  return output;
}

function groupIssuesBySeverity(issues) {
  return issues.reduce((groups, issue) => {
    const severity = issue.severity || "warning";
    if (!groups[severity]) groups[severity] = [];
    groups[severity].push(issue);
    return groups;
  }, {});
}

function getSeverityIcon(severity) {
  const icons = {
    error: "🚨",
    warning: "⚠️",
    info: "ℹ️",
  };
  return icons[severity] || "⚠️";
}

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
