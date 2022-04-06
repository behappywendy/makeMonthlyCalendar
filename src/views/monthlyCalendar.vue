<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selectedDate="selectedDate"
        class="calendar-month-header-selected-month"
      ></CalendarDateIndicator>
      <CalendarDateSelector
        :currentDate="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      ></CalendarDateSelector>
    </div>

    <CalendarWeekdays></CalendarWeekdays>
    <ol class="days-grid">
      <CalendarMonthDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
        :isCurrentMonth="day.isCurrentMonth"
      ></CalendarMonthDayItem>
    </ol>
  </div>
</template>
<script>
import CalendarDateIndicator from "@/components/CalendarDateIndicator.vue";
import CalendarDateSelector from "@/components/CalendarDateSelector.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import CalendarMonthDayItem from "@/components/CalendarMonthDayItem.vue";
import dayjs from "dayjs";
// import weekday from "dayjs/plugin/weekday";
// import weekOfYear from "dayjs/plugin/weekOfYear";
// dayjs.extend(weekday);
// dayjs.extend(weekOfYear);
export default {
  name: "monthlyCalendar",
  components: {
    CalendarDateIndicator,
    CalendarDateSelector,
    CalendarWeekdays,
    CalendarMonthDayItem,
  },
  data() {
    return {
      selectedDate: dayjs(),
    };
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    getWeekday(date) {
      console.log(date);
      return dayjs(date).weekday();
    },
  },
  computed: {
    days() {
      return [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
    },
    today() {
      return dayjs().format("YYYY-MM-DD");
    },
    getMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },
    year() {
      return Number(this.selectedDate.format("YYYY")); //取得年份
    },
    month() {
      return Number(this.selectedDate.format("M")); //取得月份，從 1 開始
    },
    numberOfDaysInMonth() {
      //當月會有幾天
      return dayjs(this.selectedDate).daysInMonth();
    },
    currentMonthDays() {
      //當月會有幾天再製成物件
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: true,
        };
      });
    },
    previousMonthDays() {
      //上個月
      const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
      console.log("當月第一天是在哪一週", firstDayOfTheMonthWeekday);
      //上個月
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(1, "month");
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(this.currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();
      console.log("上個月", previousMonth, "上個月哪日開始", previousMonthLastMondayDayOfMonth);
      console.log(previousMonth.year());
      console.log("上個月", previousMonth.month() + 1);
      console.log("110", previousMonthLastMondayDayOfMonth + 1);
      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      });
    },
    nextMonthDays() {
      //這個月最後一天是星期幾 //星期六 所以禮拜天會是下個月第一天
      const lastDayOfTheMonthWeekday = this.getWeekday(`${this.year}-${this.month}-${this.currentMonthDays.length}`);
      //下一個月
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;
      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      });
    },
  },
};
</script>

<style>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>
