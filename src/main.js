import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createGalleryItemMarkup } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const loaderEl = document.querySelector('.js-loader');

let lightbox;
let searchQuery = '';
let page = 1;


const onSearchFormSubmit = async event => {
    event.preventDefault();
    searchQuery = event.target.elements.searchKeyword.value.trim();

    if (searchQuery === '') {
        galleryEl.innerHTML = '';
        event.target.reset();
        iziToast.show({
            message: 'Input field cannot be empty',
            position: 'topRight',
            timeout: 2000,
            color: 'red',
        });
        return;
    }

    page = 1;
    galleryEl.innerHTML = '';
    loadMoreBtnEl.classList.add('is-hidden');
    loaderEl.classList.remove('is-hidden');

    try {
        const imagesData = await fetchPhotosByQuery(searchQuery, page);
        displayImages(imagesData);
    } catch (error) {
        console.error('Error fetching photos:', error);
        iziToast.show({
            message: 'An error occurred while fetching photos',
            position: 'topRight',
            timeout: 2000,
            color: 'red',
        });
    } finally {
        loaderEl.classList.add('is-hidden');
    }
};

const loadMoreImages = async () => {
    loaderEl.classList.remove('is-hidden');
    try {
        const imagesData = await fetchPhotosByQuery(searchQuery, page + 1);
        displayImages(imagesData, true);
        if (page + 1 >= 15) {
            loadMoreBtnEl.classList.add('is-hidden');
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 2000,
                color: 'blue',
            });
        } else {
            page += 1;
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
        iziToast.show({
            message: 'An error occurred while fetching photos',
            position: 'topRight',
            timeout: 2000,
            color: 'red',
        });
    } finally {
        loaderEl.classList.add('is-hidden');
    }
};

const displayImages = (imagesData, append = false) => {
    if (!imagesData.hits || imagesData.hits.length === 0) {
        iziToast.show({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
            timeout: 2000,
            color: 'red',
        });
        galleryEl.innerHTML = '';
        return;
    }

    const markup = createGalleryItemMarkup(imagesData.hits);
    if (append) {
        galleryEl.insertAdjacentHTML('beforeend', markup);
    } else {
        galleryEl.innerHTML = markup;
    }

    if (lightbox) {
        lightbox.destroy();
    }
    lightbox = new SimpleLightbox('.js-gallery a', {
        captionDelay: 250,
    });

    if (imagesData.hits.length < 15 || page * 15 >= imagesData.totalHits) {
        loadMoreBtnEl.classList.add('is-hidden');
        if (page * 15 >= imagesData.totalHits) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                timeout: 2000,
                color: 'blue',
            });
        }
    } else {
        loadMoreBtnEl.classList.remove('is-hidden');
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const itemHeight = galleryItems[0].getBoundingClientRect().height;
        window.scrollBy({
            top: itemHeight * 2,
            behavior: 'smooth',
        });
    }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click',  loadMoreImages);
