<template>
  <div class="CollectionWrapper">
    <ImageComponent
      v-for="image in fields.images"
      v-bind:key="image.id"
      v-bind:src="image.src"
      v-bind:alt="image.alt"
      v-bind:left="image.xCoordinate"
      v-bind:top="image.yCoordinate"
    />
  </div>
</template>

<script>
import ImageComponent from './ImageComponent.vue';
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
  name: 'CollectionComponent',
  components: {
    ImageComponent
  },
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
            const images = document.data.image_links.map(imageLink => ({
              xCoordinate: imageLink.x_coordinate,
              yCoordinate: imageLink.y_coordinate,
              src: imageLink.image.data.image.url,
              alt: imageLink.image.data.image.alt
            }));
            this.fields.images = images;
          }
        });
    }
  }
}
</script>
<style>
  .CollectionWrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    position: absolute;
    width: 100vw;
    height: 100%;
    flex-grow: 1;
  }
</style>
