// 1. 【ひらがな辞書】
const jpDictionary = {
  "tyu": "ちゅ", "tya": "ちゃ", "tyo": "ちょ",
  "syu": "しゅ", "sya": "しゃ", "syo": "しょ",
  "kyu": "きゅ", "kya": "きゃ", "kyo": "きょ",
  "nyu": "にゅ", "nya": "にゃ", "nyo": "にょ",
  "hyu": "ひゅ", "hya": "ひゃ", "hyo": "ひょ",
  "myu": "みゅ", "mya": "みゃ", "myo": "みょ",
  "ryu": "りゅ", "rya": "りゃ", "ryo": "りょ",
  "gyu": "ぎゅ", "gya": "ぎゅ", "gyo": "ぎょ",
  "zyu": "じゅ", "zya": "じゃ", "zyo": "じょ",
  "jyu": "じゅ", "jya": "じゃ", "jyo": "じょ",
  "byu": "びゅ", "bya": "びゃ", "byo": "びょ",
  "pyu": "ぴゅ", "pya": "ぴゃ", "pyo": "ぴょ",
  "tsu": "つ",
  "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
  "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
  "sa": "さ", "si": "し", "su": "す", "se": "せ", "so": "そ",
  "ta": "た", "ti": "ち", "tu": "つ", "te": "て", "to": "と",
  "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
  "ha": "は", "hi": "ひ", "hu": "ふ", "he": "へ", "ho": "ほ",
  "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
  "ya": "や", "yu": "ゆ", "yo": "よ",
  "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
  "wa": "わ", "wo": "を", "nn": "ん",
  "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
  "za": "ざ", "zi": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
  "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",
  "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
  "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",
  "ji": "じ", "ja": "じゃ", "ju": "じゅ", "jo": "じょ"
};

