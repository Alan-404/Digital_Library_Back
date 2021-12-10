const userRouter = require('./UserRouter');
const accountRouter = require('./AccountRouter');
const categoryRouter = require('./CategoryRouter');
const authorRouter = require('./AuthorRouter');
const bookRouter = require('./BookRouter');
const adRouter = require('./AdRouter');
const newsRouter = require('./NewsRouter');
const blogRouter = require('./BlogRouter');
const commentRouter = require('./CommentRouter');

const route = (app) => {
    app.use('/user', userRouter);
    app.use('/account', accountRouter);
    app.use('/category', categoryRouter);
    app.use('/author', authorRouter);
    app.use('/book', bookRouter);
    app.use('/ad', adRouter);
    app.use('/news',newsRouter);
    app.use('/blog', blogRouter);
    app.use('/comment', commentRouter);
}


module.exports = route;