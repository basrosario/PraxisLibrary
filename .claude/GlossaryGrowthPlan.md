Architectural Blueprint for Large-Scale AI Taxonomy Generation and High-Performance Client-Side Delivery
The convergence of generative artificial intelligence and modern web performance engineering presents a unique opportunity to reimagine the construction and delivery of technical knowledge bases. The objective to expand an Artificial Intelligence glossary to 15,000 distinct terms represents a paradigmatic shift from traditional, manually curated glossaries—which typically plateau between 1,000 and 3,000 terms—toward a comprehensive, machine-generated ontology of the domain. This undertaking necessitates a rigorous examination of two distinct but coupled engineering challenges: the automated acquisition and verification of a massive, specialized taxonomy using agentic workflows within Visual Studio Code (VS Code), and the architectural decision-making required to deliver this dataset performantly in a browser environment. Specifically, the viability of lazy-loading a monolithic JSON file versus alternative storage strategies such as SQLite via WebAssembly (WASM) serves as the central pivot point for the frontend architecture.   

This report provides an exhaustive technical analysis of these components, synthesizing methodologies from computational linguistics, agentic software engineering, and browser performance optimization to establish a robust roadmap for execution.

The Epistemology of Scale: Constructing a 15,000-Term Ontology
To understand the magnitude of a 15,000-term glossary, one must first contextualize it against the current landscape of AI documentation. Standard references, such as the Oxford Dictionary of Artificial Intelligence or the Wikipedia Glossary of Artificial Intelligence, typically contain a few hundred to a few thousand terms, focusing on high-level concepts like "Machine Learning," "Neural Networks," and "Reinforcement Learning". Expanding this to 15,000 entries requires moving beyond the "surface web" of common terminology into the "deep web" of academic research, capturing niche algorithms, obscure optimization techniques, historical hardware architectures, and emerging sub-fields like neuromorphic computing and quantum machine learning.   

The challenge is not merely writing 15,000 definitions; it is identifying 15,000 unique, valid, and distinct concepts that constitute the "universe of discourse" for Artificial Intelligence. Relying on manual enumeration is unfeasible at this scale; instead, the system must employ automated taxonomy extraction strategies that leverage existing semantic structures and large-scale bibliographic metadata.

Utilizing the Computer Science Ontology (CSO)
The backbone of this expanded glossary lies in the Computer Science Ontology (CSO), a large-scale, automatically generated taxonomy of research topics. Developed by applying the Klink-2 algorithm to a dataset of over 16 million scientific articles, the CSO provides a granular hierarchical structure that far exceeds human-curated lists.   

Ontology Feature	Metric / Detail	Implication for Glossary Project
Total Topics	~14,000 to 26,000	
Provides the immediate volume required to meet the 15,000-term target.

Semantic Relations	~162,000	
Enables the generation of "related terms" and "see also" links, enriching the glossary structure.

Data Format	N-Triples, CSV, OWL	
Machine-readable formats allow for direct ingestion by agentic scripts for cleaning and filtering.

Update Frequency	Automated/Periodic	
Ensures the glossary can be refreshed with new terms as the CSO evolves.

  
The CSO acts as the "skeleton" of the glossary. However, raw ingestion is insufficient. The "Computer Science" root node includes extraneous branches such as "Software Engineering" or "Network Protocols" that may not strictly qualify as AI. An agentic filtering process must traverse the ontology graph, starting from the "Artificial Intelligence" node and recursively collecting all child nodes (e.g., "Deep Learning," "Evolutionary Algorithms," "Swarm Intelligence") while pruning irrelevant sub-trees. This programmatic extraction ensures that the glossary captures the "long tail" of AI terminology—terms like "Abductive Logic Programming," "Selective Linear Definite clause resolution," and "Sparse Dictionary Learning"—which are often omitted from generalist dictionaries.   

The "Librarian of Alexandria" Approach for Emerging Terms
While the CSO provides a solid foundation of established terms, it lags behind the cutting edge of research. To capture the newest terminology—concepts like "Chain-of-Thought Prompting," "Direct Preference Optimization (DPO)," or "KV Cache"—the system must interface with dynamic repositories of scientific literature. The "Librarian of Alexandria" (LoA) methodology offers a blueprint for this, utilizing Large Language Models (LLMs) to extract keywords and entities directly from the abstracts of preprint papers and journal articles.   

