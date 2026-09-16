// ============================================================
// DERIVION ACADEMY – MOCK DATA LIBRARY
// ============================================================

export type ContentType = 'news' | 'articles' | 'blogs' | 'magazine' | 'special-reports';

export interface Author {
  name: string;
  initials: string;
  role: string;
  bureau?: string;
}

export interface Article {
  id: string;
  slug: string;
  section: ContentType;
  category: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  author: Author;
  date: string;
  readTime?: string;
  tags: string[];
  featured?: boolean;
  imagePrompt?: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  section: 'news';
  category: string;
  title: string;
  excerpt: string;
  body: string;
  author: Author;
  date: string;
  tags: string[];
  dataTag?: string;
  featured?: boolean;
}

export interface BlogColumn {
  id: string;
  slug: string;
  section: 'blogs';
  columnName: string;
  author: Author;
  frequency: string;
  readership: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  tags: string[];
  featured?: boolean;
  dispatches: number;
}

export interface MagazineIssue {
  id: string;
  slug: string;
  section: 'magazine';
  issueNumber: string;
  edition: string;
  title: string;
  subtitle: string;
  coverTheme: string;
  date: string;
  contributors: string[];
  body: string;
  pages: number;
  featured?: boolean;
}

export interface SpecialReport {
  id: string;
  slug: string;
  section: 'special-reports';
  category: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  authors: Author[];
  date: string;
  pages: number;
  format: string;
  accessLevel: 'institutional' | 'open' | 'classified';
  centralBanks?: number;
  transfers?: string;
  featured?: boolean;
  tags?: string[];
}

