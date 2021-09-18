import { t, pickRandom } from "./utils.js";
import { QUOTES } from "./quotes.js";

// blossom, crystal, ember, shadow, thistle
/*
" | blossom",
" | blossom",
" | crystal",
" | crystal",
" | ember",
" | ember",
" | shadow",
" | shadow",
" | thistle",
" | thistle",
*/

const models = {
    fae: {
        fullName: [
            "The {epithet} {title} {givenName}",
            "The {epithet} {title}",
            "The {title}",
            "{title} {givenName}",
            "{title} {givenName} the {epithet}",
            "{givenName} the {epithet} {title}",
            "{givenName} the {title}",
            "{givenName} the {epithet}",
            "{givenName}",
        ],
        title: [
            "Captain   | ember",
            "Commander | ember",
            "Duchess",
            "Duke",
            "Earl",
            "Emperor   | crystal",
            "King      | crystal",
            "Lady",
            "Lord",
            "Marquis",
            "Master    | shadow",
            "Mistress  | shadow",
            "Oracle    | thistle",
            "Prince    | blossom",
            "Princess  | blossom",
            "Queen     | crystal",
            "Scholar   | thistle",
        ],
        givenName: ["Y", "W", "K", "V", "X", "Z", "J", "Q"],
        epithet: [
            "Crystalline | crystal",
            "Dark        | shadow",
            "Dying       | thistle",
            "Feral       | ember",
            "Glimmering  | blossom",
            "Gossamer    | blossom",
            "Grand       | crystal",
            "Grey        | crystal",
            "High        | crystal",
            "Radiant     | blossom",
            "Shadow      | shadow",
            "Twilight    | shadow",
            "Vengeful    | ember",
            "Wild        | ember",
            "Withering   | thistle",
        ],
        appearance: [
            "{hair}; {face}; {body}",
        ],
        hair: [
            "{hairColor} pigtails                         | blossom",
            "resplendent {hairColor} curls                | blossom",
            "close-cropped {hairColor} hair               | crystal",
            "{hairColor} hair pulled back in a severe bun | crystal",
            "a spiky {hairColor} mohawk                   | ember",
            "untamed {hairColor} locks                    | ember",
            "a clean-shaven pate                          | shadow",
            "impeccably styled {hairColor} hair           | shadow",
            "{hairColor} hair, swept back dramatically    | shadow",
            "lank, shoulder-length {hairColor} hair       | thistle",
            "thinning {hairColor} hair                    | thistle",
            "{hairColor} hair",
        ],
        hairColor: [
            "auburn",
            "autumn-red",
            "black",
            "blond",
            "bone-white | crystal",
            "brunette",
            "cerulean   | blossom",
            "cherry-red | ember",
            "dark brown",
            "golden",
            "mint-green | blossom",
            "nut-brown",
            "midnight-black",
            "pale yellow",
            "pink       | blossom",
            "pitch-black",
            "steel-grey | crystal",
            "violet     | shadow",
        ],
        face: [
            "a soft, youthful face                       | blossom",
            "long, fluttering eyelashes                  | blossom",
            "an expression of disdain                    | crystal",
            "harsh, angular features                     | crystal",
            "fiercely shining eyes                       | ember",
            "deep-set eyes and a strong jaw              | ember",
            "a cloying smile                             | shadow",
            "a wickedly arched eyebrow and a toothy grin | shadow",
            "heavy-lidded eyes                           | thistle",
            "a deeply lined face                         | thistle",
        ],
        body: [
            "a petite, almost childlike frame         | blossom",
            "a zaftig figure                          | blossom",
            "a regal bearing                          | crystal",
            "ramrod-straight posture                  | crystal",
            "bedecked in fur and leather              | ember",
            "broad-shouldered, with a martial bearing | ember",
            "impeccably stylish garb                  | shadow",
            "clad all in black                        | shadow",
            "tattered robes                           | thistle",
            "stooped posture and trembling hands      | thistle",
        ],
        ...QUOTES,
        gesture: [
            "prone to fits of giggling                         | blossom",
            "wanders off mid-conversation                      | blossom",
            "rolls their eyes                                  | crystal",
            "\"That will be all.\" \*dismissive hand gesture\* | crystal",
            "playfully punches you on the shoulder             | ember",
            "slams their fist on the table                     | ember",
            "cackles with glee                                 | shadow",
            "steeples their fingers                            | shadow",
            "extended, melancholy sigh...                      | thistle",
            "tilts their head and says \"Hmmmmmm...\"          | thistle",
        ],
        personality: [
            "lavishes their friends with small gifts                | blossom",
            "only deigns to converse with mortals they find amusing | blossom",
            "constantly doubts the PCs' basic competence            | crystal",
            "expects the PCs to carry out their orders              | crystal",
            "always willing to settle the matter with a fistfight   | ember",
            "quick to anger, but also quick to forgive              | ember",
            "always looking to make a deal                          | shadow",
            "flirts shamelessly                                     | shadow",
            "unfailingly pessimistic                                | thistle",
            "patient to the point of utter passivity                | thistle",
        ],
    }
}

function expand(initText, context) {
    if (!initText) return "";

    let text = initText;
    console.log("\nExpand text");
    console.log("text:", text);
    console.log("context:", context);
    let tokens = text.match(/{[^{]*}/g);
    if (tokens) {
        for (let token of tokens) {
            text = text.replace(token, expandToken(token, context));
        }
    }
    console.log(`Expanded ${initText} as ${text}`);
    return text;
}

function expandToken(initText, context) {
    let text = initText;
    console.log("\nExpand token");
    text = text.slice(1, -1);
    console.log("text:", text);
    console.log("context:", context);
    let props = text.split(".");
    console.log("props:", props);
    let parent = context;
    for (let prop of props) {
        if (parent[prop]) {
            console.log(parent[prop]);
            parent = parent[prop];
        } else {
            console.log(`${prop} not found in ${JSON.stringify(parent)}`);
            let options = models[parent.model][prop];
            options = applyTags(options, parent.tags);
            console.log("options:", options);
            let choice = pickRandom(options);
            console.log("choice:", choice);
            let expansion = expand(choice, parent);
            console.log("expansion:", expansion);
            parent[prop] = expansion;
            parent = expansion;
        }
    }
    console.log(`Token ${initText} expanded as ${parent}`);
    return parent;
}

function applyTags(options, tags) {
    if (! options) return [];

    let out = [];
    options.forEach(option => {
        let [text, tag] = option.split(/ *\| */);
        out.push(text);
        if (tag && Object.keys(tags).includes(tag)) {
            for (let i = 0; i < tags[tag]; i++) {
                out.push(text);
            }
        }
    });
    return out;
}

let tags = {
    "blossom": 0,
    "crystal": 0,
    "ember": 0,
    "shadow": 0,
    "thistle": 0,
}
tags[pickRandom(Object.keys(tags))] += 6;
tags[pickRandom(Object.keys(tags))] += 4;

let context = {
    myFae: {
        model: "fae",
        tags: tags,
    }
};
let template =
`**Name**: {myFae.fullName}

**Appearance**: {myFae.appearance}

**Quote**: "{myFae.quote}"

**Roleplaying**:
    - {myFae.gesture}
    - {myFae.personality}`
let out = expand(
    template,
    context,
);

console.log("\ncontext:", context);
console.log();
console.log(out);
console.log();