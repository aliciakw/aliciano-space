requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        data: '../data',
        text : '../lib/text', //text is required
        json : '../lib/json' //alias to plugin
    }
});

requirejs(['jquery', 'handlebars', 'data/gallery'],
function   ($, handlebars, data) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    console.log('we have what\'s required');
    $('img').hide();
    console.log(data);
});
