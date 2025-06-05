import { Anthropic } from "@anthropic-ai/sdk";
import CodeAnalyzer from "./base.js";
import { getPrompt } from "../helpers.js";

const ANTHROPIC_MODEL = "claude-3-7-sonnet-20250219";

class AnthropicAnalyzer extends CodeAnalyzer {
  constructor() {
    super();

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async analyzeSecurityIssues(filePath, fileContent, promptPath) {
    const prompt = `${(await getPrompt(promptPath))}

  Code to analyze:

  \`\`\`javascript
  ${fileContent}
  \`\`\`
  `;

    try {
      let fullResponse = "";
      // Create streaming response
      const stream = await this.anthropic.messages
        .create({
          model: ANTHROPIC_MODEL,
          max_tokens: 10000,
          messages: [{ role: "user", content: prompt }],
          system: "You are a helpful assistant.",
          stream: true,
        })

      for await (const event of stream) {
        // console.error({ event });

        if (event.type === "content_block_delta") {
          fullResponse += event.delta.text;
        }
      }

      // Parse the JSON response
      const jsonMatch = fullResponse?.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("Could not parse response as JSON");
      }

      const analysis = JSON.parse(jsonMatch[0]);

      const issues = analysis.issues.map((issue) => ({
        rule: issue.rule,
        message: issue.message,
        severity: issue.severity || "error",
        line: `${filePath}:${issue.line}`,
        type: "security",
        suggestion: issue.suggestion,
      }));

      return issues;
    } catch (error) {
      console.error(`Error analyzing security issues: ${error.message}`);
      return [];
    }
  }

  async analyzeCodeSmells(filePath, fileContent, promptPath) {
    const prompt = `${(await getPrompt(promptPath))}

Code to analyze:

\`\`\`javascript
${fileContent}
\`\`\`
`;    

    try {
      let fullResponse = "";
      // Create streaming response
      const stream = await this.anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 20000,
        messages: [{ role: "user", content: prompt }],
        system: "You are a helpful assistant.",
        stream: true,
      });

      for await (const event of stream) {
        // console.error({ event });

        if (event.type === "content_block_delta") {
          fullResponse += event.delta.text;
        }
      }

      console.error({ fullResponse });

      // Parse the JSON response
      const jsonMatch = fullResponse?.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("Could not parse response as JSON");
      }

      const analysis = JSON.parse(jsonMatch[0]);

      const issues = analysis.issues.map((issue) => ({
        rule: issue.rule,
        message: issue.message,
        severity: issue.severity || "error",
        line: `${filePath}:${issue.line}`,
        type: "antipattern",
        suggestion: issue.suggestion,
      }));

      return issues;
    } catch (error) {
      console.error(`Error analyzing antipattern issues: ${error.message}`);
      return [];
    }
  }
}

export default AnthropicAnalyzer;
