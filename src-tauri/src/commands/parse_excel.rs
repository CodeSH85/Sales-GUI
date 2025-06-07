use calamine::{open_workbook, Reader, XlsxError, Xlsx};
use serde_json::json;

#[tauri::command]
pub fn parse_excel(path: String) -> Result<String, String> {
    let mut excel: Xlsx<_> = open_workbook(&path).map_err(|e: XlsxError | e.to_string())?;
    let sheet_names = excel.sheet_names().to_owned();
    let first_sheet = sheet_names.get(0).ok_or("No sheets found")?;
    let range = excel.worksheet_range(first_sheet)
        .ok_or("Cannot find first sheet")?
        .map_err(|e| e.to_string())?;

    let mut rows = range.rows();
    let headers: Vec<String> = match rows.next() {
        Some(row) => row.iter().map(|cell| cell.to_string()).collect(),
        None => return Err("Sheet is empty".to_string()),
    };

    let data: Vec<serde_json::Value> = rows
        .map(|row| {
            let mut obj = serde_json::Map::new();
            for (header, cell) in headers.iter().zip(row.iter()) {
                obj.insert(header.clone(), json!(cell.to_string()));
            }
            serde_json::Value::Object(obj)
        })
        .collect();

    Ok(serde_json::to_string(&json!({
        "headers": headers,
        "rows": data
    })).unwrap())
}