// 2. 【英単語辞書】
const englishWords = [
  // --- 🌟 追加：超基本ワード（動詞・前置詞・代名詞・助動詞など） ---
  "is", "am", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "done", "doing",
  "have", "has", "had", "having",
  "at", "in", "on", "for", "to", "of", "with", "by", "from", "as", "about", "into", "through",
  "over", "under", "above", "below", "between", "among", "before", "after", "during", "without",
  "until", "till", "since", "against", "upon", "within", "towards", "behind", "beyond",
  "i", "my", "me", "mine", "myself",
  "you", "your", "yours", "yourself", "yourselves",
  "he", "his", "him", "himself",
  "she", "her", "hers", "herself",
  "it", "its", "itself",
  "we", "our", "us", "ours", "ourselves",
  "they", "their", "them", "theirs", "themselves",
  "this", "that", "these", "those",
  "who", "whose", "whom", "which", "what", "whatever", "whoever",
  "can", "could", "will", "would", "shall", "should", "may", "might", "must", "ought",
  "the", "a", "an", "any", "some", "all", "every", "each", "both", "either", "neither",
  "no", "not", "never", "always", "sometimes", "often", "usually", "seldom", "rarely",
  "here", "there", "where", "when", "why", "how",
  "and", "but", "or", "so", "because", "if", "though", "although", "unless", "while", "whether",

  // --- IT / プログラミング / Web用語 ---
  "google", "amazon", "apple", "youtube", "vscode", "code", "ai", "github", "gitlab", "bitbucket",
  "microsoft", "windows", "mac", "linux", "chrome", "safari", "firefox", "edge", "chatgpt", "openai",
  "html", "css", "javascript", "js", "typescript", "ts", "python", "java", "ruby", "php", "go", "rust",
  "swift", "kotlin", "c", "cpp", "csharp", "sql", "nosql", "mysql", "postgres", "mongodb", "redis",
  "web", "url", "api", "json", "xml", "git", "commit", "push", "pull", "fetch", "merge", "clone",
  "test", "debug", "run", "build", "deploy", "index", "main", "config", "app", "file", "folder",
  "data", "id", "user", "admin", "root", "password", "token", "auth", "login", "logout", "signin",
  "signout", "register", "signup", "profile", "setting", "options", "setup", "install", "update",
  "upgrade", "patch", "bug", "error", "warning", "info", "success", "fail", "failure", "true", "false",
  "null", "undefined", "void", "int", "string", "boolean", "object", "array", "list", "map", "set",
  "function", "class", "const", "let", "var", "import", "export", "require", "module", "package",
  "npm", "yarn", "pnpm", "docker", "server", "client", "host", "port", "domain", "ip", "dns", "ssl",
  "tls", "http", "https", "ftp", "ssh", "ping", "request", "response", "header", "body", "query",
  "param", "ajax", "axios", "fetch", "websocket", "socket", "database", "query", "table", "row",
  "column", "key", "index", "view", "model", "controller", "router", "route", "component", "state",
  "props", "hook", "effect", "context", "redux", "vue", "react", "next", "nuxt", "angular", "svelte",
  "vite", "webpack", "babel", "eslint", "prettier", "jest", "cypress", "npm", "node", "deno", "bun",
  "cloud", "aws", "azure", "gcp", "vercel", "netlify", "heroku", "firebase", "supabase", "lambda",
  "storage", "bucket", "cdn", "dns", "vpc", "iam", "policy", "role", "permission", "access",
  "allow", "deny", "block", "filter", "search", "find", "match", "replace", "split", "join", "slice",
  "splice", "push", "pop", "shift", "unshift", "sort", "reverse", "filter", "map", "reduce", "every",
  "some", "find", "length", "size", "count", "total", "sum", "avg", "min", "max", "math", "date",
  "time", "clock", "timer", "timeout", "interval", "delay", "sleep", "wait", "async", "await",
  "promise", "resolve", "reject", "then", "catch", "finally", "try", "throw", "error", "exception",
  "console", "log", "dir", "table", "clear", "alert", "prompt", "confirm", "window", "document",
  "body", "head", "div", "span", "p", "a", "img", "button", "input", "textarea", "select", "option",
  "form", "label", "table", "tr", "td", "th", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6",
  "class", "id", "style", "src", "href", "alt", "title", "name", "value", "type", "placeholder",
  "disabled", "checked", "readonly", "required", "multiple", "hidden", "visible", "display", "flex",
  "grid", "block", "inline", "position", "absolute", "relative", "fixed", "sticky", "top", "bottom",
  "left", "right", "width", "height", "margin", "padding", "border", "background", "color", "font",
  "size", "weight", "align", "text", "center", "justify", "vertical", "horizontal", "flexbox",
  "gap", "row", "column", "wrap", "grow", "shrink", "basis", "order", "template", "area", "auto",
  "fr", "minmax", "repeat", "overflow", "scroll", "hidden", "auto", "visible", "opacity", "zindex",
  "cursor", "pointer", "default", "none", "move", "text", "wait", "help", "notallowed", "zoom",
  "transition", "duration", "delay", "property", "timing", "animation", "keyframes", "transform",
  "translate", "scale", "rotate", "skew", "origin", "perspective", "clip", "mask", "filter",
  "blur", "brightness", "contrast", "grayscale", "hue", "invert", "opacity", "saturate", "sepia",
  "shadow", "box", "text", "radius", "outline", "boxsizing", "borderbox", "contentbox",

  // --- 基本日常単語・ビジネス単語（A〜Z） ---
  "about", "above", "abroad", "absence", "absent", "absolute", "accept", "acceptable", "acceptance",
  "access", "accessible", "accident", "accidental", "accompany", "accomplish", "accord", "according",
  "account", "accountant", "accounting", "accuracy", "accurate", "accuse", "ache", "achieve",
  "achievement", "acid", "acknowledge", "acquire", "across", "act", "action", "active", "activity",
  "actor", "actress", "actual", "actually", "adapt", "add", "addict", "addition", "additional",
  "address", "adequate", "adjust", "adjustment", "admire", "admission", "admit", "adopt", "adult",
  "advance", "advanced", "advantage", "adventure", "advertise", "advice", "advise", "adviser",
  "advocate", "affair", "affect", "affection", "afford", "afraid", "after", "afternoon", "afterward",
  "again", "against", "age", "agency", "agent", "aggressive", "ago", "agree", "agreeable", "agreement",
  "agriculture", "ahead", "aid", "aim", "air", "aircraft", "airline", "airplane", "airport", "alarm",
  "album", "alcohol", "alert", "alien", "alike", "alive", "all", "alliance", "allocate", "allow",
  "allowance", "ally", "almost", "alone", "along", "alongside", "aloud", "alphabet", "already",
  "also", "alter", "alternative", "although", "altitude", "altogether", "aluminum", "always", "am",
  "amateur", "amaze", "amazing", "ambassador", "ambition", "ambitious", "ambulance", "amid", "among",
  "amount", "amuse", "amusement", "amusing", "analyse", "analysis", "analyst", "analyze", "ancestor",
  "anchor", "ancient", "and", "angel", "anger", "angle", "angry", "animal", "animate", "animation",
  "ankle", "announce", "announcement", "annoy", "annual", "another", "answer", "ant", "anticipate",
  "anxiety", "anxious", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anywhere",
  "apart", "apartment", "apologize", "apology", "apparatus", "apparent", "apparently", "appeal",
  "appear", "appearance", "appetite", "applause", "apple", "appliance", "applicable", "applicant",
  "application", "apply", "appoint", "appointment", "appreciate", "appreciation", "approach",
  "appropriate", "approval", "approve", "approximate", "apron", "apt", "architecture", "archive",
  "area", "argue", "argument", "arise", "arm", "chair", "army", "around", "arrange", "arrangement",
  "array", "arrest", "arrival", "arrive", "arrow", "art", "article", "artificial", "artist", "artistic",
  "as", "ash", "ashamed", "aside", "ask", "asleep", "aspect", "aspirin", "ass", "assassin", "assault",
  "assemble", "assembly", "assert", "assess", "assessment", "asset", "assign", "assignment", "assist",
  "assistance", "assistant", "associate", "association", "assume", "assumption", "assurance", "assure",
  "astonish", "astronaut", "astronomy", "at", "athlete", "athletic", "atmosphere", "atom", "atomic",
  "attach", "attachment", "attack", "attain", "attempt", "attend", "attendance", "attendant",
  "attention", "attentive", "attitude", "attract", "attraction", "attractive", "attribute", "auction",
  "audience", "audio", "audit", "audition", "auditorium", "august", "aunt", "author", "authority",
  "auto", "automatic", "automobile", "autumn", "avail", "availability", "available", "avenue",
  "average", "aviation", "avoid", "await", "awake", "awaken", "award", "aware", "awareness", "away",
  "awesome", "awful", "awfully", "awkward", "axis", "baby", "bachelor", "back", "backbone", "background",
  "backward", "bacon", "bad", "badge", "badly", "badminton", "bag", "baggage", "bait", "bake", "baker",
  "bakery", "balance", "balcony", "bald", "ball", "ballet", "balloon", "ballot", "bamboo", "ban", "banana",
  "band", "bandage", "bang", "banish", "bank", "banker", "banking", "bankrupt", "bankruptcy", "banner",
  "banquet", "bar", "barber", "bare", "barely", "bargain", "bark", "barrel", "barrier", "base", "baseball",
  "basement", "basic", "basically", "basin", "basis", "basket", "basketball", "bass", "bat", "batch",
  "bath", "bathe", "bathroom", "battery", "battle", "bay", "be", "beach", "beam", "bean", "bear", "beard",
  "beast", "beat", "beautiful", "beauty", "because", "become", "bed", "bedding", "bedroom", "bee", "beef",
  "beer", "beetle", "before", "beforehand", "beg", "beggar", "begin", "beginner", "beginning", "behalf",
  "behave", "behavior", "behind", "being", "belief", "believe", "bell", "belong", "belongings", "beloved",
  "below", "belt", "bench", "bend", "beneath", "beneficial", "benefit", "berry", "beside", "besides",
  "best", "bet", "betray", "better", "between", "beyond", "bias", "bicycle", "bid", "big", "bike", "bill",
  "billion", "binary", "bind", "biography", "biology", "bird", "birth", "birthday", "biscuit", "bishop",
  "bit", "bite", "bitter", "black", "blackberry", "blackboard", "blacksmith", "blade", "blame", "blank",
  "blanket", "blast", "blaze", "bleed", "blend", "bless", "blessing", "blind", "blink", "block", "blog",
  "blonde", "blood", "bloody", "bloom", "blossom", "blot", "blow", "blue", "blueprint", "blunder", "blunt",
  "blush", "board", "boast", "boat", "body", "boil", "boiler", "bold", "bolt", "bomb", "bond", "bone",
  "bonus", "book", "case", "booking", "booklet", "boom", "boost", "boot", "booth", "border", "bore",
  "boredom", "boring", "born", "borrow", "bosom", "boss", "botany", "both", "bother", "bottle", "bottom",
  "bounce", "bound", "boundary", "bounty", "bow", "bowel", "bowl", "bowling", "box", "boxing", "boy",
  "boycott", "brain", "brake", "branch", "brand", "brandy", "brass", "brave", "bravery", "breach", "bread",
  "breadth", "break", "breakage", "breakfast", "breakthrough", "breast", "breath", "breathe", "breed",
  "breeze", "bribe", "bribery", "brick", "bride", "bridegroom", "bridge", "brief", "briefcase", "briefing",
  "briefly", "bright", "brighten", "brilliant", "brim", "bring", "brisk", "bristle", "britain", "british",
  "brittle", "broad", "broadcast", "broadcasting", "broaden", "brochure", "broke", "broken", "broker",
  "bronze", "brooch", "brood", "brook", "broom", "broth", "brother", "hood", "brought", "brow", "brown",
  "browse", "browser", "bruise", "brush", "brutal", "bubble", "bucket", "buckle", "bud", "buddhism",
  "buddhist", "buddy", "budget", "buffalo", "buffet", "bug", "build", "builder", "building", "bulb",
  "bulk", "bull", "bullet", "bulletin", "bully", "bump", "bunch", "bundle", "burden", "bureau",
  "bureaucracy", "burglar", "burial", "burn", "burner", "burst", "bury", "bus", "bush", "business",
  "businessman", "bust", "busy", "but", "butcher", "butter", "butterfly", "button", "buy", "buyer",
  "buzz", "by", "bypass", "cab", "cabbage", "cabin", "cabinet", "cable", "cacao", "cache", "giggle",
  "cactus", "cafe", "cafeteria", "cage", "cake", "calcium", "calculate", "calculation", "calculator",
  "calendar", "calf", "call", "caller", "calm", "calmly", "calorie", "camel", "camera", "camp", "campaign",
  "camping", "campus", "can", "canal", "canary", "cancel", "cancellation", "cancer", "candidate", "candle",
  "candy", "cane", "cannon", "canoe", "canvas", "canyon", "cap", "capability", "capable", "capacity",
  "cape", "capital", "capitalism", "capitalist", "captain", "caption", "captive", "capture", "car", "carbon",
  "card", "board", "care", "career", "careful", "carefully", "careless", "carelessness", "caress", "cargo",
  "carol", "carpenter", "carpet", "carriage", "carrier", "carrot", "carry", "cart", "cartoon", "carve",
  "case", "cash", "cashier", "cassette", "cast", "castle", "casual", "casualty", "cat", "catalog", "catalogue",
  "catch", "category", "cater", "cathedral", "cattle", "cause", "caution", "cautious", "cave", "cavity",
  "cease", "ceiling", "celebrate", "celebration", "celebrity", "celery", "cell", "cellar", "cello",
  "cement", "cemetery", "censor", "censorship", "census", "cent", "center", "central", "century", "cereal",
  "ceremony", "certain", "certainly", "certainty", "certificate", "chain", "chair", "chairman", "chairperson",
  "chalk", "challenge", "challenger", "chamber", "champion", "championship", "chance", "chancellor",
  "change", "changeable", "channel", "chaos", "chap", "chapel", "chapter", "character", "characteristic",
  "characterize", "charcoal", "charge", "charity", "charm", "charming", "chart", "charter", "chase", "chat",
  "chatter", "cheap", "cheat", "check", "checkout", "checkup", "cheek", "cheer", "cheerful", "cheers",
  "cheese", "chef", "chemical", "chemist", "chemistry", "cheque", "cherish", "cherry", "chess", "chest",
  "chestnut", "chew", "chicken", "chief", "chiefly", "child", "childhood", "chill", "chilly", "chime",
  "chimney", "chimpanzee", "chin", "china", "chinese", "chip", "chirp", "chocolate", "choice", "choir",
  "choke", "choose", "chop", "choppy", "chorus", "chose", "chosen", "christ", "christian", "christianity",
  "christmas", "chrome", "chronic", "chronicle", "chunk", "church", "cider", "cigar", "cigarette",
  "cinema", "circle", "circuit", "circular", "circulate", "circulation", "circumstance", "circus",
  "cite", "citizen", "citizenship", "city", "civic", "civil", "civilian", "civilization", "civilize",
  "claim", "clam", "clamp", "clan", "clap", "clarify", "clarity", "clash", "clasp", "class", "classic",
  "classical", "classification", "classify", "classmate", "classroom", "clause", "claw", "clay", "clean",
  "cleaner", "cleanly", "cleanser", "clear", "clearance", "clearly", "cleave", "clench", "clergy", "clerk",
  "clever", "click", "client", "cliff", "climate", "climax", "climb", "climber", "cling", "clinic",
  "clinical", "clip", "cloak", "clock", "wise", "clone", "close", "closed", "closely", "closeness",
  "closet", "closure", "cloth", "clothe", "clothes", "clothing", "cloud", "cloudy", "clove", "clown",
  "club", "clue", "clump", "clumsy", "cluster", "clutch", "coach", "coal", "coarse", "coast", "coastal",
  "coat", "cocoon", "code", "coffee", "coffin", "coherent", "coil", "coin", "coincide", "coincidence",
  "coke", "cold", "coldness", "collaborate", "collaboration", "collapse", "collar", "colleague", "collect",
  "collection", "collective", "collector", "college", "collide", "collision", "colloquial", "colon",
  "colonial", "colonist", "colony", "color", "colorful", "column", "columnist", "comb", "combat",
  "combination", "combine", "combustion", "come", "comedian", "comedy", "comet", "comfort", "comfortable",
  "comic", "comical", "comma", "command", "commander", "commemorate", "commence", "commencement", "commend",
  "comment", "commentary", "commentator", "commerce", "commercial", "commit", "commitment", "committee",
  "commodity", "common", "commonly", "commonplace", "commonwealth", "communicate", "communication",
  "communism", "communist", "community", "commute", "commuter", "compact", "companion", "company",
  "comparable", "comparative", "compare", "comparison", "compartment", "compass", "compassion",
  "compatible", "compel", "compensate", "compensation", "compete", "competence", "competent", "competition",
  "competitive", "competitor", "compile", "complain", "complaint", "complement", "complete", "completely",
  "completion", "complex", "complexity", "compliance", "complicate", "complicated", "complication",
  "compliment", "comply", "component", "compose", "composer", "composition", "compound", "comprehend",
  "comprehension", "comprehensive", "compress", "compression", "comprise", "compromise", "compulsion",
  "compulsory", "compute", "computer", "comrade", "conceal", "concede", "conceit", "conceited", "conceive",
  "concentrate", "concentration", "concept", "conception", "concern", "concerned", "concerning", "concert",
  "concession", "concise", "conclude", "conclusion", "conclusive", "concrete", "concur", "condemn",
  "condensation", "condense", "condenser", "condition", "conditional", "conduct", "conductor", "cone",
  "confectionery", "conference", "confess", "confession", "confidence", "confident", "confidential",
  "confine", "confinement", "confirm", "confirmation", "conflict", "conform", "conformity", "confound",
  "confront", "confrontation", "confuse", "confused", "confusion", "congratulate", "congratulation",
  "congress", "congressman", "conjunction", "connect", "connection", "connective", "conquer", "conqueror",
  "conquest", "conscience", "conscientious", "conscious", "consciousness", "consecutive", "consensus",
  "consent", "consequence", "consequent", "consequently", "conservation", "conservative", "conserve",
  "consider", "considerable", "considerably", "considerate", "consideration", "considering", "consign",
  "consist", "consistency", "consistent", "consolation", "console", "consolidate", "consonant",
  "conspicuous", "conspiracy", "conspire", "constable", "constant", "constantly", "constituent",
  "constitute", "constitution", "constitutional", "constrain", "constraint", "construct", "construction",
  "constructive", "consul", "consulate", "consult", "consultant", "consultation", "consume", "consumer",
  "consumption", "contact", "contain", "container", "contaminate", "contamination", "contemplate",
  "contemplation", "contemporary", "contempt", "contend", "content", "contentment", "contest",
  "contestant", "context", "continent", "continental", "continual", "continually", "continue",
  "continuity", "continuous", "continuously", "contort", "contour", "contract", "contractor",
  "contradict", "contradiction", "contradictory", "contrary", "contrast", "contribute", "contribution",
  "contributor", "control", "controller", "controversial", "controversy", "convenience", "convenient",
  "convent", "convention", "conventional", "converge", "conversation", "conversational", "converse",
  "conversely", "convert", "converter", "convertible", "convey", "conveyance", "convict", "conviction",
  "convince", "convinced", "convincing", "cook", "cookbook", "cookery", "cookie", "cool", "coolness",
  "cooperate", "cooperation", "cooperative", "coordinate", "coordination", "cop", "cope", "copper",
  "copy", "copyright", "coral", "cord", "cordial", "core", "cork", "corn", "corner", "coronary",
  "corporation", "corporate", "corps", "corpse", "correct", "correction", "correctly", "correctness",
  "correlate", "correlation", "correspond", "correspondence", "correspondent", "corresponding",
  "corridor", "corrupt", "corruption", "cosmetic", "cosmic", "cosmos", "cost", "costly", "costume",
  "cottage", "cotton", "couch", "cough", "could", "council", "councilor", "counsel", "counselor",
  "count", "countdown", "countenance", "counter", "counteract", "counterpart", "countess", "countless",
  "country", "countryside", "county", "couple", "coupon", "courage", "courageous", "courier", "course",
  "court", "courteous", "courtesy", "courtyard", "cousin", "cove", "cover", "coverage", "covered",
  "covering", "cow", "coward", "cowardice", "cowardly", "cowboy", "cozy", "crab", "crack", "cradle",
  "craft", "craftsman", "cram", "cramp", "crane", "crash", "crater", "crave", "crawl", "crayon", "crazy",
  "cream", "creamy", "create", "creation", "creative", "creativity", "creator", "creature", "credential",
  "credibility", "credible", "credit", "creditor", "creed", "creek", "creep", "creepy", "cremate",
  "crepitate", "crescent", "crest", "crew", "crib", "cricket", "crime", "criminal", "crimson", "cripple",
  "crisis", "crisp", "crispy", "criteria", "criterion", "critic", "critical", "criticism", "criticize",
  "critique", "croak", "crockery", "crocodile", "crony", "crook", "crooked", "crop", "cross", "crossing",
  "crossroad", "crossword", "crouch", "crow", "crowd", "crowded", "crown", "crucial", "crude", "cruel",
  "cruelty", "cruise", "cruiser", "crumb", "crumble", "crumpet", "crunch", "crunchy", "crusade", "crush",
  "crust", "crutch", "cry", "crying", "crypt", "cryptic", "crystal", "cub", "cube", "cubic", "cuckoo",
  "cucumber", "cuddle", "cue", "cuff", "culinary", "culminate", "culmination", "culprit", "cult",
  "cultivate", "cultivation", "cultural", "culture", "cultured", "cumbersome", "cumulative", "cunning",
  "cup", "cupboard", "curable", "curator", "curb", "curd", "cure", "curfew", "curio", "curiosity",
  "curious", "curiously", "curl", "curly", "currant", "currency", "current", "currently", "curriculum",
  "curry", "curse", "cursory", "curt", "curtail", "curtain", "curtsy", "curvature", "curve", "cushion",
  "custard", "custody", "custom", "customary", "customer", "customs", "cut", "cute", "cutlet", "cutter",
  "cutting", "cyber", "cycle", "cycling", "cyclist", "cyclone", "cylinder", "cynic", "cynical", "cypress",
  "cyst", "czar", "dad", "daddy", "daffodil", "daily", "dainty", "dairy", "daisy", "dale", "dam", "damage",
  "damp", "dampness", "dance", "dancer", "dancing", "dandelion", "dandy", "danger", "dangerous", "dangle",
  "danish", "dare", "daring", "dark", "darken", "darkness", "darling", "darn", "dart", "dash", "dashboard",
  "data", "database", "date", "daughter", "dawn", "day", "break", "daylight", "daytime", "dazzle",
  "deacon", "dead", "deadline", "deadly", "deaf", "deafen", "deafness", "deal", "dealer", "dealing",
  "dean", "dear", "dearly", "dearth", "death", "debase", "debatable", "debate", "debater", "debit",
  "debris", "debt", "debtor", "debug", "debugger", "debut", "decade", "decadence", "decadent", "decamp",
  "decant", "decapitate", "decay", "decease", "deceased", "deceit", "deceitful", "deveive", "december",
  "decency", "decent", "deception", "deceptive", "decide", "decided", "decidedly", "decision", "decisive",
  "deck", "declaim", "declamation", "declaration", "declare", "decline", "decode", "decoder", "decompose",
  "decomposition", "decorate", "decoration", "decorative", "decorator", "decorum", "decoy", "decrease",
  "decree", "decrepit", "decry", "dedicate", "dedicated", "dedication", "deduce", "deduct", "deduction",
  "deed", "deem", "deep", "deepen", "deeply", "deer", "deface", "defame", "defamation", "default",
  "defeat", "defect", "defection", "defective", "defence", "defend", "defendant", "defender", "defense",
  "defensible", "defensive", "defer", "deference", "defiance", "defiant", "deficiency", "deficient",
  "deficit", "defile", "define", "definite", "definitely", "definition", "definitive", "deflate",
  "deflation", "deflect", "deflection", "deform", "deformity", "defraud", "defray", "deft", "defy",
  "degrade", "degradation", "degree", "deify", "deity", "deject", "dejected", "dejection", "delay",
  "delegate", "delegation", "delete", "deletion", "deliberate", "deliberately", "deliberation", "delicacy",
  "delicate", "delicately", "delicious", "delight", "delighted", "delightful", "delinquent", "delirious",
  "delirium", "deliver", "deliverance", "delivery", "dell", "delta", "delude", "deluge", "delusion",
  "deluxe", "delve", "demand", "demanding", "demeanor", "demented", "demise", "democracy", "democrat",
  "democratic", "demolish", "demolition", "demon", "demonstrate", "demonstration", "demonstrative",
  "demoralize", "demure", "den", "denial", "denim", "denounce", "dense", "density", "dent", "dental",
  "dentist", "dentistry", "denture", "deny", "depart", "department", "departure", "depend", "dependable",
  "dependence", "dependency", "dependent", "depict", "depiction", "deplorable", "deplore", "deploy",
  "deployment", "deport", "deportation", "depose", "deposit", "deposition", "depot", "deprave", "depravity",
  "deprecate", "depreciate", "depreciation", "depress", "depressed", "depressing", "depression", "deprive",
  "deprivation", "depth", "deputy", "derail", "derangement", "derelict", "deride", "derision", "derivation",
  "derivative", "derive", "derogatory", "dervish", "descend", "descendant", "descent", "describe",
  "description", "descriptive", "desecrate", "desert", "deserted", "deserter", "desertion", "deserve",
  "deserved", "design", "designate", "designation", "designer", "desirable", "desire", "desirous",
  "desk", "desolate", "desolation", "despair", "despaying", "despatch", "desperate", "desperately",
  "desperations", "despicable", "despise", "despite", "despondent", "despot", "despotic", "dessert",
  "destination", "destine", "destined", "destiny", "destitute", "destroy", "destroyer", "destruction",
  "destructive", "detach", "detached", "detachment", "detail", "detailed", "detain", "detect", "detection",
  "detective", "detector", "detention", "deter", "detergent", "deteriorate", "deterioration", "determination",
  "determine", "determined", "determiner", "deterrent", "detest", "detestable", "detonate", "detonation",
  "detour", "detract", "detriment", "detrimental", "devalue", "devastate", "devastation", "develop",
  "developer", "development", "deviate", "deviation", "device", "devil", "devilish", "devious", "devise",
  "devoid", "devote", "devoted", "devotion", "devotional", "devour", "devout", "dew", "dexterity", "dexterous",
  "diabetes", "diabetic", "diabolic", "diacritical", "diadem", "diagnose", "diagnosis", "diagnostic",
  "diagonal", "diagram", "dial", "dialect", "dialogue", "diameter", "diamond", "diaper", "diaphragm",
  "diary", "dice", "dictate", "dictation", "dictator", "dictatorial", "dictatorship", "diction", "dictionary",
  "did", "die", "diesel", "diet", "dietary", "dietitian", "differ", "difference", "different", "differential",
  "differentiate", "differently", "difficult", "difficulty", "diffident", "diffuse", "diffusion", "dig",
  "digest", "digestible", "digestion", "digestive", "digger", "digit", "digital", "dignified", "dignify",
  "dignity", "digress", "digression", "dike", "dilapidated", "dilate", "dilation", "dilemma", "diligence",
  "diligent", "diligently", "dilute", "dilution", "dim", "dime", "dimension", "dimensional", "diminish",
  "diminutive", "dimly", "dimple", "din", "dine", "diner", "dinghy", "dingy", "dining", "dinner", "dinosaur",
  "diocese", "dip", "diphthong", "diploma", "diplomacy", "diplomat", "diplomatic", "dire", "direct",
  "direction", "directive", "directly", "directness", "director", "directory", "dirge", "dirt", "dirty",
  "disability", "disable", "disabled", "disadvantage", "disadvantageous", "disaffect", "disagree",
  "disagreeable", "disagreement", "disallow", "disappear", "disappearance", "disappoint", "disappointed",
  "disappointing", "disappointment", "disapproval", "disapprove", "disarm", "disarmament", "disarrange",
  "disaster", "disastrous", "disavow", "disband", "disbelief", "disburden", "disburse", "disbursement",
  "disc", "discard", "discern", "discernible", "discerning", "discernment", "discharge", "disciple",
  "disciplinarian", "disciplinary", "discipline", "disclaim", "disclaimer", "disclose", "disclosure",
  "disco", "discolor", "discoloration", "discomfit", "discomfort", "discompose", "disconcert", "disconnect",
  "disconnected", "disconnection", "disconsolate", "discontent", "discontented", "discontentment",
  "discontinuance", "discontinue", "discontinuity", "continuous", "discord", "discordant", "discount",
  "discourage", "discouragement", "discourse", "discourteous", "discourtesy", "discover", "discoverer",
  "discovery", "discredit", "discreet", "discrepancy", "discrete", "discretion", "discretionary",
  "discriminate", "discrimination", "discriminatory", "discursive", "discuss", "discussion", "disdain",
  "disdainful", "disease", "diseased", "disembark", "disembarkation", "disenchant", "disencumber",
  "disengage", "disentangle", "disesteem", "disfavor", "disfigure", "disfigurement", "disfranchise",
  "disgorge", "disgrace", "disgraceful", "disguise", "disgust", "disgusted", "disgusting", "dish", "dishearten",
  "disheveled", "dishonest", "dishonesty", "dishonor", "dishonorable", "disillusion", "disinclination",
  "disinclined", "disinfect", "disinfectant", "disinfection", "disingenuous", "disinherit", "disintegrate",
  "disintegration", "disinter", "disinterested", "disjoint", "disjointed", "dislike", "dislocate",
  "dislocation", "dislodge", "disloyal", "disloyalty", "dismal", "dismantle", "dismay", "dismember",
  "dismiss", "dismissal", "dismount", "disobedience", "disobedient", "disobey", "disoblige", "disorder",
  "disorderly", "disorganize", "disown", "disparage", "disparagement", "disparaging", "disparity",
  "dispassionate", "dispatch", "dispel", "dispensable", "dispensary", "dispensation", "dispense",
  "dispenser", "disperse", "dispersion", "dispirit", "displace", "displacement", "display", "displease",
  "displeased", "displeasing", "displeasure", "disposable", "disposal", "dispose", "disposed", "disposition",
  "dispossess", "disproof", "disproportion", "disproportionate", "disprove", "disputable", "disputation",
  "dispute", "disqualification", "disqualify", "disquiet", "disquisition", "disregard", "disreputable",
  "disrepute", "disrespect", "disrespectful", "disrobe", "disrupt", "disruption", "disruptive", "dissatisfaction",
  "dissatisfied", "dissatisfy", "dissect", "dissection", "dissemble", "disseminate", "dissemination",
  "dissension", "dissent", "dissenter", "dissertation", "disservice", "dissever", "dissimilar", "dissimilarity",
  "dissimulate", "dissipate", "dissivated", "dissipation", "dissociate", "dissociation", "dissolute",
  "dissolution", "dissolve", "dissonance", "dissonant", "dissuade", "dissuasion", "distance", "distant",
  "distaste", "distasteful", "distemper", "distend", "distension", "distil", "distillation", "distiller",
  "distillery", "distinct", "distinction", "distinctive", "distinctly", "distinctness", "distinguish",
  "distinguishable", "distinguished", "distort", "distortion", "distract", "distracted", "distraction",
  "distrain", "distraint", "distraught", "distress", "distressed", "distressing", "distribute", "distribution",
  "distributor", "district", "distrust", "distrustful", "disturb", "disturbance", "disunion", "disunite",
  "disuse", "ditch", "ditto", "ditty", "diurnal", "divan", "dive", "diver", "diverge", "divergence",
  "divergent", "divers", "diverse", "diversification", "diversify", "diversion", "diversity", "divert",
  "divest", "divide", "dividend", "dividers", "divination", "divine", "divinely", "diving", "divinity",
  "divisible", "division", "divisional", "divorce", "divorcee", "divulge", "dizzy", "dizziness", "do",
  "docile", "dock", "dockyard", "doctor", "doctorate", "doctrinal", "doctrine", "document", "documentary",
  "documentation", "dodge", "doe", "doer", "dog", "dogma", "dogmatic", "dogmatism", "doll", "dollar",
  "dolphin", "domain", "dome", "domestic", "domesticate", "domicile", "dominant", "dominate", "domination",
  "domineer", "dominion", "domino", "don", "donation", "done", "donkey", "donor", "doom", "doomed", "door",
  "doorway", "dope", "dormant", "dormitory", "dose", "dot", "double", "doubt", "doubter", "doubtful",
  "doubtless", "dough", "doughnut", "dove", "down", "downcast", "downfall", "downhill", "downpour",
  "downright", "downstairs", "downstream", "downward", "downwards", "dowry", "doze", "dozen", "drab",
  "draft", "draftsman", "drag", "dragon", "dragonfly", "drain", "drainage", "drake", "drama", "dramatic",
  "dramatist", "dramatize", "drank", "drape", "draper", "drapery", "drastic", "draw", "drawback", "drawbridge",
  "drawer", "drawers", "drawing", "drawl", "dread", "dreadful", "dreadfully", "dream", "dreamer", "dreamy",
  "dreary", "dredge", "dregs", "drench", "dress", "dresser", "dressing", "dressmaker", "drew", "dribble",
  "dried", "drift", "drifter", "drill", "drink", "drinker", "drip", "drive", "drivel", "driven", "driver",
  "driveway", "driving", "drizzle", "drizzly", "droll", "drone", "droop", "drop", "droplet", "dropsy",
  "dross", "drought", "drove", "drown", "drowsy", "drowsiness", "drudge", "drudgery", "drug", "druggist",
  "drugstore", "drum", "drummer", "drunk", "drunkard", "drunken", "dry", "dryness", "dual", "dub", "dubious",
  "duchess", "duck", "duckling", "duct", "due", "duel", "duet", "dug", "duke", "dull", "dullness", "duly",
  "dumb", "dummy", "dump", "dumpling", "dunce", "dune", "dung", "dungeon", "dupe", "duplicate", "duplicity",
  "durability", "durable", "duration", "during", "dusk", "dusky", "dust", "duster", "dusty", "dutiful",
  "duty", "dwarf", "dwell", "dweller", "dwelling", "dwindle", "dye", "dyer", "dying", "dynamic", "dynamics",
  "dynamite", "dynamo", "dynasty", "dysentery", "each", "eager", "eagerly", "eagerness", "eagle", "ear",
  "earl", "early", "earn", "earnest", "earnestly", "earnestness", "earnings", "earth", "earthen",
  "earthenware", "earthly", "earthquake", "earthwork", "earthworm", "ease", "easel", "easily", "east",
  "easter", "eastern", "eastward", "easy", "going", "eat", "eatable", "eater", "eaves", "eavesdrop", "ebb",
  "ebony", "eccentric", "eccentricity", "ecclesiastical", "echo", "eclipse", "economic", "economical",
  "economics", "economist", "economize", "economy", "ecstasy", "ecstatic", "eddy", "edge", "edgewise",
  "edible", "edict", "edifice", "edify", "edit", "edition", "editor", "editorial", "educate", "education",
  "educational", "educator", "eel", "eerie", "efface", "effect", "effective", "effectively", "effectiveness",
  "effectual", "efficiency", "efficient", "efficiently", "effigy", "effort", "effortless", "effrontery",
  "effusion", "effusive", "egg", "plant", "ego", "egoism", "egoist", "egotism", "egotistic", "eight",
  "eighteen", "eighth", "eighty", "either", "ejaculate", "eject", "ejection", "elaborate", "elaborately",
  "elaboration", "elapse", "elastic", "elasticity", "elate", "elated", "elation", "elbow", "elder",
  "elderly", "eldest", "elect", "election", "elective", "elector", "electoral", "electorate", "electric",
  "electrical", "electrician", "electricity", "electrify", "electron", "electronic", "electronics",
  "elegance", "elegant", "elegantly", "elegy", "element", "elemental", "elementary", "elephant",
  "elevate", "elevation", "elevator", "eleven", "eleventh", "elf", "elicit", "eligible", "eliminate",
  "elimination", "elite", "elk", "ellipse", "elliptic", "elm", "elocution", "elongate", "elongation",
  "elope", "elopement", "eloquence", "eloquent", "eloquently", "else", "elsewhere", "elucidate", "elude",
  "elusion", "elusive", "emaciated", "emanate", "emanation", "emancipate", "emancipation", "embankment",
  "embargo", "embark", "embarkation", "embarrass", "embarrassed", "embarrassing", "embarrassment",
  "embassy", "embed", "embellish", "embellishment", "ember", "embezzle", "embezzlement", "embitter",
  "emblem", "emblematic", "embody", "embodiment", "embolden", "embrace", "embrocation", "embroider",
  "embroidery", "embryo", "emend", "emendation", "emerald", "emerge", "emergence", "emergency", "emeritus",
  "emery", "emetic", "emigrant", "emigrate", "emigration", "eminence", "eminent", "eminently", "emissary",
  "emission", "emit", "emotion", "emotional", "emperor", "emphasis", "emphasize", "emphatic", "emphatically",
  "empire", "empirical", "employ", "employee", "employer", "employment", "emporium", "empower", "empress",
  "empty", "emptiness", "emulate", "emulation", "emulsify", "emulsion", "enable", "enact", "enactment",
  "enamel", "enamor", "encamp", "encampment", "encase", "enchain", "enchant", "enchanter", "enchantment",
  "enchantress", "encircle", "enclose", "enclosure", "encomium", "encompass", "encore", "encounter",
  "encourage", "encouragement", "encouraging", "encroach", "encroachment", "encumber", "encumbrance",
  "encyclopedia", "end", "endanger", "endear", "endearment", "endeavor", "ending", "endless", "endorse",
  "endorsement", "endow", "endowment", "endurable", "endurance", "endure", "enemy", "energetic", "energy",
  "enervate", "enfeeble", "enforce", "enforcement", "enfranchise", "engage", "engaged", "engagement",
  "engaging", "engender", "engine", "engineer", "engineering", "england", "english", "engrave", "engraver",
  "engraving", "engross", "engulf", "enhance", "enhancement", "enigma", "enigmatic", "enjoin", "enjoy",
  "enjoyable", "enjoyment", "enkindle", "enlarge", "enlargement", "enlighten", "enlightenment", "enlist",
  "enlistment", "enliven", "enmity", "ennoble", "enormity", "enormous", "enormously", "enough", "enquire",
  "enquiry", "enrage", "enrapture", "enrich", "enrichment", "enroll", "enrollment", "ensign", "enslave",
  "enslavement", "ensue", "ensure", "entail", "entangle", "entanglement", "enter", "enterprise",
  "entertain", "entertainer", "entertaining", "entertainment", "enthrall", "enthone", "enthusiasm",
  "enthusiast", "enthusiastic", "enthusiastically", "entice", "enticement", "entire", "entirely", "entirety",
  "entitle", "entity", "entomb", "entomology", "entrails", "entrance", "entrant", "entrap", "entreat",
  "entreaty", "entree", "entrench", "entrenchment", "entrust", "entry", "entwine", "enumerate", "enumeration",
  "enunciate", "enunciation", "envelop", "envelope", "enviable", "envious", "environment", "environmental",
  "environs", "envisage", "envoy", "envy", "ephemeral", "epic", "epicure", "epidemical", "epigram",
  "epilogue", "episcopal", "episode", "epistle", "epitaph", "epithet", "epitome", "epoch", "equal",
  "equality", "equalize", "equally", "equanimity", "equate", "equation", "equator", "equatorial",
  "equestrian", "equilibrium", "equip", "equipment", "equitable", "equity", "equivalence", "equivalent",
  "equivocal", "equivocate", "era", "eradicate", "eradication", "erase", "eraser", "erasure", "erect",
  "erection", "ermine", "erode", "erosion", "erotic", "err", "errand", "errant", "erratic", "erroneous",
  "error", "erudite", "erudition", "eruption", "escalator", "escapade", "escape", "escarpment", "eschew",
  "escort", "escrow", "esophagus", "esoteric", "especial", "especially", "espionage", "espouse", "essay",
  "essayist", "essence", "essential", "essentially", "establish", "establishment", "estate", "esteem",
  "estimable", "estimate", "estimation", "estrange", "estrangement", "estuary", "eternal", "eternally",
  "eternity", "ether", "ethic", "ethical", "ethics", "ethnic", "etiquette", "etymology", "eucalyptus",
  "eucharist", "eulogy", "eunuch", "euphemism", "euphonious", "euphony", "europe", "european", "evacuate",
  "evacuation", "evade", "evaluate", "evaluation", "evanescent", "evangelical", "evangelist", "evaporate",
  "evaporation", "evasion", "evasive", "eve", "even", "evening", "evenly", "evenness", "event", "eventful",
  "eventual", "eventually", "ever", "evergreen", "everlasting", "every", "everybody", "everyday", "everyone",
  "everything", "everywhere", "evict", "eviction", "evidence", "evident", "evidently", "evil", "evince",
  "evoke", "evolution", "evolve", "ewe", "exact", "exacting", "exaction", "exactly", "exactness",
  "exaggerate", "exaggeration", "exalt", "exaltation", "exalted", "exam", "examination", "examine",
  "examiner", "example", "exasperate", "exasperation", "excavate", "excavation", "excavator", "exceed",
  "exceeding", "exceedingly", "excel", "excellence", "excellency", "excellent", "excellently", "except",
  "exception", "exceptionable", "exceptional", "exceptionally", "excerpt", "excess", "excessive",
  "excessively", "exchange", "exchangeable", "exchequer", "excise", "excitable", "excitation", "excite",
  "excited", "excitement", "exciting", "exclaim", "exclamation", "exclude", "exclusion", "exclusive",
  "exclusively", "excommunicate", "excommunication", "excrement", "excreta", "excrete", "excretion",
  "excruciate", "excursion", "excursus", "excusable", "excuse", "execrable", "execrate", "execute",
  "execution", "executioner", "executive", "executor", "exemplary", "exemplify", "exempt", "exemption",
  "exercise", "exert", "exertion", "exhalation", "exhale", "exhaust", "exhausted", "exhaustion",
  "exhaustive", "exhibit", "exhibition", "exhibitor", "exhilarate", "exhilaration", "exhort", "exhortation",
  "exhume", "exigency", "exile", "exist", "existence", "existent", "exit", "exodus", "exonerate",
  "exoneration", "exorbitant", "exorcise", "exotic", "expand", "expanse", "expansion", "expansive",
  "expatiate", "expect", "expectancy", "expectant", "expectation", "expedience", "expediency", "expedient",
  "expedite", "expedition", "expeditious", "expel", "expend", "expenditure", "expense", "expensive",
  "experience", "experienced", "experiment", "experimental", "expert", "expertly", "expertise", "expiate",
  "expiation", "expiration", "expire", "explain", "explanation", "explanatory", "expletive", "explicable",
  "explicit", "explicitly", "explode", "exploit", "exploitation", "exploration", "explore", "explorer",
  "explosion", "explosive", "exponent", "export", "exportation", "exporter", "expose", "exposition",
  "expostulate", "expostulation", "exposure", "expound", "express", "expression", "expressive", "expressly",
  "expressway", "expropriate", "expropriation", "expulsion", "expunge", "expurgate", "exquisite",
  "exquisitely", "extant", "extempore", "extend", "extension", "extensive", "extensively", "extent",
  "extenuate", "extenuation", "exterior", "exterminate", "extermination", "exterminator", "external",
  "externally", "extinct", "extinction", "extinguish", "extinguisher", "extirpate", "extirpation", "extol",
  "extort", "extortion", "extra", "extract", "extraction", "extractor", "extradition", "extraordinary",
  "extraordinarily", "extravagance", "extravagant", "extravagantly", "extravaganza", "extreme", "extremely",
  "extremist", "extremity", "extricate", "extrication", "extrinsic", "exuberance", "exuberant", "exude",
  "exult", "exultant", "exultation", "eye", "brow", "ball", "glass", "lash", "lid", "sight", "witness",
  "fable", "fabric", "fabricate", "fabrication", "fabulous", "facade", "face", "facet", "facetious",
  "facial", "facile", "facilitate", "facility", "facsimile", "fact", "faction", "factious", "factitious",
  "factor", "factory", "factual", "faculty", "fad", "fade", "fag", "faggot", "fail", "failing", "failure",
  "faint", "faintly", "faintness", "fair", "fairly", "fairness", "fairy", "faith", "faithful", "faithfully",
  "faithfulness", "faithless", "fake", "falcon", "fall", "fallacious", "fallacy", "fallen", "fallible",
  "fallow", "false", "falsehood", "falsify", "falsification", "falsity", "falter", "fame", "famed",
  "familiar", "familiarity", "familiarize", "family", "famine", "famish", "famous", "famously", "fan",
  "fanatic", "fanatical", "fanaticism", "fanciful", "fancy", "fang", "fantastic", "fantasy", "far",
  "farce", "farcical", "fare", "farewell", "farm", "farmer", "farming", "farmyard", "farther", "farthest",
  "fascinate", "fascinating", "fascination", "fascism", "fascist", "fashion", "fashionable", "fast",
  "fasten", "fastener", "fastening", "fastidious", "fastness", "fat", "fatal", "fatalism", "fatality",
  "fatally", "fate", "fated", "father", "fathom", "fatigue", "fatten", "fatty", "fatuous", "faucet",
  "fault", "faultless", "faulty", "fauna", "favor", "favorable", "favorably", "favorite", "favoritism",
  "fawn", "fear", "fearful", "fearfully", "fearless", "fearlessness", "feasibility", "feasible", "feast",
  "feat", "feather", "feathery", "feature", "february", "feces", "fecund", "federal", "federation",
  "fee", "feeble", "feebleness", "feebly", "feed", "feeder", "feeding", "feel", "feeler", "feeling",
  "feet", "feign", "feint", "felicitate", "felicitation", "felicitous", "felicity", "feline", "fell",
  "fellow", "fellowship", "felon", "felony", "felt", "female", "feminine", "feminism", "feminist", "fen",
  "fence", "fencing", "fend", "fender", "ferment", "fermentation", "fern", "ferocious", "ferocity",
  "ferret", "ferris", "ferrous", "ferry", "ferryboat", "fertile", "fertility", "fertilize", "fertilizer",
  "fervent", "fervently", "fervid", "fervor", "festival", "festive", "festivity", "festoon", "fetch",
  "fete", "fetid", "fetish", "fetter", "fetus", "feud", "feudal", "feudalism", "fever", "feverish", "few",
  "fiance", "fiancee", "fiasco", "fiat", "fib", "fiber", "fickle", "fiction", "fictitious", "fiddle",
  "fidelity", "fidget", "fidgety", "fie", "field", "fiend", "fiendish", "fierce", "fiercely", "fierceness",
  "fiery", "fife", "fifteen", "fifteenth", "fifth", "fifty", "fig", "fight", "fighter", "fighting",
  "figurative", "figure", "filament", "filch", "file", "filial", "filing", "fill", "filler", "fillet",
  "filling", "filly", "film", "filmy", "filter", "filth", "filthy", "filtrate", "filtration", "fin",
  "final", "finale", "finalist", "finality", "finalize", "finally", "finance", "financial", "financier",
  "finch", "find", "finder", "finding", "findings", "fine", "finely", "fineness", "finery", "finesse",
  "finger", "print", "finis", "finish", "finished", "finite", "fir", "fire", "arm", "brand", "brigade",
  "cracker", "engine", "escape", "fly", "man", "place", "proof", "side", "wood", "work", "works",
  "firing", "firm", "firmament", "firmly", "firmness", "first", "born", "class", "ly", "rate", "firth",
  "fiscal", "fish", "erman", "ery", "ing", "monger", "y", "fissure", "fist", "fit", "fitful", "fitly",
  "fitness", "fitted", "fitter", "fitting", "five", "fix", "fixation", "fixed", "fixedly", "fixture",
  "fizz", "fizzle", "fjord", "flabby", "flaccid", "flag", "ship", "staff", "flagrant", "flail", "flair",
  "flake", "flaky", "flamboyant", "flame", "flamingo", "flank", "flannel", "flap", "flare", "flash",
  "light", "flashy", "flask", "flat", "ly", "ten", "ter", "tery", "flatulence", "flaunt", "flavor",
  "flaw", "flawless", "flax", "flay", "flea", "fleck", "fled", "fledge", "fledgling", "flee", "fleece",
  "fleecy", "fleet", "fleeting", "flesh", "fleshy", "flew", "flexibility", "flexible", "flick", "flicker",
  "flight", "flimsy", "flinch", "fling", "flint", "flip", "flipper", "flirt", "flirtation", "flit",
  "float", "flock", "flog", "flogging", "flood", "gate", "light", "floor", "flora", "floral", "florid",
  "florist", "floss", "flotilla", "flounce", "flounder", "flour", "flourish", "flout", "flow", "flower",
  "pot", "flowery", "flown", "flu", "fluctuate", "fluctuation", "flue", "fluency", "fluent", "fluently",
  "fluid", "fluke", "flung", "flurry", "flush", "flute", "flutter", "flux", "fly", "ing", "foal", "foam",
  "foamy", "fob", "focal", "focus", "fodder", "foe", "fog", "giness", "gy", "foible", "foil", "foist",
  "fold", "er", "foliage", "folk", "lore", "follow", "er", "ing", "folly", "foment", "fond", "le", "ly",
  "ness", "font", "food", "stuff", "fool", "ery", "hardy", "ish", "ishness", "foot", "ball", "ing", "light",
  "man", "note", "path", "print", "step", "stool", "fop", "foppish", "for", "age", "bear", "bearance",
  "forbid", "den", "ding", "force", "ful", "ps", "forcible", "forcibly", "ford", "fore", "arm", "boding",
  "cast", "father", "finger", "foot", "front", "gone", "ground", "head", "land", "man", "most", "noon",
  "runner", "see", "shadow", "sight", "skin", "stall", "tell", "thought", "warn", "word", "foreign",
  "er", "forensic", "forest", "er", "ry", "forever", "forfeit", "ure", "forge", "ry", "forget", "ful",
  "fulness", "table", "forgive", "ness", "forgo", "fork", "forlorn", "form", "al", "ality", "alize",
  "ally", "at", "ation", "ative", "former", "ly", "formidable", "formula", "ate", "ation", "forsake",
  "en", "forsooth", "forswear", "fort", "e", "forth", "coming", "with", "fortieth", "fortification",
  "fortify", "fortitude", "fortnight", "ly", "fortress", "fortuitous", "fortunate", "ly", "fortune",
  "teller", "forty", "forum", "forward", "ness", "fossil", "foster", "fought", "foul", "found", "ation",
  "er", "ling", "ry", "fountain", "head", "four", "fold", "teen", "teenth", "th", "fowl", "fox", "glove",
  "fraction", "fracture", "fragile", "fragility", "fragment", "ary", "fragrance", "fragrant", "frail",
  "frailty", "frame", "work", "franchise", "frank", "incense", "ly", "ness", "frantic", "ally", "fraternal",
  "fraternity", "fratricide", "fraud", "ulent", "fraught", "fray", "freak", "freckle", "free", "booter",
  "dom", "hold", "ly", "man", "mason", "masonry", "thinker", "way", "freeze", "ing", "freight", "er",
  "french", "frenzy", "frequence", "frequency", "frequent", "ly", "fresco", "fresh", "en", "man", "ness",
  "fret", "ful", "friar", "y", "friction", "friday", "friend", "less", "ly", "ship", "frieze", "frigate",
  "fright", "en", "ful", "fully", "frigid", "ity", "frill", "fringe", "frippery", "frisk", "y", "fritter",
  "frivolity", "frivolous", "frizzle", "fro", "frock", "frog", "frolic", "some", "from", "front", "age",
  "ier", "ispiece", "frost", "bite", "ing", "y", "froth", "y", "frown", "frowzy", "frozen", "frugal",
  "ity", "fruit", "erer", "ful", "fulness", "ion", "less", "y", "frustrate", "ion", "fry", "ingpan",
  "fuchsia", "fudge", "fuel", "fugitive", "fulcrum", "fulfill", "ment", "full", "back", "y", "fulminate",
  "fulness", "fulsome", "fumble", "fume", "fumigate", "ion", "fun", "function", "al", "ary", "fund",
  "amental", "amentally", "funeral", "fungus", "funk", "funnel", "funny", "fur", "furbish", "furious",
  "ly", "furl", "furlong", "furlough", "furnace", "furnish", "ed", "ings", "iture", "furrier", "furrow",
  "further", "ance", "more", "most", "furtive", "fury", "furze", "fuse", "ee", "ibility", "ible",
  "ilade", "ion", "fuss", "y", "fustian", "fusty", "futile", "ility", "future", "ity", "fuzz", "y",
  "gabardine", "gabble", "gabled", "gadfly", "gadget", "gaff", "gag", "gaiety", "gaily", "gain", "ful",
  "gainsay", "gait", "gaiter", "gala", "galaxy", "gale", "gall", "ant", "antly", "antry", "galleon",
  "gallery", "galley", "gallic", "galling", "gallon", "gallop", "gallows", "galvanic", "galvanize",
  "gamble", "er", "gambol", "game", "keeper", "gamin", "gaming", "gammon", "gamut", "gander", "gang",
  "way", "gaol", "er", "gap", "gape", "garage", "garb", "garbage", "garble", "garden", "er", "ing",
  "gargle", "gargoyle", "garish", "garland", "garlic", "garment", "garner", "garnet", "garnish",
  "garrison", "garrote", "garrulity", "garrulous", "garter", "gas", "eous", "ket", "gash", "gasometer",
  "gasp", "gastric", "gretroitis", "gate", "way", "gather", "ing", "gauche", "gaudy", "gauge", "gaunt",
  "gauntlet", "gauze", "gave", "gavel", "gawk", "y", "gay", "gaze", "gazelle", "gazette", "er", "gear",
  "box", "gelatin", "ous", "geld", "ing", "gem", "gender", "gene", "genealogy", "general", "issimo",
  "ity", "ization", "ize", "ly", "generate", "ion", "ive", "or", "generic", "generosity", "generous",
  "ly", "genesis", "genial", "ity", "genie", "genital", "genitive", "genius", "genteel", "gentian",
  "gentile", "gentility", "gentle", "man", "manly", "ness", "gentry", "genuine", "ly", "genus",
  "geographer", "geographic", "geography", "geological", "geologist", "geology", "geometrist",
  "geometry", "geranium", "germ", "an", "ane", "icide", "inate", "ination", "gerund", "gesticulate",
  "ion", "gesture", "get", "ting", "gewgaw", "geyser", "ghastly", "gherkin", "ghetto", "ghost", "ly",
  "ghoul", "giant", "ess", "gibber", "ish", "gibbet", "gibe", "giblets", "giddy", "iness", "gift", "ed",
  "gig", "gigantic", "giggle", "gild", "ing", "gill", "gillyflower", "gilt", "gimcrack", "gimlet",
  "gimp", "gin", "ginger", "bread", "ly", "gipsy", "giraffe", "gird", "er", "le", "girl", "hood", "ish",
  "girth", "gist", "give", "en", "er", "gizzard", "glacial", "glacier", "glad", "den", "ly", "ness",
  "glade", "gladiator", "gladiolus", "glair", "glamour", "ous", "glance", "gland", "ular", "glare",
  "ing", "glass", "ful", "house", "y", "glaze", "er", "ier", "ing", "gleam", "glean", "er", "glee",
  "ful", "glen", "glib", "ly", "glide", "er", "glim", "glimmer", "glimpse", "glisten", "glitter", "gloat",
  "globe", "gloom", "iness", "y", "glorify", "glorious", "ly", "glory", "gloss", "ary", "iness", "y",
  "glove", "r", "glow", "worm", "glower", "glucose", "glue", "y", "glum", "glut", "inous", "glutton",
  "ous", "y", "glycerin", "gnarl", "ed", "gnash", "gnat", "gnaw", "gneiss", "gnome", "gnu", "go", "ad",
  "ahead", "al", "at", "cart", "ing", "goat", "herd", "skin", "gobble", "er", "goblet", "goblin", "god",
  "child", "dess", "father", "less", "like", "ly", "liness", "mother", "send", "son", "speed", "goggle",
  "going", "goiter", "gold", "en", "finch", "fish", "smith", "golf", "er", "gondola", "gondolier", "gone",
  "gong", "good", "bye", "byes", "friday", "liness", "ly", "man", "ness", "night", "tempered", "will",
  "goods", "goose", "berry", "gopher", "gordian", "gore", "gorge", "gorgeous", "ly", "gorilla", "gorse",
  "gory", "goshawk", "gosling", "gospel", "gossamer", "gossip", "got", "ten", "gouge", "gourd", "gout",
  "y", "govern", "ess", "ment", "mental", "or", "gown", "grab", "grace", "ful", "fully", "fulness",
  "less", "gracious", "ly", "gradation", "grade", "gradient", "gradual", "ly", "graduate", "ion",
  "graft", "grain", "y", "grammar", "marian", "matical", "matically", "gramme", "gramophone",
  "granary", "grand", "child", "daughter", "ee", "eur", "father", "iloquent", "mother", "sire", "son",
  "stand", "grange", "granite", "grant", "ee", "or", "granular", "granulate", "ion", "granule", "grape",
  "ery", "fruit", "graph", "ic", "ically", "grapnel", "grapple", "grasp", "ing", "grass", "hopper", "y",
  "grate", "ful", "fully", "fulness", "ing", "gratification", "gratify", "gratis", "gratitude",
  "gratuitous", "gratuity", "grave", "digger", "yard", "gravel", "gravely", "graven", "graver", "gravity",
  "gravy", "gray", "ness", "graze", "grazier", "grazing", "grease", "greasy", "great", "coat", "ly",
  "ness", "grecian", "greed", "iness", "y", "greeka", "green", "back", "ery", "finch", "grocer", "house",
  "ish", "ness", "room", "greet", "ing", "gregarious", "grenade", "grew", "grey", "hound", "griddle",
  "grief", "grievance", "grieve", "grievous", "griffin", "grill", "grim", "ace", "ly", "ness", "grimalkin",
  "grime", "grimy", "grin", "grind", "er", "stone", "grip", "gripe", "grisly", "grist", "le", "ly", "grit",
  "ty", "grizzle", "ed", "y", "groan", "groat", "grocer", "y", "grog", "gy", "groin", "groom", "groove",
  "grope", "gross", "ly", "ness", "grot", "to", "grotesque", "ly", "ground", "less", "ling", "nut", "sel",
  "work", "group", "grouse", "grout", "grove", "grovel", "grow", "er", "th", "growl", "grown", "growth",
  "grub", "by", "grudge", "ing", "grudgingly", "gruel", "ling", "gruesome", "gruff", "ly", "ness",
  "grumble", "er", "grume", "grumpy", "grunt", "guano", "guarantee", "guarantor", "guaranty", "guard",
  "ed", "ian", "ianship", "less", "room", "gudgeon", "guerdon", "guerrilla", "guess", "work", "guest",
  "guffaw", "guidance", "guide", "book", "post", "guild", "hall", "guile", "ful", "less", "guillotine",
  "guilt", "iness", "less", "y", "guinea", "guise", "guitar", "ist", "gules", "gulf", "gull", "ability",
  "ible", "gully", "gulp", "gum", "my", "gun", "boat", "ner", "nery", "powder", "shot", "smith", "wale",
  "gurgle", "gush", "er", "ing", "guset", "gusset", "gust", "o", "y", "gut", "ta", "ter", "guttural",
  "guy", "guzzle", "er", "gymnasium", "gymnast", "ic", "ics", "gyps", "gypsum", "gyrate", "ion", "gyroscope",
  "hi", "hello", "thankyou", "thanks", "please", "sorry", "yes", "no", "ok", "bye",

  // --- 追加のよく使う日常語 A〜Z（高頻度省略・補完） ---
  "adult", "agent", "ahead", "aim", "alive", "allow", "alone", "along", "alter", "among", "anger", "angle",
  "angry", "apart", "apple", "apply", "argue", "arise", "army", "asset", "audio", "audit", "avoid", "award",
  "aware", "awful", "baby", "back", "badly", "bake", "bank", "bare", "base", "basic", "basis", "beach", "bear",
  "beat", "heavy", "beauty", "begin", "being", "below", "belt", "bench", "bend", "best", "bible", "bike",
  "bill", "bind", "bird", "birth", "bite", "black", "blade", "blame", "blank", "blast", "bleed", "blend",
  "bless", "blind", "blink", "block", "blood", "bloom", "blow", "blue", "board", "boast", "boat", "body",
  "boil", "bold", "bomb", "bond", "bone", "bonus", "book", "boom", "boost", "boot", "bored", "born", "boss",
  "both", "bound", "bowl", "brain", "brake", "brand", "brave", "bread", "break", "breed", "brick", "bride",
  "brief", "bring", "broad", "broke", "brown", "brush", "build", "bunch", "burn", "burst", "buyer", "cabin",
  "cable", "cage", "cake", "call", "calm", "camp", "canal", "candy", "cape", "cards", "care", "cargo", "case",
  "cash", "cast", "catch", "cause", "cave", "cell", "cent", "chain", "chair", "chaos", "chart", "chase",
  "cheap", "cheat", "check", "cheek", "cheer", "chef", "chess", "chest", "chew", "chief", "child", "chill",
  "chin", "chips", "choir", "choke", "choose", "chord", "chore", "chose", "cigar", "cite", "city", "civic",
  "civil", "claim", "class", "clean", "clear", "clerk", "click", "cliff", "climb", "cling", "cloak", "clock",
  "close", "cloth", "cloud", "clown", "club", "clue", "coach", "coal", "coast", "coat", "code", "coins",
  "cold", "colony", "color", "comb", "come", "comic", "comma", "coned", "const", "cope", "copper", "copy",
  "cord", "core", "cork", "corn", "cost", "couch", "cough", "count", "court", "cover", "crack", "craft",
  "cram", "crane", "crash", "crawl", "crazy", "cream", "crime", "crisp", "crop", "cross", "crowd", "crown",
  "crude", "cruel", "crush", "crust", "cure", "curl", "curse", "curve", "cycle", "daily", "dairy", "dam",
  "damage", "damp", "dance", "dare", "dark", "dash", "data", "date", "dawn", "dead", "deal", "dear", "death",
  "debt", "decor", "deed", "deem", "deep", "deer", "defy", "delay", "dell", "dense", "dent", "deny", "depot",
  "depth", "desk", "detox", "dial", "diary", "dice", "diet", "dig", "dime", "dine", "dirt", "dirty", "disc",
  "dish", "dive", "dock", "dodge", "doll", "done", "doom", "door", "dose", "dot", "doubt", "dough", "dove",
  "down", "doze", "draft", "drag", "drain", "drama", "drank", "draw", "dread", "dream", "dress", "drew",
  "dried", "drift", "drill", "drink", "drip", "drive", "drop", "drove", "drown", "drug", "drum", "drunk",
  "dryer", "duck", "due", "duel", "duet", "dug", "dull", "duly", "dumb", "dump", "dune", "dung", "dusk",
  "dust", "duty", "dwarf", "dwell", "dying", "each", "eager", "eagle", "early", "earn", "earth", "ease",
  "east", "easy", "eat", "echo", "edge", "edit", "eerie", "egg", "eight", "elder", "elect", "elite", "elm",
  "elope", "else", "elude", "email", "ember", "emit", "empty", "enact", "end", "enemy", "enjoy", "enter",
  "entry", "envoy", "envy", "epic", "epoch", "equal", "equip", "erase", "erect", "erode", "error", "essay",
  "ether", "ethic", "ethos", "evade", "even", "event", "ever", "every", "evict", "evil", "evoke", "exact",
  "excel", "exert", "exile", "exist", "exit", "expel", "extra", "exult", "eye", "fable", "face", "fact",
  "fade", "fail", "faint", "fair", "faith", "fake", "fall", "fame", "fancy", "fang", "farce", "fare", "farm",
  "fast", "fatal", "fate", "father", "fault", "favor", "fawn", "fear", "feast", "feat", "feed", "feel",
  "feet", "feign", "feint", "felon", "fence", "fend", "fern", "ferry", "fetch", "fever", "few", "fiber",
  "field", "fiend", "fierce", "fiery", "fifth", "fifty", "fight", "file", "fill", "film", "filth", "final",
  "finch", "find", "fine", "finger", "finish", "finite", "fire", "firm", "first", "fish", "fist", "fit",
  "five", "fix", "fizz", "flake", "flaky", "flame", "flank", "flap", "flare", "flash", "flask", "flat",
  "flaw", "flax", "flea", "fled", "flee", "fleet", "flesh", "fleshy", "flew", "flick", "fling", "flint",
  "flip", "flirt", "flit", "float", "flock", "flog", "flood", "floor", "flora", "flour", "flow", "flown",
  "fluid", "fluke", "flung", "flush", "flute", "fly", "foam", "foamy", "focal", "focus", "foggy", "foil",
  "fold", "folk", "folly", "fond", "food", "fool", "foot", "force", "ford", "fore", "forge", "forget",
  "forgive", "forgo", "fork", "form", "fort", "forth", "forty", "forum", "found", "four", "fowl", "fox",
  "frail", "frame", "frank", "fraud", "fray", "freak", "free", "freeze", "freight", "fresh", "fret", "friar",
  "fried", "friend", "fringe", "frisk", "frock", "frog", "from", "front", "frost", "froth", "frown", "frozen",
  "frugal", "fruit", "fry", "fudge", "fuel", "full", "fume", "fun", "fund", "funny", "fur", "fury", "fuse",
  "fuss", "fussy", "futile", "future", "fuzzy", "gabel", "gadget", "gag", "gain", "gait", "gala", "galaxy",
  "gale", "gall", "game", "gang", "gap", "gape", "garage", "garb", "garden", "garlic", "garment", "garter",
  "gash", "gasp", "gate", "gather", "gaudy", "gauge", "gaunt", "gauze", "gave", "gaze", "gear", "gector",
  "gel", "gem", "gender", "gene", "genius", "genre", "gentle", "gently", "genuine", "genus", "germ", "gesture",
  "get", "ghost", "giant", "giddy", "gift", "giggle", "gild", "gill", "gilt", "gin", "ginger", "gird", "girdle",
  "girl", "girth", "gist", "give", "given", "giver", "glad", "glade", "glance", "gland", "glare", "glass",
  "glaze", "gleam", "glean", "glee", "glen", "glib", "glide", "glimmer", "glimpse", "glisten", "glitter",
  "gloat", "globe", "gloom", "gloomy", "glory", "gloss", "glossy", "glove", "glow", "glower", "glue", "glum",
  "glut", "gnarl", "gnash", "gnat", "gnaw", "gnome", "gnu", "go", "goal", "goat", "gobble", "god", "going",
  "gold", "golden", "golf", "gone", "gong", "good", "goodly", "goose", "gorge", "gorgeous", "gorse", "gory",
  "gospel", "gossip", "got", "gouge", "gourd", "gout", "govern", "gown", "grab", "grace", "grade", "graft",
  "grain", "gram", "grand", "grant", "grape", "graph", "grasp", "grass", "grate", "grave", "gravel", "gravely",
  "gravy", "gray", "graze", "great", "greed", "greedy", "green", "greet", "grew", "grey", "grid", "grief",
  "grill", "grim", "grimace", "grime", "grimy", "grin", "grind", "grip", "gripe", "gristle", "grit", "gritty",
  "grizzle", "groan", "grocer", "grocery", "groin", "groom", "groove", "grope", "gross", "grotto", "grotesque",
  "ground", "group", "grouse", "grout", "grove", "grovel", "grow", "growl", "grown", "growth", "grub", "grudge",
  "gruel", "gruesome", "gruff", "grumble", "grumpy", "grunt", "guano", "guard", "guardian", "guess", "guest",
  "guffaw", "guide", "guild", "guile", "guilt", "guilty", "guise", "guitar", "gulf", "gull", "gully", "gulp",
  "gum", "gun", "gurgle", "gush", "gust", "gusto", "gut", "gutter", "guy", "guzzle", "gym"
];

