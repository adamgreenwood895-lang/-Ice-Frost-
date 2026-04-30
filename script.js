const DB = {
    hoodies: [
        { name: "FROST HOODIE V1", price: "£85", image: "assets/hoodies/hoodie1.jpg" },
        { name: "FROST HOODIE V2", price: "£85", image: "assets/hoodies/hoodie2.jpg" }
    ],
    tshirts: [{ name: "ICE TEE", price: "£35", image: "assets/tshirts/tshirt1.jpg" }],
    tracksuits: [{ name: "SUB-ZERO SET", price: "£120", image: "assets/tracksuits/tracksuit1.jpg" }],
    bags: [{ name: "ARCTIC BAG", price: "£55", image: "assets/bags/bag1.jpg" }]
};

// VOICE SYSTEM
const orb = document.getElementById("orb");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const rec = new Speech();
    rec.onresult = (e) => {
        const cmd = e.results[0][0].transcript.toLowerCase();
        const msg = document.getElementById("chat-message");
        msg.innerText = "ACCESSING: " + cmd;

        let category = "";
        if(cmd.includes("hoodie")) category = "hoodies";
        if(cmd.includes("tshirt") || cmd.includes("tee")) category = "tshirts";
        if(cmd.includes("tracksuit")) category = "tracksuits";
        if(cmd.includes("bag")) category = "bags";

        if(category) {
            localStorage.setItem("category", category);
            setTimeout(() => window.location.href = "products.html", 1000);
        }
    };

    orb.onclick = () => {
        document.getElementById("chat-message").innerText = "LISTENING...";
        rec.start();
    };
}

// PRODUCT LOADER
function loadProducts() {
    const cat = localStorage.getItem("category") || "hoodies";
    const stage = document.getElementById("stage");
    const items = DB[cat];

    items.forEach(p => {
        const div = document.createElement("div");
        div.style.marginBottom = "40px";
        div.innerHTML = `
            <img src="${p.image}" style="width:100%; border-radius:20px;">
            <h3 style="margin:10px 0;">${p.name}</h3>
            <button class="ice-btn" onclick='buy(${JSON.stringify(p)})'>SECURE ITEM</button>
        `;
        stage.appendChild(div);
    });
}

function buy(p) {
    localStorage.setItem("selectedProduct", JSON.stringify(p));
    window.location.href = "checkout.html";
}

// TRACKING
function startTracking() {
    document.getElementById("step2").classList.remove("active");
    document.getElementById("step3").classList.add("active");
    const fill = document.getElementById("fill");
    const status = document.getElementById("status");
    const stages = ["Initializing...", "Frozen...", "Dispatched", "Delivered"];
    
    stages.forEach((text, i) => {
        setTimeout(() => {
            fill.style.width = ((i + 1) * 25) + "%";
            status.innerText = text;
        }, (i + 1) * 2000);
    });
}
