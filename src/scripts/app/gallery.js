define(() => ({
    renderGalleriesNavContent: ($, Handlebars, template, categoryNames, data) => {
      console.log(categoryNames);
      console.log(data);
      var compiled = Handlebars.compile(template);
      var galleries = categoryNames.map((categoryName) => ({
        categoryName: categoryName,
        title: data[categoryName].title,
        icon: data[categoryName].icon
      }));

      console.log(galleries);
      $('#collections-nav-content').html(compiled({
        galleries: galleries
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