// ============================================================
// ARTICLES
// ============================================================
export const articles: Article[] = [
  {
    id: 'a1', slug: 'architecture-of-sovereign-indebtedness', section: 'articles',
    category: 'Monetary Philosophy',
    title: 'The Architecture of Sovereign Indebtedness: Bilateral Swap Lines as Monetary Hegemony',
    subtitle: 'Cover Treatise · October 2024',
    excerpt: 'An empirical reconstruction of post-Bretton Woods central bank liquidity plumbing—how bilateral Federal Reserve swap lines and offshore repo facilities forged an invisible, extraterritorial safety net that reorders sovereign fiscal autonomy during global systemic liquidity shocks.',
    body: `## Abstract

The post-2008 global financial architecture rests on an underappreciated infrastructure: bilateral central bank swap lines. These arrangements, predominantly anchored at the Federal Reserve, function not merely as liquidity facilities but as the load-bearing columns of dollar hegemony.

## Theoretical Framework

This treatise develops a three-part analytical framework. First, we reconstruct the genealogy of swap line arrangements from their Bretton Woods origins through the 1960s Roosa Bonds to the 2008 crisis-era institutionalization. Second, we deploy a modified Mundell-Fleming model that treats swap line access as a distinct policy variable—essentially a binary "hegemony access" parameter. Third, we conduct an empirical evaluation across 42 bilateral agreements.

> "The swap line is neither liquor nor aid—it is an architectural expression of the sovereign-monetary canopy over geopolitics." — Prof. Alistair Mering, Dean of Monetary History, Delhi IX Campus

## Bilateral Swap Architecture

The Federal Reserve's swap line network comprises 14 permanent arrangements with major central banks and approximately 28 temporary or conditional agreements activated during stress periods. The geographic asymmetry is striking: OECD-adjacent central banks receive near-unconditional access, while emerging market central banks face performance conditionality that mirrors IMF structural adjustment logic.

## Key Findings

Our empirical analysis reveals three structural findings. First, swap line access reduces sovereign borrowing costs by an average of 47 basis points during global liquidity stress events. Second, the discount window equivalent implied by swap line pricing systematically underprices tail risk for recipient banks. Third, geopolitical alignment with Washington Consensus metrics predicts swap line access better than macroeconomic fundamentals.

## Implications for Monetary Sovereignty

The practical sovereignty implications are profound. Central banks without swap line access face a structural vulnerability: during dollar squeeze events, their domestic financial systems become subject to foreign policy considerations embedded in Federal Reserve decision-making. This represents a de facto extraterritorial extension of U.S. monetary policy.

## Conclusion

Bilateral swap lines constitute the hidden architecture of the post-hegemonic monetary order. Understanding their logic is prerequisite to any serious analysis of sovereign fiscal autonomy in the current era.`,
    author: { name: 'Prof. Alistair Mering', initials: 'AM', role: 'Dean of Monetary History', bureau: 'Delhi IX Campus' },
    date: 'October 2024', readTime: '42 Min Read', tags: ['Sovereign Debt', 'Monetary Policy', 'Federal Reserve'],
    featured: true,
  },
  {
    id: 'a2', slug: 'thermodynamic-imperialism', section: 'articles',
    category: 'Techno-Imperialism',
    title: 'Thermodynamic Imperialism: The Compute-Power Nexus of Modern Statecraft',
    excerpt: 'Investigating how temperature-scale data centers and nuclear baseload containment have replaced deployment terminal metrics as the primary determinant of national strategic endeavor.',
    body: `## The Compute-Power Nexus

Modern statecraft increasingly hinges on an underappreciated variable: raw computational capacity and the thermal infrastructure required to sustain it.

## Nuclear Baseload as Strategic Resource

The correlation between nuclear baseload availability and AI frontier model development is not coincidental. Nations with secure, low-carbon baseload energy possess a structural advantage in the compute race that transcends traditional economic metrics.

## Policy Implications

This analysis traces the emergence of compute infrastructure as a geopolitical asset class, examining how bilateral agreements increasingly embed data center co-location arrangements as sovereign diplomatic instruments.`,
    author: { name: 'Dr. Sarah Jenkins', initials: 'SJ', role: 'Applied Thermodynamics Fellow' },
    date: '3 days ago', readTime: '34 Min Read', tags: ['AI', 'Energy', 'Statecraft'],
  },
  {
    id: 'a3', slug: '1931-creditanstalt-collapse', section: 'articles',
    category: 'Historical Economics',
    title: 'The 1931 Creditanstalt Collapse and the Anatomy of Pan-European Contagion',
    excerpt: 'A minutely-titrate archival reconstruction of Austria\'s banking collapse, Central European short-term debt contractions, and gamma imbalances across the interwar Gold Standard.',
    body: `## The Creditanstalt Crisis

The collapse of Creditanstalt in May 1931 represents the most complete historical laboratory for understanding financial contagion mechanics across economically integrated but politically fragmented currency zones.

## Archival Reconstruction

Drawing on newly digitized Reichsbank archives and BIS correspondence records, this treatise reconstructs the precise transmission mechanism through which Austrian banking distress propagated into German, Hungarian, and Romanian financial systems within 73 days.

## Modern Parallels

The Creditanstalt episode contains lessons directly applicable to contemporary eurozone architecture, particularly regarding the absence of a supranational lender of last resort.`,
    author: { name: 'Julian Vance', initials: 'JV', role: 'Editorial Board Co-Author' },
    date: '5 days ago', readTime: '34 Min Read', tags: ['Financial History', 'Europe', 'Banking Crisis'],
  },
  {
    id: 'a4', slug: 'extraterritorial-jurisdiction-subsea', section: 'articles',
    category: 'Legal Architecture',
    title: 'Extraterritorial Jurisdiction in Subsea Telecom Cable Concessions',
    excerpt: 'Analyzing knowledge-routing rights, international seabed treaty grey zones, and the weaponization of cable maintenance permits as commercial sovereignty instruments.',
    body: `## Subsea Cable Architecture as Legal Terrain

The 1.3 million kilometers of subsea fiber-optic cable that carry 99% of intercontinental internet traffic represent an undertheorized domain of international jurisdiction.

## Concession Architectures

Cable landing station concessions, maintenance rights agreements, and repair vessel operating licenses have emerged as novel vectors for extraterritorial legal assertion by major powers.

## The Sovereignty Paradox

Nations with limited coastline paradoxically wield significant influence over subsea cable routing through their control of strategic choke-point maritime zones, creating jurisdictional anomalies that existing UNCLOS frameworks fail to resolve.`,
    author: { name: 'Elena Rastova, LL.M.', initials: 'ER', role: 'Legal Architecture Fellow' },
    date: '1 week ago', readTime: '34 Min Read', tags: ['Maritime Law', 'Telecom', 'Sovereignty'],
  },
  {
    id: 'a5', slug: 'order-frequency-information-dissipation', section: 'articles',
    category: 'Quantitative Algorithms',
    title: 'Order Frequency Entropies: High-Frequency Information Dissipation at the Limit',
    excerpt: 'Applying non-equilibrium thermodynamics to microstructure and limit order books to model financial power-transition as equity magnification during tail events.',
    body: `## Thermodynamic Microstructure Theory

This paper introduces a thermodynamic framework for analyzing limit order book dynamics, treating order flow as a dissipative system governed by entropy production principles.

## The Dissipation Model

We derive closed-form expressions for information entropy production rates in continuous double-auction markets, demonstrating that HFT strategies systematically exploit entropy gradients created by institutional order fragmentation.

## Empirical Validation

Backtesting across 14 years of NYSE TAQ data confirms that entropy production rate anomalies predict short-term price impact with 23% greater accuracy than traditional order imbalance measures.`,
    author: { name: 'Marcus Pauli', initials: 'MP', role: 'Alpha Research Fellow' },
    date: '2 weeks ago', readTime: '34 Min Read', tags: ['HFT', 'Microstructure', 'Quantitative'],
  },
  {
    id: 'a6', slug: 'geopolitical-metallurgy-neodymium', section: 'articles',
    category: 'Physical & Military',
    title: 'The Geopolitical Metallurgy of High-Purity Neodymium and Dysprosium',
    excerpt: 'Both rare-earth isolation challenges, environmental disruption in Inner Mongolia, and the fragility of magnet manufacturing supply chains.',
    body: `## Rare Earth Concentration Risk

Chinese dominance in rare earth processing—particularly for the high-purity neodymium-dysprosium alloys essential for permanent magnets—represents a structural vulnerability in Western defense and clean energy supply chains.

## Processing Bottlenecks

The chemical separation of heavy rare earths involves multi-stage solvent extraction processes that produce significant radioactive waste byproducts, creating environmental and regulatory barriers that structurally favor existing Chinese processing facilities.

## Strategic Stockpiling Analysis

We model optimal strategic reserve levels for allied nations, accounting for processing time lags, demand uncertainty from EV adoption rates, and geopolitical disruption probabilities.`,
    author: { name: 'Claire Ferrand', initials: 'CF', role: 'Materials Research Desk' },
    date: '3 weeks ago', readTime: '34 Min Read', tags: ['Rare Earth', 'Supply Chain', 'Defense'],
  },
];

