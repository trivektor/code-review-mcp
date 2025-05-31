#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Create server instance
const server = new Server(
  {
    name: 'code-review-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle listing available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.error('🔧 ListTools called');
  try {
    const tools = [
      {
        name: 'analyze_file',
        description: 'Analyze a file for code issues',
        inputSchema: {
          type: 'object',
          properties: {
            filePath: {
              type: 'string',
              description: 'Path to the file to analyze'
            }
          },
          required: ['filePath']
        }
      },
      {
        name: 'hello',
        description: 'Say hello for testing',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name to greet'
            }
          }
        }
      }
    ];
    
    console.error(`📋 Returning ${tools.length} tools`);
    return { tools };
  } catch (error) {
    console.error('❌ Error in ListTools:', error);
    throw error;
  }
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  console.error(`🚀 Tool called: ${name}`, args);

  try {
    switch (name) {
      case 'hello':
        return {
          content: [
            {
              type: 'text',
              text: `Hello ${args.name || 'World'}! 🎉`
            }
          ]
        };

      case 'analyze_file':
        return {
          content: [
            {
              type: 'text',
              text: `🔍 **Analysis Results for ${args.filePath}**\n\n✅ File analyzed successfully! (Debug mode)`
            }
          ]
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error(`❌ Error in tool ${name}:`, error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ]
    };
  }
});

// Start the server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('✅ Debug MCP Server is running');
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main();