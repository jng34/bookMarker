let myBookMarks = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('save-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const bkMarksFromLocalStorage = JSON.parse(localStorage.getItem('myBookMarks'))
const tabBtn = document.getElementById('tab-btn');

if (bkMarksFromLocalStorage) {
  myBookMarks = bkMarksFromLocalStorage
  render(myBookMarks)
}

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myBookMarks.push(tabs[0].url)
    localStorage.setItem("myBookMarks", JSON.stringify(myBookMarks))
    render(myBookMarks)
  })

})

function render(bkmarks) {
  let listItems = ''
  for (let mark of bkmarks) {
    listItems += `
      <li>
        <a href='${mark}' target="_blank">
          ${mark}
        </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click", function() {
  myBookMarks.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem("myBookMarks", JSON.stringify(myBookMarks))
  render(myBookMarks);
})

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myBookMarks = []
  render(myBookMarks);
})







