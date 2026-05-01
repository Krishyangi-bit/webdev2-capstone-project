const issueMatchers = [
  { test: /\bvar\b/, message: "Avoid using 'var'. Use 'let' or 'const' instead." },
  { test: /console\.log\(/, message: "Remove console.log() statements before production." },
  { test: /==(?!=)/, message: "Use strict equality '===' instead of '=='." },
  { test: /eval\(/, message: "Avoid eval(). It's a security risk." },
  { test: /document\.write\(/, message: "Avoid document.write(). Use DOM manipulation instead." },
];

const warningMatchers = [
  {
    test: (code) => !/\/\/|\/\*/.test(code),
    message: 'No comments found. Add comments to explain complex logic.',
  },
  {
    test: (code) => {
      const lines = code.split('\n');
      return lines.some((line) => line.length > 100);
    },
    message: 'Line too long (>100 chars). Impacts readability.',
    weight: 0,
  },
  {
    test: (code) => /(\n\s{8,}\S+)/.test(code),
    message: 'Deep nesting detected. Consider refactoring for readability.',
  },
  {
    test: (code) => /TODO|FIXME/.test(code),
    message: 'TODO/FIXME comments found. Resolve before finalizing.',
  },
  {
    test: (code) => !/;/.test(code),
    message: 'No semicolons detected. Ensure consistent style.',
  },
];

const praiseMatchers = [
  {
    test: (code) => /\/\/|\/\*/.test(code),
    message: 'Good job! Code includes comments for clarity.',
  },
  {
    test: (code) => /\bconst\b/.test(code),
    message: "Great use of 'const' for immutable variables.",
  },
  {
    test: (code) => /=>/.test(code),
    message: 'Modern arrow function syntax detected.',
  },
  {
    test: (code) => /===/.test(code),
    message: "Correct use of strict equality '==='. Keep it up!",
  },
  {
    test: (code) => code.split('\n').length <= 50,
    message: 'Concise code! Short functions are easier to test.',
  },
  {
    test: (code) => /try\s*\{/.test(code),
    message: 'Error handling with try/catch detected. Great practice!',
  },
  {
    test: (code) => /async\s+function|await\s+/.test(code),
    message: 'Async/await usage detected. Modern and clean!',
  },
];

const detectSyntaxIssues = (code, language) => {
  const problems = [];
  const opening = { '(': ')', '{': '}', '[': ']' };
  const closing = { ')': '(', '}': '{', ']': '[' };
  const stack = [];
  let inString = null;
  let escaped = false;
  let inSingleComment = false;
  let inMultiComment = false;

  for (let i = 0; i < code.length; i += 1) {
    const char = code[i];
    const next = code[i + 1];

    if (inSingleComment) {
      if (char === '\n') inSingleComment = false;
      continue;
    }

    if (inMultiComment) {
      if (char === '*' && next === '/') {
        inMultiComment = false;
        i += 1;
      }
      continue;
    }

    if (!inString && char === '/' && next === '/') {
      inSingleComment = true;
      i += 1;
      continue;
    }

    if (!inString && char === '/' && next === '*') {
      inMultiComment = true;
      i += 1;
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === inString) {
        inString = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = char;
      continue;
    }

    if (opening[char]) {
      stack.push(char);
      continue;
    }

    if (closing[char]) {
      const last = stack.pop();
      if (last !== closing[char]) {
        problems.push(`Unmatched '${char}' found.`);
      }
      continue;
    }
  }

  if (inString) {
    problems.push('Unclosed string literal detected.');
  }

  if (stack.length) {
    problems.push('Unclosed bracket or brace detected.');
  }

  if (language === 'JavaScript') {
    try {
      // eslint-disable-next-line no-new-func
      new Function(code);
    } catch (error) {
      if (error instanceof SyntaxError) {
        problems.push(error.message);
      }
    }
  }

  if (language === 'Python') {
    if (/("[^\"]*$|\'[^\']*$)/.test(code) && !/\\$/.test(code.trim())) {
      problems.push('Mismatched quotes or unterminated string detected.');
    }
  }

  return [...new Set(problems)];
};

export const analyzeCode = (code, language) => {
  const normalized = code.trim();
  const issues = issueMatchers.filter((rule) => rule.test.test(normalized)).map((rule) => rule.message);
  const warnings = warningMatchers.filter((rule) => rule.test(normalized)).map((rule) => rule.message);
  const praise = praiseMatchers.filter((rule) => rule.test(normalized)).map((rule) => rule.message);
  const syntaxIssues = detectSyntaxIssues(normalized, language);

  if (syntaxIssues.length) {
    issues.unshift(`Syntax error detected: ${syntaxIssues.join(' ')}`);
  }

  let score = 100;
  score -= issues.length * 10;
  score -= warnings.length * 5;
  if (syntaxIssues.length) {
    score = 0;
  }
  if (score < 0) score = 0;

  if (issues.length === 0 && warnings.length === 0 && praise.length >= 2) {
    score = Math.max(score, 85);
  }

  return {
    score,
    praise,
    warnings,
    issues,
    language,
    reviewedAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
};
