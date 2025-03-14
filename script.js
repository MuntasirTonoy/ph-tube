function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function () {
  removeActiveClass();
  allBtn.classList.add("active");
  loadVideos();
});
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      displayVideos(data.videos);
    });
};

const loadCatVideos = (id) => {
  let catUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(catUrl)
    .then((res) => res.json())
    .then((data) => {
      const clickedBtn = document.getElementById(`btn-${id}`);
      removeActiveClass();
      clickedBtn.classList.add("active");
      displayVideos(data.category);
    });
};
const loadVideoDetails = (videoId) => {
  let detailURL = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(detailURL)
    .then((res) => res.json())
    .then((data) => displayDetails(data.video));
};

const displayDetails = (description) => {
  document.getElementById("my_modal").showModal();
  document.getElementById(
    "modal-description"
  ).innerText = `${description.description}`;
  document.getElementById("modal-heading").innerText = `${description.title}`;
  document.getElementById(
    "modal-author"
  ).innerText = `${description.authors[0].profile_name}`;
};

const displayCategories = (categories) => {
  let categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    newCategory = document.createElement("div");
    newCategory.innerHTML = ` <button id="btn-${cat.category_id}" onclick="loadCatVideos(${cat.category_id})" class="btn bg-gray-200  px-5 btn-soft hover:bg-gray-400">${cat.category}</button>`;
    categoryContainer.appendChild(newCategory);
  }
};

const displayVideos = (videos) => {
  let videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";
  if (videos.length === 0) {
    videosContainer.innerHTML = `<div class="flex flex-col items-center justify-center">
        <img src="assest/Icon.png" alt="" />
        <h1 class="text-2xl font-bold text-center">
          Opps No video in this section
        </h1>
      </div>`;
    return;
  }

  videos.forEach((video) => {
    let newVideo = document.createElement("div");
    newVideo.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-sm">
        <figure class="h-56 relative">
          <img
            src="${video.thumbnail}"
             class="w-full h-full object-cover"
            alt="thambnail"
          />
          <div
            class="absolute bg-white p-1 text-xs rounded-sm bottom-2 right-2"
          >
            3hrs 56 min ago
          </div>
        </figure>
        <div class="card-body">
          <div class="flex justify-start gap-3 items-start">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                  
                />
              </div>
            </div>
            <div class="space-y-1">
              <h2 class="card-title leading-5 line-clamp-2">${video.title} </h2>
              <p class="text-gray-500 text-base flex items-center gap-1">${
                video.authors[0].profile_name
              } ${
      video.authors[0].verified == true
        ? ` <img src="assest/check.png" class="h-4" alt="" />`
        : ``
    } </p>
              <p class="text-gray-400 text-xs">${video.others.views} Views </p>
            </div>
          </div>
        </div>
      <button onclick="loadVideoDetails('${
        video.video_id
      }')" class="btn btn-wide mb-2 mx-auto">Show Details</button>
      </div>
 
    `;

    videosContainer.appendChild(newVideo);
  });
};

loadCategories();
loadVideos();
