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
($, Handlebars, rawData, navTemplateFile, gallery, lightboxTemplateFile) => {
    const data = JSON.parse(rawData);
    const categoryNames = Object.keys(data);
    const navTemplate = Handlebars.compile(navTemplateFile);
    const lightboxTemplate = Handlebars.compile(lightboxTemplateFile);
    const getKeywordFromItemClicked = (clickEvent, keywordPrefix) => {
      var targetId = $(clickEvent.currentTarget).attr('id');
      if (targetId) {
        return targetId.replace(keywordPrefix, '');
      }
    };
    function render(galleryName, selectedImageIndex) {
      gallery.renderGalleriesNavContent($, navTemplate, categoryNames, data);

      // render lightbox, if applicable
      if (galleryName && selectedImageIndex >= 0) {
        const galleryData = data[galleryName];
        const galleryImages = galleryData.images;
        gallery.renderLightbox($, lightboxTemplate, galleryImages, selectedImageIndex);

        /* Available Actions: */
        // change featured image
        $('.left-trigger, .right-trigger').click((event) => {
          event.preventDefault();
          var targetId = $(event.target).attr('id');
          if (targetId) {
            const selectedImageIndex = parseInt(targetId.replace('goto-', ''), 10);
            render(galleryName, selectedImageIndex);
          }
        });
        // close lightbox
        $('.close-trigger').click(() => {
          return render(null, null);
        });
        $('.blanket').click(() => {
          return render(null, null);
        });
        // keyboard actions
        $(document).keyup((event) => {
          if (event.keyCode == 27) { // esc key
            return render(null, null);
          }
          if (selectedImageIndex + 1 < galleryImages.length && event.keyCode == 39) { // right arrow key
            return render(galleryName, selectedImageIndex + 1);
          }
          if (selectedImageIndex > 0 && event.keyCode == 37) { // left arrow key
            return render(galleryName, selectedImageIndex - 1);
          }
        });
      } else {
        gallery.hideLightbox($);
        /* Available Actions: */
        // select a gallery
        $('.gallery-thumbnail').click((event) => {
          const selectedGalleryName = getKeywordFromItemClicked(event, 'gallery-category-');
          return render(selectedGalleryName, 0);
        });
      }
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
        $('.about .section-content').fadeIn(600);
      }, 600);
      window.setTimeout(() => {
        animateCategories(1, 5, 40);
      }, 450);

    });
});
