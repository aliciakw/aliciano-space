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
    let galleryImages;


    // initial render
    gallery.renderGalleriesNavContent($, navTemplate, categoryNames, data);

    /* Available Actions: */
    // open a gallery
    $('.gallery-thumbnail').click((event) => {
      const selectedGalleryName = gallery.getKeywordFromItemClicked($, event, 'gallery-category-');
      galleryImages = data[selectedGalleryName].images;
      gallery.renderLightbox($, lightboxTemplate, galleryImages, 0);
    });
    // close lightbox
    $('.blanket').click(() => {
      gallery.hideLightbox($);
    });

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

      // window.setTimeout(() => {
      //   animateCategories(1, 5, 40);
      // }, 450);

    });
});
