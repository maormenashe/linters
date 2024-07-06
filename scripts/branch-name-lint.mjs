import { execSync } from 'child_process';

// Constants
const SEPARATOR = '/';
const ISSUE_PREFIX_REGEX = /^[A-Z]+-\d+/;
const ACCEPTABLE_BRANCH_PREFIXES = [
  'feature',
  'bugfix',
  'fix',
  'hotfix',
  'release',
];
const EXEMPT_BRANCHES = ['master', 'main', 'dev', 'develop'];
const VALID_BRANCH_NAME_PATTERN = /^[a-zA-Z0-9._-]+$/;

function getBranchName() {
  return execSync('git symbolic-ref --short HEAD').toString().trim();
}

function isExemptBranch(branchName) {
  return EXEMPT_BRANCHES.includes(branchName);
}

function isValidBranchName(branchName) {
  const parts = branchName.split(SEPARATOR);
  if (parts.length < 2) return false;

  const prefix = parts[0];
  const name = parts.slice(1).join(SEPARATOR);

  return (
    (ACCEPTABLE_BRANCH_PREFIXES.includes(prefix) &&
      VALID_BRANCH_NAME_PATTERN.test(name)) ||
    (ISSUE_PREFIX_REGEX.test(prefix) && VALID_BRANCH_NAME_PATTERN.test(name))
  );
}

function printInvalidBranchMessage(branchName) {
  console.error(`Invalid branch name: ${branchName}`);
  console.error(`Branch name must match one of the following patterns:`);
  console.error(`- ${EXEMPT_BRANCHES.join(', ')}`);
  console.error(
    `- ${ACCEPTABLE_BRANCH_PREFIXES.map((prefix) => `${prefix}/${ISSUE_PREFIX_REGEX.source}`).join(', ')}`,
  );
  console.error(`Examples:`);
  console.error(`- feature/DLD-123-my-feature`);
  console.error(`- hotfix/DLD-456-hotfix`);
  console.error(`- DLD-123/this-issue`);
}

try {
  const branchName = getBranchName();

  if (isExemptBranch(branchName)) {
    // Branch name is in the exempt list, it's valid
    process.exit(0);
  }

  if (isValidBranchName(branchName)) {
    // Branch name is valid according to the specified patterns
    process.exit(0);
  } else {
    printInvalidBranchMessage(branchName);
    process.exit(1);
  }
} catch (err) {
  console.error('Failed to get branch name');
  process.exit(1);
}
