define(() => ({
    renderCollectionsNavContent: ($, Handlebars, template, categoryNames, currentCategory, categoryData) => {
      var compiled = Handlebars.compile(template);
      function getCategoryNavConfig(categoryNames, newCurrentCategory) {
        return categoryNames.map((categoryName) => ({
          name: categoryName,
          selected: categoryName === newCurrentCategory
        }));
      }
      $('#collections-nav-content').html(compiled({
        config: getCategoryNavConfig(categoryNames, currentCategory),
        categoryData: categoryData
      }));
    },
    renderLightbox: ($, Handlebars, template, painting, prevSlug, nextSlug) => {
      var compiled = Handlebars.compile(template);
      $('#detail-view-content').html(compiled({
        painting: painting,
        prevSlug: prevSlug,
        nextSlug: nextSlug
      }));
    }
}));
