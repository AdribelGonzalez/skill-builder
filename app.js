const DOCUMENTATION_URL = 'https://docs.google.com/document/d/1t5jIkLIWjqsEP525-vAQ4HLvIFUObJaSvhaPdM4am98/edit?usp=sharing';
const SPREADSHEET_ID = '1W3uegMWZvpnOwHApNfV6ZfNKUWDRYSfiMhbOtZzsv_U';
const KEYS = ['combatArts', 'talents', 'skills'];

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
const MOVEMENT = 5;

// AP Cost of Difficult Terraint
const DIFFICULT_TERRAIN = 1;

// AP Cost to enter Stealth
const STEALTH = 2;



// Tabs
const TAB_COMBAT_ARTS = 'combat-arts';
const TAB_SKILLS = 'skills'
const DEFAULT_TAB = TAB_COMBAT_ARTS;

const createCharacter = () => ({
    name: "",
    level: MIN_LEVEL,
    combatArts: {},
    masteries: [],
    talents: {},
    skills: {},
    memories: [],
});

function app() {
    return {
        // Constants
        documentationUrl: DOCUMENTATION_URL,

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

        // Dataset
        combatArts: [],
        talents: {},
        skills: {},

        // Tabs
        tabCombatArts: TAB_COMBAT_ARTS,
        tabSkills: TAB_SKILLS,
        selectedTab: DEFAULT_TAB,
        selectedCombatArt: null,

        // Character
        character: createCharacter(),

        // Gain level
        levelUp() {
            if (this.character.level >= this.maxLevel)
                return;

            this.character.level++;
        },

        // Reduce level
        levelDown() {
            if (this.character.level <= this.minLevel)
                return;

            this.character.level--;

            // Remove masteries until points are valid
            while (this.usedTrainingPoints > this.totalTrainingPoints && this.character.masteries.length > 0) {
                const key = this.character.masteries[this.character.masteries.length - 1];

                if (!key) break;

                this.masteryDown(key);
            }
        },

        // Train profession
        masteryUp(key) {
            // Avoid over spending
            if (this.getMasteryLevel(key) >= this.maxMasteryLevel)
                return;

            if (this.usedTrainingPoints >= this.totalTrainingPoints)
                return;

            const combatArts = this.character.combatArts;

            if (combatArts[key]) {
                combatArts[key]++;
            } else {
                combatArts[key] = 1;
            }

            // Remember most recent mastery
            this.character.masteries.push(key);
        },

        // Forget profession
        masteryDown(key) {
            const combatArts = this.character.combatArts;

            if (!combatArts[key])
                return;

            combatArts[key]--;

            if (combatArts[key] <= 0)
                delete combatArts[key];

            // Forget most recent mastery
            const index = this.character.masteries.lastIndexOf(key);
            if (index !== -1)
                this.character.masteries.splice(index, 1);
        },

        getCombatArt(key) {
            return this.combatArts.find(p => p.key === key) ?? null;
        },

        getTalents(key) {
            return this.talents.filter(p => p.combat_arts_key === key) || [];
        },

        getSkills(key) {
            return this.skills.filter(p => p.combat_arts_key === key) || [];
        },

        getMasteryLevel(key) {
            return this.character.combatArts?.[key] ?? 0;
        },

        get totalTrainingPoints() {
            const level = this.character.level;

            if (level >= 17) return 5;
            if (level >= 11) return 4;
            if (level >= 5) return 3;
            return 2;
        },

        get usedTrainingPoints() {
            return Object.values(this.character.combatArts ?? {}).reduce((sum, level) => sum + level, 0);
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

        async init() {
            this.load();
            this.loadTab();
            this.loadCharacter();
        },

        loadTab() {
            const saved = localStorage.getItem('tab');
            if (saved)
                this.selectedTab = saved;
        },

        changeTab(tab) {
            this.selectedTab = tab;
            localStorage.setItem('tab', tab);
        },

        async load() {
            let downloaded = true;

            // Try to load from localStorage
            const data = {};

            for (const key of KEYS) {
                const item = localStorage.getItem(key);
                if (item)
                    data[key] = JSON.parse(item);
                else
                    downloaded = false;
            }

            if (downloaded) {
                // Assign loaded data to component state
                Object.assign(this, data);
            } else {
                // Fetch from spreadsheet if any data missing
                await this.download();
            }

        },

        async download() {
            const sheetId = SPREADSHEET_ID;

            // Fetch all sheets in parallel
            const responses = await Promise.all(
                KEYS.map(key => fetch(`https://opensheet.elk.sh/${sheetId}/${key}`))
            );

            // Parse JSON and assign to state
            for (let i = 0; i < KEYS.length; i++) {
                const key = KEYS[i];
                const json = await responses[i].json();
                this[key] = json || (key === 'combatArts' ? [] : {});
                try {
                    localStorage.setItem(key, JSON.stringify(this[key]));
                } catch (err) {
                    console.error(`Unable to save ${key} to localStorage`, err);
                }
            }
        },

        async refresh() {
            this.download();
            this.load();
        },

        loadCharacter() {
            const character = localStorage.getItem('character');

            if (character)
                this.character = JSON.parse(character);
        },

        saveCharacter() {
            try {
                localStorage.setItem('character', JSON.stringify(this.character));
            } catch (error) {
                console.error("Unable to save character", error);
            }
        },

        resetCharacter() {
            this.character = createCharacter();

            try {
                localStorage.removeItem('character');
            } catch (error) {
                console.error("Unable to reset character", error);
            }
        },

    }
}