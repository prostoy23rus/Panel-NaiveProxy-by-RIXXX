#!/bin/bash

echo ""
echo "======================================"
echo " Installing Panel"
echo "======================================"
echo ""

if [[ $EUID -ne 0 ]]; then
  echo "Run as root"
  exit 1
fi

PANEL_DIR="/opt/unified-proxy-panel"

apt update
apt install -y curl git nodejs npm

npm install -g pm2

rm -rf $PANEL_DIR

mkdir -p /opt

cp -r panel $PANEL_DIR

cd $PANEL_DIR/panel || exit 1

npm install

mkdir -p data

pm2 delete unified-panel 2>/dev/null

pm2 start server/index.js --name unified-panel

pm2 save

echo ""
echo "Panel installation completed"
echo ""