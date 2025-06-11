use std::fs;
use std::path::PathBuf;
use crate::commands::get_base_path;
use tauri::AppHandle;

#[tauri::command]
pub fn read_file(app: AppHandle, id: String) -> Result<String, String> {
    // assuming id is in the format "folder-id". e.g., "PO-000001"
    let parts: Vec<&str> = id.split('-').collect();

    // try using ` let parts = id.splitn(2, '-') ` next time.
    // more efficient, and less memory allocation than use Vec and .split('-').collect().

    // if parts.is_empty()
    if parts.len() < 2 {
        return Err("Invalid ID format".to_string());
    }
    let folder = parts[0]; // get "PO"

    // let path = PathBuf::from(format!("data/{}/{}.json", folder, id));
    let path = get_base_path(&app, &folder).join(format!("{}.json", &id));
    if !path.exists() {
        println!("Can't find the file: {}", path.display());
        return Err(format!("Can't find the file: {}", path.display()));
    }
    match fs::read_to_string(&path) {
        Ok(content) => {
            println!("file content: {}", content);
            Ok(content)
        }
        Err(err) => {
            println!("failed to read: {}", err);
            Err(format!("failed to read: {}", err))
        }
    }
}
