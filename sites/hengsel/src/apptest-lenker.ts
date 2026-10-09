// hengsel.no/apptest: lenker og versjon for testversjonen av Hengsel Ute. Alt som siden kan trenge å få byttet, står her.
// En verdi som begynner med «TODO_» vises som deaktivert knapp («Lenke kommer») til den er fylt inn.
export const APPTEST = {
  versjon: "1.6.0",
  testflight: "TODO_TESTFLIGHT_LENKE",
  play: "TODO_PLAY_INTERNAL_TESTING_LENKE",
  apk: "https://expo.dev/artifacts/eas/BvyOesdnZzUkOMf47EDOJKT_tEBTWuQxCXqAiC8iU1I.apk", // versionCode 21
  epost: "test@hengsel.no",
};

export const erTodo = (verdi: string) => verdi.startsWith("TODO_");
