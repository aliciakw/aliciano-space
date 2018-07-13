requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        data: '../data',
        template: '../template'
    }
});

requirejs(['jquery', 'handlebars', 'text!template/thumbnail.html'],
function   ($, Handlebars, thumbnailTemplate) {
    console.log('we have what\'s required');
    //$('img').hide();

    // views
    var s3_bucket = 'https://s3.amazonaws.com/alicia-no-portfolio/';
    var thumbnail_dirname = 'thumbnails/';
    var filename = 'thumb-grandparents.png';
    var context = {
      img_uri: s3_bucket + thumbnail_dirname + filename
    };
    var template = Handlebars.compile(thumbnailTemplate);
    $('#sandbox').html(template(context));

});
