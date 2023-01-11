import type { ThemeDefinition } from "vuetify/lib/framework.mjs"

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#1A1A1A',
        surface: '#1A1A1A',
        primary: '#69D1C5',
        secondary: '#77B9FF',
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
        surface: '#F6F7F6',
        primary: '#379c90',
        secondary: '#407ab8',
        error: '#EF735B',
        info: '#77B9FF',
        success: '#96DDA9',
        warning: '#E0B426',
    }
}

