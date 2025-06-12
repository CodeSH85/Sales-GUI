use std::fs;
use crate::commands::get_base_path;
use tauri::AppHandle;
use serde_json::Value;

#[tauri::command]
pub fn read_dir(app: AppHandle, division: String) -> Result<Vec<Value>, String> {
    let dir = get_base_path(&app, &division);
    
    // Read all the files under dir, return e.g. "./PO/PO-001.json"
    let entries = fs::read_dir(&dir)
        .map_err(|e| format!("Failed to read the dir: {}", e))?;

    // Process each file
    let mut data = Vec::new();
    for entry in entries {
        let entry = entry.map_err(|e| format!("Failed to read entry: {}", e))?;
        let path = entry.path(); // a PathBuf of explicitly file path
        
        // Skip if not a file
        if !path.is_file() {
            continue;
        }
        // skip if it's not a JSON file
        if path.extension().and_then(|s| s.to_str()) != Some("json") {
            continue;
        }

        println!("Reading file: {:?}", path);
        
        // Read and parse file content
        let content = fs::read_to_string(&path)
            .map_err(|e| format!("Failed to read file {}: {}", path.display(), e))?;
            
        let json: Value = serde_json::from_str(&content)
            .map_err(|e| format!("Failed to parse JSON from {}: {}", path.display(), e))?;
            
        data.push(json);
    }

    Ok(data)
}