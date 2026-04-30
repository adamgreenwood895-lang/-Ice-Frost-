const DB = {
    hoodies: [
        { name: "FROST HOODIE V1", price: "£85", image: "assets/hoodies/hoodie1.jpg" },
        { name: "FROST HOODIE V2", price: "£85", image: "assets/hoodies/hoodie2.jpg" },
        { name: "FROST HOODIE V3", price: "£85", image: "assets/hoodies/hoodie3.jpg" },
        { name: "FROST HOODIE V4", price: "£85", image: "assets/hoodies/hoodie4.jpg" }
    ],
    tshirts: [{ name: "ICE TEE", price: "£35", image: "assets/tshirts/tshirt1.jpg" }],
    tracksuits: [{ name: "SUB-ZERO SET", price: "£120", image: "assets/tracksuits/tracksuit1.jpg" }],
    bags: [{ name: "ARCTIC BAG", price: "£55", image: "assets/bags/bag1.jpg" }]
};

// VOICE LOGIC
const orb = document.getElementById("orb");
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Speech && orb) {
    const rec = new Speech();
    rec.onresult = (e) => {
        const cmd = e.results[0][0].transcript.toLowerCase();
        orb.classList.remove("listening");
        
        let found = "";
        if(cmd.includes("hoodie")) found = "hoodies";
        if(cmd.includes("tshirt")) found = "tshirts";
        if(cmd.includes("tracksuit")) found = "tracksuits";
        if(cmd.includes("bag")) found = "bags";

        if(found) {
            localStorage.setItem("category", found);
            window.location.href = "products.html";
        }
    };

    orb.onclick = () => {
        orb.classList.add("listening");
        document.getElementById("chat-message").innerText = "LISTENING...";
        rec.start();
    };
}

// PRODUCT LOADER
function loadProducts() {
    const cat = localStorage.getItem("category") || "hoodies";
    const stage = document.getElementById("stage");
    const items = DB[cat] || DB.hoodies;

    items.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card"; // Add styles for this in CSS
        div.innerHTML = `<img src="${p.image}" style="width:100%; border-radius:15px;"><br>
                         <h3>${p.name}</h3><button class="ice-btn" onclick='buy(${JSON.stringify(p)})'>SECURE</button>`;
        stage.appendChild(div);
    });
}

function buy(p) {
    localStorage.setItem("selectedProduct", JSON.stringify(p));
    window.location.href = "checkout.html";
}

// TRACKING ANIMATION
function startTracking() {
    document.getElementById("step2").classList.remove("active");
    document.getElementById("step3").classList.add("active");
    const fill = document.getElementById("fill");
    const status = document.getElementById("status");
    const steps = ["Validating...", "Freezing...", "Dispatched", "Delivered"];
    
    let i = 0;
    const interval = setInterval(() => {
        fill.style.width = ((i+1)*25) + "%";
        status.innerText = steps[i];
        i++;
        if(i >= steps.length) clearInterval(interval);
    }, 2000);
}
