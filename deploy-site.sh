#!/bin/bash

# Trouve le dossier du repo automatiquement (dossier où est le script)
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$1" ]; then
    echo "Usage : ./deploy.sh \"ton message\""
    echo "Exemple : deploy-site \"Ajout page contact\""
    exit 1
fi

cd "$SITE_DIR" || exit 1

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "Rien à pousser, tout est à jour."
    exit 0
fi

git add .
git commit -m "$1"
git push

echo "✅ Site mis en ligne !"