const skillForm = document.getElementById('skillForm');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting normally
  const skillName = document.getElementById('skillName').value;
  const data = { name: skillName };
  fetch('/addSkill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Skill added successfully');
    const skillList = document.getElementById('skillList');
    const skillItem = document.createElement('li');
    skillItem.textContent = skillName;
    skillItem.style.color = 'green'; // Set the color to green
    skillList.appendChild(skillItem);
  })
  .catch(error => console.error(error));
});
