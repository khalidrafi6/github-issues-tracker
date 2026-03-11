const allIssues = document.querySelector("#all-issues");
const openIssues = document.querySelector("#open-issues");
const closedIssues = document.querySelector("#closed-issues");

const allIssuesSpinner = document.getElementById("all-issues-spinner");
const openIssuesSpinner = document.getElementById("open-issues-spinner");
const closedIssuesSpinner = document.getElementById("closed-issues-spinner");

let allIssuesCount = document.querySelector("#all-issues-count");
let openIssuesCount = document.querySelector("#open-issues-count");
let closedIssuesCount = document.querySelector("#closed-issues-count");

const openTab = document.querySelector("#open-tab");
const closedTab = document.querySelector("#closed-tab");

let issueElems = {
  all: {
    count: allIssuesCount,
    issues: allIssues,
    spinner: allIssuesSpinner,
  },

  open: {
    count: openIssuesCount,
    issues: openIssues,
    spinner: openIssuesSpinner,
    tab: openTab,
  },

  closed: {
    count: closedIssuesCount,
    issues: closedIssues,
    spinner: closedIssuesSpinner,
    tab: closedTab,
  },
};

async function loadIssues(event) {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const responseObject = await response.json();

  let issues = responseObject.data;

  let tab = event ? this.ariaLabel.toLowerCase() : "all";

  displayIssues(issues, tab);
}