By connecting the agentic workflow to APIs such as OpenAlex or arXiv, the system can scan metadata from the top 50,000 most-cited papers published in the last 36 months. OpenAlex, which indexes over 450 million scholarly works, provides a rich source of metadata including "concepts" and "keywords" explicitly tagged by authors or inferred by algorithms. A Python script, executed by an autonomous agent, can aggregate these tags, normalize them (e.g., collapsing "Large Language Model" and "LLM" into a single entry), and verify their frequency to ensure they reach a threshold of significance before inclusion. This dual-source strategy—CSO for the historical backbone and OpenAlex for the avant-garde—ensures the target of 15,000 terms is met with high-quality, scientifically valid entries rather than hallucinations or filler.   

Agentic Workflow Architecture in VS Code
The transition from a candidate list of terms to a fully fleshed-out glossary requires a sophisticated content generation pipeline. Executing this manually is impossible; executing it via a standard "chat" interface with an LLM is inefficient due to context limits and lack of file system access. The solution lies in Agentic AI—specifically, autonomous coding agents integrated into the IDE (Integrated Development Environment).

Visual Studio Code (VS Code) serves as the command center for this operation, augmented by extensions that allow LLMs to read files, execute terminal commands, and manage complex projects. The primary tools in this domain are Cline (formerly Claude Dev) and Cursor.

Tool Selection: Cline vs. Cursor
While both tools integrate AI into VS Code, they serve distinct roles in a high-volume generation workflow. Understanding their architectural differences is crucial for optimization.

Feature	Cline (Autonomous Agent)	Cursor (AI-Native Editor)	Recommended Role
Core Philosophy	
Autonomous execution of multi-step tasks (Plan/Act loops).

Deep contextual integration and code composition.

Cline: Pipeline Engineering & Script Execution. Cursor: Content Refinement & Frontend Dev.
File System Access	
Full read/write/execute permissions (with user approval). Can run terminal commands.

Indexes codebase for semantic search; "Composer" edits multiple files simultaneously.

Cline: Running the batch generation scripts. Cursor: Mass refactoring of JSON files.
Cost Model	
User brings their own API key (BYOK). Direct cost control.

Subscription ($20/mo) + Usage limits on premium models.

Cline: High-volume API interaction via Batch.
  
The "Plan/Act" Workflow with Cline
Cline operates on a "Plan/Act" loop, making it ideal for the orchestration of the glossary generation. The user provides a high-level directive (e.g., "Generate definitions for the first 1,000 terms in the CSV"), and Cline breaks this down into executable steps:

Analysis: Cline reads the file structure and the input CSV.

Scripting: It writes a Python script to interface with the OpenAI Batch API (discussed in the next section).

Execution: It runs the script in the VS Code terminal, monitors for errors (e.g., API rate limits, file permission issues), and auto-corrects the code if exceptions occur.   

Verification: It checks the output directory to ensure files are created correctly.

This capability to execute code, not just suggest it, transforms the glossary project from a manual writing task into a software engineering task. The "writer" becomes an "architect" of a generation pipeline.

Batch Generation Economics
Generating 15,000 comprehensive definitions—including etymology, technical explanation, and examples—requires substantial token usage. A standard definition might consume 500 tokens (input + output). For 15,000 terms, this totals 7.5 million tokens. Using standard synchronous API calls (e.g., gpt-4o or claude-3-5-sonnet) would be prohibitively expensive and slow due to rate limits.

The OpenAI Batch API is the critical enabler here. It allows for the submission of asynchronous groups of requests (up to 50,000 per batch) with a 24-hour turnaround time, offering a 50% cost discount and significantly higher rate limits.   

Workflow:

Cline generates a JSONL (JSON Lines) file where each line is a request object containing the prompt: "Define the term {term} for a technical AI glossary. Return JSON."

The script uploads this file to the /v1/batches endpoint.   

After processing, the system retrieves a results file containing all 15,000 definitions.

Structured Outputs: To ensure the generated content is machine-readable and ready for the frontend, the prompts must utilize "Structured Outputs" (JSON Schema). This forces the LLM to adhere to a strict schema (e.g., { "term": string, "definition": string, "category": string }), eliminating the need for complex regex parsing of the output.   

