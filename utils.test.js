import { filterData, filterByType } from './utils.js'

describe("filterData", () => {
  it("filtre par titre", () => {
    const globalData = [
      { titre: "Astérix", auteur: "Goscinny" },
      { titre: "Naruto", auteur: "Kishimoto" }
    ];
    let resultat;
    const afficher = (donnees) => { resultat = donnees; }; // on récupère ce qui est passé à afficher
    const e = { target: { value: "naruto" } };

    filterData(e, globalData, afficher);

    expect(resultat).toEqual([{ titre: "Naruto", auteur: "Kishimoto" }]);
  });
});


describe("filterByType", () => {
  const data = [
    { titre: "Astérix", type_de_document: "Bande dessinée jeunesse" },
    { titre: "Naruto", type_de_document: "Bande dessinée ado" },
    { titre: "Watchmen", type_de_document: "Bande dessinée adulte" }
  ];

  const chargerDonnees = () => Promise.resolve(data); // simule le fetch, sans vraiment aller sur le réseau

  it("affiche tout si checkbox[0] est cochée", async () => {
    let resultat;
    const afficher = (donnees) => { resultat = donnees; };
    const checkbox = [{ checked: true }, { checked: false }, { checked: false }, { checked: false }];

    await filterByType(checkbox, chargerDonnees, afficher);

    expect(resultat).toEqual(undefined); // afficher() est appelée sans argument
  });

  it("filtre les BD jeunesse si checkbox[1] est cochée", async () => {
    let resultat;
    const afficher = (donnees) => { resultat = donnees; };
    const checkbox = [{ checked: false }, { checked: true }, { checked: false }, { checked: false }];

    await filterByType(checkbox, chargerDonnees, afficher);

    expect(resultat).toEqual([{ titre: "Astérix", type_de_document: "Bande dessinée jeunesse" }]);
  });

  it("filtre les BD ado si checkbox[2] est cochée", async () => {
    let resultat;
    const afficher = (donnees) => { resultat = donnees; };
    const checkbox = [{ checked: false }, { checked: false }, { checked: true }, { checked: false }];

    await filterByType(checkbox, chargerDonnees, afficher);

    expect(resultat).toEqual([{ titre: "Naruto", type_de_document: "Bande dessinée ado" }]);
  });

  it("filtre les BD adulte si checkbox[3] est cochée", async () => {
    let resultat;
    const afficher = (donnees) => { resultat = donnees; };
    const checkbox = [{ checked: false }, { checked: false }, { checked: false }, { checked: true }];

    await filterByType(checkbox, chargerDonnees, afficher);

    expect(resultat).toEqual([{ titre: "Watchmen", type_de_document: "Bande dessinée adulte" }]);
  });

  it("affiche un tableau vide si aucune checkbox n'est cochée", async () => {
    let resultat;
    const afficher = (donnees) => { resultat = donnees; };
    const checkbox = [{ checked: false }, { checked: false }, { checked: false }, { checked: false }];

    await filterByType(checkbox, chargerDonnees, afficher);

    expect(resultat).toEqual([]);
  });
});