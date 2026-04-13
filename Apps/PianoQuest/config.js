// ============================================================
// PIANO QUEST — CONFIG DATA
// All theme, battle, and avatar configuration in one place.
// Loaded as plain JS before the JSX components.
// ============================================================

// ── Shared item slot order (all themes use the same 18 upgrade keys) ──
const ITEM_SLOTS = [
  "hat","hat_up","shirt","shirt_up","wand","wand_up",
  "leo","leo_up","gir","gir_up","skate","skate_up",
  "book","book_up","shield","cape","gold","ring",
];

// ── Theme-specific item names / icons / descriptions ──
// Each array is 18 entries matching ITEM_SLOTS order.
const THEME_ITEMS = {
  space: [
    { n:"Pilot Helmet",    i:"🪖", d:"Standard helmet for space travel." },
    { n:"Golden Plume",    i:"🪶", d:"Upgraded! Allows high-altitude navigation." },
    { n:"Blue Spacesuit",  i:"🧥", d:"Shields from cosmic radiation." },
    { n:"Lightning Button",i:"⚡", d:"Suit upgraded! Now shoots energy sparks!" },
    { n:"Oak Wand",        i:"🪄", d:"Channels solar energy." },
    { n:"Ruby Core",       i:"🔮", d:"Wand upgraded! Fires thermal beams." },
    { n:"Perdlear",        i:"🐆", d:"Your space-leopard co-pilot joins!" },
    { n:"Jet Boots",       i:"👟", d:"Leopard upgraded! Perdlear can fly!" },
    { n:"Raffjie",         i:"🦒", d:"Raffjie the Space Sheriff arrives!" },
    { n:"Law Star",        i:"⭐", d:"Giraffe upgraded! Chief of Space Law." },
    { n:"Hoverboard",      i:"🛹", d:"Glides on solar winds." },
    { n:"Plasma Thrusters",i:"🔥", d:"Board upgraded! Horizontal fire trails!" },
    { n:"Star Chart",      i:"📖", d:"Contains maps of the entire galaxy." },
    { n:"Gem of Life",     i:"💎", d:"Chart upgraded! It flies and talks!" },
    { n:"Aura Shield",     i:"🛡️", d:"Protects against gravity wells." },
    { n:"Comet Cape",      i:"🧣", d:"Woven from the tail of a comet." },
    { n:"Solar Glow",      i:"✨", d:"Party shines with the light of a sun." },
    { n:"UNIVERSAL COMPASS",i:"💍",d:"MISSION COMPLETE! YOU ARE LEGENDARY!" },
  ],
  pirate: [
    { n:"Tricorn Hat",     i:"🎩", d:"A captain's hat, feared across the seas." },
    { n:"Skull & Quill",   i:"🪶", d:"Upgraded! Now strikes terror in enemies." },
    { n:"Pirate Coat",     i:"🧥", d:"A weathered coat of the high seas." },
    { n:"Golden Buckle",   i:"🏅", d:"Coat upgraded! Legendary buckle attached." },
    { n:"Cutlass",         i:"⚔️", d:"A razor-sharp blade of the sea." },
    { n:"Flaming Cutlass", i:"🔥", d:"Blade upgraded! Burns through anything." },
    { n:"Patches",         i:"🐱", d:"A fierce ship's cat joins your crew!" },
    { n:"Claw Boots",      i:"👢", d:"Cat upgraded! Patches can leap masts!" },
    { n:"Polly",           i:"🦜", d:"Polly the Parrot Scout arrives!" },
    { n:"Spyglass",        i:"🔭", d:"Parrot upgraded! Spots treasure miles away." },
    { n:"Rowboat",         i:"🚣", d:"A trusty vessel for sea exploration." },
    { n:"Cannon Oars",     i:"💥", d:"Rowboat upgraded! Fires as it rows!" },
    { n:"Treasure Map",    i:"🗺️", d:"Marks every treasure on the ocean floor." },
    { n:"Kraken Compass",  i:"🧭", d:"Map upgraded! Points to kraken lairs." },
    { n:"Barnacle Shield", i:"🛡️", d:"Encrusted with impenetrable barnacles." },
    { n:"Sea Spray Cloak", i:"🌊", d:"Woven from enchanted sea foam." },
    { n:"Doubloon Aura",   i:"🪙", d:"Party gleams with legendary gold light." },
    { n:"DAVY JONES' RING",i:"💀", d:"VOYAGE COMPLETE! YOU ARE LEGENDARY!" },
  ],
  forest: [
    { n:"Leaf Crown",       i:"🌿", d:"Woven from enchanted elder leaves." },
    { n:"Antler Crown",     i:"🦌", d:"Upgraded! Commands woodland creatures." },
    { n:"Bark Armour",      i:"🪵", d:"Carved from ancient oak, tough as stone." },
    { n:"Moss Cloak Trim",  i:"🌱", d:"Armour upgraded! Heals slowly in forests." },
    { n:"Elderwood Staff",  i:"🪄", d:"Cut from the heart of the oldest tree." },
    { n:"Thorn Tip",        i:"🌵", d:"Staff upgraded! Fires thorn volleys!" },
    { n:"Briar",            i:"🦊", d:"Briar the cunning fox joins your path!" },
    { n:"Shadow Step",      i:"🐾", d:"Fox upgraded! Moves silently anywhere." },
    { n:"Mossy",            i:"🦉", d:"Mossy the wise owl arrives!" },
    { n:"Night Sight Gem",  i:"💚", d:"Owl upgraded! Sees all in darkness." },
    { n:"Vine Swing",       i:"🌿", d:"Swing through the forest canopy." },
    { n:"Wind Rider",       i:"🍃", d:"Vine upgraded! Rides the forest wind!" },
    { n:"Nature Codex",     i:"📗", d:"Every plant, beast and secret recorded." },
    { n:"Speaking Acorn",   i:"🌰", d:"Codex upgraded! Whispers ancient secrets." },
    { n:"Tortoise Shell",   i:"🛡️", d:"Borrowed from the great forest tortoise." },
    { n:"Petal Mantle",     i:"🌸", d:"Woven from ten thousand blossoms." },
    { n:"Sunbeam Aura",     i:"☀️", d:"Party glows with the light of the canopy." },
    { n:"HEART OF THE FOREST",i:"🍀",d:"QUEST COMPLETE! THE FOREST IS YOURS!" },
  ],
  dragon: [
    { n:"Dragon Scale Cap", i:"🐉", d:"A cap made from shed dragon scales." },
    { n:"Horned Helm",      i:"🪖", d:"Upgraded! Channels draconic power." },
    { n:"Flame Jerkin",     i:"🧥", d:"Fireproof leather from the Ashen Wastes." },
    { n:"Dragon Crest",     i:"🔴", d:"Jerkin upgraded! Bears the Dragon King's seal." },
    { n:"Ember Rod",        i:"🪄", d:"Glows with captured dragonfire." },
    { n:"Inferno Core",     i:"🔥", d:"Rod upgraded! Unleashes a torrent of flame!" },
    { n:"Cinder",           i:"🦎", d:"Cinder the fire lizard joins your quest!" },
    { n:"Magma Scales",     i:"🌋", d:"Lizard upgraded! Becomes fireproof!" },
    { n:"Wyrmling",         i:"🐲", d:"A baby dragon hatchling bonds with you!" },
    { n:"First Flight",     i:"💨", d:"Wyrmling upgraded! Now carries you aloft!" },
    { n:"Lava Board",       i:"🏄", d:"Surfs the rivers of molten rock." },
    { n:"Pyroclast Drive",  i:"💥", d:"Board upgraded! Blasts forward on eruptions!" },
    { n:"Draconic Tome",    i:"📕", d:"Ancient spells written in dragonscript." },
    { n:"Living Flame",     i:"🕯️", d:"Tome upgraded! The flame within speaks!" },
    { n:"Obsidian Ward",    i:"🛡️", d:"Forged in the heart of a dead volcano." },
    { n:"Ember Cloak",      i:"🌋", d:"Trails glowing cinders as you move." },
    { n:"Dragon Aura",      i:"✨", d:"Party radiates the power of dragonkind." },
    { n:"DRAGON CROWN",     i:"👑", d:"REALM CONQUERED! YOU ARE DRAGONLORD!" },
  ],
  underwater: [
    { n:"Diving Helmet",   i:"🪖", d:"A pressurised helmet for the deep." },
    { n:"Sonar Crown",     i:"👑", d:"Upgraded! Detects creatures in the dark." },
    { n:"Wetsuit",         i:"🤿", d:"Protects against deep sea pressure." },
    { n:"Bioluminescent Stripe",i:"💡", d:"Suit upgraded! Glows in the abyss." },
    { n:"Trident",         i:"🔱", d:"A three-pronged weapon of the sea." },
    { n:"Electric Trident",i:"⚡", d:"Trident upgraded! Zaps enemies!" },
    { n:"Finley",          i:"🐬", d:"Finley the dolphin joins your squad!" },
    { n:"Speed Fins",      i:"🏊", d:"Dolphin upgraded! Breaks ocean speed records!" },
    { n:"Shelby",          i:"🐢", d:"Shelby the ancient sea turtle arrives!" },
    { n:"Shell Cannon",    i:"🌀", d:"Turtle upgraded! Fires coral missiles." },
    { n:"Submarine",       i:"🚢", d:"A miniature personal submarine." },
    { n:"Torpedo Bay",     i:"💨", d:"Sub upgraded! Fires at full speed." },
    { n:"Ancient Coral Map",i:"🗺️",d:"Maps every trench and cave below." },
    { n:"Atlantis Codex",  i:"📜", d:"Map upgraded! Contains lost Atlantis secrets." },
    { n:"Anemone Shield",  i:"🛡️", d:"Stings anything that gets too close." },
    { n:"Kelp Cloak",      i:"🌿", d:"Woven from enchanted deep-sea kelp." },
    { n:"Pearl Aura",      i:"🫧", d:"Party shimmers with deep ocean light." },
    { n:"ATLANTIS CROWN",  i:"🔱", d:"MISSION COMPLETE! YOU ARE LEGENDARY!" },
  ],
};

