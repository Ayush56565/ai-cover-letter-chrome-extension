/*global chrome*/

const linkedInListViewURL = "https://www.linkedin.com/jobs/collections";
const linkedInDetailView = "https://www.linkedin.com/jobs/view";
function getJobDescriptionClassNameL(url) {
  return url.startsWith(linkedInListViewURL)
    ? "jobs-search__job-details--container"
    : "jobs-description-content__text";
}

const indeedIndiaURL = "https://in.indeed.com/jobs";
function getJobDescriptionClassNameIN(url) {
  return "jobsearch-jobDescriptionText";
}
const indeedUSURL = "https://indeed.com/jobs";
function getJobDescriptionClassNameUS(url) {
  return "jobsearch-jobDescriptionText";
}

function grabJobDescription(className) {
  const jobDetailsContainer = document.body.querySelector(`.${className}`);
  const jobDetails = jobDetailsContainer.textContent;
  const cleanedJobDetails = jobDetails.replace(/\s\s+/g, " ");
  console.log(cleanedJobDetails);
  return cleanedJobDetails;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    if (
      tab.url?.startsWith(linkedInListViewURL) ||
      tab.url?.startsWith(linkedInDetailView)
    ) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          func: grabJobDescription,
          args: [getJobDescriptionClassNameL(tab.url)],
        })
        .then((queryResult) => {
          chrome.storage.local.set({ jobDescription: queryResult[0].result });
        });
    }

    if (
      tab.url?.startsWith(indeedIndiaURL)
    ) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          func: grabJobDescription,
          args: [getJobDescriptionClassNameIN(tab.url)],
        })
        .then((queryResult) => {
          chrome.storage.local.set({ jobDescription: queryResult[0].result });
        });
    }
    if (
      tab.url?.startsWith(indeedUSURL)
    ) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          func: grabJobDescription,
          args: [getJobDescriptionClassNameUS(tab.url)],
        })
        .then((queryResult) => {
          chrome.storage.local.set({ jobDescription: queryResult[0].result });
        });
    }
  }
});
