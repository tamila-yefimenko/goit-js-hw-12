import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { itemsPerPage } from "./pixabay-api";

export const list = document.querySelector('.gallery');
export const buttonLoad = document.querySelector('.load-button');

export const renderGallery = (response, pageNumber) => {
    if (response.hits.length === 0) {
        iziToast.error({
            title: 'Sorry, there are no images matching',
            titleColor: '#fafafb',
            titleSize: '16px',
            titleLineHeight: '1.5',
            message: 'your search query.Please try again!',
            messageColor: '#fafafb',
            messageSize: '16px',
            messageLineHeight: '1.5',
            backgroundColor: '#ef4040',
            position: 'topRight',
            theme: 'dark',
            maxWidth: '432px',
        });
    }
    const imageMarkUp = response.hits.map((hit) => {
        const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = hit; 
        const uniqTags = tags.split(', ').filter((el, index, arr) => arr.indexOf(el) === index).join(', ');
        return `<li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img
                            class="gallery-image"
                            src="${webformatURL}"
                            alt="${uniqTags}"
                        />
                    </a>
                    <ul class="wrapper">
                        <li class="info-list">Likes <p class="info-text">${likes}</p></li>
                        <li class="info-list">Views <p class="info-text">${views}</p></li>
                        <li class="info-list">Comments <p class="info-text">${comments}</p></li>
                        <li class="info-list">Downloads <p class="info-text">${downloads}</p></li>
                    </ul>
                </li>`;
    }).join("");

    list.insertAdjacentHTML("beforeend", imageMarkUp);
    bigImage.refresh();
    showButton(response, pageNumber);
}

function showButton(response, pageNumber) {
    if (checkPage(response, pageNumber)) {
        buttonLoad.classList.remove('visually-hidden');
    }
}
export function hideButton() {
    buttonLoad.classList.add('visually-hidden');
}

function checkPage(response, pageNumber) {
    let totalPages = Math.ceil(response.totalHits / itemsPerPage);
    if (pageNumber >= totalPages) {
        hideButton();
        iziToast.error({
            position: "topRight",
            message: "We're sorry, but you've reached the end of search results."
        });
        return false;
    }
    return true;
}

let bigImage = new SimpleLightbox('.gallery-item a', { captionsData: 'alt', captionDelay: 250 });