// ── Build full items array for a theme (merges slot keys with theme-specific data) ──
function buildItems(themeId) {
  return ITEM_SLOTS.map((up, i) => ({ up, ...THEME_ITEMS[themeId][i] }));
}

// ── STORY THEMES (deduplicated) ──
const STORY_THEMES = {
  space: {
    id: "space", name: "Space Adventure", heroName: "Star-Pilot",
    bgColor: "#000008", accentColor: "#60a5fa", bgStars: true,
    zoneColors: ["#1e293b","#451a03","#78350f","#1e3a8a","#064e3b","#2e1065","#7c2d12","#1a1a3e","#3b1a1a","#0a2a1a"],
    skyColors: ["#000020","#0a0015","#001020","#000820","#001500","#100020","#200010"],
    groundColors: ["#1a1a2e","#2a1500","#3a2000","#001535","#002515","#150030","#301000"],
    hillColors: ["#16213e","#3d1a00","#5a3000","#002952","#003d20","#220050","#501800"],
    enemies: ["Void Wraith","Astro-Specter","Cosmic Slug","Star Hydra","Plasma Drake","Nebula Beast","Time Phantom","Quasar Titan","Dark Comet","Solar Serpent","Gravity Ghoul","Ion Stalker","Rogue Satellite","Space Kraken","Meteor Golem","Warp Demon","Pulsar Spider","Black Hole Fiend","Void Leviathan","MEWTWO"],
    locations: ["Mercury Trench","Martian Ruins","Saturn Sand-Rings","Neptune Abyss","Venus Jungle","Pluto Void","Sun Citadel","Andromeda Gate","Titan Caverns","Orion Outpost"],
    winItem: "💍", winTitle: "UNIVERSAL COMPASS FOUND!", winMsg: "You conquered the Star Realms!",
    restartBtn: "New Expedition", lootTitle: "Dimension Victory!",
    engageBtn: "Engage Piano Link", defeatBtn: "Defeat Monster",
    timeLabel: "Oxygen Remaining", mapLabel: "Star Chart",
    bgObjects: ["⭐","🌟","💫","✨","🌠"],
    gearColors: { shirt:"#3b82f6", hat:"#334155", cape:"#7c3aed", legs:"#1d4ed8", shield:"#a855f7", wand_gem:"#ef4444", leoEmoji:"🐆", girEmoji:"🦒" },
  },
  pirate: {
    id: "pirate", name: "Pirate Adventure", heroName: "Captain",
    bgColor: "#0a0500", accentColor: "#f59e0b", bgStars: false,
    zoneColors: ["#1a0a00","#2a1500","#0a1a00","#001020","#1a0020","#200010","#0a0a1a","#1a1000","#001a1a","#1a0010"],
    skyColors: ["#0a1520","#152030","#0a2030","#051520","#102030","#0a1030","#152040"],
    groundColors: ["#2a1500","#1a0a00","#251000","#0a1a00","#001500","#1a0020","#200a00"],
    hillColors: ["#3d2000","#2a1000","#352000","#0a2800","#002500","#2a0030","#300f00"],
    enemies: ["Barnacle Ghoul","Siren Wraith","Kraken Claw","Sea Serpent","Cursed Galleon","Davy's Shadow","Tide Phantom","Reef Monster","Storm Hydra","Coral Golem","Ghost Sailor","Leech Demon","Whirlpool Beast","Maelstrom Fiend","Moby Ghost","Fog Wraith","Cannonball Specter","Abyssal Shark","Dead Man's Echo","DAVY JONES"],
    locations: ["Tortuga Cove","Skull Island","Dead Man's Reef","Siren Shores","The Kraken's Den","Davy's Locker","Port of No Return","Cursed Lagoon","Shipwreck Bay","Sun Citadel of the Sea"],
    winItem: "💀", winTitle: "DAVY JONES' RING CLAIMED!", winMsg: "You conquered the Seven Seas!",
    restartBtn: "New Voyage", lootTitle: "Plunder Victory!",
    engageBtn: "Strike the Keys", defeatBtn: "Defeat the Beast",
    timeLabel: "Rum Remaining", mapLabel: "Treasure Map",
    bgObjects: ["🌊","⚓","🏴‍☠️","🌙","⭐"],
    gearColors: { shirt:"#1e3a5f", hat:"#1a1a1a", cape:"#7f1d1d", legs:"#1c1c1c", shield:"#92400e", wand_gem:"#f97316", leoEmoji:"🐱", girEmoji:"🦜" },
  },
  forest: {
    id: "forest", name: "Forest Adventure", heroName: "Ranger",
    bgColor: "#010a01", accentColor: "#4ade80", bgStars: false,
    zoneColors: ["#052505","#0a1a05","#052010","#0a2005","#051505","#0a1505","#052015","#071a05","#051a08","#081505"],
    skyColors: ["#071a07","#0a2008","#05180a","#081a05","#071505","#091a08","#061808"],
    groundColors: ["#031503","#051205","#041403","#061505","#051005","#041305","#051404"],
    hillColors: ["#0a2a0a","#0d2a08","#0a2810","#0d280a","#0a2008","#0c2a0a","#0a2808"],
    enemies: ["Briar Wolf","Thorn Sprite","Mud Golem","Fungus Wraith","Poison Adder","Hollow Bear","Root Demon","Bog Hag","Bark Titan","Shade Fox","Creeper Vine","Stone Troll","Cursed Elk","Swamp Witch","Pollen Fiend","Shadow Boar","Web Spinner","Rot Drake","Forest Wraith","THE ANCIENT ONE"],
    locations: ["Whispering Glade","Thorn Thicket","Mossy Hollow","Elder Grove","Bogmarsh","Sunken Root","The Canopy","Darkwood Core","Fern Valley","Heart of the Forest"],
    winItem: "🍀", winTitle: "HEART OF THE FOREST FOUND!", winMsg: "You restored peace to the Ancient Wood!",
    restartBtn: "New Journey", lootTitle: "Forest Victory!",
    engageBtn: "Commune with Keys", defeatBtn: "Drive Back the Dark",
    timeLabel: "Daylight Remaining", mapLabel: "Forest Trail",
    bgObjects: ["🌿","🍃","🌸","🍄","🌲"],
    gearColors: { shirt:"#78350f", hat:"#166534", cape:"#15803d", legs:"#14532d", shield:"#713f12", wand_gem:"#84cc16", leoEmoji:"🦊", girEmoji:"🦉" },
  },
  dragon: {
    id: "dragon", name: "Dragon Realm", heroName: "Dragon Knight",
    bgColor: "#0a0000", accentColor: "#f87171", bgStars: false,
    zoneColors: ["#2a0000","#1a0500","#200800","#250300","#1a0800","#220500","#1e0300","#250800","#1a0600","#200400"],
    skyColors: ["#1a0505","#200808","#180606","#1c0505","#1a0707","#1d0505","#1b0606"],
    groundColors: ["#2a0808","#200505","#250606","#1e0707","#220505","#200606","#1e0505"],
    hillColors: ["#3d0a0a","#300808","#380909","#2e0909","#350808","#300a0a","#380808"],
    enemies: ["Ash Goblin","Ember Sprite","Lava Toad","Scale Wraith","Magma Crab","Bone Drake","Cinder Hound","Volcanic Imp","Fire Serpent","Molten Golem","Soot Demon","Brimstone Bat","Obsidian Knight","Pyroclast Titan","Ashen Hydra","Flame Wraith","Scorchback Drake","Inferno Lich","Chaos Dragon","THE DRAGON KING"],
    locations: ["Ashen Plains","Ember Wastes","Scorchback Ridge","Lava Crossing","Volcanic Spire","Dragon's Lair","Brimstone Keep","Magma Throne","Cinder Peak","The Dragon Citadel"],
    winItem: "👑", winTitle: "DRAGON CROWN CLAIMED!", winMsg: "You are the Dragon Realm's true ruler!",
    restartBtn: "New Conquest", lootTitle: "Draconic Victory!",
    engageBtn: "Sound the Battle Keys", defeatBtn: "Slay the Beast",
    timeLabel: "Fire Breath Remaining", mapLabel: "Dragon Realm Map",
    bgObjects: ["🔥","💥","🌋","🐉","⚡"],
    gearColors: { shirt:"#7f1d1d", hat:"#1c1917", cape:"#dc2626", legs:"#292524", shield:"#44403c", wand_gem:"#f97316", leoEmoji:"🦎", girEmoji:"🐲" },
  },
  underwater: {
    id: "underwater", name: "Underwater Adventure", heroName: "Deep Diver",
    bgColor: "#000a15", accentColor: "#06b6d4", bgStars: false,
    zoneColors: ["#001a2e","#002a1a","#001a1a","#0a0020","#001520","#002015","#0a1a20","#001020","#001510","#001a25"],
    skyColors: ["#001525","#002035","#001a30","#001020","#002025","#001535","#002040"],
    groundColors: ["#001a2e","#002a1a","#001515","#0a0a20","#001020","#001a15","#001525"],
    hillColors: ["#002952","#003d20","#002030","#100040","#001a35","#002040","#001535"],
    enemies: ["Anglerfish Specter","Moray Ghost","Jellyfish Wraith","Deep Crab Golem","Abyss Eel","Leviathan Claw","Brine Phantom","Vortex Shark","Coral Demon","Pressure Beast","Siren Ray","Trench Horror","Dark Octopus","Bio-Luminite","Shadow Whale","Cave Serpent","Tide Wraith","Abyssal Stalker","Sunken God","KRAKEN KING"],
    locations: ["Coral Kingdom","Sunken Ruins","The Abyss Gate","Bioluminous Cave","Atlantis Outpost","Pressure Ridge","Kelp Forest","Hydrothermal Vent","Crystal Caverns","Atlantis Citadel"],
    winItem: "🔱", winTitle: "ATLANTIS CROWN CLAIMED!", winMsg: "You conquered the Ocean Depths!",
    restartBtn: "Resurface & Retry", lootTitle: "Deep Sea Victory!",
    engageBtn: "Play the Ocean Keys", defeatBtn: "Banish the Beast",
    timeLabel: "Air Tank Remaining", mapLabel: "Ocean Chart",
    bgObjects: ["🫧","🐠","🐡","🦈","🌊"],
    gearColors: { shirt:"#0e7490", hat:"#164e63", cape:"#0284c7", legs:"#075985", shield:"#0f766e", wand_gem:"#06b6d4", leoEmoji:"🐬", girEmoji:"🐢" },
  },
};

