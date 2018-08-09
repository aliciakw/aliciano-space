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
  'text!data/collections.json',
  'text!template/collections-nav.html',
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
      var categoryData = data[currentCategory];
      gallery.renderCollectionsNavContent($, Handlebars, navTemplate, categoryNames, currentCategory, categoryData);
      //gallery.renderThumbnailGallery($, Handlebars, thumbnailTemplate, data, currentCategory);

      var selectedImageIndex;
      var prevSlug;
      var nextSlug;
      var prevSlug = selectedImageIndex > 0 ? data[currentCategory][selectedImageIndex - 1].slug : null;
      var nextSlug = selectedImageIndex < currentCategory.length ? data[currentCategory][selectedImageIndex + 1].slug : null;

      if (selectedImage) {
        $('.blanket').show();
        selectedImageIndex = categoryData.indexOf(selectedImage);
        if (selectedImageIndex > 0) {
          prevSlug = categoryData[selectedImageIndex - 1].slug;
        }
        if (selectedImageIndex < categoryData.length - 1) {
          nextSlug = categoryData[selectedImageIndex + 1].slug;
        }
        lightbox.render($, Handlebars, lightboxTemplate, selectedImage, prevSlug, nextSlug);
      } else {
        $('.blanket').hide();
        lightbox.render($, Handlebars, lightboxTemplate, selectedImage, null, null);
      }

      // a lil crude -_-
      $('li.nav-category').click((event) => {
        var targetId = $(event.target).attr('id');
        var newCategoryName = targetId.replace('gallery-category-', '');
        render(newCategoryName);
      });

      // open lightbox
      $('.thumbnail').click((event) => {
        var targetId = $(event.target).attr('id');
        var imgSlug = targetId.replace('gallery-img-', '');
        selectedImage = data[currentCategory].find((image) => image.slug === imgSlug);
        render(currentCategory, selectedImage);
      });

      // change featured image
      $('.left-trigger, .right-trigger',).click((event) => {
        event.preventDefault();
        var targetId = $(event.target).attr('id');
        var imgSlug = targetId.replace('goto-', '');
        selectedImage = data[currentCategory].find((image) => image.slug === imgSlug);
        render(currentCategory, selectedImage);
      });

      // close lightbox
      $('.close-trigger').click((event) => {
        event.preventDefault();
        render(currentCategory, null);
      });
      $('.blanket').click((event) => {
        render(currentCategory, null);
      });
      $(document).keyup((e) => {
        if (e.keyCode == 27) { // esc key
          render(currentCategory, null);
        }
      });
    }

    // initial render
    render(categoryNames[0], null);
});
