requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        data: '../data',
        //template: '../template',
        text : '../lib/text'
    }
});

requirejs(['jquery', 'handlebars'],
function   ($, Handlebars, data) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    console.log('we have what\'s required');
    // console.log(text)
    //$('img').hide();


    // views
    // var context = { title: 'Black Star', body: '.......'};
    // var source   = document.getElementById("entry-template").innerHTML;
    // var template = Handlebars.compile(source);
    // $('#sandbox').html(template(context));

});
