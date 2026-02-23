#!/bin/bash

ACTION=$1
VERSION=$2
IMAGE_NAME="ipp-nginx-80"

if [ "$ACTION" == "start" ]; then
  if [ -z "$VERSION" ]; then
    echo "❌ Please provide version"
    echo "Usage: ./deploy.sh start v1"
    exit 1
  fi

  echo "🚀 Building image ${IMAGE_NAME}:${VERSION}"
  docker build --no-cache -t ${IMAGE_NAME}:${VERSION} .

  echo "🛑 Stopping old container..."
  docker compose down

  echo "▶ Starting new container..."
  IMAGE_TAG=${VERSION} docker compose up -d

  echo "✅ Application started with version ${VERSION}"

elif [ "$ACTION" == "stop" ]; then
  echo "🛑 Stopping containers..."
  docker compose down
  echo "✅ Stopped"

elif [ "$ACTION" == "restart" ]; then
  if [ -z "$VERSION" ]; then
    echo "❌ Please provide version"
    echo "Usage: ./deploy.sh restart v2"
    exit 1
  fi

  docker compose down
  docker build --no-cache -t ${IMAGE_NAME}:${VERSION} .
  IMAGE_TAG=${VERSION} docker compose up -d

  echo "🔄 Restarted with version ${VERSION}"

else
  echo "Usage:"
  echo "  ./deploy.sh start v1"
  echo "  ./deploy.sh stop"
  echo "  ./deploy.sh restart v2"
fi
