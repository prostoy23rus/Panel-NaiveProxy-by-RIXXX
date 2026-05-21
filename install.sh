#!/bin/bash

clear

echo "======================================"
echo "   Unified Proxy Installer"
echo "======================================"
echo ""
echo "1) Full install"
echo "2) Panel only"
echo "3) NaiveProxy only"
echo "4) Hysteria2 only"
echo "5) Telemt only"
echo "6) NaiveProxy + Panel"
echo "7) Hysteria2 + Panel"
echo "8) Telemt + Panel"
echo ""

read -p "Select option: " OPTION

case $OPTION in
  1)
    bash scripts/install_naive.sh
    bash scripts/install_hysteria2.sh
    bash scripts/install_telemt.sh
    bash scripts/install_panel.sh
    ;;
  2)
    bash scripts/install_panel.sh
    ;;
  3)
    bash scripts/install_naive.sh
    ;;
  4)
    bash scripts/install_hysteria2.sh
    ;;
  5)
    bash scripts/install_telemt.sh
    ;;
  6)
    bash scripts/install_naive.sh
    bash scripts/install_panel.sh
    ;;
  7)
    bash scripts/install_hysteria2.sh
    bash scripts/install_panel.sh
    ;;
  8)
    bash scripts/install_telemt.sh
    bash scripts/install_panel.sh
    ;;
  *)
    echo "Invalid option"
    ;;
esac