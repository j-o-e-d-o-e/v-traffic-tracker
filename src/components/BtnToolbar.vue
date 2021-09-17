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
              class="btn btn-success"><i class="fa fa-plane"></i>
      </button>
      <button type="button"
              @click="$emit('up')"
              :disabled="up.disabled"
              class="btn btn-success"> Week
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
    up: {
      text: String,
      disabled: Boolean,
    },
    down: {
      text: String,
      disabled: Boolean,
    }
  }
}
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>