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
  'app/gallery',
  'app/lightbox',
  'text!template/lightbox.html'
],
($, Handlebars, rawData, navTemplate, thumbnailTemplate, gallery, lightbox, lightboxTemplate) => {
    var data = JSON.parse(rawData);
    var categoryNames = Object.keys(data);
    Handlebars.registerHelper('spacify', (text) => text.replace(/\-/g, ' '));

    function render(currentCategory, selectedImage) {
      gallery.renderNavContent($, Handlebars, navTemplate, categoryNames, currentCategory);
      gallery.renderThumbnailGallery($, Handlebars, thumbnailTemplate, data, currentCategory);
      lightbox.render($, Handlebars, lightboxTemplate, selectedImage);
      if (selectedImage) {
        $('.blanket').show();
      } else {
        $('.blanket').hide();
      }

      // a lil crude -_-
      $('li.nav-category').click((event) => {
        var targetId = $(event.target).attr('id');
        var newCategoryName = targetId.replace('gallery-category-', '');
        render(newCategoryName);
      });
      $('.thumbnail').click((event) => {
        var targetId = $(event.target).attr('id');
        var imgSlug = targetId.replace('gallery-img-', '');
        selectedImage = data[currentCategory].find((image) => image.slug === imgSlug);
        render(currentCategory, selectedImage);
      });
      $('.close-trigger').click((event) => {
        event.preventDefault();
        console.log('#@$#%$%~');
        render(currentCategory, null);
      });
    }

    // initial render
    render(categoryNames[0], null);
});
