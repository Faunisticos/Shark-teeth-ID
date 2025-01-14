// script.js
let currentStep;
let history = [];
const questions = [
    { text: "¿Tiene aserraciones?", options: ["Sí", "No"], next: [1, 5] },
    { text: "¿Tiene dentículos laterales?", options: ["Sí", "No"], next: [4, 2] },
    { text: "¿Tiene aserraciones secundarias?", options: ["Sí", "No"], next: [32, 3] },
    { text: "¿Tiene gibosidad y punta fuertemente inclinada en dirección comisural?", options: ["Sí", "No"], next: [
        { name: "Squalicorax bassanii", image: "squalicorax_bassanii.png" }, 33
    ] },
    { text: "¿Tiene aserraciones finas y regulares?", options: ["Sí", "No"], next: [
	{ name: "Otodus sokolowi", image: "otodus_sokolowi.png" },
        { name: "Paleocarcharodon orientalis", image: "paleocarcharodon_orientalis.png" }
    ] },
    { text: "¿Tiene cúspides laterales?", options: ["Sí", "No"], next: [6, 31] },
    { text: "¿Tiene borde de corte parcial?", options: ["Sí", "No"], next: [7, 11] },
    { text: "¿Tiene estrías en la corona?", options: ["Sí", "No"], next: [8, 9] },
    { text: "¿20 estrías, hasta 2/3 de la corona?", options: ["Sí", "No"], next: [
	{ name: "Scapanorhynchus rhaphiodon", image: "scapanorhinchus_raphiodon.png" },
        { name: "Scapanorhynchus rapax", image: "scapanorhinchus_rapax.png" }
    ] },
    { text: "¿Dentículos laterales comprimidos?", options: ["Sí", "No"], next: [
        { name: "Araloselachus cuspidatus", image: "araloselachus_cuspidatus" }, 10
    ] },
    { text: "¿Dentículos laterales muy desarrollados con respecto a la corona?", options: ["Sí", "No"], next: [
	{ name: "Odontaspis winkleri", image: "odontaspis_winkleri.png" },
        { name: "Jaekelotodus speyeri", image: "jaekelotodus_speyeri.png" }
    ] },
    { text: "¿Tiene estrías en la corona?", options: ["Sí", "No"], next: [12, 19] },
    { text: "¿Estrías muy marcadas, que cubren la corona total o parcialmente?", options: ["Sí", "No"], next: [13, 16] },
    { text: "¿Máximo 13 mm de longitud. Con 2 a 4 pares de dentículos laterales. Muy desarrollados y bien separados?", options: ["Sí", "No"], next: [
	{ name: "Carcharias substriatus", image: "carcharias_substriatus.png" }, 14
    ] },
    { text: "¿Menos de 22 mm de longitud, esbeltos. Cúspides laterales bien desarrolladas, agrandadas en la base en los dientes laterales?", options: ["Sí", "No"], next: [
	{ name: "Striatolamia whitei", image: "striatolamia_whitei.png" }, 15
    ] },
    { text: "¿Las estrías llegan hasta la mitad de la corona?", options: ["Sí", "No"], next: [
	{ name: "Striatolamia macrota", image: "striatolamia_macrota.png" },
        { name: "Striatolamia striata", image: "striatolamia_macrota.png" }
    ] },
    { text: "¿Corona principal con curvatura sigmoidea. Con superficie aplanada en la cara lingual?", options: ["Sí", "No"], next: [
	{ name: "Carcharias acutissimus", image: "carcharias_acutissimus.png" }, 17
    ] },
    { text: "¿Menos de 20 mm de longitud. Con dos pares de cúspides laterales bien diferenciadas y grandes en comparación con la corona?", options: ["Sí", "No"], next: [
	{ name: "Brachycarcharias atlasi", image: "brachycarcharias_atlasi.png" }, 18
    ] },
    { text: "¿Menos de 20 mm de longitud. Las estrías llegan hasta la mitad de la corona?", options: ["Sí", "No"], next: [
	{ name: "Carcharias latus", image: "carcharias_latus.png" },
        { name: "Hypotodus verticalis", image: "hypotodus_verticalis.png" }
    ] },
    { text: "¿Dentículos laterales en cantidad asimétrica, más en un lado de la corona que en otro?", options: ["Sí", "No"], next: [20, 22] },
    { text: "¿Dentículos laterales bien desarrollados. Tamaño mayor a 10 mm excepto en los dientes posteriores?", options: ["Sí", "No"], next: [
	{ name: "Serratolamna serrata", image: "serratolamna_serrata.png" }, 21
    ] },
    { text: "¿Aspecto macizo y fornido. Ramas radiculares desarrolladas y extendidas, con el área transformada en una ligera sinuosidad intermedia?", options: ["Sí", "No"], next: [
	{ name: "Serratolamna africana", image: "serratolamna_serrata.png" },
        { name: "Serratolamna caraibaea", image: "serratolamna_serrata.png" }
    ] },
    { text: "¿Sin canal nutricio?", options: ["Sí", "No"], next: [23, 24] },
    { text: "¿Dientes de gran tamaño, con grandes cúspides laterales cuyo plano de unión con la raíz es oblicuo?", options: ["Sí", "No"], next: [
	{ name: "Otodus obliquus", image: "otodus_obliquus.png" },
        { name: "Cretalamna appendiculata", image: "cretalamna_appendiculata.png" }
    ] },
    { text: "¿Con canal nutricio bien marcado?", options: ["Sí", "No"], next: [25, 27] },
    { text: "¿El borde de corte se une con el de los dentículos?", options: ["Sí", "No"], next: [
	{ name: "Araloselachus cuspidatus", image: "araloselachus_cuspidatus.png" }, 35
    ] },
    { text: "¿Dientes robustos, laterales con forma de hoz (falciformes), con depresión triangular en la cara labial?", options: ["Sí", "No"], next: [
	{ name: "Jaekelotodus africanus", image: "jaekelotodus_africanus.png" },
        { name: "Carcharias tingitana", image: "carcharias_tingitana.png" }
    ] },
    { text: "¿Dientes anchos en casi toda la longitud de la corona, dentículos laterales muy curvados, incluso en algunos dientes anteriores. Dientes laterales muy curvados, con de 2 a 4 dentículos?", options: ["Sí", "No"], next: [
	{ name: "Cretalamna aschersoni", image: "cretalamna_aschersoni.png" }, 28
    ] },
    { text: "¿Las coronas forman casi un triángulo equilátero perfecto?", options: ["Sí", "No"], next: [34, 30] },
    { text: "¿Procede del centro o sur de Marruecos y la corona es prácticamente igual de alta que ancha?", options: ["Sí", "No"], next: [
	{ name: "Cretalamna maroccana", image: "cretalamna_maroccana.png" },
        { name: "Cretalamna biauriculata", image: "cretalamna_biauriculata.png" }
    ] },
    { text: "¿Los lóbulos de la raíz acaban en punta o redondeados. Con 1 (en los anteriores) o 2 (en los laterales) dentículos recurvados lateralmente?", options: ["Sí", "No"], next: [
	{ name: "Brachycarcharias twiggsensis", image: "brachycarcharias_twiggsensis.png" },
        { name: "Brachycarcharias koerti", image: "brachycarcharias_koerti.png" }
    ] },
    { text: "¿Tiene la corona fina, con estrías en la base, y mide menos de 12 mm?", options: ["Sí", "No"], next: [
	{ name: "Anomotodon plicatus", image: "anomotodon_plicatus.png" },
        { name: "Macrorhizodus praecursor", image: "macrorhizodus_praecursor.png" }
    ] },
    { text: "¿La corona es estrecha en toda la mitad superior y con muesca siempre presente?", options: ["Sí", "No"], next: [
        { name: "Squalicorax yangaensis", image: "squalicorax_yangaensis.png" },
        { name: "Squalicorax benguerirensis", image: "squalicorax_benguerirensis.png" }
    ] },
    { text: "¿Tiene aserraciones muy finas, borde mesial oblícuo y distal casi vertical (máx. 20 mm)?", options: ["Sí", "No"], next: [
        { name: "Squalicorax microserratus", image: "squalicorax_microserratus.png" },
	{ name: "Squalicorax pristodontus", image: "squalicorax_pristodontus.png" }
    ] },
    { text: "¿Tiene dos bultos esmaltados muy marcados en la cara labial, encima de cada lóbulo?", options: ["Sí", "No"], next: [
        { name: "Trigonotodus tusbairicus", image: "trigonotodus_tusbairicus.png" }, 29
    ] },
    { text: "¿La raíz tiene forma cuadrada y es plana, con la corona estrecha casi desde la base?", options: ["Sí", "No"], next: [
        { name: "Isurolamna inflata", image: "isurolamna_inflata.png" }, 26
    ] },
];

