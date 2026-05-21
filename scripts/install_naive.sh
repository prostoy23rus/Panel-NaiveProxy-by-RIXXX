if [[ -f configs/providers.json ]]; then
  sed -i 's/"naive": false/"naive": true/' \
    configs/providers.json
fi