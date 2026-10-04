/* Add a creator here, then copy lada/index.html to /{id}/index.html
   and set LOVIX_PAGE to that id. Photos live in /{id}/media/.
   The first slide is the one that opens the page and the offer. */
var LOVIX_MODELS = [
  {
    id: "lada",
    name: "Lada",
    videos: 139,
    photos: 96,
    verified: true,
    avatar: "/lada/media/avatar.jpg",
    card: "/lada/media/01.jpg",
    affiliate: "https://dvaphrh.girlcamshot.com/uyzk5zt?s1=lovix_landing_lada",
    slides: [
      { src: "/lada/media/04.jpg", w: 583, h: 789 },
      { src: "/lada/media/02.jpg", w: 582, h: 792 },
      { src: "/lada/media/01.jpg", w: 582, h: 787 },
      { src: "/lada/media/03.jpg", w: 591, h: 786 },
      { src: "/lada/media/05.jpg", w: 591, h: 796 },
      { src: "/lada/media/06.jpg", w: 596, h: 794 },
      { src: "/lada/media/07.jpg", w: 584, h: 798, locked: true }
    ],
    strip: [
      { src: "/lada/media/02.jpg", w: 582, h: 792 },
      { src: "/lada/media/01.jpg", w: 582, h: 787 },
      { src: "/lada/media/03.jpg", w: 591, h: 786 },
      { src: "/lada/media/07.jpg", w: 584, h: 798, locked: true }
    ]
  }
];

function lovixModel(id) {
  for (var i = 0; i < LOVIX_MODELS.length; i++) {
    if (LOVIX_MODELS[i].id === id) return LOVIX_MODELS[i];
  }
  return null;
}
