// Function to toggle visibility and animation
function toggleVisibility(sectionId) {
  var section = document.getElementById(sectionId);
  
  if (section.style.display === 'block') {
    section.style.display = 'none';
    section.classList.remove('fade-in'); // Remove animation
  } else {
    section.style.display = 'block';
    section.classList.add('fade-in'); // Add animation
  }
}

// Event listeners for "Thanks" and "Contact" buttons
document.getElementById('thanksBtn').addEventListener('click', function() {
  toggleVisibility('thanks');
});

document.getElementById('contactBtn').addEventListener('click', function() {
  toggleVisibility('contact');
});
