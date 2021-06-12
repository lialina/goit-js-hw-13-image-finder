import './sass/main.scss';
import ImagesApiServise from './js/api';
import imagesList from '/images.hbs'
import LoadMoreButton from './js/load-more-btn'

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.form-control'),
    imagesContainer: document.querySelector('.js-images-list'),
    // loadMoreBtn: document.querySelector('.button'),
}

refs.searchForm.addEventListener('submit', onSearch);

const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
});

loadMoreButton.refs.button.addEventListener('click', onLoadMore);

const imagesApiServise = new ImagesApiServise({
    onResolved: createMarkup,
    onRejected: onError,
});

function onSearch(e) {
    e.preventDefault();

    imagesApiServise.query = e.currentTarget.elements.query.value.trim();

    if (!imagesApiServise.query) {
        return;
    }
    
    if (imagesApiServise.query === '') {
        return onError();
    }

    imagesApiServise.resetPage();
    imagesApiServise.fetchImages();
}

function createMarkup(data) {
    console.log('Hello, its markup');
    clearImagesContainer();

    if (refs.searchInput.value.length === 0) {
        clearImagesContainer();
        return;
    }
    
    refs.imagesContainer.insertAdjacentHTML('beforeend', imagesList(data));
};

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
};

function onLoadMore() {
    imagesApiServise.fetchImages();
};

function onError(err) {
    console.log(err);
};
