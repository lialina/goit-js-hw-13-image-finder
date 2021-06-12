const API_KEY = '22041445-5ed2f4f2b816c2335628bcb5d';
const BASE_URL = 'https://pixabay.com/api';

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
            .then(response => {
                this.onResolved(response);
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

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}