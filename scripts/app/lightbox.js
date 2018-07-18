define(() => ({
  render: ($, Handlebars, template, painting) => {
    var compiled = Handlebars.compile(template);
    $('#detail-view-content').html(compiled(painting));
  }
}));
