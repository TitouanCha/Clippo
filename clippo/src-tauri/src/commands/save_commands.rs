use tauri::command;

use crate::save::save_data::SaveData;
use crate::save::save_manager;

#[command]
pub fn load_save() -> SaveData {
    save_manager::load()
}

#[command]
pub fn end_quizz(quizz_result: i64) -> String {
    save_manager::handle_end_quizz(quizz_result)
}