import type {CommandPaletteItem} from "@nuxt/ui"
import {InjectionKey, Ref} from "vue";

interface ILinks extends CommandPaletteItem {
    badge?: string,
    defaultOpen?: boolean,
    children?: CommandPaletteItem[]
}

export const LINKS: ILinks[][] = [
    [
        {
            label: 'Home',
            icon: 'i-lucide-house',
            to: '/',
        },
        {
            label: 'Inbox',
            icon: 'i-lucide-inbox',
            to: '/inbox',
            badge: '4',
        },
        {
            label: 'Settings',
            to: '/settings',
            icon: 'i-lucide-settings',
            defaultOpen: true,
            children: [
                {
                    label: 'General',
                    to: '/settings',
                    exact: true,
                }, {
                    label: 'Members',
                    to: '/settings/members',
                }, {
                    label: 'Notifications',
                    to: '/settings/notifications',
                }, {
                    label: 'Security',
                    to: '/settings/security',
                }]
        },
        {
            label: 'Customers',
            icon: 'i-lucide-users',
            to: '/customers',
        },
    ],
    [
        {
            label: 'Feedback',
            icon: 'i-lucide-message-circle',
            to: 'https://github.com/nuxt-ui-pro/dashboard-vue',
            target: '_blank'
        }, {
        label: 'Help & Support',
        icon: 'i-lucide-info',
        to: 'https://github.com/nuxt/ui-pro',
        target: '_blank'
    }]]
export const COLLAPSED_KEY = Symbol() as InjectionKey<Ref<boolean>>
