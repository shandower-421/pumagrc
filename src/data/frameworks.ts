import type { FrameworkMeta } from '../types/assessment'
import { NIST_CSF_2 } from './nist-csf-2'
import { ISO_27001 } from './iso-27001'
import { SOC2 } from './soc2'
import { CMMC } from './cmmc'
import { HIPAA } from './hipaa'
import { PCI_DSS } from './pci-dss'
import { NIST_800_53 } from './nist-800-53'
import { NIST_800_171 } from './nist-800-171'
import { ISO_42001 } from './iso-42001'
import { GDPR } from './gdpr'
import { NIST_PF } from './nist-pf'

export const FRAMEWORKS: FrameworkMeta[] = [
  {
    id: 'nist-csf-2',
    name: 'NIST CSF 2.0',
    shortName: 'NIST CSF',
    version: '2.0',
    description: 'NIST Cybersecurity Framework 2.0 — 6 functions, 22 categories, 106 subcategories for managing cybersecurity risk.',
    data: NIST_CSF_2,
  },
  {
    id: 'iso-27001',
    name: 'ISO 27001:2022',
    shortName: 'ISO 27001',
    version: '2022',
    description: 'ISO/IEC 27001:2022 Annex A — 4 themes and 93 controls for information security management systems.',
    data: ISO_27001,
  },
  {
    id: 'soc2',
    name: 'SOC 2 (TSC)',
    shortName: 'SOC 2',
    version: '2017',
    description: 'AICPA Trust Services Criteria — 5 categories covering security, availability, confidentiality, processing integrity, and privacy.',
    data: SOC2,
  },
  {
    id: 'cmmc',
    name: 'CMMC 2.0',
    shortName: 'CMMC',
    version: '2.0',
    description: 'Cybersecurity Maturity Model Certification Level 2 — 14 domains and 110 practices based on NIST SP 800-171.',
    data: CMMC,
  },
  {
    id: 'hipaa',
    name: 'HIPAA Security Rule',
    shortName: 'HIPAA',
    version: '2013',
    description: 'HIPAA Security Rule (45 CFR Part 164 Subpart C) — 3 safeguard categories, 18 standards, and 54 implementation specifications for protecting ePHI.',
    data: HIPAA,
  },
  {
    id: 'pci-dss',
    name: 'PCI DSS 4.0.1',
    shortName: 'PCI DSS',
    version: '4.0.1',
    description: 'Payment Card Industry Data Security Standard v4.0.1 — 12 requirements and 250+ sub-requirements for protecting payment card account data.',
    data: PCI_DSS,
  },
  {
    id: 'nist-800-53',
    name: 'NIST SP 800-53 Rev 5',
    shortName: '800-53',
    version: 'Rev 5',
    description: 'NIST SP 800-53 Rev 5 — 20 control families and 200+ base controls for security and privacy of federal information systems.',
    data: NIST_800_53,
  },
  {
    id: 'nist-800-171',
    name: 'NIST SP 800-171 Rev 3',
    shortName: '800-171',
    version: 'Rev 3',
    description: 'NIST SP 800-171 Rev 3 — 17 families and 110 security requirements for protecting CUI in nonfederal systems.',
    data: NIST_800_171,
  },
  {
    id: 'iso-42001',
    name: 'ISO/IEC 42001:2023',
    shortName: 'ISO 42001',
    version: '2023',
    description: 'ISO/IEC 42001:2023 — AI management system standard with clauses 4-10 and Annex A controls for responsible AI.',
    data: ISO_42001,
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    shortName: 'GDPR',
    version: '2016/679',
    description: 'EU General Data Protection Regulation — principles, data subject rights, controller obligations, and transfer rules.',
    data: GDPR,
  },
  {
    id: 'nist-pf',
    name: 'NIST Privacy Framework 1.0',
    shortName: 'Privacy FW',
    version: '1.0',
    description: 'NIST Privacy Framework 1.0 — 5 functions and 18 categories for managing privacy risk through data processing.',
    data: NIST_PF,
  },
]

export function getFramework(id: string): FrameworkMeta {
  return FRAMEWORKS.find(f => f.id === id) || FRAMEWORKS[0]
}
