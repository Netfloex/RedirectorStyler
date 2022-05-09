const el = () => document.querySelector(".unified-theme");

el() && el().classList.add("theme-dark");

document.addEventListener("DOMContentLoaded", () => {
	el() && el().classList.add("theme-dark");
});
