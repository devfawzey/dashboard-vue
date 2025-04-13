import {computed, ref} from "vue";
import {createSharedComposable, useMediaQuery} from "@vueuse/core";

const _useSidebar = () => {
    const open = ref<boolean>(false)
    const state = computed<'expanded' | 'collapsed'>(() => open.value ? 'expanded' : 'collapsed')
    const collapsed = computed<boolean>(() => open.value)
    const isMobile = useMediaQuery('(max-width: 1025px)')
    const openMobile = ref<boolean>(false)

    function setOpen(value: boolean): void {
        open.value = value
    }

    function setOpenMobile(value: boolean) {
        openMobile.value = value
    }

    function toggleSidebar() {
        open.value = !open.value
    }

    return {state, open, openMobile, setOpen, setOpenMobile, isMobile, toggleSidebar, collapsed}
}

export const useSidebar = createSharedComposable(_useSidebar)