document.getElementById("id_Get").onclick = () => {
    chrome.runtime.sendMessage({method: "clear"}, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: getDocumentInfo
        },()=>{
          if (chrome.runtime.lastError) {
            document.getElementById("response_space").innerHTML = "Error: " + chrome.runtime.lastError.message;
          } 
          else{
            chrome.runtime.sendMessage({method: "get"}, (response) => {
              document.getElementById("response_space").innerHTML = response.value;
            });
          }
        });
      });
    });
  }
  
  function getDocumentInfo(){
    let TITLE_anime = document.getElementsByClassName('breadcrumb-item')[1].textContent;
  
    let message = TITLE_anime;
                  
    chrome.runtime.sendMessage({method: "set", value: message}, () => {
    });
  }