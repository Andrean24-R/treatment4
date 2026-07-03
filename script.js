document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       LOADING SCREEN
    ========================== */
    const loader = document.createElement("div");

    loader.innerHTML = "PT Energi Gas Medan";
    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100%";
    loader.style.height = "100%";
    loader.style.background = "#0b1220";
    loader.style.color = "white";
    loader.style.display = "flex";
    loader.style.justifyContent = "center";
    loader.style.alignItems = "center";
    loader.style.fontSize = "1.5rem";
    loader.style.zIndex = "99999";

    document.body.appendChild(loader);

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.transition = "0.6s ease";
            setTimeout(() => loader.remove(), 600);
        }, 800);
    });


    /* =========================
       SCROLL PROGRESS BAR
    ========================== */
    const progressBar = document.createElement("div");

    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "4px";
    progressBar.style.background = "#f59e0b";
    progressBar.style.width = "0%";
    progressBar.style.zIndex = "9999";

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + "%";
    });


    /* =========================
       DARK MODE TOGGLE
    ========================== */
    const darkBtn = document.createElement("button");

    darkBtn.innerText = "🌙 Dark Mode";
    darkBtn.style.position = "fixed";
    darkBtn.style.bottom = "80px";
    darkBtn.style.right = "20px";
    darkBtn.style.padding = "10px 12px";
    darkBtn.style.border = "none";
    darkBtn.style.borderRadius = "20px";
    darkBtn.style.cursor = "pointer";
    darkBtn.style.zIndex = "9999";

    document.body.appendChild(darkBtn);

    let dark = false;

    darkBtn.addEventListener("click", () => {
        dark = !dark;

        if (dark) {
            document.body.style.background = "#0f172a";
            document.body.style.color = "white";
            darkBtn.innerText = "☀️ Light Mode";
        } else {
            document.body.style.background = "#f5f7fb";
            document.body.style.color = "#1f2937";
            darkBtn.innerText = "🌙 Dark Mode";
        }
    });


    /* =========================
       BACK TO TOP BUTTON
    ========================== */
    const topBtn = document.createElement("button");

    topBtn.innerText = "↑ Top";
    topBtn.style.position = "fixed";
    topBtn.style.bottom = "140px";
    topBtn.style.right = "20px";
    topBtn.style.padding = "10px 12px";
    topBtn.style.borderRadius = "20px";
    topBtn.style.border = "none";
    topBtn.style.cursor = "pointer";
    topBtn.style.zIndex = "9999";
    topBtn.style.display = "none";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});

/* =========================
       FORM KONTAK INTERAKTIF
    ========================== */
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // Logika simulasi kirim
            alert("Pesan lu udah terkirim, bro! Tim kami bakal segera merespons.");
            contactForm.reset();
        });
    }

    /* =========================
       TOMBOL LAMAR KARIR
    ========================== */
    const applyBtns = document.querySelectorAll(".apply-btn");
    applyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Silakan kirim CV lengkap lu ke email: hrd@medangasswasta.com dengan subjek sesuai Kode Posisi.");
        });
    });

    /* =========================
       FAQ ACCORDION LOGIC
    ========================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            
            faqItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });