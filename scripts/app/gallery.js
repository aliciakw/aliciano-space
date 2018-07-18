define(function () {
    return {
        renderNavContent: ($, Handlebars, navTemplate, categoryNames, currentCategory) => {
          var navTemplateCompiled = Handlebars.compile(navTemplate);
          function getCategoryNavConfig(categoryNames, newCurrentCategory) {
            return categoryNames.map((categoryName) => ({
              name: categoryName,
              selected: categoryName === newCurrentCategory
            }));
          }
          $('#gallery-nav-content').html(navTemplateCompiled({
            config: getCategoryNavConfig(categoryNames, currentCategory)
          }));
        },
        renderThumbnailGallery: ($, Handlebars, thumbnailTemplate, data, currentCategory) => {
          var thumbnailTemplateCompiled = Handlebars.compile(thumbnailTemplate);
          $('#thumbnail-gallery-content').html(thumbnailTemplateCompiled({
            title: currentCategory,
            paintings: data[currentCategory]
          }));
        }
    };
});