const speciesData = [
    {
        name: "Squalicorax bassanii",
        species: 1,
        image: "squalicorax_bassanii.png"
    },
    {
        name: "Otodus sokolowi",
        species: 2,
        image: "otodus_sokolowi.png"
    },
    {
        name: "Paleocarcharodon orientalis",
        species: 3,
        image: "paleocarcharodon_orientalis.png"
    },
    {
        name: "Scapanorhynchus rhaphiodon",
        species: 4,
        image: "scapanorhinchus_raphiodon.png"
    },
    {
        name: "Scapanorhynchus rapax",
        species: 5,
        image: "scapanorhinchus_rapax.png"
    },
    {
        name: "Araloselachus cuspidatus",
        species: 6,
        image: "araloselachus_cuspidatus.png"
    },
    {
        name: "Odontaspis winkleri",
        species: 7,
        image: "odontaspis_winkleri.png"
    },
    {
        name: "Jaekelotodus speyeri",
        species: 8,
        image: "jaekelotodus_speyeri.png"
    },
    {
        name: "Carcharias substriatus",
        species: 9,
        image: "carcharias_substriatus.png"
    },
    {
        name: "Striatolamia whitei",
        species: 10,
        image: "striatolamia_whitei.png"
    },
    {
        name: "Striatolamia macrota",
        species: 11,
        image: "striatolamia_macrota.png"
    },
    {
        name: "Striatolamia striata",
        species: 12,
        image: "striatolamia_macrota.png"
    },
    {
        name: "Carcharias acutissimus",
        species: 13,
        image: "carcharias_acutissimus.png"
    },
    {
        name: "Brachycarcharias atlasi",
        species: 14,
        image: "brachycarcharias_atlasi.png"
    },
    {
        name: "Carcharias latus",
        species: 15,
        image: "carcharias_latus.png"
    },
    {
        name: "Hypotodus verticalis",
        species: 16,
        image: "hypotodus_verticalis.png"
    },
    {
        name: "Serratolamna serrata",
        species: 17,
        image: "serratolamna_serrata.png"
    },
    {
        name: "Serratolamna africana",
        species: 18,
        image: "serratolamna_serrata.png"
    },
    {
        name: "Serratolamna caraibaea",
        species: 19,
        image: "serratolamna_serrata.png"
    },
    {
        name: "Otodus obliquus",
        species: 20,
        image: "otodus_obliquus.png"
    },
    {
        name: "Cretalamna appendiculata",
        species: 21,
        image: "cretalamna_appendiculata.png"
    },    
    {
        name: "Araloselachus cuspidatus",
        species: 22,
        image: "araloselachus_cuspidatus.png"
    },
    {
        name: "Jaekelotodus africanus",
        species: 23,
        image: "jaekelotodus_africanus.png"
    },
    {
        name: "Carcharias tingitana",
        species: 24,
        image: "carcharias_tingitana.png"
    },
    {
        name: "Cretalamna aschersoni",
        species: 25,
        image: "cretalamna_aschersoni.png"
    },
    {
        name: "Cretalamna maroccana",
        species: 26,
        image: "cretalamna_maroccana.png"
    },
    {
        name: "Cretalamna biauriculata",
        species: 27,
        image: "cretalamna_biauriculata.png"
    },
    {
        name: "Brachycarcharias twiggsensis",
        species: 28,
        image: "brachycarcharias_twiggsensis.png"
    },
    {
        name: "Brachycarcharias koerti",
        species: 29,
        image: "brachycarcharias_koerti.png"
    },
    {
        name: "Anomotodon plicatus",
        species: 30,
        image: "anomotodon_plicatus.png"
    },
    {
        name: "Macrorhizodus praecursor",
        species: 31,
        image: "macrorhizodus_praecursor.png"
    },
    {
        name: "Squalicorax yangaensis",
        species: 32,
        image: "squalicorax_yangaensis.png"
    },
    {
        name: "Squalicorax benguerirensis",
        species: 33,
        image: "squalicorax_benguerirensis.png"
    },
    {
        name: "Squalicorax microserratus",
        species: 34,
        image: "squalicorax_microserratus.png"
    },
    {
        name: "Squalicorax pristodontus",
        species: 35,
        image: "squalicorax_pristodontus.png"
    },
    {
        name: "Trigonotodus tusbairicus",
        species: 36,
        image: "trigonotodus_tusbairicus.png"
    },
    {
        name: "Isurolamna inflata",
        species: 37,
        image: "isurolamna_inflata.png"
    },
];

