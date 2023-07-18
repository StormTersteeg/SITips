function toggleBackButton(is_visible) {
  var target = document.getElementById("back");
  if (is_visible) {
    target.classList.remove("hidden");
  } else {
    target.classList.add("hidden");
  }
}

function setBackButtonTarget(target) {
  var back_button = document.getElementById("back");
  back_button.setAttribute("onclick", target);
}

function loadCategories() {
  var target = document.getElementById("app");
  target.innerHTML = "";

  var html_string = "";

  for (var i = 0; i < database.length; i++) {
    var category = database[i].category;
    var icon = database[i].icon;
    html_string += `
      <tile
        onclick="loadCategory(${i})"
        ontouchstart="loadCategory(${i})"
      >
        ${category}
        <span class="material-icons ml-1">${icon}</span>
      </tile>
    `;
  }

  target.innerHTML = html_string;
  toggleBackButton(false);
}

function loadCategory(index) {
  var target = document.getElementById("app");
  target.innerHTML = "";

  var html_string = "";

  // for each tip in category
  for (var i = 0; i < database[index].tips.length; i++) {
    var title = database[index].tips[i].title;
    var content = database[index].tips[i].content;
    html_string += `
      <tile
        onclick="showTip(${index}, ${i})"
        ontouchstart="showTip(${index}, ${i})"  
      >
        ${title}
      </tile>
    `;
  }

  target.innerHTML = html_string;
  toggleBackButton(true);
  setBackButtonTarget("loadCategories()");
}

function showTip(category_index, tip_index) {
  var target = document.getElementById("app");
  target.innerHTML = "";

  var html_string = "";
  html_string += `
    <info>
      <div class="ml-2">
        <h1>${database[category_index].tips[tip_index].title}</h1>
        <p>${database[category_index].tips[tip_index].content}</p>
      </div>
    </info>
  `;

  target.innerHTML = html_string;
  toggleBackButton(true);
  setBackButtonTarget("loadCategory(" + category_index + ")");
}

loadCategories();