// ============================================================
// NEWS
// ============================================================
export const newsItems: NewsItem[] = [
  {
    id: 'n1', slug: 'hrma-non-core-singular-sovereign-density', section: 'news',
    category: 'Finance & Banking',
    title: 'HRMA Non-Core Singular Sovereign Density Yields Confront Thermodynamic Calibration',
    excerpt: 'Anchoring qualitative estimation drivers for the top-tier premium composite of sovereign relative performance into terminal capital settlement—assessing market density behavior.',
    body: `### Analysis

This dispatch examines emerging non-core sovereign debt metrics that are reshaping how institutional investors measure density-adjusted yield spreads across sovereign curve benchmarks.

The HRMA (High-Residual Monetary Adjustment) framework applies thermodynamic calibration principles to sovereign bond markets, treating yield spread compression as an entropy-dissipating process.

Key findings indicate that G7 sovereign density metrics have reached critical concentration levels not seen since the 2011 eurozone crisis, suggesting elevated contagion risk.

### Market Implications

Fixed income desks at major institutions are increasingly incorporating HRMA metrics into risk models, with several central banks now including density measures in their financial stability reports.`,
    author: { name: 'Dr. Yamini Sarghara', initials: 'YS', role: 'Sovereign Desk', bureau: 'Mumbai Desk' },
    date: 'Today', tags: ['Sovereign', 'Fixed Income', 'Risk'], dataTag: '$0.85B Issuance', featured: true,
  },
  {
    id: 'n2', slug: 'thomas-cook-term-premium-divergence', section: 'news',
    category: 'Monetary Policy',
    title: 'The Thomas Cook Term Premium Divergence: Schemer Balance Sheet Quantitative Tightening',
    excerpt: 'Simulating multiplying OIS sovereign debt issuance, shadow liquidity dynamics, cross-currency basis swaps, and European debt divergence.',
    body: `### Quantitative Tightening Dynamics

Central bank balance sheet reduction programs are creating asymmetric term premium expansion across sovereign yield curves, with European sovereigns exhibiting differential sensitivity.

The Thomas Cook divergence refers to the systematic gap between stated QT objectives and realized balance sheet trajectories—a phenomenon first documented during the 2022-2024 Fed tightening cycle.

### Cross-Currency Implications

EUR/USD cross-currency basis swaps are widening in response to differential QT pacing between the ECB and Fed, creating exploitable arbitrage windows for well-capitalized institutions.`,
    author: { name: 'Elena Pollare', initials: 'EP', role: 'Monetary Policy Desk' },
    date: '2 days ago', tags: ['QT', 'Term Premium', 'ECB'], dataTag: '2.3% Spread', featured: true,
  },
  {
    id: 'n3', slug: 'suez-transit-re-routing', section: 'news',
    category: 'Logistics & Trade',
    title: 'Suez Transit Re-routing: Baltic Carrier Arbitrage in Cape of Good Hope Freight Logistics',
    excerpt: 'Assessing shipping logistics, freight index volatility, and rerouting arbitrage from Red Sea conflict disruption patterns.',
    body: `### Red Sea Disruption Analysis

Ongoing Houthi targeting of commercial vessels in the Red Sea has compelled significant rerouting through the Cape of Good Hope, adding 10-14 days to Asia-Europe transit times.

Baltic Dry Index components have diverged sharply, with cape-size bulk carriers outperforming Panamax vessels as rerouting economics favor larger vessels on extended routes.

### Arbitrage Windows

Sophisticated freight traders are exploiting temporary dislocations between spot charter rates and forward freight agreement pricing, with cape-route premiums creating systematic opportunities for arbitrageurs with sufficient capital.`,
    author: { name: 'Aris Moros', initials: 'AM', role: 'Maritime Security Analyst', bureau: 'Piraeus' },
    date: '3 days ago', tags: ['Shipping', 'Logistics', 'Red Sea'], dataTag: '+14.2% Rates', featured: true,
  },
  {
    id: 'n4', slug: 'global-copper-investments-hl-mc-cows', section: 'news',
    category: 'Commodities',
    title: 'Global Copper Investments at HL MC-Cows Drives Lows Across LME Cornfield Vaults',
    excerpt: 'At HBC/marginal capital: the precise arbitrage has LME copper in consolidation at $8.9k/t.',
    body: `### Copper Market Dynamics

LME copper inventories have reached multi-year lows as aggressive drawdowns by Chinese smelters coincide with supply disruptions at major South American mines.

The HL (Hypothetical Limit) MC-Cows framework models commodity price dynamics under scenarios of simultaneous supply constraint and demand surge.

### Price Target Analysis

Our quantitative model projects copper reaching $11,200/t within 18 months if current inventory depletion trajectories continue, driven primarily by EV demand acceleration and grid infrastructure investment.`,
    author: { name: 'Tang M. Chow', initials: 'TC', role: 'Commodities Desk', bureau: 'Singapore Desk' },
    date: '4 days ago', tags: ['Copper', 'LME', 'Commodities'], dataTag: '$8,940/t LME',
  },
  {
    id: 'n5', slug: 'bank-argan-yield-curve-control', section: 'news',
    category: 'Monetary Policy',
    title: 'Bank of Argan Yield Curve Control Threatens to Erode Theta-to-Carry Trade Dynamics',
    excerpt: 'Theoretical examination of how a central bank YCC regime creates derivative market anomalies in domestic bond options volatility.',
    body: `### YCC Architecture Analysis

Yield Curve Control implementation creates systematic distortions in the volatility surface of government bond options, as the policy ceiling eliminates the upper tail of yield distributions.

Theta-carry strategies—which profit from time decay in volatility-rich environments—face structural headwinds when YCC suppresses realized volatility while maintaining elevated implied volatility.

### Trading Implications

Optimal positioning in YCC environments requires distinguishing between "soft" YCC (publicly announced caps with unlimited defense) and "hard" YCC (mathematically enforced through futures markets), as each creates distinct arbitrage dynamics.`,
    author: { name: 'Dr. Fumiko Arima', initials: 'FA', role: 'Fixed Income Derivatives Desk' },
    date: '5 days ago', tags: ['YCC', 'Fixed Income', 'Japan'], dataTag: '0.5% Cap',
  },
  {
    id: 'n6', slug: 'nvidia-gpu-cluster-general-purpose', section: 'news',
    category: 'Technology',
    title: 'Custom NVIDIA Cluster Purposes: General Purpose GPU Cluster Margins',
    excerpt: 'GPU cluster economics for frontier AI training workloads, examining cost-per-FLOP trajectories and the emergence of specialized inference ASICs.',
    body: `### GPU Economics Analysis

NVIDIA's H100/H200 GPU monopoly in AI training workloads is creating significant compute rent extraction—the difference between marginal production cost and market pricing represents extraordinary economic surplus.

Our analysis of GPU cluster operational economics reveals that energy costs now represent 40-60% of total inference cost at scale, creating structural incentives for geographic arbitrage of AI compute workloads.

### Market Structure Evolution

The emergence of specialized inference ASICs from Cerebras, Groq, and domestic Chinese alternatives is beginning to erode NVIDIA's pricing power in specific workload categories, with implications for the broader AI infrastructure investment thesis.`,
    author: { name: 'Kris Fenton', initials: 'KF', role: 'Technology Desk', bureau: 'London Desk' },
    date: '1 week ago', tags: ['AI', 'NVIDIA', 'Technology'], dataTag: '+34% GPU Margins',
  },
  {
    id: 'n7', slug: 'offshore-high-voltage-direct-current', section: 'news',
    category: 'Energy & Infrastructure',
    title: 'Offshore High-Voltage Direct Current (HVDC) Grid Backings Supplement in 2031',
    excerpt: 'Grid-scale interconnections between offshore wind generation clusters and continental distribution networks require HVDC backbones exceeding current engineering capabilities.',
    body: `### HVDC Infrastructure Requirements

The 2031 offshore wind expansion targets set by the EU Fit for 55 framework require HVDC cable deployments exceeding 22,000 km of subsea cable—a scale that stretches existing manufacturing and installation capacity.

Siemens Energy and ABB are the primary technology incumbents, but Chinese cable manufacturers have entered the market with cost advantages of 30-40% on non-sensitive routes.

### Investment Analysis

Infrastructure funds are increasingly allocating to HVDC project equity, attracted by regulated returns and long-duration cash flow profiles that match liability structures of pension funds.`,
    author: { name: 'Lars Wittenberg', initials: 'LW', role: 'Energy Infrastructure Desk' },
    date: '10 days ago', tags: ['Energy', 'HVDC', 'Infrastructure'],
  },
  {
    id: 'n8', slug: 'rules-of-origin-enforcement-tightening', section: 'news',
    category: 'Trade & Policy',
    title: 'Rules of Origin Enforcement Tightening Threaten to Erode Manufacturing Corridors',
    excerpt: 'New EU rules of origin enforcement for EV battery components are disrupting established manufacturing corridor economics in Central and Eastern Europe.',
    body: `### Rules of Origin Architecture

EU Trade Commissioner enforcement of battery component sourcing requirements under the EU-Korea and EU-Japan FTAs is creating supply chain disruption for automotive manufacturers using Asian battery cell inputs.

The 45% domestic content requirement for duty-free treatment is creating pressures that are accelerating nearshoring decisions, with implications for Central European manufacturing value chains.

### Trade Flow Implications

We model the redistribution of approximately $34B in annual trade flows if current enforcement trajectories continue, with beneficiaries including Moroccan and Turkish manufacturing zones that qualify under different FTA provisions.`,
    author: { name: 'Carla Mendez', initials: 'CM', role: 'Trade Policy Desk', bureau: 'Brussels Desk' },
    date: '2 weeks ago', tags: ['Trade', 'EU', 'Manufacturing'],
  },
  {
    id: 'n9', slug: 'emerging-market-hard-currency', section: 'news',
    category: 'Emerging Markets',
    title: 'Emerging Market Hard-Currency Recalibrating and Index Conditions into Q1 2025',
    excerpt: 'JP Morgan EMBI Global Diversified rebalancing creates forced selling dynamics in frontier market sovereign bonds, creating temporary dislocations for active managers.',
    body: `### EM Index Rebalancing Mechanics

The quarterly rebalancing of major EM bond indices creates systematic and predictable flow dynamics that sophisticated investors can exploit through pre-positioning and post-event momentum strategies.

Current rebalancing signals suggest net outflows from Sub-Saharan African sovereign bonds and inflows to Southeast Asian quasi-sovereigns, with implied spread movements of 40-90 basis points.

### Currency Risk Assessment

USD strength headwinds for EM hard currency debt are partially offset by improving current account positions in commodity-exporting EM economies, creating a nuanced risk-reward framework for active allocation.`,
    author: { name: 'Priya Nair', initials: 'PN', role: 'EM Desk', bureau: 'Mumbai Desk' },
    date: '2 weeks ago', tags: ['EM', 'Fixed Income', 'Index Flows'],
  },
];

