requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        data: '../data',
        template: '../template'
    }
});

requirejs([
  'jquery',
  'handlebars',
  'text!template/thumbnail-gallery.html',
  'text!data/gallery.json'
],
($, Handlebars, thumbnailTemplate, rawData) => {
    var data = JSON.parse(rawData);

    // views
    var template = Handlebars.compile(thumbnailTemplate);
    $('#thumbnail-gallery-content').html(template({ paintings: data.interesting }));
});
