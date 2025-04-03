import fs from 'fs';
import path from 'path';

export async function updateEnvVars(newVars: Record<string, string>) {
  const envPath = path.resolve(process.cwd(), '.env.local');

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }

  for (const [key, value] of Object.entries(newVars)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    const line = `${key}=${value}`;

    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, line);
    } else {
      envContent += `\n${line}`;
    }
  }

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local updated!');
}