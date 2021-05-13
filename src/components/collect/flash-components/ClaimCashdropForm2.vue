<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true">
    <q-card class="q-dialog-plugin">

      <q-card-section>
        <p class="text-h5 q-mb-md" style="color: #0AC18E"><strong>Claim cashdrop</strong></p>
        <p class="q-my-sm" style="color: #0e3247">You are within the claim radius of the cashdrop. You may claim it now!</p>
        <p class="q-mb-sm" style="color: #0e3247">Enter passcode to claim the cashdrop.</p>
        <q-form ref="claimForm" class="q-gutter-y-sm q-mx-none q-mt-sm" method="post" @submit="submitClaimCashdrop" >
          <q-btn :label="'Claim'" type="claim" class="full-width q-mt-none quest-btn"/>
        </q-form>
      </q-card-section>
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
    submitClaimCashdrop () {
      this.$emit('ok')
      this.hide()
    },
    onOKClick () {
      this.$refs.claimForm.submit()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>

<style>
.claim-btn {
  background-color: #0AC18E;
  color: white;
}
.text-input-color {
  color: #0AC18E;
}
</style>
