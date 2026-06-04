use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SaveData {
    pub character_name: String,
    pub character_skin: String,
    pub character_level: i32,
    pub quizz_difficulty: String,
}

impl Default for SaveData {
    fn default() -> Self {
        Self {
            character_name: "Clippo".to_string(),
            character_skin: "honk.png".to_string(),
            character_level: 1,
            quizz_difficulty: "facile".to_string()
        }
    }
}