Automated Verification: The RAG Critic
A major risk in generating technical content with LLMs is "hallucination," where the model invents plausible but incorrect details, particularly for obscure acronyms or overlapping terms. To maintain the integrity of a "comprehensive" glossary, an automated verification layer is required.

This is achieved through a Retrieval-Augmented Generation (RAG) pipeline acting as a "Critic."

Retrieval: For each generated definition, the system queries a trusted knowledge base (e.g., a vector store containing the abstracts from OpenAlex or the text of established textbooks).   

Comparison: A separate LLM instance (the "Judge") compares the generated definition against the retrieved ground truth.

Scoring: The Judge assigns a "faithfulness" score. If the score drops below a threshold (e.g., 0.85), the term is flagged for human review.   

Frameworks: Tools like LangSmith and Ragas facilitate this evaluation, providing observability into the quality of the generation and ensuring that the "AI Glossary" is not merely an "AI Hallucination".   

Client-Side Performance Architecture: The JSON vs. SQLite Conundrum
The user's specific query regarding the viability of lazy loading a single JSON file for 15,000 terms requires a nuanced, physics-based analysis of browser behavior. While "viable" in the strictest sense (the browser will not crash), it is architecturally suboptimal and likely to degrade user experience on non-flagship devices.

The Physics of Large JSON Payloads
To quantify the challenge, we must estimate the data size.

Average Entry: ~1.5 KB (200 words + metadata).

Total Size: 15,000 * 1.5 KB ≈ 22.5 MB (Uncompressed).

Compressed (Gzip/Brotli): Text JSON compresses efficiently, likely reducing to ~4-5 MB.

On a modern 5G or fiber connection, downloading 5 MB is trivial (under 1 second). However, the bottleneck in web performance has shifted from network to CPU. The browser's main thread is responsible for parsing the JSON, compiling the JavaScript, and rendering the DOM.

The Parsing Bottleneck: JSON.parse() is a synchronous, blocking operation in JavaScript. Parsing a 22 MB string into a JavaScript Object can take anywhere from 50ms (Desktop i9) to 800ms+ (Low-end Android). During this time, the UI is completely frozen—interactions are blocked, animations stutter, and the "Interaction to Next Paint" (INP) metric spikes, harming SEO and usability.   

The "Lazy Loading" Fallacy: The term "lazy loading" typically implies fetching data only when needed (e.g., streaming video). However, standard JSON is not streamable in a native browser context. To parse a valid JSON array, the browser typically waits for the closing bracket ]. While streaming JSON parsers (like Oboe.js) exist, they add complexity and overhead. Thus, "lazy loading" a single file effectively means "delaying the monolithic download," which simply postpones the inevitable main-thread freeze until the user initiates the interaction.   

Alternative 1: Static Partitioning (The "Phonebook" Method)
A more performant approach involves splitting the monolithic file into smaller, deterministic chunks during the build process.   

Strategy: Split files alphabetically (A.json, B.json) or by hash (chunk-0.json, chunk-1.json).

Mechanism: The client loads a lightweight index (20KB) mapping terms to chunks. When the user clicks "Transformer," the app fetches T.json (100KB).

Pros: Near-instant initial load; browser caches chunks individually.

Cons: Global search becomes difficult. Searching for "Gradient" within the definition of "Backpropagation" requires loading multiple files, reintroducing the latency.   

Alternative 2: SQLite WASM (The "Gold Standard")
For a dataset of 15,000 structured items requiring search, filtering, and cross-referencing, the browser-native solution is SQLite via WebAssembly (WASM), specifically utilizing the Origin Private File System (OPFS) or HTTP Range Requests. This architecture allows the browser to treat a static file on the server as a random-access database.   

How sql.js-httpvfs Works: This library implements a virtual file system that translates SQLite disk reads into HTTP Range requests.   

Hosting: The 22 MB SQLite database file (glossary.db) is hosted on a standard static server (GitHub Pages, Netlify, AWS S3).

Querying: When the user types "Neural," the SQLite engine running in the browser determines which B-Tree pages contain that index.

Fetching: It sends a request for only those specific bytes (e.g., bytes 10240–14096).

Performance: The client downloads kilobyes, not megabytes. Complex queries run in milliseconds. The main thread is never blocked because the database lives in a Web Worker.   

