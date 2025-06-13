use std::fs;
use crate::commands::get_base_path;
use tauri::AppHandle;

#[tauri::command]
pub fn delete_file(app: AppHandle, division: String, id: String) -> Result<(), String> {
    let mut path = get_base_path(&app, &division);
    println!("Delete from: {:?}", path);

    path.push(format!("{}.json", id));

    if path.exists() {
        fs::remove_file(&path).map_err(|e| e.to_string())?;
    } else {
        return Err("File not found".to_string());
    }

    Ok(())
}