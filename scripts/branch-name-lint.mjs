import { execSync } from 'child_process';

try {
  const branchName = execSync('git symbolic-ref --short HEAD')
    .toString()
    .trim();

  const regex = /^(main|feature|bugfix|hotfix|release)\/[a-z0-9._-]+$/;

  if (!regex.test(branchName)) {
    console.error(`Invalid branch name: ${branchName}`);
    console.error(`Branch name must match the pattern: ${regex}`);
    process.exit(1);
  }
} catch (err) {
  console.error('Failed to get branch name');
  process.exit(1);
}
