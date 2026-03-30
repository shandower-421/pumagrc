# PumaGRC

A multi-framework compliance self-assessment tool. Rate your organization's maturity across security frameworks, track progress, identify gaps, and generate reports.

Built by [Greykit.com](https://www.greykit.com)

![Dashboard](docs/screenshots/dashboard.png)

## Supported Frameworks

| Category | Framework | Version |
|----------|-----------|---------|
| Cybersecurity | NIST CSF 2.0 | 2.0 |
| Cybersecurity | ISO 27001 | 2022 |
| Cybersecurity | SOC 2 (TSC) | 2017 |
| Federal / Defense | NIST SP 800-53 | Rev 5 |
| Federal / Defense | NIST SP 800-171 | Rev 3 |
| Federal / Defense | CMMC 2.0 | 2.0 |
| Industry Compliance | HIPAA Security Rule | 2013 |
| Industry Compliance | PCI DSS | 4.0.1 |
| Privacy | GDPR | 2016/679 |
| Privacy | NIST Privacy Framework | 1.0 |
| AI Governance | ISO/IEC 42001 | 2023 |

Enable or disable any combination via **Configure Frameworks** in the overflow menu.

## Features

### Dashboard
Overview of completion percentage, average maturity, high-priority count, improvement plans, priority breakdown donut chart, and maturity-by-domain radar chart.

![Dashboard](docs/screenshots/dashboard.png)

### Category Assessment
Expand controls inline to rate maturity (0-5), set priority, record evidence/proof, log remediation plans, and track activity notes with timestamped entries. Keyboard shortcuts: J/K to navigate, 0-5 to set maturity.

![Category Assessment](docs/screenshots/category-assessment.png)

### Gap & Risk Analysis
Sortable/filterable table highlighting controls that need attention. Filter by gap severity, risk level, priority, domain, maturity, and treatment status. Includes a dedicated risk register tab.

![Gap Analysis](docs/screenshots/gap-analysis.png)

### Heatmap
Visual grid of all controls colored by maturity level. Click any cell to jump directly to its assessment.

![Heatmap](docs/screenshots/heatmap.png)

### Cross-Framework Mapping
Side-by-side view of controls across all enabled frameworks with mapping coverage stats. See how a single control maps to requirements in other standards.

![Cross-Map](docs/screenshots/cross-map.png)

### Assessment History
Save named snapshots and track maturity improvement over time with trend charts. Compare any two snapshots side-by-side.

![History](docs/screenshots/history.png)

### Reports & Export
- **PDF Report** — formatted compliance report for stakeholders
- **Word Document** — editable .docx export
- **CSV Spreadsheet** — all controls with maturity, priority, evidence, and plans
- **JSON Backup** — full data export/import across all frameworks and snapshots
- **Print View** — browser-native print layout

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Recharts
- jsPDF / docx for report generation
- localStorage for persistence (all data stays in your browser)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### First Steps

1. Open the overflow menu (three dots) and select **Configure Frameworks** to enable the standards you need
2. Select a category from the sidebar to begin assessing controls
3. Use **Export JSON** from the overflow menu to back up your data regularly

### Demo Data

Import `public/demo.json` via the overflow menu's **Import JSON** to load sample assessment data across multiple frameworks with snapshot history.

## Builds

| Command | Output | Description |
|---------|--------|-------------|
| `npm run build` | `dist/` | Standard multi-file build for web server deployment |
| `npm run build:standalone` | `dist-standalone/index.html` | Single-file offline HTML (~3.7MB), opens via `file://` |
| `npm run build:demo` | `dist-demo/index.html` | Single-file with pre-loaded sample data, import/export disabled |

See [BUILD.md](BUILD.md) for details on standalone and demo builds.

## Data Storage

All assessment data is stored in your browser's localStorage. **This is not a secure datastore.** Export your data regularly using the JSON export feature. Clearing browser data will erase your assessments. The app shows periodic backup reminders if you haven't exported recently.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run build:standalone` | Build single-file offline HTML |
| `npm run build:demo` | Build single-file demo with sample data |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Disclaimer

This tool is provided as-is, with no warranties or guarantees of any kind. Use it at your own risk. See the full disclaimer in the app under Help & About.

## License

Private — not licensed for redistribution.
