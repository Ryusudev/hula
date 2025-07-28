// 🔍 SEARCH for Donors
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const locationInput = document.getElementById('searchLocation').value.toLowerCase().trim();
    const bloodGroupInput = document.getElementById('searchBloodGroup').value;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Searching...</p>';

    if (!bloodGroupInput) {
        resultsDiv.innerHTML = '<p>Please select a blood group.</p>';
        return;
    }

    db.collection("donors").where("bloodGroup", "==", bloodGroupInput).get()
        .then(snapshot => {
            if (snapshot.empty) {
                resultsDiv.innerHTML = '<p>No donors found for that blood group.</p>';
                return;
            }

            let found = false;
            resultsDiv.innerHTML = '';

            snapshot.forEach(doc => {
                const donor = doc.data();
                const donorLocation = donor.location.toLowerCase();

                if (donorLocation.includes(locationInput)) {
                    found = true;
                    resultsDiv.innerHTML += `
                        <p>
                            <strong>${donor.name}</strong> - 
                            ${donor.phone} - 
                            ${donor.bloodGroup} - 
                            ${donor.location}
                        </p>
                    `;
                }
            });

            if (!found) {
                resultsDiv.innerHTML = '<p>No donors found in that location.</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching donors:", error);
            resultsDiv.innerHTML = '<p>Error searching. Please try again later.</p>';
        });
});


// 🩸 REGISTER a Donor
document.getElementById('donorForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const donor = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        location: document.getElementById('location').value.trim(),
        bloodGroup: document.getElementById('bloodGroup').value
    };

    if (!donor.name || !donor.phone || !donor.location || !donor.bloodGroup) {
        alert("Please fill in all fields.");
        return;
    }

    db.collection("donors").add(donor)
        .then(() => {
            alert("Donor Registered Successfully!");
            document.getElementById('donorForm').reset();
        })
        .catch(error => {
            console.error("Error adding donor:", error);
            alert("Something went wrong. Please try again.");
        });
});
