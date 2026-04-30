const DB = {
    hoodies: [
        { name: "FROST HOODIE V1", price: "£85", image: "assets/hoodies/hoodie1.jpg" },
        { name: "FROST HOODIE V2", price: "£85", image: "assets/hoodies/hoodie2.jpg" },
        { name: "FROST HOODIE V3", price: "£85", image: "assets/hoodies/hoodie3.jpg" },
        { name: "FROST HOODIE V4", price: "£85", image: "assets/hoodies/hoodie4.jpg" }
    ],
    tshirts: [
        { name: "ICE TEE V1", price: "£35", image: "assets/tshirts/t1.jpg" },
        { name: "ICE TEE V2", price: "£35", image: "assets/tshirts/t2.jpg" },
        { name: "ICE TEE V3", price: "£35", image: "assets/tshirts/t3.jpg" },
        { name: "ICE TEE V4", price: "£35", image: "assets/tshirts/t4.jpg" }
    ],
    tracksuits: [
        { name: "SET ZERO V1", price: "£120", image: "assets/tracksuits/tr1.jpg" },
        { name: "SET ZERO V2", price: "£120", image: "assets/tracksuits/tr2.jpg" },
        { name: "SET ZERO V3", price: "£120", image: "assets/tracksuits/tr3.jpg" },
        { name: "SET ZERO V4", price: "£120", image: "assets/tracksuits/tr4.jpg" }
    ],
    bags: [
        { name: "ARCTIC PACK V1", price: "£55", image: "assets/bags/b1.jpg" },
        { name: "ARCTIC PACK V2", price: "£55", image: "assets/bags/b2.jpg" },
        { name: "ARCTIC PACK V3", price: "£55", image: "assets/bags/b3.jpg" },
        { name: "ARCTIC PACK V4", price: "£55", image: "assets/bags/b4.jpg" }
    ]
};

// --- VOICE LOGIC ---
const orb = document.getElementById("orbTrigger");
const orbText = document.getElementById("orbStatus");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const recognition = new Speech();
    recognition.continuous = false;
    recognition.lang = 'en-US';

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
            setTimeout(() => window.location.href = "products.html", 1000);
        } else {
            orbText.innerText = "RETRY";
            orbText.style.color = "#ff4b4b";
            setTimeout(() => { orbText.innerText = "FROST"; orbText.style.color = "#00f2ff"; }, 2000);
        }
    };

    recognition.onerror = (e) => {
        if(e.error === 'not-allowed') {
            orbText.innerText = "UNBLOCK MIC";
            orbText.style.color = "#ff4b4b";
        }
    };

    orb.onclick = () => {
        orbText.innerText = "LISTENING";
        orbText.style.color = "#ffffff";
        recognition.start();
    };
}

// --- APP LOGIC ---
function loadProducts() {
    const cat = localStorage.getItem("frost_category") || "hoodies";
    const grid = document.getElementById("productGrid");
    const items = DB[cat] || DB.hoodies;

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${item.image}">
            <p style="font-size:10px; font-weight:800; margin-bottom:5px;">${item.name}</p>
            <p style="color:#00f2ff; font-size:11px; margin-bottom:12px;">${item.price}</p>
            <button class="frost-btn" style="padding:10px; font-size:9px;" 
                onclick='selectItem(${JSON.stringify(item)})'>SELECT</button>
        `;
        grid.appendChild(div);
    });
}

function selectItem(item) {
    localStorage.setItem("frost_selected", JSON.stringify(item));
    window.location.href = "checkout.html";
}

function nextFlow(step) {
    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
}

function startTracking() {
    nextFlow(3);
    const fill = document.getElementById("trackFill");
    const status = document.getElementById("trackStatus");
    const states = ["VALIDATING...", "FREEZING...", "DISPATCHED", "DELIVERED"];

    states.forEach((txt, i) => {
        setTimeout(() => {
            fill.style.width = ((i + 1) * 25) + "%";
            status.innerText = txt;
        }, (i + 1) * 2000);
    });
}
