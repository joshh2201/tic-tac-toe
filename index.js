/* eslint-disable no-undef */
function showForm() {
  const formDiv = this.nextElementSibling;
  const formShowing = formDiv.style.display === 'block';
  [...document.querySelectorAll('form')].forEach((form) => {
    // eslint-disable-next-line no-param-reassign
    form.style.display = '';
  });
  if (!formShowing) {
    formDiv.style.display = 'block';
  }
}

[...document.querySelectorAll('.toggle')].forEach((btn) => {
  btn.addEventListener('click', showForm);
});
