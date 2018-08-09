define(() => ({
    renderNavContent: ($, Handlebars, template, categoryNames, currentCategory) => {
      var compiled = Handlebars.compile(template);
      function getCategoryNavConfig(categoryNames, newCurrentCategory) {
        return categoryNames.map((categoryName) => ({
          name: categoryName,
          selected: categoryName === newCurrentCategory
        }));
      }
      $('#gallery-nav-content').html(compiled({
        config: getCategoryNavConfig(categoryNames, currentCategory)
      }));
    },
    renderCollectionsNavContent: ($, Handlebars, template, categoryNames, currentCategory, categoryData) => {
      var compiled = Handlebars.compile(template);
      function getCategoryNavConfig(categoryNames, newCurrentCategory) {
        return categoryNames.map((categoryName) => ({
          name: categoryName,
          selected: categoryName === newCurrentCategory
        }));
      }
      console.log(categoryData);
      $('#collections-nav-content').html(compiled({
        config: getCategoryNavConfig(categoryNames, currentCategory),
        categoryData: categoryData
      }));
    },
    renderThumbnailGallery: ($, Handlebars, template, data, currentCategory) => {
      var compiled = Handlebars.compile(template);
      $('#thumbnail-gallery-content').html(compiled({
        title: currentCategory,
        paintings: data[currentCategory]
      }));
    }
}));
