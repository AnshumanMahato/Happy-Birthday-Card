export default function (page) {
  document.title = page.title;
  document.body.innerHTML = page.body;
  document.body.classList.add("page-404");
}
