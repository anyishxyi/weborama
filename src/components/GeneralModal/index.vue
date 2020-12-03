<template>
  <el-dialog
    :visible.sync="modalOpened"
    :width="width"
    :show-close="false"
    custom-class="general-modal"
    @close="modalClose"
  >
    <svg-icon class="close-modal-icon" icon-class="close" @click="modalOpened = false" />
    <HeaderContent
      v-if="headerTitle.length > 0"
      :icon="headerIcon"
      :icon-custom="headerImage"
      :title="headerTitle"
      :default-subtitle="headerSubtitle"
    />
    <slot />
    <span v-if="hasBtns" slot="footer">
      <div class="cancel" @click="modalClose">{{ $t('utils.cancel') }}</div>
      <div class="confirm" @click="confirm">{{ $t('utils.confirm') }}</div>
    </span>
    <slot name="subfooter">
      <div v-if="subfooterTitle1" class="subfooter">
        <a v-if="subfooterTitle1" class="subfooter-button subfooter1" @click="subfooterClick1()">{{ subfooterTitle1 }}</a>
        <a v-if="subfooterTitle2" class="subfooter-button subfooter2" @click="subfooterClick2()">{{ subfooterTitle2 }}</a>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import HeaderContent from '@/components/Widget/HeaderContent'
export default {
  name: 'GeneralModal',
  components: { HeaderContent },
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    headerTitle: {
      type: String,
      default: ''
    },
    headerSubtitle: {
      type: String,
      default: ''
    },
    headerIcon: {
      type: String,
      default: ''
    },
    headerImage: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '33%'
    },
    hasBtns: {
      type: Boolean,
      default: false
    },
    closeDialogQuestion: {
      type: Boolean,
      default: false
    },
    subfooterTitle1: {
      type: String,
      default: ''
    },
    subfooterTitle2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modalOpened: false
    }
  },
  watch: {
    modalVisible: function(newVal) {
      this.modalOpened = newVal
    }
  },
  methods: {
    modalClose() {
      this.$emit('eventModalClose')
    },
    confirm() {
      this.$emit('confirm')
    },
    subfooterClick1() {
      this.$emit('subfooterClick1')
    },
    subfooterClick2() {
      this.$emit('subfooterClick2')
    }
  }
}
</script>

<style lang="scss" scoped>
.general-modal {
  .close-modal-icon {
    position: absolute;
    right: -19px;
    top: -17px;
    font-size: 38px;
    cursor: pointer;
  }
  .subfooter {
    position: absolute;
    margin-top: 30px;
    width: 100%;
    margin-left: -20px;
    .subfooter-button {
      display: block;
      background: #3574e4;
      width: 100%;
      margin-top: 15px;
      padding: 15px;
      color: white;
      text-align: center;
      border-radius: 5px;
      font-size: 25px;
      font-weight: 600;
      box-shadow: 0px 1px 4px 0px #5d5d5d;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 1px 4px 0px #676767;
        background: #4082f7;
      }
    }
  }
}
</style>
