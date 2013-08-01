module.exports = function routes() {
    this.root('pages#main');
    this.match('projects/:name', 'projects#get_project');
    this.match('torque', 'torque#main');
    this.match('blog', 'blog#main');
    this.match('blog/:year', 'blog#archive');
    this.match('blog/:year/:month', 'blog#archive');
    this.match('blog/:year/:month/:day', 'blog#archive');
    this.match('blog/:year/:month/:day/:slug', 'blog#viewArticle');
    this.match('blog/:slug', 'blog#viewArticle');
};
