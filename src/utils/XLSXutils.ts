import { FILE_EXTENSIONS, XLSX_FILE_TYPE } from "../variables/general";
import * as XLSX from "xlsx";

export const getFileExtension = (file: File) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return FILE_EXTENSIONS.includes(extension) // return boolean
}

export const convertFileToJson = (headers: string[], data: Array<any>) => {
    const rows: Array<any> = []
    data.forEach((row: Array<any>) => {
        let rowData = {}
        row.forEach((element, index) => {
            rowData[headers[index]] = element
        })
        rows.push(rowData)

    });
    return rows
}

export const maxColsCounter = (selectedItems:object[]) => {
    let cols = [] as Array<any>
    for (let i = 0; i < selectedItems.length -1; i++) {
        Object.keys(selectedItems[i]).map((key, index) => {
            if ( cols[index] === undefined ) cols[index] = [];
            return cols[index].push(selectedItems[i][key].toString().length);
        });
    }
    return cols.map((nested) => {
        return {wch: Math.max(...nested.map((num:number) => num + 10))}
    })
}

export const convertTableStateToXLSX = (state:Array<object> ,headers:Array<string>) => {
    const ws = XLSX.utils.book_new();
    ws["!cols"] = maxColsCounter(state)
    XLSX.utils.sheet_add_aoa(ws, [headers]);
    XLSX.utils.sheet_add_json(ws, state, { origin: 'A2', skipHeader: true });
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    return new Blob([ excelBuffer ], { type: XLSX_FILE_TYPE })
}