export const MOCK_CLAN = {
  tag: "#2PP",
  name: "Mock Warriors",
  type: "inviteOnly",
  description: "This is a mock clan for development purposes since the real API is blocking our Vercel IP. We win wars!",
  location: { id: 32000113, name: "India", isCountry: true },
  badgeUrls: {
    small: "https://api-assets.clashofclans.com/badges/70/MvL0s3kZ5j6sK7k0.png",
    large: "https://api-assets.clashofclans.com/badges/512/MvL0s3kZ5j6sK7k0.png",
    medium: "https://api-assets.clashofclans.com/badges/200/MvL0s3kZ5j6sK7k0.png"
  },
  clanLevel: 15,
  clanPoints: 45000,
  clanVersusPoints: 30000,
  members: 42,
  memberList: [
    {
      tag: "#PY9",
      name: "The King",
      role: "leader",
      expLevel: 245,
      league: {
         name: "Legend League",
         iconUrls: { medium: "https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png" }
      },
      trophies: 5400,
      clanRank: "leader",
      donations: 12500
    },
    {
      tag: "#ABC",
      name: "Night Witch",
      role: "coLeader",
      expLevel: 190,
      league: {
         name: "Titan League I",
         iconUrls: { medium: "https://api-assets.clashofclans.com/leagues/288/qVCZmeYH0lS7Gaa6YH8eZNvdbPaLnby5bcNAw5liV-o.png" }
      },
      trophies: 4800,
      clanRank: "coLeader",
      donations: 8000
    },
    {
      tag: "#XYZ",
      name: "Barbarian",
      role: "member",
      expLevel: 100,
      league: {
         name: "Gold League I",
         iconUrls: { medium: "https://api-assets.clashofclans.com/leagues/288/8-c4-w7146y6c-i7216-9-2c7-w816.png" }
      },
      trophies: 2100,
      clanRank: "member",
      donations: 500
    }
  ],
  warWins: 312,
  warWinStreak: 5,
  isWarLogPublic: true
};

export const MOCK_PLAYER = {
  tag: "#G88",
  name: "Chief Demo",
  townHallLevel: 13,
  townHallWeaponLevel: 4,
  expLevel: 185,
  trophies: 4200,
  league: {
    name: "Titan League II",
    iconUrls: { medium: "https://api-assets.clashofclans.com/leagues/288/qVCZmeYH0lS7Gaa6YH8eZNvdbPaLnby5bcNAw5liV-o.png" }
  },
  heroes: [
    { name: "Barbarian King", level: 65, village: "home" },
    { name: "Archer Queen", level: 70, village: "home" },
    { name: "Grand Warden", level: 40, village: "home" },
    { name: "Royal Champion", level: 15, village: "home" }
  ],
  troops: [
    { name: "Barbarian", level: 9, village: "home" },
    { name: "Archer", level: 9, village: "home" },
    { name: "Dragon", level: 8, village: "home" },
    { name: "P.E.K.K.A", level: 9, village: "home" },
    { name: "Hog Rider", level: 10, village: "home" },
    { name: "Electro Dragon", level: 4, village: "home" },
    { name: "Yeti", level: 3, village: "home" }
  ]
};

