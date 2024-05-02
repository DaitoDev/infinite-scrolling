// create global array
// fetch photos and append them to array
// load the photos from the array to the html
// when page reaches bottom
// fetch more photos and append to array

// Hides loader screen after 2 seconds
const loaderOff = () => {
  setTimeout(() => {
    $(".loader").hide();
  }, 2000);
};

// Global array
const photosArray = [];

// Unsplash API GET request using Fetch
const count = 10;
const apiKey = "gh4VffvUhubKwXuWvn88tSrDKKQhxBdNCz7GMB16vFI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// When called, will fetch photos and push them to the global array
async function fetchPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.map((photoObj) => photosArray.push(photoObj));

    // Maps over the photosArray and assign each obj data to their HTML elements for display
    photosArray.map((photo) => {
      const img = $("<img />", {
        alt: photo.alt_description,
        src: photo.urls.regular,
        title: photo.alt_description,
      });

      const aTag = $("<a>", {
        href: photo.links.html,
        target: "_blank",
      }).append(img);

      $(".img-container").append(aTag);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

// initial call when page loads
fetchPhotos();

// Will turn off the loader screen/icon after 2 seconds from page load
loaderOff();

// Detects when the user scrolls to the bottom of the page then triggers the loader and fetch more photos
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    $(".loader").show();
    fetchPhotos();
    loaderOff();
  }
});
