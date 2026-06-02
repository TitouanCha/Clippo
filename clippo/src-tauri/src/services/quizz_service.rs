use reqwest::{Client, RequestBuilder};
use crate::models::{question::Question, quizz::Quizz};

pub  struct QuizzService {
    client: Client,
}

impl QuizzService {
    pub fn new() -> Self{
        Self {
            client: Client::new(),
        }
    }

    pub async fn get_quizz(
        &self,
        limit: Option<String>,
        category: Option<String>,
        difficulty: Option<String>
    ) -> Result<Quizz, String> {
        println!("Fetch new quizz");
        let url = "https://quizzapi.jomoreschi.fr/api/v2/quiz";
        
        let mut request: RequestBuilder = self.client.get(url);

        if let Some(l) = limit {
            request = request.query(&[("limit", &l)]);
        }
        if let Some(c) = category {
            request = request.query(&[("category", &c)]);
        }
        if let Some(d) = difficulty {
            request = request.query(&[("difficulty", &d)]);
        }
        let response = request
            .send()
            .await
            .map_err(|e| e.to_string())?;

        let quizz: Quizz = response
            .json()
            .await
            .map_err(|e| e.to_string())?;
        
        println!("{:?}", quizz);
        Ok(quizz)

    }
}

