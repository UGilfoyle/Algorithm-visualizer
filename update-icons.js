const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace span elements with img tags for language icons
const langMap = {
    'python': 'icons/python-original.png',
    'java': 'icons/java-original.png',
    'node': 'icons/nodejs-original.png',
    'deno': 'icons/deno-logo.png',
    'cpp': 'icons/cplusplus-original.png',
    'c': 'icons/cplusplus-original.png',
    'go': 'icons/go-original.png',
    'rust': 'icons/rust-original.png',
    'typescript': 'icons/typescript-original.png',
    'ruby': 'icons/ruby-original.png',
    'swift': 'icons/swift-original.png',
    'kotlin': 'icons/kotlin-original.png',
    'csharp': 'icons/csharp-original.png',
    'javascript': 'icons/javascript-original.png',
    'php': 'icons/php-original.png',
    'elixir': 'icons/elixir-original.png'
};

// Replace all <span class="lang-logo" data-lang="X"></span> with <img> tags
Object.keys(langMap).forEach(lang => {
    const pattern = new RegExp(`<span class="lang-logo"[^>]*data-lang="${lang}"[^>]*></span>`, 'gi');
    const replacement = `<img src="${langMap[lang]}" alt="${lang}" class="lang-icon-img" />`;
    html = html.replace(pattern, replacement);
});

fs.writeFileSync('index.html', html);
console.log('Updated HTML with img tags for language icons');

