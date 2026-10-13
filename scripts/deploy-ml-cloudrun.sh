#!/usr/bin/env bash
# Deploy ML service to Google Cloud Run. Requires gcloud authenticated and project set.
# Usage: ./scripts/deploy-ml-cloudrun.sh <project-id> <service-name> [region] [image-tag]
set -euo pipefail
PROJECT=${1:-}
SERVICE=${2:-dhru-ml}
REGION=${3:-us-central1}
TAG=${4:-latest}
if [ -z "$PROJECT" ]; then
  echo "Usage: $0 <gcp-project-id> <service-name> [region] [image-tag]"
  exit 1
fi
IMAGE="gcr.io/$PROJECT/dhru-ml:$TAG"

# Build and push image
docker build -t $IMAGE -f ml/Dockerfile .
docker push $IMAGE

# Deploy to Cloud Run
gcloud run deploy $SERVICE --image $IMAGE --platform managed --region $REGION --allow-unauthenticated --project $PROJECT --memory 512Mi

echo "Deployed $IMAGE to Cloud Run service $SERVICE"
