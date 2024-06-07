export function getFullYear() {
    return new Date().getFullYear();
}
export function getFooterCopy() {
    return `© ${getFullYear()} Holberton School main dashboard`;
}

export function getLatestNotification() {
    return '<strong>Urgent requirement</strong> - complete by EOD';
}