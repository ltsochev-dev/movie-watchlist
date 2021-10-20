export function getYearFromSeconds(seconds) {
    return new Date(seconds * 1000).getFullYear();
}
