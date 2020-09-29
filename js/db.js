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
    }
  });
});
