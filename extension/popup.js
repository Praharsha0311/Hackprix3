document
.getElementById("scanBtn")
.addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    console.log("TAB:", tab);

    chrome.tabs.sendMessage(
        tab.id,
        {
            action: "SCAN_PAGE"
        },
        (response) => {

            if (chrome.runtime.lastError) {
                console.error(
                    "MESSAGE ERROR:",
                    chrome.runtime.lastError.message
                );
                return;
            }

            console.log(response);

        }
    );

});

// const scanBtn = document.getElementById("scanBtn");

// scanBtn.addEventListener("click", async () => {

//     scanBtn.disabled = true;
//     scanBtn.innerHTML = "Scanning...";

//     const [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     });

//     chrome.tabs.sendMessage(
//         tab.id,
//         {
//             action: "SCAN_PAGE"
//         },
//         (response) => {

//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError);

//                 // keep showing scanning
//                 scanBtn.innerHTML = "Scanning...";
//                 return;
//             }

//             console.log(response);

//             // keep showing scanning
//             scanBtn.innerHTML = "Scanning...";
//         }
//     );

// });