// Attach computed items to each theme
Object.keys(STORY_THEMES).forEach(id => { STORY_THEMES[id].items = buildItems(id); });

// ── CONSTANTS ──
const MAX_GLOBAL_TIME = 1800;
const REP_LIMIT = 300;
const DEFAULT_SONGS = [
  { id: 1, name: "Hanon",            reps: 2 },
  { id: 2, name: "Tarantelle",       reps: 1 },
  { id: 3, name: "Animal Chit Chat", reps: 3 },
  { id: 4, name: "Valse",            reps: 3 },
  { id: 5, name: "Angels Voice",     reps: 3 },
];

// ── BATTLE FLAVOURS (per-theme, shared structure) ──
const BATTLE_FLAVOURS = {
  hero: {
    space:      { proj:"⚡", color:"#60a5fa", moves:["fires plasma burst","launches photon bolt","charges solar beam","fires ion cannon"] },
    pirate:     { proj:"⚔️", color:"#f59e0b", moves:["swings the cutlass","fires a cannonball","hurls the grapple","delivers a broadsword slash"] },
    forest:     { proj:"🌿", color:"#4ade80", moves:["hurls thorn volley","slams the staff","fires root spike","unleashes leaf storm"] },
    dragon:     { proj:"🔥", color:"#f97316", moves:["swings ember rod","breathes dragonfire","strikes with magma fist","hurls a lava bomb"] },
    underwater: { proj:"🔱", color:"#06b6d4", moves:["thrusts the trident","fires sonar pulse","summons tidal wave","casts sea storm"] },
  },
  leo: {
    space:      { proj:"🐆", color:"#a3e635", moves:["pounces with laser claws","tail-whips at warp speed","roars a sonic blast"] },
    pirate:     { proj:"🐱", color:"#fda4af", moves:["scratches with sharp claws","hisses a fierce battle cry","leaps across the mast"] },
    forest:     { proj:"🦊", color:"#fb923c", moves:["dashes with shadow step","bites with cunning fury","launches a fox fire"] },
    dragon:     { proj:"🦎", color:"#86efac", moves:["breathes ember flame","claws with magma scales","tail-swipes with scorching force"] },
    underwater: { proj:"🐬", color:"#67e8f9", moves:["slams with sonar blast","leaps and dive-bombs","spins a whirlpool charge"] },
  },
  gir: {
    space:      { proj:"🦒", color:"#fde68a", moves:["extends neck for a cosmic headbutt","stomps with graviton force","blasts a star beam"] },
    pirate:     { proj:"🦜", color:"#86efac", moves:["dive-bombs with sharp beak","shrieks a stunning cry","summons a feather storm"] },
    forest:     { proj:"🦉", color:"#c4b5fd", moves:["swoops with silent wings","casts a moonlight hex","drops a wisdom bomb"] },
    dragon:     { proj:"🐲", color:"#fca5a5", moves:["breathes baby dragonfire","flaps wings for a gust","tail-slams with growing might"] },
    underwater: { proj:"🐢", color:"#6ee7b7", moves:["fires a coral missile","retreats into shell-ram","shoots a water jet"] },
  },
  enemy: {
    space:      { proj:"💫", color:"#a855f7", moves:["shoots void shard","fires dark energy","blasts cosmic ray","launches gravity spike"] },
    pirate:     { proj:"💀", color:"#ef4444", moves:["lunges with claws","fires a cursed shot","hurls dark water","swings a rusty anchor"] },
    forest:     { proj:"🍄", color:"#a855f7", moves:["spews poison cloud","whips a vine","casts dark spore","releases thorn burst"] },
    dragon:     { proj:"💥", color:"#dc2626", moves:["exhales lava breath","slams obsidian claw","hurls fire bomb","rains molten boulders"] },
    underwater: { proj:"🌀", color:"#7c3aed", moves:["fires ink blast","swings tentacle","casts depth charge","summons crushing pressure"] },
  },
};

