
// fetch product catagories
const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(data => displayCategories(data));

};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("px-4", "py-2", "bg-gray-500", "text-white", "rounded");
        categoryContainer.appendChild(btn);

    });

};

loadCategories();

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
						<button class="btn btn-outline btn-xs">
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



