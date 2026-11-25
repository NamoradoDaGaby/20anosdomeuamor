/* ============================================================
   CONFIGURAÇÃO CENTRAL DO ÁLBUM — tudo que você edita está aqui.
   ============================================================ */
window.ALBUM_CONFIG = {

  /* >>> DATA E HORA DE INÍCIO (única variável do contador) <<<
     Formato "AAAA-MM-DDTHH:MM:SS-03:00" (-03:00 = Brasília). */
  startDate: "2024-06-13T00:00:00-03:00",

  /* Nome dela e nome do casal (aparecem na capa e na abertura) */
  herName: "[Meu amor]",
  couple: ["[Rafael]", "[Gabrielly]"],

  /* Música: coloque o MP3 em assets/music/. src vazio ("") esconde o botão. */
  music: { src: "assets/music/musica.mp3", volume: 0.6 },

  /* Etiqueta "texto de exemplo" nas páginas demonstrativas (troque por false no final) */
  showDemoTags: false,

  /* Apresentação inicial (textos de exemplo — troque pelos seus) */
  intro: ["Preparei uma coisa para você.", "Foi feita devagar, página por página."],

  cover: {
    title: "Nossa História",
    subtitle: "uma história que merece ser lembrada",
    photo: "assets/images/casal/capa.jpg", photoPos: "50% 35%",
    openLabel: "Abrir o presente"
  },

  /* 14 páginas internas (número PAR).
     theme: rapunzel | stitch | bts | tiana | neutral | night       chapter: título ao chegar na página
     Tipos: intro, text, photo, hero, counter, polaroids, dates, collage, quote, loves, letter, duo, final.
     pos: enquadramento da foto ("x% y%"): muda qual parte da foto aparece na moldura.
     stickers: imagens PNG transparentes (x, y, w em unidades da página: 100 = largura; r = rotação; flip = espelhar;
               behind + o = marca-d'água atrás do conteúdo, com opacidade o).
     Quer adicionar mais adesivos (Pascal, lanternas, lightstick, sapo...)? Salve o PNG na pasta do universo e
     acrescente uma linha em stickers. Referências religiosas só entram se VOCÊ fornecer e aprovar o material. */
  pages: [
    { type: "intro", theme: "neutral", chapter: "Prólogo", demo: true,
      title: "Para você",
      text: "Este álbum foi feito com carinho, para guardar o que o dia a dia nem sempre deixa dizer.",
      sign: "com amor, do seu be" },

    { type: "photo", theme: "rapunzel", chapter: "Era uma vez",
      photo: "assets/images/casal/foto-01.jpg", pos: "50% 40%", title: "Nós dois", caption: "do jeito que a gente é" },

    { type: "text", theme: "rapunzel", demo: true,
      stickers: [
        { src: "assets/images/rapunzel/rapunzel.png", x: 56, y: 36, w: 38, r: 3 }
      ],
      title: "Como tudo começou",
      text: "De tantas coisas que aconteceram comigo naquela Etec, desde eu escolher a minha profissão à trabalhar lá, você sem duvidas foi a melhor coisa que me aconteceu, sempre me pego pensando o quão incrível você é." },

    { type: "counter", theme: "night", chapter: "O tempo da nossa história",
      title: "O tempo da nossa história",
      lead: "Desde que nossas histórias se encontraram...",
      foot: "e a conta continua." },

    { type: "polaroids", theme: "stitch", chapter: "Pequenas aventuras",
      stickers: [
        { src: "assets/images/stitch/stitch-01.png", x: 63, y: 106, w: 24, r: 6 }
      ],
      title: "Pequenas lembranças",
      items: [
        { photo: "assets/images/casal/polaroid-01.jpg", pos: "50% 28%", caption: "rir é melhor assim" },
        { photo: "assets/images/casal/polaroid-02.jpg", pos: "50% 72%", caption: "sem pose" },
        { photo: "assets/images/casal/polaroid-03.jpg", pos: "50% 42%", caption: "do nosso jeito" }
      ] },

    { type: "dates", theme: "stitch", demo: true,
      stickers: [
        { src: "assets/images/stitch/stitch-01.png", x: 68, y: 106, w: 20, r: -6, flip: true }
      ],
      title: "Datas que guardo",
      items: [
        { date: "13 de junho de 2024", text: "O começo da nossa história" },
        { date: "27 de julho de 2024", text: "O dia que eu te dei a nossa aliança" },
        { date: "29 de novembro de 2025", text: "A nossa primeira viagem" },
        { date: "17 de dezembro de 2026", text: "A nossa próxima viagem" }
      ] },

    { type: "collage", theme: "tiana", chapter: "Entre lírios e vaga-lumes",
      title: "Fotografias que guardam histórias",
      photos: ["assets/images/casal/colagem-01.jpg", "assets/images/casal/colagem-02.jpg", "assets/images/casal/colagem-03.jpg"],
      pos: ["50% 42%", "50% 35%", "50% 8%"],
      caption: "pequenos instantes, grandes lembranças" },

    { type: "hero", theme: "tiana",
      stickers: [
        { src: "assets/images/princesa-sapo/tiana-naveen.png", x: 56, y: 78, w: 38, r: 2 }
      ],
      photo: "assets/images/casal/destaque.jpg", pos: "50% 30%", title: "Momentos especiais",
      text: "Cada lugar fica mais bonito ao seu lado." },

    { type: "quote", theme: "bts", chapter: "Constelação", demo: true,
      stickers: [
        { src: "assets/images/bts/bts-logo-roxo.png", x: 30, y: 34, w: 40, o: 0.13, behind: true, r: 0 }
      ],
      text: "Eu te amo o tanto que você gosta do BTS", author: "do seu mo" },

    { type: "loves", theme: "bts", demo: true,
      stickers: [
        { src: "assets/images/bts/bts-logo.png", x: 78, y: 100, w: 13, r: 6 }
      ],
      title: "Pequenas coisas que amo em você",
      items: ["Yo, ma honey", "bol ttaemada sumi makyeo myeongdong georicheoreom", "uriui BGMeun sumsori", "nae ireumeul bulleojul ttae-ui ni moksorie", "jamgyeoseo nan suyeonghagopa neoreul jom deo algopa"] },

    { type: "letter", theme: "neutral", chapter: "Uma carta para você", demo: true,
      greeting: "Meu amor,",
      text: "Meu amor, desde que você chegou, meus dias ficaram mais felizes e minha vida ganhou um sentido ainda mais bonito. Amo seu sorriso, seu abraço e a paz que sinto ao seu lado. Cada momento com você se tornou uma lembrança especial, e, se pudesse escolher novamente, eu escolheria você, sempre" },

    { type: "letter", theme: "neutral", demo: true,
      text: "Quero criar lembranças ao seu lado, descobrir novos lugares e encontrar motivos para me apaixonar por você. Não sei o que o futuro nos reserva, mas quero vivê-lo com você, de mãos dadas, compartilhando sonhos, sorrisos e carinho. Obrigado por fazer parte da minha história. Eu te amo, hoje e sempre!",
      sign: "Do seu amor" },

    { type: "duo", theme: "neutral",
      title: "Nossos momentos favoritos",
      items: [
        { photo: "assets/images/casal/favorita-01.jpg", pos: "50% 42%", caption: "o seu sorriso" },
        { photo: "assets/images/casal/favorita-02.jpg", pos: "50% 48%", caption: "do nosso jeito" }
      ] },

    { type: "final", theme: "night", chapter: "Última página (por enquanto)", demo: true,
      text: "E se eu pudesse escolher novamente, ainda escolheria viver tudo isso com você.",
      small: "e a nossa história ainda está sendo escrita..." }
  ],

  back: { text: "continua..." }
};