Metric	Monolithic JSON	Partitioned JSON	SQLite WASM (HTTP VFS)
Initial Download	~5 MB (Compressed)	~20 KB (Index)	~500 KB (WASM + Metadata)
Parse/Load Cost	High (Blocking)	Low (Per chunk)	Low (Async Worker)
Search Capability	Client-side Linear Scan	Limited to loaded chunks	Full SQL (FTS5 Index)
Memory Usage	High (Full Object in Heap)	Moderate	Low (Paged)
Viability Verdict	Low	Medium	High (Recommended)
Frontend Visualization: Virtualization
Regardless of the storage backend (JSON or SQLite), rendering 15,000 DOM elements (HTML nodes) simultaneously will crash or severely degrade any browser. The Document Object Model (DOM) is heavy; managing 15,000 <div> elements with event listeners consumes hundreds of megabytes of RAM.   

Virtual Scrolling (Windowing): The mandatory solution is Virtualization. Libraries like react-window or react-virtualized render only the items currently visible in the viewport, plus a small buffer (overscan).   

Mechanism: As the user scrolls, the library calculates which items should be visible based on the scroll offset. It recycles the existing DOM nodes, replacing their content (text/images) with the new data.

Result: The browser only ever manages ~20-30 DOM nodes, ensuring 60 FPS scrolling performance regardless of whether the list has 1,000 or 1,000,000 items.   

Implementation Roadmap
The execution of this project follows a linear pipeline, leveraging the strengths of the agentic tools and the architectural decisions outlined above.

Phase 1: Environment & Taxonomy (Hours 1-5)
Setup: Initialize a VS Code workspace. Install Cline. Configure access to OpenAI (for Batch) and Anthropic (for reasoning).

Taxonomy Mining: Instruct Cline to download the Computer Science Ontology (CSO). Write a Python script to traverse the graph from "Artificial Intelligence" and extract all child nodes.

Enrichment: Instruct Cline to query the OpenAlex API for the top 5,000 AI concepts from papers published >2023. Merge and deduplicate using a fuzzy matching script (e.g., Levenshtein distance) to create the master_terms.csv.

Phase 2: Content Generation (Hours 6-30)
Scripting: Have Cline write a script that converts master_terms.csv into a .jsonl batch file. The prompt must request structured JSON: { "term": "...", "definition": "...", "tags": [...] }.

Batch Execution: Upload the file to OpenAI Batch API.

Cost: Estimated at ~$3.00 for 15,000 terms (assuming gpt-4o-mini rates).

Wait: The batch process runs asynchronously (up to 24 hours).

Phase 3: Verification & Assembly (Hours 31-40)
Verification: Upon download, run the RAG "Critic" script (written by Cline) to flag low-confidence definitions.

Refinement: Use Cursor to manually review flagged terms. Use Cursor's "Composer" mode to apply bulk fixes (e.g., "Standardize all 'See Also' links to use exact matching").

Database Build: Compile the final JSON into a SQLite database using a build script. Enable FTS5 (Full Text Search) for performant querying.

Phase 4: Frontend Development (Hours 41-50)
Scaffold: Create a React/Vite application.

Backend Integration: Install @sqlite.org/sqlite-wasm and sql.js-httpvfs. Configure the worker to handle database queries.

UI Construction: Implement react-window for the term list. Bind the scroll event to the SQLite query (e.g., "Fetch rows 100-120").

Deployment: Deploy the static assets (HTML, JS, WASM, .db file) to a CDN or GitHub Pages.

Conclusion
Expanding an AI glossary to 15,000 terms transforms the project from a simple writing assignment into a complex data engineering challenge. The integration of Agentic AI workflows within VS Code—utilizing Cline for autonomous script execution and Cursor for contextual refinement—renders this scale achievable with a fraction of the traditional effort. By leveraging the OpenAI Batch API, the generation costs remain negligible.

Critically, the delivery architecture must reject the naive approach of lazy-loading a massive JSON file. While theoretically possible, it imposes unacceptable performance penalties on the end-user. The superior, professional-grade solution lies in SQLite WASM, which marries the simplicity of static hosting with the performance of a relational database, ensuring that the glossary is not just a list of terms, but a responsive, navigable, and enduring knowledge tool.


thoughtfocusbuild.com
Must-Have AI Glossary: 100+ Terms to Know in 2025 | ThoughtFocus Build
Opens in a new window