function displayIssues(issues, tab) {
  issues =
    tab !== "all" ? issues.filter((issue) => issue.status === tab) : issues;

  let c = issueElems[tab];

  c.count.className = ""; // Remove spinner
  c.count.innerText = issues.length;

  for (issue of issues) {
    let issueCard = Object.assign(document.createElement("div"), {
        id: `issue-${issue.id}-${tab}`,
      className: "card bg-base-100 shadow-sm border-transparent border-4",
    });

    const issueCreatedAt = new Date(issue.createdAt);
    const issueDateSegments = issueCreatedAt.toDateString().split(" ");
    const issueMonthAndDay = issueDateSegments[1] + " " + issueDateSegments[2];
    issueDateSegments.splice(1, 2, issueMonthAndDay);
    const issueFDate = issueDateSegments.join(", ");

    let issueModal = Object.assign(document.createElement("dialog"), {
        id: `issue_${issue.id}_${tab}_modal`,
      className: "modal",
    });

    issueCard.addEventListener("click", () => {
      issueModal.showModal();
    });

    c.issues.append(issueCard, issueModal);

    const openBadge = Object.assign(document.createElement("div"), {
      className: "badge bg-green-500 badge-xs",
    });

    const closedBadge = Object.assign(document.createElement("div"), {
      className: "badge bg-purple-500 badge-xs",
    });

    const highBadge = Object.assign(document.createElement("div"), {
      textContent: "HIGH",
      className: "badge badge-soft badge-error",
    });

    const mediumBadge = Object.assign(document.createElement("div"), {
      textContent: "MEDIUM",
      className: "badge badge-soft badge-warning",
    });

    const lowBadge = Object.assign(document.createElement("div"), {
      textContent: "LOW",
      className: "badge badge-soft",
    });

    const bugBadge = Object.assign(document.createElement("div"), {
      textContent: "Bug",
      className: "badge badge-error text-white",
    });

    const helpBadge = Object.assign(document.createElement("div"), {
      textContent: "Help Wanted",
      className: "badge badge-warning text-white",
    });

    const enhanceBadge = Object.assign(document.createElement("div"), {
      textContent: "Enhancement",
      className: "badge badge-success text-white",
    });

    const docBadge = Object.assign(document.createElement("div"), {
      textContent: "Documentation",
      className: "badge badge-info text-white",
    });

    const goodBadge = Object.assign(document.createElement("div"), {
      textContent: "Good First Issue",
      className: "badge badge-accent text-white h-fit",
    });

    let issueBody = Object.assign(document.createElement("div"), {
      className: "card-body",
    });

    let topBadges = Object.assign(document.createElement("div"), {
      className: "top-badges flex justify-between items-center",
    });

    let issueTitle = Object.assign(document.createElement("h2"), {
      textContent: issue.title,
      className: "card-title font-semibold",
    });

    let issueDescription = Object.assign(document.createElement("p"), {
      textContent: issue.description,
    });

    let issueLabels = Object.assign(document.createElement("p"), {
      className: "card-actions justify-end flex-col items-end",
    });

    let issueDivider = Object.assign(document.createElement("hr"), {
      className: "h-2",
    });

    let issueData = Object.assign(document.createElement("div"), {
      className: "issue-data text-gray-500",
      innerHTML: `<h6>${issue.author}</h6><h6>${issueFDate}</h6>`,
    });

    issueCard.appendChild(issueBody);

    if (issue.status === "open") {
      topBadges.appendChild(openBadge);
      issueCard.classList.add("border-t-green-500");
    } else {
      topBadges.appendChild(closedBadge);
      issueCard.classList.add("border-t-purple-500");
    }

    switch (issue.priority) {
      case "high": {
        topBadges.appendChild(highBadge);
        break;
      }
      case "medium": {
        topBadges.appendChild(mediumBadge);
        break;
      }
      default: {
        topBadges.appendChild(lowBadge);
        break;
      }
    }

    issueBody.append(
      topBadges,
      issueTitle,
      issueDescription,
      issueLabels,
      issueDivider,
      issueData,
    );

    const labelBadges = {
      bug: bugBadge,
      "help wanted": helpBadge,
      enhancement: enhanceBadge,
      "good first issue": goodBadge,
      documentation: docBadge,
    };

    issueModal.innerHTML = `<div class="modal-box">
     <h3 class="text-lg font-bold">${issue.title}</h3>
<h6 class="text-gray-500 flex flex-col sm:flex-row gap-2 my-2">
${issue.status === "open" ? '<span class="badge bg-green-500 text-white">Open</span>' : '<span class="badge bg-purple-500 text-white">Closed</span>'}
<span class="hidden sm:block">•</span>
<span>Opened by ${issue.author}</span>
<span class="hidden sm:block">•</span>
<span>${issueFDate}</span>
</h6>
<p id="modal-${issue.id}-${tab}-labels" class="flex gap-1 mt-4">
</p>
     <p class="py-4">${issue.description}</p>

<div class="modal-data flex justify-around bg-slate-200 p-4">

<span class="modal-assignee">
Assignee:<br>
${issue.assignee ? issue.assignee : "Not Assigned"}
</span>

<span class="modal-priority">
Priority:<br>
${issue.priority === "high" ? '<div class="badge badge-error text-white">HIGH</div>' : issue.priority === "medium" ? '<div class="badge badge-warning text-white">MEDIUM</div>' : issue.priority === "low" ? '<div class="badge badge-neutral text-white">LOW</div>' : null}

</span>
</div>
     <div class="modal-action">
       <form method="dialog">
         <button class="btn">Close</button>
       </form>
     </div>
   </div>`;

      const modalLabels = document.querySelector(`#modal-${issue.id}-${tab}-labels`);

    for (label of issue.labels) {
      issueLabels.appendChild(labelBadges[label]);
      modalLabels.innerHTML += labelBadges[label].outerHTML; // Because appendChild() breaks issueLabels
    }
  }

  removeSpinner(c.spinner, issues.length);
}

function removeSpinner(spinnerParent, issueCount) {
  if (issueCount) {
    spinnerParent.innerHTML = "";
    spinnerParent.style.display = "none";
  } else {
    spinnerParent.innerHTML = "<p class='text-gray-500'>No issues found</p>";
  }
}

loadIssues();

const once = {
  once: true,
};

openTab.addEventListener("click", loadIssues, once);

closedTab.addEventListener("click", loadIssues, once);
