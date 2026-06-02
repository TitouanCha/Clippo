use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Question {
    pub id: String,
    pub question: String,
    pub answer: String,
    pub category_id: String,
    pub category: String,
    pub difficulty: String,
    pub bad_answers: Vec<String>,
}