en.wikipedia.org
Glossary of artificial intelligence - Wikipedia
Opens in a new window

researchgate.net
(PDF) The Computer Science Ontology: A Comprehensive Automatically-Generated Taxonomy of Research Areas - ResearchGate
Opens in a new window

en.wikipedia.org
Computer Science Ontology - Wikipedia
Opens in a new window

skm.kmi.open.ac.uk
The Computer Science Ontology: A Large-Scale Taxonomy of Research Areas - The Open University
Opens in a new window

cso.kmi.open.ac.uk
Downloads - Computer Science Ontology
Opens in a new window

chemrxiv.org
Librarian of Alexandria: An Extensible LLM-based Chemical Data Extraction Pipeline - ChemRxiv
Opens in a new window

chemrxiv.org
Librarian of Alexandria: An Extensible LLM-based Chemical Data Extraction Pipeline | ChemRxiv
Opens in a new window

openalex.org
OpenAlex: The open catalog to the global research system | OpenAlex
Opens in a new window

arxiv.org
MOLE: Metadata Extraction and Validation in Scientific Papers Using LLMs - arXiv
Opens in a new window

docs.cline.bot
CLI Workflows - Cline Docs
Opens in a new window

designrevision.com
Cline vs Cursor vs GitHub Copilot: Which AI Coding Assistant Wins ...
Opens in a new window

github.com
cline/cline: Autonomous coding agent right in your IDE, capable of creating/editing files, executing commands, using the browser, and more with your permission every step of the way. - GitHub
Opens in a new window

youtube.com
How to use Cursor Composer to create full features in minutes - YouTube
Opens in a new window

reddit.com
My experience with Cursor vs Cline after 3 months of daily use : r/ChatGPTCoding - Reddit
Opens in a new window

marketplace.visualstudio.com
Cline - Visual Studio Marketplace
Opens in a new window

platform.openai.com
Batch API - OpenAI Platform
Opens in a new window

platform.openai.com
Structured model outputs | OpenAI API
Opens in a new window

nvidia.com
What is Retrieval-Augmented Generation (RAG)? | NVIDIA Glossary
Opens in a new window

elastic.co
Developing an agentic RAG assistant using LangChain and Elasticsearch
Opens in a new window

analyticsvidhya.com
Chain of Verification Implementation Using LangChain Expression Language and LLM
Opens in a new window

blog.langchain.com
Evaluating RAG pipelines with Ragas + LangSmith - LangChain Blog
Opens in a new window

docs.ragas.io
LangSmith - Ragas
Opens in a new window

stackoverflow.com
Load huge JSON data in browser - Stack Overflow
Opens in a new window

inventivehq.com
Can You Validate Large JSON Files? Performance Tips and Best Practices - Inventive HQ
Opens in a new window

joshzeigler.com
How Big is TOO BIG for JSON? - Josh Zeigler
Opens in a new window

developer.mozilla.org
Lazy loading - Performance - MDN Web Docs - Mozilla
Opens in a new window

stackoverflow.com
Split a large json file into multiple smaller files - Stack Overflow
Opens in a new window

fluper.com
How Large JSON Files Impact App Performance and How to Fix It - Fluper
Opens in a new window

stackoverflow.com
javascript - JSON performance - multi-file vs long single file - Stack Overflow
Opens in a new window

rxdb.info
LocalStorage vs. IndexedDB vs. Cookies vs. OPFS vs. WASM-SQLite | RxDB - JavaScript Database
Opens in a new window

powersync.com
The Current State Of SQLite Persistence On The Web: November 2025 Update - PowerSync
Opens in a new window

youtube.com
Host your Database for Free on Github Pages - YouTube
Opens in a new window

phiresky.github.io
Hosting SQLite databases on Github Pages - (or IPFS or any static file hoster)
Opens in a new window

stackfull.dev
Implementing virtual scroll for web from scratch, in less than 150 lines of code
Opens in a new window

sergimansilla.com
Virtual list in vanilla JavaScript - Sergi Mansilla
Opens in a new window

github.com
bvaughn/react-virtualized: React components for efficiently rendering large lists and tabular data - GitHub
Opens in a new window

web.dev
Virtualize large lists with react-window | Articles - web.dev
Opens in a new window

medium.com
Virtualization in React: Improving Performance for Large Lists | by Frontend Highlights