export type ResearchTopic = 'AI Systems' | 'Applied ML' | 'Engineering' | 'Security' | 'Product Research' | 'Experiments';
export type TopicFilter = ResearchTopic | 'All topics';

export type ResearchSection = {
  id: string;
  title: string;
  paragraphs: string[];
  questions?: string[];
};

export type ResearchReference = {
  title: string;
  publisher: string;
  href: string;
};

export type Exploration = {
  slug: string;
  category: string;
  topics: ResearchTopic[];
  title: string;
  summary: string;
  focus: string;
  diagram: 'oversight' | 'usefulness' | 'explanation';
  diagramCaption: string;
  sections: ResearchSection[];
  references: ResearchReference[];
};

export const researchTopics: ResearchTopic[] = [
  'AI Systems',
  'Applied ML',
  'Engineering',
  'Security',
  'Product Research',
  'Experiments',
];

export const explorations: Exploration[] = [
  {
    slug: 'building-with-human-oversight',
    category: 'AI SYSTEMS',
    topics: ['AI Systems', 'Product Research'],
    title: 'Building intelligent workflows with human oversight',
    summary: 'A design note on where approval, visibility and accountability belong in AI-assisted workflows.',
    focus: 'How can a workflow make review meaningful at the moments when automated work affects a person, a decision or an external system?',
    diagram: 'oversight',
    diagramCaption: 'A conceptual review loop: the system prepares an action, a person can inspect it, and the workflow records what happened.',
    sections: [
      {
        id: 'context',
        title: 'Treat oversight as part of the workflow',
        paragraphs: [
          'Human oversight is often described as a final approval step. In a useful product, it is designed into the work: people can see what the system is proposing, understand why it matters, and intervene before an action becomes difficult to reverse.',
          'The appropriate boundary depends on the task, the possible impact and the system’s capabilities. A drafting assistant and a system that changes records or contacts people should not share the same review pattern by default.',
        ],
      },
      {
        id: 'review-boundaries',
        title: 'Make review specific',
        paragraphs: [
          'A review request should give the reviewer enough context to make a decision. That can include the proposed action, the information it used, what remains uncertain and what will happen after approval. A generic “approve” button does not provide those details on its own.',
        ],
        questions: [
          'What changes if the person approves, edits, rejects or waits?',
          'Can the person inspect the relevant inputs and limitations?',
          'Is there a clear way to pause or hand the work back?',
          'Can the team later understand who or what took each step?',
        ],
      },
      {
        id: 'operational-signals',
        title: 'Keep the boundary visible over time',
        paragraphs: [
          'Review design also needs operational signals. Teams may need to understand how often work is escalated, where people override a proposal and whether review queues are slowing down the underlying task. These are questions to instrument and evaluate in context, not evidence that a particular workflow is effective.',
          'This note describes design considerations only. It does not report a user study, deployed system or measured outcome.',
        ],
      },
      {
        id: 'next-steps',
        title: 'What to examine next',
        paragraphs: [
          'A next step is to map one real workflow from request to outcome, identify actions with different levels of impact, and prototype the review information at those boundaries. Any evaluation should involve the people responsible for the work and make its assumptions explicit.',
        ],
      },
    ],
    references: [
      { title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)', publisher: 'National Institute of Standards and Technology', href: 'https://doi.org/10.6028/NIST.AI.100-1' },
      { title: 'Model Cards for Model Reporting', publisher: 'Mitchell et al. · arXiv', href: 'https://arxiv.org/abs/1810.03993' },
    ],
  },
  {
    slug: 'useful-ai-by-design',
    category: 'PRODUCT RESEARCH',
    topics: ['Product Research', 'Applied ML', 'Experiments'],
    title: 'A practical test for useful AI in software products',
    summary: 'Questions for distinguishing a meaningful product capability from an impressive but unnecessary one.',
    focus: 'What would need to be true for an AI capability to make a real task clearer, easier or more reliable?',
    diagram: 'usefulness',
    diagramCaption: 'A product framing aid: connect a real user task to a proposed capability, then define what evidence would change the decision.',
    sections: [
      {
        id: 'context',
        title: 'Start with the task, not the model',
        paragraphs: [
          'A product idea can begin with a capable model and still lack a clear user need. A more useful starting point is the task: what is someone trying to do, where does it become difficult, and what constraints shape a good outcome?',
          'This framing keeps the proposed capability open to comparison. A smaller interface improvement, a clearer process or no AI at all may address the task better than adding generation or automation.',
        ],
      },
      {
        id: 'evaluation',
        title: 'Name the evidence before building',
        paragraphs: [
          'Before selecting a model or interaction, write down what a helpful result would look like and what failure would cost. The measures depend on the task. They might concern completion, correction effort, time, comprehension, consistency or another observable outcome.',
          'A prototype can help reveal missing assumptions, but a prototype is not evidence of sustained value. Evaluation should match the intended context and include cases where the system should decline, ask for clarification or hand control back.',
        ],
        questions: [
          'Who is the intended user, and what decision or task is in scope?',
          'What baseline or alternative will the capability be compared with?',
          'Which errors matter, and how will they be detected?',
          'What result would make the team stop or change direction?',
        ],
      },
      {
        id: 'tradeoffs',
        title: 'Include the cost of interaction',
        paragraphs: [
          'Generated output can move effort rather than remove it. People may need to check, correct or reconcile a result. The product question is therefore not only whether a system can produce an answer, but whether the complete interaction supports the person’s task with acceptable effort and risk.',
        ],
      },
      {
        id: 'next-steps',
        title: 'What to examine next',
        paragraphs: [
          'A practical next step is to describe one user task, prototype the smallest capability that could support it, and agree on evaluation criteria before reviewing results. This is a proposed method for exploration, not a finding from a completed experiment.',
        ],
      },
    ],
    references: [
      { title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)', publisher: 'National Institute of Standards and Technology', href: 'https://doi.org/10.6028/NIST.AI.100-1' },
      { title: 'Model Cards for Model Reporting', publisher: 'Mitchell et al. · arXiv', href: 'https://arxiv.org/abs/1810.03993' },
    ],
  },
  {
    slug: 'software-that-explains-itself',
    category: 'ENGINEERING',
    topics: ['Engineering', 'Security', 'AI Systems'],
    title: 'Software that explains itself',
    summary: 'Why understandable behavior is part of reliability, especially in systems that act on a user’s behalf.',
    focus: 'What should a person or operator be able to understand when software recommends or takes an action?',
    diagram: 'explanation',
    diagramCaption: 'A conceptual trace connects a request to the system’s action, recorded context and a human-readable explanation.',
    sections: [
      {
        id: 'context',
        title: 'Make behavior legible',
        paragraphs: [
          'When software takes a consequential step, users and operators need more than a success state. They may need to know what action occurred, which inputs were considered, what permissions were used and where a person can intervene.',
          'An explanation is not a substitute for correctness or security. It is one part of a system that also needs clear boundaries, appropriate access controls, useful records and a path to recover from mistakes.',
        ],
      },
      {
        id: 'operational-context',
        title: 'Design for the person investigating',
        paragraphs: [
          'A useful activity record should answer the questions that arise during ordinary work and incident review. The right details depend on the system and its data practices; collecting more information is not automatically better.',
        ],
        questions: [
          'What did the system do, and what is its current status?',
          'Which inputs, tools or permissions were relevant?',
          'Can an operator pause, reverse or escalate the action?',
          'Does the record avoid exposing information that is not needed?',
        ],
      },
      {
        id: 'failure-paths',
        title: 'Treat failure paths as product paths',
        paragraphs: [
          'Systems that depend on models, external tools or changing data need visible failure states. A timeout, rejected action or uncertain result should not look like a successful completion. The interface can explain what remains unfinished and what safe next step is available.',
          'These are engineering prompts rather than reported test outcomes. They should be adapted to the product’s threat model, users and operational requirements.',
        ],
      },
      {
        id: 'next-steps',
        title: 'What to examine next',
        paragraphs: [
          'Choose a representative action and trace it through request, execution, record and recovery. Review that trace with the people who would use it during normal operation and during an incident. Document the decisions and gaps before treating the design as complete.',
        ],
      },
    ],
    references: [
      { title: 'OWASP Top 10 for LLM Applications', publisher: 'OWASP GenAI Security Project', href: 'https://genai.owasp.org/llm-top-10/' },
      { title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)', publisher: 'National Institute of Standards and Technology', href: 'https://doi.org/10.6028/NIST.AI.100-1' },
    ],
  },
];

export function getExploration(slug: string | undefined): Exploration | undefined {
  return explorations.find((exploration) => exploration.slug === slug);
}

export function filterExplorations(topic: TopicFilter, query: string): Exploration[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return explorations.filter((exploration) => {
    const matchesTopic = topic === 'All topics' || exploration.topics.includes(topic);
    const searchableText = [exploration.title, exploration.summary, exploration.focus, exploration.category, ...exploration.topics]
      .join(' ')
      .toLocaleLowerCase();
    return matchesTopic && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}
