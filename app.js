const PROFESSIONS = [
    {
        id: 'warrior',
        name: 'Warrior',
        icon: 'ti-sword',
        description: 'Master of physical combat and battlefield endurance.',
        skills: [
            { level: 1, name: 'Fighting Style', description: 'Choose a combat style; gain its passive bonus.' },
            { level: 2, name: 'Second Wind', description: 'Bonus action to regain 1d10 + level hit points once per rest.' },
            { level: 3, name: 'Extra Attack', description: 'Attack twice whenever you take the Attack action.' }
        ]
    },
    {
        id: 'guardian',
        name: 'Guardian',
        icon: 'ti-shield',
        description: 'Stalwart protector through superior defensive mastery.',
        skills: [
            { level: 1, name: 'Shield Master', description: 'Use your shield to shove enemies; add its bonus to Dex saves.' },
            { level: 2, name: 'Protection Stance', description: 'Impose disadvantage on attacks against adjacent allies.' },
            { level: 3, name: 'Sentinel', description: 'Opportunity attacks reduce enemy speed to 0.' }
        ]
    },
    {
        id: 'sharpshooter',
        name: 'Sharpshooter',
        icon: 'ti-crosshair',
        description: 'Deadly ranged combatant with extreme precision.',
        skills: [
            { level: 1, name: 'Steady Aim', description: 'Ignore half and three-quarters cover on ranged attacks.' },
            { level: 2, name: 'Precision Shot', description: 'Spend bonus action for advantage on next ranged attack.' },
            { level: 3, name: 'Sharpshooter Strike', description: 'Take −5 to hit for +10 damage on ranged attacks.' }
        ]
    },
    {
        id: 'spellblade',
        name: 'Spellblade',
        icon: 'ti-wand',
        description: 'Arcane warrior who weaves magic into every strike.',
        skills: [
            { level: 1, name: 'Spellstrike', description: 'Deliver touch spells through weapon attacks.' },
            { level: 2, name: 'Arcane Deflection', description: 'Use reaction to add Intelligence modifier to AC.' },
            { level: 3, name: 'Power Surge', description: 'Store magical energy; spend charges for bonus force damage.' }
        ]
    },
    {
        id: 'duelist',
        name: 'Duelist',
        icon: 'ti-swords',
        description: 'Elegant single-combat specialist through precision technique.',
        skills: [
            { level: 1, name: 'Dueling Style', description: '+2 damage when wielding a single one-handed weapon.' },
            { level: 2, name: 'Riposte', description: 'When an enemy misses you in melee, use reaction to attack.' },
            { level: 3, name: 'Feinting Attack', description: 'Feint to gain advantage and add superiority die to damage.' }
        ]
    }
];

document.addEventListener('alpine:init', () => {
    Alpine.data('characterBuilder', () => ({

        // ── State ───────────────────────────────────────────────────────────
        characterName: '',
        characterLevel: 1,
        investedPoints: { warrior: 0, guardian: 0, sharpshooter: 0, spellblade: 0, duelist: 0 },
        professions: PROFESSIONS,
        storageKey: 'dnd-char-builder-v1',

        // ── Lifecycle ────────────────────────────────────────────────────────
        init() {
            this.load();
            this.$watch('characterName', () => this.save());
            this.$watch('characterLevel', () => this.save());
            this.$watch('investedPoints', () => this.save(), { deep: true });
        },

        // ── Computed ─────────────────────────────────────────────────────────
        get totalTrainingPoints() {
            const l = this.characterLevel;
            if (l >= 17) return 6;
            if (l >= 11) return 5;
            if (l >= 7) return 4;
            if (l >= 5) return 3;
            return 2;
        },

        get spentTrainingPoints() {
            return Object.values(this.investedPoints).reduce((s, v) => s + v, 0);
        },

        get remainingTrainingPoints() {
            return this.totalTrainingPoints - this.spentTrainingPoints;
        },

        // Base 3, +1 per even level (2,4,6,8,10,12,14,16,18,20)
        get totalMemorySlots() {
            return 3 + Math.floor(this.characterLevel / 2);
        },

        get isOverBudget() {
            return this.spentTrainingPoints > this.totalTrainingPoints;
        },

        // ── Profession helpers ───────────────────────────────────────────────
        professionLevel(id) { return this.investedPoints[id] ?? 0; },

        canInvest(id) {
            return this.remainingTrainingPoints > 0 && this.professionLevel(id) < 3;
        },

        canRemove(id) { return this.professionLevel(id) > 0; },

        invest(id) { if (this.canInvest(id)) this.investedPoints[id]++; },
        remove(id) { if (this.canRemove(id)) this.investedPoints[id]--; },

        isSkillUnlocked(id, skillLevel) {
            return this.professionLevel(id) >= skillLevel;
        },

        // ── Persistence ──────────────────────────────────────────────────────
        save() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify({
                    characterName: this.characterName,
                    characterLevel: this.characterLevel,
                    investedPoints: { ...this.investedPoints }
                }));
            } catch (_) { }
        },

        load() {
            try {
                const raw = localStorage.getItem(this.storageKey);
                if (!raw) return;
                const d = JSON.parse(raw);
                if (typeof d.characterName === 'string')
                    this.characterName = d.characterName;
                if (typeof d.characterLevel === 'number' && d.characterLevel >= 1 && d.characterLevel <= 20)
                    this.characterLevel = d.characterLevel;
                if (d.investedPoints && typeof d.investedPoints === 'object') {
                    for (const id of Object.keys(this.investedPoints)) {
                        const v = d.investedPoints[id];
                        if (typeof v === 'number' && v >= 0 && v <= 3)
                            this.investedPoints[id] = v;
                    }
                }
            } catch (_) { }
        },

        reset() {
            this.characterName = '';
            this.characterLevel = 1;
            for (const id of Object.keys(this.investedPoints)) this.investedPoints[id] = 0;
            try { localStorage.removeItem(this.storageKey); } catch (_) { }
        }

    }));
});