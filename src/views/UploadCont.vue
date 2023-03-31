<template>
  <div>
    <div class="container-fluid w-full grid grid-cols-12 height">
      <div class="col-span-2"></div>
      <div class="col-span-7">
        <div class="text-area-box p-2">
          <div class="field field_v2">
            <input
              id="last-name"
              class="field__input text-white"
              v-model="title"
              placeholder="Title"
              autocomplete="off"
            />
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label text-white">Enter Title</span>
            </span>
          </div>
          <div
            class="image-upload"
            :style="`background-image: url(${image})`"
            @click="handleClick"
          >
            <div
              class="image-select flex items-center justify-center"
              :class="{ fade: image }"
            >
              <div>Select a İmage</div>
            </div>
            <input
              class="input"
              type="file"
              accept="image/*"
              ref="fileInput"
              @change="handleFileInput"
            />
          </div>
          <div class="mt-5">
            <QuillEditor theme="snow" :options="editorOptions" />
          </div>
        </div>
      </div>
      <!--Sidenav-->
      <div class="col-span-3 sidenav">
        <div class="sidenav-title">Sections</div>
        <div class="w-full flex justify-end mt-2">
          <v-btn class="upload-button mr-2" @click="qlUpload" elevation="2"
            >Upload</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref } from "vue";
import axios from "axios";
import ".././assets/input.css";
import ".././assets/VueQuill.css";
export default {
  name: "UploadCont",
  components: {
    QuillEditor,
  },
  data() {
    return {
      image: null,
      content: null,
      title: null,
      editorOptions: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["link", "image"],

            ["clean"], // remove formatting button
          ],
        },
        handlers: {
          image: this.imageHandler,
        },
      },
    };
  },
  methods: {
    handleClick() {
      this.$refs.fileInput.click();
    },
    handleFileInput(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result.split(",")[1];
        const dataUrl = `data:${file.type};base64,${base64Data}`;

        this.image = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    qlUpload() {
      const payload = {
        title: this.title,
        image: this.image,
        content: document.querySelector(".ql-editor").innerHTML,
      };

      axios
        .post("http://localhost:3333/dumbs/articlepost", payload)
        .then((response) => {
          console.log("Post was successful:", response.data);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    },
  },
};
</script>

<style scoped>
.fade {
  opacity: 0;
}
.image-select {
  width: 100%;
  height: 100%;
  color: aliceblue;
  transition: 0.2s ease-in-out;
  z-index: 3;
}

.input {
  display: none;
}
.image-upload {
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  margin-top: 10px;
  width: 100%;
  height: 550px;
  cursor: pointer;
  transition: 0.2s ease;
  z-index: 2;
}
.image-upload:hover {
  opacity: 0.4;
}
.image-upload:hover .fade {
  opacity: 1;
  color: aliceblue;
}

.upload-button {
  margin-left: 10px;
  border-radius: 10px;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
}
textarea {
  width: 100%;
  min-height: 72px;
  padding: 2px;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 4px;
  font-family: "Inconsolata", monospace;
  font-size: 1rem;
  color: #000;
}

textarea:focus {
  outline: none;
}
.height2 {
  height: 600px;
}
.content-subtitle {
  font-size: 36px;
  font-weight: bold;
}
.button:hover {
  cursor: pointer;
}
.sidenav-title {
  font-size: 26px;
  font-weight: bold;
}
.subtitle-input {
  width: 100%;
  height: 100%;
}
.subtitles {
  background-color: aliceblue;
  color: black;
  margin-top: 5px;
  height: 40px;
}
.height {
  height: auto;
  margin-top: 60px;
}
.sidenav {
  color: aliceblue;
  background-color: rgb(24, 24, 24);
  position: sticky;
  max-height: calc(100vh - 50px);
  top: 50px;
  right: 0;
  margin-left: 5px;
  overflow-y: scroll;
}
.title {
  background-color: aliceblue;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  font-size: 28px;
  font-weight: bold;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
textarea {
  outline: none;
  border: 2px solid white;
}
textarea:focus {
  outline: 2px solid white;
}
.text-area {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
}
.text-area-box {
  height: 200vh;
  background-color: rgb(24, 24, 24);
}
</style>
