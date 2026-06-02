use crate::services::quizz_service::QuizzService;
use crate::models::quizz::Quizz;
use tauri::command;

#[command]
pub async fn get_quizz(
    limit: Option<String>,
    category: Option<String>,
    difficulty: Option<String>
) -> Result<Quizz, String> {

    println!("Cmd get_quizz lance");

    let service: QuizzService = QuizzService::new();
    service.get_quizz(limit, category, difficulty).await
}