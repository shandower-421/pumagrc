// ISO/IEC 27001:2022 Annex A - Information Security Controls
// Source: ISO/IEC 27001:2022 (October 2022)
// 4 Themes, 93 Controls

import type { FunctionDef } from '../types/assessment';

export const ISO_27001: FunctionDef[] = [
  // ============================================================
  // ORGANIZATIONAL CONTROLS (A.5) - 37 controls
  // ============================================================
  {
    id: "A.5",
    name: "Organizational Controls",
    description:
      "Controls related to organizational policies, roles, responsibilities, and management of information security.",
    color: "blue",
    categories: [
      {
        id: "A.5.POL",
        name: "Policies & Governance",
        subcategories: [
          {
            id: "A.5.1",
            description: "Policies for information security",
          },
          {
            id: "A.5.2",
            description: "Information security roles and responsibilities",
          },
          {
            id: "A.5.3",
            description: "Segregation of duties",
          },
          {
            id: "A.5.4",
            description: "Management responsibilities",
          },
          {
            id: "A.5.5",
            description: "Contact with authorities",
          },
          {
            id: "A.5.6",
            description: "Contact with special interest groups",
          },
          {
            id: "A.5.7",
            description: "Threat intelligence",
          },
          {
            id: "A.5.8",
            description: "Information security in project management",
          },
        ],
      },
      {
        id: "A.5.AST",
        name: "Asset & Information Management",
        subcategories: [
          {
            id: "A.5.9",
            description: "Inventory of information and other associated assets",
          },
          {
            id: "A.5.10",
            description: "Acceptable use of information and other associated assets",
          },
          {
            id: "A.5.11",
            description: "Return of assets",
          },
          {
            id: "A.5.12",
            description: "Classification of information",
          },
          {
            id: "A.5.13",
            description: "Labelling of information",
          },
          {
            id: "A.5.14",
            description: "Information transfer",
          },
        ],
      },
      {
        id: "A.5.ACC",
        name: "Access Control & Identity",
        subcategories: [
          {
            id: "A.5.15",
            description: "Access control",
          },
          {
            id: "A.5.16",
            description: "Identity management",
          },
          {
            id: "A.5.17",
            description: "Authentication information",
          },
          {
            id: "A.5.18",
            description: "Access rights",
          },
        ],
      },
      {
        id: "A.5.SUP",
        name: "Supplier & Third-Party Security",
        subcategories: [
          {
            id: "A.5.19",
            description: "Information security in supplier relationships",
          },
          {
            id: "A.5.20",
            description: "Addressing information security within supplier agreements",
          },
          {
            id: "A.5.21",
            description: "Managing information security in the ICT supply chain",
          },
          {
            id: "A.5.22",
            description: "Monitoring, review and change management of supplier services",
          },
          {
            id: "A.5.23",
            description: "Information security for use of cloud services",
          },
        ],
      },
      {
        id: "A.5.INC",
        name: "Incident Management & Business Continuity",
        subcategories: [
          {
            id: "A.5.24",
            description: "Information security incident management planning and preparation",
          },
          {
            id: "A.5.25",
            description: "Assessment and decision on information security events",
          },
          {
            id: "A.5.26",
            description: "Response to information security incidents",
          },
          {
            id: "A.5.27",
            description: "Learning from information security incidents",
          },
          {
            id: "A.5.28",
            description: "Collection of evidence",
          },
          {
            id: "A.5.29",
            description: "Information security during disruption",
          },
          {
            id: "A.5.30",
            description: "ICT readiness for business continuity",
          },
        ],
      },
      {
        id: "A.5.COM",
        name: "Compliance & Legal",
        subcategories: [
          {
            id: "A.5.31",
            description: "Legal, statutory, regulatory and contractual requirements",
          },
          {
            id: "A.5.32",
            description: "Intellectual property rights",
          },
          {
            id: "A.5.33",
            description: "Protection of records",
          },
          {
            id: "A.5.34",
            description: "Privacy and protection of personal identifiable information (PII)",
          },
          {
            id: "A.5.35",
            description: "Independent review of information security",
          },
          {
            id: "A.5.36",
            description: "Compliance with policies, rules and standards for information security",
          },
          {
            id: "A.5.37",
            description: "Documented operating procedures",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PEOPLE CONTROLS (A.6) - 8 controls
  // ============================================================
  {
    id: "A.6",
    name: "People Controls",
    description:
      "Controls related to human resources security, awareness training, and personnel management throughout the employment lifecycle.",
    color: "green",
    categories: [
      {
        id: "A.6.EMP",
        name: "Employment Lifecycle",
        subcategories: [
          {
            id: "A.6.1",
            description: "Screening",
          },
          {
            id: "A.6.2",
            description: "Terms and conditions of employment",
          },
          {
            id: "A.6.3",
            description: "Information security awareness, education and training",
          },
          {
            id: "A.6.4",
            description: "Disciplinary process",
          },
          {
            id: "A.6.5",
            description: "Responsibilities after termination or change of employment",
          },
        ],
      },
      {
        id: "A.6.WRK",
        name: "Working Arrangements",
        subcategories: [
          {
            id: "A.6.6",
            description: "Confidentiality or non-disclosure agreements",
          },
          {
            id: "A.6.7",
            description: "Remote working",
          },
          {
            id: "A.6.8",
            description: "Information security event reporting",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHYSICAL CONTROLS (A.7) - 14 controls
  // ============================================================
  {
    id: "A.7",
    name: "Physical Controls",
    description:
      "Controls related to physical security perimeters, entry controls, and protection of equipment and facilities.",
    color: "amber",
    categories: [
      {
        id: "A.7.FAC",
        name: "Facility & Perimeter Security",
        subcategories: [
          {
            id: "A.7.1",
            description: "Physical security perimeters",
          },
          {
            id: "A.7.2",
            description: "Physical entry",
          },
          {
            id: "A.7.3",
            description: "Securing offices, rooms and facilities",
          },
          {
            id: "A.7.4",
            description: "Physical security monitoring",
          },
          {
            id: "A.7.5",
            description: "Protecting against physical and environmental threats",
          },
          {
            id: "A.7.6",
            description: "Working in secure areas",
          },
          {
            id: "A.7.7",
            description: "Clear desk and clear screen",
          },
        ],
      },
      {
        id: "A.7.EQP",
        name: "Equipment & Asset Protection",
        subcategories: [
          {
            id: "A.7.8",
            description: "Equipment siting and protection",
          },
          {
            id: "A.7.9",
            description: "Security of assets off-premises",
          },
          {
            id: "A.7.10",
            description: "Storage media",
          },
          {
            id: "A.7.11",
            description: "Supporting utilities",
          },
          {
            id: "A.7.12",
            description: "Cabling security",
          },
          {
            id: "A.7.13",
            description: "Equipment maintenance",
          },
          {
            id: "A.7.14",
            description: "Secure disposal or re-use of equipment",
          },
        ],
      },
    ],
  },

  // ============================================================
  // TECHNOLOGICAL CONTROLS (A.8) - 34 controls
  // ============================================================
  {
    id: "A.8",
    name: "Technological Controls",
    description:
      "Controls related to technology-based security measures including endpoint security, access management, cryptography, and secure development.",
    color: "purple",
    categories: [
      {
        id: "A.8.DEV",
        name: "Endpoint & Device Security",
        subcategories: [
          {
            id: "A.8.1",
            description: "User endpoint devices",
          },
          {
            id: "A.8.2",
            description: "Privileged access rights",
          },
          {
            id: "A.8.3",
            description: "Information access restriction",
          },
          {
            id: "A.8.4",
            description: "Access to source code",
          },
          {
            id: "A.8.5",
            description: "Secure authentication",
          },
        ],
      },
      {
        id: "A.8.OPS",
        name: "Operations & Malware Protection",
        subcategories: [
          {
            id: "A.8.6",
            description: "Capacity management",
          },
          {
            id: "A.8.7",
            description: "Protection against malware",
          },
          {
            id: "A.8.8",
            description: "Management of technical vulnerabilities",
          },
          {
            id: "A.8.9",
            description: "Configuration management",
          },
          {
            id: "A.8.10",
            description: "Information deletion",
          },
          {
            id: "A.8.11",
            description: "Data masking",
          },
          {
            id: "A.8.12",
            description: "Data leakage prevention",
          },
          {
            id: "A.8.13",
            description: "Information backup",
          },
          {
            id: "A.8.14",
            description: "Redundancy of information processing facilities",
          },
        ],
      },
      {
        id: "A.8.LOG",
        name: "Logging, Monitoring & Cryptography",
        subcategories: [
          {
            id: "A.8.15",
            description: "Logging",
          },
          {
            id: "A.8.16",
            description: "Monitoring activities",
          },
          {
            id: "A.8.17",
            description: "Clock synchronization",
          },
          {
            id: "A.8.18",
            description: "Use of privileged utility programs",
          },
          {
            id: "A.8.19",
            description: "Installation of software on operational systems",
          },
          {
            id: "A.8.20",
            description: "Networks security",
          },
          {
            id: "A.8.21",
            description: "Security of network services",
          },
          {
            id: "A.8.22",
            description: "Segregation of networks",
          },
          {
            id: "A.8.23",
            description: "Web filtering",
          },
          {
            id: "A.8.24",
            description: "Use of cryptography",
          },
        ],
      },
      {
        id: "A.8.DEV2",
        name: "Secure Development & Testing",
        subcategories: [
          {
            id: "A.8.25",
            description: "Secure development life cycle",
          },
          {
            id: "A.8.26",
            description: "Application security requirements",
          },
          {
            id: "A.8.27",
            description: "Secure system architecture and engineering principles",
          },
          {
            id: "A.8.28",
            description: "Secure coding",
          },
          {
            id: "A.8.29",
            description: "Security testing in development and acceptance",
          },
          {
            id: "A.8.30",
            description: "Outsourced development",
          },
          {
            id: "A.8.31",
            description: "Separation of development, test and production environments",
          },
          {
            id: "A.8.32",
            description: "Change management",
          },
          {
            id: "A.8.33",
            description: "Test information",
          },
          {
            id: "A.8.34",
            description: "Protection of information systems during audit testing",
          },
        ],
      },
    ],
  },
];
