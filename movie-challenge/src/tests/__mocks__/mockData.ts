export const fakeData1 = {
  adult: false,
  backdrop_path: "/1wP1phHo2CROOqzv7Azs0MT5esU.jpg",
  genre_ids: [16, 35, 10751, 12, 28],
  id: 748783,
  original_language: "en",
  original_title: "The Garfield Movie",
  overview:
    "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
  popularity: 729.463,
  poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
  release_date: "2024-04-30",
  title: "The Garfield Movie",
  video: false,
  vote_average: 7.139,
  vote_count: 865,
};
// export const mockResponse1 = {
//       results: [
//         {
//           title: "The Garfield Movie",
//           poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
//           release_date: "2024-04-30",
//           genre_ids: [
//             16,
//             35,
//             10751,
//             12,
//             28
//           ],
//           id:  748783,
//           overview:"Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
//           vote_average: 7.139,
//           vote_count: 865,
//         },
//       ],
//       page: 1,
//       total_pages: 10,
//     }
export const mockResponse1 = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/1wP1phHo2CROOqzv7Azs0MT5esU.jpg",
      genre_ids: [16, 35, 10751, 12, 28],
      id: 748783,
      original_language: "en",
      original_title: "The Garfield Movie",
      overview:
        "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
      popularity: 729.463,
      poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
      release_date: "2024-04-30",
      title: "The Garfield Movie",
      video: false,
      vote_average: 7.139,
      vote_count: 865,
    },
  ],
  total_pages: 10,
  total_results: 1,
};

export const genreFakeData1 = [
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 28,
    name: "Action",
  },
];
export const resultFakeData1 = {
  metaData: {
    pagination: {
      currentPage: 1,
      totalPages: 500,
    },
  },
  movies: [
    {
      genre_ids: [16, 35, 10751, 12, 28],
      genres: ["Animation", "Comedy", "Family", "Adventure", "Action"],
      id: 748783,
      overview:
        "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
      poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
      release_date: "2024-04-30",
      title: "The Garfield Movie",
      vote_average: 7.139,
      vote_count: 865,
    },
  ],
};
