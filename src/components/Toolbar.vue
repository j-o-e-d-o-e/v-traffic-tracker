<template>
  <div class="container-fluid btn-toolbar">
    <div class="m-auto">
      <button type="button"
              @click="$emit('back')"
              :disabled="back"
              class="btn btn-primary">&lt;
      </button>
      <button type="button"
              @click="$emit('next')"
              :disabled="next"
              class="btn btn-primary">&gt;
      </button>
    </div>
    <div class="m-auto">
      <button type="button"
              @click="$emit('down')"
              :disabled="down.disabled"
              class="btn btn-success">{{ down.text }}
      </button>
      <button type="button"
              @click="$emit('up')"
              :disabled="up.disabled"
              v-show="up.show"
              class="btn btn-success"> {{ up.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    back: Boolean,
    next: Boolean,
    down: {
      text: String,
      disabled: Boolean,
    },
    up: {
      text: String,
      disabled: Boolean,
      show: Boolean
    }
  },
}
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>