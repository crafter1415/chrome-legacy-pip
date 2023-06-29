// Copyright 2018 mkm75 -- Original by Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
  chrome.contextMenus.create({
    id: 'pip',
    title: 'Picture in picture'
  });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.checked) return;
  if (info.menuItemId !== 'pip') return;
  chrome.tabs.sendMessage(tab.id, "resetClickedEl", {frameId: info.frameId}, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      world: "MAIN",
      files: ["script.js"]
    });
  })
})

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get({ optOutAnalytics: false }, (results) => {
    const files = results.optOutAnalytics
      ? ["script.js"]
      : ["script.js", "ga.js"];
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      world: "MAIN",
      files
    });
  });
});
