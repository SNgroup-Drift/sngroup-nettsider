/**
 * Lysboksen på forsiden: klikk på et skjermbilde ([data-zoom]) åpner det i full størrelse.
 * Escape, klikk på bildet eller «×» lukker. Fasit: lysboksen i docs/design/hengsel/51 Hengsel nettside.dc.html.
 */
const dialog = document.querySelector<HTMLDialogElement>("[data-lysboks]");
if (dialog) {
  const img = dialog.querySelector("img")!;
  document.addEventListener("click", (e) => {
    const knapp = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-zoom]");
    if (!knapp) return;
    const bilde = knapp.querySelector("img")!;
    img.src = bilde.currentSrc || bilde.src;
    img.alt = bilde.alt;
    dialog.showModal();
  });
  dialog.addEventListener("click", () => dialog.close());
}
