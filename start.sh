#!/bin/bash
# Script untuk menjalankan dev server dengan PATH yang benar
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
echo "🚀 Menjalankan Next.js dev server..."
echo "📍 Buka browser di: http://localhost:3000"
cd "$(dirname "$0")"
node node_modules/.bin/next dev --webpack "$@"
