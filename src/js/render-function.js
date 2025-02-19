import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export const list = document.querySelector('.gallery');

export const renderGallery = (value) => {
    if (value.hits.length === 0) {
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
    const imageMarkUp = value.hits.map((hit) => {
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
}

let bigImage = new SimpleLightbox('.gallery-item a', { captionsData: 'alt', captionDelay: 250 });
