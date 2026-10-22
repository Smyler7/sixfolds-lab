import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { explorations, filterExplorations, researchTopics, type TopicFilter } from './explorations';
import './research.css';

const allTopics = 'All topics' as const;

export default function ResearchPage() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>(allTopics);
  const [query, setQuery] = useState('');
  const featured = explorations[0];
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredExplorations = filterExplorations(activeTopic, normalizedQuery);

  return <>
    <section className="page-hero container research-hero">
      <div className="eyebrow"><span className="eyebrow-dot" />RESEARCH & ENGINEERING</div>
      <h1>Exploring what’s possible.<br />Engineering what’s useful.</h1>
      <p>A technical notebook for questions in applied AI, product systems and software engineering. These explorations share design questions and working ideas; they are not reports of validated findings.</p>
    </section>

    <section className="research-page container" aria-label="Research explorations">
      <section className="research-feature" aria-labelledby="research-feature-title">
        <div className="research-feature-copy">
          <div className="research-kicker"><span>FEATURED EXPLORATION</span><i />{featured.category}</div>
          <h2 id="research-feature-title">{featured.title}</h2>
          <p>{featured.summary}</p>
          <div className="research-feature-topics" aria-label="Topics">
            {featured.topics.map((topic) => <span key={topic}>{topic}</span>)}
          </div>
          <Link className="research-action" to={`/research/${featured.slug}/`}>Explore the question <ArrowRight size={15} /></Link>
        </div>
        <div className="research-feature-art" aria-hidden="true">
          <div className="feature-grid-lines" />
          <svg viewBox="0 0 420 290" role="presentation">
            <path className="feature-orbit" d="M210 37a108 108 0 1 0 0 216 108 108 0 0 0 0-216Z" />
            <path className="feature-orbit feature-orbit-inner" d="M210 72a73 73 0 1 0 0 146 73 73 0 0 0 0-146Z" />
            <path className="feature-path" d="M90 145h64m112 0h64M210 37v35m0 146v35" />
            <circle className="feature-node" cx="90" cy="145" r="6" />
            <circle className="feature-node" cx="330" cy="145" r="6" />
            <circle className="feature-node" cx="210" cy="37" r="6" />
            <circle className="feature-node" cx="210" cy="253" r="6" />
            <circle className="feature-core" cx="210" cy="145" r="28" />
            <path className="feature-core-mark" d="M200 146h20m-10-10v20" />
          </svg>
          <span className="feature-art-caption">SYSTEMS / PEOPLE / CONTEXT</span>
        </div>
      </section>

      <section className="research-explorer" aria-labelledby="explorations-heading">
        <div className="research-explorer-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />THE NOTEBOOK</div>
            <h2 id="explorations-heading">Explore the questions.</h2>
          </div>
          <p>Early-stage thinking, organized by the work it touches.</p>
        </div>

        <div className="research-controls">
          <div className="research-search-wrap">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="research-search">Search explorations</label>
            <input
              id="research-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, questions and notes"
              autoComplete="off"
            />
            {query && <button className="research-clear-search" type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
          </div>
          <div className="research-filters" role="group" aria-label="Filter explorations by topic">
            {[allTopics, ...researchTopics].map((topic) => <button
              className={`research-filter-button${activeTopic === topic ? ' is-active' : ''}`}
              type="button"
              key={topic}
              aria-pressed={activeTopic === topic}
              onClick={() => setActiveTopic(topic)}
            >{topic}</button>)}
          </div>
        </div>

        <p className="research-result-count" role="status" aria-live="polite">
          {filteredExplorations.length} {filteredExplorations.length === 1 ? 'exploration' : 'explorations'}
          {activeTopic !== allTopics ? ` in ${activeTopic}` : ''}
          {normalizedQuery ? ` matching “${query.trim()}”` : ''}
        </p>

        {filteredExplorations.length > 0 ? <div className="research-list">
          {filteredExplorations.map((exploration, index) => <Link className="research-card" to={`/research/${exploration.slug}/`} key={exploration.slug}>
            <span className="research-card-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="research-card-body">
              <div className="research-card-meta"><span>{exploration.category}</span><i /><span>TECHNICAL EXPLORATION</span></div>
              <h3>{exploration.title}</h3>
              <p>{exploration.summary}</p>
              <div className="research-card-tags">{exploration.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
            </div>
            <ArrowUpRight className="research-card-arrow" size={18} aria-hidden="true" />
          </Link>)}
        </div> : <div className="research-empty">
          <span>NO MATCHES</span>
          <h3>No explorations match those filters.</h3>
          <p>Try another topic or a broader search.</p>
          <button type="button" onClick={() => { setActiveTopic(allTopics); setQuery(''); }}>Clear filters <ArrowRight size={14} /></button>
        </div>}
      </section>

      <aside className="research-integrity" aria-label="About these explorations">
        <span className="research-integrity-mark">S / 6</span>
        <div><b>Ideas in progress. Claims with context.</b><p>These notes present questions and design considerations. They do not claim completed studies, product performance results or validated research findings.</p></div>
      </aside>
    </section>
  </>;
}
