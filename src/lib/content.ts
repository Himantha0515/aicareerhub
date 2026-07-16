export type Topic = {
  slug: string;
  title: string;
  blurb: string;
  level: "Start here" | "Core" | "Advanced";
  emoji: string;
  gradient: string;
};

export const TOPICS: Topic[] = [
  {
    slug: "what-is-ai",
    title: "What AI, ML and deep learning actually mean",
    blurb:
      "The three words get used interchangeably and they are not the same thing. Start here if you are starting from zero.",
    level: "Start here",
    emoji: "🧠",
    gradient: "linear-gradient(135deg, var(--indigo), var(--violet))",
  },
  {
    slug: "how-llms-work",
    title: "How large language models work",
    blurb:
      "What a model is really doing when it answers you — tokens, prediction, context windows — without the maths.",
    level: "Start here",
    emoji: "💬",
    gradient: "linear-gradient(135deg, var(--violet), var(--fuchsia))",
  },
  {
    slug: "python-for-ai",
    title: "The Python you need for AI",
    blurb:
      "You do not need to master all of Python first. Here is the slice that matters, and what you can skip for now.",
    level: "Start here",
    emoji: "🐍",
    gradient: "linear-gradient(135deg, var(--fuchsia), var(--rose))",
  },
  {
    slug: "maths-for-ml",
    title: "How much maths do you really need?",
    blurb:
      "An honest answer, split by role. Applied engineering and research have very different bars.",
    level: "Start here",
    emoji: "➗",
    gradient: "linear-gradient(135deg, var(--cyan), var(--indigo))",
  },
  {
    slug: "prompt-engineering",
    title: "Prompt engineering, properly",
    blurb:
      "Beyond tricks: how to write prompts that hold up in production, and why most 'prompt hacks' do not.",
    level: "Core",
    emoji: "✍️",
    gradient: "linear-gradient(135deg, var(--emerald), var(--cyan))",
  },
  {
    slug: "rag",
    title: "RAG — retrieval-augmented generation",
    blurb:
      "How to make a model answer from your own documents. Chunking, embeddings, vector search, and where it goes wrong.",
    level: "Core",
    emoji: "📚",
    gradient: "linear-gradient(135deg, var(--indigo), var(--cyan))",
  },
  {
    slug: "mcp",
    title: "MCP — the Model Context Protocol",
    blurb:
      "The open standard for connecting models to tools and data. What it is, why it exists, and how to build a server.",
    level: "Core",
    emoji: "🔌",
    gradient: "linear-gradient(135deg, var(--amber), var(--fuchsia))",
  },
  {
    slug: "ai-agents",
    title: "AI agents and tool use",
    blurb:
      "What separates an agent from a chatbot, the loop at the centre of it, and why agents fail in the real world.",
    level: "Core",
    emoji: "🤖",
    gradient: "linear-gradient(135deg, var(--violet), var(--indigo))",
  },
  {
    slug: "fine-tuning",
    title: "Fine-tuning vs RAG vs prompting",
    blurb:
      "The decision people get wrong most often. Usually you do not need to fine-tune — here is how to tell.",
    level: "Advanced",
    emoji: "🎛️",
    gradient: "linear-gradient(135deg, var(--rose), var(--amber))",
  },
  {
    slug: "evals",
    title: "Evaluating AI systems",
    blurb:
      "How to know if your AI feature is any good. The skill that separates hobby projects from shipped products.",
    level: "Advanced",
    emoji: "✅",
    gradient: "linear-gradient(135deg, var(--emerald), var(--indigo))",
  },
  {
    slug: "mlops",
    title: "MLOps — running models in production",
    blurb:
      "Deployment, monitoring, drift, retraining, cost. The unglamorous work that keeps AI systems alive.",
    level: "Advanced",
    emoji: "⚙️",
    gradient: "linear-gradient(135deg, var(--fuchsia), var(--violet))",
  },
  {
    slug: "ai-infra",
    title: "AI infrastructure and cost",
    blurb:
      "GPUs, inference, serving, and why your cloud bill explodes. Backend and DevOps skills, seen through the AI lens.",
    level: "Advanced",
    emoji: "🏗️",
    gradient: "linear-gradient(135deg, var(--cyan), var(--emerald))",
  },
];

