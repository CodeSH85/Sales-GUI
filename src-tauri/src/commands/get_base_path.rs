use std::path::PathBuf;
use tauri::AppHandle;

pub fn get_base_path(app: &AppHandle, folder: &str) -> PathBuf {
    #[cfg(debug_assertions)] // for dev, e.g. ../data/PO
    {
        PathBuf::from("../data").join(folder)
    }

    #[cfg(not(debug_assertions))] // for bundled App 
    {
        let mut path = tauri::api::path::app_data_dir(&app.config())
            .unwrap_or_else(|| PathBuf::from("."));
        path.push(folder);
        path
    }
}
