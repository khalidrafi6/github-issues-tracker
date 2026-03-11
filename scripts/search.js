const searchForm = document.querySelector('#search');

const searchSpinner = Object.assign(document.createElement('span'), {
    className: 'loading loading-spinner text-info',
})

const searchSpinnerText = Object.assign(document.createElement('p'), {
    textContent: 'Searching...',
    className: 'text-gray-500'
})

function showSpinner(spinnerElement, spinnerText, parent) {
    parent.append(spinnerElement, spinnerText);
    parent.style.display = "flex";
}

async function searchIssues() {

    let currentTab = document.querySelector('input[name="status_tabs"]:checked').ariaLabel.toLowerCase();

    let c = issueElems[currentTab];

    c.issues.innerHTML = ""
        
    c.count.className = "loading loading-spinner loading-xs text-info";
    showSpinner(searchSpinner, searchSpinnerText, c.spinner);
    
    const searchData = new FormData(searchForm);

    const searchAPI = new URL('https://phi-lab-server.vercel.app/api/v1/lab/issues/search')

    const searchParams = new URLSearchParams(searchData);

    let searchedIssues;

    console.log(searchData.entries());

    try {
        const response = await fetch(`${searchAPI.href}?${searchParams}`);
        const responseObject = await response.json();

        c.count.className = "";
        c.count.innerText = responseObject.total;

        searchedIssues = responseObject.data;
    }

    catch (e) {
        console.error(e);
    }
    
    // displayIssues(searchedIssues, currentTab); 

    for (tab in issueElems) {
        displayIssues(searchedIssues, tab);

            issueElems[tab].tab?.removeEventListener( 
                "click",
                loadIssues,
            );
    }

    console.log(openTab);

}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchIssues();
})
