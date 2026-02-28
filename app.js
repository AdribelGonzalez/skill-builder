const PROFESSIONS = [
    {
        "key": "defender",
        "name": "Defender",
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

const MIN_LEVEL = 1;
const MAX_LEVEL = 20;
// Action Points (AP)
const BASE_AP = 4;
const EARN_AP = 4;
const MAX_AP = 6;
// Reaction Points (RP)
const BASE_RP = 2;
const MAX_RP = 4;
// Movement (feet)
const BASE_MOVEMENT = 10;

const createCharacter = () => ({
    name: "",
    level: MIN_LEVEL,
    professions: {},
    talents: {},
    skills: {},
});

function app() {
    return {
        key: "character-v1",
        character: createCharacter(),

        professions: PROFESSIONS,

        minLevel: MIN_LEVEL,
        maxLevel: MAX_LEVEL,

        baseAP: BASE_AP,
        earnAP: EARN_AP,
        maxAP: MAX_AP,

        baseRP: BASE_RP,
        maxRP: MAX_RP,

        baseMovement: BASE_MOVEMENT,

        // Level up
        levelUp() {
            if (this.character.level < this.maxLevel) {
                this.character.level++;
            }
        },

        // Level down
        levelDown() {
            if (this.character.level > this.minLevel) {
                this.character.level--;
            }
        },

        get trainingPoints() {
            const level = this.character.level;

            if (level >= 17) return 8;
            if (level >= 11) return 6;
            if (level >= 5) return 4;
            return 2;
        },

        get memorySlots() {
            return 3 + Math.floor(this.character.level / 2);
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