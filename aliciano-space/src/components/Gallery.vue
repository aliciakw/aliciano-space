<template>
  <div class="hello">
    <h2>Gallery for {{collection}}:</h2>
  </div>
</template>

<script>
const graphQuery = `{
  collection {
    title
    description
    image_links {
      x_coordinate
      y_coordinate
      image {
        ...imageFields
      }
    }
  }
}`;
export default {
  name: 'Gallery',
  props: {
    collection: String
  },
  data() {
    return {
      documentId: '',
      fields: {
        title: null,
        description: null,
        images: [],
      }
    };
  },
  created() {
    this.getContent()
  },
  methods: {
    getContent() {
      this.$prismic.client.getByUID('collection', 'frontpage', { 'graphQuery': graphQuery })
        .then((document) => {
          if (document && document.data && Array.isArray(document.data.image_links)) {
            const images = document.data.image_links.map(imageLink => {
              // eslint-disable-next-line
              console.log('*', imageLink.image.data.image);
              return {
                xCoordinate: imageLink.x_coordinate,
                yCoordinate: imageLink.y_coordinate,
                url: imageLink.image.data.image.url,
                alt: imageLink.image.data.image.alt
              }
            });
            this.fields.images = images;
          }
        });
    }
  }
}
</script>
