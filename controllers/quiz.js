const models = require("../models");

exports.load = (req,res,next,quizId) => {
    const quiz = models.quiz.findById(Number(quizId));
    if(quiz){
        req.quiz=quiz;
        next();
    }else{
        throw new Error('There is no quiz with id = ' + quizId);
    }
};

exports.index = (req, res, next) => {

    const quizzes = models.quiz.findAll();

    res.render('quizzes/index.ejs', {quizzes});
};


exports.show = (req, res, next) => {

    const {quiz} = req;
    res.render('quizzes/show', {quiz});
};


exports.new = (req, res, next) => {

    const quiz = {
        question: "",
        answer: ""
    };

    res.render('quizzes/new', {quiz});
};

exports.create = (req, res, next) => {

    let quiz = {
        question: req.body.question,
        answer: req.body.answer
    };

    // Validates that they are no empty
    if (!quiz.question || !quiz.answer) {
        res.render('quizzes/new', {quiz});
        return;
    }

    quiz = models.quiz.create(quiz);

    res.redirect('/quizzes/' + quiz.id);
};


exports.edit = (req, res, next) => {
    const {quiz} = req;
    res.render('quizzes/edit', {quiz});
};


exports.update = (req, res, next) => {
    let {quiz, body} = req;
    quiz.question = body.question;
    quiz.answer = body.answer;
    models.quiz.update(quiz);
    res.redirect('/quizzes/' + quiz.id)
};

exports.destroy = (req, res, next) => {
    models.quiz.destroy(req.quiz);
    res.redirect('/quizzes');
};


exports.play = (req, res, next) => {
    const {quiz, query} = req;
    const answer = query.answer || '';
    res.render('quizzes/play', {
        quiz,
        answer
    });
};



exports.check = (req, res, next) => {
    const {quiz,query} = req;
    const answer = query.answer || '';
    const result = answer.toLowerCase().trim() === quiz.answer.toLocaleLowerCase().trim();
    res.render('quizzes/result', {
        quiz,
        result,
        answer
    });
};