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
    const animateSequential = (i, max, interval, callback) => {
      window.setTimeout(() => {
        window.setTimeout(() => {
          callback(i);
          if (i < max) {
            return animateSequential(i + 1, max, interval, callback);
          }
        }, interval * i);
      }, interval);
    };
    $('document').ready(() => {
      window.setTimeout(() => {
        $('.vertical-dots-spacer').slideDown(800);
        $('html, body').animate({ scrollTop: 0 }, "slow");
        $('.eye-img img').css('width', '100px');
      }, 300);
      window.setTimeout(() => {
        $('.about .section-content').fadeIn(600);
      }, 600);
      window.setTimeout(() => {
        $('.eye-img img').css('width', '60px');
      }, 800);

      animateSequential(1, 4, 20, (i) => {
        $('.gallery-thumbnail:nth-child(' + i + ')').css('width', '150px');
        $('.gallery-thumbnail:nth-child(' + i + ')').css('height', '150px');
      });
    });
});
