<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="true">
    <q-card class="q-dialog-plugin">

      <q-card-section>
        <p class="text-h5 q-mb-md" style="color: #0AC18E"><strong>Claim cashdrop prize</strong></p>
        <p class="q-my-sm" style="color: #0e3247">You are within the claim radius of the cashdrop. You may claim it now!</p>
        <p class="q-mb-sm" style="color: #0e3247">Enter passcode to claim prize.</p>
        <q-form ref="claimForm" class="q-gutter-y-sm q-mx-none q-mt-sm" method="post" @submit="submitClaimCashdrop" >
          <span v-if="passcodeStats" style="font-size: 11px; color: #C10015; padding-left: 11px">Invalid passcode. Please, try again.</span>
          <q-input class="q-mt-xs" bg-color="grey-2" filled color="input-color" :type="isPwd ? 'password' : 'text'"
            :dense="true" label="Passcode..."
            lazy-rules v-model="passcode"
            :rules="[val => !!val || 'Passcode is required to claim the cashdrop']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn :label="'Claim'" type="submit" class="full-width q-mt-xs claim-btn"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      passcode: null,
      coors: null,
      isPwd: true
    }
  },
  props: ['passcodeStats'],
  watch: {
    concCoors (nVal, oVal) {
      this.coors = nVal
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
      // pass passcode to the parent component to dispatch in claiming the cashdrop
      this.$emit('ok', this.passcode)
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
