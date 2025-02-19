import { requestData } from "./js/pixabay-api";
import { list, renderGallery } from "./js/render-function";

const refs = {
    form: document.querySelector('.form'),
}
const { form } = refs;


form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    list.innerHTML = "";
    const inputData = form.elements.image.value.trim();
    if (inputData === "") {
        return;
    }
    requestData(inputData).then(value => renderGallery(value));
    form.reset();
})