// ── ATTACK TYPES & EFFECTIVENESS ──
const ATTACK_TYPES = {
  slash: { emoji:"⚔️",  type:"physical", base:5 },
  blast: { emoji:"💥",  type:"fire",     base:6 },
  zap:   { emoji:"⚡",  type:"lightning",base:5 },
  wave:  { emoji:"🌊",  type:"water",    base:5 },
  vine:  { emoji:"🌿",  type:"nature",   base:4 },
  dark:  { emoji:"🌑",  type:"dark",     base:5 },
  beam:  { emoji:"✨",  type:"light",    base:6 },
  claw:  { emoji:"🦾",  type:"physical", base:4 },
  bite:  { emoji:"🦷",  type:"physical", base:5 },
  sonic: { emoji:"🔊",  type:"lightning",base:4 },
};

const WEAKNESS_MAP = {
  fire:      { nature:1.5, ice:1.5, water:0.5, fire:0.5 },
  water:     { fire:1.5, rock:1.5, water:0.5 },
  nature:    { water:1.5, fire:0.5, nature:0.5 },
  lightning: { water:1.5, dark:1.2 },
  light:     { dark:1.5, light:0.5 },
  dark:      { light:1.5, physical:1.2 },
  physical:  {},
  ice:       { nature:1.3, fire:0.5 },
};

