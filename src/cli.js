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
            "{hairColor} hair braided with wildflowers    | blossom",
            "{hairColor} pigtails                         | blossom",
            "resplendent {hairColor} curls                | blossom",
            "short, tousled {hairColor} hair              | blossom",
            "close-cropped {hairColor} hair               | crystal",
            "elaborately braided {hairColor} hair         | crystal",
            "{hairColor} hair pulled back in a severe bun | crystal",
            "a glorious cloud of frizzy {hairColor} curls | ember",
            "a spiky {hairColor} mohawk                   | ember",
            "short, bristly {hairColor} hair              | ember",
            "untamed {hairColor} locks                    | ember",
            "a clean-shaven pate                          | shadow",
            "impeccably styled {hairColor} hair           | shadow",
            "{hairColor} hair, swept back dramatically    | shadow",
            "lank, shoulder-length {hairColor} hair       | thistle",
            "thinning {hairColor} hair                    | thistle",
            "unkempt {hairColor} hair                     | thistle",
            "{hairColor} curls",
            "{hairColor} hair",
            "{hairColor} locks",
            "{hairColor} tresses",
        ],
        hairColor: [
            "auburn",
            "autumn-red",
            "black",
            "blond",
            "bone-white | crystal",
            "cerulean   | blossom",
            "cherry-red | ember",
            "corn-yellow",
            "dark brown",
            "golden",
            "mint-green | blossom",
            "nut-brown",
            "midnight-black",
            "pale yellow",
            "pink       | blossom",
            "pitch-black",
            "sea-green  | shadow",
            "steel-grey | crystal",
            "violet     | shadow",
        ],
        face: [
            "a soft, youthful face                       | blossom",
            "long, fluttering eyelashes                  | blossom",
            "wide, innocent eyes                         | blossom",
            "a regal profile                             | crystal",
            "an expression of disdain                    | crystal",
            "glinting eyes                               | crystal",
            "harsh, angular features                     | crystal",
            "an unkempt {hairColor} beard                | ember",
            "fiercely shining eyes                       | ember",
            "deep-set eyes and a strong jaw              | ember",
            "a cloying smile                             | shadow",
            "a wickedly arched eyebrow and a toothy grin | shadow",
            "face hidden by the hood of their cloak      | shadow",
            "warily darting eyes                         | shadow",
            "a deeply lined face                         | thistle",
            "an ashen complexion                         | thistle",
            "heavy-lidded eyes                           | thistle",
            "exceptionally long, pointed ears",
        ],
        body: [
            "a lithe, athletic frame                  | blossom",
            "a petite, almost childlike frame         | blossom",
            "a zaftig figure                          | blossom",
            "clothing woven from flowers and leaves   | blossom",
            "a regal bearing                          | crystal",
            "simple yet elegant garb                  | crystal",
            "strikingly tall                          | crystal",
            "ramrod-straight posture                  | crystal",
            "battle-scarred                           | ember",
            "bedecked in fur and leather              | ember",
            "broad-shouldered, with a martial bearing | ember",
            "body festooned with intricate tattoos    | ember",
            "an Adonis-like physique                  | shadow",
            "clad all in black                        | shadow",
            "impeccably stylish garb                  | shadow",
            "heavyset and slow of gait                | thistle",
            "skeletally thin                          | thistle",
            "stooped posture and trembling hands      | thistle",
            "tattered robes                           | thistle",
            "walks with a pronounced limp             | thistle",
        ],
        ...QUOTES,
        gesture: [
            "pats you on the head                                   | blossom",
            "prone to fits of giggling                              | blossom",
            "wanders off mid-conversation                           | blossom",
            "forgets (or doesn't bother to learn) your name         | crystal",
            "rolls their eyes                                       | crystal",
            "\"That will be all.\" *dismissive hand gesture*        | crystal",
            "jabs their finger in the air to emphasize a point      | ember",
            "playfully punches you on the shoulder                  | ember",
            "slams their fist on the table                          | ember",
            "storms off in frustration if things don't go their way | ember",
            "cackles with glee                                      | shadow",
            "licks their lips                                       | shadow",
            "steeples their fingers                                 | shadow",
            "extended, melancholy sigh...                           | thistle",
            "loudly clears their throat                             | thistle",
            "tilts their head and says \"Hmmmmmm...\"               | thistle",
            "yawns frequently                                       | thistle",
        ],
        personality: [
            "often runs afoul of the other Fae and needs the PCs' help | blossom",
            "lavishes their friends with small gifts                   | blossom",
            "only deigns to converse with mortals they find amusing    | blossom",
            "treats everything like a joke                             | blossom",
            "constantly doubts the PCs' basic competence               | crystal",
            "desires power over others, above all else                 | crystal",
            "expects the PCs to carry out their orders                 | crystal",
            "utterly humorless                                         | crystal",
            "always willing to settle the matter with a fistfight      | ember",
            "delights in hearty food and strong ale                    | ember",
            "quick to anger, but also quick to forgive                 | ember",
            "always looking to make a deal                             | shadow",
            "cynical and suspicious                                    | shadow",
            "extremely dark sense of humor                             | shadow",
            "flirts shamelessly                                        | shadow",
            "curious about mortals and their strange ways              | thistle",
            "goes on long, rambling tangents about ancient lore        | thistle",
            "patient to the point of utter passivity                   | thistle",
            "seeking new books for their extensive library             | thistle",
            "unfailingly pessimistic                                   | thistle",
        ],
    }
}

function expand(initText, context) {
    if (!initText) return "";

    let text = initText;
    //console.log("\nExpand text");
    //console.log("text:", text);
    //console.log("context:", context);
    let tokens = text.match(/{[^{]*}/g);
    if (tokens) {
        for (let token of tokens) {
            text = text.replace(token, expandToken(token, context));
        }
    }
    //console.log(`Expanded ${initText} as ${text}`);
    return text;
}

function expandToken(initText, context) {
    let text = initText;
    //console.log("\nExpand token");
    text = text.slice(1, -1);
    //console.log("text:", text);
    //console.log("context:", context);
    let props = text.split(".");
    //console.log("props:", props);
    let parent = context;
    for (let prop of props) {
        if (parent[prop]) {
            //console.log(parent[prop]);
            parent = parent[prop];
        } else {
            //console.log(`${prop} not found in ${JSON.stringify(parent)}`);
            let options = models[parent.model][prop];
            options = applyTags(options, parent.tags);
            //console.log("options:", options);
            let choice = pickRandom(options);
            //console.log("choice:", choice);
            let expansion = expand(choice, parent);
            //console.log("expansion:", expansion);
            parent[prop] = expansion;
            parent = expansion;
        }
    }
    //console.log(`Token ${initText} expanded as ${parent}`);
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

//console.log("\ncontext:", context);
//console.log();
console.log(out);
console.log();