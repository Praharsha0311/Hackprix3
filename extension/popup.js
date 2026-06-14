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