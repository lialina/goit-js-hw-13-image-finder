import './sass/main.scss';
import ImagesApiServise from './js/api';

const refs = {
    
}

const imagesApiServise = new ImagesApiServise({
    onResolved: createMarkup,
    onRejected: onError,
});

imagesApiServise.fetchImages();

function createMarkup() {
    console.log('Hello, its markup');
};

function onError(err) {
    console.log(err);
};