function getEffectiveness(atkType, defType) {
  return (WEAKNESS_MAP[atkType] || {})[defType] || 1.0;
}

const HERO_ATTACK_POOL = {
  space:      ["zap","blast","beam"],
  pirate:     ["slash","blast","claw"],
  forest:     ["vine","claw","sonic"],
  dragon:     ["blast","slash","beam"],
  underwater: ["wave","sonic","vine"],
};

// ── AVATAR CONFIG (data-driven hat/weapon/vehicle/shirt-upgrade rendering) ──
const AVATAR_HATS = {
  space: [
    { t:"rect", x:3.5, y:-0.2, w:5, h:2, fill:"HAT", rx:0.6 },
    { t:"rect", x:4.5, y:0.5, w:3, h:0.9, fill:"#93c5fd", op:0.75 },
    { t:"rect", x:3.5, y:1.5, w:5, h:0.4, fill:"HAT", op:0.8 },
    { t:"up_path", d:"M7.5 0 L9 -2", stroke:"#fbbf24", sw:0.55 },
  ],
  pirate: [
    { t:"rect", x:2.8, y:1, w:6.4, h:0.7, fill:"HAT", rx:0.2 },
    { t:"rect", x:4.2, y:-0.8, w:3.6, h:1.9, fill:"HAT" },
    { t:"rect", x:4.4, y:-0.8, w:3.2, h:0.35, fill:"#ffffff", op:0.12 },
    { t:"up_rect", x:5.6, y:-1.4, w:0.8, h:0.7, fill:"#e5e7eb", op:0.9 },
    { t:"up_circle", cx:6, cy:-1.8, r:0.35, fill:"#e5e7eb" },
  ],
  forest: [
    { t:"rect", x:3.5, y:0.8, w:5, h:0.8, fill:"HAT", rx:0.2 },
    { t:"path", d:"M4.2 0.8 Q4.6 -0.4 5.0 0.8", fill:"HAT" },
    { t:"path", d:"M5.6 0.8 Q6.0 -0.7 6.4 0.8", fill:"HAT" },
    { t:"path", d:"M7.0 0.8 Q7.4 -0.4 7.8 0.8", fill:"HAT" },
    { t:"up_path", d:"M5.6 -0.7 Q6.0 -2.0 6.4 -0.7", fill:"#a3e635" },
    { t:"up_rect", x:5.85, y:-1.5, w:0.7, h:0.7, fill:"#78350f", rx:0.2 },
  ],
  dragon: [
    { t:"rect", x:3.5, y:0.2, w:5, h:1.4, fill:"HAT", rx:0.4 },
    { t:"rect", x:4.0, y:-0.2, w:4, h:0.8, fill:"HAT" },
    { t:"rect", x:4.3, y:0.4, w:1.1, h:0.7, fill:"#ef4444", op:0.35 },
    { t:"rect", x:6.3, y:0.4, w:1.1, h:0.7, fill:"#ef4444", op:0.35 },
    { t:"up_path", d:"M5.2 -0.2 L4.6 -2.0", stroke:"#fbbf24", sw:0.55 },
    { t:"up_path", d:"M6.8 -0.2 L7.4 -2.0", stroke:"#fbbf24", sw:0.55 },
  ],
  underwater: [
    { t:"rect", x:4.0, y:0.4, w:3.8, h:2.8, fill:"#7dd3fc", op:0.45, rx:0.4 },
    { t:"rect", x:4.0, y:0.4, w:3.8, h:0.2, fill:"#164e63", rx:0.2 },
    { t:"rect", x:4.0, y:3.0, w:3.8, h:0.2, fill:"#164e63" },
    { t:"rect", x:3.5, y:4.5, w:5, h:0.65, fill:"#334155" },
    { t:"rect", x:3.1, y:1.4, w:0.5, h:0.5, fill:"#64748b" },
    { t:"rect", x:8.4, y:1.4, w:0.5, h:0.5, fill:"#64748b" },
    { t:"up_circle", cx:9.1, cy:0.7, r:0.45, fill:"#fbbf24" },
    { t:"up_circle", cx:9.1, cy:0.7, r:0.22, fill:"#fff", op:0.8 },
  ],
};

