document.getElementById("form").style.display = "none";

//adding new note item
document.getElementById("noteButton").addEventListener("click", function () {
  var x = document.getElementById("form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  const note = document.getElementById("noteInput").value;
  const title = document.getElementById("noteTitle").value;

  if (note != "" && title != "") {
    var noteList = JSON.parse(localStorage.getItem("note-list"));
    if (noteList == null) {
      noteList = [];
    }
    var newNote = {
      title: title,
      note: note,
    };
    noteList.push(newNote);
    localStorage.setItem("note-list", JSON.stringify(noteList));
    fetchNoteItems();
  }

  document.getElementById("noteInput").value = "";
  document.getElementById("noteTitle").value = "";
});

//fetches all note items from local storage
function fetchNoteItems() {
  var notesList = JSON.parse(localStorage.getItem("note-list"));
  if (notesList == null) {
    notesList = [];
  }
  // add to list
  let list = document.querySelector("ul.note-list");
  list.innerHTML = "";
  var newItemHTML = "";
  notesList.forEach((noteitem, i) => {
    newItemHTML += `<li data-itemindex="${i}" id="noteli" >
        <div >
          <h2 class="item"> ${noteitem.title}</h2> 
          <p class="item"> ${noteitem.note}</p>
        </div>
        <span class="NoteitemDelete">
          <span class="material-icons">delete</span>
        </span>  
    </li>`;
  });

  list.innerHTML = newItemHTML;

  //adding event listerners to save, delte buttons
  var deletelist = document.querySelectorAll(".NoteitemDelete");
  for (var i = 0; i < deletelist.length; i++) {
    deletelist[i].addEventListener("click", function () {
      var index = this.parentNode.parentNode.dataset.itemindex;
      itemDelete(index);
    });
  }
}

//function to handle onclick event of delete button
function itemDelete(index) {
  const itemStorage = localStorage.getItem("note-list");
  const itemArr = JSON.parse(itemStorage);

  itemArr.splice(index, 1);
  saveItems(itemArr);

  fetchNoteItems();
}

function saveItems(obj) {
  const itemJson = JSON.stringify(obj);

  localStorage.setItem("note-list", itemJson);
}

fetchNoteItems();
