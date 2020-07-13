<template>
  <div class="CollectionWrapper flex flex-col align-center">
    <CollectionItem
      v-for="image in fields.images"
      v-bind:key="image.id"
      v-bind:alt="image.alt"
      v-bind:borderColor="image.borderColor"
      v-bind:height="image.height"
      v-bind:left="image.xCoordinate"
      v-bind:medium="image.medium"
      v-bind:src="image.src"
      v-bind:setLightboxContent="setLightboxContent"
      v-bind:title="image.title"
      v-bind:top="image.yCoordinate"
      v-bind:width="image.width"
      v-bind:year="image.year"
    />
  </div>
</template>

<script>
import CollectionItem from './CollectionItem.vue';
const graphQuery = `{
  collection {
    title
    description
    image_links {
      x_coordinate
      y_coordinate
      border_color
      image {
        ...imageFields
      }
    }
  }
}`;
export default {
  name: 'CollectionComponent',
  components: {
    CollectionItem
  },
  props: {
    collection: String,
    setLightboxContent: Function,
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
              alt: imageLink.image.data.image.alt,
              borderColor: imageLink.border_color,
              height: imageLink.image.data.height,
              medium: imageLink.image.data.medium,
              src: imageLink.image.data.image.url,
              title: imageLink.image.data.title,
              width: imageLink.image.data.width,
              xCoordinate: imageLink.x_coordinate,
              yCoordinate: imageLink.y_coordinate,
              year: imageLink.image.data.year,
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
  }

  @media screen and (min-width: 450px) {
    .CollectionWrapper {
      flex-direction: row;
    }
  }
</style>
