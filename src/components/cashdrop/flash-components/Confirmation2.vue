<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true">
      <q-card class="q-dialog-plugin">

          <q-card-section>
          <p class="text-h5"><strong>Confirmation</strong></p>
          <p class="q-my-none">Your wallet has now a sufficient balance. Do you wish to proceed creating the quest?</p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn class="btn-confirmation text-white" rounded size="md" label="proceed" @click="onOKClick" />
            <q-btn class="btn-confirmation text-white" rounded size="md" label="Cancel" @click="onCancelClick" />
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
