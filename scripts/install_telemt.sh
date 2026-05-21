#!/bin/bash

echo ""
echo "======================================"
echo " Installing Telemt"
echo "======================================"
echo ""

if [[ $EUID -ne 0 ]]; then
  echo "Run as root"
  exit 1
fi

apt update
apt install -y curl git docker.io docker-compose

if [[ ! -d /opt/telemt ]]; then
  git clone https://github.com/telemt/telemt.git /opt/telemt
fi

cd /opt/telemt || exit 1

chmod +x install.sh

bash install.sh

echo ""
echo "Telemt installation completed"
echo ""