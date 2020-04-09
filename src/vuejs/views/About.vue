<template>
  <div>
    <form v-if="!isBusy">
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input
            type="text"
            v-model="post.title"
            class="form-control"
            id="title"
            placeholder="Title on your post"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="content" class="col-sm-2 col-form-label">Content</label>
        <div class="col-sm-10">
          <input
            type="text"
            v-model="post.content"
            class="form-control"
            id="content"
            placeholder="Content on your post"
          />
        </div>
      </div>
      <div class="form-group row d-flex flex-row-reverse">
        <div class="custom-file col-sm-3 mx-3 mt-2">
          <input type="file" class="custom-file-input" id="file" @change.prevent="catchImage" />
          <label class="custom-file-label" for="file">Choose file</label>
        </div>
      </div>
      <div v-show="photo" class="form-group row">
        <img :src="previewImage" class="col-sm-4" id="preview" />
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" class="btn btn-success mt-4" @click.prevent="createPost">Create post</button>
        </div>
      </div>
    </form>
    <p v-else>Loading...</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "About",
  data: () => ({
    post: {
      title: "",
      content: "",
      image: undefined
    },
    photo: undefined,
    isBusy: false
  }),
  computed: {
    previewImage() {
      return this.photo ? URL.createObjectURL(this.photo) : undefined;
    }
  },
  methods: {
    async createPost() {
      this.isBusy = true;

      try {
        const res = await axios.post("http://localhost:8000/api/v1/posts", {
          attributes: this.post
        });

        console.log(JSON.stringify(res.data.data));

        if (res.data.status) {
          alert(res.data.message);

          this.post.title = "";
          this.post.content = "";
          this.post.image = "";
          this.photo = "";
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert(error);
      }

      this.isBusy = false;
    },
    catchImage(e) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.post.image = reader.result.replace(/^data:(.*,)?/, "");
      };

      this.photo = file;
    }
  }
};
</script>