// ============================================================
// BLOGS
// ============================================================
export const blogs: BlogColumn[] = [
  {
    id: 'b1', slug: 'silicon-foundry-ledger-latest', section: 'blogs',
    columnName: 'The Silicon Foundry Ledger',
    author: { name: 'Dr. Vikram Singhania', initials: 'VS', role: 'Chair, Computational Materials Desk' },
    frequency: 'Weekly', readership: '34.2K Readers', dispatches: 38,
    title: 'Extreme Ultraviolet Lithography Bottlenecks and State-Backed Foundry Capital Expenditure',
    excerpt: 'Unpacking extreme ultraviolet lithography bottlenecks, wafer-scale thermodynamic dissipation, and state-backed foundry capital expenditure.',
    body: `## EUV Lithography at Scale

The global expansion of advanced semiconductor manufacturing capacity faces a fundamental physical constraint: ASML's monopoly on extreme ultraviolet lithography systems capable of sub-5nm node production.

## Capital Expenditure Dynamics

State-backed foundry programs—TSMC Arizona, Intel Foundry Services, Samsung Texas—are deploying capital at rates that exceed historical semiconductor industry precedents. Our analysis of equipment delivery schedules suggests meaningful production at 3nm and below won't reach meaningful scale before Q3 2026.

## Thermodynamic Constraints

At 3nm and below, heat dissipation per unit area approaches the physical limits of silicon substrate cooling. This creates a ceiling on clock speed advancement that cannot be overcome through process node shrinkage alone, accelerating the architectural innovation imperative.`,
    date: 'Yesterday', tags: ['Semiconductors', 'EUV', 'Foundry'], featured: true,
  },
  {
    id: 'b2', slug: 'yield-arbitrage-journal-latest', section: 'blogs',
    columnName: 'The Yield Arbitrage Journal',
    author: { name: 'Elena Weber', initials: 'EW', role: 'Senior Fellow, Sovereign Debt & Yields' },
    frequency: 'Twice Monthly', readership: '21.8K Readers', dispatches: 32,
    title: 'OIS Sovereign Debt Issuance Anomalies and the Cross-Currency Basis Swap Opportunity Set',
    excerpt: 'Weekly dissections of OIS sovereign debt issuance, shadow liquidity dynamics, cross-currency basis swaps, and European debt divergence.',
    body: `## Cross-Currency Basis Dynamics

The EUR/USD cross-currency basis swap market continues to exhibit structural dislocations driven by the divergence in Federal Reserve and ECB policy trajectories.

## Arbitrage Framework

Our yield arbitrage framework identifies opportunities arising from the gap between OIS-implied rate paths and realized term premium evolution. The current configuration favors duration-neutral basis trades with EUR-denominated sovereign collateral.

## European Debt Architecture

Fragmentation risks within European sovereign debt markets remain elevated despite ECB TPI backstop, creating yield pickup opportunities for investors willing to hold politically-subordinated sovereign risk.`,
    date: '3 days ago', tags: ['Yield', 'Arbitrage', 'Europe'], featured: true,
  },
  {
    id: 'b3', slug: 'chokepoint-chronology-latest', section: 'blogs',
    columnName: 'Chokepoint Chronology',
    author: { name: 'Aris Moros', initials: 'AM', role: 'Maritime Security Analyst, Piraeus' },
    frequency: 'Weekly', readership: '5.4K Readers', dispatches: 24,
    title: 'Bulk Carrier Transit Arbitrage in the Bab-el-Mandeb: Vessel Telemetry and Tanker Risk Models',
    excerpt: 'Geopolitical logistics, bulk carrier transit arbitrage in the Bab-el-Mandeb, vessel telemetry data, and global bunker fuel optimization.',
    body: `## Maritime Chokepoint Analysis

The Bab-el-Mandeb Strait remains the most consequential maritime chokepoint for global energy trade, with Red Sea disruptions creating significant transit arbitrage opportunities.

## Telemetry Analysis

Leveraging AIS vessel tracking data across 4,200 commercial vessels, we identify systematic patterns in routing decisions that reveal sophisticated carrier arbitrage strategies employed by major bulk shipping operators.

## Risk Pricing Models

Our proprietary tanker risk model incorporates weather patterns, geopolitical event probabilities, and port congestion metrics to generate forward freight rate estimates with demonstrably superior accuracy versus market consensus.`,
    date: 'Oct 28', tags: ['Maritime', 'Logistics', 'Geopolitics'], featured: true,
  },
  {
    id: 'b4', slug: 'marginal-liquidity-notes-latest', section: 'blogs',
    columnName: 'Marginal Liquidity Notes',
    author: { name: 'Dr. Julian Vance', initials: 'JV', role: 'Tokyo Desk' },
    frequency: 'Weekly', readership: '12.1K Readers', dispatches: 38,
    title: 'Overnight Repo Mechanics, Bank of Japan Balance Sheet Shifts, and Cross-Border Carry Trades',
    excerpt: 'Investigating overnight repo mechanics, Bank of Japan balance sheet shifts, and the economics of cross-border carry trades.',
    body: `## BOJ Balance Sheet Dynamics

The Bank of Japan's gradual exit from yield curve control is creating structural shifts in the yen carry trade ecosystem that have global implications for risk asset pricing.

## Repo Market Mechanics

Overnight repo markets in Tokyo are exhibiting unusual collateral scarcity premiums as BOJ bond purchases have removed significant duration supply from the Japanese government bond market.

## Carry Trade Architecture

The unwinding of yen carry positions—estimated at $4-6 trillion in notional exposure—represents a systemic risk that could materialize rapidly during periods of global risk aversion.`,
    date: '4 days ago', tags: ['BOJ', 'Carry Trade', 'Liquidity'],
  },
  {
    id: 'b5', slug: 'vol-surface-decomposition-latest', section: 'blogs',
    columnName: 'Vol Surface Decomposition',
    author: { name: 'Marcus Finch', initials: 'MF', role: 'Chicago Bureau' },
    frequency: 'Twice Monthly', readership: '18.3K Readers', dispatches: 32,
    title: 'VIX Term Structure Anomalies and the Roll Yield Opportunity in Short-Vol Strategies',
    excerpt: 'Systematic options dispersion models, VIX term-structure anomalies, and the assiduous screening of cross-sectional ETF complexes.',
    body: `## VIX Term Structure Analysis

The current VIX term structure exhibits backwardation in near-dated contracts while displaying contango in longer-dated maturities—an unusual configuration that creates specific arbitrage opportunities for volatility traders.

## Dispersion Trading Framework

Options dispersion strategies—selling index volatility while buying single-stock volatility—offer attractive risk-adjusted returns when correlation levels are elevated relative to historical distributions.

## ETF Volatility Screening

Cross-sectional screening of ETF implied volatility reveals systematic mispricing in sector ETFs with concentrated holdings, creating opportunities for options market-makers and volatility arbitrageurs.`,
    date: 'Oct 27', tags: ['Volatility', 'Options', 'VIX'],
  },
  {
    id: 'b6', slug: 'energy-fuel-factor-latest', section: 'blogs',
    columnName: 'The Fuel Factor',
    author: { name: 'Claire Fontaine', initials: 'CF', role: 'Paris Energy Bureau' },
    frequency: 'Weekly', readership: '9.7K Readers', dispatches: 24,
    title: 'Maximum Supply Curves, Uranium Trioxide Arbitrage, and European Electricity Interconnection Economics',
    excerpt: 'Geopolitical logistics, bulk carrier transit arbitrage, European electricity interconnection economics, and carbon market dynamics.',
    body: `## European Energy Architecture

The European electricity grid is undergoing its most significant structural transformation since the post-war reconstruction period, driven by simultaneous renewable integration and nuclear fleet renewal decisions.

## Uranium Market Dynamics

Uranium trioxide spot prices have reached decade highs as utility procurement officers accelerate long-term contracting in response to Russian supply security concerns. Our supply curve analysis suggests the market remains in structural deficit through 2028.

## Interconnection Economics

Cross-border electricity interconnector investments are generating supernormal returns due to systematic price differentials between national electricity markets, creating opportunities for merchant energy traders with cross-border access.`,
    date: 'Oct 26', tags: ['Energy', 'Nuclear', 'Electricity'],
  },
];

