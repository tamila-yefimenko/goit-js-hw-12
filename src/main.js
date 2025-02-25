import { requestData } from "./js/pixabay-api";
import { list, renderGallery, buttonLoad, hideButton } from "./js/render-function";

const refs = {
    form: document.querySelector('.form'),
}
const { form } = refs;

hideButton();

let pageNumber = 1;
let inputData;

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pageNumber = 1;
    list.innerHTML = "";
    inputData = form.elements.image.value.trim();
    hideButton();
    if (inputData === "") {
        return;
    }
    showGallery();
    form.reset();
})

buttonLoad.addEventListener('click', async () => {
    pageNumber += 1;
    await showGallery();
    scrollPage();
})

async function showGallery() {
     try {
        const response = await requestData(inputData, pageNumber);
        renderGallery(response, pageNumber);
    } catch (err) {
        console.error(err);
    }
}

function scrollPage() {
    const info = list.firstElementChild.getBoundingClientRect();
    const height = info.height;
    const gap = Number.parseInt(getComputedStyle(list).getPropertyValue('gap'));
    scrollBy({
        behavior: 'smooth',
        top: (height + gap) * 2,
    })
}