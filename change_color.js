  
    var doWork = function () {
        //showmore();
        var employers = document.getElementsByClassName('business')
        var locations = document.getElementsByClassName('location')
        
    var namesInWebsite = []
    var locationLetters = []

    for (var i = 0; i < employers.length; i++) {
        namesInWebsite.push(employers[i].innerText);
        locationLetters.push(locations[i].innerText.split('(')[1].slice(0, 2).toLowerCase())
        //console.log(locationLetters)
    }
    var url = chrome.runtime.getURL('designated-employers.json');
    fetch(url)
        .then((response) => response.json())
        .then(function (json) {
            var biggerWord = "";
            var smallerWord = "";

            
            var jsonWord = "";
            var namesWord = "";

            var root = ""
            
            //console.log(json.results.ns)
            for (var i = 0; i < namesInWebsite.length; i++) {
                
                var loc = locationLetters[i];
                //console.log(loc)
                if (loc === "nb") {
                    root = json.results.nb;
                }
                else if (loc === "ns") {
                    root = json.results.ns;
                }
                else if (loc === "nl") {
                    root = json.results.nl;
                }
                else if (loc === "pe") {
                    root = json.results.pe;
                }
                var jsonSize = root.length
                namesWord = namesInWebsite[i];
                //console.log(namesWord)
                

                for (var j = 0; j < jsonSize; j++) {

                    item = root[j]
                    jsonWord = item.name
                    //console.log(jsonWord)
                    
                    var aa= jsonWord.split(" ").join("").toLowerCase();
                    var bb= namesWord.split(" ").join("").toLowerCase();
                    
                    //console.log(jsonWord.slice(0, namesWord.length))

                    if (aa.slice(0, bb.length) === bb) {
                        employers[i].style.backgroundColor = "#0F0"
                        break;
                    } else if (bb.slice(0, aa.length) === aa) {
                        employers[i].style.backgroundColor = "#0F0"
                        break;
                    }else{
                        employers[i].style.backgroundColor = "#F00"
                        
                    }
                }
                
            }
        });
    }
    doWork()

