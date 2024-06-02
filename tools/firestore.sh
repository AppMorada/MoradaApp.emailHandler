#!/bin/sh

CYAN='\033[0;36m'
RESET_COLOR='\033[0m'

INFO_FLAG="[${CYAN}INFO${RESET_COLOR}]"
FIRESTORE_GCP_PROJECT="link-manager-f612c"

echo -e "${INFO_FLAG} Starting firestore using firebase emulator, be sure you are logged into your account"

pnpm firebase emulators:start --only firestore --project "${FIRESTORE_GCP_PROJECT}"
