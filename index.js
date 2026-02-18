
// fetch product catagories
const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(data => displayCategories(data));

};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");

    // Remove only dynamic buttons (keep ALL)
    const dynamicButtons = categoryContainer.querySelectorAll(".dynamic-btn");
    dynamicButtons.forEach(btn => btn.remove());

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("px-4", "py-2", "bg-gray-500", "text-white", "rounded", "dynamic-btn");

        btn.addEventListener("click", () => {
            loadCategoryProducts(category);
            setActiveButton(btn);
        });
        categoryContainer.appendChild(btn);

    });

};
loadCategories();



// categorywise loading data
const loadCategoryProducts = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayAllItems(data));
};

// fetch all items
document.getElementById("all-item").addEventListener("click", () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => displayAllItems(data))

});


const displayAllItems = (items) => {
    const itemsContainer = document.getElementById("items-container");
    itemsContainer.innerHTML = "";

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("border", "p-3", "rounded", "text-center");

        div.innerHTML = ` 
        <div class="card shadow-sm bg-base-100 px-5 flex flex-col h-auto">
					<figure class="h-32 overflow-hidden">
						<img src="${item.image}" class="w-full h-full object-cover"/>
					</figure>

					<div class=" my-2 justify-between items-center text-xs">
                        <a class="border bg-blue-100 rounded-2xl ">
                        ${item.category}</a>
						
                        <a>${item.rating.rate} (${item.rating.count})</a>
						
					</div>

					<div class="my-2 text-xs">
						<h2 class="text-left font-bold truncate">
						${item.title}</h2>
						<h2 class="font-medium text-left">
                        $${item.price}</h2>
					</div>

					<div class="flex justify-between gap-2 my-2">
						<button class="btn btn-outline btn-xs details-btn"
                        data-id="${item.id}">
						<i class="fa-regular fa-eye"></i>Details
						</button>
						<button class="btn btn-primary btn-xs ">
							<i class="fa-solid fa-cart-shopping"></i>Add
						</button>
					</div>
				</div>
        `;
        itemsContainer.appendChild(div);
    });
};

// detailed button function
document.getElementById("items-container").addEventListener("click", (e) => {

    if (e.target.closest(".details-btn")) {
        const id = e.target.closest(".details-btn").dataset.id;
        loadProductDetails(id);
    }

});

const loadProductDetails = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => showProductDetails(data));
};

const showProductDetails = (product) => {
    const detailedContainer = document.getElementById("details-container");

    detailedContainer.innerHTML = `
    
        <div class="flex flex-col gap-5">
            <h2 class="text-xl font-bold text-gray-800 text-center">${product.title}</h2>

        <!-- Description -->
        <p class="text-sm text-gray-600 text-center">
            ${product.description}
        </p>

        <!-- Price & Rating -->
        <div class="flex justify-between items-center text-sm font-medium text-gray-700">
            <span class="text-blue-600 text-lg font-semibold">$${product.price}</span>
            <span>
                ${product.rating.rate} (${product.rating.count})
            </span>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between gap-3 mt-2">
            <button class="btn btn-outline btn-sm flex-1">
                <i class="fa-regular fa-eye mr-1"></i>Buy Now
            </button>
            <button class="btn btn-primary btn-sm flex-1">
                <i class="fa-solid fa-cart-shopping mr-1"></i>Add to Cart
            </button>
        </div>
    </div>
`;


    document.getElementById("word_modal").showModal();
};

