#!/bin/bash

# Deployment script for Cloudflare Workers with Sanity
echo "🚀 Starting deployment process..."

# Check if PUBLIC_SANITY_PROJECT_ID is set
if [ -z "$PUBLIC_SANITY_PROJECT_ID" ]; then
  echo "⚠️  PUBLIC_SANITY_PROJECT_ID not set, using default from .env"
  export PUBLIC_SANITY_PROJECT_ID="y67p94j5"
fi

echo "📦 Building with Sanity project: $PUBLIC_SANITY_PROJECT_ID"

# Build the project
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  
  # Deploy to Cloudflare
  echo "☁️  Deploying to Cloudflare Workers..."
  wrangler deploy
  
  if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
  else
    echo "❌ Deployment failed"
    exit 1
  fi
else
  echo "❌ Build failed"
  exit 1
fi