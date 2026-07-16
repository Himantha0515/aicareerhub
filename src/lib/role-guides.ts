export type RoleGuide = {
  slug: string;
  overview: string;
  dayToDay: string[];
  careerProgression: { level: string; title: string; description: string }[];
  requiredBackground: { must: string[]; helpful: string[]; notNeeded: string[] };
  relatedTopics: string[];
  switchingFrom: { background: string; path: string }[];
};

export const ROLE_GUIDES: RoleGuide[] = [
  {
    slug: "ml-engineer",
    overview:
      "A machine learning engineer sits at the intersection of software engineering and data science. You take models that work in a Jupyter notebook and turn them into production services that handle real traffic, real data and real failures. This is the most common AI engineering job in India and the one with the most established hiring pipeline.\n\nThe role is less about inventing new algorithms and more about building reliable systems. You need to care about latency, throughput, data quality, monitoring and deployment as much as you care about model accuracy. Most of your time is spent on data pipelines, feature engineering and debugging — not on tuning hyperparameters.",
    dayToDay: [
      "Building and maintaining data pipelines that feed training and inference",
      "Training, evaluating and iterating on models using PyTorch or TensorFlow",
      "Writing feature engineering code — transforming raw data into useful model inputs",
      "Deploying models as APIs and monitoring their performance in production",
      "Debugging data quality issues — bad data causes more failures than bad models",
      "Collaborating with data engineers (upstream data) and product teams (downstream features)",
      "Writing tests for model performance, data validation and pipeline correctness",
      "Reviewing papers and experimenting with new techniques when relevant to the product",
    ],
    careerProgression: [
      { level: "Junior", title: "ML Engineer I (0–2 years)", description: "Implement models from existing research, write pipeline code, run experiments under guidance. Focus on learning the tools and workflows." },
      { level: "Mid", title: "ML Engineer II (2–5 years)", description: "Own a model or pipeline end-to-end. Make architecture decisions, debug complex failures, mentor juniors. Start influencing what gets built." },
      { level: "Senior", title: "Senior ML Engineer (5–8 years)", description: "Design ML systems from scratch. Define data strategy, choose architectures, handle cross-team dependencies. Technical leadership without necessarily managing people." },
      { level: "Staff+", title: "Staff / Principal ML Engineer (8+ years)", description: "Set technical direction for ML across the organisation. Solve ambiguous problems, drive multi-team projects, influence hiring and culture." },
    ],
    requiredBackground: {
      must: [
        "Strong Python programming",
        "Understanding of core ML algorithms (regression, classification, trees, neural networks)",
        "Experience with at least one ML framework (PyTorch or TensorFlow)",
        "SQL and data manipulation skills",
        "Basic understanding of cloud services (AWS, GCP or Azure)",
      ],
      helpful: [
        "Experience with data pipelines (Airflow, Spark)",
        "Docker and containerisation",
        "Statistics and probability beyond the basics",
        "Experience with A/B testing and experiment design",
        "Knowledge of model serving and optimisation",
      ],
      notNeeded: [
        "A PhD — most ML engineer roles do not require one",
        "Research publications",
        "Deep knowledge of every ML algorithm — focus on what your domain needs",
        "Advanced mathematics beyond linear algebra and basic calculus",
        "Frontend development skills",
      ],
    },
    relatedTopics: ["what-is-ai", "python-for-ai", "maths-for-ml", "mlops", "evals"],
    switchingFrom: [
      { background: "Backend engineer", path: "You already know production systems, APIs and databases. Learn Python if you do not know it, then ML fundamentals and PyTorch. Your production instincts are your biggest advantage — most ML engineers with pure data science backgrounds lack them." },
      { background: "Data analyst", path: "You know SQL and data. Learn Python programming properly (not just scripts), then ML algorithms and a framework. Your domain knowledge and data intuition are valuable — lean into them." },
      { background: "Fresh graduate (CS/IT)", path: "Focus on Python + ML fundamentals + one framework. Build 2–3 end-to-end projects (Kaggle competitions count). Apply for junior roles — many companies hire fresh graduates for ML engineer positions in India." },
    ],
  },

  {
    slug: "ai-engineer",
    overview:
      "An AI / GenAI engineer builds products on top of existing foundation models (GPT, Claude, Gemini, Llama) rather than training new ones. This is the fastest-growing AI role and the most accessible entry point into the field. You do not need deep ML knowledge — you need strong software engineering skills combined with understanding of LLMs, RAG, agents and evals.\n\nThe role emerged because foundation models shifted who creates AI from researchers to builders. Instead of training models from scratch, you design systems that use models effectively: retrieval pipelines, agent workflows, prompt templates, guardrails and evaluation suites.",
    dayToDay: [
      "Designing and building RAG systems that ground LLMs in company data",
      "Writing and iterating on prompts — often the most impactful code in the system",
      "Building agent workflows with tool use and error handling",
      "Implementing guardrails to prevent harmful or off-topic model output",
      "Building evaluation suites and measuring model feature quality",
      "Integrating LLM features into existing products and APIs",
      "Managing costs — choosing the right model size, caching, batching",
      "Staying current with rapidly evolving models and frameworks",
    ],
    careerProgression: [
      { level: "Junior", title: "AI Engineer I (0–2 years)", description: "Build features using LLM APIs, implement RAG pipelines from established patterns, write evals. Learn the landscape fast — this field changes monthly." },
      { level: "Mid", title: "AI Engineer II (2–4 years)", description: "Design AI features end-to-end. Make architecture decisions (RAG vs fine-tuning, model selection, cost trade-offs). Own the eval pipeline." },
      { level: "Senior", title: "Senior AI Engineer (4–7 years)", description: "Define the AI strategy for a product. Design multi-agent systems, complex retrieval architectures, and production-grade eval infrastructure." },
      { level: "Staff+", title: "Staff AI Engineer (7+ years)", description: "Set technical direction for AI across products. Evaluate new models and paradigms, influence build-vs-buy decisions, mentor the team." },
    ],
    requiredBackground: {
      must: [
        "Strong software engineering skills (Python or TypeScript)",
        "Understanding of LLMs — how they work, their strengths and limitations",
        "Experience with LLM APIs (OpenAI, Anthropic, etc.)",
        "Knowledge of RAG and vector search concepts",
        "Ability to write and evaluate prompts systematically",
      ],
      helpful: [
        "Experience with LangChain, LlamaIndex or similar frameworks",
        "Understanding of embeddings and vector databases",
        "Knowledge of evaluation frameworks and metrics",
        "Experience with agent architectures and tool use",
        "Backend engineering skills (APIs, databases, caching)",
      ],
      notNeeded: [
        "Deep ML/DL knowledge — you use models, you do not train them",
        "A degree in AI or data science — software engineering backgrounds transfer directly",
        "GPU programming or CUDA",
        "Research publications",
        "Advanced mathematics",
      ],
    },
    relatedTopics: ["how-llms-work", "prompt-engineering", "rag", "mcp", "ai-agents", "evals"],
    switchingFrom: [
      { background: "Full-stack engineer", path: "This is the most natural switch. You already build products — now learn LLM APIs, RAG and evals. Your product instincts and system design skills are exactly what this role needs." },
      { background: "Backend engineer", path: "Very similar to full-stack. Learn LLM APIs and RAG. Your experience with APIs, databases and production systems makes you a strong candidate immediately." },
      { background: "Frontend engineer", path: "Learn Python or TypeScript for backend LLM work, then LLM APIs and RAG. Many AI features are full-stack — your UI skills combined with AI backend skills are a powerful combination." },
    ],
  },

  {
    slug: "data-scientist",
    overview:
      "A data scientist answers business questions with data. The role sits between engineering and business — you need enough technical skill to build models and write code, and enough domain knowledge to ask the right questions and communicate findings to non-technical stakeholders.\n\nData science is broader and more established than the newer AI engineering roles. It includes traditional statistics, machine learning, experiment design (A/B testing), forecasting and business analytics. Not all data science involves deep learning or LLMs — much of it is good statistics applied to messy real-world data.",
    dayToDay: [
      "Framing business questions as data problems — often the hardest part",
      "Exploratory data analysis — understanding data distributions, patterns and anomalies",
      "Building predictive models (churn prediction, demand forecasting, recommendation)",
      "Designing and analysing A/B tests and experiments",
      "Writing SQL queries to extract data from warehouses",
      "Creating dashboards and visualisations for stakeholders",
      "Communicating findings and recommendations to non-technical teams",
      "Cleaning and preparing data — typically 60–80% of the actual work",
    ],
    careerProgression: [
      { level: "Junior", title: "Data Scientist / Analyst (0–2 years)", description: "Run analyses, build simple models, create dashboards. Learn the domain and the data. Focus on communication skills alongside technical skills." },
      { level: "Mid", title: "Data Scientist II (2–5 years)", description: "Own a domain area. Design experiments, build production models, influence product decisions with data. Start mentoring." },
      { level: "Senior", title: "Senior Data Scientist (5–8 years)", description: "Define the data strategy for a product area. Lead complex multi-month projects. Bridge the gap between data team and business leadership." },
      { level: "Staff+", title: "Staff / Principal Data Scientist (8+ years)", description: "Shape the company's approach to data-driven decision-making. Define experimentation culture, hiring standards and methodology." },
    ],
    requiredBackground: {
      must: [
        "Statistics and probability — this is the core skill",
        "SQL — you will write it every single day",
        "Python (pandas, NumPy, scikit-learn, matplotlib)",
        "Experiment design and hypothesis testing",
        "Communication skills — you must explain findings to non-technical people",
      ],
      helpful: [
        "Domain expertise in your industry (fintech, e-commerce, healthcare)",
        "Experience with cloud data warehouses (BigQuery, Redshift, Snowflake)",
        "Dashboard tools (Tableau, Metabase, Looker)",
        "Deep learning frameworks for specialised tasks",
        "Causal inference methods",
      ],
      notNeeded: [
        "Software engineering depth — you need code that works, not production-grade code",
        "DevOps or infrastructure skills",
        "Frontend development",
        "GPU programming",
        "A PhD (helpful for research-heavy roles, but not required for most industry positions)",
      ],
    },
    relatedTopics: ["what-is-ai", "python-for-ai", "maths-for-ml", "evals"],
    switchingFrom: [
      { background: "Business analyst", path: "The closest jump. You already understand the business side. Learn Python, statistics beyond Excel, and basic ML. Your domain knowledge and stakeholder communication skills are huge advantages." },
      { background: "Software engineer", path: "Learn statistics, experiment design and the data science workflow. Your coding skills will be stronger than most data scientists — but learn to think in hypotheses, not just in code." },
      { background: "Math/statistics graduate", path: "Learn Python and SQL. Build projects on real datasets. Your mathematical foundation is strong — focus on applied skills and communication." },
    ],
  },

  {
    slug: "mlops-engineer",
    overview:
      "An MLOps engineer keeps machine learning models running reliably in production. If ML engineers build the models and data scientists design the experiments, MLOps engineers build the infrastructure, pipelines and monitoring that make it all work at scale.\n\nThis is a natural career path for DevOps, platform and backend engineers. The skills transfer directly — Docker, Kubernetes, CI/CD, cloud infrastructure, monitoring, alerting. You add ML-specific knowledge (model serving, data drift, feature stores, training pipelines) on top of your existing platform expertise.",
    dayToDay: [
      "Building and maintaining training pipelines — automated model retraining workflows",
      "Setting up model serving infrastructure — deploying models as APIs",
      "Monitoring model performance — detecting data drift and accuracy degradation",
      "Managing GPU clusters and optimising compute costs",
      "Building CI/CD pipelines for model deployment",
      "Setting up feature stores for consistent feature computation",
      "Managing model versioning and the model registry",
      "Debugging production issues — why did the model start giving bad predictions?",
    ],
    careerProgression: [
      { level: "Junior", title: "MLOps Engineer I (0–2 years)", description: "Maintain existing pipelines, write deployment scripts, set up monitoring. Learn the ML-specific parts while leveraging your existing infra skills." },
      { level: "Mid", title: "MLOps Engineer II (2–5 years)", description: "Design and build ML platforms. Own the model deployment lifecycle. Optimise cost and performance." },
      { level: "Senior", title: "Senior MLOps Engineer (5–8 years)", description: "Architect the ML platform for the organisation. Define standards for model deployment, monitoring and governance." },
      { level: "Staff+", title: "Staff ML Platform Engineer (8+ years)", description: "Set the technical vision for the ML platform. Influence tooling decisions, vendor choices, and team structure across engineering." },
    ],
    requiredBackground: {
      must: [
        "Docker and containerisation",
        "Kubernetes or equivalent orchestration",
        "CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI)",
        "Cloud infrastructure (AWS, GCP or Azure)",
        "Python scripting",
      ],
      helpful: [
        "Experience with monitoring and observability (Prometheus, Grafana, Datadog)",
        "Terraform or infrastructure-as-code tools",
        "Basic understanding of ML concepts (training, inference, model evaluation)",
        "Experience with data pipelines (Airflow, Prefect)",
        "GPU management and NVIDIA tooling",
      ],
      notNeeded: [
        "Deep ML/DL knowledge — you manage the infrastructure, not the algorithms",
        "Statistics or advanced mathematics",
        "Research experience",
        "Frontend development",
        "Data science skills",
      ],
    },
    relatedTopics: ["mlops", "ai-infra", "evals"],
    switchingFrom: [
      { background: "DevOps engineer", path: "The most natural switch. Learn model serving (TorchServe, vLLM), model monitoring (drift detection), and feature stores. Your existing Kubernetes, CI/CD and monitoring skills are 70% of the job already." },
      { background: "Backend engineer", path: "Learn Docker and Kubernetes if you do not know them, then model serving and ML pipeline tools (MLflow, Kubeflow). Your production systems experience transfers directly." },
      { background: "Cloud engineer", path: "Learn the ML-specific managed services on your cloud platform (SageMaker, Vertex AI). Your cloud infrastructure expertise gives you a strong foundation." },
    ],
  },

  {
    slug: "data-engineer",
    overview:
      "A data engineer builds the pipelines that move, transform and store the data that every AI system depends on. Without data engineers, data scientists have no data to analyse and ML engineers have no data to train on. The role is chronically in demand and often overlooked by people entering the AI field.\n\nData engineering is less glamorous than model building but arguably more important. Bad data causes more AI failures than bad algorithms. A well-built data pipeline is the difference between a model that works in production and one that fails unpredictably.",
    dayToDay: [
      "Designing and building ETL/ELT pipelines that move data between systems",
      "Working with data warehouses and data lakes (BigQuery, Snowflake, Databricks)",
      "Writing a lot of SQL — complex queries, optimisations, data modelling",
      "Building real-time data streams with Kafka or similar tools",
      "Data quality monitoring — catching missing, corrupt or delayed data",
      "Schema design and data modelling for analytics and ML consumption",
      "Optimising query performance and storage costs",
      "Collaborating with data scientists and ML engineers on data requirements",
    ],
    careerProgression: [
      { level: "Junior", title: "Data Engineer I (0–2 years)", description: "Write pipelines, maintain existing infrastructure, fix data quality issues. Learn SQL deeply and understand the data landscape." },
      { level: "Mid", title: "Data Engineer II (2–5 years)", description: "Design data models and pipeline architectures. Own a domain's data infrastructure. Optimise for cost and performance." },
      { level: "Senior", title: "Senior Data Engineer (5–8 years)", description: "Architect the data platform. Define data governance, quality standards and modelling conventions. Lead complex migration projects." },
      { level: "Staff+", title: "Staff / Principal Data Engineer (8+ years)", description: "Set the data strategy for the organisation. Influence technology choices, team structure and data culture." },
    ],
    requiredBackground: {
      must: [
        "Strong SQL — this is the most important skill, bar none",
        "Python for scripting and pipeline code",
        "Understanding of data warehousing concepts",
        "Experience with at least one cloud platform (AWS, GCP, Azure)",
        "ETL/ELT pipeline concepts",
      ],
      helpful: [
        "Apache Spark for large-scale data processing",
        "Airflow or Prefect for pipeline orchestration",
        "Kafka or streaming data platforms",
        "dbt for data transformation",
        "Infrastructure-as-code (Terraform)",
      ],
      notNeeded: [
        "Machine learning or deep learning knowledge",
        "Advanced mathematics",
        "Frontend development",
        "Model training or fine-tuning",
        "Research skills",
      ],
    },
    relatedTopics: ["python-for-ai", "mlops", "ai-infra"],
    switchingFrom: [
      { background: "Backend engineer", path: "You already know databases and APIs. Learn data warehousing, pipeline orchestration (Airflow) and SQL at an advanced level. Your software engineering rigour is an asset — many data engineers write sloppy code." },
      { background: "Database administrator", path: "You know databases deeply. Learn cloud data warehouses, pipeline tools and Python. Your understanding of query optimisation and schema design transfers directly." },
      { background: "Fresh graduate", path: "Focus on SQL (learn it very well), Python, and one cloud platform. Build a project that ingests data from an API, transforms it, and loads it into a warehouse. This demonstrates the core skill loop." },
    ],
  },

  {
    slug: "nlp-engineer",
    overview:
      "An NLP (Natural Language Processing) engineer specialises in systems that work with human language — search, text classification, named entity recognition, sentiment analysis, machine translation, and document understanding. This was a distinct specialisation before LLMs, and it remains one because many language problems require domain-specific solutions beyond general-purpose LLMs.\n\nThe role has shifted significantly. Before LLMs, NLP engineers trained custom models for each task. Now, much of the work involves fine-tuning or prompting LLMs, building retrieval systems, and handling the specific challenges of language data (tokenisation, multilingual support, domain-specific vocabulary).",
    dayToDay: [
      "Building text classification and extraction pipelines",
      "Designing search systems with semantic understanding",
      "Fine-tuning language models for domain-specific tasks",
      "Building and evaluating RAG systems",
      "Handling multilingual challenges — critical in India's multi-language market",
      "Named entity recognition for structured data extraction from unstructured text",
      "Sentiment and intent analysis for customer feedback and support",
      "Evaluating model performance on language tasks with domain-specific metrics",
    ],
    careerProgression: [
      { level: "Junior", title: "NLP Engineer I (0–2 years)", description: "Implement NLP pipelines using existing models and frameworks. Learn the Hugging Face ecosystem. Build evaluation pipelines for text tasks." },
      { level: "Mid", title: "NLP Engineer II (2–5 years)", description: "Design NLP systems end-to-end. Fine-tune models for domain-specific tasks. Own the text processing pipeline for a product area." },
      { level: "Senior", title: "Senior NLP Engineer (5–8 years)", description: "Architect language understanding systems. Make build-vs-buy decisions for NLP features. Lead cross-functional projects involving language data." },
      { level: "Staff+", title: "Staff NLP Engineer (8+ years)", description: "Define the language technology strategy. Evaluate new models and techniques. Influence product direction based on language AI capabilities." },
    ],
    requiredBackground: {
      must: [
        "Python programming",
        "Understanding of NLP fundamentals (tokenisation, embeddings, attention)",
        "Experience with the Hugging Face Transformers library",
        "Text preprocessing and cleaning skills",
        "Evaluation metrics for text tasks (precision, recall, F1, BLEU)",
      ],
      helpful: [
        "Linguistics basics — understanding of syntax, morphology, pragmatics",
        "Experience with multilingual NLP — especially important for India",
        "Knowledge of search and information retrieval",
        "RAG and vector search experience",
        "Fine-tuning experience with LoRA or full fine-tuning",
      ],
      notNeeded: [
        "Computer vision or audio processing skills",
        "Advanced mathematics beyond what ML needs",
        "DevOps or infrastructure (that is MLOps)",
        "Frontend development",
      ],
    },
    relatedTopics: ["how-llms-work", "rag", "prompt-engineering", "fine-tuning", "evals"],
    switchingFrom: [
      { background: "Software engineer", path: "Learn NLP fundamentals (tokenisation, embeddings, transformers), then Hugging Face and the common NLP tasks. Build a text classification or search project to demonstrate skills." },
      { background: "Linguist / language graduate", path: "Your understanding of language structure is genuinely valuable. Learn Python and the Hugging Face ecosystem. Focus on tasks like NER, text classification and multilingual NLP where linguistic knowledge gives you an edge." },
      { background: "Data scientist", path: "You know Python, statistics and modelling. Learn NLP-specific concepts (tokenisation, transformers, embeddings) and the Hugging Face ecosystem. Many NLP tasks are classification problems you already understand." },
    ],
  },

  {
    slug: "computer-vision-engineer",
    overview:
      "A computer vision engineer builds systems that understand images and video — object detection, image classification, facial recognition, medical imaging analysis, autonomous vehicle perception, quality inspection in manufacturing, and more. It is one of the more specialised AI roles and often requires stronger mathematics than other AI engineering positions.\n\nComputer vision has real-world deployment challenges that text-based AI does not face: running models on edge devices with limited compute, handling variable lighting and camera conditions, processing video streams in real-time, and dealing with safety-critical applications where model errors have physical consequences.",
    dayToDay: [
      "Training and fine-tuning vision models (classification, detection, segmentation)",
      "Building data pipelines for image and video data",
      "Annotating and managing large image datasets",
      "Optimising models for deployment on edge devices or constrained hardware",
      "Building real-time video processing pipelines",
      "Evaluating model performance with visual metrics (mAP, IoU)",
      "Handling domain-specific challenges (medical imaging, satellite imagery, industrial inspection)",
      "Working with camera systems, image preprocessing and augmentation",
    ],
    careerProgression: [
      { level: "Junior", title: "CV Engineer I (0–2 years)", description: "Implement detection and classification pipelines using pre-trained models. Learn the standard architectures (ResNet, YOLO, SAM). Build evaluation scripts." },
      { level: "Mid", title: "CV Engineer II (2–5 years)", description: "Design vision systems for specific domains. Fine-tune and optimise models for production constraints. Own the vision pipeline for a product." },
      { level: "Senior", title: "Senior CV Engineer (5–8 years)", description: "Architect end-to-end vision systems. Make hardware-software co-design decisions. Lead deployment on edge devices and production infrastructure." },
      { level: "Staff+", title: "Staff CV Engineer (8+ years)", description: "Define the vision technology strategy. Evaluate emerging architectures. Influence product roadmaps based on what computer vision can deliver." },
    ],
    requiredBackground: {
      must: [
        "Python programming",
        "PyTorch (the dominant framework for vision research and production)",
        "Understanding of CNN architectures (ResNet, EfficientNet, YOLO)",
        "Image preprocessing and data augmentation techniques",
        "Linear algebra and basic calculus — more important here than in NLP",
      ],
      helpful: [
        "OpenCV for traditional image processing",
        "Model optimisation (quantisation, pruning, distillation)",
        "ONNX Runtime or TensorRT for inference optimisation",
        "Experience with edge deployment (mobile, Jetson, embedded systems)",
        "3D vision and depth estimation",
      ],
      notNeeded: [
        "NLP or text processing skills",
        "Web development",
        "Big data tools (Spark, Kafka) unless working with video at scale",
        "Database expertise beyond basics",
      ],
    },
    relatedTopics: ["what-is-ai", "python-for-ai", "maths-for-ml", "fine-tuning", "ai-infra"],
    switchingFrom: [
      { background: "Software engineer", path: "Learn PyTorch, computer vision fundamentals (convolutions, architectures) and linear algebra. Build an object detection project with YOLO. Your production engineering skills are valuable — many CV engineers struggle with deployment." },
      { background: "Embedded / IoT engineer", path: "A strong match for edge AI roles. Learn PyTorch and vision architectures, then model optimisation for constrained hardware. Your embedded systems knowledge is a rare and valuable combination." },
      { background: "Medical / biology background", path: "Medical imaging is a growing field. Learn Python, PyTorch and basic CV concepts. Your domain knowledge of anatomy and pathology combined with CV skills makes you very employable in health-tech." },
    ],
  },

  {
    slug: "research-scientist",
    overview:
      "A research scientist advances the state of the art in AI by proposing, experimenting with and publishing novel techniques. This is the most academically demanding role in AI — almost all positions require a Master's degree, and most require a PhD. Be clear-eyed about this requirement before committing to this path.\n\nResearch scientists at companies like Google DeepMind, Meta FAIR, Microsoft Research and Anthropic work on fundamental problems: improving model architectures, training efficiency, alignment, reasoning, and safety. In India, research roles exist at large tech companies, research labs and increasingly at well-funded AI startups.",
    dayToDay: [
      "Reading and understanding recent papers — staying at the frontier is a daily requirement",
      "Designing experiments to test hypotheses about model behaviour",
      "Implementing and running experiments, often on large GPU clusters",
      "Analysing results with rigorous statistical methods",
      "Writing papers and presenting at conferences (NeurIPS, ICML, ICLR, ACL)",
      "Collaborating with other researchers and engineers to implement findings",
      "Reviewing papers from other researchers",
      "Mentoring junior researchers and PhD students",
    ],
    careerProgression: [
      { level: "Junior", title: "Research Engineer / Intern", description: "Support research projects, implement baselines, run experiments. Build research skills while contributing to ongoing work. Often during or right after a Master's/PhD." },
      { level: "Mid", title: "Research Scientist (3–7 years post-PhD)", description: "Lead independent research projects. First-author publications. Define your own research agenda within the team's focus." },
      { level: "Senior", title: "Senior Research Scientist (7–12 years)", description: "Lead a research area. Multi-paper research programmes. Influence the lab's direction. Significant publication record." },
      { level: "Staff+", title: "Staff / Principal Research Scientist (12+ years)", description: "Define research strategy for the lab. Landmark publications. Invited talks, programme committees, industry influence." },
    ],
    requiredBackground: {
      must: [
        "MS or PhD in a relevant field (CS, ML, statistics, physics, mathematics)",
        "Strong mathematical foundations (linear algebra, probability theory, optimisation, information theory)",
        "Publication record (at least for mid-level and above)",
        "Deep expertise in at least one area (NLP, vision, RL, alignment, theory)",
        "PyTorch and ability to implement papers from scratch",
      ],
      helpful: [
        "Experience with large-scale distributed training",
        "Strong writing and presentation skills",
        "Familiarity with the conference review process",
        "Knowledge of research tooling (Weights & Biases, JAX)",
        "Software engineering skills for implementing ideas efficiently",
      ],
      notNeeded: [
        "Production engineering skills (deploying APIs, CI/CD, DevOps)",
        "Frontend development",
        "Business or product management skills",
        "Industry experience — academic experience is valued highly",
      ],
    },
    relatedTopics: ["what-is-ai", "maths-for-ml", "fine-tuning", "evals"],
    switchingFrom: [
      { background: "PhD student (relevant field)", path: "The most direct path. Focus your thesis on a hot area (LLMs, alignment, reasoning, multimodal). Publish at top venues. Apply for research internships at labs during your PhD." },
      { background: "Industry ML engineer", path: "This is a difficult switch without a graduate degree. Some labs hire strong engineers as research engineers (not research scientists). Consider a part-time Master's or focus on applied research roles that value engineering skills." },
      { background: "Physics / maths graduate", path: "Your mathematical training transfers well. Learn ML and deep learning, then apply your quantitative skills to AI research. Physics-to-ML is a well-established pipeline, especially for roles involving optimisation and theory." },
    ],
  },
];

export function getRoleGuide(slug: string): RoleGuide | undefined {
  return ROLE_GUIDES.find((g) => g.slug === slug);
}
