<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious">上一個月</span>
    <span @click="selectCurrent">today</span>
    <span @click="selectNext">下一個月</span>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "CalendarDateSelector",
  props: {
    currentDate: {
      type: String,
      require: true,
    },
    selectedDate: {
      type: Object,
      require: true,
    },
  },
  methods: {
    selectPrevious() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },
    selectCurrent() {
      let newSelectedDate = dayjs(this.currentDate);
      this.$emit("dateSelected", newSelectedDate);
    },
    selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },
  },
};
</script>
<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>
