const eventId = 2; // Replace with the default event ID if needed

document.addEventListener('DOMContentLoaded', () => {
    const participantForm = document.getElementById('participantForm');
    const eventNameSelect = document.getElementById('eventNameSelect');
    const participantNameInput = document.getElementById('participantName');
    const participantPhoneInput = document.getElementById('participantPhone');

    // Function to fetch events from the server and populate the select dropdown
    async function fetchEvents() {
        try {
            const response = await fetch('http://localhost:3000/api/events');
            const events = await response.json();

            // Populate the event select dropdown
            eventNameSelect.innerHTML = '';
            events.forEach(event => {
                const option = document.createElement('option');
                option.value = event.id;
                option.textContent = event.name;
                eventNameSelect.appendChild(option);
            });

            // After updating the dropdown, you can optionally select the first event by default
            if (events.length > 0) {
                eventNameSelect.selectedIndex = 0;
                const selectedEventId = eventNameSelect.value;
                fetchParticipants(selectedEventId); // Fetch participants for the selected event
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    // Initial fetch of events when the participant page loads
    fetchEvents();

    async function fetchParticipants(eventId) {
        try {
            const url = `http://localhost:3000/api/participants/${eventId}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Error fetching participants.');
            }

            const participants = await response.json();
            // Handle the retrieved participants data (e.g., update the UI)
            console.log(participants);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    }

    // Event listener for the event dropdown to fetch participants for the selected event
    eventNameSelect.addEventListener('change', () => {
        const selectedEventId = eventNameSelect.value;
        fetchParticipants(selectedEventId);
    });

    participantForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const eventId = eventNameSelect.value;
        const participantName = participantNameInput.value;
        const participantPhone = participantPhoneInput.value;

        if (eventId.trim() !== '' && participantName.trim() !== '' && participantPhone.trim() !== '') {
            const url = 'http://localhost:3000/api/participants'; // Replace with the actual server address and port

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eventId, name: participantName, phoneNumber: participantPhone }),
                });

                if (response.status === 201) {
                    alert('Participant registered successfully.');
                    participantNameInput.value = '';
                    participantPhoneInput.value = '';
                    // Redirect to the participants.html page
                    window.location.href = 'participants.html';
                } else {
                    console.error('Participant registration failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error registering participant:', error);
            }
        } else {
            alert('Please fill in all participant fields and select an event.');
        }



    });
});
