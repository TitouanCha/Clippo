pub mod commands;
pub mod services;
pub mod models;
pub mod save;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::quizz_commands::get_quizz,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
