<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true">
    <q-card class="q-dialog-plugin">

      <q-card-section>
        <p class="text-h5" style="color: #0AC18E"><strong>Claimable(s)</strong></p>
        <q-btn v-for="(cash, index) in cashdropList" :key="index" class="btn-confirmation text-white full-width" size="sm">Claimable cashdrop {{ index + 1 }}</q-btn>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="btn-confirmation text-white" size="md" label="close" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    cashdropList: {
      type: Array
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>

<style>
.btn-confirmation {
  background-color: #0AC18E;
  padding: 5px 10px 3px 10px;
}
</style>
