export function getFullYear() {
    return new Date().getFullYear();
}
export function getFooterCopy() {
    return `© ${getFullYear()} Holberton School main dashboard`;
}