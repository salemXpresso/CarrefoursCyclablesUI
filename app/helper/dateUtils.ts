
export function excelDateToJSDate(excelDate) {
    const excelEpoch = new Date(1899, 11, 30); // Excel starts from 30th Dec 1899
    return new Date(excelEpoch.getTime() + excelDate * 24 * 60 * 60 * 1000);
}

export function excelDateToDateString(excelDate) {
    const jsDate = excelDateToJSDate(excelDate)

    const day = String(jsDate.getDate()).padStart(2, '0');
    const month = String(jsDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = jsDate.getFullYear();

    return `${day}/${month}/${year}`;
}

export function jsDateToEpoch(jsDate) {
    const XLSX_EPOCH = 25569; // Excel epoch (1900-01-01)
    const MS_PER_DAY = 86400000; // Milliseconds per day
    return (jsDate.getTime() / MS_PER_DAY) + XLSX_EPOCH;
}