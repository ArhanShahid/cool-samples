const body = document.getElementsByTagName('body').item(0);
const firstGhostThumbnail = document.getElementsByClassName('ghost-thumbnail').item(0);
const secondGhostThumbnail = document.getElementsByClassName('ghost-thumbnail').item(1);
const thumbnail = document.getElementById('thumbnail');
const pictureCounter = document.getElementById('picture-counter');
const pictureTitle = document.getElementById('title');
const picturePopup = document.getElementById('picture-popup');
const picture = document.getElementById('picture');
const caption = picturePopup.getElementsByTagName('p').item(0);

const pictures = [{
        'thumbnail': 'https://media.gettyimages.com/photos/laughing-female-produce-vendor-working-at-stand-in-marketplace-picture-id692976318?s=1024x1024',
        'picture': 'https://media.gettyimages.com/photos/laughing-female-produce-vendor-working-at-stand-in-marketplace-picture-id692976318?s=2048x2048',
        'title': 'Laugh'
    },
    {
        'thumbnail': 'https://media.gettyimages.com/photos/laughing-family-sharing-meal-at-picnic-table-in-backyard-picture-id1217003087?s=1024x1024',
        'picture': 'https://media.gettyimages.com/photos/laughing-family-sharing-meal-at-picnic-table-in-backyard-picture-id1217003087?s=2048x2048',
        'title': 'Dinner with friends'
    },
    {
        'thumbnail': 'https://media.gettyimages.com/photos/view-from-below-of-young-female-soccer-players-bringing-hands-before-picture-id1165610974?s=1024x1024',
        'picture': 'https://media.gettyimages.com/photos/view-from-below-of-young-female-soccer-players-bringing-hands-before-picture-id1165610974?s=2048x2048',
        'title': 'Unity'
    },
    {
        'thumbnail': 'https://media.gettyimages.com/photos/crew-members-of-purse-seiner-hauling-in-net-while-fishing-for-salmon-picture-id1200731559?s=1024x1024',
        'picture': 'https://media.gettyimages.com/photos/crew-members-of-purse-seiner-hauling-in-net-while-fishing-for-salmon-picture-id1200731559?s=2048x2048',
        'title': 'Fishing'
    }
];
const picturesLength = pictures.length;
let pictureIndex = 0;
let title;

window.onload = () => {
    loadThumbnails();
    setInfo();
};

document.addEventListener('keydown', (event) => {
    const pressedButton = event.key;
    const previous = ['ArrowLeft', '4', 'ArrowUp', '8'];
    const next = ['ArrowRight', '6', 'ArrowDown', '2'];

    if (previous.includes(pressedButton)) {
        loadNewPicture('previous');
    } else if (next.includes(pressedButton)) {
        loadNewPicture('next');
    }
});

const getNewPictureIndex = (way) => {
    if (way === 'previous') {
        if (pictureIndex > 0) {
            return pictureIndex - 1;
        } else {
            return picturesLength - 1;
        }
    } else {
        if (pictureIndex < picturesLength - 1) {
            return pictureIndex + 1;
        } else {
            return 0;
        }
    }
};

const loadNewPicture = (way) => {
    pictureIndex = getNewPictureIndex(way);

    loadThumbnails();
    setInfo();
    if (picturePopup.style.display === 'flex') {
        setPicture();
    }
};

const loadThumbnails = () => {
    let firstIndex;
    let secondIndex;

    if (pictureIndex === 0) {
        firstIndex = picturesLength - 1;
        secondIndex = 1;
    } else if (pictureIndex === picturesLength - 1) {
        firstIndex = picturesLength - 2;
        secondIndex = 0;
    } else {
        firstIndex = pictureIndex - 1;
        secondIndex = pictureIndex + 1;
    }

    firstGhostThumbnail.style.backgroundImage = 'url(' + pictures[firstIndex].thumbnail + ')';
    thumbnail.style.backgroundImage = 'url(' + pictures[pictureIndex].thumbnail + ')';
    secondGhostThumbnail.style.backgroundImage = 'url(' + pictures[secondIndex].thumbnail + ')';
};

const setInfo = () => {
    title = pictures[pictureIndex].title;

    pictureCounter.innerText = picturesLength + ' / ' + (pictureIndex + 1);
    pictureTitle.innerText = title;
};

const openPicture = () => {
    setPicture();
    picturePopup.style.display = 'flex';
    disableScroll();
};

const setPicture = () => {
    const pictureSrc = pictures[pictureIndex].picture;

    picture.setAttribute('src', pictureSrc);
    picture.setAttribute('alt', title);
    caption.innerText = title;
};

picturePopup.onclick = () => {
    closePicturePopupWindow();
};

const closePicturePopupWindow = () => {
    picture.setAttribute('src', '');
    picture.setAttribute('alt', '');
    caption.innerText = '';
    picturePopup.style.display = 'none';
    enableScroll();
};

const disableScroll = () => {
    body.style.overflow = 'hidden';
    document.ontouchmove = (event) => {
        event.preventDefault();
    };
};

const enableScroll = () => {
    body.style.overflow = 'auto';
    document.ontouchmove = () => {
        return true;
    };
};