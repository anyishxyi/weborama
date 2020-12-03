<template>
  <div :class="{'header-content': true, 'mini': mini}">
    <div class="header-title">
      <svg-icon v-if="icon" :icon-class="icon" />
      <div v-if="iconCustom" class="header-image">
          <img :src="iconCustom">
      </div>
      <div v-if="type === ''" class="title">{{ title }}</div>
      <div v-if="type === 'select'">
        <el-dropdown @command="handleCommand">
          <span class="title">
            Nombre de {{titleSelected}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" :disabled="isASelected">Transfers</el-dropdown-item>
            <el-dropdown-item command="b" :disabled="isBSelected">eCMRs</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="subtitle">
        <span v-if="countSuffix">
          <!-- <count-to :start-val="0" :end-val="countTotal" :suffix="countSuffix" separator=" " /> -->
        </span>
        <span v-if="subtitle">{{ subtitle }}</span>
       <el-switch
          v-if="altSubtitle"
          v-model="switchStatus"
          @change="switchChange"
        />
      </div>
    </div>
    <div class="header-utils">
      <div v-if="hasSearch" class="shadow-button search-group">
        <svg-icon icon-class="search" />
        <el-input v-model="search" :placeholder="searchPlaceholder" @input="launchSearch" />
      </div>
      <el-button v-if="hasDownload" :loading="loading || downloadLoading" :disabled="loading || downloadLoading" icon="el-icon-download" round @click="download" />
      <el-button v-if="hasRefresh" :loading="loading" :disabled="loading" icon="el-icon-refresh-right" round @click="refresh" />
      <el-button v-if="hasCreate" icon="el-icon-plus" round @click="create" />
      <el-button v-if="hasRemove" icon="el-icon-delete" round @click="remove" />
      <el-button v-if="hasSaveOrgaData" type="primary" round @click="saveOrgaData"> <svg-icon icon-class="save_disk" /> </el-button>
      <el-badge :value="nbFilters" :hidden="nbFilters === 0" :max="9" class="filters-btn">
        <el-button v-if="hasFilters" type="primary" icon="el-icon-s-operation" round @click="openFilters" />
      </el-badge>
      <!-- <ChangeTimeframe v-if="hasTimeframe" :timeframe="timeframe" @eventChangeTimeframe="changeTimeframe" /> -->
    </div>
  </div>
</template>

<script>
// import countTo from 'vue-count-to'
// import ChangeTimeframe from '@/components/Timeframe/index'
export default {
  name: 'HeaderContent',
  // components: { countTo },
  props: {
    icon: {
      type: String,
      default: function() { return '' }
    },
    iconCustom: {
      type: String,
      default: function() { return '' }
    },
    title: {
      type: String,
      default: function() { return '' }
    },
    defaultSubtitle: {
      type: String,
      default: function() { return '' }
    },
    altSubtitle: {
      type: String,
      default: function() { return '' }
    },
    switch: {
      type: Boolean,
      default: function() { return false }
    },
    countTotal: {
      type: Number,
      default: function() { return 0 }
    },
    countSuffix: {
      type: String,
      default: function() { return '' }
    },
    timeframe: {
      type: Number,
      default: function() { return 7 }
    },
    loading: {
      type: Boolean,
      default: function() { return true }
    },
    downloadLoading: {
      type: Boolean,
      default: function() { return false }
    },
    orgaDataChanged: {
      type: Boolean,
      default: function() { return false }
    },
    searchPlaceholder: {
      type: String,
      default: function() { return '' }
    },
    actions: {
      type: Array,
      default: function() { return [] }
    },
    filters: {
      type: Object,
      default: function() { return {} }
    },
    mini: {
      type: Boolean,
      default: function() { return false }
    },
    type: {
      type: String,
      default: function() { return '' }
    }
  },
  data() {
    return {
      subtitle: '',
      search: '',
      switchStatus: false,
      isASelected: true,
      isBSelected: false,
      titleSelected: 'Transfers'
    }
  },
  computed: {
    hasCreate: function() { return this.actions.includes('create') },
    hasRemove: function() { return this.actions.includes('remove') },
    hasDownload: function() { return this.actions.includes('download') },
    hasRefresh: function() { return this.actions.includes('refresh') },
    hasFilters: function() { return this.actions.includes('filters') },
    hasSearch: function() { return this.actions.includes('search') },
    hasTimeframe: function() { return this.actions.includes('timeframe') },
    hasSaveOrgaData: function() { return this.actions.includes('saveOrgaData') && this.orgaDataChanged },
    nbFilters: function() {
      let nbFilters = 0
      if (Object.hasOwnProperty.call(this.filters, 'stocks') && this.filters.stocks.length > 0) { nbFilters++ }
      if (Object.hasOwnProperty.call(this.filters, 'uStocks') && this.filters.uStocks.length > 0) { nbFilters++ }
      if (Object.hasOwnProperty.call(this.filters, 'declaredUids') && this.filters.declaredUids.length > 0) { nbFilters++ }
      if (Object.hasOwnProperty.call(this.filters, 'dates') && this.filters.dates.length > 0) { nbFilters++ }
      if (Object.hasOwnProperty.call(this.filters, 'senders') && this.filters.senders.length > 0) { nbFilters++ }
      if (Object.hasOwnProperty.call(this.filters, 'receivers') && this.filters.receivers.length > 0) { nbFilters++ }
      return nbFilters
    }
  },
  watch: {
    switch(newValue) {
      this.switchStatus = newValue
    },
    async defaultSubtitle(newVal) {
      this.subtitle = newVal
    }
  },
  created() {
    this.subtitle = this.defaultSubtitle
  },
  methods: {
    download() {
      this.$emit('eventHeaderDownload')
    },
    refresh() {
      this.$emit('eventHeaderRefresh')
    },
    create() {
      this.$emit('eventHeaderCreate')
    },
    remove() {
      this.$emit('eventHeaderRemove')
    },
    openFilters() {
      this.$emit('eventHeaderOpenFilters')
    },
    saveOrgaData() {
      this.$emit('eventSaveOrgaData')
    },
    launchSearch(search) {
      this.$emit('eventSearch', search)
    },
    changeTimeframe(newTimeframe) {
      this.$emit('eventChangeTimeframe', newTimeframe)
    },
    switchChange() {
      this.subtitle = (this.subtitle === this.defaultSubtitle) ? this.altSubtitle : this.defaultSubtitle
      this.$emit('eventHeaderSwitch', this.switchStatus)
    },
    handleCommand(command) {
      if (!command) return
      switch (command) {
          case 'a':
            this.isASelected = true
            this.isBSelected = false
            this.titleSelected = 'Transfers'
            this.$emit('eventHeaderTranfersSelected', true)
            break
          case 'b':
            this.isASelected = false
            this.isBSelected = true
            this.titleSelected = 'eCMRs'
            this.$emit('eventHeadeECMRsSelected', true)
            break
          default:
            break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.mini {
      margin-top: 0;
      .header-title {
        .svg-icon {
          font-size: 30px;
          margin: 5px 10px 0 0;
        }
        .title {
          font-size: 1.1em;
          line-height: 1.3em;
        }
        .subtitle {
          font-size: 0.9em;
          line-height: 1.1em;
        }
      }
    }
    .header-title {
      flex: 1;
      .svg-icon {
        font-size: 42px;
        float: left;
        margin: 10px 15px 0 0;
      }
      .header-image {
        height: 40px;
        width: 40px;
        background: #dfdfdf;
        border-radius: 100%;
        float: left;
        margin-right: 10px;
        text-align: center;
        line-height: 36px;
        img {
          vertical-align: middle;
          max-height: 32px;
          max-width: 32px;
        }
      }
      .title {
        font-weight: 600;
        font-size: 1.5em;
        line-height: 1.4em;
      }
      .subtitle {
        font-size: 1.1em;
        line-height: 1.2em;
        .el-switch {
          margin-left: 10px;
        }
      }
    }
    .header-utils {
      display: flex;
      justify-content: flex-end;
      button {
        display: flex;
        padding: 10px;
        border-radius: 100%;
        font-size: 1.1em;
      }
      .filters-btn {
        margin-left: 10px;
        ::v-deep .el-badge__content {
          background-color: #FF751C;
          font-size: 10px;
          height: 20px;
          width: 20px;
          font-weight: 600;
          top: 5px;
          right: 10px;
        }
      }
      ::v-deep .search-group {
        margin-right: 15px;
        display: flex;
        .svg-icon {
          float: left;
          margin-left: 10px;
          font-size: 16px;
          color: #4e4e4ed4;
          margin-top: 13px;
          display: inline-flex;
        }
        input {
          display: inline-block;
          border: none;
          padding-top: 0px;
          font-size: 15px;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
</style>
