requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        data: '../data',
        template: '../template'
    }
});

requirejs(['jquery', 'handlebars', 'text!template/sandbox.html'],
function   ($, Handlebars, sandboxTemplate) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    console.log('we have what\'s required');
    //$('img').hide();


    // views
    var context = { title: 'Black Star', body: '.......'};
    var template = Handlebars.compile(sandboxTemplate);
    $('#sandbox').html(template(context));

});
