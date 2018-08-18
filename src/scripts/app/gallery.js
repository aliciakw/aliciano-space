define(() => ({
    renderGalleriesNavContent: ($, template, categoryNames, data) => {
      const galleries = categoryNames.map((categoryName) => ({
        categoryName,
        title: data[categoryName].title,
        icon: data[categoryName].icon
      }));
      $('#collections-nav-content').html(template({ galleries }));
    },
    renderLightbox: ($, template, galleryImages, selectedImageIndex) => {
      $('.blanket').show();
      $('#detail-view-content').html(template({
        painting: galleryImages[selectedImageIndex],
        prevIndex: selectedImageIndex > 0 && 'goto-' + (selectedImageIndex - 1),
        nextIndex: selectedImageIndex + 1 < galleryImages.length && 'goto-' + (selectedImageIndex + 1)
      }));
    },
    hideLightbox: ($) => {
      $('#detail-view-content').html('');
      $('.blanket').hide();
    }
}));
