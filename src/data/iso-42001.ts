// ISO/IEC 42001:2023 - Artificial Intelligence Management System (AIMS)
// Source: ISO/IEC 42001:2023 (December 2023)
// Clauses 4-10 (Management System) + Annex A (AI Controls)

import type { FunctionDef } from '../types/assessment';

export const ISO_42001: FunctionDef[] = [
  // ============================================================
  // CLAUSE 4 - CONTEXT OF THE ORGANIZATION
  // ============================================================
  {
    id: "CTX",
    name: "Context of the Organization",
    description:
      "Understanding the organization and its context, the needs and expectations of interested parties, and determining the scope of the AI management system.",
    color: "violet",
    categories: [
      {
        id: "4.1",
        name: "Understanding the Organization and Its Context",
        subcategories: [
          {
            id: "4.1.1",
            description: "Determine external and internal issues relevant to the organization's purpose that affect its ability to achieve the intended outcomes of the AI management system",
          },
          {
            id: "4.1.2",
            description: "Consider AI-specific factors including the state of AI technology, societal expectations regarding AI, and applicable AI-related regulations and standards",
          },
        ],
      },
      {
        id: "4.2",
        name: "Understanding the Needs and Expectations of Interested Parties",
        subcategories: [
          {
            id: "4.2.1",
            description: "Determine interested parties relevant to the AI management system, including AI system users, affected individuals, regulators, and development teams",
          },
          {
            id: "4.2.2",
            description: "Determine requirements of interested parties relevant to responsible AI, including ethical, legal, contractual, and societal expectations",
          },
        ],
      },
      {
        id: "4.3",
        name: "Determining the Scope of the AIMS",
        subcategories: [
          {
            id: "4.3.1",
            description: "Determine the boundaries and applicability of the AI management system, considering internal and external issues, requirements of interested parties, and AI system lifecycle stages",
          },
          {
            id: "4.3.2",
            description: "Document the scope as maintained information, specifying which AI systems, processes, organizational units, and lifecycle phases are covered",
          },
        ],
      },
      {
        id: "4.4",
        name: "AI Management System",
        subcategories: [
          {
            id: "4.4.1",
            description: "Establish, implement, maintain, and continually improve an AI management system including needed processes and their interactions",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CLAUSE 5 - LEADERSHIP
  // ============================================================
  {
    id: "LDR",
    name: "Leadership",
    description:
      "Top management commitment, AI policy establishment, and assignment of organizational roles, responsibilities, and authorities for AI governance.",
    color: "blue",
    categories: [
      {
        id: "5.1",
        name: "Leadership and Commitment",
        subcategories: [
          {
            id: "5.1.1",
            description: "Top management shall demonstrate leadership and commitment by ensuring AI policy and objectives are established and compatible with the strategic direction of the organization",
          },
          {
            id: "5.1.2",
            description: "Ensure the integration of AI management system requirements into the organization's business processes and promote responsible AI practices",
          },
          {
            id: "5.1.3",
            description: "Ensure adequate resources are available for the AI management system and communicate the importance of effective AI management and conformance to requirements",
          },
        ],
      },
      {
        id: "5.2",
        name: "AI Policy",
        subcategories: [
          {
            id: "5.2.1",
            description: "Establish an AI policy appropriate to the organization's purpose that includes a commitment to responsible development and use of AI systems",
          },
          {
            id: "5.2.2",
            description: "Ensure the AI policy provides a framework for setting AI objectives and includes commitments to satisfy applicable requirements and continual improvement",
          },
          {
            id: "5.2.3",
            description: "Communicate the AI policy within the organization and make it available to relevant interested parties as appropriate",
          },
        ],
      },
      {
        id: "5.3",
        name: "Organizational Roles, Responsibilities, and Authorities",
        subcategories: [
          {
            id: "5.3.1",
            description: "Assign responsibility and authority for ensuring the AI management system conforms to requirements and reporting on its performance to top management",
          },
          {
            id: "5.3.2",
            description: "Define roles and responsibilities for AI governance, including accountability for AI system outcomes, ethical oversight, and cross-functional coordination",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CLAUSE 6 - PLANNING
  // ============================================================
  {
    id: "PLN",
    name: "Planning",
    description:
      "Actions to address risks and opportunities related to AI systems, establishment of AI objectives, and planning of changes to the management system.",
    color: "green",
    categories: [
      {
        id: "6.1",
        name: "Actions to Address Risks and Opportunities",
        subcategories: [
          {
            id: "6.1.1",
            description: "Consider issues from clause 4.1 and requirements from 4.2 to determine risks and opportunities that need to be addressed to ensure the AIMS achieves its intended outcomes",
          },
          {
            id: "6.1.2",
            description: "Conduct an AI risk assessment to identify and analyze risks associated with AI systems including risks to individuals, groups, organizations, and society",
          },
          {
            id: "6.1.3",
            description: "Determine and apply an AI risk treatment process, selecting appropriate controls from Annex A or other sources and producing a Statement of Applicability",
          },
          {
            id: "6.1.4",
            description: "Plan actions to address risks and opportunities, integrate actions into AIMS processes, and evaluate the effectiveness of those actions",
          },
        ],
      },
      {
        id: "6.2",
        name: "AI Objectives and Planning to Achieve Them",
        subcategories: [
          {
            id: "6.2.1",
            description: "Establish AI objectives at relevant functions and levels that are consistent with the AI policy, measurable, and take into account applicable requirements",
          },
          {
            id: "6.2.2",
            description: "Plan what will be done, what resources are required, who will be responsible, when it will be completed, and how results will be evaluated for each AI objective",
          },
        ],
      },
      {
        id: "6.3",
        name: "Planning of Changes",
        subcategories: [
          {
            id: "6.3.1",
            description: "When changes to the AI management system are needed, carry them out in a planned manner considering the purpose, consequences, integrity, and resource availability",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CLAUSE 7 - SUPPORT
  // ============================================================
  {
    id: "SUP",
    name: "Support",
    description:
      "Resources, competence, awareness, communication, and documented information needed to support the AI management system.",
    color: "amber",
    categories: [
      {
        id: "7.1",
        name: "Resources",
        subcategories: [
          {
            id: "7.1.1",
            description: "Determine and provide resources needed for the establishment, implementation, maintenance, and continual improvement of the AI management system",
          },
        ],
      },
      {
        id: "7.2",
        name: "Competence",
        subcategories: [
          {
            id: "7.2.1",
            description: "Determine necessary competence for persons doing work under the AIMS that affects AI performance, including technical AI skills and understanding of responsible AI",
          },
          {
            id: "7.2.2",
            description: "Ensure persons are competent through education, training, or experience and take actions to acquire competence where gaps exist, retaining evidence of competence",
          },
        ],
      },
      {
        id: "7.3",
        name: "Awareness",
        subcategories: [
          {
            id: "7.3.1",
            description: "Ensure persons working under the AIMS are aware of the AI policy, their contribution to AIMS effectiveness, and the implications of not conforming to requirements",
          },
        ],
      },
      {
        id: "7.4",
        name: "Communication",
        subcategories: [
          {
            id: "7.4.1",
            description: "Determine internal and external communications relevant to the AIMS including what, when, with whom, and how to communicate about AI management matters",
          },
        ],
      },
      {
        id: "7.5",
        name: "Documented Information",
        subcategories: [
          {
            id: "7.5.1",
            description: "Include documented information required by the standard and determined by the organization as necessary for AIMS effectiveness, including AI system documentation",
          },
          {
            id: "7.5.2",
            description: "Control documented information to ensure it is available, suitable for use, adequately protected, and subject to distribution, access, retrieval, and retention controls",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CLAUSE 8 - OPERATION
  // ============================================================
  {
    id: "OPS",
    name: "Operation",
    description:
      "Operational planning and control, AI risk assessment execution, AI risk treatment implementation, and management of AI system lifecycle processes.",
    color: "orange",
    categories: [
      {
        id: "8.1",
        name: "Operational Planning and Control",
        subcategories: [
          {
            id: "8.1.1",
            description: "Plan, implement, and control processes needed to meet AI management system requirements and implement actions determined in planning",
          },
          {
            id: "8.1.2",
            description: "Control planned changes and review consequences of unintended changes, taking action to mitigate adverse effects on AI system performance and safety",
          },
          {
            id: "8.1.3",
            description: "Ensure externally provided AI processes, products, and services relevant to the AIMS are controlled through appropriate agreements and oversight",
          },
        ],
      },
      {
        id: "8.2",
        name: "AI Risk Assessment",
        subcategories: [
          {
            id: "8.2.1",
            description: "Perform AI risk assessments at planned intervals or when significant changes are proposed, considering impacts on individuals, groups, and society",
          },
          {
            id: "8.2.2",
            description: "Retain documented information of the results of AI risk assessments including identified risks, their analysis, and evaluation outcomes",
          },
        ],
      },
      {
        id: "8.3",
        name: "AI Risk Treatment",
        subcategories: [
          {
            id: "8.3.1",
            description: "Implement the AI risk treatment plan and retain documented information of the results of AI risk treatment actions",
          },
        ],
      },
      {
        id: "8.4",
        name: "AI System Impact Assessment",
        subcategories: [
          {
            id: "8.4.1",
            description: "Conduct AI system impact assessments for AI systems within scope, evaluating potential consequences on individuals, communities, and society before deployment",
          },
          {
            id: "8.4.2",
            description: "Document and maintain records of impact assessments, review them when changes occur, and use results to inform risk treatment and system design decisions",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CLAUSE 9 - PERFORMANCE EVALUATION
  // ============================================================
  {
    id: "EVL",
    name: "Performance Evaluation",
    description:
      "Monitoring, measurement, analysis, evaluation, internal audit, and management review of the AI management system.",
    color: "teal",
    categories: [
      {
        id: "9.1",
        name: "Monitoring, Measurement, Analysis, and Evaluation",
        subcategories: [
          {
            id: "9.1.1",
            description: "Determine what needs to be monitored and measured for the AIMS, including AI system performance, fairness, safety, and conformity to objectives",
          },
          {
            id: "9.1.2",
            description: "Determine methods for monitoring, measurement, analysis, and evaluation to ensure valid results, and define when monitoring and measuring shall be performed",
          },
          {
            id: "9.1.3",
            description: "Evaluate AI management system performance and effectiveness, retaining documented information as evidence of the results",
          },
        ],
      },
      {
        id: "9.2",
        name: "Internal Audit",
        subcategories: [
          {
            id: "9.2.1",
            description: "Conduct internal audits at planned intervals to determine whether the AIMS conforms to the organization's own requirements and the requirements of this standard",
          },
          {
            id: "9.2.2",
            description: "Plan, establish, implement, and maintain an audit program including frequency, methods, responsibilities, and reporting, ensuring auditor objectivity and impartiality",
          },
        ],
      },
      {
        id: "9.3",
        name: "Management Review",
        subcategories: [
          {
            id: "9.3.1",
            description: "Top management shall review the AIMS at planned intervals considering the status of actions, changes in external and internal issues, and AI performance trends",
          },
          {
            id: "9.3.2",
            description: "Management review outputs shall include decisions related to continual improvement opportunities and any need for changes to the AI management system",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CLAUSE 10 - IMPROVEMENT
  // ============================================================
  {
    id: "IMP",
    name: "Improvement",
    description:
      "Managing nonconformities, implementing corrective actions, and driving continual improvement of the AI management system.",
    color: "indigo",
    categories: [
      {
        id: "10.1",
        name: "Nonconformity and Corrective Action",
        subcategories: [
          {
            id: "10.1.1",
            description: "When a nonconformity occurs, react to control and correct it, deal with consequences, and evaluate the need for action to eliminate causes so it does not recur",
          },
          {
            id: "10.1.2",
            description: "Implement corrective actions appropriate to the effects of nonconformities, review their effectiveness, and make changes to the AIMS if necessary",
          },
        ],
      },
      {
        id: "10.2",
        name: "Continual Improvement",
        subcategories: [
          {
            id: "10.2.1",
            description: "Continually improve the suitability, adequacy, and effectiveness of the AI management system through policy reviews, objective assessments, and lessons learned",
          },
          {
            id: "10.2.2",
            description: "Incorporate feedback from AI system monitoring, incident reports, and stakeholder input to drive systematic improvement of AI governance and operational practices",
          },
        ],
      },
    ],
  },

  // ============================================================
  // ANNEX A - AI CONTROLS
  // ============================================================
  {
    id: "AAI",
    name: "Annex A: AI Controls",
    description:
      "Reference controls for managing AI-specific risks across policy, organization, resources, impact assessment, lifecycle, data governance, transparency, use, and third-party relationships.",
    color: "pink",
    categories: [
      {
        id: "A.2",
        name: "AI Policies",
        subcategories: [
          {
            id: "A.2.1",
            description: "Establish and maintain an AI policy that addresses responsible development and use of AI, aligned with organizational values and applicable regulations",
          },
          {
            id: "A.2.2",
            description: "Define and document policies for ethical AI principles, including fairness, transparency, accountability, and human oversight of AI systems",
          },
          {
            id: "A.2.3",
            description: "Review and update AI policies at defined intervals and when significant changes occur in the regulatory landscape, technology, or organizational context",
          },
        ],
      },
      {
        id: "A.3",
        name: "Internal Organization",
        subcategories: [
          {
            id: "A.3.1",
            description: "Define accountability for AI systems by assigning clear roles and responsibilities for AI governance, development, deployment, and monitoring",
          },
          {
            id: "A.3.2",
            description: "Establish cross-functional AI governance structures including oversight committees or boards with appropriate authority and expertise",
          },
          {
            id: "A.3.3",
            description: "Allocate and manage responsibilities for AI risk management across the organization, ensuring no gaps in accountability throughout the AI system lifecycle",
          },
          {
            id: "A.3.4",
            description: "Implement reporting mechanisms for AI incidents, concerns, and near-misses to enable timely escalation and organizational learning",
          },
        ],
      },
      {
        id: "A.4",
        name: "Resources for AI Systems",
        subcategories: [
          {
            id: "A.4.1",
            description: "Determine and provide computational resources, infrastructure, and tools necessary for the secure and reliable operation of AI systems",
          },
          {
            id: "A.4.2",
            description: "Identify AI competence requirements and provide training, education, and awareness programs to personnel involved in AI activities",
          },
          {
            id: "A.4.3",
            description: "Maintain awareness of emerging AI technologies, methodologies, and best practices to ensure organizational capabilities remain current",
          },
          {
            id: "A.4.4",
            description: "Establish processes for acquiring, developing, and retaining personnel with necessary AI skills, including technical, ethical, and domain expertise",
          },
        ],
      },
      {
        id: "A.5",
        name: "Assessing Impacts of AI Systems",
        subcategories: [
          {
            id: "A.5.1",
            description: "Establish a methodology for assessing the potential impacts of AI systems on individuals, groups, communities, and society prior to development or deployment",
          },
          {
            id: "A.5.2",
            description: "Assess AI system impacts on human rights, including privacy, non-discrimination, freedom of expression, and other fundamental rights",
          },
          {
            id: "A.5.3",
            description: "Evaluate environmental impacts of AI systems including energy consumption, carbon footprint, and resource utilization throughout the system lifecycle",
          },
          {
            id: "A.5.4",
            description: "Document impact assessment results, communicate findings to relevant stakeholders, and use outcomes to inform AI system design and risk treatment decisions",
          },
        ],
      },
      {
        id: "A.6",
        name: "AI System Lifecycle",
        subcategories: [
          {
            id: "A.6.1",
            description: "Define and manage AI system lifecycle processes from conception through retirement, including requirements specification, design, development, testing, and deployment",
          },
          {
            id: "A.6.2",
            description: "Establish procedures for AI model development including selection of algorithms, training approaches, hyperparameter tuning, and model validation",
          },
          {
            id: "A.6.3",
            description: "Implement verification and validation processes for AI systems to confirm they meet specified requirements and perform as intended within acceptable parameters",
          },
          {
            id: "A.6.4",
            description: "Define deployment procedures including staged rollout, canary testing, rollback capabilities, and production readiness criteria for AI systems",
          },
          {
            id: "A.6.5",
            description: "Establish processes for ongoing monitoring of AI system performance, detecting model drift, concept drift, and degradation in operational environments",
          },
          {
            id: "A.6.6",
            description: "Define procedures for AI system maintenance, retraining, version control, and configuration management throughout the operational lifecycle",
          },
          {
            id: "A.6.7",
            description: "Plan and manage AI system retirement and decommissioning including data disposition, knowledge transfer, and transition to replacement systems",
          },
        ],
      },
      {
        id: "A.7",
        name: "Data for AI Systems",
        subcategories: [
          {
            id: "A.7.1",
            description: "Establish data governance policies for AI systems covering data collection, storage, processing, quality, and lifecycle management",
          },
          {
            id: "A.7.2",
            description: "Assess and document the provenance, quality, and suitability of data used for AI system training, testing, and validation",
          },
          {
            id: "A.7.3",
            description: "Implement processes to identify and mitigate bias in training data, including assessment of representativeness, labeling quality, and potential sources of unfairness",
          },
          {
            id: "A.7.4",
            description: "Ensure data privacy and protection measures are applied to personal and sensitive data used in AI systems, compliant with applicable data protection regulations",
          },
          {
            id: "A.7.5",
            description: "Manage data preparation processes including cleaning, transformation, augmentation, and feature engineering with appropriate documentation and traceability",
          },
        ],
      },
      {
        id: "A.8",
        name: "Information for Interested Parties",
        subcategories: [
          {
            id: "A.8.1",
            description: "Provide transparent information to interested parties about AI system capabilities, limitations, intended use, and potential risks in accessible formats",
          },
          {
            id: "A.8.2",
            description: "Communicate to users and affected parties when they are interacting with or subject to decisions made by AI systems",
          },
          {
            id: "A.8.3",
            description: "Provide meaningful explanations of AI system outputs and decisions at an appropriate level of detail for the audience and context",
          },
          {
            id: "A.8.4",
            description: "Maintain and publish documentation about AI system development processes, data sources, performance metrics, and known limitations",
          },
        ],
      },
      {
        id: "A.9",
        name: "Use of AI Systems",
        subcategories: [
          {
            id: "A.9.1",
            description: "Define acceptable use policies for AI systems specifying approved purposes, prohibited uses, and boundaries for autonomous decision-making",
          },
          {
            id: "A.9.2",
            description: "Implement human oversight mechanisms proportionate to the risk level of AI systems, including human-in-the-loop, human-on-the-loop, or human-in-command controls",
          },
          {
            id: "A.9.3",
            description: "Establish procedures for users to report issues, provide feedback, and contest AI system outputs or decisions through accessible channels",
          },
          {
            id: "A.9.4",
            description: "Monitor AI system use patterns to detect misuse, unintended applications, or emergent behaviors that deviate from designed operating parameters",
          },
        ],
      },
      {
        id: "A.10",
        name: "Third-party and Customer Relationships",
        subcategories: [
          {
            id: "A.10.1",
            description: "Assess and manage AI-related risks associated with third-party suppliers, including AI model providers, data providers, and cloud AI service platforms",
          },
          {
            id: "A.10.2",
            description: "Establish contractual requirements with third parties covering AI system performance, data handling, liability, transparency, and compliance obligations",
          },
          {
            id: "A.10.3",
            description: "Monitor third-party AI components and services for continued conformance to requirements, performance standards, and organizational policies",
          },
          {
            id: "A.10.4",
            description: "Define responsibilities and communication channels with customers and downstream users of AI systems regarding capabilities, limitations, and support",
          },
          {
            id: "A.10.5",
            description: "Establish processes for managing the supply chain of AI components including pre-trained models, datasets, and AI-enabled services to ensure provenance and trustworthiness",
          },
        ],
      },
    ],
  },
];
