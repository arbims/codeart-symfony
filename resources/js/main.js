import htmx_org from 'htmx.org';
import Alpine from 'alpinejs'
import '../css/app.css'
import '../css/output.css'
import '../../node_modules/highlightjs/styles/monokai.css'
import hljs from "highlightjs";

window.htmx = htmx_org;
window.Alpine = Alpine
 
document.querySelectorAll('pre').forEach((block) => {
	hljs.highlightBlock(block)
})

document.addEventListener("htmx:afterSettle", (event) => {
    document.querySelectorAll('pre').forEach((block) => {
      hljs.highlightBlock(block);
    });
});

Alpine.data('themeToggle', () => ({
    isDarkTheme: JSON.parse(localStorage.getItem("darktheme")) ?? window.matchMedia("(prefers-color-scheme: dark)").matches,

    initializeTheme() {
        if (this.isDarkTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    toggleDarkMode() {
        this.isDarkTheme = !this.isDarkTheme;
        document.documentElement.classList.toggle('dark', this.isDarkTheme);
        localStorage.setItem("darktheme", JSON.stringify(this.isDarkTheme));
    }
}))

Alpine.data('dropdownDelay', () => ({
    open: false,
    toggle() {
        this.open = !this.open;
    }
}));

Alpine.data('sideBarMobile', () => ({
    openSidebar: false,
    toggleSidebar()
    {
        console.log('test')
        this.openSidebar = !this.openSidebar;
    }
}));

Alpine.start()

console.log('Test prod is true')
