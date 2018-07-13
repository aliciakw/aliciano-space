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
  'text!template/thumbnail.html',
  'text!data/gallery.json'
],
($, Handlebars, thumbnailTemplate, rawData) => {
    var data = JSON.parse(rawData);
    var interesting = data.interesting;
    var thumbs = interesting.map((entry) => entry.thumb);

    // views
    var s3_bucket = 'https://s3.amazonaws.com/alicia-no-portfolio/';
    var thumbnail_dirname = 'thumbnails/';

    function renderThumbnail(filename) {
      var context = {
        img_uri: s3_bucket + thumbnail_dirname + filename
      };
      var template = Handlebars.compile(thumbnailTemplate);
      $('#thumbnail-gallery-content').append(template(context));
    }

    thumbs.forEach((thumb) => renderThumbnail(thumb));
});
