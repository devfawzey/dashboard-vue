import "./assets/main.css";

import {createApp, type App} from "vue";
import {createNotivue} from "notivue"

import 'notivue/notification.css'
import 'notivue/animations.css'

import {createPinia} from "pinia"
import router from "./router/index.ts"
import uiPlugin from "@nuxt/ui/vue-plugin";
import MyApp from "./App.vue";
import Wrapper from "@/components/base/Wrapper.vue";
import {ObjectPlugin} from "@vue/runtime-core";

const myPlugin: ObjectPlugin = {
    install(app: App) {
        app.component("UWrapper", Wrapper);
        console.info("plugin installed")
    }
}

const notivue = createNotivue()
const app = createApp(MyApp);

app.use(uiPlugin);
app.use(myPlugin)
app.use(notivue);
app.use(createPinia())
app.use(router);

app.mount("#app");
