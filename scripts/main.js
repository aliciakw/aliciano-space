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
  'text!data/gallery.json',
  'text!template/gallery-nav.html',
  'text!template/thumbnail-gallery.html',
  'app/gallery'
],
($, Handlebars, rawData, navTemplate, thumbnailTemplate, gallery) => {
    var data = JSON.parse(rawData);
    var categoryNames = Object.keys(data);
    Handlebars.registerHelper('spacify', (text) => text.replace(/\-/g, ' '));

    function render(currentCategory) {
      gallery.renderNavContent($, Handlebars, navTemplate, categoryNames, currentCategory);
      gallery.renderThumbnailGallery($, Handlebars, thumbnailTemplate, data, currentCategory);

      // a lil crude -_-
      $('li.nav-category').click((event) => {
        var targetId = $(event.target).attr('id');
        var newCategoryName = targetId.replace('gallery-category-', '');
        render(newCategoryName);
      });
    }

    // initial render
    render(categoryNames[0]);

});
