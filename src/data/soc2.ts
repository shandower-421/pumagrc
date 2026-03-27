// SOC 2 Trust Services Criteria (TSC) - Complete Criteria Data
// Source: AICPA Trust Services Criteria (2017 Revision)
// https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/trustservicescriteria

import type { FunctionDef } from '../types/assessment';

export const SOC2: FunctionDef[] = [
  // ============================================================
  // COMMON CRITERIA (CC) - Security - 9 categories, 33 criteria
  // ============================================================
  {
    id: "CC",
    name: "Common Criteria (Security)",
    description:
      "The common criteria related to security, availability, processing integrity, confidentiality, and privacy. These criteria are relevant to all engagements.",
    color: "blue",
    categories: [
      {
        id: "CC1",
        name: "Control Environment",
        subcategories: [
          {
            id: "CC1.1",
            description:
              "The entity demonstrates a commitment to integrity and ethical values.",
          },
          {
            id: "CC1.2",
            description:
              "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.",
          },
          {
            id: "CC1.3",
            description:
              "Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives.",
          },
          {
            id: "CC1.4",
            description:
              "The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives.",
          },
          {
            id: "CC1.5",
            description:
              "The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives.",
          },
        ],
      },
      {
        id: "CC2",
        name: "Communication and Information",
        subcategories: [
          {
            id: "CC2.1",
            description:
              "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.",
          },
          {
            id: "CC2.2",
            description:
              "The entity internally communicates information, including objectives and responsibilities for internal control, necessary to support the functioning of internal control.",
          },
          {
            id: "CC2.3",
            description:
              "The entity communicates with external parties regarding matters affecting the functioning of internal control.",
          },
        ],
      },
      {
        id: "CC3",
        name: "Risk Assessment",
        subcategories: [
          {
            id: "CC3.1",
            description:
              "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.",
          },
          {
            id: "CC3.2",
            description:
              "The entity identifies risks to the achievement of its objectives across the entity and analyzes risks as a basis for determining how the risks should be managed.",
          },
          {
            id: "CC3.3",
            description:
              "The entity considers the potential for fraud in assessing risks to the achievement of objectives.",
          },
          {
            id: "CC3.4",
            description:
              "The entity identifies and assesses changes that could significantly impact the system of internal control.",
          },
        ],
      },
      {
        id: "CC4",
        name: "Monitoring Activities",
        subcategories: [
          {
            id: "CC4.1",
            description:
              "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.",
          },
          {
            id: "CC4.2",
            description:
              "The entity evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action, including senior management and the board of directors, as appropriate.",
          },
        ],
      },
      {
        id: "CC5",
        name: "Control Activities",
        subcategories: [
          {
            id: "CC5.1",
            description:
              "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.",
          },
          {
            id: "CC5.2",
            description:
              "The entity also selects and develops general control activities over technology to support the achievement of objectives.",
          },
          {
            id: "CC5.3",
            description:
              "The entity deploys control activities through policies that establish what is expected and in procedures that put policies into action.",
          },
        ],
      },
      {
        id: "CC6",
        name: "Logical and Physical Access Controls",
        subcategories: [
          {
            id: "CC6.1",
            description:
              "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives.",
          },
          {
            id: "CC6.2",
            description:
              "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users whose access is administered by the entity. For those users whose access is administered by the entity, user system credentials are removed when user access is no longer authorized.",
          },
          {
            id: "CC6.3",
            description:
              "The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles, responsibilities, or the system design and changes, giving consideration to the concepts of least privilege and segregation of duties, to meet the entity's objectives.",
          },
          {
            id: "CC6.4",
            description:
              "The entity restricts physical access to facilities and protected information assets (for example, data center facilities, backup media storage, and other sensitive locations) to authorized personnel to meet the entity's objectives.",
          },
          {
            id: "CC6.5",
            description:
              "The entity discontinues logical and physical protections over physical assets only after the ability to read or recover data and software from those assets has been diminished and is no longer required to meet the entity's objectives.",
          },
          {
            id: "CC6.6",
            description:
              "The entity implements logical access security measures to protect against threats from sources outside its system boundaries.",
          },
          {
            id: "CC6.7",
            description:
              "The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes, and protects it during transmission, movement, or removal to meet the entity's objectives.",
          },
          {
            id: "CC6.8",
            description:
              "The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet the entity's objectives.",
          },
        ],
      },
      {
        id: "CC7",
        name: "System Operations",
        subcategories: [
          {
            id: "CC7.1",
            description:
              "To meet its objectives, the entity uses detection and monitoring procedures to identify (1) changes to configurations that result in the introduction of new vulnerabilities, and (2) susceptibilities to newly discovered vulnerabilities.",
          },
          {
            id: "CC7.2",
            description:
              "The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives; anomalies are analyzed to determine whether they represent security events.",
          },
          {
            id: "CC7.3",
            description:
              "The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives (security incidents) and, if so, takes actions to prevent or address such failures.",
          },
          {
            id: "CC7.4",
            description:
              "The entity responds to identified security incidents by executing a defined incident response program to understand, contain, remediate, and communicate security incidents, as appropriate.",
          },
          {
            id: "CC7.5",
            description:
              "The entity identifies, develops, and implements activities to recover from identified security incidents.",
          },
        ],
      },
      {
        id: "CC8",
        name: "Change Management",
        subcategories: [
          {
            id: "CC8.1",
            description:
              "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.",
          },
        ],
      },
      {
        id: "CC9",
        name: "Risk Mitigation",
        subcategories: [
          {
            id: "CC9.1",
            description:
              "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.",
          },
          {
            id: "CC9.2",
            description:
              "The entity assesses and manages risks associated with vendors and business partners.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AVAILABILITY (A) - 1 category, 3 criteria
  // ============================================================
  {
    id: "A",
    name: "Availability",
    description:
      "The system is available for operation and use as committed or agreed.",
    color: "green",
    categories: [
      {
        id: "A1",
        name: "Availability",
        subcategories: [
          {
            id: "A1.1",
            description:
              "The entity maintains, monitors, and evaluates current processing capacity and use of system components (infrastructure, data, and software) to manage capacity demand and to enable the implementation of additional capacity to help meet its objectives.",
          },
          {
            id: "A1.2",
            description:
              "The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections, software, data backup processes, and recovery infrastructure to meet its objectives.",
          },
          {
            id: "A1.3",
            description:
              "The entity tests recovery plan procedures supporting system recovery to meet its objectives.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONFIDENTIALITY (C) - 1 category, 2 criteria
  // ============================================================
  {
    id: "C",
    name: "Confidentiality",
    description:
      "Information designated as confidential is protected as committed or agreed.",
    color: "purple",
    categories: [
      {
        id: "C1",
        name: "Confidentiality",
        subcategories: [
          {
            id: "C1.1",
            description:
              "The entity identifies and maintains confidential information to meet the entity's objectives related to confidentiality.",
          },
          {
            id: "C1.2",
            description:
              "The entity disposes of confidential information to meet the entity's objectives related to confidentiality.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PROCESSING INTEGRITY (PI) - 1 category, 5 criteria
  // ============================================================
  {
    id: "PI",
    name: "Processing Integrity",
    description:
      "System processing is complete, valid, accurate, timely, and authorized to meet the entity's objectives.",
    color: "amber",
    categories: [
      {
        id: "PI1",
        name: "Processing Integrity",
        subcategories: [
          {
            id: "PI1.1",
            description:
              "The entity obtains or generates, uses, and communicates relevant, quality information regarding the objectives related to processing, including definitions of data processed and product and service specifications, to support the use of products and services.",
          },
          {
            id: "PI1.2",
            description:
              "The entity implements policies and procedures over system inputs, including controls over completeness and accuracy, to result in products, services, and reporting to meet the entity's objectives.",
          },
          {
            id: "PI1.3",
            description:
              "The entity implements policies and procedures over system processing to result in products, services, and reporting to meet the entity's objectives.",
          },
          {
            id: "PI1.4",
            description:
              "The entity implements policies and procedures to make available or deliver output completely, accurately, and timely in accordance with specifications to meet the entity's objectives.",
          },
          {
            id: "PI1.5",
            description:
              "The entity implements policies and procedures to store inputs, items in processing, and outputs completely, accurately, and timely in accordance with system specifications to meet the entity's objectives.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PRIVACY (P) - 8 categories, 28 criteria
  // ============================================================
  {
    id: "P",
    name: "Privacy",
    description:
      "Personal information is collected, used, retained, disclosed, and disposed of to meet the entity's objectives.",
    color: "red",
    categories: [
      {
        id: "P1",
        name: "Notice and Communication of Objectives",
        subcategories: [
          {
            id: "P1.1",
            description:
              "The entity provides notice to data subjects about its privacy practices to meet the entity's objectives related to privacy. The notice is updated and communicated to data subjects in a timely manner for changes to the entity's privacy practices, including changes in the use of personal information, to meet the entity's objectives related to privacy.",
          },
          {
            id: "P1.2",
            description:
              "The entity's privacy notice includes descriptions of the types of personal information collected, the purposes for which that information is used, how personal information is collected and retained, when information is disclosed or disposed of, and the parties to whom it is disclosed.",
          },
        ],
      },
      {
        id: "P2",
        name: "Choice and Consent",
        subcategories: [
          {
            id: "P2.1",
            description:
              "The entity communicates choices available regarding the collection, use, retention, disclosure, and disposal of personal information to the data subjects and the consequences, if any, of each choice. Explicit consent for the collection, use, retention, disclosure, and disposal of personal information is obtained from data subjects or other authorized persons, if required. Such consent is obtained only for the intended purpose of the information to meet the entity's objectives related to privacy. The entity's basis for determining implicit consent for the collection, use, retention, disclosure, and disposal of personal information is documented.",
          },
        ],
      },
      {
        id: "P3",
        name: "Collection",
        subcategories: [
          {
            id: "P3.1",
            description:
              "Personal information is collected consistent with the entity's objectives related to privacy.",
          },
          {
            id: "P3.2",
            description:
              "For information requiring explicit consent, the entity communicates the need for such consent, as well as the consequences of a failure to provide consent for the request for personal information, and obtains the consent prior to the collection of the information to meet the entity's objectives related to privacy.",
          },
        ],
      },
      {
        id: "P4",
        name: "Use, Retention, and Disposal",
        subcategories: [
          {
            id: "P4.1",
            description:
              "The entity limits the use of personal information to the purposes identified in the entity's objectives related to privacy.",
          },
          {
            id: "P4.2",
            description:
              "The entity retains personal information consistent with the entity's objectives related to privacy.",
          },
          {
            id: "P4.3",
            description:
              "The entity securely disposes of personal information to meet the entity's objectives related to privacy.",
          },
        ],
      },
      {
        id: "P5",
        name: "Access",
        subcategories: [
          {
            id: "P5.1",
            description:
              "The entity grants identified and authenticated data subjects the ability to access their stored personal information for review and, upon request, provides physical or electronic copies of that information to data subjects to meet the entity's objectives related to privacy. If access is denied, data subjects are informed of the denial and reason for such denial, as required, to meet the entity's objectives related to privacy.",
          },
          {
            id: "P5.2",
            description:
              "The entity corrects, amends, or appends personal information based on information provided by data subjects and communicates such corrections, amendments, or appending to third parties who were previously provided with the personal information of the data subject, as committed or required, to meet the entity's objectives related to privacy. If a request for correction is denied, data subjects are informed of the denial and reason for such denial to meet the entity's objectives related to privacy.",
          },
        ],
      },
      {
        id: "P6",
        name: "Disclosure and Notification",
        subcategories: [
          {
            id: "P6.1",
            description:
              "The entity discloses personal information to third parties with the explicit consent of data subjects, and such consent is obtained prior to disclosure to meet the entity's objectives related to privacy.",
          },
          {
            id: "P6.2",
            description:
              "The entity creates and retains a complete, accurate, and timely record of authorized disclosures of personal information to meet the entity's objectives related to privacy.",
          },
          {
            id: "P6.3",
            description:
              "The entity creates and retains a complete, accurate, and timely record of detected or reported unauthorized disclosures (including breaches) of personal information to meet the entity's objectives related to privacy.",
          },
          {
            id: "P6.4",
            description:
              "The entity obtains privacy commitments from vendors and other third parties who have access to personal information to meet the entity's objectives related to privacy. The entity assesses those parties' compliance on a periodic and as-needed basis and takes corrective action, if necessary.",
          },
          {
            id: "P6.5",
            description:
              "The entity obtains commitments from vendors and other third parties with access to personal information to notify the entity in the event of actual or suspected unauthorized disclosures of personal information. Such notifications are acted upon in accordance with established incident response procedures to meet the entity's objectives related to privacy.",
          },
          {
            id: "P6.6",
            description:
              "The entity provides notification of breaches and incidents to affected data subjects, regulators, and others to meet the entity's objectives related to privacy.",
          },
          {
            id: "P6.7",
            description:
              "The entity provides data subjects with an accounting of the personal information held and disclosure of the data subjects' personal information, upon the data subjects' request, to meet the entity's objectives related to privacy.",
          },
        ],
      },
      {
        id: "P7",
        name: "Quality",
        subcategories: [
          {
            id: "P7.1",
            description:
              "The entity collects and maintains accurate, up-to-date, complete, and relevant personal information to meet the entity's objectives related to privacy.",
          },
        ],
      },
      {
        id: "P8",
        name: "Monitoring and Enforcement",
        subcategories: [
          {
            id: "P8.1",
            description:
              "The entity implements a process for receiving, addressing, resolving, and communicating the resolution of inquiries, complaints, and disputes from data subjects and others and periodically monitors compliance to meet the entity's objectives related to privacy. Corrections and other necessary actions related to identified deficiencies are made or taken in a timely manner.",
          },
        ],
      },
    ],
  },
];
