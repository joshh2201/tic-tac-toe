function showForm() {
  const formDiv = this.nextElementSibling;
  [...document.querySelectorAll('form')].forEach((form) => {
    form.style.display = '';
  });
  formDiv.style.display = 'block';
}

[...document.querySelectorAll('.toggle')].forEach((btn) => {
  btn.addEventListener('click', showForm);
});
