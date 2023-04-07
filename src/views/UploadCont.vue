<template>
  <div>
    <div class="w-full grid grid-cols-12 height">
      <div class="hidden sm:grid sm:col-span-2 sidenav"></div>
      <div class="col-span-12 sm:col-span-8">
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
            class="wrapper"
            ref="wrapper"
            :style="`background-image: url(${image})`"
          >
            <input
              class="input"
              type="file"
              accept="image/*"
              ref="fileInput"
              @change="handleFileInput"
            />
          </div>
          <div
            class="image flex justify-center items-center"
            :class="{ opacityhigh: image == null, opacitynone: image != null }"
            @click="handleClick"
            @mouseover="opacitylow"
            @mouseleave="opacityhigh"
            ref="img"
          >
            <div>Select İmage</div>
          </div>
          <div class="mt-5 ql-custom">
            <QuillEditor theme="snow" :options="editorOptions" />
          </div>
        </div>
      </div>
      <!--Sidenav-->
      <div class="hidden sm:grid sm:col-span-2 sidenav">
        <div class="w-full h-full flex justify-end items-end">
          <div class="w-full grid grid-cols-2">
            <v-btn
              class="upload-button mt-1 ml-1 mb-2 text-xs col-span-2 md:col-span-1"
              @click="modalopen"
              >Modal</v-btn
            >
            <v-btn
              class="upload-button ml-1 mt-1 mb-2 md:mt-0 text-xs col-span-2 md:col-span-1"
              @click="qlUpload"
              >Upload</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <Transition name="transition">
      <Modal v-if="showModal" @modal-close="modalclose"></Modal>
    </Transition>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, watch } from "vue";
import axios from "axios";
import ".././assets/input.css";
import ".././assets/VueQuill.css";
import Modal from "./MyModal.vue";
export default {
  name: "UploadCont",
  components: {
    QuillEditor,
    Modal,
  },
  data() {
    return {
      showModal: false,
      selectedFile: null,
      image: null,
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
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    setTimeout(() => {
      const element = this.$refs.img;
      const wrapper = this.$refs.wrapper;
      this.wrapperheight = wrapper.style.offsetHeight;
      this.wrapperwidth = wrapper.style.offsetWidth;
      element.style.width = wrapper.offsetWidth + "px";
      element.style.marginTop = 0 - wrapper.offsetHeight + "px";
    }, 200);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    modalclose() {
      this.showModal = false;
    },
    modalopen() {
      this.showModal = true;
    },
    resizeHandler() {
      const element = this.$refs.img;
      const wrapper = this.$refs.wrapper;
      element.style.width = wrapper.offsetWidth + "px";
    },
    file() {
      console.log(this.selectedFile);
    },
    opacityhigh() {
      this.$refs.wrapper.classList.remove("opacitylow");
    },
    opacitylow() {
      this.$refs.wrapper.classList.add("opacitylow");
    },
    handleClick() {
      this.$refs.fileInput.click();
    },
    handleFileInput(event) {
      this.selectedFile = event.target.files[0];
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
      let formData = new FormData();
      const currentdate = new Date();
      const month = currentdate.toLocaleString("en-US", { month: "long" });
      const day = currentdate.getDate();
      const year = currentdate.getFullYear();
      const fullyear = month + " " + day + " " + year;
      formData.append("date", fullyear);
      formData.append("file", this.selectedFile);
      formData.append("title", this.title);
      formData.append(
        "content",
        document.querySelector(".ql-editor").innerHTML
      );

      axios
        .post("http://localhost:3333/articlepost", formData)
        .then((response) => {
          console.log("Post was successful:", response);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    },
  },
};
</script>

<style scoped>
.transition-enter-active,
.transition-leave-active {
  transition: 0.5s ease;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
.opacitynone {
  opacity: 0;
}
.opacitylow {
  opacity: 0.4;
}
.opacityhigh {
  opacity: 1;
}
.image {
  position: absolute;
  height: 500px;
  transition: 0.2s ease-in-out;
  color: aliceblue;
  z-index: 3;
  cursor: pointer;
}
.image:hover {
  opacity: 1;
}
.wrapper {
  margin-top: 10px;
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  transition: 0.2s ease-in-out;
  border-radius: 10px;
}
.fade {
  opacity: 0;
}
.input {
  display: none;
}
.image-upload:hover .fade {
  opacity: 1;
  color: aliceblue;
}
.upload-button {
  border-radius: 10px;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
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
.text-area-box {
  background-color: rgb(24, 24, 24);
}
</style>
