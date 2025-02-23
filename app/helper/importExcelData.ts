import { read, utils } from "xlsx-js-style";

interface RowIndex {
  [key: string]: any;
}

export const headerMapping = {
  'N°': 'id',
  'Intersection': 'name',
  'Date de l\'évaluation': 'date',
  'Le régime de priorité est clairement identifiable': 'explicitpriority',
  'L\'intersection est dégagée': 'clear',
  'La covisibilité est bien présente et suffisante': 'covis',
  'Les cyclistes sont protégés des autres usagers de la voirie': 'protected',
  'Il existe une continuité de l\'aménagement cyclable': 'continuity',
  'Présence d\'un ilot de protection pour les cyclistes': 'protection',
  'Carrefour à feux : espace de stockage cycliste sur les girations à gauche': 'storage',
  'Giratoire : Aménagement pour ralentir les automobilistes': 'slowdown',
  'L\'aménagement permet une continuité de la trajectoire, sans pied à terre pour les cyclistes': 'nofoot',
  'La trajectoire de traversée est directe-courte': 'short',
  'Aucun obstacle n\'est présent': 'obstacle',
  'Carrefour à feux : présence d\'un tourne à droite': 'rightturn',
  'Giratoire : les cyclistes sont prioritaires sur les usagers motorisés': 'priority',
  'Les aménagements cyclables sont reconnaissables': 'identifiable',
  'L\'intersection est uniformisée': 'standardize',
  'Le revêtement est de bonne qualité': 'quality',
  'Le revêtement est en bon état': 'good',
  'Les bordures sont abaissées': 'noborders',
  'Pollution visuelle': 'pollution',
  'Revêtement limitant l\'apparition de flaques d\'eau et-ou verglas': 'water',
  'Aménagement limitant la prise au vent': 'wind',
  'L\'exposition aux ilots de chaleur urbains est limitée': 'heat',
  'L\'intersection et son environnement sont suffisamment végétalisés': 'green',
  'L\'aménagement et les trajectoires sont suffisamment larges': 'large',
  'L\'intersection est plaisante': 'nice',
  'L\'intersection confère un sentiment de sécurité': 'security',
  'Commentaire': 'comment',
  'Commentaire Rennes Métropole': 'commentrm',
  'Latitude': 'latitude',
  'Longitude': 'longitude',
};

const importExcelData = (e: any, setTableData: any, setCategories: any) => {
  const file = e.target?.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    if (!e.target) return;
    const data = new Uint8Array(e.target.result as any);
    const workbook = read(data, { type: "array" });

    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    console.log("Header line 4 (so range starts at 3)")
    // get data from xlsx file and filter out the empty row
    let line = 1
    const jsonData = utils
      .sheet_to_json(worksheet, { header: 1, range: 3 })
      .filter((data: any) => {
        if (data.length != 0) {
          if (data !== undefined) {
            console.log("line " + line + ": " + data);
            line++;
            return data;
          }
        }
      });

    // to return the array object dynamically
    const headers = jsonData[0];
    // Save categories (table headers)
    setCategories(headers);

    const formattedData = jsonData.slice(1).map((row: any) => {
      const rowData = {} as RowIndex;
      const mappedHeader = []
      headers.forEach((header: any, index: any) => {
        const mappedHeader = headerMapping[header];
        if (mappedHeader) {
          rowData[mappedHeader] = row[index];
        }
      });

      mappedHeader.forEach((header: any, index: any) => {
        rowData[header] = row[index];
      });
      return rowData;
    });
    console.log("formattedData: " + JSON.stringify(formattedData))
    setTableData(formattedData);
  };

  reader.readAsArrayBuffer(file);
};

export default importExcelData;

