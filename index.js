function showForm() {
  const formDiv = this.nextElementSibling;
  const formShowing = formDiv.style.display === 'block';
  [...document.querySelectorAll('form')].forEach((form) => {
    form.style.display = '';
  });
  if (!formShowing) {
    formDiv.style.display = 'block';
  }
}

[...document.querySelectorAll('.toggle')].forEach((btn) => {
  btn.addEventListener('click', showForm);
});
