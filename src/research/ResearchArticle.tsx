import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { explorations, getExploration } from './explorations';
import './research.css';

function TechnicalFigure({ slug, diagram, caption }: { slug: string; diagram: 'oversight' | 'usefulness' | 'explanation'; caption: string }) {
  const titleId = `diagram-title-${slug}`;
  const descriptionId = `diagram-description-${slug}`;
  const details = {
    oversight: { title: 'Human review in an AI-assisted workflow', description: 'A proposal moves from system preparation to human review, then to an approved or revised action with a recorded outcome.' },
    usefulness: { title: 'A product exploration sequence', description: 'A user task informs a proposed capability, which is examined through evaluation criteria and an explicit decision.' },
    explanation: { title: 'An explainable software action', description: 'A request leads to an action and an activity record that helps a person understand and investigate what happened.' },
  }[diagram];
  const steps = {
    oversight: [
      { label: 'SYSTEM PREPARES', title: 'Proposed action', detail: 'Inputs · uncertainty · impact' },
      { label: 'PERSON REVIEWS', title: 'Approve · edit · stop', detail: 'Context for a decision' },
      { label: 'WORKFLOW CONTINUES', title: 'Action is recorded', detail: 'Outcome · owner · status' },
    ],
    usefulness: [
      { label: 'UNDERSTAND', title: 'User task', detail: 'Goal · context · limits' },
      { label: 'PROPOSE', title: 'Capability', detail: 'AI or alternative' },
      { label: 'EXAMINE', title: 'Evidence plan', detail: 'Baseline · failure cost' },
      { label: 'DECIDE', title: 'Next step', detail: 'Build · revise · stop' },
    ],
    explanation: [
      { label: 'REQUEST', title: 'Intent & scope', detail: 'User · permissions' },
      { label: 'SYSTEM ACTION', title: 'Tool · result · status', detail: 'Success or recoverable error' },
      { label: 'ACTIVITY RECORD', title: 'Useful context', detail: 'Inspect · recover · learn' },
    ],
  }[diagram];

  return <figure className={`research-figure research-figure-${diagram}`}>
    <svg viewBox="0 0 720 300" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
      <title id={titleId}>{details.title}</title>
      <desc id={descriptionId}>{details.description}</desc>
      <defs><marker id={`arrow-${slug}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
      {diagram === 'oversight' && <>
        <path className="figure-connector" markerEnd={`url(#arrow-${slug})`} d="M218 150H275M444 150H501" />
        <path className="figure-feedback" markerEnd={`url(#arrow-${slug})`} d="M580 199v48H145v-48" />
        <g className="figure-node"><rect x="38" y="101" width="180" height="98" rx="4"/><text x="58" y="137" className="figure-label">SYSTEM PREPARES</text><text x="58" y="165" className="figure-title">Proposed action</text><text x="58" y="184" className="figure-detail">Inputs · uncertainty · impact</text></g>
        <g className="figure-node figure-node-accent"><rect x="275" y="101" width="169" height="98" rx="4"/><text x="295" y="137" className="figure-label">PERSON REVIEWS</text><text x="295" y="165" className="figure-title">Approve · edit · stop</text><text x="295" y="184" className="figure-detail">Context for a decision</text></g>
        <g className="figure-node"><rect x="501" y="101" width="181" height="98" rx="4"/><text x="521" y="137" className="figure-label">WORKFLOW CONTINUES</text><text x="521" y="165" className="figure-title">Action is recorded</text><text x="521" y="184" className="figure-detail">Outcome · owner · status</text></g>
        <text className="figure-loop-label" x="300" y="270">REVISE OR HAND BACK WHEN NEEDED</text>
      </>}
      {diagram === 'usefulness' && <>
        <path className="figure-connector" markerEnd={`url(#arrow-${slug})`} d="M177 150H207M348 150H378M519 150H549" />
        <g className="figure-node"><rect x="35" y="103" width="142" height="94" rx="4"/><text x="53" y="138" className="figure-label">UNDERSTAND</text><text x="53" y="166" className="figure-title">User task</text><text x="53" y="184" className="figure-detail">Goal · context · limits</text></g>
        <g className="figure-node"><rect x="207" y="103" width="141" height="94" rx="4"/><text x="225" y="138" className="figure-label">PROPOSE</text><text x="225" y="166" className="figure-title">Capability</text><text x="225" y="184" className="figure-detail">AI or alternative</text></g>
        <g className="figure-node figure-node-accent"><rect x="378" y="103" width="141" height="94" rx="4"/><text x="396" y="138" className="figure-label">EXAMINE</text><text x="396" y="166" className="figure-title">Evidence plan</text><text x="396" y="184" className="figure-detail">Baseline · failure cost</text></g>
        <g className="figure-node"><rect x="549" y="103" width="141" height="94" rx="4"/><text x="567" y="138" className="figure-label">DECIDE</text><text x="567" y="166" className="figure-title">Next step</text><text x="567" y="184" className="figure-detail">Build · revise · stop</text></g>
      </>}
      {diagram === 'explanation' && <>
        <path className="figure-connector" markerEnd={`url(#arrow-${slug})`} d="M190 149H262M454 149H526" />
        <g className="figure-node"><rect x="35" y="98" width="155" height="102" rx="4"/><text x="55" y="135" className="figure-label">REQUEST</text><text x="55" y="164" className="figure-title">Intent & scope</text><text x="55" y="184" className="figure-detail">User · permissions</text></g>
        <g className="figure-node figure-node-accent"><rect x="262" y="98" width="192" height="102" rx="4"/><text x="282" y="135" className="figure-label">SYSTEM ACTION</text><text x="282" y="164" className="figure-title">Tool · result · status</text><text x="282" y="184" className="figure-detail">Success or recoverable error</text></g>
        <g className="figure-node"><rect x="526" y="98" width="158" height="102" rx="4"/><text x="546" y="135" className="figure-label">ACTIVITY RECORD</text><text x="546" y="164" className="figure-title">Useful context</text><text x="546" y="184" className="figure-detail">Inspect · recover · learn</text></g>
      </>}
    </svg>
    <ol className="research-figure-mobile" aria-label={details.title}>
      {steps.map((step, index) => <li key={step.label}>
        <span className="diagram-step-number">0{index + 1}</span>
        <span className="diagram-step-copy"><span>{step.label}</span><b>{step.title}</b><small>{step.detail}</small></span>
      </li>)}
      {diagram === 'oversight' && <p className="diagram-return">Review can send a proposal back for revision or hand it off safely.</p>}
    </ol>
    <figcaption><span>CONCEPTUAL SYSTEM DIAGRAM</span>{caption}</figcaption>
  </figure>;
}

export default function ResearchArticle({ slug }: { slug: string }) {
  const exploration = getExploration(slug);
  if (!exploration) return <section className="research-article-missing container"><h1>Exploration not found.</h1><Link to="/research" className="research-action"><ArrowLeft size={15} /> Back to Research</Link></section>;

  const related = explorations.filter((item) => item.slug !== exploration.slug);

  return <article className="research-article-page container">
    <Link to="/research" className="research-back-link"><ArrowLeft size={15} /> Research & Engineering</Link>
    <header className="research-article-header">
      <div className="research-article-meta"><span>{exploration.category}</span><i /><span>TECHNICAL EXPLORATION</span><span className="research-meta-separator">/</span><span>No publication date</span></div>
      <h1>{exploration.title}</h1>
      <p className="research-article-summary">{exploration.summary}</p>
      <div className="research-article-context"><span>THE QUESTION</span><p>{exploration.focus}</p></div>
      <p className="research-article-authorship">A Sixfolds Lab exploration <span>·</span> Working note, not a validated research finding</p>
    </header>

    <div className="research-article-layout">
      <nav className="research-toc" aria-labelledby="research-toc-heading">
        <h2 id="research-toc-heading">IN THIS EXPLORATION</h2>
        <ol>{exploration.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}<li><a href="#references"><span>↗</span>Selected references</a></li></ol>
        <Link to="/research" className="research-toc-all">All explorations <ArrowRight size={13} /></Link>
      </nav>

      <div className="research-article-content">
        <aside className="research-note" aria-label="Editorial note"><ShieldCheck size={18} /><p><b>Scope of this note</b>This is a design and engineering exploration. It does not report a completed study, a deployed capability or measured product outcomes.</p></aside>
        {exploration.sections.map((section, index) => <section id={section.id} className="research-content-section" key={section.id} aria-labelledby={`${section.id}-heading`}>
          <span className="research-section-index">{String(index + 1).padStart(2, '0')} / {String(exploration.sections.length).padStart(2, '0')}</span>
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {index === 0 && <TechnicalFigure slug={exploration.slug} diagram={exploration.diagram} caption={exploration.diagramCaption} />}
          {section.questions && <ul className="research-question-list">{section.questions.map((question) => <li key={question}>{question}</li>)}</ul>}
        </section>)}

        <section className="research-references" id="references" aria-labelledby="references-heading">
          <div className="research-section-index">FURTHER READING</div>
          <h2 id="references-heading">Selected references</h2>
          <p>External resources that inform the questions in this note. They are background reading, not evidence for a Sixfolds Lab product claim.</p>
          <ol>{exploration.references.map((reference) => <li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer"><span>{reference.title}<small>{reference.publisher}</small></span><ExternalLink size={15} aria-label="Opens in a new tab" /></a></li>)}</ol>
        </section>

        <section className="related-explorations" aria-labelledby="related-heading">
          <div className="related-explorations-heading"><div><span className="research-section-index">CONTINUE EXPLORING</span><h2 id="related-heading">Related questions</h2></div><Link to="/research">View all <ArrowRight size={14} /></Link></div>
          <div className="related-explorations-grid">{related.map((item, index) => <Link to={`/research/${item.slug}`} className="related-exploration-card" key={item.slug}>
            <span className="research-card-meta">0{index + 1} <i /> {item.category}</span>
            <h3>{item.title}</h3><p>{item.summary}</p><span className="related-link">Read exploration <ArrowUpRight size={14} /></span>
          </Link>)}</div>
        </section>
      </div>
    </div>
  </article>;
}