const AVATAR_WEAPONS = {
  space: { rects:[
    { x:8.5, y:3.5, w:0.7, h:6, fill:"#334155" },
    { x:8.25, y:3.5, w:1.2, h:0.45, fill:"#60a5fa" },
  ], gem:{ cx:8.9, cy:3, r:1.1 }, noGem:{ x:8.4, y:2.9, w:0.9, h:0.7, fill:"#60a5fa", op:0.8 } },
  pirate: { rects:[
    { x:8.55, y:2.8, w:0.55, h:6.5, fill:"#94a3b8", rx:0.1 },
    { x:8.1, y:5.2, w:1.5, h:0.45, fill:"#78350f" },
    { x:8.3, y:4.8, w:0.9, h:0.7, fill:"#f59e0b" },
    { x:8.55, y:5.7, w:0.55, h:3.5, fill:"#92400e" },
  ], upGlow:{ x:8.4, y:2.8, w:0.75, h:4, fill:"#f97316", op:0.45, anim:"pulse 0.7s infinite" } },
  forest: { rects:[
    { x:8.5, y:3.5, w:0.75, h:6, fill:"#78350f" },
    { x:8.25, y:3.0, w:1.25, h:0.55, fill:"#4d7c0f" },
    { x:8.0, y:5.2, w:0.55, h:0.9, fill:"#4d7c0f", rx:0.2 },
  ], gem:{ cx:8.88, cy:2.8, r:1.1 }, noGem:null, noGemPath:"M8.88 3.0 L9.6 1.9", noGemStroke:"#4ade80" },
  dragon: { rects:[
    { x:8.5, y:3.5, w:0.75, h:6, fill:"#44403c" },
    { x:8.25, y:3.5, w:1.2, h:0.55, fill:"#dc2626" },
    { x:8.5, y:6.2, w:0.35, h:0.4, fill:"#f97316", op:0.85 },
  ], gem:{ cx:8.88, cy:3.0, r:1.1 }, upGlow:{ x:8.25, y:3.5, w:1.2, h:5.5, fill:"#f97316", op:0.12, anim:"pulse 0.6s infinite" } },
  underwater: { rects:[
    { x:8.7, y:4.2, w:0.55, h:5.5, fill:"#475569" },
    { x:7.9, y:3.0, w:0.5, h:1.6, fill:"#06b6d4" },
    { x:8.65, y:2.7, w:0.55, h:1.9, fill:"#06b6d4" },
    { x:9.45, y:3.0, w:0.5, h:1.6, fill:"#06b6d4" },
  ], upGlow:{ x:7.8, y:2.9, w:2.3, h:1.8, fill:"#fbbf24", op:0.28, anim:"pulse 0.5s infinite" } },
};

