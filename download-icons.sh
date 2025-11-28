#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="./icons"
mkdir -p "$OUT_DIR"

# Download icons
download_icon() {
  local name=$1
  local url=$2
  local outpath="$OUT_DIR/$name"
  echo " - $name from $url"
  
  # Use curl if available, otherwise try wget
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL -H "User-Agent: Mozilla/5.0" "$url" -o "$outpath" || { echo "Failed to download $url"; exit 1; }
  elif command -v wget >/dev/null 2>&1; then
    wget -qO "$outpath" --user-agent="Mozilla/5.0" "$url" || { echo "Failed to download $url"; exit 1; }
  else
    echo "Please install curl or wget to download the icons."
    exit 1
  fi
}

echo "Downloading icons into $OUT_DIR ..."

download_icon "java.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
download_icon "python.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
download_icon "deno.png" "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/deno-6tji8geiz6a1p5p3p7fq62.png/deno-qt98uf7celo0rpoe9qhvp.png?_a=DATAg1AAZAA0"
download_icon "nodejs.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
download_icon "typescript.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
download_icon "php.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"
download_icon "elixir.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/elixir/elixir-original.svg"
download_icon "kotlin.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg"
download_icon "swift.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg"
download_icon "ruby.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg"
download_icon "javascript.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
download_icon "cplusplus.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg"
download_icon "csharp.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"
download_icon "rust.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg"
download_icon "go.svg" "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg"

echo "Done. Icons saved in: $OUT_DIR"
ls -la "$OUT_DIR"