// ============================================================
// MAGAZINE
// ============================================================
export const magazineIssues: MagazineIssue[] = [
  {
    id: 'm1', slug: 'issue-42-the-reclaimed-commons', section: 'magazine',
    issueNumber: 'No. 42', edition: 'Current Edition',
    title: 'The Reclaimed Commons',
    subtitle: 'On the restitution of planetary goods, institutional commons, and the economics of shared sovereignty in an era of fragmentation.',
    coverTheme: 'A detailed architectural rendering of the Parthenon with modern institutional overlays—sovereignty reclaimed.',
    date: 'Q4 2024',
    contributors: ['Prof. Alistair Mering', 'Elena Weber', 'Dr. Julian Vance', 'Dr. Sarah Jenkins', 'Claire Fontaine'],
    body: `## Editor's Introduction

Issue 42 of The Derivion Academy Magazine confronts one of the defining tensions of our era: the collision between the logic of market enclosure and the enduring human impulse toward commons governance.

## Lead Essay: The Architecture of Global Commons

What does it mean to "reclaim" a commons that was never fully public? This issue's lead essay argues that planetary commons—from atmospheric carbon sinks to deep-sea polymetallic nodule fields—exist in a legal grey zone that serves extractive interests by design.

## Feature: Digital Commons and the Data Sovereignty Agenda

The emerging "data commons" movement seeks to establish collective governance frameworks for the aggregate behavioral datasets that currently constitute the primary raw material of AI training. We examine three governance models: the Federated Data Trust, the National Data Dividend, and the Decentralized Autonomous Commons.

## Book Review Roundtable

Our fellows review six recent monographs on commons theory, property rights philosophy, and the political economy of shared governance.`,
    pages: 124, featured: true,
  },
  {
    id: 'm2', slug: 'issue-41-analog-renaissance', section: 'magazine',
    issueNumber: 'No. 41', edition: 'Previous Edition',
    title: 'Analog Renaissance',
    subtitle: 'Physical infrastructure, industrial policy, and the return of material statecraft.',
    coverTheme: 'Industrial machinery in warm sepia tones—the material economy reborn.',
    date: 'Q3 2024',
    contributors: ['Marcus Finch', 'Claire Fontaine', 'Lars Wittenberg'],
    body: `## The Return of Industrial Policy

After four decades of post-industrial consensus, advanced economies are rediscovering the strategic logic of manufacturing capacity as a sovereign asset.

## Semiconductor Reshoring

The CHIPS Act, EU Chips Act, and analogous programs in Japan, Korea, and India represent the largest coordinated industrial policy intervention since the Marshall Plan. We analyze implementation trajectories and expected outcomes.

## Material Economy Revival

Physical infrastructure—ports, rails, transmission lines, pipelines—is reclaiming its position in strategic planning frameworks after decades of neglect in favor of "weightless" digital economy investment.`,
    pages: 118,
  },
  {
    id: 'm3', slug: 'issue-40-the-quiet-city', section: 'magazine',
    issueNumber: 'No. 40', edition: 'Archive',
    title: 'The Quiet City',
    subtitle: 'Urban financial geography, property market architecture, and the political economy of housing.',
    coverTheme: 'Misty urban skyline in blue-grey—the financial city at rest.',
    date: 'Q2 2024',
    contributors: ['Elena Weber', 'Dr. Julian Vance'],
    body: `## Urban Financial Geography

The financialization of residential real estate represents one of the most consequential structural transformations in modern political economy, yet remains poorly understood in its systemic dimensions.

## Property Market Architecture

Institutional landlordism, REIT structures, and algorithmic rent-setting algorithms have created new forms of market power in housing markets that existing regulatory frameworks were not designed to address.

## Policy Responses

We review reform proposals across twelve jurisdictions, assessing their theoretical coherence and practical implementation prospects.`,
    pages: 110,
  },
  {
    id: 'm4', slug: 'issue-39-tides-of-trade', section: 'magazine',
    issueNumber: 'No. 39', edition: 'Archive',
    title: 'Tides of Trade',
    subtitle: 'Maritime commerce, freight economics, and the political geography of global exchange.',
    coverTheme: 'Container ships at sunset—the machinery of global commerce.',
    date: 'Q1 2024',
    contributors: ['Aris Moros', 'Carla Mendez'],
    body: `## The Political Geography of Trade Routes

Tides of Trade examines how geopolitical pressures are reshaping the physical pathways of global commerce, with implications for freight economics, port infrastructure investment, and trade finance.

## Freight Market Deep Dive

Our quantitative analysis of Baltic Exchange data reveals systematic patterns in freight market cycles that offer predictive value for cross-modal logistics investment decisions.

## Trade Finance Architecture

The evolution of trade finance from bilateral letter-of-credit arrangements toward sophisticated structured products has created new opportunities and risks for commodity trading firms and their banking counterparties.`,
    pages: 116,
  },
  {
    id: 'm5', slug: 'issue-38-cartography-of-power', section: 'magazine',
    issueNumber: 'No. 38', edition: 'Archive',
    title: 'The Cartography of Power',
    subtitle: 'Geopolitical mapping, sphere-of-influence economics, and the spatial logic of great power competition.',
    coverTheme: 'Antique world map overlaid with modern influence projections.',
    date: 'Q4 2023',
    contributors: ['Prof. Alistair Mering', 'Dr. Sarah Jenkins', 'Tang M. Chow'],
    body: `## Spatial Logic of Great Power Competition

Contemporary great power competition has a fundamentally geographic character that IR theory has under-theorized. This issue deploys cartographic analysis to examine how physical geography constrains and enables strategic options.

## Economic Geography

The spatial distribution of critical mineral deposits, submarine cable landing points, and deep-water naval anchorages creates a material basis for geopolitical competition that purely interest-based IR frameworks cannot fully explain.`,
    pages: 122,
  },
  {
    id: 'm6', slug: 'issue-37-zero-infrastructure', section: 'magazine',
    issueNumber: 'No. 37', edition: 'Archive',
    title: 'Zero Infrastructure',
    subtitle: 'The political economy of infrastructure deficit in advanced economies.',
    coverTheme: 'Abstract urban decay photography—infrastructure deferred.',
    date: 'Q3 2023',
    contributors: ['Lars Wittenberg', 'Marcus Finch'],
    body: `## Infrastructure Deficit Analysis

Advanced economies have accumulated decades of deferred infrastructure maintenance and underinvestment. This issue quantifies the deficit and analyzes its distributional and macroeconomic consequences.

## Political Economy of Infrastructure

Infrastructure investment decisions are embedded in political economy dynamics that systematically favor visible short-term expenditures over long-duration maintenance and renewal. We analyze the institutional mechanisms that perpetuate this bias.`,
    pages: 108,
  },
];

