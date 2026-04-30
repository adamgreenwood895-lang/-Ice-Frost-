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
    ]
    // Add tracksuits and bags following the same 4-item pattern
};

// --- VOICE LOGIC ---
const orb = document.getElementById("orbTrigger");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const recognition = new Speech();
    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        let cat = "";
        if(transcript.includes("hoodie")) cat = "hoodies";
        if(transcript.includes("tshirt") || transcript.includes("tee")) cat = "tshirts";
        if(transcript.includes("tracksuit")) cat = "tracksuits";
        if(transcript.includes("bag")) cat = "bags";

        if(cat) {
            localStorage.setItem("frost_cat", cat);
            window.location.href = "products.html";
        }
    };

    orb.onclick = () => {
        document.querySelector(".orb-text").innerText = "LISTENING";
        recognition.start();
    };
}

// --- PRODUCT LOADER ---
function loadProducts() {
    const cat = localStorage.getItem("frost_cat") || "hoodies";
    const grid = document.getElementById("productGrid");
    const items = DB[cat] || DB.hoodies;

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${item.image}">
            <h4 style="font-size:12px; margin-bottom:5px;">${item.name}</h4>
            <p style="color:#00f2ff; font-weight:800; margin-bottom:10px;">${item.price}</p>
            <button class="ice-btn" onclick='selectProduct(${JSON.stringify(item)})'>SELECT</button>
        `;
        grid.appendChild(div);
    });
}

function selectProduct(item) {
    localStorage.setItem("frost_item", JSON.stringify(item));
    window.location.href = "checkout.html";
}

// --- CHECKOUT FLOW ---
function startPayment() {
    document.getElementById("step1").classList.remove("active");
    document.getElementById("step2").classList.add("active");
}

function startTracking() {
    document.getElementById("step2").classList.remove("active");
    document.getElementById("step3").classList.add("active");
    
    const fill = document.getElementById("trackFill");
    const status = document.getElementById("trackStatus");
    const phases = ["ENCRYPTING...", "WAREHOUSE...", "SHIPPING...", "DELIVERED"];
    
    phases.forEach((text, i) => {
        setTimeout(() => {
            fill.style.width = ((i + 1) * 25) + "%";
            status.innerText = text;
        }, (i + 1) * 2000);
    });
        }
