'use client';
import { useState } from 'react';
import Link from 'next/link';

interface MagazineVol {
  vol: string;
  title: string;
  pages: number;
  badge: string;
  badgeColor: string;
  summary: string;
  bullets: string[];
  slug: string;
  bgGrad: string;
  isDigital?: boolean;
}

const volumes: MagazineVol[] = [
  {
    vol: 'VOL. 41',
    title: 'Analog Renaissance',
    pages: 184,
    badge: 'IN PRINT (824/1,200)',
    badgeColor: '#1d4ed8',
    summary: 'The counter-revolution of physical archives: tape and non-cooperative telegraph networks, and their resilience.',
    bullets: ['Vacuum-deposited permalloy tape telemetry', 'Closed loop telegraphs and field stations'],
    slug: 'issue-41-analog-renaissance',
    bgGrad: 'linear-gradient(145deg, #e8dfd5 0%, #c9bca9 100%)',
  },
  {
    vol: 'VOL. 40',
    title: 'The Quiet City',
    pages: 176,
    badge: 'IN PRINT (124/800)',
    badgeColor: '#1d4ed8',
    summary: 'Acoustic cartography, sound-baffle architecture, and the spatial tracking of capital in the silent city.',
    bullets: ['Decibel inequality in central London', 'Subway reverberations in Tokyo hubs'],
    slug: 'issue-40-the-quiet-city',
    bgGrad: 'linear-gradient(145deg, #334155 0%, #0f172a 100%)',
  },
  {
    vol: 'VOL. 39',
    title: 'Tides of Trade',
    pages: 208,
    badge: 'DIGITAL EDITION AVAILABLE',
    badgeColor: '#15803d',
    summary: 'Sovereign container logistics, the financialization of deepwater terminals, and ocean freight derivative markets.',
    bullets: ['Chokepoint navigation protocols', 'The rise of transshipment flag states'],
    slug: 'issue-39-tides-of-trade',
    bgGrad: 'linear-gradient(145deg, #1e3a8a 0%, #0c4a6e 100%)',
    isDigital: true,
  },
  {
    vol: 'VOL. 38',
    title: 'The Cartography of Power',
    pages: 192,
    badge: 'IN PRINT (412/1,000)',
    badgeColor: '#1d4ed8',
    summary: 'Archival nautical charts and satellite radar cartography tracking naval chokepoints and maritime territorial zones.',
    bullets: ['18th-century Venetian admiralty routes', 'The weaponization of archipelagic baselines'],
    slug: 'issue-38-the-cartography-of-power',
    bgGrad: 'linear-gradient(145deg, #d6d3d1 0%, #a8a29e 100%)',
  },
  {
    vol: 'VOL. 37',
    title: 'Subterranean Infrastructure',
    pages: 224,
    badge: 'ARCHIVE DIGITAL FACSIMILE',
    badgeColor: '#15803d',
    summary: 'Deep metro excavation tunnels, power conduits, sewage canal architecture, and the underground geology of state capacity.',
    bullets: ['London’s Victorian deep sewer tunnels', 'Subsea electric cables in the Baltic'],
    slug: 'issue-37-subterranean-infrastructure',
    bgGrad: 'linear-gradient(145deg, #fef3c7 0%, #d97706 100%)',
    isDigital: true,
  },
  {
    vol: 'VOL. 36',
    title: 'The Post-Industrial Forest',
    pages: 192,
    badge: 'IN PRINT (92/1,200)',
    badgeColor: '#1d4ed8',
    summary: 'Rewilding the rustbelt: ecology reclaiming blast furnaces, timber syndicates, and timber commodity derivative pricing.',
    bullets: ['Taiga forestry and carbon offsets', 'Silviculture and sovereign timber reserves'],
    slug: 'issue-36-the-post-industrial-forest',
    bgGrad: 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)',
  },
];

const archiveMonographs = [
  { vol: 'M-12 • 2024', title: 'The Sovereign Debt Atlas 1914–2024', desc: 'Comprehensive compilation of sovereign liquidity crises, bilateral swaps, and central bank swap maps.', curator: 'Prof. Alistair Sterling', format: 'Hardbound Cloth and Slipcased', status: 'IN PRINT (128)', isPhysical: true },
  { vol: 'M-11 • 2023', title: 'The Radar Telegraph Expeditions', desc: 'Unredacted field reports from early cross-polar telemetry stations and microwave relay audits.', curator: 'Commodity Affairs Fellow', format: 'Fine Needled Folios in a Boxed Archive', status: 'Digital Facsimile', isPhysical: false },
  { vol: 'M-10 • 2021', title: 'Algorithmic Order: The 1987 Flash Break', desc: 'Second-by-minute forensic reconstruction of the proto-algorithmic breakdown on international bourses.', curator: 'Derivion Quantitative Unit', format: 'Monochrome Paper Folio Slipcase', status: 'Few Available', isPhysical: true },
  { vol: 'M-09 • 2019', title: 'Inaugural Foundation Treatise on Grain Futures', desc: 'The fundamental post-war evolution of agricultural hedging, published by the Derivion Historical Bureau.', curator: 'Jurisprudence Desk / Grain Assembly', format: 'Linenbound Gold Foil Edition', status: 'Out Print (Scanned)', isPhysical: false },
];

