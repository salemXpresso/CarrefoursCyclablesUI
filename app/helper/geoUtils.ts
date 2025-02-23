export default function toOsmUrl(latitude, longitude) {
    const zoomLevel = 15; // Adjust as needed
    const osmLink = `https://www.openstreetmap.org/#map=`;
    return `${osmLink}${zoomLevel}/mlat=${latitude}/${-longitude}`
}