use std::path::PathBuf;
use tauri::{AppHandle, Manager};

#[allow(unused_variables)]
pub fn get_base_path(app: &AppHandle, folder: &str) -> PathBuf {
    #[cfg(debug_assertions)] // for dev, e.g. ../data/PO
    {
        return PathBuf::from("../data").join(folder);
    }

    #[cfg(not(debug_assertions))] // for bundled App 
    {
        let mut path = app.path().app_data_dir()
            .unwrap_or_else(|| PathBuf::from("."));
        path.push(folder);
        return path;
    }
}
