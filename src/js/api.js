const API_KEY = '22041445-5ed2f4f2b816c2335628bcb5d';
const BASE_URL = 'https://pixabay.com/api';

// refs.hideImagesText.classList.remove('is-hidden');
// hideImagesText: document.querySelector('.images-finish'),
//     refs.hideImagesText.classList.add('is-hidden');

export default class ImagesApiServise {
    constructor({ onResolved, onRejected }) {
        this.searchQuery = '';
        this.page = 1;
        this.onResolved = onResolved;
        this.onRejected = onRejected;
    }

    fetchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url)
            .then(this.onFetch)
            .then(({hits}) => {
                this.onResolved(hits);
                this.incrementPage();

                return hits;
            })
            .catch(response => {
                this.onRejected(response);
            });
    }

    onFetch(response) {
        if (response.ok) {
        return response.json();
        } else if (response.status === 404) {
        throw "Invalid entry. Please try again.";
        } else {
        throw "It seems there are some server issues.";
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}