// ============================================================
// SPECIAL REPORTS
// ============================================================
export const specialReports: SpecialReport[] = [
  {
    id: 'r1', slug: 'post-dollar-clearing-architecture', section: 'special-reports',
    category: 'Financial Forensics',
    title: 'The Post-Dollar Clearing Architecture: Bilateral Currency Swaps, CIPS Interoperability, and Shadow Reserve Accumulation',
    subtitle: 'Summary Annual Report · October 2024 · 92 Pages',
    excerpt: 'A comprehensive forensic study tracking over $9.4 Trillion in non-Western multilateral currency swap facilities across 62 bilateral chains. Featuring origin-of-transaction topology maps, correspondent bank discount records, and econometric projections for global offshore bank build-up—and financial clearing processes for global offshore bank by Q1 2030.',
    body: `## Executive Summary

This Special Report represents the most comprehensive forensic mapping of post-dollar clearing architecture produced by any research institution. Our analysis tracks $9.4 trillion in bilateral currency swap facilities across 62 sovereign counterparty chains.

## Methodology

The forensic methodology combines SWIFT message traffic analysis (via leaked regulatory filings), BIS locational banking statistics, and proprietary correspondent bank network mapping developed over three years of continuous data collection.

## Key Findings

CIPS transaction volume has grown 340% since 2019, but technical interoperability with SWIFT remains limited to specific message format categories. The architectural gap between stated ambition and operational reality reveals that a functional dollar alternative requires 7-12 years of infrastructure development under optimistic assumptions.

## Shadow Reserve Analysis

Central bank reserve diversification data reveals systematic underreporting of non-dollar reserve accumulation in official IMF COFER data. Our forensic reconstruction suggests actual dollar reserve shares are 4-6 percentage points lower than officially reported.

## Policy Implications

The trajectory toward post-dollar clearing is real but non-linear, with implications for U.S. sanctions effectiveness, Federal Reserve monetary transmission, and the architecture of global trade finance.`,
    authors: [
      { name: 'Dr. Harvik Van Der Berg', initials: 'HB', role: 'Principal Investigator', bureau: 'Zurich Desk' },
      { name: 'Elena Weber', initials: 'EW', role: 'Co-Author', bureau: 'Frankfurt' }
    ],
    date: 'October 2024', pages: 92, format: 'PDF + Interactive Telemetry Model',
    accessLevel: 'classified', centralBanks: 42, transfers: '18,450 Transfers', featured: true,
  },
  {
    id: 'r2', slug: 'trans-pacific-subsea-vulnerability', section: 'special-reports',
    category: 'Infrastructure & Security',
    title: 'Trans-Pacific Subsea Cable Vulnerability & Chokepoint Audit: Analysis of the Luzon Strait',
    excerpt: 'Physical infrastructure risk modeling, ship-drag severing event analysis, and communications disruption risk assessment at the world\'s most congested fiber pathway.',
    body: `## Luzon Strait Infrastructure Risk

The Luzon Strait represents the single most concentrated point of vulnerability in the global submarine cable network, with 18 major cable systems passing through a 300km maritime corridor subject to complex overlapping territorial claims.

## Risk Quantification

Our probabilistic risk model estimates an 8.3% annual probability of a significant cable severing event affecting Luzon Strait cable systems, incorporating ship drag incidents, seismic activity, and intentional interference scenarios.

## Economic Impact Assessment

A coordinated severing of major Luzon Strait cable systems would cause an estimated $45-120B in economic damage within 72 hours through disruption of Asia-Pacific financial market data flows and commerce settlement systems.`,
    authors: [
      { name: 'Dr. B. Thoma', initials: 'BT', role: 'Infrastructure Security Fellow', bureau: 'London Research Unit' }
    ],
    date: 'August 2024', pages: 84, format: 'PDF + Python Notebook',
    accessLevel: 'institutional',
  },
  {
    id: 'r3', slug: 'strategic-mineral-hoarding-antwerp', section: 'special-reports',
    category: 'Supply Chain & Military',
    title: 'Strategic Mineral Hoarding & Shadow Warehouse Audits: Antwerp, Rotterdam, and Singapore',
    excerpt: 'Commodity exchange off-warrant inventory estimates, off-exchange commodity storage mapping, and gamma imbalances in metals markets.',
    body: `## Off-Warrant Inventory Forensics

This report presents the first systematic forensic audit of strategic mineral inventories held outside exchange-warrant systems in the three largest commodity storage hubs.

## Methodology

Satellite imagery analysis, shipping manifest cross-referencing, and warehouse receipt market data are combined to estimate off-warrant inventory levels for cobalt, lithium, germanium, and gallium at Antwerp, Rotterdam, and Singapore.

## Key Findings

Off-warrant strategic mineral inventories in these three hubs are estimated at 340% of official LME/SHFE reported levels for critical minerals, suggesting significant price discovery distortions in commodity markets.`,
    authors: [
      { name: 'Dr. Arantxa Ban', initials: 'AB', role: 'Commodity Forensics Lead', bureau: 'Zurich BioDesk' }
    ],
    date: 'July 2024', pages: 68, format: 'PDF + R + Python',
    accessLevel: 'institutional',
  },
  {
    id: 'r4', slug: 'small-modular-reactor-sovereign-guarantees', section: 'special-reports',
    category: 'Energy & Sovereign Finance',
    title: 'Small Modular Reactor Economics: Financing Cascades & Sovereign Guarantee Structures',
    excerpt: 'LCOE sensitivity models for next-gen SMR designs, regulatory cascades, and sovereign loan guarantee instrument analysis for nuclear project financing.',
    body: `## SMR Finance Architecture

Small Modular Reactor projects require sovereign-scale financing guarantees that existing nuclear project finance frameworks were not designed to accommodate. This report analyzes emerging guarantee structures across 14 active SMR development programs.

## LCOE Analysis

Our levelized cost of energy analysis for five leading SMR designs reveals cost trajectories that reach competitiveness with offshore wind by 2032-2035 under central-case assumptions, though with significantly wider uncertainty intervals.

## Sovereign Guarantee Mechanisms

Export credit agency guarantee structures are evolving rapidly to accommodate SMR deployment in emerging markets, with UKEF, US Ex-Im, and KEXIM competing to structure innovative financing packages.`,
    authors: [
      { name: 'Lars Wittenberg', initials: 'LW', role: 'Energy Finance Fellow' },
      { name: 'Marcus Finch', initials: 'MF', role: 'Nuclear Economics' }
    ],
    date: 'June 2024', pages: 56, format: 'PDF + Excel Models',
    accessLevel: 'open',
  },
  {
    id: 'r5', slug: 'sovereign-ai-fund-tracker', section: 'special-reports',
    category: 'Sovereign Wealth',
    title: 'The Sovereign AI Fund Tracker: Monitoring Capital Deployment into Advanced Accelerators',
    excerpt: 'Cross-tabulation examining Middle Eastern and East Asian sovereign wealth funds\' AI infrastructure deployment, their accelerator portfolios, and domestic market building strategies.',
    body: `## Sovereign AI Investment Landscape

Sovereign wealth funds from the Gulf Cooperation Council and East Asian economies have committed an estimated $78B to AI infrastructure investments since 2022, representing the largest coordinated deployment of sovereign capital into a single technology sector in history.

## Portfolio Analysis

Our database tracks 847 individual investment positions across 14 sovereign wealth fund vehicles, categorized by technology tier (compute, models, applications), geographic targeting, and strategic objective classification.

## Strategic Intent Assessment

Beyond pure financial returns, sovereign AI investment programs pursue three distinct strategic objectives: domestic capacity building, technology transfer access, and diplomatic positioning within AI governance frameworks.`,
    authors: [
      { name: 'Tariq Al-Mansoor', initials: 'TM', role: 'Sovereign Wealth Desk', bureau: 'Abu Dhabi Bureau' }
    ],
    date: 'March 2024', pages: 74, format: 'PDF + Interactive Dashboard',
    accessLevel: 'institutional',
  },
  {
    id: 'r6', slug: 'phosphorus-geopolitics-fertilizer', section: 'special-reports',
    category: 'Agricultural & Trade',
    title: 'Phosphorus Geopolitics and Global Fertilizer Trade Realignment',
    excerpt: 'Both are paths to sub-Saharan Africa export disruptions, concentrated fertilizer control in North Africa, and the fragility of the food supply chain.',
    body: `## Phosphorus Concentration Risk

Morocco and Western Sahara collectively control 74% of global phosphate rock reserves, creating a structural concentration risk in global food production that has no near-term technical mitigation.

## Trade Realignment Analysis

Russian and Belarusian sanctions have disrupted potash supply chains serving European agricultural markets, forcing rapid trade flow realignment toward Canadian and Israeli suppliers at significant cost premiums.

## Food Security Implications

Our food security impact model projects fertilizer supply disruptions translating into 12-18% crop yield reductions in price-sensitive developing economies, with cascading implications for political stability indices.`,
    authors: [
      { name: 'Priya Nair', initials: 'PN', role: 'Agricultural Markets Desk' },
      { name: 'Tang M. Chow', initials: 'TC', role: 'Commodity Supply Chain' }
    ],
    date: 'April 2024', pages: 62, format: 'PDF + CSV Datasets',
    accessLevel: 'open',
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getAllContent() {
  return [
    ...articles.map(a => ({ ...a, type: 'article' as const })),
    ...newsItems.map(n => ({ ...n, type: 'news' as const })),
    ...blogs.map(b => ({ ...b, type: 'blog' as const })),
    ...magazineIssues.map(m => ({ ...m, type: 'magazine' as const })),
    ...specialReports.map(r => ({ ...r, type: 'report' as const })),
  ];
}

export function getItemBySlug(section: string, slug: string) {
  const allSets: Record<string, { slug: string }[]> = {
    news: newsItems,
    articles,
    blogs,
    magazine: magazineIssues,
    'special-reports': specialReports,
  };
  return allSets[section]?.find(i => i.slug === slug) ?? null;
}

export const navCategories: Record<ContentType, string[]> = {
  news: ['All Feeds', 'Precision Economics & Crisis', 'Geopolitics & Conflict', 'Research & Biometrics', 'Climate Economics', 'Private Capital'],
  articles: ['All Treatises', 'Monetary Philosophy', 'Techno-Imperialism', 'Thermodynamic Economics', 'Subsea Sovereignty', 'Historical Archives'],
  blogs: ['All Creators', 'Macro Theorists', 'Algorithmic Physics', 'Energy Geopolitics', 'Maritime & Logistics', 'Archival Cryptography'],
  magazine: ['Current Issue', 'Print Volumes', 'Limited Series', 'Monographs', 'Digital Archive'],
  'special-reports': ['All Reports', 'Sovereign Client Protocols', 'Semiconductor & Hi-Supply Chain', 'Energy Grid Assessed Risk', 'Central Bank Reserves', 'Maritime Chokepoints'],
};
