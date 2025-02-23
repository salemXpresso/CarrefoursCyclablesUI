import generateExcelData from "./ExcelDataGenerator";

function downloadExcelFile(data: any, ) {
    const excelData = generateExcelData(data);
    const blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "carrefours.xlsx");
    document.body.appendChild(link);
    link.click();
}

export default downloadExcelFile;