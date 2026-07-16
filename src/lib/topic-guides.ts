export type TopicSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type TopicGuide = {
  slug: string;
  hero: string;
  sections: TopicSection[];
  subtopics: { name: string; oneliner: string }[];
  tools: { name: string; note: string }[];
  learningPath: string[];
};

export const TOPIC_GUIDES: TopicGuide[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "what-is-ai",
    hero: "The foundation: what the words actually mean before you learn any of them",
    sections: [
      {
        heading: "What is artificial intelligence?",
        body: "Artificial intelligence is any system that can perform tasks that would normally require human intelligence — recognising faces, understanding speech, making decisions, translating languages. The term is broad on purpose: a chess engine from 1997 and a chatbot from 2025 are both called AI, even though they work completely differently.\n\nMost of what people call AI today is actually machine learning, which is a specific way of building AI systems. Understanding this distinction matters because it tells you what skills to learn first.",
      },
      {
        heading: "AI vs ML vs deep learning — the difference",
        body: "Think of these as nested circles. AI is the largest circle — any system that mimics intelligent behaviour. Machine learning sits inside AI — it is a technique where systems learn patterns from data instead of being explicitly programmed. Deep learning sits inside ML — it uses neural networks with many layers to learn complex patterns.\n\nWhen a job posting says 'AI engineer', they almost always mean someone who works with machine learning and deep learning. When they say 'GenAI engineer', they mean someone who builds on top of large language models (which are deep learning models).",
        bullets: [
          "AI: the broad field — any intelligent system",
          "ML: learning from data instead of rules",
          "Deep learning: ML with multi-layer neural networks",
          "GenAI: AI that generates new content (text, images, code)",
        ],
      },
      {
        heading: "Where AI is used today",
        body: "AI is not a future technology — it is already in most software you use daily. Search engines rank results with ML models. Email filters spam with classification models. Navigation apps predict traffic with time-series models. Video platforms recommend content with collaborative filtering. Banks detect fraud with anomaly detection.\n\nIn India specifically, AI is being applied in agriculture (crop disease detection), healthcare (radiology screening), fintech (credit scoring for thin-file customers), e-commerce (demand forecasting), and government services (document processing).",
      },
      {
        heading: "Why this matters for your career",
        body: "AI is not one career — it is a skill set that is becoming required across many careers. A backend engineer who understands ML pipelines is more employable. A data analyst who can build simple models gets promoted faster. And the dedicated AI roles — ML engineer, data scientist, AI engineer — are among the fastest-growing and highest-paying positions in Indian tech.\n\nYou do not need to become a researcher to benefit. The biggest demand is for people who can apply AI to real products, not people who can invent new algorithms.",
      },
      {
        heading: "How to get started",
        body: "Start by understanding what problems AI can and cannot solve — that is more important than learning any framework. Then pick a role that fits your background (see our careers section). If you are completely new, go through our guides in order: this page first, then How LLMs Work, then The Python You Need for AI.",
      },
    ],
    subtopics: [
      { name: "Supervised learning", oneliner: "Learning from labelled examples — the most common type" },
      { name: "Unsupervised learning", oneliner: "Finding patterns in data without labels" },
      { name: "Reinforcement learning", oneliner: "Learning by trial, error and reward" },
      { name: "Neural networks", oneliner: "Computing systems loosely inspired by brain structure" },
      { name: "Natural language processing", oneliner: "Teaching machines to work with human language" },
      { name: "Computer vision", oneliner: "Teaching machines to understand images and video" },
      { name: "Generative AI", oneliner: "Models that create new text, images, code or audio" },
      { name: "AI ethics", oneliner: "Bias, fairness, transparency and responsible use" },
    ],
    tools: [
      { name: "Python", note: "The dominant language for AI work" },
      { name: "Google Colab", note: "Free notebooks with GPU access for experiments" },
      { name: "Hugging Face", note: "Pre-trained models you can use immediately" },
      { name: "ChatGPT / Claude", note: "Try the output of AI to understand what it can do" },
    ],
    learningPath: [
      "Read this guide to understand the landscape",
      "Explore how LLMs work (next guide)",
      "Try a pre-trained model on Hugging Face or Google Colab",
      "Learn the Python slice you need (our Python guide)",
      "Pick a specific area (RAG, agents, vision) based on your interest",
      "Choose a career path that fits your background",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "how-llms-work",
    hero: "What a language model is actually doing when it answers you — no maths required",
    sections: [
      {
        heading: "What is a large language model?",
        body: "A large language model (LLM) is a neural network trained on enormous amounts of text to predict the next word in a sequence. That is genuinely all it does at its core — predict the next token. But when you scale this up to billions of parameters trained on most of the internet's text, something remarkable happens: the model starts to exhibit reasoning, summarisation, translation and code generation as emergent behaviours.\n\nModels like GPT-4, Claude, Gemini and Llama are all LLMs. They differ in architecture details, training data and fine-tuning, but they share this fundamental mechanism.",
      },
      {
        heading: "Tokens, context windows and prompts",
        body: "LLMs do not read words — they read tokens, which are fragments of words. 'Understanding' might become 'Under' + 'standing'. A typical English word is 1–2 tokens. This matters because every LLM has a context window — the maximum number of tokens it can see at once. GPT-4 Turbo has 128K tokens; Claude can handle 200K. Everything your prompt contains, plus the model's response, must fit in this window.\n\nA prompt is just the text you send to the model. The quality of your prompt determines the quality of the output — this is why prompt engineering exists as a skill.",
        bullets: [
          "Token: a piece of a word, roughly 4 characters",
          "Context window: total tokens the model can see at once",
          "Prompt: your input to the model",
          "Completion: the model's generated output",
        ],
      },
      {
        heading: "Training: pre-training, fine-tuning and RLHF",
        body: "Building an LLM happens in stages. Pre-training is the expensive part — the model reads billions of documents and learns to predict text. This produces a base model that can complete text but is not yet useful for conversations.\n\nFine-tuning adjusts the model for specific tasks using smaller, curated datasets. Instruction tuning teaches it to follow directions. RLHF (reinforcement learning from human feedback) teaches it to produce responses that humans rate as helpful and safe. The model you talk to in ChatGPT or Claude has been through all of these stages.",
      },
      {
        heading: "Why LLMs get things wrong",
        body: "LLMs hallucinate — they generate confident, fluent text that is factually wrong. This happens because they are predicting plausible text, not retrieving verified facts. They have no memory between conversations (unless the system stores it). They cannot do reliable maths. They reflect biases present in their training data.\n\nUnderstanding these limitations is not optional — it is the difference between building a useful AI product and building a liability. RAG (retrieval-augmented generation) and evals exist specifically to address these problems.",
      },
      {
        heading: "Where LLMs are used",
        body: "LLMs power chatbots, code assistants, document summarisation, customer support automation, content generation, search, translation and more. In enterprise, they are used for internal knowledge retrieval, contract analysis and report generation. Every major tech company in India is either integrating LLMs into their products or building teams to do so.",
      },
    ],
    subtopics: [
      { name: "Transformer architecture", oneliner: "The neural network design behind all modern LLMs" },
      { name: "Attention mechanism", oneliner: "How the model decides which parts of the input matter most" },
      { name: "Tokenisation", oneliner: "Breaking text into pieces the model can process" },
      { name: "Temperature and sampling", oneliner: "Controls that make output more random or more focused" },
      { name: "Hallucination", oneliner: "When the model generates plausible but false information" },
      { name: "Context window", oneliner: "The model's memory limit for a single conversation" },
      { name: "Fine-tuning", oneliner: "Adjusting a pre-trained model for a specific task" },
      { name: "RLHF", oneliner: "Training the model to align with human preferences" },
    ],
    tools: [
      { name: "OpenAI API / Playground", note: "Try GPT models with different parameters" },
      { name: "Anthropic API", note: "Access Claude models for experimentation" },
      { name: "Hugging Face Transformers", note: "Run open-source LLMs locally" },
      { name: "Ollama", note: "Run LLMs on your own machine with one command" },
      { name: "LM Studio", note: "Desktop app for running local models with a chat UI" },
    ],
    learningPath: [
      "Read this guide for the conceptual foundation",
      "Try different prompts in ChatGPT or Claude to see how output changes",
      "Experiment with temperature and system prompts in a playground",
      "Read our prompt engineering guide for production-quality prompting",
      "Learn about RAG to ground LLMs in your own data",
      "Understand evals to measure whether your LLM feature actually works",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "python-for-ai",
    hero: "You do not need all of Python — here is the slice that actually matters",
    sections: [
      {
        heading: "Why Python dominates AI",
        body: "Python is not the fastest language, but it has the richest ecosystem for AI. PyTorch, TensorFlow, scikit-learn, pandas, NumPy, Hugging Face — every major AI library is Python-first. The job market reflects this: virtually every ML engineer and data scientist job listing in India requires Python.\n\nThe good news is you do not need to master all of Python to start doing AI work. There is a specific subset that matters, and you can learn it in weeks rather than months.",
      },
      {
        heading: "The Python you need first",
        body: "For AI work, focus on these areas in order. You need to be comfortable with data structures (lists, dictionaries, sets), functions, classes at a basic level, list comprehensions, file I/O, and error handling. Then move to the scientific stack.",
        bullets: [
          "Core syntax: variables, loops, conditionals, functions",
          "Data structures: lists, dicts, sets, tuples",
          "List comprehensions and generators",
          "Basic OOP: classes, __init__, inheritance",
          "File handling and JSON parsing",
          "Virtual environments and pip",
        ],
      },
      {
        heading: "The scientific Python stack",
        body: "NumPy is the foundation — it handles numerical arrays and matrix operations that ML depends on. pandas builds on NumPy for data manipulation (loading CSVs, filtering rows, grouping data). matplotlib and seaborn handle visualisation. scikit-learn provides classical ML algorithms. These four libraries are used in nearly every data science and ML project.\n\nFor deep learning, you will learn PyTorch or TensorFlow — but those come later, after you are comfortable with the basics.",
        bullets: [
          "NumPy: arrays, matrix maths, the base of everything",
          "pandas: DataFrames, data cleaning, analysis",
          "matplotlib / seaborn: charts and visualisation",
          "scikit-learn: classical ML (regression, classification, clustering)",
          "Jupyter notebooks: interactive coding environment",
        ],
      },
      {
        heading: "What you can skip for now",
        body: "You do not need Django or Flask (web frameworks — different track). You do not need advanced design patterns, metaclasses, decorators beyond basics, or async programming to start. Multithreading matters later for production ML, but not for learning. Do not let these slow you down.",
      },
      {
        heading: "Where to practise",
        body: "Google Colab gives you free Jupyter notebooks with GPU access — no setup required. Kaggle has datasets and competitions that force you to write real code. Start with Colab, work through a pandas tutorial with a real dataset, then try a simple scikit-learn classifier. Building one end-to-end project teaches more than five tutorials.",
      },
    ],
    subtopics: [
      { name: "NumPy arrays", oneliner: "The foundation of all numerical computing in Python" },
      { name: "pandas DataFrames", oneliner: "Tabular data manipulation — the most-used library in data work" },
      { name: "Jupyter notebooks", oneliner: "Interactive coding environment used for experiments" },
      { name: "Virtual environments", oneliner: "Isolating project dependencies so nothing breaks" },
      { name: "Type hints", oneliner: "Adding type annotations for clearer, safer code" },
      { name: "pip and conda", oneliner: "Package managers for installing libraries" },
    ],
    tools: [
      { name: "Google Colab", note: "Free Jupyter notebooks with GPU — start here" },
      { name: "VS Code", note: "The most popular editor for Python, with great extensions" },
      { name: "Kaggle", note: "Datasets and competitions for practice" },
      { name: "Real Python", note: "Well-written tutorials for learning Python properly" },
    ],
    learningPath: [
      "Install Python or open Google Colab (no install needed)",
      "Learn core syntax: variables, loops, functions, dicts",
      "Work through a pandas tutorial with a real CSV dataset",
      "Learn NumPy basics: array creation, indexing, operations",
      "Build one project: load data, clean it, visualise it, train a simple model",
      "Then move to our guide on how much maths you need",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "maths-for-ml",
    hero: "An honest answer — it depends on what you want to build",
    sections: [
      {
        heading: "The uncomfortable truth",
        body: "The amount of maths you need depends entirely on the role you are aiming for. An AI/GenAI engineer who builds products on top of LLM APIs needs very little maths. A research scientist pushing the state of the art needs strong linear algebra, calculus and probability. Most people reading this are closer to the first camp.\n\nDo not let maths anxiety stop you from starting. But also do not believe anyone who says maths does not matter at all — once you go beyond using APIs, understanding the maths helps you debug, optimise and make better design choices.",
      },
      {
        heading: "Maths by role",
        body: "Here is an honest breakdown of what each role actually requires in practice.",
        bullets: [
          "AI / GenAI engineer: basic probability, no calculus required",
          "Data scientist: statistics and probability are essential, linear algebra helpful",
          "ML engineer: linear algebra, basic calculus, probability, optimisation basics",
          "Research scientist: strong linear algebra, multivariate calculus, probability theory, information theory",
          "Data engineer: very little maths — SQL and systems thinking matter more",
          "MLOps engineer: almost no maths — infrastructure and pipeline skills dominate",
        ],
      },
      {
        heading: "The maths that comes up most often",
        body: "Three areas cover 90% of what working ML engineers need. Linear algebra (vectors, matrices, dot products) — because all data and model parameters are stored as matrices. Probability and statistics (distributions, Bayes theorem, hypothesis testing) — because ML is fundamentally about making predictions under uncertainty. Basic calculus (derivatives, gradients, chain rule) — because training neural networks uses gradient descent.\n\nYou do not need to derive proofs. You need to understand what a gradient is, why a loss function decreases during training, and what it means when someone says 'the model is overfitting'.",
      },
      {
        heading: "What you can safely skip",
        body: "Unless you are going into research: differential equations, real analysis, topology, abstract algebra, and most of measure theory. These are beautiful branches of mathematics but they are not required for applied AI engineering work.",
      },
      {
        heading: "How to learn the maths you need",
        body: "Learn maths in context, not in isolation. Do not take a full linear algebra course before touching ML — instead, learn the linear algebra concepts as they come up in ML tutorials. 3Blue1Brown's Essence of Linear Algebra series is the best visual introduction. Khan Academy covers probability well. Then apply what you learn immediately in code using NumPy.",
      },
    ],
    subtopics: [
      { name: "Linear algebra", oneliner: "Vectors, matrices, transformations — the language of data" },
      { name: "Probability", oneliner: "Quantifying uncertainty — central to all ML" },
      { name: "Statistics", oneliner: "Summarising data, testing hypotheses, drawing conclusions" },
      { name: "Calculus (gradients)", oneliner: "How neural networks learn through gradient descent" },
      { name: "Optimisation", oneliner: "Finding the best parameters for a model" },
      { name: "Information theory", oneliner: "Entropy, cross-entropy — measuring information and surprise" },
    ],
    tools: [
      { name: "3Blue1Brown", note: "Best visual explanations of linear algebra and calculus" },
      { name: "Khan Academy", note: "Solid probability and statistics courses, free" },
      { name: "NumPy", note: "Apply maths concepts immediately in code" },
      { name: "Desmos", note: "Interactive graphing to visualise functions" },
    ],
    learningPath: [
      "Decide which role you are targeting (see our careers section)",
      "Watch 3Blue1Brown's Essence of Linear Algebra (4 hours)",
      "Learn probability basics: Bayes theorem, distributions, expected value",
      "Understand gradient descent conceptually (no proofs needed)",
      "Apply these in code: matrix multiplication in NumPy, gradient descent in 20 lines of Python",
      "Learn more maths only when a specific ML concept demands it",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "prompt-engineering",
    hero: "Beyond tricks — how to write prompts that hold up in production",
    sections: [
      {
        heading: "What prompt engineering actually is",
        body: "Prompt engineering is the skill of communicating effectively with language models to get reliable, useful output. It is not a collection of 'hacks' or 'magic phrases' — it is closer to writing clear specifications. A well-engineered prompt tells the model what role to play, what format to use, what constraints to follow, and what a good answer looks like.\n\nThis matters because LLMs are sensitive to how you phrase things. The same question asked differently can produce wildly different quality answers. In production systems, the prompt is often the most important piece of code.",
      },
      {
        heading: "Core techniques that work",
        body: "These techniques are proven across models and use cases. They are not tricks — they are communication principles.",
        bullets: [
          "Be specific: 'summarise this in 3 bullet points under 20 words each' beats 'summarise this'",
          "Provide context: tell the model who the audience is and what the output is for",
          "Give examples (few-shot): show the model what good output looks like",
          "Use system prompts: set the model's role and constraints upfront",
          "Chain of thought: ask the model to reason step by step for complex problems",
          "Output format: specify JSON, markdown, or a template when you need structured output",
          "Negative instructions: tell the model what NOT to do when it keeps doing something wrong",
        ],
      },
      {
        heading: "Why most prompt hacks do not work in production",
        body: "The internet is full of prompt tricks: 'pretend you are an expert', 'I will tip you $200', 'take a deep breath'. These sometimes produce marginally better results in casual use, but they are unreliable in production. They do not generalise across models, they break with model updates, and they cannot be tested systematically.\n\nProduction prompt engineering is about consistency and measurability. You need prompts that work 95% of the time, not prompts that occasionally produce impressive output. This is why evals matter — you need to measure whether your prompt actually improves results.",
      },
      {
        heading: "Prompt engineering in production systems",
        body: "In real products, prompts are not single strings — they are templates with variables, few-shot examples, retrieval context (from RAG), and guardrails. A production prompt for a customer support bot might be 2000 tokens long, with retrieved FAQ entries, conversation history, and detailed formatting instructions.\n\nThe workflow is: write a prompt, build an eval set, measure performance, iterate. This is closer to software engineering than creative writing.",
      },
      {
        heading: "Career relevance",
        body: "Prompt engineering is not a standalone career for most people — it is a skill within the AI / GenAI engineer role. Every AI engineer needs to be good at prompting. Dedicated 'prompt engineer' roles exist but are declining as the skill becomes expected of all AI engineers. The valuable skill is not prompting in isolation — it is prompting combined with RAG, evals and system design.",
      },
    ],
    subtopics: [
      { name: "System prompts", oneliner: "Setting the model's behaviour before the user speaks" },
      { name: "Few-shot prompting", oneliner: "Teaching by example within the prompt itself" },
      { name: "Chain of thought", oneliner: "Asking the model to show its reasoning step by step" },
      { name: "Structured output", oneliner: "Getting JSON, tables or templated responses reliably" },
      { name: "Prompt templates", oneliner: "Reusable prompts with variable slots for production use" },
      { name: "Guardrails", oneliner: "Preventing the model from generating harmful or off-topic output" },
      { name: "Prompt evaluation", oneliner: "Measuring whether a prompt change actually improved results" },
    ],
    tools: [
      { name: "OpenAI Playground", note: "Test prompts with adjustable parameters" },
      { name: "Anthropic Workbench", note: "Prompt testing with Claude models" },
      { name: "LangSmith", note: "Trace and evaluate prompt performance in production" },
      { name: "PromptFoo", note: "Open-source tool for prompt testing and comparison" },
    ],
    learningPath: [
      "Read this guide for the principles",
      "Practise writing specific, structured prompts with real tasks",
      "Learn few-shot prompting by building 3–5 examples for a task",
      "Build a simple prompt template with variables",
      "Learn about evals (our evals guide) to measure prompt quality",
      "Combine prompting with RAG (our RAG guide) for real-world applications",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "rag",
    hero: "How to make AI answer from your own documents instead of making things up",
    sections: [
      {
        heading: "What RAG is and why it exists",
        body: "Retrieval-Augmented Generation (RAG) is a technique where you give a language model relevant documents to read before it answers a question. Instead of relying on what the model memorised during training, you retrieve the right information from your own data and put it in the prompt.\n\nRAG exists because LLMs hallucinate. They generate confident answers even when they do not know the real answer. By grounding the model in retrieved documents, you dramatically reduce hallucination and make the model's answers verifiable.",
      },
      {
        heading: "How a RAG system works",
        body: "A RAG pipeline has three stages: indexing, retrieval and generation.\n\nIn the indexing stage, you take your documents (PDFs, web pages, databases), split them into chunks, convert each chunk into a numerical representation called an embedding, and store these embeddings in a vector database.\n\nIn the retrieval stage, when a user asks a question, you convert their question into an embedding, search the vector database for the most similar chunks, and retrieve the top results.\n\nIn the generation stage, you put the retrieved chunks into the prompt alongside the user's question, and the LLM generates an answer grounded in those specific documents.",
        bullets: [
          "Chunking: splitting documents into pieces (typically 200–1000 tokens)",
          "Embedding: converting text into numerical vectors that capture meaning",
          "Vector search: finding the chunks most similar to the user's question",
          "Context injection: putting retrieved chunks into the LLM prompt",
          "Generation: the LLM answers using the provided context",
        ],
      },
      {
        heading: "Where RAG goes wrong",
        body: "RAG is not magic. Common failure modes include: chunks that are too large or too small (bad chunking splits an answer across two chunks, so neither gets retrieved). Poor embeddings that do not capture domain-specific meaning. Retrieved context that is relevant but not sufficient to answer the question. The LLM ignoring the retrieved context and hallucinating anyway.\n\nBuilding a RAG system that works reliably requires careful chunking strategy, good embedding model selection, retrieval evaluation, and prompt engineering. This is why RAG engineering is a real specialisation, not a weekend project.",
      },
      {
        heading: "Where RAG is used",
        body: "RAG is the most common way companies add AI to internal knowledge. Customer support bots that answer from the company's help docs. Legal tools that search case law. HR chatbots that answer policy questions. Internal search that understands natural language. Any time you want an LLM to answer from a specific corpus rather than its general training, RAG is usually the right approach.\n\nIn India, RAG is being adopted heavily in fintech (regulatory document search), edtech (course Q&A), healthcare (clinical guideline retrieval), and enterprise IT (internal knowledge management).",
      },
      {
        heading: "RAG vs fine-tuning",
        body: "A common question: should I fine-tune the model on my data or use RAG? The answer is almost always RAG first. Fine-tuning changes the model's behaviour and is expensive, slow, and hard to update. RAG keeps the model unchanged and just gives it the right context — it is cheaper, faster to update (just re-index your documents), and easier to debug.\n\nFine-tuning makes sense when you need to change the model's style or teach it a completely new skill. For knowledge retrieval, RAG wins.",
      },
    ],
    subtopics: [
      { name: "Chunking strategies", oneliner: "How to split documents so retrieval works well" },
      { name: "Embedding models", oneliner: "Turning text into vectors that capture meaning" },
      { name: "Vector databases", oneliner: "Specialised databases for similarity search" },
      { name: "Hybrid search", oneliner: "Combining keyword and vector search for better results" },
      { name: "Reranking", oneliner: "Scoring retrieved results to pick the best ones" },
      { name: "Agentic RAG", oneliner: "Using an AI agent to decide what and how to retrieve" },
      { name: "Evaluation", oneliner: "Measuring whether your RAG system actually answers correctly" },
    ],
    tools: [
      { name: "LangChain / LlamaIndex", note: "Popular frameworks for building RAG pipelines" },
      { name: "Pinecone / Weaviate / Qdrant", note: "Vector databases for storing embeddings" },
      { name: "OpenAI / Cohere Embeddings", note: "APIs for generating text embeddings" },
      { name: "ChromaDB", note: "Lightweight vector store, good for prototyping" },
      { name: "RAGAS", note: "Open-source framework for evaluating RAG quality" },
    ],
    learningPath: [
      "Understand the conceptual flow: chunk → embed → store → retrieve → generate",
      "Build a simple RAG with LangChain and a few PDF documents",
      "Experiment with chunk sizes and overlap to see how results change",
      "Try different embedding models and compare retrieval quality",
      "Add a reranker to improve result relevance",
      "Build an eval set and measure your RAG system's accuracy",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mcp",
    hero: "The open standard that connects AI models to the tools and data they need",
    sections: [
      {
        heading: "What MCP is",
        body: "The Model Context Protocol (MCP) is an open standard created by Anthropic that lets AI models connect to external tools, data sources and services through a unified interface. Think of it as a USB-C port for AI — instead of building a custom integration for every tool, you build one MCP server and any MCP-compatible model can use it.\n\nBefore MCP, every AI assistant needed custom code to connect to each tool (a Slack integration, a database connector, a file reader). MCP standardises this so a single protocol handles all of them.",
      },
      {
        heading: "How MCP works",
        body: "MCP uses a client-server architecture. The AI application (like Claude Desktop or an IDE) is the MCP client. Each tool or data source is wrapped in an MCP server — a small program that exposes capabilities in a standard format.\n\nAn MCP server can expose three types of capabilities: tools (functions the model can call, like 'search the database' or 'send a message'), resources (data the model can read, like files or API responses), and prompts (reusable prompt templates).",
        bullets: [
          "MCP client: the AI application that needs to use tools",
          "MCP server: wraps a tool or data source in the MCP protocol",
          "Tools: actions the model can execute (read file, query DB, send email)",
          "Resources: data the model can access (documents, API responses)",
          "Prompts: reusable templates for common tasks",
        ],
      },
      {
        heading: "Why MCP matters",
        body: "MCP solves the N×M integration problem. Without it, if you have 10 AI apps and 20 tools, you need 200 custom integrations. With MCP, each AI app implements the client protocol once, each tool implements the server protocol once, and they all work together. This is the same pattern that made USB successful.\n\nFor developers, MCP means you can build a tool integration once and have it work across Claude, VS Code, and any other MCP-compatible application. For organisations, it means AI assistants can securely access internal systems without building everything from scratch.",
      },
      {
        heading: "Building an MCP server",
        body: "An MCP server is surprisingly simple to build. The Anthropic SDK provides TypeScript and Python libraries that handle the protocol. You define your tools as functions with typed parameters, register them with the server, and the framework handles communication with the client.\n\nA basic MCP server that reads from a database or searches a knowledge base can be built in an afternoon. The hard part is not the protocol — it is deciding what capabilities to expose and how to handle authentication and permissions securely.",
      },
      {
        heading: "Career relevance",
        body: "MCP is new (released late 2024) and adoption is growing fast. Companies building AI products need engineers who can build MCP integrations for their internal tools. Understanding MCP puts you ahead of most candidates, because most have not learned it yet. It fits naturally into the AI / GenAI engineer role.",
      },
    ],
    subtopics: [
      { name: "MCP servers", oneliner: "Programs that expose tools and data via the MCP protocol" },
      { name: "MCP clients", oneliner: "AI applications that consume MCP servers" },
      { name: "Tool definitions", oneliner: "Describing what a tool does so the model can use it correctly" },
      { name: "Resources", oneliner: "Static or dynamic data sources the model can read" },
      { name: "Sampling", oneliner: "Allowing MCP servers to request model completions" },
      { name: "Authentication", oneliner: "Securing access so only authorised models use your tools" },
    ],
    tools: [
      { name: "Anthropic MCP SDK", note: "Official TypeScript and Python libraries for building servers" },
      { name: "Claude Desktop", note: "MCP client — configure servers in the settings file" },
      { name: "VS Code + Claude", note: "IDE with MCP support for development workflows" },
      { name: "MCP Inspector", note: "Testing tool for debugging MCP servers" },
    ],
    learningPath: [
      "Read this guide to understand the architecture",
      "Install Claude Desktop and connect to a pre-built MCP server",
      "Read the MCP specification on modelcontextprotocol.io",
      "Build a simple MCP server in TypeScript or Python using the SDK",
      "Add tool definitions with proper input schemas",
      "Connect your server to Claude Desktop and test it end-to-end",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ai-agents",
    hero: "What separates an agent from a chatbot — and why most agent demos fail in the real world",
    sections: [
      {
        heading: "What an AI agent is",
        body: "An AI agent is a system where a language model can plan, use tools, observe results and decide what to do next — in a loop. Unlike a simple chatbot that receives a message and returns a response, an agent can break a task into steps, execute actions (search the web, write code, query a database), observe the results, and decide whether to continue, retry or stop.\n\nThe key difference from a chatbot is autonomy: an agent takes multiple actions to accomplish a goal, rather than just answering a question.",
      },
      {
        heading: "The agent loop",
        body: "Every agent follows the same core loop: think, act, observe, repeat.\n\nThink: the model receives the current state and decides what to do next. Act: the model calls a tool (search, code execution, API call). Observe: the model reads the result of the tool call. Repeat: based on the observation, the model decides whether to call another tool, retry, or return a final answer.\n\nThis loop continues until the agent decides the task is complete, hits a maximum number of steps, or encounters an error it cannot recover from.",
        bullets: [
          "Think: analyse the current state and plan the next step",
          "Act: execute a tool or action",
          "Observe: read the result of the action",
          "Repeat: decide whether to continue or finish",
        ],
      },
      {
        heading: "Why agents fail in the real world",
        body: "Agent demos look impressive. Agent products mostly struggle. The core problem is compounding errors: if each step has a 90% success rate and the task requires 10 steps, overall success is only 35%. Real-world agents hit ambiguous tool outputs, unexpected errors, and decision points where the model makes the wrong choice.\n\nOther failure modes include: runaway loops (the agent keeps retrying without making progress), excessive tool calls (wasting time and money), and security issues (an agent with too much access can cause real damage).\n\nThe companies shipping successful agents constrain them heavily — limited tools, short loops, human approval for risky actions, and extensive eval suites.",
      },
      {
        heading: "Where agents are actually working",
        body: "Agents work best on well-defined, bounded tasks with clear success criteria. Code assistants (Claude Code, Cursor, GitHub Copilot) are agents that read code, make changes and run tests. Customer support agents handle tickets by searching knowledge bases and taking actions. Data analysis agents run SQL queries and create visualisations.\n\nThe pattern that works: narrow scope, good tools, short loops, human oversight. The pattern that fails: 'autonomous agent that can do anything'.",
      },
      {
        heading: "Building agents",
        body: "You can build agents with frameworks like LangChain, CrewAI, or Anthropic's agent SDK — or you can build them from scratch with a simple while loop and tool-calling API. Start simple. Build an agent that does one thing well (e.g., research a topic using web search) before trying to build a general-purpose assistant.\n\nThe most important skill is designing good tools: clear names, typed parameters, helpful error messages, and bounded scope. The model is only as good as the tools you give it.",
      },
    ],
    subtopics: [
      { name: "Tool use / function calling", oneliner: "Giving models the ability to execute actions" },
      { name: "ReAct pattern", oneliner: "Reasoning + acting in an interleaved loop" },
      { name: "Multi-agent systems", oneliner: "Multiple specialised agents working together" },
      { name: "Human-in-the-loop", oneliner: "Requiring human approval for risky or ambiguous actions" },
      { name: "Agent memory", oneliner: "Persisting context across long-running tasks" },
      { name: "Planning", oneliner: "Breaking complex tasks into executable sub-steps" },
      { name: "Agent evaluation", oneliner: "Measuring whether an agent actually completes tasks correctly" },
    ],
    tools: [
      { name: "Claude Code / Cursor", note: "Production-grade coding agents you can use today" },
      { name: "LangChain / LangGraph", note: "Framework for building agent pipelines" },
      { name: "CrewAI", note: "Multi-agent orchestration framework" },
      { name: "Anthropic Agent SDK", note: "Build agents with Claude's tool-use API" },
      { name: "Composio", note: "Pre-built tool integrations for agents" },
    ],
    learningPath: [
      "Understand the think-act-observe loop (this guide)",
      "Learn tool use / function calling with the Claude or OpenAI API",
      "Build a simple single-tool agent (e.g., a web search agent)",
      "Add error handling and loop limits",
      "Build an eval to measure task completion rate",
      "Add a second tool and observe how the agent decides between them",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fine-tuning",
    hero: "The decision most people get wrong — you probably do not need to fine-tune",
    sections: [
      {
        heading: "What fine-tuning is",
        body: "Fine-tuning takes a pre-trained model and trains it further on your own data. This adjusts the model's weights so it behaves differently — it might adopt a specific writing style, learn domain terminology, follow a particular output format, or perform a specialised task better than the base model.\n\nFine-tuning is powerful but expensive, slow and hard to maintain. Before you fine-tune, you should exhaust prompting and RAG first — they solve most problems without touching the model.",
      },
      {
        heading: "When to use prompting, RAG or fine-tuning",
        body: "This is the most important decision in applied AI engineering, and most people get it wrong by jumping to fine-tuning too early.",
        bullets: [
          "Prompting: when you need to change the model's behaviour or output format. Try this first — always",
          "RAG: when you need the model to answer from specific knowledge it was not trained on",
          "Fine-tuning: when you need to change the model's fundamental capabilities, style or domain expertise, and prompting cannot achieve it",
          "Rule of thumb: if you can show the model what you want through examples in the prompt, you do not need fine-tuning",
        ],
      },
      {
        heading: "When fine-tuning makes sense",
        body: "Fine-tuning makes sense in a few specific situations. When you need a very specific output style that few-shot examples cannot capture consistently. When you need to reduce latency by moving instructions from a long prompt into the model's weights. When you have a classification or extraction task with thousands of labelled examples and need near-perfect accuracy. When you need a smaller, cheaper model to perform like a larger one on a narrow task.\n\nIn practice, most teams that fine-tune do it for style/format consistency and latency, not for knowledge injection (that is what RAG is for).",
      },
      {
        heading: "How fine-tuning works",
        body: "You prepare a dataset of input-output examples in the format you want (typically hundreds to thousands of examples). You upload this to the model provider's fine-tuning API (OpenAI, Anthropic and Google all offer this). The provider runs training for a few epochs and gives you a custom model endpoint.\n\nFull fine-tuning adjusts all model weights and is very expensive. LoRA (Low-Rank Adaptation) adjusts a small subset of weights and is much cheaper — this is what most people use. QLoRA adds quantisation to make it even more memory-efficient.",
        bullets: [
          "Full fine-tuning: adjusts all weights, expensive, needs many GPUs",
          "LoRA: adjusts a small adapter layer, much cheaper",
          "QLoRA: LoRA with quantised weights, runs on consumer GPUs",
          "Instruction tuning: fine-tuning on instruction-following examples",
        ],
      },
      {
        heading: "The real cost of fine-tuning",
        body: "Fine-tuning is not a one-time cost. Every time the base model updates, you need to re-evaluate whether your fine-tune still works. Your training data needs to be maintained and updated. You need an eval pipeline to detect regressions. And you are now maintaining a custom model instead of using a standard API.\n\nThis operational burden is why most startups and mid-size companies should prefer prompting and RAG. Fine-tuning is justified when the performance gain is large enough to outweigh the maintenance cost.",
      },
    ],
    subtopics: [
      { name: "LoRA", oneliner: "Efficient fine-tuning by adjusting a small adapter layer" },
      { name: "QLoRA", oneliner: "LoRA with quantisation — fine-tune on consumer hardware" },
      { name: "Instruction tuning", oneliner: "Teaching a model to follow specific instructions" },
      { name: "Data preparation", oneliner: "Creating high-quality training datasets" },
      { name: "Transfer learning", oneliner: "Leveraging pre-trained knowledge for new tasks" },
      { name: "Catastrophic forgetting", oneliner: "When fine-tuning makes the model forget general abilities" },
    ],
    tools: [
      { name: "OpenAI Fine-tuning API", note: "Fine-tune GPT models via API" },
      { name: "Hugging Face PEFT", note: "Library for parameter-efficient fine-tuning" },
      { name: "Axolotl", note: "Easy-to-use fine-tuning framework for open models" },
      { name: "Unsloth", note: "Faster LoRA fine-tuning with lower memory usage" },
    ],
    learningPath: [
      "First, exhaust prompting and RAG for your use case",
      "If those are not enough, define exactly what fine-tuning would improve",
      "Prepare a high-quality dataset (at least 200 examples)",
      "Start with LoRA on a small model to validate the approach",
      "Build an eval set before fine-tuning so you can measure the improvement",
      "Fine-tune, evaluate, iterate on the dataset, repeat",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "evals",
    hero: "How to know if your AI feature is any good — the skill that separates hobby projects from shipped products",
    sections: [
      {
        heading: "Why evals matter more than most people think",
        body: "An evaluation (eval) is a systematic way to measure whether your AI system produces good output. Without evals, you are guessing. You change a prompt and it seems better — but is it actually better on the inputs that matter? Did it improve for one case and break three others?\n\nEvals are the single most underrated skill in applied AI. Every production AI system that works has an eval suite behind it. Every AI demo that looks impressive but ships poorly lacks one.",
      },
      {
        heading: "Types of evals",
        body: "Different AI features need different evaluation approaches.",
        bullets: [
          "Exact match: the output must match a known correct answer (good for classification, extraction)",
          "Similarity scoring: the output should be close to a reference answer (good for summarisation, paraphrasing)",
          "LLM-as-judge: use another LLM to rate the output (good for open-ended generation)",
          "Human evaluation: have people rate outputs (expensive but most reliable for quality)",
          "Task-specific metrics: precision, recall, F1 for classification; BLEU, ROUGE for text generation",
          "A/B testing: compare two versions with real users in production",
        ],
      },
      {
        heading: "Building an eval set",
        body: "An eval set is a collection of inputs and expected outputs that represent your real use case. Start small — 50 examples is enough to begin. Make sure the examples cover edge cases, not just the easy cases. Include examples where the correct answer is 'I don't know' or 'this is outside my scope'.\n\nThe eval set should come from real user queries, not from your imagination. If you do not have real queries yet, use synthetic ones but replace them with real data as soon as possible.",
      },
      {
        heading: "Eval-driven development",
        body: "The best AI teams work like this: write the eval first, then iterate on the prompt/RAG/model until the eval passes. This is the AI equivalent of test-driven development.\n\nEvery time you change a prompt, run the eval suite. Track scores over time. Set a minimum threshold and do not ship below it. This discipline prevents the cycle of 'change the prompt, break something else, change it again'.",
      },
      {
        heading: "Common mistakes",
        body: "Testing only on easy cases — your eval set should include the hard cases that actually fail in production. Overfitting to the eval — if you keep tweaking prompts to pass specific eval cases, you end up with a prompt that works on the eval but not on real inputs. Not versioning your evals — when you change the eval set, you lose the ability to compare with past results. Using only automated metrics — some things require human judgement.",
      },
    ],
    subtopics: [
      { name: "Eval sets", oneliner: "Collections of test inputs and expected outputs" },
      { name: "LLM-as-judge", oneliner: "Using a model to evaluate another model's output" },
      { name: "Precision and recall", oneliner: "Measuring accuracy vs completeness" },
      { name: "A/B testing", oneliner: "Comparing two versions with real users" },
      { name: "Regression testing", oneliner: "Ensuring changes do not break existing behaviour" },
      { name: "Benchmark datasets", oneliner: "Standard datasets for comparing model performance" },
    ],
    tools: [
      { name: "PromptFoo", note: "Open-source prompt testing and comparison tool" },
      { name: "LangSmith", note: "Tracing and evaluation for LLM applications" },
      { name: "Braintrust", note: "Evaluation platform for AI products" },
      { name: "RAGAS", note: "Evaluation framework specifically for RAG systems" },
      { name: "Weights & Biases", note: "Experiment tracking including eval metrics" },
    ],
    learningPath: [
      "Understand why evals matter (this guide)",
      "Build a simple eval set of 50 examples for a task you care about",
      "Write a script that runs your prompt against the eval set and scores results",
      "Try LLM-as-judge for open-ended outputs",
      "Set up automated eval runs that trigger on prompt changes",
      "Expand your eval set with real user queries over time",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mlops",
    hero: "The unglamorous work that keeps AI systems alive in production",
    sections: [
      {
        heading: "What MLOps is",
        body: "MLOps (Machine Learning Operations) is the set of practices for deploying, monitoring and maintaining machine learning models in production. It is to ML what DevOps is to software — the engineering discipline that turns a working prototype into a reliable service.\n\nMost ML models that work in a notebook never make it to production. MLOps is the bridge. It covers everything from packaging a model for deployment to detecting when it starts giving bad predictions months after launch.",
      },
      {
        heading: "Why ML in production is different",
        body: "Traditional software is deterministic — the same input gives the same output. ML systems are probabilistic and their performance degrades over time as the real world changes (data drift). A fraud detection model trained on 2024 data will perform worse in 2026 because fraud patterns evolve.\n\nThis means ML systems need monitoring that traditional software does not: tracking prediction quality, detecting data drift, triggering retraining, and managing multiple model versions simultaneously.",
        bullets: [
          "Data drift: the input data distribution changes over time",
          "Model drift: the model's accuracy degrades as the world changes",
          "Training-serving skew: differences between training and production environments",
          "Shadow deployment: running a new model alongside the old one to compare",
          "Canary releases: gradually shifting traffic to a new model version",
        ],
      },
      {
        heading: "The MLOps stack",
        body: "A production ML system typically includes: a feature store (consistent features for training and serving), a model registry (versioned model storage), a training pipeline (automated model retraining), a serving layer (API for predictions), a monitoring system (tracking performance and drift), and CI/CD for models (automated testing and deployment).\n\nYou do not need all of this on day one. Start with a simple serving layer and monitoring, then add components as complexity grows.",
      },
      {
        heading: "MLOps in India",
        body: "MLOps engineering is a natural career switch for DevOps, backend and platform engineers. The skills transfer directly — Docker, Kubernetes, CI/CD, cloud infrastructure, monitoring. You add ML-specific knowledge (model serving, drift detection, feature engineering) on top of your existing platform skills.\n\nDemand in India is growing fast. Companies that have deployed ML models (fintech, e-commerce, logistics, SaaS) all need people to keep those models running reliably.",
      },
      {
        heading: "Getting started",
        body: "You do not need to understand ML algorithms deeply to do MLOps — you need to understand how models are trained, what inputs they need, and how to serve predictions. Start by deploying a simple model as an API using FastAPI or Flask, containerise it with Docker, and set up basic monitoring. Then learn about model registries and automated retraining.",
      },
    ],
    subtopics: [
      { name: "Model serving", oneliner: "Running models as APIs that serve predictions" },
      { name: "Model registry", oneliner: "Versioned storage for trained models" },
      { name: "Feature stores", oneliner: "Consistent feature computation for training and serving" },
      { name: "Data drift monitoring", oneliner: "Detecting when input data distributions change" },
      { name: "Training pipelines", oneliner: "Automated workflows for model retraining" },
      { name: "A/B testing models", oneliner: "Comparing model versions with real traffic" },
      { name: "GPU management", oneliner: "Optimising compute resources for inference" },
    ],
    tools: [
      { name: "MLflow", note: "Open-source platform for the full ML lifecycle" },
      { name: "Kubeflow", note: "ML toolkit for Kubernetes" },
      { name: "BentoML / TorchServe", note: "Model serving frameworks" },
      { name: "Weights & Biases", note: "Experiment tracking and model monitoring" },
      { name: "DVC (Data Version Control)", note: "Version control for data and models" },
      { name: "Seldon Core", note: "ML deployment on Kubernetes" },
    ],
    learningPath: [
      "Deploy a simple scikit-learn model as a FastAPI endpoint",
      "Containerise it with Docker",
      "Add basic logging and prediction tracking",
      "Learn about model registries (start with MLflow)",
      "Set up drift detection for your model",
      "Build an automated retraining pipeline",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ai-infra",
    hero: "GPUs, inference, serving and why your cloud bill explodes",
    sections: [
      {
        heading: "What AI infrastructure means",
        body: "AI infrastructure is the computing layer that makes AI work — the GPUs that train and run models, the serving systems that handle prediction requests, the storage for datasets and model weights, and the networking that connects it all. It is backend engineering and DevOps, viewed through the lens of AI workloads.\n\nAI workloads are different from traditional web services. They are GPU-intensive rather than CPU-intensive. A single inference request might take 10–100x more compute than a typical API call. Batch training jobs can run for hours or days. This changes how you architect, scale and optimise everything.",
      },
      {
        heading: "GPU fundamentals",
        body: "GPUs (Graphics Processing Units) are used for AI because they can perform thousands of matrix operations in parallel — and neural networks are fundamentally matrix operations. NVIDIA dominates the AI GPU market with cards like the A100, H100 and H200.\n\nGPU memory (VRAM) is usually the bottleneck. A large language model needs its entire weights in GPU memory to run. A 70-billion parameter model in full precision needs about 140 GB of VRAM — more than a single GPU has. This is why quantisation (reducing precision) and model parallelism (splitting across multiple GPUs) matter.",
        bullets: [
          "VRAM: GPU memory — the main constraint for model size",
          "Quantisation: reducing precision (FP16, INT8, INT4) to fit larger models",
          "Model parallelism: splitting a model across multiple GPUs",
          "Batch inference: processing multiple requests together for efficiency",
          "Cloud GPUs: renting GPU compute from AWS, GCP, Azure or specialised providers",
        ],
      },
      {
        heading: "Inference optimisation",
        body: "Running a model in production (inference) is where most of the ongoing cost lives. Optimisation techniques include: quantisation (4-bit models run 4x faster with small quality loss), KV-caching (avoiding redundant computation for sequential tokens), batching (processing multiple requests together), speculative decoding (using a smaller model to speed up a larger one), and choosing the right hardware for your workload.\n\nFor LLM inference specifically, the key metrics are time-to-first-token (TTFT) and tokens-per-second. Users notice TTFT more than total generation time.",
      },
      {
        heading: "Cost management",
        body: "AI infrastructure costs can spiral quickly. A single H100 GPU costs about $30K, and cloud rental is $2–4 per GPU-hour. A company running a large LLM for thousands of concurrent users can easily spend $50K–500K per month on inference alone.\n\nCost optimisation strategies include: using the smallest model that meets quality requirements, quantising aggressively, batching requests, caching common queries, using spot/preemptible instances for training, and routing simple queries to cheaper models.",
      },
      {
        heading: "Career path",
        body: "AI infrastructure engineering is where backend engineering, DevOps and cloud meet AI. If you have experience with Docker, Kubernetes, cloud providers, system performance and monitoring, you already have 70% of what this role needs. Add GPU management, model serving and inference optimisation, and you are an AI infrastructure engineer.\n\nThis role is chronically understaffed because it requires both traditional infrastructure skills and AI-specific knowledge. Most pure ML engineers do not want to manage infrastructure, and most DevOps engineers have not learned AI workloads yet.",
      },
    ],
    subtopics: [
      { name: "GPU computing", oneliner: "Parallel processing hardware for AI workloads" },
      { name: "Quantisation", oneliner: "Reducing model precision to save memory and increase speed" },
      { name: "Model serving", oneliner: "Running models as APIs at scale" },
      { name: "Inference optimisation", oneliner: "Making predictions faster and cheaper" },
      { name: "Cloud AI services", oneliner: "AWS SageMaker, GCP Vertex AI, Azure ML" },
      { name: "Cost optimisation", oneliner: "Keeping AI compute bills under control" },
      { name: "Edge deployment", oneliner: "Running models on devices instead of the cloud" },
    ],
    tools: [
      { name: "NVIDIA CUDA", note: "The programming platform for GPU computing" },
      { name: "vLLM", note: "High-throughput LLM inference engine" },
      { name: "TensorRT", note: "NVIDIA's inference optimisation toolkit" },
      { name: "Triton Inference Server", note: "Production model serving from NVIDIA" },
      { name: "AWS SageMaker / GCP Vertex AI", note: "Managed ML platforms on major clouds" },
      { name: "RunPod / Lambda", note: "GPU cloud providers popular for AI workloads" },
    ],
    learningPath: [
      "Understand GPU fundamentals: why GPUs, VRAM limits, quantisation",
      "Deploy a model using vLLM or TorchServe",
      "Learn Docker and Kubernetes if you do not know them already",
      "Benchmark inference speed and measure cost per request",
      "Experiment with quantisation and measure quality vs speed trade-offs",
      "Set up autoscaling for a model serving endpoint",
    ],
  },
];

export function getTopicGuide(slug: string): TopicGuide | undefined {
  return TOPIC_GUIDES.find((g) => g.slug === slug);
}
