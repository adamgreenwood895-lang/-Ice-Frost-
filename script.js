// 1. DATA
const DATABASE = {
    hoodies: [
        { name: "FROST HOODIE V1", price: "£85", image: "assets/hoodies/hoodie1.jpg" },
        { name: "FROST HOODIE V2", price: "£85", image: "assets/hoodies/hoodie2.jpg" },
        { name: "FROST HOODIE V3", price: "£85", image: "assets/hoodies/hoodie3.jpg" },
        { name: "FROST HOODIE V4", price: "£85", image: "assets/hoodies/hoodie4.jpg" }
    ],
    // Repeat for tshirts, tracksuits, bags...
};

// 2. VOICE RECOGNITION
const orb = document.getElementById("orb");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition && orb) {
    const recognition = new SpeechRecognition();
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript.toLowerCase();
        handleVoice(text);
    };

    orb.onclick = () => {
        orb.classList.add("listening");
        recognition.start();
    };
}

function handleVoice(text) {
    let category = "";
    if (text.includes("hoodie")) category = "hoodies";
    else if (text.includes("bag")) category = "bags";
    else if (text.includes("tracksuit")) category = "tracksuits";
    else if (text.includes("tshirt")) category = "tshirts";

    if (category) {
        localStorage.setItem("category", category);
        window.location.href = "products.html";
    }
}

// 3. PRODUCT PAGE LOADER
function loadProductsPage() {
    const cat = localStorage.getItem("category") || "hoodies";
    const stage = document.getElementById("productStage");
    const items = DATABASE[cat] || DATABASE.hoodies;

    items.forEach((p, i) => {
        const card = document.createElement("div");
        card.className = `product-card ${i === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <button onclick='selectProduct(${JSON.stringify(p)})'>BUY</button>
        `;
        stage.appendChild(card);
    });
}

function selectProduct(p) {
    localStorage.setItem("selectedProduct", JSON.stringify(p));
    window.location.href = "checkout.html";
}

