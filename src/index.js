import './sass/main.scss';
import ImagesApiServise from './js/api';
import imagesList from '/images.hbs'
import LoadMoreButton from './js/load-more-btn'

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.form-control'),
    imagesContainer: document.querySelector('.js-images-list'),
    
    hideImagesText: document.querySelector('.images-finish'),
}

refs.searchForm.addEventListener('submit', onSearch);

const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
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
        clearImagesContainer();
        return onError();
    }

    clearImagesContainer();
    refs.hideImagesText.classList.add('is-hidden');
    loadMoreButton.show();
    loadMoreButton.disable();
    imagesApiServise.resetPage();
    imagesApiServise.fetchImages();
}

function createMarkup(data) {
    scrollPageAfterDelay();
    
    if (refs.searchInput.value.length === 0) {
        loadMoreButton.hide();
        clearImagesContainer();
        return;
    }
    
    if (data.length === 0) {
        loadMoreButton.hide();
        onError();
        return;
    }

    if (data.length < 12 && data.length > 0) {
        loadMoreButton.hide();
        refs.hideImagesText.classList.remove('is-hidden');
        appendImagesMarkup(data);
        return;
    }

    appendImagesMarkup(data);
    loadMoreButton.enable();
};

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
};

function onLoadMore() {
    loadMoreButton.disable();
    imagesApiServise.fetchImages().then(loadMoreButton.enable());
};

function appendImagesMarkup(data) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', imagesList(data));
}

function onError() {
    refs.imagesContainer.innerHTML = "";
    const error = document.createElement("h1");
    error.textContent = "Sorry, we couldn't pull up requested data :(";
    refs.imagesContainer.appendChild(error);
};

const element = document.getElementById('.my-element-selector');
element.scrollIntoView({behavior: 'smooth',
  block: 'end',
});

function scrollPageAfterDelay() {
    setTimeout(() => {
        document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
   }, 1000)
};