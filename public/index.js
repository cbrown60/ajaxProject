var app = function(){

var url = 'https://restcountries.eu/rest/v2'
makeRequest(url, requestComplete)


}

var requestComplete = function(){
 if(this.status !== 200) return
  //grab the response text
var jsonString = this.responseText
var countries = JSON.parse(jsonString)
populateList(countries)
}

var borderRequestComplete = function(){
   if(this.status !== 200) return
    //grab the response text
  var jsonString = this.responseText
  var country = JSON.parse(jsonString)
  return country
}

var populateList = function(countries){
  var select = document.querySelector('#country-list')
  console.log(select)
  countries.forEach(function(country, index){
    var option = document.createElement('option')
    option.setAttribute('value', index)
    option.text = country.name
    select.appendChild(option)

  })
  select.onchange = function (e){ 
    countryChange(countries, e) 
    }

    var startIndex = JSON.parse(localStorage.getItem('countryToLoad'))
    countryPrinter(countries[startIndex])
}

var makeRequest = function(url,callback){
 
  //create a new XMLHttpRequest object 
  var request = new XMLHttpRequest()
  //make a get request 
  request.open("GET", url)
  //tell it what function to run once complete
  request.onload = callback
  //send the request 
  request.send()
    
  }

var countryPrinter = function(arrayElement){
  var pTag = document.querySelector("#select-result")
  pTag.innerText = 'Country name: '+ arrayElement.name + '\n' + ' Capital City ' + arrayElement.capital + '\n' + 'Population: '+ arrayElement.population 
  var divTag = document.querySelector('#flags')
  var flag = document.createElement('img')
  flag.width = 100
  flag.src = arrayElement.flag
  if (divTag.childNodes[0] != undefined){
  divTag.removeChild(divTag.childNodes[0])
    }
  divTag.appendChild(flag)
  populateBorderList(arrayElement)
}

  var countryChange = function(countries, e){
    // var pTag = document.querySelector("#select-result")
    var index = e.target.value
    countryPrinter(countries[index])
    // pTag.innerText = 'Country name: '+ countries[index].name + ', Capital City ' + countries[index].capital +', Population: '+ countries[index].population 
//make these go on seperate lines
    var indexToSave = window.JSON.stringify(index)
    localStorage.setItem('countryToLoad', indexToSave)
  }

  var populateBorderList = function(country){
    var borderingCountryCodes = country.borders
    var borderingCountryURLs = []
    borderingCountryCodes.forEach(function(code){
      var newUrl =  'https://restcountries.eu/rest/v2/alpha/' + code
      borderingCountryURLs.push(newUrl)

    })
    var borderingCountries = []
    borderingCountryURLs.forEach(function(url){
      borderingCountries.push(makeRequest(url,borderRequestComplete))
    })

    var select = document.querySelector('#border-list')
    borderingCountryURLs.forEach(function(country, index){
      var option = document.createElement('option')
      option.setAttribute('value', index)
      option.text = country.name
      select.appendChild(option)

    })

    }
  






window.onload = app



//var button = document.querySelector('button');
// button.onclick = makeRequest(url, requestComplete)

// var populateList = function(countries){
//   var ul = document.querySelector('#country-list')
//   countries.forEach(function(country){
//     var li = document.createElement('li')
//     // li.innerText = country.name
//     var flag = document.createElement('img')
//     flag.width ='20'
//     flag.src = country.flag
//     li.appendChild(flag)
//     ul.appendChild(li)
//   })