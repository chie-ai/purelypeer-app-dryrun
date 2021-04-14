<template>
  <div id="seed-phrase" ref="seed_phrase">

    <h5 class="text-center q-mb-sm">SEED PHRASE</h5>
    <h5 class="text-center q-mt-none">QRCODE</h5>

    <div class="qr-code-row q-mb-lg">
      <qr-code :text="seedPhrase" color="#404543" :size="220" class="seed-phrase"></qr-code>
    </div>

    <template>
      <q-dialog ref="seed_phrase_dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">

      <div class="q-pa-lg">
        <h5 class="text-center q-my-sm">Seed Phrase</h5>
        <p class="text-center">{{ seedPhrase }}</p>
      </div>

          <q-card-actions>
            <q-btn class="btn-seedPhrase text-white" rounded label="Close" @click="closeSeedPhrase" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>

    <template>
      <q-dialog ref="cashdrop_option_dialog">
        <q-card class="q-dialog-plugin">

        <div class="q-pa-lg">
          <h5 class="text-center q-my-sm">Where do you want to proceed?</h5>
          <p class="q-mt-md">A. To create quest</p>
            <q-btn
              rounded
              class="btn-seedPhrase text-white q-mt-none"
              size="md"
              label="proceed to create"
              @click="proceed('cash-drop')"
            />
          <p class="q-mt-lg">B. To explore cashdrops</p>
            <q-btn
              rounded
              class="btn-seedPhrase text-white q-mt-none"
              size="md"
              label="proceed to explore"
              @click="proceed('explore')"
            />
          <p class="q-mt-lg">C. To collect cashdrops</p>
            <q-btn
              rounded
              class="btn-seedPhrase text-white q-mt-none"
              size="md"
              label="proceed to collect"
              @click="proceed('collect')"
            />
        </div>

        </q-card>
      </q-dialog>
    </template>

    <div class="btn-seed-phrase q-px-sm">
      <div class="q-mt-lg q-px-lg">
          <q-btn
          rounded
          class="btn-seedPhrase text-white q-mt-none"
          size="md"
          label="show seed phrase"
          @click="showSeedPhrase"
          />
      </div>

      <div class="q-mt-lg q-px-lg hidden" ref="btn_seedPhrase_backup">
          <q-btn
          rounded
          class="btn-seedPhrase text-white"
          size="md"
          label="Backup your seed phrase"
          @click="backupSeedPhrase"
          />
      </div>

      <div class="q-mt-lg q-px-lg" ref="btn_next">
          <q-btn
          rounded
          class="btn-seedPhrase text-white"
          size="md"
          label="Next"
          @click="next"
          />
      </div>
    </div>

  </div>
</template>

<script>
import { QSpinnerFacebook } from 'quasar'

export default {
  data () {
    return {
      seedPhrase: null
    }
  },
  methods: {
    showSeedPhrase () {
      this.$refs.seed_phrase_dialog.show()
    },
    hideSeedPhrase () {
      this.$refs.seed_phrase_dialog.hide()
    },
    onDialogHide () {
      this.$emit('hideSeedPhrase')
    },
    closeSeedPhrase () {
      this.hideSeedPhrase()
    },
    next () {
      this.$refs.cashdrop_option_dialog.show()
    },
    backupSeedPhrase () {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'spinner-color',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: '<b>Backing up of seed phrase is in progress.</b> <br/><strong style="color: #0AC18E;">Hang on...</strong>',
        messageColor: 'black'
      })

      this.$refs.seed_phrase.classList.add('hidden')

      // Store wallet seed phrase, seed hash, pubkey and address to localstorage (will be used for importing wallet)
      localStorage.setItem('seedPhrase', this.seedPhrase)
      localStorage.setItem('seedHash', this.seedHash)
      localStorage.setItem('pubkey', this.pubKey)
      localStorage.setItem('bchAddress', this.bchAddress)
      localStorage.setItem('slpAddress', this.slpAddress)

      this.routeTimer = setTimeout(() => {
        this.$q.loading.hide()
        this.routeTimer = false
        this.$refs.seed_phrase.classList.remove('hidden')
        this.$q.notify({
          message: 'Backing up of seed phrase is done!',
          color: 'notify-color',
          position: 'top',
          timeout: 2000
        })
        this.$refs.btn_seedPhrase_backup.classList.add('hidden')
        this.$refs.btn_next.classList.remove('hidden')
      }, 3000)
    },
    proceed (destination) {
      this.$router.push({ path: `${destination}` })
    }
  },
  created () {
    this.seedPhrase = this.$store.state.wallet.wallet.seedPhrase

    this.$q.notify({
      message: 'Wallet has been successfully created!',
      color: 'notify-color',
      position: 'top',
      timeout: 3000
    })
  }
}
</script>

<style>
#seed-phrase {
  width: 100%;
}
.qr-code-row {
  margin-top: 40px;
}
.seed-phrase {
  display: flex;
  justify-content: center;
}
.btn-seedPhrase {
  background-color: #0AC18E;
  padding-top: 6px;
  padding-bottom: 2px;
  width: 100% !important;
}
p {
  color: #8C908F;
}
.btn-seed-phrase {
  margin-top: 50px;
}
.text-spinner-color {
  color: #0AC18E;
}
.bg-notify-color {
  background-color: #0AC18E;
}
</style>
