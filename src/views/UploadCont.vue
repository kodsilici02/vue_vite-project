<template>
  <div>
    <div class="container-fluid w-full grid grid-cols-12 height">
      <div class="col-span-2"></div>
      <div class="col-span-7">
        <div class="h-25 bg-slate-50">
          <div>
            <QuillEditor
              theme="snow"
              toolbar="full"
              v-model:content="dataProperty"
            />
          </div>
        </div>
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
          <div class="container-fluid w-full text-white">
            <div v-for="subtitle in subtitles" :key="subtitle.id">
              <div class="content-subtitle">
                {{ subtitle.title }}
              </div>

              <textarea
                :ref="'textarea' + subtitle.id"
                @input="resize(subtitle.id)"
                class="w-full text-white"
                v-model="contents[subtitle.id]"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <!--Sidenav-->
      <div class="col-span-3 sidenav">
        <div class="sidenav-title">Sections</div>
        <div>
          <div
            class="grid grid-cols-12"
            v-for="subtitle in subtitles"
            :key="subtitle.id"
          >
            <div class="col-span-8 subtitles">
              <input
                type="text "
                class="subtitle-input"
                v-model="subtitle.title"
                placeholder="Subtitle"
              />
            </div>
            <div
              class="col-span-2 grid justify-items-center content-center button"
              @click="deleteSubtitle(subtitle)"
            >
              <i class="fa-solid fa-square-minus fa-2xl"></i>
            </div>
          </div>
        </div>
        <div @click="addSubtitle" class="button">
          <i class="fa-solid fa-square-plus fa-2xl"></i>
        </div>
        <div class="w-full flex justify-end mt-2">
          <v-btn class="show-more mr-2" @click="upload" elevation="2"
            >Upload</v-btn
          >
          <v-btn class="show-more mr-2" @click="contentlog" elevation="2"
            >content</v-btn
          >
        </div>
      </div>
    </div>
    <Modal
      :show="showModal"
      @add-title="addTitle"
      @close="this.showModal = false"
    ></Modal>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import axios from "axios";
import { object } from "webidl-conversions";
import Modal from "./MyModal.vue";
export default {
  name: "UploadCont",
  components: {
    Modal,
    QuillEditor,
  },
  data() {
    return {
      content: null,
      title: null,
      sections: [],
      subtitles: [],
      contents: [],
      showModal: false,
    };
  },

  methods: {
    contentlog() {
      console.log(this.content);
    },
    upload() {
      this.subtitles.forEach((el) => {
        this.sections.push({
          title: el.title,
          content: this.contents[el.id],
        });
      });
      const payload = {
        title: this.title,
        sections: this.sections,
      };
      axios
        .post("http://localhost:3333/dumbs/blogpost", payload)
        .then((response) => {
          console.log("Post was successful:", response.data);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    },
    addTitle(n) {
      this.showModal = false;
      this.subtitles.push({
        title: n,
        id: this.subtitles.length,
      });
    },
    resize(id) {
      this.subtitles.forEach((el) => {
        if (el.id == id) {
          const element = this.$refs["textarea" + el.id][0];
          element.style.height = "18px";
          element.style.height = element.scrollHeight + "px";
        }
      });
    },
    deleteSubtitle(subtitle) {
      const index = this.subtitles.indexOf(subtitle);
      this.subtitles.splice(index, 1);
    },
    addSubtitle() {
      this.showModal = true;
    },
  },
};
</script>
<style scoped>
.show-more {
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