const AVATAR_SHIRT_UPGRADES = {
  space:      { t:"rect", x:6.5, y:5.5, w:1, h:1, fill:"#fbbf24", anim:"pulse 1s infinite" },
  pirate:     { t:"rect", x:5.8, y:5.8, w:0.8, h:0.8, fill:"#f59e0b", rx:0.1 },
  forest:     { t:"rect", x:5.0, y:5.0, w:2, h:0.4, fill:"#4ade80", op:0.8 },
  dragon:     { t:"compound", parts:[
    { t:"rect", x:5.0, y:4.8, w:2, h:0.55, fill:"#ef4444", op:0.7 },
    { t:"circle", cx:6, cy:5.1, r:0.38, fill:"#dc2626" },
  ]},
  underwater: { t:"rect", x:4.5, y:5.5, w:3, h:0.45, fill:"#7dd3fc", op:0.9, anim:"pulse 0.8s infinite" },
};

const BOOK_EMOJIS    = { space:"📖", pirate:"🗺️", forest:"📗", dragon:"📕", underwater:"🗺️" };
const BOOK_UP_EMOJIS = { space:"✨", pirate:"🧭", forest:"🌿", dragon:"🕯️", underwater:"📜" };

const BATTLE_BGS = {
  space:      "linear-gradient(180deg,#000010 0%,#0a0028 50%,#1a1a3e 100%)",
  pirate:     "linear-gradient(180deg,#051020 0%,#0a2040 50%,#0a1a10 100%)",
  forest:     "linear-gradient(180deg,#010a01 0%,#052010 50%,#0a2a08 100%)",
  dragon:     "linear-gradient(180deg,#1a0000 0%,#2a0600 50%,#1c0404 100%)",
  underwater: "linear-gradient(180deg,#000a15 0%,#001a35 50%,#002040 100%)",
};
