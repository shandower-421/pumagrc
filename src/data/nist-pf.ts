// NIST Privacy Framework 1.0 - Complete Framework Data
// Source: NIST Privacy Framework Version 1.0 (January 2020)
// https://www.nist.gov/privacy-framework

import type { FunctionDef } from '../types/assessment';

export const NIST_PF: FunctionDef[] = [
  // ============================================================
  // IDENTIFY-P (ID-P) - 4 categories, 21 subcategories
  // ============================================================
  {
    id: "ID-P",
    name: "Identify-P",
    description:
      "Develop the organizational understanding to manage privacy risk for individuals arising from data processing.",
    color: "teal",
    categories: [
      {
        id: "ID.IM-P",
        name: "Inventory and Mapping",
        subcategories: [
          {
            id: "ID.IM-P1",
            description:
              "Systems/products/services that process data are inventoried",
          },
          {
            id: "ID.IM-P2",
            description:
              "Owners or operators of systems/products/services that process data are inventoried",
          },
          {
            id: "ID.IM-P3",
            description:
              "Categories of individuals (e.g., customers, employees or prospective employees, consumers) whose data is being processed are inventoried",
          },
          {
            id: "ID.IM-P4",
            description:
              "Data actions of the systems/products/services are inventoried",
          },
          {
            id: "ID.IM-P5",
            description:
              "The purposes for the data actions are inventoried",
          },
          {
            id: "ID.IM-P6",
            description:
              "Data elements within the data actions are inventoried",
          },
          {
            id: "ID.IM-P7",
            description:
              "The data processing environment is identified (e.g., geographic location, internal, cloud, third parties)",
          },
          {
            id: "ID.IM-P8",
            description:
              "Data processing is mapped, illustrating the data actions and associated data elements for systems/products/services, including components; roles of the component owners/operators; and interactions between components",
          },
        ],
      },
      {
        id: "ID.BE-P",
        name: "Business Environment",
        subcategories: [
          {
            id: "ID.BE-P1",
            description:
              "The organization's role(s) in the data processing ecosystem are identified and communicated",
          },
          {
            id: "ID.BE-P2",
            description:
              "Priorities for organizational mission, objectives, and activities are established and communicated",
          },
          {
            id: "ID.BE-P3",
            description:
              "Systems/products/services that support organizational priorities are established and communicated",
          },
        ],
      },
      {
        id: "ID.RA-P",
        name: "Risk Assessment",
        subcategories: [
          {
            id: "ID.RA-P1",
            description:
              "Contextual factors related to the systems/products/services and the data actions are identified (e.g., individuals' demographics and privacy interests/perceptions, visibility of data processing, availability of alternative products/services)",
          },
          {
            id: "ID.RA-P2",
            description:
              "Data analytic inputs and outputs are identified and evaluated for bias",
          },
          {
            id: "ID.RA-P3",
            description:
              "Potential problematic data actions and associated problems are identified",
          },
          {
            id: "ID.RA-P4",
            description:
              "Problematic data actions, likelihoods, and impacts are used to determine and prioritize risk",
          },
          {
            id: "ID.RA-P5",
            description:
              "Risk responses are identified, prioritized, and implemented",
          },
        ],
      },
      {
        id: "ID.DE-P",
        name: "Data Processing Ecosystem Risk Management",
        subcategories: [
          {
            id: "ID.DE-P1",
            description:
              "Data processing ecosystem risk management policies, processes, and procedures are identified, established, assessed, managed, and agreed to by organizational stakeholders",
          },
          {
            id: "ID.DE-P2",
            description:
              "Data processing ecosystem parties (e.g., service providers, customers, partners, product manufacturers, application developers) are identified, prioritized, and assessed using a privacy risk assessment process",
          },
          {
            id: "ID.DE-P3",
            description:
              "Contracts with data processing ecosystem parties are established, maintained, and used to implement appropriate measures designed to meet the objectives of an organization's privacy program",
          },
          {
            id: "ID.DE-P4",
            description:
              "Interoperability frameworks or similar multi-party approaches are used to manage data processing ecosystem privacy risks",
          },
          {
            id: "ID.DE-P5",
            description:
              "Data processing ecosystem parties are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual, interoperability framework, or other obligations",
          },
        ],
      },
    ],
  },

  // ============================================================
  // GOVERN-P (GV-P) - 4 categories, 15 subcategories
  // ============================================================
  {
    id: "GV-P",
    name: "Govern-P",
    description:
      "Develop and implement the organizational governance structure to enable an ongoing understanding of the organization's risk management priorities that are informed by privacy risk.",
    color: "purple",
    categories: [
      {
        id: "GV.PO-P",
        name: "Governance Policies, Processes, and Procedures",
        subcategories: [
          {
            id: "GV.PO-P1",
            description:
              "Organizational privacy values and policies (e.g., conditions on data processing such as data uses or retention periods, individuals' prerogatives with respect to data processing) are established and communicated",
          },
          {
            id: "GV.PO-P2",
            description:
              "Processes to instill organizational privacy values within data processing ecosystem partners are established and in place",
          },
          {
            id: "GV.PO-P3",
            description:
              "Roles and responsibilities for the workforce are established with respect to privacy",
          },
          {
            id: "GV.PO-P4",
            description:
              "Privacy roles and responsibilities are coordinated and aligned with third-party stakeholders (e.g., service providers, customers, partners)",
          },
          {
            id: "GV.PO-P5",
            description:
              "Legal, regulatory, and contractual requirements regarding privacy are understood and managed",
          },
          {
            id: "GV.PO-P6",
            description:
              "Governance and risk management policies, processes, and procedures address privacy risks",
          },
        ],
      },
      {
        id: "GV.RM-P",
        name: "Risk Management Strategy",
        subcategories: [
          {
            id: "GV.RM-P1",
            description:
              "Risk management processes are established, managed, and agreed to by organizational stakeholders",
          },
          {
            id: "GV.RM-P2",
            description:
              "Organizational risk tolerance is determined and clearly expressed",
          },
          {
            id: "GV.RM-P3",
            description:
              "The organization's determination of risk tolerance is informed by its role(s) in the data processing ecosystem",
          },
        ],
      },
      {
        id: "GV.AT-P",
        name: "Awareness and Training",
        subcategories: [
          {
            id: "GV.AT-P1",
            description:
              "The workforce is informed and trained on its roles and responsibilities",
          },
          {
            id: "GV.AT-P2",
            description:
              "Senior executives understand their roles and responsibilities",
          },
          {
            id: "GV.AT-P3",
            description:
              "Privacy personnel understand their roles and responsibilities",
          },
          {
            id: "GV.AT-P4",
            description:
              "Third parties (e.g., service providers, customers, partners) understand their roles and responsibilities",
          },
        ],
      },
      {
        id: "GV.MT-P",
        name: "Monitoring and Review",
        subcategories: [
          {
            id: "GV.MT-P1",
            description:
              "The privacy risk management program and its associated activities are reviewed and updated",
          },
          {
            id: "GV.MT-P2",
            description:
              "The privacy risk management program is adjusted to reflect changes in the regulatory environment",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONTROL-P (CT-P) - 2 categories, 15 subcategories
  // ============================================================
  {
    id: "CT-P",
    name: "Control-P",
    description:
      "Develop and implement appropriate activities to enable organizations or individuals to manage data with sufficient granularity to manage privacy risks.",
    color: "blue",
    categories: [
      {
        id: "CT.DM-P",
        name: "Data Management",
        subcategories: [
          {
            id: "CT.DM-P1",
            description:
              "Data elements can be accessed for review",
          },
          {
            id: "CT.DM-P2",
            description:
              "Data elements can be accessed for transmission or disclosure",
          },
          {
            id: "CT.DM-P3",
            description:
              "Data elements can be accessed for alteration",
          },
          {
            id: "CT.DM-P4",
            description:
              "Data elements can be accessed for deletion",
          },
          {
            id: "CT.DM-P5",
            description:
              "Data are destroyed according to policy",
          },
          {
            id: "CT.DM-P6",
            description:
              "Data are transmitted using standardized formats",
          },
          {
            id: "CT.DM-P7",
            description:
              "Mechanisms for transmitting processing permissions and related data values with data elements are established and in place",
          },
          {
            id: "CT.DM-P8",
            description:
              "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy and incorporating the principle of data minimization",
          },
          {
            id: "CT.DM-P9",
            description:
              "Technical measures implemented to manage data are tested and assessed",
          },
          {
            id: "CT.DM-P10",
            description:
              "Stakeholder privacy preferences are included in the management of data",
          },
        ],
      },
      {
        id: "CT.DP-P",
        name: "Data Processing Policies, Processes, and Procedures",
        subcategories: [
          {
            id: "CT.DP-P1",
            description:
              "Data are processed in accordance with the organization's privacy notice and applicable policies, processes, and procedures",
          },
          {
            id: "CT.DP-P2",
            description:
              "Data are processed according to data subject consent and applicable policies, processes, and procedures",
          },
          {
            id: "CT.DP-P3",
            description:
              "Data processing is limited to what is commensurate with the expressed purpose (data minimization)",
          },
          {
            id: "CT.DP-P4",
            description:
              "System or device configurations permit selective collection or disclosure of data elements",
          },
          {
            id: "CT.DP-P5",
            description:
              "Attribute references are substituted for personally identifiable information (de-identification)",
          },
        ],
      },
    ],
  },

  // ============================================================
  // COMMUNICATE-P (CM-P) - 2 categories, 10 subcategories
  // ============================================================
  {
    id: "CM-P",
    name: "Communicate-P",
    description:
      "Develop and implement appropriate activities to enable organizations and individuals to have a reliable understanding and engage in a dialogue about how data are processed and associated privacy risks.",
    color: "green",
    categories: [
      {
        id: "CM.AW-P",
        name: "Communication Policies, Processes, and Procedures",
        subcategories: [
          {
            id: "CM.AW-P1",
            description:
              "Mechanisms (e.g., notices, internal or external privacy policies) for communicating data processing purposes, practices, and associated privacy risks are established and in place",
          },
          {
            id: "CM.AW-P2",
            description:
              "Mechanisms for obtaining feedback from individuals (e.g., surveys or focus groups) about data processing and associated privacy risks are established and in place",
          },
          {
            id: "CM.AW-P3",
            description:
              "System/product/service design enables data processing visibility",
          },
          {
            id: "CM.AW-P4",
            description:
              "Records of data disclosures and sharing are maintained and can be accessed for review or transmission/disclosure",
          },
          {
            id: "CM.AW-P5",
            description:
              "Data corrections or deletions can be communicated to individuals or organizations (e.g., data sources) in the data processing ecosystem",
          },
          {
            id: "CM.AW-P6",
            description:
              "Data provenance and lineage are maintained and can be accessed for review or transmission/disclosure",
          },
          {
            id: "CM.AW-P7",
            description:
              "Impacted individuals and organizations are notified about a privacy breach or event",
          },
          {
            id: "CM.AW-P8",
            description:
              "Individuals are provided with mitigation mechanisms (e.g., credit monitoring, consent withdrawal, data alteration or deletion) to address impacts of problematic data actions",
          },
        ],
      },
      {
        id: "CM.PO-P",
        name: "Data Processing Purposes",
        subcategories: [
          {
            id: "CM.PO-P1",
            description:
              "Transparency policies, processes, and procedures for communicating data processing purposes are established and in place",
          },
          {
            id: "CM.PO-P2",
            description:
              "Roles and responsibilities (e.g., public relations) for communicating data processing purposes are established",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PROTECT-P (PR-P) - 4 categories, 13 subcategories
  // ============================================================
  {
    id: "PR-P",
    name: "Protect-P",
    description:
      "Develop and implement appropriate data processing safeguards to prevent cybersecurity-related privacy events.",
    color: "amber",
    categories: [
      {
        id: "PR.AC-P",
        name: "Identity Management, Authentication, and Access Control",
        subcategories: [
          {
            id: "PR.AC-P1",
            description:
              "Identities and credentials are issued, managed, verified, revoked, and audited for authorized individuals, processes, and devices",
          },
          {
            id: "PR.AC-P2",
            description:
              "Physical access to data assets is managed, monitored, and enforced commensurate with risk",
          },
          {
            id: "PR.AC-P3",
            description:
              "Remote access is managed, monitored, and enforced commensurate with risk",
          },
          {
            id: "PR.AC-P4",
            description:
              "Access permissions and authorizations are managed with the principles of least privilege and separation of duties",
          },
          {
            id: "PR.AC-P5",
            description:
              "Network integrity is protected (e.g., network segregation, network segmentation)",
          },
          {
            id: "PR.AC-P6",
            description:
              "Individuals and devices are proofed and bound to credentials, and authenticated commensurate with the risk of the transaction (e.g., individuals' security and privacy risks and other organizational risks)",
          },
        ],
      },
      {
        id: "PR.DS-P",
        name: "Data Security",
        subcategories: [
          {
            id: "PR.DS-P1",
            description:
              "Data-at-rest are protected",
          },
          {
            id: "PR.DS-P2",
            description:
              "Data-in-transit are protected",
          },
        ],
      },
      {
        id: "PR.MA-P",
        name: "Maintenance",
        subcategories: [
          {
            id: "PR.MA-P1",
            description:
              "Maintenance and repair of organizational assets are performed and logged, with approved and controlled tools",
          },
          {
            id: "PR.MA-P2",
            description:
              "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access",
          },
        ],
      },
      {
        id: "PR.PT-P",
        name: "Protective Technology",
        subcategories: [
          {
            id: "PR.PT-P1",
            description:
              "Removable media is protected, and its use restricted according to policy",
          },
          {
            id: "PR.PT-P2",
            description:
              "Communications and control networks are protected",
          },
          {
            id: "PR.PT-P3",
            description:
              "A mechanism for accessing, connecting to, and using systems is implemented commensurate with risk",
          },
        ],
      },
    ],
  },
];
