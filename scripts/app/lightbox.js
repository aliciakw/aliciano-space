define(() => ({
  render: ($, Handlebars, template, painting, prevSlug, nextSlug) => {
    var compiled = Handlebars.compile(template);
    $('#detail-view-content').html(compiled({
      painting: painting,
      prevSlug: prevSlug,
      nextSlug: nextSlug
    }));
  }
}));
