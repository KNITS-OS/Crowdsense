import { FILE_EXTENSIONS } from "../variables/general";

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