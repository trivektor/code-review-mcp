import { ESLint } from "eslint";
import fs from "fs-extra";
import { glob } from "glob";
import https from "https";
import { Anthropic } from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
 });

export class CodeAnalyzer {
  constructor() {
    this.eslint = new ESLint({
      baseConfig: {
        env: {
          browser: true,
          node: true,
          es2021: true,
        },
        extends: ["eslint:recommended"],
        parserOptions: {
          ecmaVersion: 2021,
          sourceType: "module",
        },
        rules: {
          // Security rules
          "no-eval": "error",
          "no-implied-eval": "error",
          "no-new-func": "error",
          "no-script-url": "error",

          // Code quality rules
          complexity: ["warn", 10],
          "max-depth": ["warn", 4],
          "max-lines-per-function": ["warn", 50],
          "max-params": ["warn", 4],

          // Anti-patterns
          "no-var": "error",
          "prefer-const": "error",
          "no-magic-numbers": ["warn", { ignore: [0, 1, -1] }],
          "no-console": "warn",
          "no-debugger": "error",
          "no-unused-vars": "error",
          "no-unreachable": "error",
          "no-undef": "error",
          "no-redeclare": "error",
          "no-duplicate-imports": "error",
        },
      },
      useEslintrc: false,
      //overrideConfigFile: true,
    });
  }

  async analyzeFile(filePath, analysisTypes) {
    if (!(await fs.pathExists(filePath))) {
      throw new Error(`File not found: ${filePath}`);
    }

    const results = {
      filePath,
      issues: [],
      metrics: null,
    };

    const fileContent = await fs.readFile(filePath, "utf8");

    // ESLint analysis
    // if (analysisTypes.includes("lint")) {
    //   const lintResults = await this.runESLintAnalysis(filePath);
    //   results.issues.push(...lintResults);
    // }

    // Security analysis
    if (analysisTypes.includes("security")) {
      const securityIssues = await this.analyzeSecurityIssues(fileContent, filePath);
      results.issues.push(...(securityIssues || []));
    }

    // Anti-pattern analysis
    // if (analysisTypes.includes("antipatterns")) {
    //   const antiPatternIssues = this.analyzeAntiPatterns(fileContent, filePath);
    //   results.issues.push(...antiPatternIssues);
    // }

    // // Complexity analysis
    // if (analysisTypes.includes("complexity")) {
    //   results.metrics = this.calculateComplexityMetrics(fileContent);
    // }

    return results;
  }

  async analyzeDirectory(directoryPath, filePatterns, analysisTypes) {
    const files = await this.findFiles(directoryPath, filePatterns);
    const results = [];

    for (const file of files) {
      try {
        const result = await this.analyzeFile(file, analysisTypes);
        results.push(result);
      } catch (error) {
        console.error(`Error analyzing ${file}:`, error.message);
      }
    }

    return results;
  }

  async runESLintAnalysis(filePath) {
    try {
      const results = await this.eslint.lintFiles([filePath]);
      const issues = [];

      for (const result of results) {
        for (const message of result.messages) {
          issues.push({
            rule: message.ruleId || "unknown",
            message: message.message,
            severity: message.severity === 2 ? "error" : "warning",
            line: message.line,
            column: message.column,
            type: "lint",
          });
        }
      }

      return issues;
    } catch (error) {
      return [];
    }
  }

