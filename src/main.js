import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);
createApp(App).use(router).use(dayjs).mount("#app");
