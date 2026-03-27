import type { FrameworkMeta } from '../types/assessment'
import { NIST_CSF_2 } from './nist-csf-2'
import { ISO_27001 } from './iso-27001'
import { SOC2 } from './soc2'
import { CMMC } from './cmmc'

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
]

export function getFramework(id: string): FrameworkMeta {
  return FRAMEWORKS.find(f => f.id === id) || FRAMEWORKS[0]
}
