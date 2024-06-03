document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log('Form submitted:', data);
    // No event.preventDefault() here
});


// Function to fetch address details based on pin code
function getAddressDetails(pincode) {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data[0] && data[0].PostOffice && data[0].PostOffice.length > 0) {
                const postOffice = data[0].PostOffice[0];

                const district = postOffice.District;
                const state = postOffice.State;
                const country = postOffice.Country;

                document.getElementById('district').value = district;
                document.getElementById('state').value = state;
                document.getElementById('country').value = country;

                // Populate post office dropdown with fetched post office names
                const postOfficeSelect = document.getElementById('postOffice');
                postOfficeSelect.innerHTML = '<option value="">Select post office</option>';
                data[0].PostOffice.forEach(postOffice => {
                    const option = document.createElement('option');
                    option.value = postOffice.Name;
                    option.textContent = postOffice.Name;
                    postOfficeSelect.appendChild(option);
                });

                // Populate village dropdown with fetched village names
                const villageSelect = document.getElementById('village');
                villageSelect.innerHTML = '<option value="">Select village</option>';
                data[0].PostOffice.forEach(postOffice => {
                    const option = document.createElement('option');
                    option.value = postOffice.Name;
                    option.textContent = postOffice.Name;
                    villageSelect.appendChild(option);
                });
            } else {
                alert('No data found for the entered pin code.');
            }
        })
        .catch(error => {
            console.error('Error fetching address details:', error);
            alert('Error fetching address details. Please try again later.');
        });
}

// Event listener to fetch address details when pin code is entered
document.getElementById('pincode').addEventListener('blur', function() {
    const pincode = this.value.trim();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
        getAddressDetails(pincode);
    } else {
        alert('Please enter a valid 6-digit pin code.');
    }
});
