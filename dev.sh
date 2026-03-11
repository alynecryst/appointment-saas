#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento..."

echo "📦 Subindo banco no Docker..."
docker compose up -d

echo "⏳ Aguardando banco iniciar..."
sleep 3

echo "🔥 Iniciando backend..."
cd backend
npm run start:dev