const DB = {
    hoodies: [
        { name: "FROST HOODIE V1", price: "£85", image: "assets/hoodies/h1.jpg" },
        { name: "FROST HOODIE V2", price: "£85", image: "assets/hoodies/h2.jpg" },
        { name: "FROST HOODIE V3", price: "£85", image: "assets/hoodies/h3.jpg" },
        { name: "FROST HOODIE V4", price: "£85", image: "assets/hoodies/h4.jpg" }
    ],
    tshirts: [
        { name: "ICE TEE V1", price: "£35", image: "assets/tshirts/t1.jpg" },
        { name: "ICE TEE V2", price: "£35", image: "assets/tshirts/t2.jpg" },
        { name: "ICE TEE V3", price: "£35", image: "assets/tshirts/t3.jpg" },
        { name: "ICE TEE V4", price: "£35", image: "assets/tshirts/t4.jpg" }
    ],
    tracksuits: [
        { name: "SUB-ZERO V1", price: "£120", image: "assets/tracksuits/tr1.jpg" },
        { name: "SUB-ZERO V2", price: "£120", image: "assets/tracksuits/tr2.jpg" },
        { name: "SUB-ZERO V3", price: "£120", image: "assets/tracksuits/tr3.jpg" },
        { name: "SUB-ZERO V4", price: "£120", image: "assets/tracksuits/tr4.jpg" }
    ],
    bags: [
        { name: "ARCTIC V1", price: "£55", image: "assets/bags/b1.jpg" },
        { name: "ARCTIC V2", price: "£55", image: "assets/bags/b2.jpg" },
        { name: "ARCTIC V3", price: "£55", image: "assets/bags/b3.jpg" },
        { name: "ARCTIC V4", price: "£55", image: "assets/bags/b4.jpg" }
    ]
};

// --- VOICE SYSTEM ---
const orb = document.getElementById("orbTrigger");
const orbText = document.getElementById("orbStatus");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const recognition = new Speech();

    recognition.onresult = (e) => {
        const cmd = e.results[0][0].transcript.toLowerCase();
        orbText.innerText = "ACCESSING";

        let category = "";
        if(cmd.includes("hoodie")) category = "hoodies";
        if(cmd.includes("tshirt") || cmd.includes("tee")) category = "tshirts";
        if(cmd.includes("tracksuit")) category = "tracksuits";
        if(cmd.includes("bag")) category = "bags";

        if(category) {
            localStorage.setItem("frost_category", category);
            setTimeout(() => window.location.href = "products.html", 800);
        } else {
            orbText.innerText = "FROST";
        }
    };

    orb.onclick = () => {
        orbText.innerText = "LISTENING";
        recognition.start();
    };
}

// --- PRODUCT GRID LOADER ---
function loadProducts() {
    const cat = localStorage.getItem("frost_category") || "hoodies";
    const grid = document.getElementById("productGrid");
    const items = DB[cat] || DB.hoodies;

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${item.image}">
            <p style="font-size:11px; font-weight:800; margin-bottom:5px;">${item.name}</p>
            <p style="color:#00f2ff; margin-bottom:12px;">${item.price}</p>
            <button class="frost-btn" style="padding:10px; font-size:10px;" 
                onclick='selectItem(${JSON.stringify(item)})'>SELECT</button>
        `;
        grid.appendChild(div);
    });
}

function selectItem(item) {
    localStorage.setItem("frost_selected", JSON.stringify(item));
    window.location.href = "checkout.html";
}

// --- CHECKOUT & TRACKING FLOW ---
function nextFlow(step) {
    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
}

function startTracking() {
    nextFlow(3);
    const fill = document.getElementById("trackFill");
    const status = document.getElementById("trackStatus");
    const stages = ["VALIDATING...", "FREEZING...", "DISPATCHED", "DELIVERED"];

    stages.forEach((txt, i) => {
        setTimeout(() => {
            fill.style.width = ((i + 1) * 25) + "%";
            status.innerText = txt;
        }, (i + 1) * 2000);
    });
}
