import React, { useEffect, useMemo, useState, useCallback } from "react";
import "./PhotosPage.css";

const SAMPLE_PROJECTS = [
  {
    id: "p1",
    title: "Peace & Justin",
    meta: "Tiegarten, Berlin · 2025",
    tags: ["Personal", "Portrait"],
    images: Array.from({ length: 14 }).map((_, i) => `https://picsum.photos/id/${(i+10)%100}/800/500`)
  },
  {
    id: "p2",
    title: "Ludwig",
    meta: "Personal · 2025",
    tags: ["Portrait"],
    images: Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/id/${(i+60)%100}/800/500`)
  },
  {
    id: "p3",
    title: "Botanical Garden Berlin",
    meta: "Personal · 2025",
    tags: ["Nature", "Personal"],
    images: Array.from({ length: 16 }).map((_, i) => `https://picsum.photos/id/${(i+120)%200}/800/500`)
  }
];

const ALL_TAGS = ["All", ...Array.from(new Set(SAMPLE_PROJECTS.flatMap(p => p.tags)))];

export default function PhotosPage() {
  const [tag, setTag] = useState("All");
  const [lightbox, setLightbox] = useState(null); // { projectId, index }

  const projects = useMemo(() => (
    tag === "All" ? SAMPLE_PROJECTS : SAMPLE_PROJECTS.filter(p => p.tags.includes(tag))
  ), [tag]);

  const openAt = useCallback((projectId, index) => {
    setLightbox({ projectId, index });
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((delta) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const proj = SAMPLE_PROJECTS.find(p => p.id === lb.projectId);
      if (!proj) return null;
      const next = (lb.index + delta + proj.images.length) % proj.images.length;
      return { ...lb, index: next };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, step]);

  const currentImage = useMemo(() => {
    if (!lightbox) return null;
    const proj = SAMPLE_PROJECTS.find(p => p.id === lightbox.projectId);
    return proj ? proj.images[lightbox.index] : null;
  }, [lightbox]);

  return (
    <div className="photos-page">
      <div className="photos-toolbar" role="tablist" aria-label="Filter galleries">
        {ALL_TAGS.map(t => (
          <button key={t} role="tab" aria-selected={tag === t} className={`chip ${tag === t ? 'active' : ''}`} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="projects-list">
        {projects.map((p) => (
          <section className="project-row" key={p.id}>
            <div className="project-meta">
              <div className="project-title">{p.title}</div>
              <div className="project-sub">{p.meta}</div>
            </div>
            <div className="thumbs-row">
              {p.images.map((src, i) => (
                <button className="thumb" key={i} onClick={() => openAt(p.id, i)} aria-label={`Open image ${i+1} in ${p.title}`}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {lightbox && currentImage && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lb-close" aria-label="Close" onClick={close}>×</button>
          <button className="lb-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          <img className="lb-image" src={currentImage} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lb-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
        </div>
      )}
    </div>
  );
}

