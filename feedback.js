const form = document.getElementById('feedbackForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const formData = new FormData(form);

  sendDataToBackend(formData);
});

function sendDataToBackend(formData) {
    
  fetch('http://your-backend-url.com/send-feedback', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert('Feedback submitted successfully!');
      form.reset(); 
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error submitting feedback. Please try again later.');
  });
}
