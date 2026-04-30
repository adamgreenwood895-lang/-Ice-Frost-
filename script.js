const DB = {
    hoodies: [
        { name: "FROST HOODIE V1", price: "£85", image: "assets/hoodies/hoodie1.jpg" },
        { name: "FROST HOODIE V2", price: "£85", image: "assets/hoodies/hoodie2.jpg" },
        { name: "FROST HOODIE V3", price: "£85", image: "assets/hoodies/hoodie3.jpg" },
        { name: "FROST HOODIE V4", price: "£85", image: "assets/hoodies/hoodie4.jpg" }
    ],
    tshirts: [
        { name: "ICE TEE V1", price: "£35", image: "assets/tshirts/tshirt1.jpg" },
        { name: "ICE TEE V2", price: "£35", image: "assets/tshirts/tshirt2.jpg" },
        { name: "ICE TEE V3", price: "£35", image: "assets/tshirts/tshirt3.jpg" },
        { name: "ICE TEE V4", price: "£35", image: "assets/tshirts/tshirt4.jpg" }
    ],
    tracksuits: [
        { name: "SUB-ZERO V1", price: "£120", image: "assets/tracksuits/tracksuit1.jpg" },
        { name: "SUB-ZERO V2", price: "£120", image: "assets/tracksuits/tracksuit2.jpg" },
        { name: "SUB-ZERO V3", price: "£120", image: "assets/tracksuits/tracksuit3.jpg" },
        { name: "SUB-ZERO V4", price: "£120", image: "assets/tracksuits/tracksuit4.jpg" }
    ],
    bags: [
        { name: "ARCTIC V1", price: "£55", image: "assets/bags/bag1.jpg" },
        { name: "ARCTIC V2", price: "£55", image: "assets/bags/bag2.jpg" },
        { name: "ARCTIC V3", price: "£55", image: "assets/bags/bag3.jpg" },
        { name: "ARCTIC V4", price: "£55", image: "assets/bags/bag4.jpg" }
    ]
};

// --- VOICE RECOGNITION ENGINE ---
const orb = document.getElementById("orbTrigger");
const orbStatus = document.getElementById("orbStatus");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const recognition = new Speech();
    recognition.lang = 'en-GB';

    recognition.onresult = (e) => {
        const result = e.results[0][0].transcript.toLowerCase();
        orbStatus.innerText = "CHECKING...";
        
        let targetCat = "";
        // Fuzzy matching for better UX
        if (result.includes("hoodie") || result.includes("hoody")) targetCat = "hoodies";
        if (result.includes("shirt") || result.includes("tee") || result.includes("t-shirt")) targetCat = "tshirts";
        if (result.includes("tracksuit") || result.includes("track")) targetCat = "tracksuits";
        if (result.includes("bag") || result.includes("pack")) targetCat = "bags";

        if (targetCat) {
            localStorage.setItem("frost_category", targetCat);
            orbStatus.innerText = "MATCHED";
            window.location.href = "products.html";
        } else {
            orbStatus.innerText = "RETRY";
            setTimeout(() => orbStatus.innerText = "FROST", 1200);
        }
    };

    orb.onclick = () => {
        orbStatus.innerText = "LISTENING";
        recognition.start();
    };
}

// --- PRODUCTS PAGE LOGIC ---
function loadProducts() {
    const cat = localStorage.getItem("frost_category") || "hoodies";
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const items = DB[cat] || DB.hoodies;
    grid.innerHTML = ""; 

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p style="font-weight:800; font-size:12px; margin-top:5px;">${item.name}</p>
            <p style="color:#00f2ff; margin-bottom:10px; font-size:11px;">${item.price}</p>
            <button class="frost-btn" style="padding:10px; font-size:10px;" 
                onclick='selectItem(${JSON.stringify(item)})'>SELECT</button>
        `;
        grid.appendChild(card);
    });
}

function selectItem(item) {
    localStorage.setItem("frost_selected", JSON.stringify(item));
    window.location.href = "checkout.html";
}

// --- CHECKOUT & TRACKING LOGIC ---
function initCheckout() {
    const itemData = localStorage.getItem("frost_selected");
    if (itemData && document.getElementById("itemName")) {
        const item = JSON.parse(itemData);
        document.getElementById("itemImg").src = item.image;
        document.getElementById("itemName").innerText = item.name;
        document.getElementById("itemPrice").innerText = item.price;
    }
}

function nextFlow(step) {
    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active'));
    const nextStep = document.getElementById('step' + step);
    if (nextStep) nextStep.classList.add('active');
}

function startTracking() {
    nextFlow(3);
    const fill = document.getElementById("trackFill");
    const status = document.getElementById("trackStatus");
    const stages = ["VALIDATING", "ENCRYPTING", "DISPATCHED", "DELIVERED"];

    stages.forEach((txt, i) => {
        setTimeout(() => {
            if (fill) fill.style.width = ((i + 1) * 25) + "%";
            if (status) status.innerText = txt;
        }, (i + 1) * 2000);
    });
}
