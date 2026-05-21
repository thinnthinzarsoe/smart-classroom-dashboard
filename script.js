import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAY8zuKaolFgke8BUCW4wC00lntnBOckiE",
  databaseURL: "https://smartclassroomnoisesystem-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function updateGroup(groupName, prefix) {
  const groupRef = ref(database, "groups/" + groupName);

  onValue(groupRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      document.getElementById(prefix + "-status").textContent = data.status || "N/A";
      document.getElementById(prefix + "-score").textContent = data.score ?? 0;
      document.getElementById(prefix + "-sound").textContent = data.lastsound ?? 0;

      const card = document.getElementById(prefix + "-card");
      card.classList.remove("GREEN", "YELLOW", "RED");

      if (data.status) {
        card.classList.add(data.status);
      }
    }
  });
}

updateGroup("groupA", "groupA");
updateGroup("groupB", "groupB");