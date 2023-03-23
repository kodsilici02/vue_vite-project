<template>
  <Transition>
    <div v-if="show" class="modal-mask">
      <div class="close" @click="$emit('close')"></div>
      <div class="wrapper p-2">
        <div class="input-wrapper">
          <div class="field field_v2">
            <label for="last-name" class="ha-screen-reader">Last name</label>
            <input
              @keyup.enter="modal"
              id="last-name"
              class="field__input"
              v-model="title"
              placeholder="Title"
            />
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label">Enter Section Title</span>
            </span>
          </div>
          <span v-if="blank">Do Not Leave Blank</span>
        </div>
        <div class="grid justify-items-end w-full mt-1">
          <div class="grid grid-cols-2 gap-3">
            <div class="cancel" @click="$emit('close')">
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="save" @click="modal">
              <i class="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import ".././assets/input.css";
export default {
  data() {
    return {
      title: null,
      error: false,
      blank: null,
    };
  },
  name: "Modal",
  props: {
    show: Boolean,
  },
  methods: {
    press() {
      console.log("Press");
    },
    modal() {
      if (this.title == null || this.title == "") {
        this.blank = true;
      } else {
        this.blank = false;
        this.$emit("addTitle", this.title);
        this.title = null;
      }
    },
  },
};
</script>

<style scoped>
.input-container input:focus ~ label,
.input-container input:valid ~ label {
  top: -12px;
  font-size: 12px;
}
.input-container {
  position: relative;
  margin-bottom: 25px;
}
.input-container label {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 16px;
  color: #000000;
  pointer-event: none;
  transition: all 0.5s ease-in-out;
}
.input-container input {
  border: 0;
  border-bottom: 1px solid #555;
  background: transparent;
  width: 100%;
  padding: 8px 0 5px 0;
  font-size: 16px;
  color: #fff;
}
.input-container input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid #e74c3c;
}
.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
.cancel:hover {
  background-color: rgb(233, 59, 59);
}
.save:hover {
  background-color: rgb(84, 179, 252);
}
.save {
  transition: 0.2s ease-in-out;
  cursor: pointer;
  width: 50px;
  height: 40px;
  border-radius: 5px;
  display: grid;
  grid-row: inherit;
  place-items: center;
  background-color: rgb(24, 134, 219);
}
.cancel {
  transition: 0.2s ease-in-out;
  cursor: pointer;
  width: 50px;
  height: 40px;
  border-radius: 5px;
  display: grid;
  grid-row: inherit;
  place-items: center;
  background-color: rgb(192, 57, 43);
}
.input-wrapper {
  width: 100%;
  height: 40%;
}
.input:focus {
  outline: none;
}
.input {
  padding-left: 5px;
  width: 100%;
  height: 100%;
}
.close {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 2;
}
.wrapper {
  border-radius: 10px;
  background-color: aliceblue;
  height: auto;
  width: 60vw;
  max-height: 500px;
  z-index: 4;
}
.modal-mask {
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
