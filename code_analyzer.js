import { ESLint } from "eslint";
import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import { execSync } from "child_process";

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

    this.antiPatterns = this.initializeAntiPatterns();
    this.securityPatterns = this.initializeSecurityPatterns();
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
    if (analysisTypes.includes("lint")) {
      const lintResults = await this.runESLintAnalysis(filePath);
      results.issues.push(...lintResults);
    }

    // Security analysis
    if (analysisTypes.includes("security")) {
      const securityIssues = this.analyzeSecurityIssues(fileContent, filePath);
      results.issues.push(...securityIssues);
    }

    // Anti-pattern analysis
    if (analysisTypes.includes("antipatterns")) {
      const antiPatternIssues = this.analyzeAntiPatterns(fileContent, filePath);
      results.issues.push(...antiPatternIssues);
    }

    // Complexity analysis
    if (analysisTypes.includes("complexity")) {
      results.metrics = this.calculateComplexityMetrics(fileContent);
    }

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
      console.error("ESLint analysis failed:", error);
      return [];
    }
  }

  analyzeSecurityIssues(content, filePath) {
    const issues = [];

    for (const pattern of this.securityPatterns) {
      const matches = content.match(pattern.regex);
      if (matches) {
        const lines = content.split("\n");
        lines.forEach((line, index) => {
          if (pattern.regex.test(line)) {
            issues.push({
              rule: pattern.name,
              message: pattern.message,
              severity: pattern.severity,
              line: index + 1,
              type: "security",
              suggestion: pattern.suggestion,
            });
          }
        });
      }
    }

    return issues;
  }

  analyzeAntiPatterns(content, filePath) {
    const issues = [];

    for (const pattern of this.antiPatterns) {
      const lines = content.split("\n");
      lines.forEach((line, index) => {
        if (pattern.regex.test(line)) {
          issues.push({
            rule: pattern.name,
            message: pattern.message,
            severity: pattern.severity,
            line: index + 1,
            type: "antipattern",
            suggestion: pattern.suggestion,
          });
        }
      });
    }

    return issues;
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

  initializeSecurityPatterns() {
    return [
      {
        name: "hardcoded-secret",
        regex: /(password|secret|key|token)\s*[:=]\s*['""][^'""\s]{8,}/gi,
        message: "Potential hardcoded secret or password",
        severity: "error",
        suggestion: "Use environment variables or secure configuration",
      },
      {
        name: "sql-injection",
        regex: /\$\{[^}]*\}|`[^`]*\${[^}]*}[^`]*`/g,
        message: "Potential SQL injection vulnerability",
        severity: "error",
        suggestion: "Use parameterized queries or prepared statements",
      },
      {
        name: "xss-vulnerability",
        regex: /innerHTML\s*=|document\.write\(/gi,
        message: "Potential XSS vulnerability",
        severity: "error",
        suggestion: "Use textContent or DOM manipulation methods",
      },
      {
        name: "unsafe-eval",
        regex: /\beval\s*\(/gi,
        message: "Use of eval() is dangerous",
        severity: "error",
        suggestion: "Avoid eval() and use safer alternatives",
      },
    ];
  }

  initializeAntiPatterns() {
    return [
      {
        name: "god-object",
        regex: /class\s+\w+\s*\{[\s\S]{2000,}/g,
        message: "Class is too large (God Object anti-pattern)",
        severity: "warning",
        suggestion: "Break down into smaller, focused classes",
      },
      {
        name: "magic-numbers",
        regex: /\b(?!0|1)\d{2,}\b/g,
        message: "Magic number detected",
        severity: "warning",
        suggestion: "Replace with named constants",
      },
      {
        name: "deep-nesting",
        regex: /(\s{12,}if|\s{12,}for|\s{12,}while)/g,
        message: "Deep nesting detected",
        severity: "warning",
        suggestion: "Extract nested logic into separate functions",
      },
      {
        name: "long-parameter-list",
        regex: /function\s+\w+\s*\([^)]{100,}\)/g,
        message: "Function has too many parameters",
        severity: "warning",
        suggestion: "Use an options object or reduce parameters",
      },
    ];
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
