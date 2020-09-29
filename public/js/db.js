// offline data
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    // check for multiple tabs
    console.log("presistence failed");
  } else if (err.code == "unimplemented") {
    //lack of browser support
    console.log("persisitence is not avialable");
  }
});

// Real - time listener
// 1. Connectionn to database
db.collection("recipes").onSnapshot((snapshot) => {
  // send back snapshot with changes
  // TEST : console.log(snapshot.docChanges());

  snapshot.docChanges().forEach((change) => {
    // Captures event, data, and document id
    // TEST : console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      // add the documnet data to the web page
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault(); // prevent refresh

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));

  form.title.value = "";
  form.ingredients.value = "";
});

// Deletea a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName == "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
