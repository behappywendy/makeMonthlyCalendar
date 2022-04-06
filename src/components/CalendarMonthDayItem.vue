<template>
  <li
    class="calendar-day"
    :class="{
      calendarDayNotCurrent: !isCurrentMonth,
      calendarDayToday: isToday,
    }"
  >
    {{ label }}
    <h1 v-if="isToday">Today</h1>
  </li>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "CalendarMonthDayItem",
  props: {
    day: { type: Object, require: true },
    isToday: {
      type: Boolean,
      require: true,
    },
    isCurrentMonth: {
      type: Boolean,
      require: true,
    },
  },
  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    },
  },
};
</script>
<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}
.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: 100px;
  height: 100px;
}
.calendarDayToday {
  padding-top: 4px;
  background-color: rgb(206 181 252 / 83%);
  font-size: 12px;
}
.calendarDayNotCurrent {
  background-color: hsla(268, 15%, 48%, 0.75);
  color: rgb(207, 207, 191);
}

.calendarDayToday > span {
  color: #fff;
  border-radius: 9999px;
  background-color: rgb(73, 73, 59);
}
</style>
