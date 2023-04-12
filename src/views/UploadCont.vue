<template>
  <div>
    <div class="w-full grid grid-cols-12 height">
      <div class="hidden lg:grid lg:col-span-2 sidenav"></div>
      <div
        class="col-span-12 lg:col-span-8 transition-all duration-200"
        ref="opacity1"
      >
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
      <div class="hidden lg:grid lg:col-span-2 sidenav">
        <div class="tags-section mt-1">
          <div class="flex flex-wrap">
            <div
              v-for="(tag, index) in tags"
              class="mr-2 mt-1"
              style="height: fit-content; width: fit-content"
            >
              <div class="tag-box p-1 h-fit flex items-center">{{ tag }}</div>
            </div>
          </div>
          <v-btn
            class="upload-button mt-1 ml-1 mb-2 text-xs col-span-2 md:col-span-1"
            @click="addtag"
            >Tags<i class="fa-solid fa-tags fa-lg"></i
          ></v-btn>
        </div>
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
    <div
      class="side-button flex justify-start items-center lg:hidden"
      @click="sidenavopen"
    >
      <i class="fa-solid fa-arrow-left fa-xl ml-1"></i>
    </div>
    <!--Responsive Sidenav-->
    <div
      class="sidenav-container translate-x-full lg:hidden grid grid-cols-12 transition-all duration-200"
      ref="sidenav"
    >
      <div class="col-span-6 sm:col-span-8 flex" @click="sidenavopen"></div>
      <div
        class="col-span-6 sm:col-span-4"
        style="
          background-color: rgb(24, 24, 24);
          margin-top: 50px;
          height: calc(100% - 50px);
        "
      >
        <div class="tags-section mt-1">
          <div class="flex flex-wrap">
            <div
              v-for="(tag, index) in tags"
              class="mx-2 mt-1"
              style="height: fit-content; width: fit-content"
            >
              <div class="tag-box p-1 h-fit flex items-center">{{ tag }}</div>
            </div>
          </div>
          <v-btn
            class="upload-button mt-1 ml-2 mb-2 text-xs col-span-2 md:col-span-1"
            @click="addtag"
            >Tags<i class="fa-solid fa-tags fa-lg"></i
          ></v-btn>
        </div>

        <div class="w-full grid grid-cols-2">
          <v-btn
            class="upload-button mt-1 ml-1 mb-2 text-xs col-span-2 sm:col-span-1"
            @click="modalopen"
            >Modal</v-btn
          >
          <v-btn
            class="upload-button ml-1 mt-1 mb-2 md:mt-0 text-xs col-span-2 sm:col-span-1"
            @click="qlUpload"
            >Upload</v-btn
          >
        </div>
      </div>
    </div>
    <Transition name="transition">
      <Modal v-if="showModal" @modal-close="modalclose"></Modal>
    </Transition>
  </div>
  <Transition name="transition">
    <AddTag
      v-if="showTag"
      @tag-close="tagclose"
      @tag-data="tagdata"
      :proptags="tags"
    ></AddTag>
  </Transition>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, watch } from "vue";
import axios from "axios";
import ".././assets/input.css";
import ".././assets/VueQuill.css";
import Modal from "./Modals/MyModal.vue";
import AddTag from "./Modals/AddTag.vue";
export default {
  name: "UploadCont",
  components: {
    QuillEditor,
    Modal,
    AddTag,
  },
  data() {
    return {
      issidenavopen: false,
      deneme: "deneme",
      tags: [],
      showTag: false,
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
    sidenavopen() {
      const formdata = new FormData();
      formdata.append("tags", this.tags);
      console.log(formdata.get("tags"));
      this.$refs.sidenav.classList.toggle("translate-x-full");
      this.$refs.opacity1.classList.toggle("opacitylow");
    },
    tagdata(n) {
      this.tags = [];
      n.forEach((element) => {
        this.tags.push(element);
      });
    },
    tagclose() {
      this.showTag = false;
    },
    addtag() {
      this.showTag = true;
    },
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
      const fulldate = month + " " + day + " " + year;
      formData.append("date", fulldate);
      formData.append("file", this.selectedFile);
      formData.append("title", this.title);
      this.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });
      formData.append(
        "content",
        document.querySelector(".ql-editor").innerHTML
      );
      console.log(formData.get("tags[]"));
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
.sidenav-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.side-button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transform: translateX(50%);
  position: fixed;
  top: calc(50% - (35px / 2));
  right: 0;
  z-index: 4;
  background-color: aliceblue;
  cursor: pointer;
}
.tag-section {
  display: inline-block;
  max-width: 150px;
}
.tag-box {
  border-radius: 5px;
  font-size: 13px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
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
.input {
  display: none;
}
.upload-button {
  border-radius: 10px;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
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
.text-area-box {
  background-color: rgb(24, 24, 24);
}
</style>
