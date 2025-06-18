document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "Guest";
  document.getElementById("username").innerText = username;

  const form = document.getElementById("searchForm");
  const historyList = document.getElementById("history");
  const resultContainer = document.getElementById("results");
  const loading = document.getElementById("loading");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const bank = document.getElementById("bank").value.trim().toLowerCase();
    const state = document.getElementById("state").value.trim().toLowerCase();
    const district = document.getElementById("district").value.trim().toLowerCase();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(bank) || !nameRegex.test(state) || !nameRegex.test(district)) {
      alert("Please enter only letters and spaces.");
      return;
    }

    const userKey = "ifsc_map_" + username;
    const comboKey = `${bank}-${state}-${district}`;
    let ifscMap = JSON.parse(localStorage.getItem(userKey)) || {};
    let ifsc = ifscMap[comboKey];

  if (!ifsc) {
    const abbr = bank.match(/[A-Za-z]/g)?.slice(0, 4).join('').toUpperCase() || "BANK";
    const nextNumber = 1000 + Object.keys(ifscMap).length;
    ifsc = abbr + '0' + String(nextNumber).padStart(6, '0');
    ifscMap[comboKey] = ifsc;
    localStorage.setItem(userKey, JSON.stringify(ifscMap));
}



    loading.style.display = "block";

    setTimeout(() => {
      loading.style.display = "none";

      const gmapLink = `https://www.google.com/maps/place/${encodeURIComponent(district + ", " + state)}`;
      const phone = "+91-" + Math.floor(9000000000 + Math.random() * 99999999);

      const resultCard = document.createElement("div");
      resultCard.className = "card p-3 my-2 shadow-sm mx-auto";
      resultCard.style.maxWidth = "600px";
      resultCard.innerHTML = `
        <h5 class="fw-bold">${bank.toUpperCase()} - ${district.toUpperCase()}, ${state.toUpperCase()}</h5>
        <p><strong>Bank:</strong> ${bank.toUpperCase()}</p>
        <p><strong>State:</strong> ${state.toUpperCase()}</p>
        <p><strong>District:</strong> ${district.toUpperCase()}</p>
        <p><strong>Branch:</strong> ${district.toUpperCase()} BRANCH</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${district.toUpperCase()}, <a href="${gmapLink}" target="_blank"><i class="fas fa-map-marker-alt text-danger"></i> View on Map</a></p>
        <p><strong>Bank's IFSC Code:</strong> <span class="text-primary fw-bold">${ifsc}</span></p>
      `;
      resultContainer.prepend(resultCard);

      const historyItem = document.createElement("li");
      historyItem.className = "list-group-item";
      historyItem.innerHTML = `<i class="fas fa-history text-warning me-2"></i> ${bank}, ${state}, ${district} → <b>${ifsc}</b>`;
      historyList.prepend(historyItem);

      let userHistory = JSON.parse(localStorage.getItem("history_" + username)) || [];
      userHistory.unshift({ bank, state, district, ifsc });
      localStorage.setItem("history_" + username, JSON.stringify(userHistory));
    }, 1000);
  });

  const savedHistory = JSON.parse(localStorage.getItem("history_" + username)) || [];
  savedHistory.forEach(entry => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<i class="fas fa-history text-warning me-2"></i> ${entry.bank}, ${entry.state}, ${entry.district} → <b>${entry.ifsc}</b>`;
    historyList.appendChild(li);
  });
});
