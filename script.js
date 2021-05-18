const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API
let count = 5;
const apiKey = "a2QnU9qmHDONdoQixp7Q-L5j7GFqdkf91f2076xpRUY"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

// Helper function (Setattribute helper)
function setAttributes(element, attributes) {
    for (const key in attributes) {
        if (Object.hasOwnProperty.call(attributes, key)) {
            const attrValue = attributes[key];
            element.setAttribute(key, attrValue);
        }
    }
}

function imageLoaded () {
    imagesLoaded++
    imagesLoaded === totalImages ? (ready = true, loader.hidden = true, count = 20) : ready = false;
}

function displayImages() {
    imagesLoaded = 0;
    totalImages = imagesArray.length;
    console.log(`Total Images ` + totalImages);
    imagesArray.forEach(image => {
        // create anchor tag
        const item = document.createElement('a');

        // create attributes
        setAttributes(item, {
            href: image.links.html,
            target: '_blank'
        })

        // create img tag
        const img = document.createElement('img');
        // create attributes
        setAttributes(img, {
            src: image.urls.regular,
            alt: image.alt_description,
            title: image.alt_description,
        })

        img.addEventListener('load', imageLoaded);

        // append img tag into anchor tag
        item.appendChild(img);

        // append anchor tag into  img-container
        imgContainer.appendChild(item);
    })
}

// Get Photos
async function getPhotos() {
    try {
        const res = await fetch(apiUrl);
        imagesArray = await res.json();
        displayImages();
    } catch (error) {

    }
}

// Check if scroll is near bottom of page to load more images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        console.log("Loader");
        getPhotos();
    }
})

// On page load
getPhotos();