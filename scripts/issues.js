async function loadIssues(status) {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const responseObject = await response.json();

  let issues = responseObject.data;

  if (status === "open") {
    let openIssues = issues.filter((d) => d.status === "open");
    console.log("oL", openIssues.length);
    displayIssues(openIssues, status);
  } else if (status === "closed") {
    let closedIssues = issues.filter((d) => d.status === "closed");
    console.log("cL", closedIssues.length);
    displayIssues(closedIssues, status);
  } else {
    displayIssues(issues, status);
  }
}

// <div class="card bg-base-100 sm:w-[50%] md:w-96 shadow-sm">
//                             <div class="card-body">
//                                 <div class="badge bg-green-500 badge-xs"></div>
//                                 <h2 class="card-title">
//                                     Card Title
//                                     <div class="badge badge-soft badge-error">HIGH</div>
//                                 </h2>
//                                 <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
//                                 <div class="card-actions justify-end">
//                                     <div class="badge badge-error text-white">Bug</div>
//                                     <div class="badge badge-warning text-white">Help Wanted</div>
//                                 </div>
//                                 <hr/>
//                                 <div class="issue-data">
//                                     <h6>John Doe</h6>
//                                     <h6>12/2/2026</h6>
//                                 </div>
//                             </div>

//                         </div>

const allIssues = document.querySelector("#all-issues");
const openIssues = document.querySelector("#open-issues");
const closedIssues = document.querySelector("#closed-issues");

function displayIssues(issues, status) {
  for (issue of issues) {
      
    let issueCard = Object.assign(document.createElement("div"), {
      className: "card bg-base-100 shadow-sm",
    });

    if (status === "open") {
      openIssues.appendChild(issueCard);
    } else if (status === "closed") {
      closedIssues.appendChild(issueCard);
    } else {
      allIssues.appendChild(issueCard);
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

    const issueCreatedAt = new Date(issue.createdAt);

    let issueData = Object.assign(document.createElement("div"), {
      className: "issue-data",
      innerHTML: `<h6>${issue.author}</h6><h6>${issueCreatedAt.toDateString()}</h6>`,
    });

    issueCard.appendChild(issueBody);

    if (issue.status === "open") {
      topBadges.appendChild(openBadge);
    } else {
      topBadges.appendChild(closedBadge);
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

    for (label of issue.labels) {
      issueLabels.appendChild(labelBadges[label]);
    }
  }
}

loadIssues();

const openTab = document.querySelector("#open-tab");
const closedTab = document.querySelector("#closed-tab");

openTab.addEventListener("click", () => {
  loadIssues("open");
});

closedTab.addEventListener("click", () => {
  loadIssues("closed");
});