  async analyzeSecurityIssues(content, filePath) {
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

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
  const response = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1024,
    messages: [
      {"role": "user", "content": prompt}
    ],
    system: "You are a helpful assistant."
  });

  // Extract the content from the response
  const content = response.content[0]?.text;

  console.error('Anthropic response received');
  console.error(content);
  
  // Log the content instead of the full response
  // console.log(JSON.stringify({
  //   type: 'log',
  //   level: 'info',
  //   message: 'Anthropic response received',
  //   timestamp: new Date().toISOString(),
  //   content: content?.substring(0, 100) + (content?.length > 100 ? '...' : '')
  // }));

  // Parse the JSON response
  const jsonMatch = content?.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse response as JSON');
  }

  console.error('jsonMatch');
  console.error(jsonMatch);

  const securityAnalysis = JSON.parse(jsonMatch[0]);
  
  // Convert to our internal format
  const issues = securityAnalysis.issues.map(issue => ({
    rule: issue.rule,
    message: issue.message,
    severity: issue.severity || 'error',
    line: issue.line,
    type: 'security',
    suggestion: issue.suggestion
  }));

  //console.error(`🛡️ Claude found ${issues.length} security issues`);
  return issues;
} catch (error) {
  return [];
}
  }

  analyzeAntiPatterns(content, filePath) {
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

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

    const requestData = JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const options = {
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(requestData)
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            
            if (result.content && result.content[0] && result.content[0].text) {
              const responseText = result.content[0].text;
              
              // Extract JSON from the response
              const jsonMatch = responseText.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const antiPatternAnalysis = JSON.parse(jsonMatch[0]);
                
                // Convert to our internal format
                const issues = antiPatternAnalysis.issues.map(issue => ({
                  rule: issue.rule,
                  message: issue.message,
                  severity: issue.severity || 'warning',
                  line: issue.line,
                  type: 'antipattern',
                  suggestion: issue.suggestion
                }));
                
                console.error(`🔧 Claude found ${issues.length} anti-patterns and code smells`);
                resolve(issues);
              } else {
                console.error('⚠️ Could not parse Claude response');
                reject();
              }
            } else {
              console.error('❌ Invalid Claude API response');
              reject();
            }
          } catch (parseError) {
            console.error('❌ Failed to parse Claude response:', parseError.message);
            reject();
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('❌ Claude API request failed:', error.message);
        reject();
      });
      
      req.setTimeout(20000, () => {
        req.destroy();
        console.error('⏰ Claude API timeout');
        reject();
      });
      
      req.write(requestData);
      req.end();
    });
  }

  calculateComplexityMetrics(content) {
    const lines = content.split("\n");
    const linesOfCode = lines.filter(
      (line) =>
        line.trim() &&
        !line.trim().startsWith("//") &&
        !line.trim().startsWith("/*")
    ).length;

    // Simple cyclomatic complexity calculation
    const complexityKeywords =
      /\b(if|else|while|for|switch|case|catch|&&|\|\||\?)\b/g;
    const complexityMatches = content.match(complexityKeywords) || [];
    const complexity = complexityMatches.length + 1;

    // Basic maintainability index (simplified)
    const maintainability = Math.max(
      0,
      Math.min(
        100,
        171 -
          5.2 * Math.log(linesOfCode) -
          0.23 * complexity -
          16.2 * Math.log(linesOfCode)
      )
    );

    return {
      linesOfCode,
      complexity,
      maintainability: Math.round(maintainability),
    };
  }

  async findFiles(directoryPath, patterns) {
    const files = [];

    for (const pattern of patterns) {
      const fullPattern = path.join(directoryPath, pattern);
      const matches = await glob(fullPattern, {
        ignore: ["**/node_modules/**", "**/.git/**"],
      });
      files.push(...matches);
    }

    return [...new Set(files)]; // Remove duplicates
  }

  async getIssueDetails(issueType, codeContext) {
    const explanations = {
      "hardcoded-secret": `
# Hardcoded Secrets

**Risk**: Hardcoding secrets in source code is a major security vulnerability.

**Why it's dangerous**:
- Secrets are visible to anyone with code access
- Version control systems store the history
- Deployed applications expose secrets

**Fix**:
\`\`\`javascript
// Bad
const apiKey = "sk-1234567890abcdef";

// Good
const apiKey = process.env.API_KEY;
\`\`\`
      `,
      complexity: `
# Cyclomatic Complexity

**What it measures**: The number of linearly independent paths through code.

**High complexity problems**:
- Hard to test thoroughly
- More likely to contain bugs
- Difficult to maintain

**How to reduce**:
- Extract functions
- Use early returns
- Simplify conditional logic
      `,
    };

    return (
      explanations[issueType] ||
      `No detailed explanation available for: ${issueType}`
    );
  }

  async suggestFixes(filePath, issues) {
    let suggestions = `# Fix Suggestions for ${filePath}\n\n`;

    const groupedIssues = issues.reduce((groups, issue) => {
      if (!groups[issue.type]) groups[issue.type] = [];
      groups[issue.type].push(issue);
      return groups;
    }, {});

    for (const [type, typeIssues] of Object.entries(groupedIssues)) {
      suggestions += `## ${type.toUpperCase()} Issues\n\n`;

      typeIssues.forEach((issue, index) => {
        suggestions += `### ${issue.rule} (Line ${issue.line})\n`;
        suggestions += `**Problem**: ${issue.message}\n\n`;

        if (issue.suggestion) {
          suggestions += `**Solution**: ${issue.suggestion}\n\n`;
        }

        suggestions += "---\n\n";
      });
    }

    return suggestions;
  }
}
