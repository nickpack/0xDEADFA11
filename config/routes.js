module.exports = function routes() {
    this.root('pages#main');
    this.match('projects', 'projects#main');
    this.match('projects/:name', 'projects#get_project');
    this.match('signup.html', 'auth#signup', { via: ['get', 'post'] });
};
