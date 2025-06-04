import fs from "fs-extra";

class CodeAnalyzer {
  async analyzeFile(filePath, promptPath, analysisTypes) {
    if (!(await fs.pathExists(filePath))) {
      throw new Error(`File not found: ${filePath}`);
    }

    const results = {
      filePath,
      issues: [],
      metrics: null,
    };

    const fileContent = await fs.readFile(filePath, "utf8");

    // Security analysis
    if (analysisTypes.includes("security")) {
      const securityIssues = await this.analyzeSecurityIssues(
        fileContent,
        promptPath
      );
      results.issues.push(...(securityIssues || []));
    }

    // Anti-pattern analysis
    if (analysisTypes.includes("antipatterns")) {
      const antiPatternIssues = await this.analyzeAntiPatterns(fileContent, promptPath);
      results.issues.push(...(antiPatternIssues || []));
    }

    // // Complexity analysis
    // if (analysisTypes.includes("complexity")) {
    //   results.metrics = this.calculateComplexityMetrics(fileContent);
    // }

    return results;
  }
}

export default CodeAnalyzer;
