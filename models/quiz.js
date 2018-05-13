const quizzes = [
    {   id: 1,
        question: "Capital of Italy",
        answer: "Rome"
    },
    {   id: 2,
        question: "Capital of France",
        answer: "Paris"
    },
    {   id: 3,
        question: "Capital of Spain",
        answer: "Madrid"
    },
    {   id: 4,
        question: "Capital of Portugal",
        answer: "Lisbon"
    }];

let nextId = quizzes.length + 1;


// Crear un nuevo quiz
exports.create = quiz => {

    const newQuiz = {
        id: nextId++,
        question: (quiz.question || "").trim(),
        answer: (quiz.answer || "").trim()
    };

    quizzes.push(newQuiz);

    return newQuiz;
};

//Actualizar un quiz
exports.update = (quiz) => {

    const index = quizzes.findIndex(q => quiz.id === q.id);

    if (index >= 0) {
        quizzes[index] = {
            id: quiz.id,
            question: (quiz.question || "").trim(),
            answer: (quiz.answer || "").trim()
        };
    }
};

//Devolver Todos
exports.findAll = () => quizzes;

//Devolver uno
exports.findById = (id) => {

    return quizzes.find(quiz => quiz.id === id);
};

//Borrar

exports.destroy = (quiz) => {

    const index = quizzes.findIndex(q => quiz.id === q.id);

    if (index >= 0) {
        quizzes.splice(index,1);
    }
};