// Unsplash API GET request using Fetch
const count = 10;
const apiKey = "gh4VffvUhubKwXuWvn88tSrDKKQhxBdNCz7GMB16vFI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Uses the Map method to map and apply properties to attributes
    const getData = data.map((data) => {
      const img = $("<img />", {
        alt: data.alt_description,
        src: data.urls.regular,
        title: data.alt_description,
      });

      const aTag = $("<a>", {
        href: data.links.html,
        target: "_blank",
      }).append(img);

      $(".img-container").append(aTag);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

// On load
getPhotos();

setTimeout(() => {
  $(".loader").hide();
}, 2000);