export type Role = {
  slug: string;
  title: string;
  summary: string;
  doing: string;
  skills: string[];
  emoji: string;
  gradient: string;
};

export const ROLES: Role[] = [
  {
    slug: "ml-engineer",
    title: "Machine Learning Engineer",
    summary:
      "Builds and ships models as working software. The most common AI engineering job in India.",
    doing:
      "Turning a model that works in a notebook into a service that works at scale, and keeping it working.",
    skills: ["Python", "PyTorch or TensorFlow", "Data pipelines", "APIs", "Cloud"],
    emoji: "🤖",
    gradient: "linear-gradient(135deg, var(--indigo), var(--violet))",
  },
  {
    slug: "ai-engineer",
    title: "AI / GenAI Engineer",
    summary:
      "Builds products on top of existing foundation models rather than training new ones. The fastest-growing entry point.",
    doing:
      "Designing RAG systems, agents and LLM features — prompting, retrieval, evals, guardrails and cost control.",
    skills: ["Python or TypeScript", "LLM APIs", "RAG", "Evals", "System design"],
    emoji: "✨",
    gradient: "linear-gradient(135deg, var(--violet), var(--fuchsia))",
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    summary:
      "Answers business questions with data and statistics. Closer to analysis and decisions than to shipping software.",
    doing:
      "Framing the question, finding the data, modelling it, and — the part people underrate — explaining it to non-technical people.",
    skills: ["Statistics", "SQL", "Python", "Experiment design", "Communication"],
    emoji: "📊",
    gradient: "linear-gradient(135deg, var(--cyan), var(--indigo))",
  },
  {
    slug: "mlops-engineer",
    title: "MLOps Engineer",
    summary:
      "Keeps models running reliably in production. A natural switch for DevOps and backend engineers.",
    doing:
      "Pipelines, deployment, monitoring, drift detection, retraining and infrastructure cost.",
    skills: ["Docker & Kubernetes", "CI/CD", "AWS or Azure", "Python", "Monitoring"],
    emoji: "⚙️",
    gradient: "linear-gradient(135deg, var(--fuchsia), var(--rose))",
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    summary:
      "Builds the pipelines every AI system depends on. Chronically in demand and often overlooked.",
    doing:
      "Moving data reliably from where it is produced to where models can use it, at volume.",
    skills: ["SQL", "Spark", "Airflow", "Cloud warehouses", "Python"],
    emoji: "🛠️",
    gradient: "linear-gradient(135deg, var(--emerald), var(--cyan))",
  },
  {
    slug: "nlp-engineer",
    title: "NLP Engineer",
    summary:
      "Specialises in language — search, extraction, classification, translation.",
    doing:
      "Building systems that read and understand text, increasingly on top of LLMs.",
    skills: ["Python", "Transformers", "Tokenisation", "Evaluation", "Linguistics basics"],
    emoji: "🗣️",
    gradient: "linear-gradient(135deg, var(--amber), var(--fuchsia))",
  },
  {
    slug: "computer-vision-engineer",
    title: "Computer Vision Engineer",
    summary:
      "Works on images and video — detection, recognition, inspection, medical imaging.",
    doing:
      "Training and deploying vision models, often onto constrained or edge hardware.",
    skills: ["Python", "PyTorch", "OpenCV", "Model optimisation", "Maths"],
    emoji: "👁️",
    gradient: "linear-gradient(135deg, var(--rose), var(--amber))",
  },
  {
    slug: "research-scientist",
    title: "Research Scientist",
    summary:
      "Advances the state of the art. Almost always needs a postgraduate degree — be clear-eyed about that.",
    doing:
      "Reading, proposing, experimenting and publishing. The smallest and most competitive slice of the field.",
    skills: ["Strong maths", "Research methods", "PyTorch", "Publications", "MS/PhD"],
    emoji: "🔬",
    gradient: "linear-gradient(135deg, var(--indigo), var(--emerald))",
  },
];
