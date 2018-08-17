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
  'text!data/galleries.json',
  'text!template/gallery-thumbnails.html',
  'app/gallery',
  'text!template/lightbox.html'
],
($, Handlebars, rawData, navTemplate, gallery, lightboxTemplate) => {
    var data = JSON.parse(rawData);
    var categoryNames = Object.keys(data);
    // Handlebars.registerHelper('spacify', (text) => text.replace(/\-/g, ' '));

    function render(currentCategory, selectedImage) {
      var categoryData = data[currentCategory];
      gallery.renderGalleriesNavContent($, Handlebars, navTemplate, categoryNames, data);

      var selectedImageIndex;
      var prevSlug;
      var nextSlug;
      if (selectedImage) {
        prevSlug = selectedImageIndex > 0 ? data[currentCategory][selectedImageIndex - 1].slug : null;
        nextSlug = selectedImageIndex < currentCategory.length ? data[currentCategory][selectedImageIndex + 1].slug : null;
      }

      // render lightbox, if applicable
      if (selectedImage) {
        $('.blanket').show();
        selectedImageIndex = categoryData.indexOf(selectedImage);
        if (selectedImageIndex > 0) {
          prevSlug = categoryData[selectedImageIndex - 1].slug;
        }
        if (selectedImageIndex < categoryData.length - 1) {
          nextSlug = categoryData[selectedImageIndex + 1].slug;
        }
        gallery.renderLightbox($, Handlebars, lightboxTemplate, selectedImage, prevSlug, nextSlug);
      } else {
        $('.blanket').hide();
        gallery.renderLightbox($, Handlebars, lightboxTemplate, selectedImage, null, null);
      }

      // select a collection
      $('li.nav-category').click((event) => {
        var targetId = $(event.target).attr('id');
        if (targetId) {
          var newCategoryName = targetId.replace('gallery-category-', '');
          render(newCategoryName);
          $('.nav-category.selected').slideDown();
        }
      });

      // open lightbox
      $('.gallery-thumbnail').click((event) => {
        var targetId = $(event.target).attr('id');
        console.log('>', targetId);
        if (targetId) {
          var categoryName = targetId.replace('gallery-category-', '');
          render(categoryName, data[categoryName].images[0]);
        }
      });

      // change featured image
      $('.left-trigger, .right-trigger').click((event) => {
        event.preventDefault();
        var targetId = $(event.target).attr('id');
        if (targetId) {
          var imgSlug = targetId.replace('goto-', '');
          selectedImage = categoryData.find((image) => image.slug === imgSlug);
          render(currentCategory, selectedImage);
        }
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
        if (prevSlug && e.keyCode == 37) { // left arrow key
          selectedImage = categoryData.find((image) => image.slug === prevSlug);
          render(currentCategory, selectedImage);
        }
        if (nextSlug && e.keyCode == 39) { // right arrow key
          selectedImage = categoryData.find((image) => image.slug === nextSlug);
          render(currentCategory, selectedImage);
        }
      });
    }

    // initial render
    render(null, null);

    // startup animations
    var animateCategories = (i, max, interval) => {
      window.setTimeout(() => {
        window.setTimeout(() => {
          $('.nav-category:nth-child(' + i + ')').css('font-size', '1.5em');
          if (i > 1) {
            $('.nav-category:nth-child(' + (i - 1) + ')').css('font-size', '1.0em');
          }
          if (i <= max) {
            return animateCategories(i + 1, max, interval);
          }
          if (i > max) {
            $('.nav-category:nth-child(' + i + ')').css('font-size', '1em');
          }
        }, interval * i);
      }, interval);
    };
    $('document').ready(() => {
      window.setTimeout(() => {
        $('.vertical-dots-spacer').slideDown(800);
        $('html, body').animate({ scrollTop: 0 }, "slow");
      }, 300);
      window.setTimeout(() => {
        $('.bio p').fadeIn(600);
      }, 600);
      window.setTimeout(() => {
        animateCategories(1, 5, 40);
      }, 450);

    });
});
