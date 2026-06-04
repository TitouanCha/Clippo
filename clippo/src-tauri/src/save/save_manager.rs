use std::fs;
use crate::save::save_data::SaveData;

pub fn load() -> SaveData{
    match fs::read_to_string("save.json"){
        Ok(content) => {
            serde_json::from_str(&content).unwrap_or_default()
        }
        Err(_) => SaveData::default(),
    }
}

pub fn save(data: &SaveData) -> Result<(), String> {
    let json = serde_json::to_string_pretty(data)
        .map_err(|e| e.to_string())?;

    fs::write("save.json", json)
        .map_err(|e| e.to_string())?;

    Ok(())
}

pub fn handle_end_quizz(quizz_result: i64) -> String {
    let mut clippo_data: SaveData = load();
    let clippo_level = clippo_data.character_level;
    let quizz_difficulty = clippo_data.quizz_difficulty;

    let mut end_quiz_msg: String = "Quizz Fini".to_string();

    let mut new_clippo_level = clippo_level;
    match quizz_result {
        8.. => {
            new_clippo_level += 1;
            end_quiz_msg.push_str(" - Level Up");
        }
        0..=4 => {
            new_clippo_level -= 1;
            end_quiz_msg.push_str(" - Level Down");
        }
        _ => {}
    }

    let new_quizz_difficulty = match new_clippo_level {
        10.. => "difficile",
        4..  => "normal",
        _    => "facile",
    };

    if new_quizz_difficulty != quizz_difficulty {
        end_quiz_msg.push_str(" - new difficulty");
    }

    clippo_data.character_level = new_clippo_level;
    clippo_data.quizz_difficulty = new_quizz_difficulty.to_string();

    let _ = save(&clippo_data);

    return  end_quiz_msg;
}