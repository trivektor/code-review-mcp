import fs from "fs-extra";

class CodeAnalyzer {
  async analyzeFile(filePath, promptPath, analysisTypes) {
    if (!(await fs.pathExists(filePath))) {
      throw new Error(`File not found: ${filePath}`);
    }

    const results = {
      filePath,
      issues: [],
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

    // code smells analysis
    if (analysisTypes.includes("code smells")) {
      const codeSmellIssues = await this.analyzeCodeSmells(filePath, fileContent, promptPath);
      results.issues.push(...(codeSmellIssues || []));
    }

    return results;
  }

  async analyzeDirectory(directoryPath, promptPath, analysisTypes) {
    const results = {
      directoryPath,
      issues: [],
    };

    const entries = await fs.readdir(directoryPath, { recursive: true });

    for (const entry of entries) {
      const filePath = `${directoryPath}/${entry}`;

      if (fs.statSync(filePath).isFile()) {
        const fileResults = await this.analyzeFile(filePath, promptPath, analysisTypes);

        results.issues.push(...(fileResults.issues || []));
      }
    }

    return results;
  }
}

export default CodeAnalyzer;
