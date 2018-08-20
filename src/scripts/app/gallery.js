define(() => {
  const hideLightbox = ($) => {
    $('#detail-view-content').html('');
    $('.blanket').hide();
  };
  const getKeywordFromItemClicked = ($, clickEvent, keywordPrefix) => {
    const targetId = $(clickEvent.currentTarget).attr('id');
    if (targetId) {
      return targetId.replace(keywordPrefix, '');
    }
  };
  const renderLightbox = ($, template, galleryImages, selectedImageIndex) => {
    $('.blanket').show();
    $('#detail-view-content').html(template({
      painting: galleryImages[selectedImageIndex],
      prevIndex: selectedImageIndex > 0 && 'goto-' + (selectedImageIndex - 1),
      nextIndex: selectedImageIndex + 1 < galleryImages.length && 'goto-' + (selectedImageIndex + 1)
    }));
  };
  const updateLightbox = ($, event, galleryImages, newImageIndex) => {
    if (typeof newImageIndex !== 'number') {
      newImageIndex = parseInt(getKeywordFromItemClicked($, event, 'goto-'), 10);
    }
    const newPaintingFilename = galleryImages[newImageIndex].filename;
    $('#lightbox-image').attr('src', 'img/works/' + newPaintingFilename);
    $('.left-trigger').attr('id', 'goto-' + (newImageIndex - 1));
    $('.right-trigger').attr('id', 'goto-' + (newImageIndex + 1));
    return newImageIndex;
  };
  const updateLightboxLeft = ($, event, galleryImages, newImageIndex) => {
    newImageIndex = updateLightbox($, event, galleryImages, newImageIndex);
    if (newImageIndex === 0) {
      $('.left-trigger').hide();
    }
    if (newImageIndex + 1 < galleryImages.length) {
      $('.right-trigger').show();
    }
    return newImageIndex;
  };
  const updateLightboxRight = ($, event, galleryImages, newImageIndex) => {
    newImageIndex = updateLightbox($, event, galleryImages, newImageIndex);
    if (newImageIndex + 1 === galleryImages.length) {
      $('.right-trigger').hide();
    }
    if (newImageIndex > 0) {
      $('.left-trigger').show();
    }
    return newImageIndex;
  };

  return {
      hideLightbox,
      getKeywordFromItemClicked,
      updateLightboxLeft,
      updateLightboxRight,
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

        // TODO: Figure out how to move this out.
        // Right now chrome needs the jquery in here to change featured image -_-
        $('.right-trigger').click((event) => {
          selectedImageIndex = updateLightboxRight($, event, galleryImages);
        });
        $('.left-trigger').click((event) => {
          selectedImageIndex = updateLightboxLeft($, event, galleryImages);
        });
        $('.close-trigger').click((event) => {
          hideLightbox($);
        });
        $(document).keyup((event) => {
          if (event.keyCode == 27) { // esc key
            hideLightbox($);
          }
          if (event.keyCode == 39) { // right arrow key
            if (selectedImageIndex + 1 < galleryImages.length) {
              selectedImageIndex = updateLightboxRight($, event, galleryImages, selectedImageIndex + 1);
            }
          }
          if (selectedImageIndex > 0 && event.keyCode == 37) { // left arrow key
            if (selectedImageIndex > 0) {
              selectedImageIndex = updateLightboxLeft($, event, galleryImages, selectedImageIndex - 1);
            }
          }
        });
      }
  };
});
