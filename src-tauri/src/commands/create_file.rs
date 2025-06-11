use std::{fs, path::PathBuf};
use crate::commands::get_base_path;
use tauri::AppHandle;

#[tauri::command]
pub fn create_file(app: AppHandle, division: String, data: serde_json::Value) -> Result<String, String> {
    let id = format!("{}-{}", division, generate_timestamp());

    // let folder_path = PathBuf::from("../data").join(&division);
    let folder_path = get_base_path(&app, &division);
    println!("Write to: {:?}", folder_path);

    if !folder_path.exists() {
        fs::create_dir_all(&folder_path)
            .map_err(|e| format!("Failed to create directory: {}", e))?;
    }

    let file_path = folder_path.join(format!("{}.json", &id));

    let mut data_with_id = data.clone();
    if let Some(obj) = data_with_id.as_object_mut() {
        obj.insert("id".to_string(), serde_json::Value::String(id.clone()));
    }

    let json_str = serde_json::to_string_pretty(&data_with_id)
        .map_err(|e| format!("Failed to serialize JSON: {}", e))?;

    fs::write(&file_path, json_str)
        .map_err(|e| format!("Failed to write file: {}", e))?; // as match

    Ok(id)
}


fn generate_timestamp() -> String {
    // 1. timestamp_millis() return i64 but it might be minus, 2.radix should receive u64
    let timestamp = chrono::Utc::now().timestamp_millis() as u64;
    to_base36(timestamp)
}

use radix_fmt::radix;
fn to_base36(num: u64) -> String {
  radix(num, 36).to_string()
}