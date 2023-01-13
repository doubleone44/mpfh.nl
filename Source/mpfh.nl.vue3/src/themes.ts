import type { ThemeDefinition } from "vuetify/lib/framework.mjs"

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#1A1A1A',
        'on-background': '#D0DCDB',
        surface: '#1A1A1A',
        'on-surface': '#D0DCDB',
        'surface-variant': '#3A4A5B',
        primary: '#7dbdb6',
        secondary: '#85b9f1',
        tertiary: '#958ee7',
        error: '#EF735B',
        info: '#77B9FF',
        success: '#96DDA9',
        warning: '#E0B426',
    }
}

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#F6F8F7',
        'on-background': '#1A1A1A',
        surface: '#F6F7F6',
        'on-surface': '#1A1A1A',
        'surface-variant': '#E0E0E0',
        primary: '#379c90',
        secondary: '#407ab8',
        error: '#EF735B',
        info: '#77B9FF',
        success: '#96DDA9',
        warning: '#E0B426',
    }
}

