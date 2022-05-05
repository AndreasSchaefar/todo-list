const Icon = require('./assets/icon.svg');

export function FavIcon() {
    const link = document.createElement('link');
    // <link rel="shortcut icon" href="/src/assets/icon.svg" type="image/svg">
    link.rel = 'shortcut icon';
    link.type = 'image/svg';
    link.href = Icon;
    return link;
}