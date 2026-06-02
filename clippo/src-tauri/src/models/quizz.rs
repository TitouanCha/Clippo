use serde::{Deserialize, Serialize};
use crate::models::question::Question;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Quizz {
    pub count: i32,
    pub quizzes: Vec<Question>
}