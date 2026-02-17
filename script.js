let moods = JSON.parse(localStorage.getItem("moods")) || [];

function saveMood() {
    const mood = document.getElementById("mood").value;
    const note = document.getElementById("note").value;
    const date = new Date().toLocaleDateString();

    moods.push({ mood, note, date });
    localStorage.setItem("moods", JSON.stringify(moods));

    document.getElementById("note").value = "";
    displayMoods();
}

function displayMoods() {
    const moodList = document.getElementById("moodList");
    moodList.innerHTML = "";

    const today = new Date().toLocaleDateString();

    moods
        .filter(entry => entry.date === today)
        .forEach(entry => {
            const li = document.createElement("li");
            li.innerHTML = `${entry.mood} - ${entry.note}`;
            moodList.appendChild(li);
        });

    showSummary();
}

function showSummary() {
    const summaryDiv = document.getElementById("summary");
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    let moodCount = {};

    moods.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate >= last7Days) {
            moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
        }
    });

    let summaryText = "";
    for (let mood in moodCount) {
        summaryText += `${mood}: ${moodCount[mood]} days<br>`;
    }

    summaryDiv.innerHTML = summaryText || "No data for this week.";
}

displayMoods();
