const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  displayPhone(data.data, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  // display show all button if there are more phone
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  console.log("is show all", isShowAll);
  // display  only first 10 phones if not show all btn clicked
  if (!isShowAll) {
    phones = phones.slice(0, 10);
  }

  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `  <figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
    </div>
  </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// search
const handleSearchBtn = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all btn
const handleShowAll = () => {
  handleSearchBtn(true);
};

// show phone details
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// load details single phone data
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}">
  <p> <span> Storage:${phone?.mainFeatures.storage} </span> </p>
  
  `;
  show_details_modal.showModal();
};
