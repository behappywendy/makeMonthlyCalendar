<template>
  <ol class="day-of-week">
    <li v-for="weekday in weekDates" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<script>
const week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
export default {
  name: "CalendarWeekdays",
  data() {
    return {};
  },
  computed: {
    weekDates() {
      return week;
    },
  },
};
</script>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}
</style>
