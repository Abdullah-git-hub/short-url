const linkForm = document.querySelector("#linkForm");
const inputField = document.querySelector("#ytLink");
const submitBtn = document.querySelector("#linkForm > div.loadBtn > button");
const prev_link_card = document.querySelector(".prev_link_card");

linkForm.addEventListener("submit", (e) => {
    if (submitBtn.innerHTML != "Copy") {
        e.preventDefault();
        const longLink = `/longurl?url=${inputField.value}`;
        fetch(longLink, { method: "POST" })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                submitBtn.innerHTML = "Copy";
                inputField.value = `${window.location.href}${result.urlHash}`;
                localStorage.setItem(result.urlHash, result.url);
                render_cards();
                console.log(result);
            })
            .catch((err) => console.log(err));
    } else if (submitBtn.innerHTML == "Copy") {
        e.preventDefault();
        inputField.select();
        inputField.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(inputField.value);

        submitBtn.innerHTML = "Copied!";

        setTimeout(() => {
            submitBtn.innerHTML = "Shorten URL";
            inputField.value = "";
        }, 1000);
    }
});

function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.length == 8) {
            keys.push(key);
        }
    }
    return keys;
}

function render_cards() {
    prev_link_card.innerHTML = "";

    const card_heder = document.createElement("div");

    card_heder.innerText = "Previous Links:";
    card_heder.classList.add("card-header");

    prev_link_card.appendChild(card_heder);

    const allLocalStorageKeys = getAllKeys();

    for (i = allLocalStorageKeys.length - 1; i >= 0; i--) {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const color = `rgb(${r},${g},${b})`;

        const long_link = localStorage.getItem(allLocalStorageKeys[i]);
        const short_link =
            window.location.origin + "/" + allLocalStorageKeys[i];

        const card_body = document.createElement("div");
        card_body.classList.add("card-body");
        card_body.innerHTML = `<blockquote class="blockquote mb-1 p-3" style="border-left: 6px solid ${color}">
                        <p style="color: ${color}; font-weight: bold; font-size: 18px !important;">
                            <a href="${short_link}" style="color: ${color}" target="_blank">${short_link}</a>
                        </p>
                        <footer class="blockquote-footer mt-1" style="font-size: 15px">
                            ${long_link}
                        </footer>
                    </blockquote>`;

        prev_link_card.appendChild(card_body);
    }
}

const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));

render_cards();