const translations = {
    es: {
        welcomeTitle: "Identifica tus dientes de<br> TIBURÓN FÓSILES<br>",
        subtitle: "<strong>Lamniformes marroquíes</strong>",
        welcomeText: "Mediante una sencilla clave dicotómica interactiva podrás identificar las principales especies de tiburón Lamniformes fósiles que se pueden encontrar en Marruecos.",
        start: "<strong>COMENZAR IDENTIFICACIÓN</strong>",
        question1: "¿Tiene aserraciones?",
        question2: "¿Tiene dentículos laterales?",
        question3: "¿Tiene aserraciones secundarias?",
        question4: "¿Tiene gibosidad y punta fuertemente inclinada en dirección comisural?",
        question5: "¿Tiene aserraciones finas y regulares?",
        question6: "¿Tiene dentículos laterales?",
        question7: "¿Tiene borde de corte parcial?",
        question8: "¿Tiene estrías en la corona?",
        question9: "¿20 estrías, hasta 2/3 de la corona?",
        question10: "¿Dentículos laterales comprimidos?",
        question11: "¿Dentículos laterales muy desarrollados con respecto a la corona?",
        question12: "¿Tiene estrías en la corona?",
        question13: "¿Estrías muy marcadas, que cubren la corona total o parcialmente?",
        question14: "¿Máximo 13 mm de longitud. Con 2 a 4 pares de dentículos laterales. Muy desarrollados y bien separados?",
        question15: "¿Menos de 22 mm de longitud, esbeltos. Cúspides laterales bien desarrolladas, agrandadas en la base en los dientes laterales?",
        question16: "¿Las estrías llegan hasta la mitad de la corona?",
        question17: "¿Corona principal con curvatura sigmoidea. Con superficie aplanada en la cara lingual?",
        question18: "¿Menos de 20 mm de longitud. Con dos pares de cúspides laterales bien diferenciadas y grandes en comparación con la corona?",
        question19: "¿Menos de 20 mm de longitud. Las estrías llegan hasta la mitad de la corona?",
        question20: "¿Dentículos laterales en cantidad asimétrica, más en un lado de la corona que en otro?",
        question21: "¿Dentículos laterales bien desarrollados. Tamaño mayor a 10 mm excepto en los dientes posteriores?",
        question22: "¿Aspecto macizo y fornido. Ramas radiculares desarrolladas y extendidas, con el área transformada en una ligera sinuosidad intermedia?",
        question23: "¿Sin canal nutricio?",
        question24: "¿Dientes de gran tamaño, con grandes cúspides laterales cuyo plano de unión con la raíz es oblicuo?",
        question25: "¿Con canal nutricio bien marcado?",
        question26: "¿El borde de corte se une con el de los dentículos?",
        question27: "¿Dientes robustos, laterales con forma de hoz (falciformes), con depresión triangular en la cara labial?",
        question28: "¿Dientes anchos en casi toda la longitud de la corona, dentículos laterales muy curvados, incluso en algunos dientes anteriores. Dientes laterales muy curvados, con de 2 a 4 dentículos?",
        question29: "¿Las coronas forman casi un triángulo equilátero perfecto?",
        question30: "¿Procede del centro o sur de Marruecos y la corona es prácticamente igual de alta que ancha?",
        question31: "¿Los lóbulos de la raíz acaban en punta o redondeados. Con 1 (en los anteriores) o 2 (en los laterales) dentículos recurvados lateralmente?",
        question32: "¿Tiene la corona fina, con estrías en la base, y mide menos de 12 mm?",
        question33: "¿La corona es estrecha en toda la mitad superior y con muesca siempre presente?",
        question34: "¿Tiene aserraciones muy finas, borde mesial oblícuo y distal casi vertical (máx. 20 mm)?",
        question35: "¿Tiene dos bultos esmaltados muy marcados en la cara labial, encima de cada lóbulo?",
        question36: "¿La raíz tiene forma cuadrada y es plana, con la corona estrecha casi desde la base?",
        yes: "Sí",
        no: "No",
        back: "Volver",
        restart: "Reiniciar",
        infoText: "Aunque aquí podrás identificar a las principales especies de Lamniformes encontradas en Marruecos, ten en cuenta que puede haber especies faltantes. Además, la gran variabilidad que se presenta dentro de los dientes de una misma especie, en función de su posición en la mandíbula o de si se trataba de un animal adulto o juvenil, puede llevar a identificaciones erróneas.<br><br>Por todo esto, te recomendamos que uses esta aplicación como primera aproximación para la identificación de un diente, y que posteriormente lo confirmes con fuentes más precisas.<br><br>Como en todas las claves dicotómicas, se necesita algo de experiencia y manejo de la terminología para conseguir los mejores resultados.<br><br>¡Esperamos que te sea de utilidad!",
        species1Description: "<strong>Tamaño máximo:</strong> Menor que Squalicorax pristodontus<br> <strong>Forma de la corona del diente:</strong> Punta alta, fuertemente inclinada en dirección comisural<br> <strong>Borde del diente:</strong> Aserrado, con aserraciones muy finas<br> <strong>Estrías:</strong> No<br> <strong>Cúspides laterales:</strong> No<br> <strong>Notas:</strong> Más pequeños que Squalicorax pristodontus<br>",
        species2Description: "<strong>Forma de la corona del diente:</strong> Maciza, robusta y gruesa, con forma triangular<br> <strong>Borde del diente:</strong> Aserrado.<br> <strong>Estrías:</strong> No<br> <strong>Cúspides laterales:</strong> Sí, triangulares, no muy altas y a menudo divergentes en los dientes laterales. Menos desarrolladas en los dientes anteriores<br> <strong>Forma de la raíz:</strong> Gran protuberancia en la cara interna, lóbulos separados por una hendidura redondeada profunda<br> <strong>Notas:</strong> Se diferencia de Otodus obliquus por tener el borde aserrado.<br>",
        species3Description: "<strong>Forma de la corona del diente:</strong> Triangulares, muy comprimidos dorsoventralmente, anteriores rectos y laterales inclinados hacia el borde comisural.<br><strong>Borde del diente:</strong> Aserrado, con aserraciones gruesas e irregulares por todo el borde de corte de la corona principal y de los dentículos.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, desarrolladas y con el borde fuertemente aserrado. Frecuentemente divididas.<br>",
        species4Description: "<strong>Forma de la corona del diente:</strong> Lanceolada, base circular, se aplana y ensancha en mitad superior.<br><strong>Borde del diente:</strong> Liso. Parcial.<br><strong>Estrías:</strong> Sí, prominentes, paralelos y espaciados (20) hasta la mitad o 2/3 de la corona, menos notorios en dientes laterales.<br><strong>Cúspides laterales:</strong> Sí, pequeñas (apenas marcadas en anteriores)<br>",
        species5Description: "<strong>Forma de la corona del diente:</strong> Parte interna muy convexa en la base. Dientes superiores: largos, rectos, ligeramente sigmoidal en los anteriores, sección basal circular, superior comprimida y ligeramente abovedada en los lados. Dientes inferiores: más estrechos<br><strong>Borde del diente:</strong> Liso. Parcial (casi total en laterales)<br><strong>Estrías:</strong> Sí, muy marcadas (15-20), mayor en los laterales de la corona (hasta la mitad de la corona), pliegues reducidos en dientes laterales<br><strong>Cúspides laterales:</strong> No en anteriores, sí en laterales<br><strong>Forma de la raíz:</strong> Prominente en la cara interna<br><strong>Tamaño máximo:</strong> 66 mm (Anteriores), 48 mm (Laterales)<br>",
        species6Description: "<strong>Forma de la corona del diente:</strong> Coronas estrechas y altas en los anteriores, más triangulares en los laterales.<br><strong>Borde del diente:</strong> Liso, casi siempre completo en los laterales (no completo en los anteriores.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, puntiagudas, muy pequeñas y curvadas lingualmente, a veces dobles.<br><strong>Forma de la raíz:</strong> Ramas simétricas con forma de V y protuberancia muy pronunciada. Con canal nutricio.<br><strong>Notas:</strong> Más grandes y robustos que Carcharias acutissimus, con dentículos más regordetes. La corona se une con los dentículos.<br>",
        species7Description: "<strong>Forma de la corona del diente:</strong> Proporciones delgadas, convexa en la cara interna y ligeramente convexa en la externa, con depresión triangular muy marcada en la base de la cara externa.<br><strong>Borde del diente:</strong> Liso, parcial.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, muy largas y agudas, casi circulares, separadas y generalmente dobles.<br><strong>Notas:</strong> Tamaño máximo 30 mm. Similar a Odontaspis ferox, pero con corona menos robusta y más desarrollada en relación con la raíz.<br>",
        species8Description: "<strong>Forma de la corona del diente:</strong> Corona corta y rechoncha, perfil externo e interno convexo.<br><strong>Borde del diente:</strong> Liso<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, dobles y agudas en todos los dientes.<br><strong>Forma de la raíz:</strong> Protuberancias muy desarrolladas, con gran canal nutricio, y lóbulos de los dientes laterales divergentes.<br><strong>Notas:</strong> Normalmente mide 30 mm. Se diferencia de Odontaspis ferox por tener los dentículos laterales menos desarrollados.<br>",
        species9Description: "<strong>Forma de la corona del diente:</strong> Corona un poco desarrollada, no muy delgada, con protuberancias en la base en la cara externa e interna.<br><strong>Borde del diente:</strong> Liso, completo<br><strong>Estrías:</strong> Sí, bien marcadas y casi rectilíneas, nunca desaparecen por completo.<br><strong>Cúspides laterales:</strong> Sí, de 2 a 4 en cada lado, largas, aciculares y bien separadas.<br><strong>Notas:</strong> Más pequeña y menos esbelta que whitei o macrota, con más dentículos.<br>",
        species10Description: "<strong>Forma de la corona del diente:</strong> Esbeltas, con anchura constante que disminuye cerca de la punta, superficie externa plana e interna convexa.<br><strong>Borde del diente:</strong> Liso y completo<br><strong>Estrías:</strong> Siempre presentes en los dientes anteriores, irregulares y atenuadas en los laterales.<br><strong>Cúspides laterales:</strong> Siempre bien desarrolladas, agrandadas en la base.<br><strong>Notas:</strong> Pequeños, máximo 22 mm. Similar a Carcharias taurus y Striatolamia macrota, pero más pequeños. Se diferencia de Carcharias tingitana por ser más esbelto, tener estrías y mayores dentículos.<br>",
        species11Description: "<strong>Forma de la corona del diente:</strong> Esbeltas, a veces muy ligeramente espatuladas.<br><strong>Borde del diente:</strong> Liso, completo. En los anteriores, aunque el borde se acabe una línea los une con la raíz.<br><strong>Estrías:</strong> Siempre presentes, numerosas, finas e irregulares, frecuentemente anastomadas y muy marcadas, incluso en los laterales.<br><strong>Cúspides laterales:</strong> Siempre reducidas en los anteriores, en forma de lámina reducida y afilada, y más desarrolladas en los laterales.<br><strong>Notas:</strong> Presenta una sección plana en la cara lingual de los dientes anteriores, no encontrada en otras especies.<br>",
        species12Description: "<strong>Forma de la corona del diente:</strong> Esbeltas, a veces muy ligeramente espatuladas.<br><strong>Borde del diente:</strong> Liso, completo. En los anteriores, aunque el borde se acabe una línea los une con la raíz.<br><strong>Estrías:</strong> Siempre presentes, numerosas, finas e irregulares, frecuentemente anastomadas y muy marcadas, incluso en los laterales. Por toda la longitud de la corona.<br><strong>Cúspides laterales:</strong> Siempre reducidas en los anteriores, en forma de lámina reducida y afilada, y más desarrolladas en los laterales.<br><strong>Notas:</strong> Presenta una sección plana en la cara lingual de los dientes anteriores, no encontrada en otras especies.<br>",
        species13Description: "<strong>Forma de la corona del diente:</strong> Alta, esbelta y puntiaguda, con curvas sigmoideas y superficie plana en la cara labial y convexa en la lingual.<br><strong>Borde del diente:</strong> Liso, casi siempre completo.<br><strong>Estrías:</strong> Sí, no llegan hasta la punta.<br><strong>Cúspides laterales:</strong> Sí, con bordes cortantes y ligeramente inclinados lingualmente.<br><strong>Forma de la raíz:</strong> Altas con dos ramas delgadas con forma de V, protuberancia basal fuerte.<br>",
        species14Description: "<strong>Forma de la corona del diente:</strong> Similar a Odontaspis substriata, con dientes de mandíbula superior con cara exterior plana.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> Sí.<br><strong>Cúspides laterales:</strong> Sí, voluminosas, largas y agudas, nunca triples.<br><strong>Notas:</strong> Tamaño máximo 20 mm, con mucho polimorfismo. Difiere de Odontaspis substriata por ser más grandes y tener menos dentículos.<br>",
        species15Description: "<strong>Forma de la corona del diente:</strong> Pequeños, achaparrados y con pliegues. Dientes anteriores: corona triangular, el doble de ancha que alta, no sigmoidea, cara externa plana e interna convexa.<br><strong>Borde del diente:</strong> Liso, continuo.<br><strong>Estrías:</strong> Sí, hasta la mitad de la corona.<br><strong>Cúspides laterales:</strong> Sí, a veces divididas en los dientes laterales, más delgadas y separadas que en Striatolamia macrota.<br><strong>Forma de la raíz:</strong> Prominente en la cara interna, menos prominente en los dientes laterales. Con canal nutricio y poro.<br>",
        species16Description: "<strong>Forma de la corona del diente:</strong> Muy similar a Brachycarcharias atlasi, con esmalte con aspecto irregular.<br><strong>Borde del diente:</strong> Liso, completo.<br><strong>Estrías:</strong> Sí.<br><strong>Cúspides laterales:</strong> Sí, comprimidas, algunos con esmalte arrugado en la cara interna.<br><strong>Notas:</strong> Se diferencian de Carcharias substriatus y Brachycarcharias atlasi por el borrado de los pliegues y los dentículos más reducidos.<br>",
        species17Description: "<strong>Forma de la corona del diente:</strong> Comprimida y alargada, con bordes afilados, cara interna convexa y externa plana.<br><strong>Borde del diente:</strong> Liso y afilado. Completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, en mayor número (de 3 a 4) en un lado que en otro, menos voluminosas que en otros lamnidos.<br><strong>Forma de la raíz:</strong> Lado interno ligeramente convexo, con canal nutricio bien marcado.<br><strong>Notas:</strong> Fácilmente reconocible por la forma fuertemente arqueada de sus dientes laterales superiores y la multiplicidad de sus dentículos.<br>",
        species18Description: "<strong>Forma de la corona del diente:</strong> Más ancha y convexa que Serratolamna caraibaea.<br><strong>Borde del diente:</strong> Liso.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, del mismo número que Serratolamna caraibaea, pero más agudas.<br><strong>Forma de la raíz:</strong> Lóbulos más desarrollados y extendidos que en Serratolamna caraibaea.<br><strong>Notas:</strong> Aspecto más macizo y fornido que Serratolamna caraibaea.<br>",
        species19Description: "<strong>Forma de la corona del diente:</strong> Muy similar a Serratolamna serrata, pero más baja y ancha.<br><strong>Borde del diente:</strong> Liso y afilado, completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, con mayor número (de 3 a 4), pero más pequeñas que en Serratolamna serrata. Con canal nutricio.<br><strong>Notas:</strong> Parece ser descendiente de Serratolamna serrata, con proporciones más pequeñas.<br>",
        species20Description: "<strong>Forma de la corona del diente:</strong> Maciza, robusta y gruesa, con forma triangular.<br><strong>Borde del diente:</strong> Liso, completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, grandes y triangulares, normalmente simples, aunque a veces con una pequeña protuberancia. El plano de unión de la base de los dentículos con la raíz es oblicua.<br><strong>Forma de la raíz:</strong> Gran protuberancia en la cara interna, lóbulos separados por una hendidura redondeada profunda. Sin canal nutricio ni poro.<br><strong>Notas:</strong> La forma maciza, el grosor y la protuberancia de la cara interna de la raíz separada por una hendidura redondeada, y el tamaño de los dientes adultos que superan los 10 cm, los diferencian de otros tiburones.<br>",
        species21Description: "<strong>Forma de la corona del diente:</strong> Dientes gruesos y grandes, los de mandíbula superior son anchos en la base, los laterales tienen corona baja e inclinada.<br><strong>Borde del diente:</strong> Liso, cortante y completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, anchas y comprimidas, a veces dobles sobre todo en los laterales.<br><strong>Forma de la raíz:</strong> Muy convexa globosa, con lóbulos separados por una muesca redondeada. Sin canal nutricio.<br><strong>Notas:</strong> La principal diferencia con Otodus obliquus es el plano de unión de la base de los dentículos con la raíz.<br>",
        species22Description: "<strong>Forma de la corona del diente:</strong> Coronas estrechas y altas en los anteriores, más triangulares en los laterales.<br><strong>Borde del diente:</strong> Liso, casi siempre completo en los laterales (no completo en los anteriores.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, puntiagudas, muy pequeñas y curvadas lingualmente, a veces dobles.<br><strong>Forma de la raíz:</strong> Ramas simétricas con forma de V y protuberancia muy pronunciada. Con canal nutricio.<br><strong>Notas:</strong> Más grandes y robustos que Carcharias acutissimus, con dentículos más regordetes. La corona se une con los dentículos.<br>",
        species23Description: "<strong>Forma de la corona del diente:</strong> Robustas y de gran tamaño, fuertemente convexa en la cara lingual, bordes comprimidos y afilados.<br><strong>Borde del diente:</strong> Liso, completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Cortas y agudas, a veces comprimidas.<br><strong>Forma de la raíz:</strong> Con fuerte protuberancia y canal nutricio muy marcado.<br><strong>Notas:</strong> Los dientes laterales son falciformes y presentan una depresión triangular en la cara externa.<br>",
        species24Description: "<strong>Forma de la corona del diente:</strong> Forma punzante, estrechándose desde la base hasta la punta.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, muy pequeñas en los anteriores y agudas en los laterales, ligeramente comprimidas.<br><strong>Forma de la raíz:</strong> Baja, fuertemente convexa en la cara interna, con canal nutricio bien marcado.<br><strong>Notas:</strong> Puede confundirse con Scapanorhinchus subulatus por la forma subulada de la corona, pero este último tiene dentículos más grandes.<br>",
        species25Description: "<strong>Forma de la corona del diente:</strong> Ancha en casi toda la longitud y muy comprimida.<br><strong>Borde del diente:</strong> Liso, completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, largas, acuminadas y fuertemente comprimidas, a veces con dentículos secundarios más pequeños.<br><strong>Forma de la raíz:</strong> Lóbulos estrechos. Canal nutricio ligeramente marcado.<br><strong>Notas:</strong> Su principal característica es la forma y desarrollo de los dentículos laterales.<br>",
        species26Description: "<strong>Forma de la corona del diente:</strong> Triangular y baja, relación alto-ancho de 0,7 a 1.<br><strong>Borde del diente:</strong> Liso, completo.<br><strong>Estrías:</strong> No.<br><strong>Cúspides laterales:</strong> Sí, grandes, comprimidas y divididas.<br><strong>Forma de la raíz:</strong> Baja y poco prominente, con ligera hendidura y canal nutricio ligeramente marcado.<br><strong>Notas:</strong> Muy parecida a Cretolamna biauriculata, pero se diferencia principalmente por los yacimientos de origen y por ser más bajos.<br>",
        species27Description: "<strong>Forma de la corona del diente:</strong> Triangular isósceles en los dientes de mandíbula superior anteriores, más gruesos y convexas en los dientes de mandíbula inferior.<br><strong>Borde del diente:</strong> Liso, completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, robustas, triangulares y comprimidas, simples o poco divididas en los anteriores, y más pequeñas en los laterales.<br><strong>Forma de la raíz:</strong> Comprimida y poco extendida en los anteriores, muy extendida en los laterales, con canal nutricio casi borrado.<br><strong>Notas:</strong> En Marruecos, es más frecuente en el norte.<br>",
        species28Description: "<strong>Forma de la corona del diente:</strong> Las coronas de los dientes laterales son más anchas que las de los anteriores, estas últimas son altas, algo estrechas y simétricamente triangulares.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, delgadas en los anteriores y anchas y triangulares en los laterales.<br><strong>Forma de la raíz:</strong> El canal nutricio es vestigial, con poro. Los lóbulos pueden variar de puntiagudos a redondos.<br><strong>Notas:</strong> Más robusto y de mayor tamaño que Brachycarcharias atlasi, con la base de la corona más ancha. De 1.5 a 3 cm.<br>",
        species29Description: "<strong>Forma de la corona del diente:</strong> Superficie interna convexa, externa ligeramente convexa, bordes planos.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, triangulares y comprimidas o reducidas.<br><strong>Forma de la raíz:</strong> Débilmente desarrolladas, canal nutricio poco marcado.<br><strong>Notas:</strong> Se suele asociar con Galeocerdo latidens.<br>",
        species30Description: "<strong>Forma de la corona del diente:</strong> Estrechas y delgadas, los dientes superiores laterales tienen las coronas inclinadas, los inferiores laterales, erguidas. Convexos en ambos lados.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> Sí, en la cara lingual, muy prominentes y espaciados hasta 2/3 de la corona.<br><strong>Cúspides laterales:</strong> No, el borde cortante continúa hasta los lóbulos de la raíz.<br><strong>Notas:</strong> Tamaño máximo 11 mm. Único con estrías y corona continua sobre los lóbulos de la raíz sin dentículos.<br>",
        species31Description: "<strong>Forma de la corona del diente:</strong> Triangulares, muy comprimidos dorsoventralmente, anteriores más rectos y delgados, y laterales inclinados hacia el borde comisural.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> No<br><strong>Notas:</strong> Sinónimo de Isurus praecursor.<br>",
        species32Description: "<strong>Forma de la corona del diente:</strong> Similar a Squalicorax bassanii, pero menos altas.<br><strong>Borde del diente:</strong> Aserrado, con aserraciones gruesas que se hacen más finas cerca de la raíz, con aserraciones secundarias.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> No<br><strong>Notas:</strong> La principal diferencia son las aserraciones secundarias en cada una de las aserraciones principales.<br>",
        species33Description: "<strong>Forma de la corona del diente:</strong> Anchas, solo se estrechan en el ápice (menos de 90 grados). Los dientes anteriores no tienen muesca, los laterales sí.<br><strong>Borde del diente:</strong> Aserrado, con aserraciones gruesas que se hacen más finas cerca de la raíz. Con aserraciones secundarias en las principales.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> No<br><strong>Notas:</strong> Se diferencia de S. yangaensis porque la muesca no está siempre presente y son más anchos.<br>",
        species34Description: "<strong>Tamaño máximo:</strong> 20 mm.<br><strong>Forma de la corona:</strong> Pequeña, borde mesial oblicuo y distal prácticamente vertical, que puede acabar en una muesca.<br><strong>Borde del diente:</strong> Aserrado, con aserraciones muy finas.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> No<br><strong>Notas:</strong> El más pequeño y con aserraciones más finas de todos los Squalicorax.<br>",
        species35Description: "<strong>Tamaño máximo:</strong> 30 mm<br><strong>Forma de la corona del diente:</strong> Ancha, comprimida y apiculada.<br><strong>Borde del diente:</strong> Aserrado, con aserraciones finas (40 a 50 por lado).<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> No<br><strong>Notas:</strong> El más grande de todas las especies de Squalicorax, lado sinfisario de la corona arqueado, sin gibosidad ni sinuosidad.<br>",
        species36Description: "<strong>Forma de la corona:</strong> Baja en relación con la raíz, se diferencia de otros géneros por tener dos bultos esmaltados en la cara labial, justo encima de cada lóbulo de la raíz.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, comprimidas y bajas, no muy grandes.<br><strong>Forma de la raíz:</strong> Raíz robusta, lóbulos alargados y no muy gruesos, dejando un área en forma de V, similar a un boomerang. Sin bourlette ni canal nutricio.<br>",
        species37Description: "<strong>Forma de la corona:</strong> Estrecha prácticamente desde la base. Cara lingual plana y labial convexa. Pequeños.<br><strong>Borde del diente:</strong> Liso y completo.<br><strong>Estrías:</strong> No<br><strong>Cúspides laterales:</strong> Sí, comprimidas, a veces dobles en los laterales, siendo el segundo muy reducido.<br><strong>Forma de la raíz:</strong> Grande comparada con la corona, sobre todo en los laterales. Tiene forma cuadrada, y delgada, con el área muy reducida en los laterales. Con poro, el canal nutricio puede estar poco marcado.<br>",
    },
    en: {
        welcomeTitle: "Identify Your Fossil<br> SHARK TEETH<br>",
        subtitle: "<strong>Moroccan Lamniformes</strong>",
        welcomeText: "Through a simple interactive dichotomous key, you can identify the main species of fossil Lamniformes shark teeth found in Morocco.",
        start: "<strong>START IDENTIFICATION</strong>",
        question1: "Does it have serrations?",
        question2: "Does it have lateral cusps?",
        question3: "Does it have secondary serrations?",
        question4: "Does it have a hump and a tip strongly inclined in the commissural direction?",
        question5: "Does it have fine and regular serrations?",
        question6: "Does it have lateral cusps?",
        question7: "Does it have a partial cutting edge?",
        question8: "Does it have wrinkles on the crown?",
        question9: "20 striations, up to 2/3 of the crown?",
        question10: "Are the lateral denticles compressed?",
        question11: "Are the lateral denticles very developed compared to the crown?",
        question12: "Does it have striations on the crown?",
        question13: "Very marked striations, covering the crown totally or partially?",
        question14: "Maximum 13 mm in length. With 2 to 4 pairs of lateral denticles. Very developed and well separated?",
        question15: "Less than 22 mm in length, slender. Well-developed lateral cusps, enlarged at the base in lateral teeth?",
        question16: "Do the striations reach halfway up the crown?",
        question17: "Main crown with sigmoidal curvature. With a flattened surface on the lingual side?",
        question18: "Less than 20 mm in length. With two pairs of well-differentiated and large lateral cusps compared to the crown?",
        question19: "Less than 20 mm in length. Do the striations reach halfway up the crown?",
        question20: "Asymmetric quantity of lateral denticles, more on one side of the crown than the other?",
        question21: "Well-developed lateral denticles. Size greater than 10 mm except in posterior teeth?",
        question22: "Sturdy and solid appearance. Well-developed and extended root branches, with the area transformed into a slight intermediate sinuosity?",
        question23: "Without a nutrient canal?",
        question24: "Large teeth, with large lateral cusps whose union plane with the root is oblique?",
        question25: "With a well-marked nutrient canal?",
        question26: "Does the cutting edge merge with that of the denticles?",
        question27: "Robust teeth, laterals shaped like a sickle (falciform), with a triangular depression on the labial side?",
        question28: "Teeth wide along almost the entire length of the crown, very curved lateral denticles, even in some anterior teeth. Very curved lateral teeth, with 2 to 4 denticles?",
        question29: "Do the crowns form almost a perfect equilateral triangle?",
        question30: "From central or southern Morocco and the crown is practically as tall as it is wide?",
        question31: "Do the root lobes end in points or rounded. With 1 (in the anterior) or 2 (in the lateral) laterally recurved denticles?",
        question32: "Is the crown thin, with striations at the base, and less than 12 mm?",
        question33: "Is the crown narrow throughout the upper half and always has a notch?",
        question34: "Does it have very fine serrations, an oblique mesial edge and an almost vertical distal edge (max. 20 mm)?",
        question35: "Does it have two very marked enamel bumps on the labial side, above each lobe?",
        question36: "Does the root have a square shape and is flat, with the crown narrow almost from the base?",
        yes: "Yes",
        no: "No",
        back: "Back",
        restart: "Restart",
        infoText: "Although you can identify the main Lamniformes species found in Morocco here, keep in mind that there may be missing species. Furthermore, the great variability within the teeth of the same species, depending on their position in the jaw or whether they were an adult or juvenile animal, can lead to erroneous identifications.<br><br>For all these reasons, we recommend to use this application as a first approach for identifying a tooth, and then confirm it with more precise sources.<br><br>As with all dichotomous keys, some experience and handling of terminology are required to achieve the best results.<br><br>We hope you find it useful!",
        species1Description: "<strong>Maximum size:</strong> Smaller than Squalicorax pristodontus<br><strong>Shape of tooth crown:</strong> High point, strongly inclined in a commissural direction<br><strong>Tooth edge:</strong> Serrated, with very fine serrations<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> No<br><strong>Notes:</strong> Smaller than Squalicorax pristodontus<br>",
        species2Description: "<strong>Tooth crown shape:</strong> Solid, robust and thick, triangular in shape<br><strong>Tooth edge:</strong> Serrated.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, triangular, not very high and often divergent on the lateral teeth. Less developed on the anterior teeth<br><strong>Shape of the root:</strong> Large protuberance on the inner surface, lobes separated by a deep rounded groove<br><strong>Notes:</strong> It differs from Otodus obliquus by having a serrated edge.<br>",
        species3Description: "<strong>Tooth crown shape:</strong> Triangular, highly compressed dorsoventrally, straight anteriors and laterally inclined towards the commissural edge.<br><strong>Tooth edge:</strong> Serrated, with thick and irregular serrations along the entire cutting edge of the main crown and the denticles.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, developed and with the edge strongly serrated.<br>",
        species4Description: "<strong>Shape of the crown of the tooth:</strong> Lanceolate, circular base, flattens and widens in the upper half.<br><strong>Edge of the tooth:</strong> Smooth. Partial.<br><strong>Striations:</strong> Yes, prominent, parallel and spaced (20) up half or 2/3 of the crown, less noticeable on lateral teeth.<br><strong>Lateral cusps:</strong> Yes, small (barely marked on anteriors)<br>",
        species5Description: "<strong>Shape of the crown of the tooth:</strong> Internal part very convex at the base. Upper teeth: long, straight, slightly sigmoidal in the anteriors, circular basal section, upper compressed and slightly domed on the sides. Lower teeth: narrower<br><strong>Edge of the tooth:</strong> Smooth. Partial (almost total on the sides)<br><strong>Striations:</strong> Yes, very marked (15-20), greater on the sides of the crown (up to the middle of the crown), reduced folds on teeth lateral<br><strong>Lateral cusps:</strong> No in anterior, yes in lateral<br><strong>Shape of the root:</strong> Prominent on the internal surface<br><strong>Maximum size:</strong> 66 mm (Anterior), 48 mm (Lateral)<br>",
        species6Description: "<strong>Shape of the crown of the tooth:</strong> Narrow and high crowns on the anteriors, more triangular on the sides.<br><strong>Edge of the tooth:</strong> Smooth, almost always complete on the sides (not complete on the anteriors.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, pointed, very small and lingually curved, sometimes double.<br><strong>Root shape:</strong> Symmetrical V-shaped branches with very pronounced protuberance.<br><strong>Notes:</strong> Larger and more robust than Carcharias acutissimus, with plumper denticles. The crown joins the denticles.<br>",
        species7Description: "<strong>Shape of the crown of the tooth:</strong> Thin proportions, convex on the inner face and slightly convex on the outer face, with a very marked triangular depression at the base of the outer face.<br><strong>Edge of the tooth:</strong> Smooth, partial.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, very long and acute, almost circular, separated and generally double.<br><strong>Notes:</strong> Maximum size 30 mm. Similar to Odontaspis ferox, but with a less robust and more developed crown. relationship with the root.<br>",
        species8Description: "<strong>Tooth crown shape:</strong> Short and stocky crown, convex external and internal profile.<br><strong>Edge of the tooth:</strong> Smooth <br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, double and acute on all teeth .<br><strong>Root shape:</strong> Very developed protuberances, with a large nutritional canal, and divergent lateral tooth lobes.<br><strong>Notes:</strong> It normally measures 30 mm. It differs from Odontaspis ferox by having less developed lateral denticles.<br>",
        species9Description: "<strong>Shape of the crown of the tooth:</strong> Crown a little developed, not very thin, with protuberances at the base on the external and internal side.<br><strong>Edge of the tooth:</strong> Smooth, complete<br><strong>Striations:</strong> Yes, well marked and almost rectilinear, they never disappear completely.<br><strong>Lateral cusps:</strong> Yes, 2 to 4 on each side, long, acicular and well separated.<br><strong>Notes:</strong> Smaller and less slender than whitei or macrota, with more denticles.<br>",
        species10Description: "<strong>Shape of the tooth crown:</strong> Slender, with constant width that decreases near the tip, flat external surface and convex internal surface.<br><strong>Tooth edge:</strong> Smooth and complete<br><strong>Striations:</strong> Always present on the anterior teeth, irregular and attenuated on the sides.<br><strong>Lateral cusps:</strong> Always well developed, enlarged at the base.<br><strong>Notes:</strong> Small, maximum 22 mm. Similar to Carcharias taurus and Striatolamia macrota, but smaller. tingitana because it is more slender, has stretch marks and larger denticles.<br>",
        species11Description: "<strong>Shape of the crown of the tooth:</strong> Slender, sometimes very slightly spatulated.<br><strong>Edge of the tooth:</strong> Smooth, complete. In the anterior ones, although the edge ends, a line joins them with the root.<br><strong>Striations:</strong> Always present, numerous, thin and irregular, frequently anastomated and very marked, even on the sides along the entire length of the crown.<br><strong>Lateral cusps:</strong> Always reduced in the anterior ones, in the form of a reduced and sharp blade, and more developed on the sides.<br><strong>Notes:</strong> It presents a flat section on the lingual surface of the anterior teeth, not found in other species.<br>",
        species12Description: "<strong>Shape of the crown of the tooth:</strong> Slender, sometimes very slightly spatulated.<br><strong>Edge of the tooth:</strong> Smooth, complete. In the anterior ones, although the edge ends, a line joins them with the root.<br><strong>Striations:</strong> Always present, numerous, thin and irregular, frequently anastomated and very marked, even on the sides along the entire length of the crown.<br><strong>Lateral cusps:</strong> Always reduced in the anterior ones, in the form of a reduced and sharp blade, and more developed on the sides.<br><strong>Notes:</strong> It presents a flat section on the lingual surface of the anterior teeth, not found in other species.<br>",
        species13Description: "<strong>Shape of the crown of the tooth:</strong> High, slender and pointed, with sigmoid curves and a flat surface on the labial side and convex on the lingual side.<br><strong>Edge of the tooth:</strong> Smooth, almost always complete.<br><strong>Striae:</strong> Yes, they do not reach the tip.<br><strong>Lateral cusps:</strong> Yes, with cutting edges and slightly inclined lingually.<br><strong>Root shape:</strong> Tall with two thin V-shaped branches, protruding protuberance with nutritional canal.<br><strong>Notes:</strong> Maximum size of anterior teeth 30 mm.<br>",
        species14Description: "<strong>Tooth crown shape:</strong> Similar to Odontaspis substriata, with upper jaw teeth with flat outer face.<br><strong>Tooth edge:</strong> Smooth and complete.<br><strong>Striations:</strong> Yes.<br><strong>Lateral cusps:</strong> Yes, voluminous, long and sharp, never triple.<br><strong>Notes:</strong> Maximum size 20 mm, with a lot of polymorphism. It differs from Odontaspis substriata by being larger and having fewer denticles.<br>",
        species15Description: "<strong>Tooth crown shape:</strong> Small, squat and with folds. Anterior teeth: triangular crown, twice as wide as it is tall, non-sigmoid, flat external surface and convex internal surface.<br><strong>Edge of the tooth:</strong> Smooth, continuous .<br><strong>Striations:</strong> Yes, up to the middle of the crown.<br><strong>Lateral cusps:</strong> Yes, sometimes divided into the lateral teeth, thinner and more separated than in Striatolamia macrota.<br><strong>Root shape:</strong> Prominent on the internal face, less prominent in the lateral teeth. With nutritional canal and pore.<br>",
        species16Description: "<strong>Tooth crown shape:</strong> Very similar to Brachycarcharias atlasi, with irregular-looking enamel.<br><strong>Edge of the tooth:</strong> Smooth, complete.<br><strong>Striations:</strong> Yes.<br><strong>Lateral cusps:</strong> Yes, compressed, some with wrinkled enamel on the inner side.<br><strong>Notes:</strong> They are differentiated from Carcharias substriatus and Brachycarcharias atlasi by the erasing of the folds and the smaller denticles.<br>",
        species17Description: "<strong>Tooth crown shape:</strong> Compressed and elongated, with sharp edges, convex inner face and flat outer face.<br><strong>Edge of the tooth:</strong> Smooth and sharp. Complete.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, in greater number (3 to 4) on one side than on the other, less voluminous than in other lamnids.<br><strong>Root shape:</strong> Slightly convex inner side, with well-marked nutritional canal.<br><strong>Notes:</strong> Easily recognizable by the strongly arched shape of its upper lateral teeth and the multiplicity of its denticles.<br>",
        species18Description: "<strong>Tooth crown shape:</strong> Wider and more convex than Serratolamna caraibaea.<br><strong>Edge of the tooth:</strong> Smooth.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, same number as Serratolamna caraibaea, but more acute.<br><strong>Root shape:</strong> Lobes more developed and extended than in Serratolamna caraibaea.<br><strong>Notes:</strong> More massive and stocky appearance than Serratolamna caraibaea.<br>",
        species19Description: "<strong>Tooth crown shape:</strong> Very similar to Serratolamna serrata, but shorter and wider.<br><strong>Edge of the tooth:</strong> Smooth and sharp, complete.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, with greater number (3 to 4), but smaller than in Serratolamna serrata. With nutritional canal.<br><strong>Notes:</strong> It seems to be a descendant of Serratolamna serrata, with smaller proportions.<br>",
        species20Description: "<strong>Tooth crown shape:</strong> Solid, robust and thick, triangular in shape.<br><strong>Edge of the tooth:</strong> Smooth, complete.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, large and triangular, Normally simple, although sometimes with a small protuberance. The plane of union of the base of the denticles with the root is oblique.<br><strong>Root shape:</strong> Large protuberance on the inner surface, lobes separated by a deep rounded groove. Without nutritional canal or pore.<br><strong>Notes:</strong> The solid shape, the thickness and protuberance of the internal surface of the root separated by a rounded slit, and the size of the adult teeth that exceed 10 cm, differentiate them from others sharks.<br>",
        species21Description: "<strong>Shape of the crown of the tooth:</strong> Thick and large teeth, those of the upper jaw are wide at the base, the lateral ones have a low and inclined crown.<br><strong>Edge of the tooth:</strong> Smooth, sharp and complete.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, wide and compressed, sometimes double, especially on the sides.<br><strong>Root shape:</strong> Very convex globose, with lobes separated by a rounded notch. No nutritional canal.<br><strong>Notes:</strong> The main difference with Otodus obliquus is the plane of union of the base of the denticles with the root.<br>",
        species22Description: "<strong>Shape of the crown of the tooth:</strong> Narrow and high crowns on the anteriors, more triangular on the sides.<br><strong>Edge of the tooth:</strong> Smooth, almost always complete on the sides (not complete on the anteriors.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, pointed, very small and lingually curved, sometimes double.<br><strong>Root shape:</strong> Symmetrical branches with a V shape and very pronounced protuberance. With nutritional canal.<br><strong>Notes:</strong> Larger and more robust than Carcharias acutissimus, with plumper denticles. The crown joins the denticles.<br>",
        species23Description: "<strong>Tooth crown shape:</strong> Robust and large, strongly convex on the lingual surface, compressed and sharp edges.<br><strong>Edge of the tooth:</strong> Smooth, complete.<br><strong>Striations:</strong> No.<br><strong>Cusps Laterals:</strong> Short and sharp, sometimes compressed.<br><strong>Root shape:</strong> With a strong protuberance and a very marked nutritional canal.<br><strong>Notes:</strong> The lateral teeth are falciform and have a triangular depression on the external face.<br>",
        species24Description: "<strong>Tooth crown shape:</strong> Sharp shape, tapering from base to tip.<br><strong>Edge of tooth:</strong> Smooth and complete.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, very small in the anterior ones and acute on the lateral sides, slightly compressed.<br><strong>Shape of the root:</strong> Low, strongly convex on the inner surface, with a well-marked nutritional canal.<br><strong>Notes:</strong> It can be confused with Scapanorhinchus subulatus due to the subulate shape of the root. crown, but the latter has larger denticles.<br>",
        species25Description: "<strong>Shape of the crown of the tooth:</strong> Wide along almost the entire length and very compressed.<br><strong>Edge of the tooth:</strong> Smooth, complete.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes, long, acuminate and strongly compressed, sometimes with smaller secondary denticles.<br><strong>Root shape:</strong> Narrow lobes. Slightly marked nutritional canal.<br><strong>Notes:</strong> Its main characteristic is the shape and development of the lateral denticles.<br>",
        species26Description: "<strong>Tooth crown shape:</strong> Triangular and low, height-width ratio 0.7 to 1.<br><strong>Tooth edge:</strong> Smooth, complete.<br><strong>Striations:</strong> No.<br><strong>Lateral cusps:</strong> Yes , large, compressed and divided.<br><strong>Shape of the root:</strong> Low and not very prominent, with a slight cleft and slightly marked nutritional canal.<br><strong>Notes:</strong> Very similar to Cretolamna biauriculata, but it is differentiated mainly by the sites of origin and for being shorter.<br>",
        species27Description: "<strong>Tooth crown shape:</strong> Isosceles triangular in the anterior upper jaw teeth, thicker and convex in the lower jaw teeth.<br><strong>Edge of the tooth:</strong> Smooth, complete.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, robust, triangular and compressed, simple or poorly divided on the anterior ones, and smaller on the lateral ones.<br><strong>Shape of the root :</strong> Compressed and little extended in the anteriors, very extended in the sides, with nutritional canal almost erased.<br><strong>Notes:</strong> In Morocco, it is more common in the north.<br>",
        species28Description: "<strong>Shape of the crown of the tooth:</strong> The crowns of the lateral teeth are wider than those of the anterior ones, the latter are high, somewhat narrow and symmetrically triangular.<br><strong>Edge of the tooth:</strong> Smooth and complete.<br><strong>Striae:</strong> No<br><strong>Lateral cusps:</strong> Yes, thin on the anterior ones and wide and triangular on the lateral ones.<br><strong>Shape of the root:</strong> The nutritional canal is vestigial, with a pore. The lobes can vary from pointed to round.<br><strong>Notes:</strong> More robust and larger than Brachycarcharias atlasi, with the base of the crown wider than 1.5 to 3 cm.<br>",
        species29Description: "<strong>Tooth crown shape:</strong> Inner surface convex, outer surface slightly convex, edges flat.<br><strong>Tooth edge:</strong> Smooth, complete.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, triangular and compressed or reduced.<br><strong>Root shape:</strong> Weakly developed, nutritional canal not very marked.<br><strong>Notes:</strong> Usually associated with Galeocerdo latidens.<br>",
        species30Description: "<strong>Shape of the crown of the tooth:</strong> Narrow and thin, the upper lateral teeth have inclined crowns, the lower lateral ones, upright. Convex on both sides.<br><strong>Edge of the tooth:</strong> Smooth and complete.<br><strong>Striations:</strong> Yes, on the lingual surface, very prominent and spaced up to 2/3 of the crown.<br><strong>Lateral cusps:</strong> No, the cutting edge continues to the lobes of the root.<br><strong>Notes:</strong> Maximum size 11 mm. striae and continuous crown on the root lobes without denticles.<br>",
        species31Description: "<strong>Shape of the tooth crown:</strong> Triangular, very compressed dorsoventrally, straighter and thinner anteriors, and lateral sides inclined towards the commissural edge.<br><strong>Edge of the tooth:</strong> Smooth and complete.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> No<br><strong>Notes:</strong> Synonym of Isurus praecursor.<br>",
        species32Description: "<strong>Tooth crown shape:</strong> Similar to Squalicorax bassanii, but less tall.<br><strong>Edge of the tooth:</strong> Serrated, with coarse serrations that become finer near the root, with secondary serrations.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> No<br><strong>Notes:</strong> The main difference is the secondary serrations in each of the main serrations.<br>",
        species33Description: "<strong>Shape of the crown of the tooth:</strong> Wide, only narrowing at the apex (less than 90 degrees). The anterior teeth do not have a notch, the lateral ones do.<br><strong>Edge of the tooth:</strong> Serrated, with thick serrations that are They become finer near the root. With secondary serrations on the main ones.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> No<br><strong>Notes:</strong> It differs from S. yangaensis because the notch is not always present and they are wider.<br>",
        species34Description: "<strong>Maximum size:</strong> 20 mm.<br><strong>Crown shape:</strong> Small, oblique mesial and distal edge practically vertical, which may end in a notch.<br><strong>Tooth edge:</strong> Serrated, with very fine serrations.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> No<br><strong>Notes:</strong> The smallest and with the finest serrations of all the Squalicorax.<br>",
        species35Description: "<strong>Maximum size:</strong> 30 mm<br><strong>Tooth crown shape:</strong> Broad, compressed and apiculated.<br><strong>Tooth edge:</strong> Serrated, with fine serrations (40 to 50 per side).<br><strong>Striations:</strong> No <br><strong>Lateral cusps:</strong> No<br><strong>Notes:</strong> The largest of all Squalicorax species, symphyseal side of the crown arched, without gibbosity or sinuosity.<br>",
        species36Description: "<strong>Crown shape:</strong> Low in relation to the root, it differs from other genera by having two enameled bumps on the labial side, just above each lobe of the root.<br><strong>Tooth edge:</strong> Smooth and complete. <br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, compressed and low, not very large.<br><strong>Root shape:</strong> Robust root, elongated and not very thick lobes, leaving a V-shaped area, similar to a boomerang. Without bourlette or nutritional channel.<br>",
        species37Description: "<strong>Crown shape:</strong> Narrow practically from the base. Flat lingual surface and convex labial surface. Small.<br><strong>Tooth edge:</strong> Smooth and complete.<br><strong>Striations:</strong> No<br><strong>Lateral cusps:</strong> Yes, compressed, sometimes double on the sides, the second being very small.<br><strong>Root shape:</strong> Large compared to the crown, especially on the sides. It is square in shape, and thin, with a very small area on the sides. pore, the nutritional canal may be poorly marked.<br>",
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const languageButtons = document.querySelectorAll("#language-selection button");

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            const language = button.id.includes("spanish") ? "es" : "en";
            setLanguage(language);
        });
    });

    const savedLanguage = localStorage.getItem("language") || "es";
    setLanguage(savedLanguage);

    // Ensure these elements exist in the DOM before accessing them
    const startButton = document.getElementById("start-btn");
    const infoButton = document.getElementById("info-btn");
    const closeModalButton = document.getElementById("close-modal");
    const speciesButton = document.getElementById("species-list-btn");
    const closeSpeciesModalButton = document.getElementById("close-species-modal");
    const restartButton = document.getElementById("restart-btn");
    const backButton = document.getElementById("back-btn");
    const backButtonResult = document.getElementById("back-btn-result");
    const restartButtonResult = document.getElementById("restart-result-btn");

    // Add event listeners only if the elements exist
    if (startButton) startButton.addEventListener("click", startIdentification);
    if (infoButton) infoButton.addEventListener("click", showInfo);
    if (closeModalButton) closeModalButton.addEventListener("click", closeModal);
    if (speciesButton) speciesButton.addEventListener("click", showSpeciesList);
    if (closeSpeciesModalButton) closeSpeciesModalButton.addEventListener("click", closeSpeciesModal);
    if (restartButton) restartButton.addEventListener("click", restart);
    if (backButton) backButton.addEventListener("click", goBack);
    if (backButtonResult) backButtonResult.addEventListener("click", goBack);
    if (restartButtonResult) restartButtonResult.addEventListener("click", restart);

    // Agregar eventos a los botones de opciones
    document.getElementById("option1-btn").addEventListener("click", () => handleOption(0));
    document.getElementById("option2-btn").addEventListener("click", () => handleOption(1));
});