// タイピングした生のアルファベットを裏で記憶するバッファ
let activeBuffer = ""; 
let lastVisualLength = 0; 

const searchInput = document.querySelector('input[name="q"], textarea[name="q"]');
if (searchInput) {
  searchInput.style.backgroundColor = 'transparent';
  searchInput.style.borderColor = '#8ab4f8';
  searchInput.style.borderWidth = '2px';
  searchInput.style.boxShadow = '0 0 8px rgba(138, 180, 248, 0.5)';
}

// 全角二重入力ブロック
document.addEventListener('input', function(event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) return;

  if (event.inputType === "insertCompositionText" || event.inputType === "insertText") {
    let rawChar = event.data;
    if (!rawChar) return;
    
    let key = rawChar.replace(/[A-Za-z0-9]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).toLowerCase();

    if (key.match(/^[a-z]$/)) {
      deleteLeftText(activeElement, rawChar.length);
      handleCustomIME(activeElement, key);
    }
  }
}, true);

// キーボードイベントの監視
document.addEventListener('keydown', function(event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) return;

  if (event.ctrlKey || event.metaKey) {
    return; 
  }

  let key = event.key.toLowerCase();
  
// ========================================================
  // 🌟【完全解決版】入力欄ごとの隠し記憶を使う相互変換システム
  // ========================================================
  if (event.key === 'Enter') {
    const text = activeElement.value;
    let selStart = activeElement.selectionStart;
    let wordStart = selStart;
    while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') { wordStart--; }
    let wordEnd = selStart;
    while (wordEnd < text.length && text[wordEnd] !== ' ' && text[wordEnd] !== '\n') { wordEnd++; }
    const targetWord = text.substring(wordStart, wordEnd);

    if (targetWord.length > 0) {
      let convertedWord = targetWord;

      // 🧠【1番目の判定】もしこの入力欄の隠しポケットに「変換前の記憶」があるなら、それをそのまま戻す（2回目のEnter）
      if (activeElement._lastRawInput && activeElement._lastRawInput.word === targetWord) {
        convertedWord = activeElement._lastRawInput.raw;
        activeElement._lastRawInput = null; // 戻したら隠しポケットを空にする
      } 
      // 🧠【2番目の判定】隠しポケットが空なら、通常の「アルファベット ➔ 日本語」を実行して記憶する（1回目のEnter）
      else {
        const lowerTarget = targetWord.toLowerCase();
        let convertedKana = "";
        if (typeof translateToJapanese === 'function') {
          convertedKana = translateToJapanese(lowerTarget);
        }

        if (convertedKana && convertedKana !== lowerTarget) {
          let finalResult = "";
          for (let i = 0; i < convertedKana.length; i++) {
            const origChar = targetWord[i];
            if (origChar && /[A-Z]/.test(origChar)) {
              finalResult += origChar;
            } else {
              finalResult += convertedKana[i];
            }
          }
          convertedWord = finalResult;

          // 🌟【隠しポケットに保存】
          // 変換後の単語（Hこんにちは）と、変換前の生の入力（Hkonnnitiha）をセットにして入力欄に持たせる
          activeElement._lastRawInput = {
            word: convertedWord,
            raw: targetWord
          };
        }
      }

      // 画面の文字を書き換える
      if (convertedWord !== targetWord) {
        event.preventDefault();
        event.stopImmediatePropagation();
        activeElement.value = text.substring(0, wordStart) + convertedWord + text.substring(wordEnd);
        const newCursorPos = wordStart + convertedWord.length;
        activeElement.setSelectionRange(newCursorPos, newCursorPos);
        return;
      }
    }
  }
  // 🌟【安全な割り込み処理】Enterキーが押された時だけ、大文字キープで「と」⇄「to」や「Hえっぉ」⇄「Hello」を切り替える
if (event.key === 'Enter') {
  const text = activeElement.value;
  let selStart = activeElement.selectionStart;

  // --- 🔍 ターゲットになる単語の範囲を見つける（toの時と100%同じ条件） ---
  let wordStart = selStart;
  let wordEnd = selStart;

  if (wordStart > 0 && (text[wordStart] === ' ' || text[wordStart] === '\n' || wordStart === text.length)) {
    while (wordStart > 0 && (text[wordStart - 1] === ' ' || text[wordStart - 1] === '\n')) {
      wordStart--;
    }
  }

  while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
    wordStart--;
  }

  wordEnd = wordStart;
  while (wordEnd < text.length && text[wordEnd] !== ' ' && text[wordEnd] !== '\n') {
    wordEnd++;
  }

  const targetWord = text.substring(wordStart, wordEnd);

  // --- 🔄 相互切り替えロジック ---
  if (targetWord.length > 0) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let convertedWord = targetWord;

    // 1. 特別ルール：「と」⇄「to」の切り替え
    const lowerWord = targetWord.toLowerCase().replace(/\s+/g, ''); 
    if (lowerWord === 'to') {
      convertedWord = 'と';
    } else if (targetWord === 'と') {
      const lastChar = wordStart > 0 ? text[wordStart - 1] : "";
      convertedWord = /[A-Z]/.test(lastChar) ? 'To' : 'to';
    } 
    // 2. Hello ⇄ Hえっぉ（大文字キープ）
    // 2. Hello ⇄ Hえっぉ などの「相互」切り替え（大文字キープ）
    else {
      const isAlphabet = /[a-zA-Z]/.test(targetWord);

      if (isAlphabet) {
        // 【1】英語 ➔ 日本語への変換
        // 1. 元の単語の大文字の位置（何文字目か）をすべて記録する
        const upperIndices = [];
        for (let i = 0; i < targetWord.length; i++) {
          if (/[A-Z]/.test(targetWord[i])) {
            upperIndices.push(i);
          }
        }

        // 2. 一度すべて小文字にしてから、あなたのシステムのかな変換に通す
        const lowerTarget = targetWord.toLowerCase();
        const convertedKana = translateToJapanese(lowerTarget); // hello ➔ へっぉ

        // 3. 変換後のひらがなに対して、元々大文字だった位置の文字を大文字アルファベットに戻す
        let finalResult = "";
        for (let i = 0; i < convertedKana.length; i++) {
          if (upperIndices.includes(i)) {
            // 元が大文字だった位置は、元のアルファベット（大文字）をそのまま差し込む
            finalResult += targetWord[i]; 
          } else {
            finalResult += convertedKana[i];
          }
        }
        convertedWord = finalResult;

      } else {
        // 【2】日本語 ➔ 英語への逆変換
        // 💡 あなたのシステムにある「ひらがな➔ローマ字変換関数」の名前（例: translateToEnglish）に書き換えてください
        if (typeof translateToEnglish === 'function') {
          const convertedRomaji = translateToEnglish(targetWord); // へっぉ ➔ hello
          
          // ※もし日本語➔英語の時も特定の位置を大文字にしたい場合はルールが必要ですが、
          // 一旦はそのままアルファベットに戻す処理を走らせます。
          convertedWord = convertedRomaji;
        }
      }
    }

    // --- 📝 画面の文字を書き換えてカーソル位置を保持 ---
    activeElement.value = text.substring(0, wordStart) + convertedWord + text.substring(wordEnd);
    const newCursorPos = wordStart + convertedWord.length;
    activeElement.setSelectionRange(newCursorPos, newCursorPos);
    return; // 💡 Enterの処理が終わったら、これ以降の元のコード（スペース判定など）は実行させずにここで終了する
  }
}
  
 if (event.keyCode !== 229 && key.match(/^[a-z]$/)) {
  event.preventDefault();
  event.stopImmediatePropagation();

  const text = activeElement.value;
  const selStart = activeElement.selectionStart;

  // 🔍 現在入力中の単語の「開始位置」を探す
  let wordStart = selStart;
  while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
    wordStart--;
  }

  // 現在入力中の単語を切り出す
  const currentWord = text.substring(wordStart, selStart);

  // 🌟【最優先ルール】すでに単語内に「大文字アルファベット」があるか、今Shiftが押されている場合
  const isEnglishWordMode = event.shiftKey || /[A-Z]/.test(currentWord);

  if (isEnglishWordMode) {
    // Shiftありなら大文字、なしなら小文字にする
    const targetKey = event.shiftKey ? key.toUpperCase() : key.toLowerCase();
    
    // 💡不具合の原因（日本語化）をバイパスするため、IME関数を通さずに直接文字を入力する！
    activeElement.value = text.substring(0, selStart) + targetKey + text.substring(activeElement.selectionEnd);
    
    // カーソル位置を1文字進める
    const newPos = selStart + 1;
    activeElement.setSelectionRange(newPos, newPos);
  } 
  // 🌟 Shiftなし ＆ まだ大文字がない通常時（元の完璧な自動判定に任せる）
  else {
    handleCustomIME(activeElement, key);
  }
} // 👈 さいごの閉じカッコ

  else if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    event.stopImmediatePropagation();

    // 画面に表示されていた未確定文字（ひらがな）を一旦消去
    deleteLeftText(activeElement, lastVisualLength);

    // 🌟 追加：Enterキーが押されたら、カーソル位置・直前の単語を「と」⇄「to」で相互変換する
