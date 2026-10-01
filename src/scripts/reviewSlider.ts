import Swiper from "swiper"
import { Navigation } from "swiper/modules"
// CSS se importuje jako retezec (?inline) a vstrikuje za behu. Bezny CSS
// import by Astro vytahlo do blokujiciho <link> v <head> a lazy-loading
// by se tim zrusil.
import swiperCss from "swiper/css?inline"
import navigationCss from "swiper/css/navigation?inline"

// Modul je zamerne oddeleny od komponenty, aby ho Vite vyclenil do vlastniho
// chunku - nacte se az kdyz se carousel blizi viewportu.
let stylesInjected = false

function injectStyles() {
    if (stylesInjected) {
        return
    }
    stylesInjected = true
    const style = document.createElement("style")
    style.textContent = `${swiperCss}\n${navigationCss}`
    document.head.appendChild(style)
}

export function initReviewSlider(container: HTMLElement) {
    injectStyles()

    return new Swiper(container, {
        modules: [Navigation],
        direction: "horizontal",
        loop: true,
        speed: 400,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        spaceBetween: 0,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            940: {
                slidesPerView: 3,
            },
        },
    })
}