function startIdentification() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("question-screen").classList.remove("hidden");
    currentStep = 0;
    history = [];
    showQuestion();
    applyLanguage();
}

function showQuestion() {
    const savedLanguage = localStorage.getItem("language") || "es";
    const langKey = `question${currentStep + 1}`;
    document.getElementById("question-text").innerHTML = translations[savedLanguage][langKey];
    document.getElementById("option1-btn").innerText = translations[savedLanguage].yes;
    document.getElementById("option2-btn").innerText = translations[savedLanguage].no;
}

function handleOption(optionIndex) {
    history.push(currentStep);
    const nextStep = questions[currentStep].next[optionIndex];
    if (typeof nextStep === 'object' && nextStep.name) {
        // Buscar la especie correspondiente en speciesData
        const result = speciesData.find(species => species.name === nextStep.name);
        if (result) {
            showResult(result);
        }
    } else {
        currentStep = nextStep;
        showQuestion();
    }
}

function showResult(result) {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    // Mostrar el texto del resultado
    document.getElementById("result-text").textContent = result.name;

    // Ocultar todas las descripciones de especies
    const descriptions = document.querySelectorAll('.species-description');
    descriptions.forEach(description => {
        description.classList.add('hidden');
    });

    // Mostrar la descripción de la especie específica
    const savedLanguage = localStorage.getItem("language") || "es";
    const descriptionKey = `species${result.species}Description`;
    const descriptionElement = document.getElementById(`species${result.species}-description`);
    
    if (descriptionElement) {
        descriptionElement.innerHTML = translations[savedLanguage][descriptionKey];
        descriptionElement.classList.remove('hidden');
    }

    // Actualizar la imagen de la especie
    document.getElementById("result-image").src = `img/${result.image}`;

    // Assign the identified species to the global result variable
    window.result = result;
}

function goBack() {
    if (history.length > 0) {
        currentStep = history.pop();
        document.getElementById("result-screen").classList.add("hidden");
        document.getElementById("question-screen").classList.remove("hidden");
        showQuestion();
    } else {
        // If there's no history, go back to the welcome screen
        restart();
    }
}

function restart() {
    history = [];
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");
    applyLanguage();
}

function showInfo() {
    document.getElementById("info-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("info-modal").classList.add("hidden");
}

function showSpeciesList() {
    document.getElementById("species-modal").classList.remove("hidden");
}

function closeSpeciesModal() {
    document.getElementById("species-modal").classList.add("hidden");
}

function setLanguage(language) {
    localStorage.setItem("language", language);
    updateContent(language);
}

function updateContent(language) {
    const elements = document.querySelectorAll("[data-lang-key]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-lang-key");
        element.innerHTML = translations[language][key];
    });
}

function applyLanguage() {
    const savedLanguage = localStorage.getItem("language") || "es";
    updateContent(savedLanguage);
}

// Initial language application on load
const savedLanguage = localStorage.getItem("language") || "es";
updateContent(savedLanguage);