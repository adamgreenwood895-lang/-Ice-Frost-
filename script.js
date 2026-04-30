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

// --- ELITE VOICE ENGINE ---
const orb = document.getElementById("orbTrigger");
const orbText = document.getElementById("orbStatus");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const recognition = new Speech();
    recognition.lang = 'en-US'; // Forces a standard for better matching
    recognition.interimResults = false; 

    recognition.onresult = (e) => {
        const cmd = e.results[0][0].transcript.toLowerCase();
        console.log("AI Heard:", cmd); // Check your browser console (F12) to see this
        
        // Show the user what was heard inside the orb
        orbText.innerText = cmd.split(" ")[0].toUpperCase(); 

        let category = "";
        
        // Expanded keyword matching for "fuzzy" speech
        if(cmd.includes("hoodie") || cmd.includes("hoody") || cmd.includes("hood")) category = "hoodies";
        if(cmd.includes("tshirt") || cmd.includes("tee") || cmd.includes("shirt")) category = "tshirts";
        if(cmd.includes("tracksuit") || cmd.includes("track") || cmd.includes("suit")) category = "tracksuits";
        if(cmd.includes("bag") || cmd.includes("pack") || cmd.includes("rucksack")) category = "bags";

        if(category) {
            localStorage.setItem("frost_category", category);
            orbText.style.color = "#ffffff";
            // Immediate navigation
            window.location.href = "products.html";
        } else {
            orbText.innerText = "NO MATCH";
            orbText.style.color = "#ff4b4b";
            setTimeout(() => { orbText.innerText = "FROST"; orbText.style.color = "#00f2ff"; }, 1500);
        }
    };

    recognition.onerror = (e) => {
        orbText.innerText = "ERROR";
        console.error("Speech Error:", e.error);
    };

    orb.onclick = () => {
        orbText.innerText = "LISTENING";
        orbText.style.color = "#ffffff";
        recognition.start();
    };
}

// --- PRODUCT GRID LOADER ---
function loadProducts() {
    const cat = localStorage.getItem("frost_category") || "hoodies";
    const grid = document.getElementById("productGrid");
    const items = DB[cat];

    if(!grid) return; // Prevent errors if not on products page

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

// --- CHECKOUT & TRACKING ---
function nextFlow(step) {
    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('step' + step);
    if(target) target.classList.add('active');
}

function startTracking() {
    nextFlow(3);
    const fill = document.getElementById("trackFill");
    const status = document.getElementById("trackStatus");
    const stages = ["VALIDATING...", "FREEZING...", "DISPATCHED", "DELIVERED"];

    stages.forEach((txt, i) => {
        setTimeout(() => {
            if(fill) fill.style.width = ((i + 1) * 25) + "%";
            if(status) status.innerText = txt;
        }, (i + 1) * 2000);
    });
}
