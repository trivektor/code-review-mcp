import { GoogleGenAI } from "@google/genai";
import CodeAnalyzer from "./base.js";
import { getPrompt } from "../helpers.js";

const GEMINI_MODEL = "gemini-2.0-flash";

class GeminiAnalyzer extends CodeAnalyzer {
  constructor() {
    super();

    this.gemini = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async analyzeSecurityIssues(filePath, fileContent, promptPath) {
    const prompt = `${(await getPrompt(promptPath))}

    Code to analyze:

    \`\`\`javascript
    ${fileContent}
    \`\`\`
    `

    try {
      // Create streaming response
      const response = await this.gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

      // Parse the JSON response
      const jsonMatch = response.text?.match(/\{[\s\S]*\}/);

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
`

    try {
      const response = await this.gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

      // Parse the JSON response
      const jsonMatch = response.text?.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("Could not parse response as JSON");
      }

      const analysis = JSON.parse(jsonMatch[0]);

      const issues = analysis.issues.map((issue) => ({
        rule: issue.rule,
        message: issue.message,
        severity: issue.severity || "error",
        line: `${filePath}:${issue.line}`,
        type: "code smells",
        suggestion: issue.suggestion,
      }));

      return issues;
    } catch (error) {
      console.error(`Error analyzing code smells issues: ${error.message}`);
      return [];
    }
  }
}

export default GeminiAnalyzer;
