#!/bin/bash

echo ""
echo "======================================"
echo " Installing Hysteria2"
echo "======================================"
echo ""

if [[ $EUID -ne 0 ]]; then
  echo "Run as root"
  exit 1
fi

apt update
apt install -y curl wget openssl

bash <(curl -fsSL https://get.hy2.sh/)

mkdir -p /etc/hysteria

if [[ ! -f /etc/hysteria/server.key ]]; then
  openssl req -x509 -nodes -newkey rsa:2048 \
    -keyout /etc/hysteria/server.key \
    -out /etc/hysteria/server.crt \
    -days 3650 \
    -subj "/CN=bing.com"
fi

cat > /etc/hysteria/config.yaml << EOF
listen: :443

tls:
  cert: /etc/hysteria/server.crt
  key: /etc/hysteria/server.key

auth:
  type: password
  password: changeme123

masquerade:
  type: proxy
  proxy:
    url: https://bing.com
    rewriteHost: true
EOF

systemctl enable hysteria-server
systemctl restart hysteria-server

echo ""
echo "Hysteria2 installation completed"
echo ""