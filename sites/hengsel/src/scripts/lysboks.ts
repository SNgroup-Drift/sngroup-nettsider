/**
 * Lysboksen på forsiden: klikk på et skjermbilde ([data-zoom]) åpner det forstørret, i full størrelse (data-full).
 * Escape, klikk hvor som helst eller «×» lukker. Fasit: lysboksen i docs/design/hengsel/56 Hengsel forside.dc.html.
 */
const dialog = document.querySelector<HTMLDialogElement>("[data-lysboks]");
if (dialog) {
  const img = dialog.querySelector("img")!;
  document.addEventListener("click", (e) => {
    const knapp = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-zoom]");
    if (!knapp) return;
    const bilde = knapp.querySelector("img")!;
    img.src = bilde.dataset.full || bilde.currentSrc || bilde.src;
    img.alt = bilde.alt;
    dialog.showModal();
  });
  dialog.addEventListener("click", () => dialog.close());
}
