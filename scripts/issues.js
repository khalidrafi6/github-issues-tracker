const allIssues = document.querySelector("#all-issues");
const openIssues = document.querySelector("#open-issues");
const closedIssues = document.querySelector("#closed-issues");

// Corresponding parent divs to attach spinner
const allIssuesSection = document.querySelector("#all-issues-section");
const openIssuesSection = document.querySelector("#open-issues-section");
const closedIssuesSection = document.querySelector("#closed-issues-section");

const allIssuesSpinner = document.querySelector('#all-issues-spinner');
const openIssuesSpinner = document.querySelector('#open-issues-spinner');
const closedIssuesSpinner = document.querySelector('#closed-issues-spinner');

async function loadIssues(status) {

    const response = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );

    const responseObject = await response.json();

    let issues = responseObject.data;
    
  if (status === "open") {

    let openIssues = issues.filter((d) => d.status === "open");
    displayIssues(openIssues, status);
  } else if (status === "closed") {

    let closedIssues = issues.filter((d) => d.status === "closed");
    displayIssues(closedIssues, status);
  } else {

    displayIssues(issues, status);
  }
}

function displayIssues(issues, status) {
  for (issue of issues) {
    let issueCard = Object.assign(document.createElement("div"), {
      id: `issue-${issue.id}`,
      className: "card bg-base-100 shadow-sm border-transparent border-4",
    });

    const issueCreatedAt = new Date(issue.createdAt);
    const issueDateSegments = issueCreatedAt.toDateString().split(" ");
    const issueMonthAndDay = issueDateSegments[1] + " " + issueDateSegments[2];
    issueDateSegments.splice(1, 2, issueMonthAndDay);
    const issueFDate = issueDateSegments.join(", ");

    let issueModal = Object.assign(document.createElement("dialog"), {
      id: `issue_${issue.id}_modal`,
      className: "modal",
    });

    issueCard.addEventListener("click", () => {
      issueModal.showModal();
    });

    if (status === "open") {
        openIssues.appendChild(issueCard);
        const spinner = openIssuesSpinner;
    } else if (status === "closed") {
      closedIssues.appendChild(issueCard);
        const spinner = closedIssuesSpinner;
    } else {
      allIssues.append(issueCard, issueModal);
        const spinner = allIssuesSpinner;
    }

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
      className: "badge badge-accent text-white",
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
      className: "card-actions justify-end",
    });

    let issueDivider = document.createElement("hr");

    let issueData = Object.assign(document.createElement("div"), {
      className: "issue-data",
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
<h6>
${issue.status === "open" ? '<span class="badge bg-green-500 text-white">Open</span>' : '<h6><span class="badge bg-purple-500 text-white">Closed</span>'} | Opened by ${issue.author} | ${issueFDate}
</h6>
<p id="modal-${issue.id}-labels" class="flex gap-1 mt-4">
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
         <!-- if there is a button in form, it will close the modal -->
         <button class="btn">Close</button>
       </form>
     </div>
   </div>`;

    const modalLabels = document.querySelector(`#modal-${issue.id}-labels`);

    for (label of issue.labels) {

        issueLabels.appendChild(labelBadges[label]);
        modalLabels.innerHTML += labelBadges[label].outerHTML; // Because appendChild() breaks issueLabels
        
    }

    // spinner.remove();
  }
}

loadIssues();

const openTab = document.querySelector("#open-tab");
const closedTab = document.querySelector("#closed-tab");
const once = {
  once: true,
};

openTab.addEventListener(
  "click",
  () => {
    loadIssues("open");
  },
  once,
);

closedTab.addEventListener(
  "click",
  () => {
    loadIssues("closed");
  },
  once,
);
