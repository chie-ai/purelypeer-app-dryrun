<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true">
    <q-card class="q-dialog-plugin">

      <q-card-section>
        <p class="text-h5 q-mb-md" style="color: #0AC18E"><strong>Congratulations!</strong></p>
        <p class="q-mt-sm q-mb-none" style="color: #0e3247">Claiming of the casdrop prize is successful! The prize is now in your wallet!</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="btn-confirmation text-white" size="md" label="Close" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      passcode: null
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
