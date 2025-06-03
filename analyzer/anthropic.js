import { Anthropic } from "@anthropic-ai/sdk";
import CodeAnalyzer from "./base.js";

class AnthropicAnalyzer extends CodeAnalyzer {
  constructor() {
    super();

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async analyzeSecurityIssues(content, filePath) {
    const prompt = `You are a security expert analyzing JavaScript/TypeScript code for vulnerabilities.

Please analyze the following code and identify specific security issues. For each issue found, provide:
1. The exact line number where the issue occurs
2. The security rule/vulnerability type (use kebab-case names like "sql-injection", "xss-vulnerability")
3. A clear description of the security risk
4. A specific suggestion for fixing the issue

Code to analyze:
\`\`\`javascript
${content}
\`\`\`

Please respond in this exact JSON format:
{
  "issues": [
    {
      "line": 5,
      "rule": "hardcoded-secret",
      "message": "Hardcoded API key detected in source code",
      "severity": "error",
      "suggestion": "Move API key to environment variable"
    }
  ]
}

Focus on these types of security vulnerabilities:
- Hardcoded secrets, passwords, API keys
- SQL injection vulnerabilities
- Cross-site scripting (XSS) risks
- Unsafe eval() usage
- Command injection risks
- Insecure random number generation
- Path traversal vulnerabilities
- Prototype pollution
- Insecure deserialization
- SSRF (Server-Side Request Forgery)
- Timing attacks
- Information disclosure
- Weak cryptography

Only include actual security issues, not general code quality problems.`;

    try {
      let fullResponse = "";
      // Create streaming response
      const stream = await this.anthropic.messages
        .create({
          model: "claude-3-7-sonnet-20250219",
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
        line: issue.line,
        type: "security",
        suggestion: issue.suggestion,
      }));

      return issues;
    } catch (error) {
      console.error(`Error analyzing security issues: ${error.message}`);
      return [];
    }
  }

  async analyzeAntiPatterns(content, filePath) {
    const prompt = `You are a senior software architect and code quality expert analyzing JavaScript/TypeScript code for anti-patterns, code smells, and design issues.

Please analyze the following code and identify specific anti-patterns and code quality issues. For each issue found, provide:
1. The exact line number where the issue occurs (or starting line for multi-line issues)
2. The anti-pattern/code smell name (use kebab-case like "god-object", "long-parameter-list")
3. A clear description of the problem
4. A specific suggestion for refactoring/fixing the issue

Code to analyze:
\`\`\`javascript
${content}
\`\`\`

Please respond in this exact JSON format:
{
  "issues": [
    {
      "line": 15,
      "rule": "long-parameter-list",
      "message": "Function has too many parameters (8), making it hard to use and maintain",
      "severity": "warning",
      "suggestion": "Use an options object or break into smaller functions"
    }
  ]
}

Focus on these types of anti-patterns and code smells:

**Structural Anti-Patterns:**
- God Object/God Class (classes doing too much)
- Blob/Large Class (classes with too many lines/methods)
- Spaghetti Code (complex control flow)
- Copy-Paste Programming (duplicated code blocks)
- Golden Hammer (overusing one solution)
- Lava Flow (dead/commented code)

**Method/Function Issues:**
- Long Method/Function (functions doing too much)
- Long Parameter List (too many parameters)
- Feature Envy (accessing other objects' data excessively)
- Data Clumps (same group of parameters/variables appearing together)
- Primitive Obsession (using primitives instead of objects)
- Switch Statement Smell (large switch/if-else chains)

**Class Design Issues:**
- Refused Bequest (subclass doesn't use parent methods)
- Lazy Class/Poltergeist (class that doesn't do much)
- Middle Man (class just delegating to others)
- Inappropriate Intimacy (classes too tightly coupled)
- Message Chains/Train Wreck (excessive method chaining)
- Temporary Field (fields only used sometimes)

**Code Quality Issues:**
- Magic Numbers/Strings (unexplained literals)
- Inconsistent Naming (mixed naming conventions)
- Deep Nesting (too many nested blocks)
- Boolean Trap (unclear boolean parameters)
- Shotgun Surgery (one change requires many small changes)
- Speculative Generality (over-engineering for future needs)
- Comments That Lie (misleading or outdated comments)
- Dead Code (unused variables, functions, imports)

**Performance Anti-Patterns:**
- Premature Optimization (micro-optimizations that hurt readability)
- N+1 Problems (loops with individual queries/operations)
- Memory Leaks (unreleased resources, event listeners)

Only include actual design/quality issues, not security vulnerabilities.`;

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
        line: issue.line,
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
