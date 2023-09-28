// event.js

document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');

    eventForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;

        if (eventName.trim() !== '' && eventDate.trim() !== '') {
            try {
                const response = await fetch('http://localhost:3000/api/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: eventName, date: eventDate }),
                });

                if (response.status === 201) {
                    alert('Event created successfully.');
                    eventNameInput.value = '';
                    eventDateInput.value = '';
                } else {
                    console.error('Event creation failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating event:', error);
            }
        } else {
            alert('Please fill in all event fields.');
        }
    });
});
