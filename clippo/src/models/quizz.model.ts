export interface Quizz {
    count: number,
    quizzes: Array<Question>
}

export interface Question {
    id: string,
    question: string,
    answer: string,
    categoryId: string,   
    category: string,
    difficulty: string,
    badAnswers: Array<string>
}