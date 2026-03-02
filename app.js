const PROFESSIONS = [
    {
        "key": "defender",
        "name": "Defender",
        "icon": "ti ti-shield",
        "title": "Stalwart guardian",
        "signature": "One-handed & shield",
        "description": "Anchors the battlefield with shield and steel, guarding allies, intercepting attacks, and provoking enemies to focus their fury on an unbreakable wall.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "berserker",
        "name": "Berserker",
        "icon": "ti ti-sword",
        "title": "Terror of the battlefield",
        "signature": "Two-handed",
        "description": "Overwhelms enemies with devastating blows, trading defense for raw destructive power.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "trickster",
        "name": "Trickster",
        "icon": "ti ti-slice",
        "title": "Stealth assassin",
        "signature": "Backstab",
        "description": "Relies on deception and agility to exploit openings and punish foes with precise, opportunistic strikes.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "ranger",
        "name": "Ranger",
        "icon": "ti ti-bow",
        "title": "Ranged skirmisher",
        "signature": "Archery",
        "description": "Hunts distant targets with precision, striking from afar and keeping enemies at bay.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "striker",
        "name": "Striker",
        "icon": "ti ti-hand-stop",
        "title": "Close-quarters specialist",
        "signature": "Martial arts",
        "description": "Pressures enemies at close range, locking down single targets, deflecting projectiles with swift movements and harassing foes with fluid strikes.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "luminary",
        "name": "Luminary",
        "icon": "ti ti-flame",
        "title": "Radiant pyromancer",
        "signature": "Fire & radiance",
        "description": "Wields fire and radiance to scorch and blind enemies, ignite the battlefield and hasten allies.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "weaver",
        "name": "Weaver",
        "icon": "ti ti-bolt",
        "title": "Thunderstorm sage",
        "signature": "Air & electricity",
        "description": "Manipulates air and electricity to strike foes with chain lightning, stun targets and reposition with teleportation.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "mystic",
        "name": "Mystic",
        "icon": "ti ti-droplet",
        "title": "Frost & tide master",
        "signature": "Water & ice",
        "description": "Controls water and cold to freeze enemies, restrict movement and restore allies.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "druid",
        "name": "Druid",
        "icon": "ti ti-leaf",
        "title": "Warden of the wild",
        "signature": "Earth & poison",
        "description": "Commands earth and poison to shape terrain, spread poison and fortify allies.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    },
    {
        "key": "shaman",
        "name": "Shaman",
        "icon": "ti ti-ghost-3",
        "title": "Spirit dancer",
        "signature": "Mind & necrotic",
        "description": "Channels ritual chants and spiritual magic to curse enemies, spread madness and commune with restless spirits.",
        "talents": [
            { level: 1, name: "Talent 1", description: "A super cool talent." },
            { level: 2, name: "Talent 2", description: "A super cool talent." },
            { level: 3, name: "Talent 3", description: "A super cool talent." },
        ]
    }
]

// Level
const MIN_LEVEL = 1;
const MAX_LEVEL = 20;

const MIN_MASTERY_LEVEL = 1;
const MAX_MASTERY_LEVEL = 3;

// Action Points (AP)
const BASE_AP = 4;
const EARN_AP = 4;
const MAX_AP = 6;

// Reaction Points (RP)
const BASE_RP = 2;
const MAX_RP = 4;

// Movement (ft) per AP
const MOVEMENT = 10;

// Tabs
const TAB_PROFESSIONS = 'professions';
const TAB_SKILLS= 'skills'
const DEFAULT_TAB = TAB_PROFESSIONS;

const createCharacter = () => ({
    name: "",
    level: MIN_LEVEL,
    professions: {},
    talents: [],
    skills: [],
});

function app() {
    return {
        key: "character-v1",
        character: createCharacter(),

        professions: PROFESSIONS,

        minLevel: MIN_LEVEL,
        maxLevel: MAX_LEVEL,

        minMasteryLevel: MIN_MASTERY_LEVEL,
        maxMasteryLevel: MAX_MASTERY_LEVEL,

        baseAP: BASE_AP,
        earnAP: EARN_AP,
        maxAP: MAX_AP,

        baseRP: BASE_RP,
        maxRP: MAX_RP,

        movement: MOVEMENT,

        tab1: TAB_PROFESSIONS,
        tab2: TAB_SKILLS,
        selectedTab: DEFAULT_TAB,

        // Gain level
        levelUp() {
            if (this.character.level < this.maxLevel) {
                this.character.level++;
            }
        },

        // Reduce level
        levelDown() {
            if (this.character.level > this.minLevel) {
                this.character.level--;
            }
        },

        // Train profession
        masteryUp(key) {
            // Avoid over spending
            if (this.usedTrainingPoints >= this.maxMasteryLevel)
                return;
            if (this.usedTrainingPoints >= this.totalTrainingPoints)
                return;

            const professions = this.character.professions;

            if (professions[key]) {
                professions[key]++;
            } else {
                professions[key] = 1;
            }
        },

        // Forget profession
        masteryDown(key) {
            const professions = this.character.professions;

            if (!professions[key])
                return;

            professions[key]--;

            if (professions[key] <= 0)
                delete professions[key];
        },

        getProfession(key) {
            return this.professions.find(p => p.key === key) ?? null;
        },

        getMasteryLevel(key) {
            return this.character.professions?.[key] ?? 0;
        },

        get totalTrainingPoints() {
            const level = this.character.level;

            if (level >= 17) return 5;
            if (level >= 11) return 4;
            if (level >= 5) return 3;
            return 2;
        },

        get usedTrainingPoints() {
            return Object.values(this.character.professions).reduce((sum, level) => sum + level, 0);
        },

        get freeTrainingPoints() {
            return this.totalTrainingPoints - this.usedTrainingPoints;
        },

        get totalMemorySlots() {
            return 3 + Math.floor(this.character.level / 2);
        },

        get usedMemorySlots() {
            const skills = this.character.skills;
            return Array.isArray(skills) ? skills.length : 0;
        },

        get freeMemorySlots() {
            return this.totalMemorySlots - this.usedMemorySlots;
        },

        init() {
            const saved = localStorage.getItem(this.key);

            if (saved)
                this.character = JSON.parse(saved);
        },

        save() {
            try {
                localStorage.setItem(this.key, JSON.stringify(this.character));
            } catch (error) {
                console.error("Unable to save character", error);
            }
        },

        reset() {
            this.character = createCharacter();
            try {
                localStorage.removeItem(this.key);
            } catch (error) {
                console.error("Unable to reset character", error);
            }
        },

    }
}