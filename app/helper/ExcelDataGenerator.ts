import { utils, write } from "xlsx-js-style";
import {headerMapping} from "@/app/helper/importExcelData";
import {excelDateToJSDate, jsDateToEpoch} from "@/app/helper/dateUtils";

function generateExcelData(data: any) {
    let export_data = JSON.parse(JSON.stringify(data))

    export_data.forEach((line: any) => {
        line['date'] = excelDateToJSDate(line['date']);
    });
    const transformedData = export_data.map((row, rowIndex) => {
        const backgroundColor = rowIndex % 2 === 0 ? { fill: { fgColor: { rgb: "F2F2F2" } } } : { fill: { fgColor: { rgb: "FFFFFF" } } };

        return Object.fromEntries(
            Object.entries(headerMapping).map(([newKey, oldKey]) => {
                let value = row[oldKey];
                const isNumber = typeof value === 'number' || (!isNaN(value) && value !== "");
                const numericValue = isNumber ? Number(value) : value;
                const isInteger = isNumber && Number.isInteger(numericValue);
                let numFmt = isNumber ? "0" : undefined;
                let cellType = isNumber ? "n" : "s";
                if (value instanceof Date) {
                    value = jsDateToEpoch(value);
                    numFmt = "dd/mm/yyyy"; // Format as date
                } else if (isNumber && !isInteger) {
                    const decimalPart = numericValue.toString().split(".")[1] || "";
                    numFmt = decimalPart.length > 1 ? "0.00000" : "0.0";
                }
                return [
                    newKey,
                    {
                        t: cellType,
                        v: isNumber ? Number(value) : (value ? value : " "),
                        s: { backgroundColor, numFmt: numFmt }
                    }
                ];
            })
        );
    });


    const worksheet = utils.json_to_sheet([]); // Start with an empty sheet
    // Merge cells for first row
    worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 2 } },  // A1 to C1 (line 1 to line 2)
        { s: { r: 0, c: 3 }, e: { r: 0, c: 10 } },  // D1 to K1
        { s: { r: 0, c: 11 }, e: { r: 0, c: 15 } }, // L1 to P1
        { s: { r: 0, c: 16 }, e: { r: 0, c: 17 } },// Q1 to R1
        { s: { r: 0, c: 18 }, e: { r: 0, c: 25 } },// S1 to Y1
        { s: { r: 0, c: 26 }, e: { r: 0, c: 28 } } // Z1 to AC1
    ];
    // Insert text into the merged cells
    const headers = [];
    headers[0] = "Carrefours Cyclables";
    headers[3] = "Sécurité";
    headers[11] = "Caractère direct";
    headers[16] = "Cohérence";
    headers[18] = "Confort";
    headers[26] = "Attractivité";
    utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    const styles = {
        "A1": { font: { bold: true, sz: 14, name: "Futura" }, alignment: { horizontal: "center", vertical: "center" }, fill: { fgColor: { rgb: "bdbcbb" } } },
        "D1": { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" }, fill: { fgColor: { rgb: "ed7d31" } } },
        "L1": { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" }, fill: { fgColor: { rgb: "a9d08e" } } },
        "Q1": { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" }, fill: { fgColor: { rgb: "e32b2b" } } },
        "S1": { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" }, fill: { fgColor: { rgb:  "4472c4"} } },
        "AA1": { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" }, fill: { fgColor: { rgb: "ffd966" } } },
    };
    Object.keys(styles).forEach(cell => {
        if (worksheet[cell]) {
            worksheet[cell].s = styles[cell];
        }
    });

    const pointsRow = [
        "5 points", "5 points", "10 points", "10 points", "10 points", "5 points", "5 points", "5 points",
        "10 points", "2.5 points", "2.5 points", "5 points", "5 points",
        "5 points", "5 points",
        "1 point", "1 point", "3 points", "1 point", "1 point", "1 point", "1 point", "1 point",
        "8 points", "1 point", "1 point"
    ];
    utils.sheet_add_aoa(worksheet, [pointsRow], { origin: "D3" });

    // Add header row after the empty lines
    const headerRow = Object.keys(headerMapping);
    utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A4" }); // Header starts at row 4

    // Add transformed data after the header
    utils.sheet_add_json(worksheet, transformedData, { origin: "A5", skipHeader: true });

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    return write(workbook, { bookType: "xlsx", type: "array" });
}

export default generateExcelData;