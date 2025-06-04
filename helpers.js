import fs from "fs/promises";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getPrompt(promptPath) {
  const promptContent = await fs.readFile(promptPath, 'utf8');

  return promptContent;
}

export function formatAnalysisResults(results, filePath) {
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
