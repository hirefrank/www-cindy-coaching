#!/usr/bin/env node

/**
 * Webhook handler for Sanity content updates
 * This can be called by your webhook service to trigger a rebuild
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function deploy() {
  console.log('🔔 Webhook received - Starting deployment...');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  
  try {
    // Run the deployment
    console.log('🏗️  Building and deploying...');
    const { stdout, stderr } = await execAsync('npm run deploy:prod');
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    
    console.log('✅ Deployment completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  deploy();
}