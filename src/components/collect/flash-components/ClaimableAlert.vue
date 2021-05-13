<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true">
    <q-card class="q-dialog-plugin">

      <q-card-section>
        <p class="text-h5" style="color: #0AC18E"><strong>Notification</strong></p>
        <p class="q-my-none" style="color: #0e3247">Your are within a claimable cashdrop radius. It has been added in the claimable list.</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="btn-confirmation text-white" size="md" label="close" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
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
