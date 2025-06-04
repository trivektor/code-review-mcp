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
        filePath,
        fileContent,
        promptPath
      );
      results.issues.push(...(securityIssues || []));
    }

    // Anti-pattern analysis
    if (analysisTypes.includes("antipatterns")) {
      const antiPatternIssues = await this.analyzeAntiPatterns(filePath, fileContent, promptPath);
      results.issues.push(...(antiPatternIssues || []));
    }

    // // Complexity analysis
    // if (analysisTypes.includes("complexity")) {
    //   results.metrics = this.calculateComplexityMetrics(fileContent);
    // }

    return results;
  }

  async analyzeDirectory(directoryPath, promptPath, analysisTypes) {
    const results = {
      directoryPath,
      issues: [],
      metrics: null,
    };

    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = `${directoryPath}/${file}`;

      if (fs.statSync(filePath).isFile()) {
        const fileResults = await this.analyzeFile(filePath, promptPath, analysisTypes);
        results.issues.push(...(fileResults.issues || []));
      }
    }

    return results;
  }
}

export default CodeAnalyzer;
