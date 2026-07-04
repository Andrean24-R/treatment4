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
        const scrolled = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = scrolled + "%";
    });

    /* =========================
       DARK MODE TOGGLE
    ========================== */
    const darkBtn = document.createElement("button");
    darkBtn.innerText = "🌙 Dark Mode";
    darkBtn.style.position = "fixed";
    darkBtn.style.bottom = "20px";
    darkBtn.style.right = "20px";
    darkBtn.style.padding = "10px 12px";
    darkBtn.style.border = "none";
    darkBtn.style.borderRadius = "20px";
    darkBtn.style.cursor = "pointer";
    darkBtn.style.zIndex = "9999";
    darkBtn.style.background = "#1f2937";
    darkBtn.style.color = "#fff";
    document.body.appendChild(darkBtn);

    let dark = false;
    darkBtn.addEventListener("click", () => {
        dark = !dark;
        document.body.classList.toggle("dark-mode", dark);
        
        if (dark) {
            darkBtn.innerText = "☀️ Light Mode";
            darkBtn.style.background = "#f5f7fb";
            darkBtn.style.color = "#1f2937";
        } else {
            darkBtn.innerText = "🌙 Dark Mode";
            darkBtn.style.background = "#1f2937";
            darkBtn.style.color = "#fff";
        }
    });

    /* =========================
       FAQ ACCORDION LOGIC
    ========================== */
    const faqs = document.querySelectorAll(".faq-item");
    
    faqs.forEach(faq => {
        const btn = faq.querySelector(".faq-question");
        const answer = faq.querySelector(".faq-answer");
        
        if(btn && answer) {
            btn.addEventListener("click", () => {
                // Tutup yang lain
                faqs.forEach(item => {
                    if (item !== faq) {
                        const otherAnswer = item.querySelector(".faq-answer");
                        if(otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                            otherAnswer.classList.remove("show");
                        }
                    }
                });

                // Toggle yang di-klik
                answer.classList.toggle("show");
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 50 + "px";
                }
            });
        }
    });

    /* =========================
       LAMAR KERJA (POPUP + TABLE)
    ========================= */
    const applyBtns = document.querySelectorAll(".apply-btn");
    if (applyBtns.length > 0) {
        const STORAGE_KEY = "applySubmissions";
        let overlayEl = null;
        let modalEl = null;

        const modalHtml = `
            <div id="applyModalOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:10000;display:none;"></div>
            <div id="applyModal" style="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(680px,92vw);background:#fff;color:#111827;z-index:10001;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden;display:none;">
                <div style="background:#0b1220;color:#fff;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">
                    <div>
                        <div style="font-weight:800;font-size:1.1rem;">Form Lamaran Pekerjaan</div>
                        <div style="font-size:13px;opacity:.9;margin-top:2px;" id="applyPositionLabel"></div>
                    </div>
                    <button type="button" id="applyModalClose" style="background:transparent;border:0;color:#fff;font-size:24px;cursor:pointer;line-height:1;">&times;</button>
                </div>
                <form id="applyForm" style="padding:20px;display:flex;flex-direction:column;gap:12px;">
                    <input type="hidden" id="applyPositionCode" />
                    <div>
                        <label style="font-weight:bold;font-size:14px;">Nama Lengkap</label>
                        <input id="applyFullName" type="text" placeholder="Masukkan nama..." required style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;margin-top:5px;box-sizing:border-box;" />
                    </div>
                    <div>
                        <label style="font-weight:bold;font-size:14px;">Email</label>
                        <input id="applyEmail" type="email" placeholder="contoh@email.com" required style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;margin-top:5px;box-sizing:border-box;" />
                    </div>
                    <div>
                        <label style="font-weight:bold;font-size:14px;">Posisi Dilamar</label>
                        <input id="applyPositionName" type="text" readonly style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;background:#f3f4f6;color:#6b7280;margin-top:5px;box-sizing:border-box;" />
                    </div>
                    <button type="submit" style="background:#f59e0b;border:0;color:#fff;padding:12px 15px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:15px;margin-top:10px;">Submit Lamaran</button>
                </form>
                <div style="padding:15px 20px;border-top:1px solid #e5e7eb;background:#f9fafb;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <div style="font-weight:bold;font-size:15px;">Daftar Pelamar (Lokal)</div>
                        <button type="button" id="applyClearBtn" style="background:#ef4444;border:0;color:#fff;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;">Clear Data</button>
                    </div>
                    <div style="overflow-x:auto;max-height:200px;border:1px solid #e5e7eb;border-radius:6px;">
                        <div id="applyTableWrap"></div>
                    </div>
                </div>
            </div>
        `;

        function escapeHtml(s) {
            return String(s ?? "").replace(/[&<>"']/g, (ch) => {
                switch (ch) {
                    case "&": return "&amp;";
                    case "<": return "&lt;";
                    case ">": return "&gt;";
                    case '"': return "&quot;";
                    case "'": return "&#39;";
                    default: return ch;
                }
            });
        }

        function getSubmissions() {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } 
            catch { return []; }
        }

        function setSubmissions(rows) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
        }

        function renderTable() {
            const wrap = document.getElementById("applyTableWrap");
            if (!wrap) return;
            const rows = getSubmissions();
            if (!rows.length) {
                wrap.innerHTML = "<div style='color:#6b7280;font-size:13px;text-align:center;padding:15px;background:#fff;'>Belum ada data lamaran.</div>";
                return;
            }
            wrap.innerHTML = `
                <table style="width:100%;border-collapse:collapse;min-width:400px;font-size:13px;background:#fff;text-align:left;">
                    <thead style="background:#f3f4f6;">
                        <tr>
                            <th style="padding:10px;border-bottom:2px solid #e5e7eb;">Waktu</th>
                            <th style="padding:10px;border-bottom:2px solid #e5e7eb;">Nama</th>
                            <th style="padding:10px;border-bottom:2px solid #e5e7eb;">Posisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr>
                                <td style="padding:10px;border-bottom:1px solid #f3f4f6;">${escapeHtml(r.timestamp)}</td>
                                <td style="padding:10px;border-bottom:1px solid #f3f4f6;">${escapeHtml(r.fullName)}</td>
                                <td style="padding:10px;border-bottom:1px solid #f3f4f6;">${escapeHtml(r.positionName)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `;
        }

        function ensureModal() {
            if (modalEl && overlayEl) return;
            const temp = document.createElement("div");
            temp.innerHTML = modalHtml;
            
            document.body.appendChild(temp.children[0]); 
            document.body.appendChild(temp.children[0]); 
            
            overlayEl = document.getElementById("applyModalOverlay");
            modalEl = document.getElementById("applyModal");

            overlayEl.addEventListener("click", closeModal);
            document.getElementById("applyModalClose").addEventListener("click", closeModal);
            
            document.getElementById("applyClearBtn").addEventListener("click", () => {
                if(confirm("Yakin hapus data tabel lamaran?")) {
                    setSubmissions([]);
                    renderTable();
                }
            });

            document.getElementById("applyForm").addEventListener("submit", (e) => {
                e.preventDefault();
                const rows = getSubmissions();
                rows.push({
                    timestamp: new Date().toLocaleString('id-ID'),
                    fullName: document.getElementById("applyFullName").value.trim(),
                    email: document.getElementById("applyEmail").value.trim(),
                    positionName: document.getElementById("applyPositionName").value.trim(),
                    positionCode: document.getElementById("applyPositionCode").value.trim()
                });
                setSubmissions(rows);
                renderTable();
                alert("Mantap! Lamaran lu berhasil disimpen ke tabel.");
                document.getElementById("applyForm").reset();
            });

            renderTable();
        }

        function openModalFor(btn) {
            ensureModal();
            const box = btn.closest(".box");
            const h3 = box ? box.querySelector("h3") : null;
            const text = h3 ? h3.textContent.trim() : "";

            let positionCode = "";
            let positionName = text;
            
            const m = text.match(/\(\s*Kode\s*:\s*([^\)]+)\s*\)/i);
            if (m && m[1]) {
                positionCode = m[1].trim();
                positionName = text.replace(m[0], "").trim();
            }

            document.getElementById("applyPositionCode").value = positionCode;
            document.getElementById("applyPositionName").value = positionName;
            document.getElementById("applyPositionLabel").textContent = positionCode ? `Kode Pekerjaan: ${positionCode}` : "";

            modalEl.style.display = "block";
            overlayEl.style.display = "block";
        }

        function closeModal() {
            if (modalEl) modalEl.style.display = "none";
            if (overlayEl) overlayEl.style.display = "none";
        }

        applyBtns.forEach((btn) => {
            btn.addEventListener("click", () => openModalFor(btn));
        });
    }
});