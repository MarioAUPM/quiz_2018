const Sequelize = require("sequelize");
const {models} = require("../models");

exports.load = (req,res,next,quizId) => {
    models.quiz.findById(quizId)
        .then(quiz => {
            if(quiz) {
                req.quiz = quiz;
                next();
            }else{
                throw new Error('There is no quiz with id = ' + quizId);
            }
        })
        .catch(error => next(error));
};

exports.index = (req, res, next) => {
    models.quiz.findAll()
        .then(quizzes => {
            res.render('quizzes/index.ejs', {quizzes});
        })
        .catch(error => next(error));
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
    const {question, answer} = req.body;

    const quiz = models.quiz.build({
        question,
        answer
    });

    // Saves only the fields question and answer into the DDBB
    quiz.save({fields: ["question", "answer"]})
        .then(quiz => {
            req.flash('success', 'Quiz created successfully.');
            res.redirect('/quizzes/' + quiz.id);
        })
        .catch(Sequelize.ValidationError, error => {
            req.flash('error', 'There are errors in the form:');
            error.errors.forEach(({message}) => req.flash('error', message));
            res.render('quizzes/new', {quiz});
        })
        .catch(error => {
            req.flash('error', 'Error creating a new Quiz: ' + error.message);
            next(error);
        });
};


exports.edit = (req, res, next) => {
    const {quiz} = req;
    res.render('quizzes/edit', {quiz});
};


exports.update = (req, res, next) => {
    const {quiz, body} = req;

    quiz.question = body.question;
    quiz.answer = body.answer;

    quiz.save({fields: ["question", "answer"]})
        .then(quiz => {
            req.flash('success', 'Quiz edited successfully.');
            res.redirect('/quizzes/' + quiz.id);
        })
        .catch(Sequelize.ValidationError, error => {
            req.flash('error', 'There are errors in the form:');
            error.errors.forEach(({message}) => req.flash('error', message));
            res.render('quizzes/edit', {quiz});
        })
        .catch(error => {
            req.flash('error', 'Error editing the Quiz: ' + error.message);
            next(error);
        });
};

exports.destroy = (req, res, next) => {
    req.quiz.destroy()
        .then(() => {
            req.flash('success', 'Quiz deleted succesfully.');
            res.redirect('/quizzes');
        })
        .catch(error => {
            req.flash('error', 'Error deleting the Quiz: ' + error.message);
            next(error);
        });
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