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
            enum: ["security", "antipatterns"],
          },
          default: ["security", "antipatterns"],
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
            enum: ["security", "antipatterns"],
          },
          default: ["security", "antipatterns"],
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

export default tools;