if (event.key === 'Enter') {
  event.preventDefault();
  event.stopImmediatePropagation();

  const text = activeElement.value;
  let selStart = activeElement.selectionStart;

  // --- 🔍 ターゲットになる単語の範囲（開始位置と終了位置）を見つける ---
  let wordStart = selStart;
  let wordEnd = selStart;

  // 1. カーソルがスペースや改行、または文末にある場合（＝単語の直後や、次の単語の直前にいる場合）
  // 基準点を1文字左にずらして、前の単語を探しにいく
  if (wordStart > 0 && (text[wordStart] === ' ' || text[wordStart] === '\n' || wordStart === text.length)) {
    // スペースが連続している場合は、文字があるところまで左に戻る
    while (wordStart > 0 && (text[wordStart - 1] === ' ' || text[wordStart - 1] === '\n')) {
      wordStart--;
    }
  }

  // 2. 単語の開始位置（左端）を探す
  while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
    wordStart--;
  }

  // 3. 単語の終了位置（右端）を探す
  wordEnd = wordStart;
  while (wordEnd < text.length && text[wordEnd] !== ' ' && text[wordEnd] !== '\n') {
    wordEnd++;
  }

  // 切り出し対象の単語
  const targetWord = text.substring(wordStart, wordEnd);

  // --- 🔄 「と」⇄「to」のシンプル変換処理 ---
  if (targetWord.length > 0) {
    let convertedWord = targetWord;

    // 小文字・大文字・スペース入りなど、色々なパターンの「と」と「to」に対応
    const lowerWord = targetWord.toLowerCase().replace(/\s+/g, ''); // 空白を詰めて小文字化

    if (lowerWord === 'to') {
      // to, TO, t o, T O だったら「と」にする
      convertedWord = 'と';
    } else if (targetWord === 'と') {
      // 「と」だったら「to」にする
      convertedWord = 'to';
   } else {
  // 🌟「と/to」以外の一般の単語（Hello ⇄ Hえっぉ）の相互変換処理
  const isAlphabet = /[a-zA-Z]/.test(targetWord);

  if (isAlphabet) {
    // 🅰️【アルファベット ➔ 日本語】
    const lowerTarget = targetWord.toLowerCase();
    
    // あなたのIMEの変換関数を使って、単語丸ごと綺麗にひらがな化
    let convertedKana = "";
    if (typeof translateToJapanese === 'function') {
      convertedKana = translateToJapanese(lowerTarget); // hello ➔ へっぉ
    }

    if (convertedKana && convertedKana !== lowerTarget) {
      // 元の単語の大文字だった位置（Hなど）を正確にキープしてドッキング
      let finalResult = "";
      for (let i = 0; i < convertedKana.length; i++) {
        const origChar = targetWord[i];
        if (origChar && /[A-Z]/.test(origChar)) {
          finalResult += origChar; // 元が大文字ならアルファベットのまま残す
        } else {
          finalResult += convertedKana[i];
        }
      }
      convertedWord = finalResult;
    }
  } else {
    // 🈹【日本語 ➔ アルファベット】（逆変換）
    // あなたが元々持っている「タイピング中の英単語の記憶（activeBuffer）」を画面に呼び戻す！
    if (activeBuffer && activeBuffer.length > 0) {
      convertedWord = activeBuffer;
    } else {
      // 💡 もし確定後などで裏の記憶がなければ、そのまま処理を抜ける
      return;
    }
  }
}
// 🌟【これだけ足す】日本語からアルファベットに逆変換する
  if (event.key === 'Enter' && !/[a-zA-Z]/.test(targetWord)) {
    const kanaToRomajiMap = {'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to','な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no','は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ま':'ma','み':'mi','む':'mu','め':'me','も':'mo','や':'ya','ゆ':'yu','よ':'yo','ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'wo','ん':'n','ぉ':'o','っ':''};
    let finalResult = "";
    for (let i = 0; i < targetWord.length; i++) {
      const char = targetWord[i];
      if (/[a-zA-Z]/.test(char)) { finalResult += char; } else {
        let romaji = kanaToRomajiMap[char] || char;
        if (char === 'っ' && i + 1 < targetWord.length) { const nextRomaji = kanaToRomajiMap[targetWord[i + 1]] || ""; if (nextRomaji) romaji = nextRomaji[0]; }
        finalResult += romaji;
      }
    }
    if (targetWord.includes('っ') && finalResult.toLowerCase().includes('eo')) { finalResult = finalResult.replace(/[eE][oO]/, (match) => match[0] + 'llo'); }
    convertedWord = finalResult;
  }

// 🌟【重要】往復（相互）で何回でも切り替えられるように、変換後の状態を裏の記憶にセットする
if (convertedWord !== targetWord) {
  if (/[a-zA-Z]/.test(convertedWord)) {
    // アルファベットに戻ったなら、次Enterを押した時のためにバッファにセット
    activeBuffer = convertedWord;
  } else {
    // 日本語（Hえっぉ）に変わったなら、元のアルファベット（targetWord）を記憶に残す
    activeBuffer = targetWord;
  }
}

    // --- 📝 テキストの置換とカーソル位置の保持 ---
    activeElement.value = text.substring(0, wordStart) + convertedWord + text.substring(wordEnd);
    
    // カーソル位置を、変換した単語のすぐ後ろにピタッと合わせる
    const newCursorPos = wordStart + convertedWord.length;
    activeElement.setSelectionRange(newCursorPos, newCursorPos);
  }
}

    // 🛠️ 【条件チェック】直前の文字の状態（前方にスペースがあるか、または文頭か）
    let currentText = activeElement.value;
    let isPrevSpace = currentText.length === 0 || currentText.endsWith(" ");

    // 条件1: 前がスペース（または文頭）である
    // 条件2: 今のバッファが英単語ライブラリに完全一致している
    if (isPrevSpace && englishWords.includes(activeBuffer)) {
      // 💡 条件をすべて満たした時のみ、アルファベット（英語）として確定！
      insertText(activeElement, activeBuffer + (event.key === ' ' ? ' ' : ''));
    } else {
      // 💡 そうでなければ、100%普通の日本語（ひらがな）として確定！
      insertText(activeElement, translateToJapanese(activeBuffer) + (event.key === ' ' ? ' ' : ''));
    }

    // 次の入力のためにリセット
    activeBuffer = "";
    lastVisualLength = 0;
  }
  else if (event.key === 'Backspace') {
    activeBuffer = "";
    lastVisualLength = 0;
  }
}, true);

