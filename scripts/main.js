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
  'text!data/gallery.json',
  'text!template/gallery-nav.html',
  'text!template/thumbnail-gallery.html',

],
($, Handlebars, rawData, navTemplate, thumbnailTemplate) => {
    var data = JSON.parse(rawData);
    var categoryNames = Object.keys(data);

    function getCategoryNavConfig(newCurrentCategory) {
      return categoryNames.map((categoryName) => ({
        name: categoryName,
        selected: categoryName === newCurrentCategory
      }));
    }
    function changeCurrentCategory(categoryName) {
      currentCategory = categoryName;
    }

    function render(currentCategory) {
      var navTemplateCompiled = Handlebars.compile(navTemplate);
      var thumbnailTemplateCompiled = Handlebars.compile(thumbnailTemplate);
      $('#gallery-nav-content').html(navTemplateCompiled({
        config: getCategoryNavConfig(currentCategory)
      }));

      $('#thumbnail-gallery-content').html(thumbnailTemplateCompiled({
        title: currentCategory,
        paintings: data[currentCategory]
      }));
      console.log('render is done');
    }

    // initial render
    render(categoryNames[0]);


    // a lil crude -__-
    $('li.nav-category').click((event) => {
      console.log('i see....');
      var targetId = $(event.target).attr('id');
      var newCategoryName = targetId.replace('gallery-category-', '');
      changeCurrentCategory(newCategoryName);
      //render(newCategoryName);
    });


});