export default function MagazinePage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 60px' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <div className="eyebrow-text">
            QUARTERLY PRINT FOLIOS & DIGITAL MONOGRAPHS • EST. 2019
          </div>
          <h1 className="page-title">
            The Complete Magazine Archive
          </h1>
          <p className="page-subtitle" style={{ marginBottom: '20px' }}>
            Explore 184 volumes of curated physical print editions, photography folios, architectural overviews, and digital facsimiles published since the foundation of Derivion Academy.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="button" className="btn-ochre" style={{ padding: '9px 20px' }}>
              Receive Quarterly Print Folio Membership ($280/yr)
            </button>
            <button type="button" className="btn-white" style={{ padding: '9px 20px' }}>
              Order Individual Issues
            </button>
            <span style={{ fontSize: '11px', color: 'var(--ink-muted)', marginLeft: '6px' }}>
              Print distribution active to Europe, North America, and Singapore
            </span>
          </div>
        </div>

        {/* SECTION: CURRENT PHYSICAL RELEASE HERO CARD - Rounded */}
        <div style={{ marginBottom: '52px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              <span className="dot-ochre" /> CURRENT PHYSICAL RELEASE
            </div>
            <div className="section-label-muted">
              ACQUISITIONS DESK • GLOBAL PRIORITY
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-card)',
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '44px',
            alignItems: 'center',
          }}>
            {/* Left: Magazine 3D Cover */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '100%',
                aspectRatio: '3 / 4',
                background: 'linear-gradient(135deg, #f8f6f0 0%, #ebe5d8 100%)',
                border: '1px solid #dcd6c8',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-book)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '14px',
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(255,255,255,0.4) 40%, rgba(0,0,0,0.08) 100%)',
                }} />
                <div>
                  <div style={{ fontSize: '8.5px', letterSpacing: '0.15em', color: 'var(--ochre-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
                    DERIVION ACADEMY
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginTop: '12px' }}>
                    THE RECLAIMED COMMONS
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '80px', height: '1px', background: '#0f172a', margin: '0 auto 12px' }} />
                  <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                    Issue No. 42
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#64748b', fontWeight: 600 }}>
                  <span>VOL. XLII</span>
                  <span>MONOGRAPH EDITION</span>
                </div>
              </div>
            </div>

            {/* Right: Metadata & Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '9.5px', color: 'var(--ochre-dark)', fontWeight: 700, letterSpacing: '0.08em' }}>
                  VOLUME XLII • MONOGRAPH EDITION
                </span>
                <span style={{
                  fontSize: '8.5px',
                  color: '#15803d',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 700,
                }}>
                  AVAILABLE IN PRINT & DIGITAL
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(24px, 2.6vw, 32px)',
                fontWeight: 800,
                color: 'var(--ink-black)',
                marginBottom: '14px',
                lineHeight: 1.2,
              }}>
                Issue No. 42: The Reclaimed Commons
              </h2>

              <p style={{
                fontSize: '13px',
                color: 'var(--ink-secondary)',
                lineHeight: 1.65,
                marginBottom: '20px',
              }}>
                An exhaustive inquiry into physical public sovereign territory, high-frequency spatial arbitrage, municipal air rights, and the reclaiming of collective commons amidst privatized financial hegemony. Features 14 proprietary maps, unredacted 32-page legal dossier, and archival maps from the Venetian Republic.
              </p>

              {/* Contributor Bullets Grid - Rounded */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px',
                fontSize: '11px',
                color: 'var(--ink-secondary)',
              }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--ink-black)' }}>The Spatial Desk:</strong> Dr. Loren Heinrich • Municipal debt analysis
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--ink-black)' }}>Visual Folio:</strong> 24-line essays of abandoned Gelsa data yards
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--ink-black)' }}>Naval Chokepoints:</strong> Mediterranean naval transit corridors
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--ink-black)' }}>Archival Cartography:</strong> 17th-century Cadastral models
                </div>
              </div>

              {/* 3 Pill Stats */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '28px',
                flexWrap: 'wrap',
              }}>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: '10px', color: '#1e40af', fontWeight: 600 }}>
                  <strong>PAGINATION:</strong> 184 Pages
                </div>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: '10px', color: '#1e40af', fontWeight: 600 }}>
                  <strong>PAPER SPECIFICATION:</strong> Mohawk pro 140gsm
                </div>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: '10px', color: '#1e40af', fontWeight: 600 }}>
                  <strong>PRINT RUN NUMBER:</strong> First Edition of 1,200
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/magazine/issue-42-the-reclaimed-commons"
                  className="btn-black"
                  style={{ padding: '10px 22px' }}
                >
                  Acquire Physical 180 CAD ($72)
                </Link>
                <Link
                  href="/magazine/issue-42-the-reclaimed-commons"
                  className="btn-white"
                  style={{ padding: '10px 22px' }}
                >
                  Explore Issue Contents
                </Link>
                <span style={{ fontSize: '10px', color: 'var(--ink-muted)', fontWeight: 600 }}>
                  ISBN: 978-1-95284-442-8
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: RECENT PRINT VOLUMES & QUARTERLY FOLIOS */}
        <div style={{ marginBottom: '52px' }}>
          <div className="section-header-row">
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink-black)' }}>
                Recent Print Volumes & Quarterly Folios
              </h2>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--ink-muted)', fontWeight: 600 }}>
              Sort by: Volume Number ↓
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {volumes.map(vol => (
              <div
                key={vol.vol}
                className="editorial-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Book Mockup Frame */}
                  <div style={{
                    height: '240px',
                    background: vol.bgGrad,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    borderBottom: '1px solid var(--border-light)',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '12px',
                      background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.2) 40%, rgba(0,0,0,0.1) 100%)',
                    }} />
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.95)',
                      letterSpacing: '0.12em',
                      background: 'rgba(0,0,0,0.35)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      display: 'inline-block',
                      width: 'fit-content',
                    }}>
                      {vol.vol}
                    </span>

                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      lineHeight: 1.2,
                    }}>
                      {vol.title}
                    </h3>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{
                        fontSize: '8.5px',
                        fontWeight: 700,
                        color: vol.badgeColor,
                        letterSpacing: '0.04em',
                      }}>
                        • {vol.badge}
                      </span>
                      <span style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>
                        {vol.pages} Pages
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                      {vol.summary}
                    </p>

                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px',
                      fontSize: '11px',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '18px',
                    }}>
                      {vol.bullets.map((b, idx) => (
                        <div key={idx}>• {b}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 20px 20px' }}>
                  <Link
                    href={`/magazine/${vol.slug}`}
                    className={vol.isDigital ? 'btn-white' : 'btn-black'}
                    style={{ width: '100%', justifyContent: 'center', padding: '9px 0' }}
                  >
                    {vol.isDigital ? 'Access Digital Facsimile' : 'Purchase Folio'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: MONOGRAPHS TABLE - Rounded Container */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-header-row">
            <div>
              <div className="section-label-gold">
                SPECIAL ARCHIVAL EDITIONS
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink-black)', marginTop: '2px' }}>
                Monographs, Folios & Limited Series (1940–2024)
              </h2>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
              Download Full Print Archive Catalog (PDF) ↓
            </div>
          </div>

          <div className="monograph-table-wrapper">
            <table className="monograph-table">
              <thead>
                <tr>
                  <th style={{ width: '110px' }}>Vol • Year</th>
                  <th>Title & Monograph Theme</th>
                  <th>Lead Curator & Bureau</th>
                  <th>Binding & Format</th>
                  <th>Print Status</th>
                  <th style={{ textAlign: 'right' }}>Access</th>
                </tr>
              </thead>
              <tbody>
                {archiveMonographs.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-black)' }}>
                      {item.vol}
                    </td>
                    <td>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink-black)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-secondary)', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </td>
                    <td style={{ fontSize: '11px', color: 'var(--ink-secondary)' }}>
                      {item.curator}
                    </td>
                    <td style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                      {item.format}
                    </td>
                    <td>
                      <span style={{
                        fontSize: '9px',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-xs)',
                        background: item.isPhysical ? '#fefce8' : '#eff6ff',
                        color: item.isPhysical ? '#854d0e' : '#1e40af',
                        border: `1px solid ${item.isPhysical ? '#fde047' : '#bfdbfe'}`,
                        fontWeight: 700,
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn-black"
                        style={{ fontSize: '10.5px', padding: '5px 12px' }}
                      >
                        Order Title
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NAVY CTA BANNER */}
        <div className="navy-cta-banner">
          <div>
            <div className="navy-cta-eyebrow">
              LITHOGRAPHY & INSTITUTIONAL CIRCULATION
            </div>
            <h2 className="navy-cta-title">
              Receive every quarterly folio hot from the lithographic press
            </h2>
            <p className="navy-cta-desc">
              Derivion physical print editions are limited to 1,200 copies worldwide, hand-bound in linen and printed on acid-free archival rag paper with metallic spot colors.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-ochre"
              style={{ whiteSpace: 'nowrap', padding: '10px 24px' }}
            >
              Enroll in Print Folio Privileges
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns: 320px 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