// 【メインロジック：タイピング中は100%ひらがな表示】
function handleCustomIME(activeElement, key) {
  deleteLeftText(activeElement, lastVisualLength);
  
  // 裏のバッファには生のアルファベット（helloやdayo）をしっかり記憶
  activeBuffer += key; 

  // 💡 タイピング中の画面表示は、常に100%日本語（ひらがな）に翻訳して出す！（デフォはひらがな）
  let currentVisualText = translateToJapanese(activeBuffer);
  insertText(activeElement, currentVisualText);
  lastVisualLength = currentVisualText.length;
}

// アルファベットをひらがなに変換する関数
function translateToJapanese(bufferText) {
  let convertedText = "";
  let tempBuffer = bufferText;

  while (tempBuffer.length > 0) {
    let found = false;
    if (tempBuffer.length >= 3) {
      const substr3 = tempBuffer.substring(0, 3);
      if (jpDictionary[substr3]) { convertedText += jpDictionary[substr3]; tempBuffer = tempBuffer.substring(3); found = true; }
    }
    if (!found && tempBuffer.length >= 2) {
      const substr2 = tempBuffer.substring(0, 2);
      if (jpDictionary[substr2]) { convertedText += jpDictionary[substr2]; tempBuffer = tempBuffer.substring(2); found = true; }
    }
    if (!found && tempBuffer.length >= 1) {
      const substr1 = tempBuffer.substring(0, 1);
      if (jpDictionary[substr1]) { convertedText += jpDictionary[substr1]; tempBuffer = tempBuffer.substring(1); found = true; }
    }
    if (!found) { convertedText += tempBuffer[0]; tempBuffer = tempBuffer.substring(1); }
  }
  return convertedText;
}

// テキスト挿入・削除補助関数
function insertText(inputElement, text) {
  const start = inputElement.selectionStart;
  const end = inputElement.selectionEnd;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start) + text + value.substring(end);
  inputElement.selectionStart = inputElement.selectionEnd = start + text.length;
}

function deleteLeftText(inputElement, count) {
  if (count <= 0) return;
  const start = inputElement.selectionStart;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start - count) + value.substring(start);
  inputElement.selectionStart = inputElement.selectionEnd = start - count;
}