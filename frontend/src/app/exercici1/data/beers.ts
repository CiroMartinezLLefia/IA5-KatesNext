export interface Beer {
  id: string;
  name: string;
  brewery: string;
  origin: string;
  style: string;
  abv: number;
  description: string;
  longDescription: string;
  tastingNotes: string;
  ingredients: string[];
  pairing: string[];
  image: string;
}

export const beers: Beer[] = [
  {
    id: "espiga-blonde-ale",
    name: "Espiga Blonde Ale",
    brewery: "Cervesera Espiga",
    origin: "Sant Llorenç d'Hortons, Alt Penedès",
    style: "Blonde Ale",
    abv: 4.5,
    description: "Cervesa artesana rossa, fresca i de perfil cítric i floral.",
    longDescription: "La Blonde Ale de la Cervesera Espiga és una cervesa daurada i brillant, d'alta fermentació, ideal per a qualsevol ocasió. Destaca per la seva claredat i un cap d'escuma blanc persistent. Ha estat elaborada seguint receptes tradicionals però amb l'aportació de llúpols moderns que li atorgen notes cítriques molt agradables.",
    tastingNotes: "Aroma cítric amb pinzellades de fruita groga i malt dolç. En boca és refrescant, amb un amargor molt suau i final net.",
    ingredients: ["Aigua", "Malta d'ordi (Pilsner, Caramunich)", "Llúpol (Cascade, Amarillo)", "Llevat"],
    pairing: ["Amanides fresques", "Formatges suaus", "Peix blanc a la planxa", "Tapes mediterrànies"],
    image: "/images/espiga.jpg"
  },
  {
    id: "marina-devil-ipa",
    name: "Devil's IPA",
    brewery: "Cerveses Marina",
    origin: "Blanes, Selva",
    style: "IPA (India Pale Ale)",
    abv: 6.5,
    description: "Una clàssica IPA de la costa brava, amarga, afruitada i amb cos.",
    longDescription: "Devil's IPA és un dels vaixells insígnia de Cerveses Marina. Una cervesa pensada per als amants del llúpol, amb una bona base de malt que equilibra el fort caràcter amarg i aromàtic. Presenta un color coure intens amb escuma cremosa.",
    tastingNotes: "Aroma intens de resina de pi, aranja i fruites tropicals (mango, passionera). En boca té un pas dens, amargor persistent i un final sec.",
    ingredients: ["Aigua", "Malta d'ordi (Pale Ale, Crystal)", "Llúpol (Simcoe, Centennial)", "Llevat"],
    pairing: ["Menjar picant (mexicà/indi)", "Hamburgueses completes", "Formatges curats", "Embotits ibèrics"],
    image: "/images/marina.jpg"
  },
  {
    id: "guineu-amarillo",
    name: "Guineu IPA Amarillo",
    brewery: "Ca l'Arenys",
    origin: "Valls de Torroella, Bages",
    style: "American IPA",
    abv: 6.5,
    description: "Single Hop IPA monovarietal amb el cobejat llúpol Amarillo.",
    longDescription: "Una cervesa de culte dins del panorama artesanal català. Elaborada exclusivament amb el llúpol Amarillo, destaca per mostrar tota la complexitat d'aquesta varietat: des de matisos cítrics fins a notes florals i florals de préssec.",
    tastingNotes: "Domini absolut d'aromes a préssec en almívar, taronja i aranja. En boca és rodona, amb un amargor de fons herba-cítric molt equilibrat.",
    ingredients: ["Aigua", "Malta d'ordi", "Malta de blat", "Llúpol (Amarillo)", "Llevat"],
    pairing: ["Pizzes artesanes", "Pollastre al curri", "Formatges blaus", "Mandonguilles amb sípia"],
    image: "/images/guineu.jpg"
  },
  {
    id: "montseny-negra",
    name: "Montseny Negra",
    brewery: "Cerveses Montseny",
    origin: "Sant Miquel de Balenyà, Osona",
    style: "Stout / Porter",
    abv: 5.2,
    description: "Cervesa negra d'estil Stout, amb intenses notes de cafè i cacau.",
    longDescription: "La Negra de Montseny s'inspira en les clàssiques cerveses Stout irlandeses. Elaborada amb malts torrats a altes temperatures, és una cervesa fosca, gairebé opaca, amb una escuma de color marró clar molt compacta i un cos mitjà excel·lent per als mesos freds.",
    tastingNotes: "Aroma torrat, recordant a cafè exprés, xocolata negra i un toc de regalèssia. En boca té cos, notes de pa torrat i un final lleugerament amarg del malt torrat.",
    ingredients: ["Aigua", "Malta d'ordi (Pale, Caramunich, Roasted Barley)", "Llúpol (Target, Goldings)", "Llevat"],
    pairing: ["Postres de xocolata negra", "Carns vermelles a la brasa", "Guisats de vedella", "Formatge parmesà curat"],
    image: "/images/montseny.jpg"
  },
  {
    id: "la-pirata-tremenda",
    name: "La Pirata Tremenda",
    brewery: "Cerveses La Pirata",
    origin: "Súria, Bages",
    style: "Double IPA",
    abv: 8.0,
    description: "Una bomba de llúpol d'alta graduació, resinosa, robusta i intensa.",
    longDescription: "Tremenda és exactament el que el seu nom indica. Una Double IPA elaborada amb grans quantitats de llúpol tant en olla com en dry-hopping. Té un color daurat profund tirant a taronja i un cos ple que amaga molt bé la seva graduació alcohòlica.",
    tastingNotes: "Aroma complex a pinassa, herba fresca tallada, i resines de coníferes amb fons cítric d'aranja. Amargor potent i llarg que inunda el paladar.",
    ingredients: ["Aigua", "Malta d'ordi", "Llúpol (Columbus, Citra, Mosaic)", "Llevat"],
    pairing: ["Formatges extremadament forts (Cabrales)", "Porc rostit", "Plats molt condimentats o picants", "Costelles de xai"],
    image: "/images/pirata.jpg"
  },
  {
    id: "almogaver-classica",
    name: "Almogàver Clàssica",
    brewery: "Cerveses Almogàver",
    origin: "Barcelona, Barcelonès",
    style: "Pale Ale",
    abv: 4.5,
    description: "Pale Ale artesana i ecològica, molt equilibrada entre malts i llúpols.",
    longDescription: "L'Almogàver Clàssica és una cervesa ecològica estil Pale Ale que busca l'harmonia perfecta. Destaca pel seu perfil maltós d'estil clàssic anglès però matisat amb notes fresques de llúpols moderns. De color ambre clar, és molt fàcil de beure i perfecta com a cervesa del dia a dia.",
    tastingNotes: "Aromes a galeta, caramel suau i tocs d'herba i flors. En boca és molt equilibrada, rodona, amb un amargor suau i refrescant.",
    ingredients: ["Aigua", "Malta d'ordi ecològica", "Llúpol ecològic", "Llevat"],
    pairing: ["Pinchos i tapes", "Pollastre rostit", "Truita de patates", "Formatges tendres"],
    image: "/images/almogaver.jpg"
  }
];
