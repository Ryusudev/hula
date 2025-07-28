document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location').value.toLowerCase();
    const bloodGroup = document.getElementById('bloodGroup').value;

    db.collection("donors").where("bloodGroup", "==", bloodGroup).get()
        .then(snapshot => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            snapshot.forEach(doc => {
                const donor = doc.data();
                if (donor.location.toLowerCase().includes(location)) {
                    resultsDiv.innerHTML += `<p>${donor.name} (${donor.phone}) - ${donor.location}</p>`;
                }
            });
        });
});
