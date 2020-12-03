<template>
  <div class="datetime">
    <div v-if="value.eventDate && options.includes('eventDate')" class="date">{{ displayDate(value.eventDate) }}</div>
    <div v-if="value.eventDate && options.includes('eventDate')" class="time">{{ displayTime(value) }}</div>
  </div>
</template>

<script>

export default {
  name: 'Datetime',
  props: {
    value: {
      type: Object,
      default: function() { return {} }
    },
    options: {
      type: Array,
      default: function() { return ['eventDate'] }
    }
  },
  methods: {
    displayDate(date) {
      return this.$moment(date).format('DD MMMM YYYY')
    },
    displayTime(value) {
      const format = 'HH:mm'
      let date = value.eventDate

      return this.$moment(date).format(format)
    }
  }
}
</script>

<style lang="scss">
  .datetime {
    .date {
      font-weight: 600;
      font-size: 16px;
    }

    .time {
      font-size: 12px;
    }
  }
</style>
