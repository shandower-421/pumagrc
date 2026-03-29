// NIST SP 800-53 Rev 5 - Security and Privacy Controls
// Source: NIST Special Publication 800-53 Revision 5 (September 2020, updated December 2020)
// https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final

import type { FunctionDef } from '../types/assessment';

export const NIST_800_53: FunctionDef[] = [
  // ============================================================
  // ACCESS CONTROL (AC) - 25 base controls
  // ============================================================
  {
    id: "AC",
    name: "Access Control",
    description:
      "Policies and procedures for limiting information system access to authorized users, processes, and devices.",
    color: "blue",
    categories: [
      {
        id: "AC.POLICY",
        name: "Policy & Account Management",
        subcategories: [
          {
            id: "AC-1",
            description:
              "Develop, document, and disseminate access control policy and procedures",
          },
          {
            id: "AC-2",
            description:
              "Manage information system accounts including establishing, activating, modifying, reviewing, disabling, and removing accounts",
          },
          {
            id: "AC-3",
            description:
              "Enforce approved authorizations for logical access to information and system resources",
          },
          {
            id: "AC-4",
            description:
              "Enforce approved authorizations for controlling the flow of information within the system and between systems",
          },
        ],
      },
      {
        id: "AC.SEPARATION",
        name: "Separation of Duties & Least Privilege",
        subcategories: [
          {
            id: "AC-5",
            description:
              "Separate duties of individuals to reduce risk of malevolent activity without collusion",
          },
          {
            id: "AC-6",
            description:
              "Employ the principle of least privilege, allowing only authorized access needed for organizational tasks",
          },
          {
            id: "AC-7",
            description:
              "Enforce a limit of consecutive invalid logon attempts and automatically lock or delay further attempts",
          },
        ],
      },
      {
        id: "AC.NOTIFICATION",
        name: "System Use & Notifications",
        subcategories: [
          {
            id: "AC-8",
            description:
              "Display an approved system use notification message before granting access providing privacy and security notices",
          },
          {
            id: "AC-9",
            description:
              "Notify the user upon successful logon of the date and time of the last logon",
          },
          {
            id: "AC-10",
            description:
              "Limit the number of concurrent sessions for each system account",
          },
          {
            id: "AC-11",
            description:
              "Prevent further access to the system by initiating a session lock after a defined period of inactivity",
          },
          {
            id: "AC-12",
            description:
              "Automatically terminate a user session after defined conditions or trigger events",
          },
        ],
      },
      {
        id: "AC.REMOTE",
        name: "Remote & Wireless Access",
        subcategories: [
          {
            id: "AC-14",
            description:
              "Identify user actions that can be performed without identification or authentication",
          },
          {
            id: "AC-17",
            description:
              "Establish and document usage restrictions, configuration requirements, and connection requirements for remote access",
          },
          {
            id: "AC-18",
            description:
              "Establish and document usage restrictions, configuration requirements, and connection requirements for wireless access",
          },
          {
            id: "AC-19",
            description:
              "Establish and document usage restrictions, configuration requirements, and connection requirements for mobile devices",
          },
          {
            id: "AC-20",
            description:
              "Establish terms and conditions for authorized use of external information systems",
          },
        ],
      },
      {
        id: "AC.SHARING",
        name: "Information Sharing & Public Access",
        subcategories: [
          {
            id: "AC-21",
            description:
              "Facilitate information sharing by enabling authorized users to determine access to sharing partners",
          },
          {
            id: "AC-22",
            description:
              "Designate individuals authorized to make information publicly accessible and review content prior to posting",
          },
          {
            id: "AC-24",
            description:
              "Establish and enforce access control decisions based on defined security and privacy attributes",
          },
          {
            id: "AC-25",
            description:
              "Implement a reference monitor that is tamper-proof, always invoked, and small enough to be subject to analysis",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AWARENESS AND TRAINING (AT) - 6 base controls
  // ============================================================
  {
    id: "AT",
    name: "Awareness and Training",
    description:
      "Ensuring personnel are adequately trained and aware of security and privacy risks and responsibilities.",
    color: "purple",
    categories: [
      {
        id: "AT.TRAINING",
        name: "Training Program",
        subcategories: [
          {
            id: "AT-1",
            description:
              "Develop, document, and disseminate awareness and training policy and procedures",
          },
          {
            id: "AT-2",
            description:
              "Provide security and privacy literacy awareness training to users including recognizing social engineering and other threats",
          },
          {
            id: "AT-3",
            description:
              "Provide role-based security and privacy training to personnel with assigned security roles before authorizing access and periodically thereafter",
          },
          {
            id: "AT-4",
            description:
              "Document and monitor individual information system security and privacy training activities",
          },
          {
            id: "AT-5",
            description:
              "Provide training to users on contacts with external organizations regarding security threats and reporting",
          },
          {
            id: "AT-6",
            description:
              "Institute training feedback mechanism to improve the training program",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AUDIT AND ACCOUNTABILITY (AU) - 16 base controls
  // ============================================================
  {
    id: "AU",
    name: "Audit and Accountability",
    description:
      "Policies and mechanisms for creating, protecting, retaining, and reviewing system audit records.",
    color: "green",
    categories: [
      {
        id: "AU.POLICY",
        name: "Audit Policy & Events",
        subcategories: [
          {
            id: "AU-1",
            description:
              "Develop, document, and disseminate audit and accountability policy and procedures",
          },
          {
            id: "AU-2",
            description:
              "Identify the types of events that the system is capable of logging and coordinate the audit function with other entities",
          },
          {
            id: "AU-3",
            description:
              "Ensure that audit records contain information that establishes what occurred, when, where, source, outcome, and identity",
          },
        ],
      },
      {
        id: "AU.STORAGE",
        name: "Audit Storage & Capacity",
        subcategories: [
          {
            id: "AU-4",
            description:
              "Allocate audit log storage capacity and configure auditing to reduce the likelihood of capacity being exceeded",
          },
          {
            id: "AU-5",
            description:
              "Alert designated personnel in the event of an audit logging process failure and take defined additional actions",
          },
          {
            id: "AU-6",
            description:
              "Review and analyze information system audit records for indications of inappropriate or unusual activity",
          },
        ],
      },
      {
        id: "AU.REDUCTION",
        name: "Audit Reduction & Reporting",
        subcategories: [
          {
            id: "AU-7",
            description:
              "Provide and implement an audit record reduction and report generation capability",
          },
          {
            id: "AU-8",
            description:
              "Use internal system clocks to generate time stamps for audit records",
          },
          {
            id: "AU-9",
            description:
              "Protect audit information and audit logging tools from unauthorized access, modification, and deletion",
          },
          {
            id: "AU-10",
            description:
              "Provide irrefutable evidence that actions were performed by specific individuals (non-repudiation)",
          },
        ],
      },
      {
        id: "AU.RETENTION",
        name: "Retention & Generation",
        subcategories: [
          {
            id: "AU-11",
            description:
              "Retain audit records for a defined time period to provide support for after-the-fact investigations",
          },
          {
            id: "AU-12",
            description:
              "Provide audit record generation capability for auditable events at all system components",
          },
          {
            id: "AU-13",
            description:
              "Monitor open source information and information sites for evidence of unauthorized disclosure",
          },
          {
            id: "AU-14",
            description:
              "Provide the capability for authorized users to select a user session to capture and record",
          },
          {
            id: "AU-16",
            description:
              "Employ defined methods for coordinating audit information among external organizations",
          },
        ],
      },
    ],
  },

  // ============================================================
  // ASSESSMENT, AUTHORIZATION, AND MONITORING (CA) - 9 base controls
  // ============================================================
  {
    id: "CA",
    name: "Assessment, Authorization, and Monitoring",
    description:
      "Policies for assessing security controls, authorizing system operations, and monitoring controls on an ongoing basis.",
    color: "amber",
    categories: [
      {
        id: "CA.ASSESSMENT",
        name: "Assessment & Authorization",
        subcategories: [
          {
            id: "CA-1",
            description:
              "Develop, document, and disseminate assessment, authorization, and monitoring policy and procedures",
          },
          {
            id: "CA-2",
            description:
              "Develop a security and privacy assessment plan, assess controls, produce a report, and provide results to authorizing officials",
          },
          {
            id: "CA-3",
            description:
              "Approve and manage the exchange of information between the system and other systems using interconnection security agreements",
          },
          {
            id: "CA-5",
            description:
              "Develop a plan of action and milestones to document planned remedial actions and track progress",
          },
          {
            id: "CA-6",
            description:
              "Assign a senior official to authorize system operation and accept associated security and privacy risk",
          },
        ],
      },
      {
        id: "CA.MONITORING",
        name: "Continuous Monitoring",
        subcategories: [
          {
            id: "CA-7",
            description:
              "Develop a continuous monitoring strategy and program including metrics, monitoring frequency, and ongoing assessments",
          },
          {
            id: "CA-8",
            description:
              "Conduct penetration testing on defined systems at a defined frequency",
          },
          {
            id: "CA-9",
            description:
              "Authorize and monitor internal system connections and document characteristics of each connection",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONFIGURATION MANAGEMENT (CM) - 14 base controls
  // ============================================================
  {
    id: "CM",
    name: "Configuration Management",
    description:
      "Policies for establishing and maintaining baseline configurations and inventories of organizational systems.",
    color: "orange",
    categories: [
      {
        id: "CM.BASELINE",
        name: "Baseline Configuration",
        subcategories: [
          {
            id: "CM-1",
            description:
              "Develop, document, and disseminate configuration management policy and procedures",
          },
          {
            id: "CM-2",
            description:
              "Develop, document, and maintain a current baseline configuration of the information system",
          },
          {
            id: "CM-3",
            description:
              "Determine and document types of changes to the system that are configuration-controlled",
          },
          {
            id: "CM-4",
            description:
              "Analyze changes to the system to determine potential security and privacy impacts prior to implementation",
          },
        ],
      },
      {
        id: "CM.SETTINGS",
        name: "Settings & Restrictions",
        subcategories: [
          {
            id: "CM-5",
            description:
              "Define, document, approve, and enforce logical access restrictions associated with changes to the system",
          },
          {
            id: "CM-6",
            description:
              "Establish and document configuration settings for components using the most restrictive mode consistent with requirements",
          },
          {
            id: "CM-7",
            description:
              "Configure the system to provide only mission-essential capabilities and restrict the use of non-essential functions",
          },
          {
            id: "CM-8",
            description:
              "Develop and document an inventory of system components that accurately reflects the system and is at a level of granularity necessary for tracking",
          },
        ],
      },
      {
        id: "CM.INTEGRITY",
        name: "Integrity & Software Usage",
        subcategories: [
          {
            id: "CM-9",
            description:
              "Develop, document, and implement a configuration management plan that addresses roles, responsibilities, and processes",
          },
          {
            id: "CM-10",
            description:
              "Use software and associated documentation in accordance with contract agreements and copyright laws",
          },
          {
            id: "CM-11",
            description:
              "Establish and enforce policies governing the installation of software by users",
          },
          {
            id: "CM-12",
            description:
              "Maintain awareness of information locations to ensure adequate protection and to limit exposure when a breach occurs",
          },
          {
            id: "CM-14",
            description:
              "Restrict the use of signed components in connection to the information system",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONTINGENCY PLANNING (CP) - 13 base controls
  // ============================================================
  {
    id: "CP",
    name: "Contingency Planning",
    description:
      "Policies and procedures for continuity of operations during system disruptions, compromises, or failures.",
    color: "red",
    categories: [
      {
        id: "CP.PLANNING",
        name: "Contingency Plan",
        subcategories: [
          {
            id: "CP-1",
            description:
              "Develop, document, and disseminate contingency planning policy and procedures",
          },
          {
            id: "CP-2",
            description:
              "Develop a contingency plan that identifies essential missions, recovery objectives, restoration priorities, and roles and responsibilities",
          },
          {
            id: "CP-3",
            description:
              "Provide contingency training to system users consistent with assigned roles and responsibilities",
          },
          {
            id: "CP-4",
            description:
              "Test the contingency plan at a defined frequency using defined tests to determine effectiveness and readiness to execute",
          },
        ],
      },
      {
        id: "CP.BACKUP",
        name: "Backup & Recovery",
        subcategories: [
          {
            id: "CP-6",
            description:
              "Establish an alternate storage site geographically separated from the primary site",
          },
          {
            id: "CP-7",
            description:
              "Establish an alternate processing site that permits transfer and resumption of system operations",
          },
          {
            id: "CP-8",
            description:
              "Establish alternate telecommunications services to permit resumption of operations",
          },
          {
            id: "CP-9",
            description:
              "Conduct backups of user-level, system-level, and security-related information at a defined frequency",
          },
          {
            id: "CP-10",
            description:
              "Provide for the recovery and reconstitution of the system to a known state after a disruption or failure",
          },
        ],
      },
      {
        id: "CP.RESILIENCE",
        name: "System Resilience",
        subcategories: [
          {
            id: "CP-11",
            description:
              "Provide alternative communications mechanisms for the purpose of customer support",
          },
          {
            id: "CP-12",
            description:
              "Implement a safe mode of operation when defined conditions are detected",
          },
          {
            id: "CP-13",
            description:
              "Employ alternative or supplemental security mechanisms when the primary means are unavailable",
          },
        ],
      },
    ],
  },

  // ============================================================
  // IDENTIFICATION AND AUTHENTICATION (IA) - 12 base controls
  // ============================================================
  {
    id: "IA",
    name: "Identification and Authentication",
    description:
      "Policies for identifying and authenticating users, devices, and services before granting access.",
    color: "teal",
    categories: [
      {
        id: "IA.POLICY",
        name: "Policy & User Authentication",
        subcategories: [
          {
            id: "IA-1",
            description:
              "Develop, document, and disseminate identification and authentication policy and procedures",
          },
          {
            id: "IA-2",
            description:
              "Uniquely identify and authenticate organizational users or processes acting on behalf of organizational users",
          },
          {
            id: "IA-3",
            description:
              "Uniquely identify and authenticate devices before establishing a local, remote, or network connection",
          },
          {
            id: "IA-4",
            description:
              "Manage information system identifiers by receiving authorization, selecting, assigning, and preventing reuse of identifiers",
          },
          {
            id: "IA-5",
            description:
              "Manage system authenticators by verifying identity, establishing initial authenticator content, and ensuring adequate strength",
          },
        ],
      },
      {
        id: "IA.MANAGEMENT",
        name: "Authenticator Management",
        subcategories: [
          {
            id: "IA-6",
            description:
              "Obscure feedback of authentication information during the authentication process",
          },
          {
            id: "IA-7",
            description:
              "Employ mechanisms for authentication to a cryptographic module that meet applicable laws and regulations",
          },
          {
            id: "IA-8",
            description:
              "Uniquely identify and authenticate non-organizational users or processes acting on behalf of non-organizational users",
          },
          {
            id: "IA-9",
            description:
              "Identify and authenticate services before establishing communications with the service",
          },
          {
            id: "IA-10",
            description:
              "Require individuals accessing the system to employ supplemental authentication techniques as a condition of access",
          },
          {
            id: "IA-11",
            description:
              "Require users to re-authenticate when defined circumstances or situations require re-authentication",
          },
          {
            id: "IA-12",
            description:
              "Identity proof users that require accounts for logical access based on appropriate identity evidence",
          },
        ],
      },
    ],
  },

  // ============================================================
  // INCIDENT RESPONSE (IR) - 10 base controls
  // ============================================================
  {
    id: "IR",
    name: "Incident Response",
    description:
      "Policies for preparing, detecting, analyzing, containing, recovering from, and reporting security incidents.",
    color: "indigo",
    categories: [
      {
        id: "IR.PLANNING",
        name: "Incident Response Planning",
        subcategories: [
          {
            id: "IR-1",
            description:
              "Develop, document, and disseminate incident response policy and procedures",
          },
          {
            id: "IR-2",
            description:
              "Provide incident response training to system users consistent with assigned roles and responsibilities",
          },
          {
            id: "IR-3",
            description:
              "Test the incident response capability using defined tests at a defined frequency",
          },
          {
            id: "IR-4",
            description:
              "Implement an incident handling capability that includes preparation, detection, analysis, containment, eradication, and recovery",
          },
        ],
      },
      {
        id: "IR.HANDLING",
        name: "Monitoring & Reporting",
        subcategories: [
          {
            id: "IR-5",
            description:
              "Track and document information system security incidents",
          },
          {
            id: "IR-6",
            description:
              "Require personnel to report suspected security and privacy incidents to the organizational incident response capability",
          },
          {
            id: "IR-7",
            description:
              "Provide an incident response support resource integral to the organizational capability that offers advice and assistance",
          },
          {
            id: "IR-8",
            description:
              "Develop an incident response plan that provides a roadmap for implementing the incident response capability",
          },
        ],
      },
      {
        id: "IR.ANALYSIS",
        name: "Analysis & Improvements",
        subcategories: [
          {
            id: "IR-9",
            description:
              "Address information spillage by identifying, alerting, isolating, and eradicating contamination",
          },
          {
            id: "IR-10",
            description:
              "Establish an integrated team of forensic and incident response personnel",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MAINTENANCE (MA) - 7 base controls
  // ============================================================
  {
    id: "MA",
    name: "Maintenance",
    description:
      "Policies for performing timely and effective maintenance on organizational information systems.",
    color: "pink",
    categories: [
      {
        id: "MA.OPERATIONS",
        name: "Maintenance Operations",
        subcategories: [
          {
            id: "MA-1",
            description:
              "Develop, document, and disseminate system maintenance policy and procedures",
          },
          {
            id: "MA-2",
            description:
              "Schedule, document, and review records of maintenance and repairs on information system components",
          },
          {
            id: "MA-3",
            description:
              "Approve, control, and monitor the use of information system maintenance tools",
          },
          {
            id: "MA-4",
            description:
              "Approve and monitor nonlocal maintenance and diagnostic activities including the use of diagnostic ports",
          },
          {
            id: "MA-5",
            description:
              "Establish a process for maintenance personnel authorization and maintain a list of authorized maintenance organizations or personnel",
          },
          {
            id: "MA-6",
            description:
              "Obtain maintenance support and spare parts for defined system components within a defined time period",
          },
          {
            id: "MA-7",
            description:
              "Remove the information system or system components from the operational environment to an off-site facility for maintenance when not feasible on-site",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MEDIA PROTECTION (MP) - 8 base controls
  // ============================================================
  {
    id: "MP",
    name: "Media Protection",
    description:
      "Policies for protecting, sanitizing, transporting, and controlling access to information system media.",
    color: "cyan",
    categories: [
      {
        id: "MP.ACCESS",
        name: "Access & Marking",
        subcategories: [
          {
            id: "MP-1",
            description:
              "Develop, document, and disseminate media protection policy and procedures",
          },
          {
            id: "MP-2",
            description:
              "Restrict access to defined types of digital and non-digital media to defined personnel or roles",
          },
          {
            id: "MP-3",
            description:
              "Mark information system media indicating the distribution limitations, handling caveats, and applicable security markings",
          },
          {
            id: "MP-4",
            description:
              "Physically control and securely store digital and non-digital media within controlled areas",
          },
        ],
      },
      {
        id: "MP.DISPOSAL",
        name: "Transport & Sanitization",
        subcategories: [
          {
            id: "MP-5",
            description:
              "Protect and control digital and non-digital media during transport outside of controlled areas using defined security measures",
          },
          {
            id: "MP-6",
            description:
              "Sanitize information system media prior to disposal, release out of organizational control, or release for reuse",
          },
          {
            id: "MP-7",
            description:
              "Restrict the use of defined types of information system media on defined systems or system components",
          },
          {
            id: "MP-8",
            description:
              "Document and restrict media downgrading actions and activities in accordance with defined policies",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHYSICAL AND ENVIRONMENTAL PROTECTION (PE) - 23 base controls
  // ============================================================
  {
    id: "PE",
    name: "Physical and Environmental Protection",
    description:
      "Policies for limiting physical access to systems and the facility environment, and protecting against environmental hazards.",
    color: "lime",
    categories: [
      {
        id: "PE.ACCESS",
        name: "Physical Access Control",
        subcategories: [
          {
            id: "PE-1",
            description:
              "Develop, document, and disseminate physical and environmental protection policy and procedures",
          },
          {
            id: "PE-2",
            description:
              "Enforce physical access authorizations at defined entry and exit points by verifying individual access authorizations before granting access",
          },
          {
            id: "PE-3",
            description:
              "Enforce physical access authorizations at defined entry and exit points to the facility using physical access control systems and guards",
          },
          {
            id: "PE-4",
            description:
              "Control physical access to information system distribution and transmission lines within organizational facilities",
          },
          {
            id: "PE-5",
            description:
              "Control physical access to information system output devices to prevent unauthorized individuals from obtaining output",
          },
          {
            id: "PE-6",
            description:
              "Monitor physical access to the facility and review physical access logs at a defined frequency",
          },
        ],
      },
      {
        id: "PE.VISITORS",
        name: "Visitor & Delivery Controls",
        subcategories: [
          {
            id: "PE-7",
            description:
              "Control physical access by authenticating visitors before authorizing access to the facility",
          },
          {
            id: "PE-8",
            description:
              "Maintain visitor access records to the facility including name, organization, signature, and form of identification",
          },
          {
            id: "PE-16",
            description:
              "Authorize and control the entry and exit of defined types of information system components and maintain records of those items",
          },
        ],
      },
      {
        id: "PE.ENVIRONMENTAL",
        name: "Environmental Protection",
        subcategories: [
          {
            id: "PE-9",
            description:
              "Protect the information system from damage resulting from power equipment and cabling failures",
          },
          {
            id: "PE-10",
            description:
              "Provide the capability of shutting off power to the information system or individual system components in emergency situations",
          },
          {
            id: "PE-11",
            description:
              "Employ and maintain an uninterruptible power supply to facilitate an orderly shutdown during primary power source loss",
          },
          {
            id: "PE-12",
            description:
              "Employ and maintain emergency lighting for the information system that activates automatically in the event of a power outage",
          },
          {
            id: "PE-13",
            description:
              "Employ and maintain fire detection and suppression systems that are supported by an independent energy source",
          },
          {
            id: "PE-14",
            description:
              "Maintain temperature and humidity levels within the facility at defined acceptable levels",
          },
          {
            id: "PE-15",
            description:
              "Protect the information system from damage resulting from water leakage by providing master shutoff or isolation valves",
          },
        ],
      },
      {
        id: "PE.ALTERNATE",
        name: "Alternate & Location Controls",
        subcategories: [
          {
            id: "PE-17",
            description:
              "Employ management, operational, and technical controls at alternate work sites equivalent to those at the primary site",
          },
          {
            id: "PE-18",
            description:
              "Position information system components within the facility to minimize potential damage from physical and environmental hazards",
          },
          {
            id: "PE-20",
            description:
              "Employ asset monitoring and tracking technologies to protect and monitor the movement of defined assets within defined controlled areas",
          },
          {
            id: "PE-23",
            description:
              "Employ defined security measures to protect facility and system components from defined environmental threats",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PLANNING (PL) - 11 base controls
  // ============================================================
  {
    id: "PL",
    name: "Planning",
    description:
      "Policies for developing, documenting, updating, and implementing security and privacy plans for organizational systems.",
    color: "rose",
    categories: [
      {
        id: "PL.PLANS",
        name: "System Security Plans",
        subcategories: [
          {
            id: "PL-1",
            description:
              "Develop, document, and disseminate security and privacy planning policy and procedures",
          },
          {
            id: "PL-2",
            description:
              "Develop, document, review, and update security and privacy plans that describe the system boundary, environment, and how controls are implemented",
          },
          {
            id: "PL-4",
            description:
              "Establish and make available rules of behavior to individuals who require access to the system and receive signed acknowledgment",
          },
        ],
      },
      {
        id: "PL.ARCHITECTURE",
        name: "Architecture & Constraints",
        subcategories: [
          {
            id: "PL-7",
            description:
              "Plan and coordinate security and privacy-related activities affecting the system with defined individuals or groups before conducting such activities",
          },
          {
            id: "PL-8",
            description:
              "Develop an information security and privacy architecture that describes the overall philosophy, requirements, and approach with regard to protecting the system",
          },
          {
            id: "PL-9",
            description:
              "Establish a central management capability for all security and privacy controls and related processes",
          },
          {
            id: "PL-10",
            description:
              "Apply defined baseline configurations to all system components",
          },
          {
            id: "PL-11",
            description:
              "Incorporate system-specific security principles in the design, development, implementation, and modification of the system",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PROGRAM MANAGEMENT (PM) - 32 base controls
  // ============================================================
  {
    id: "PM",
    name: "Program Management",
    description:
      "Organization-wide information security program management controls not specific to individual systems.",
    color: "violet",
    categories: [
      {
        id: "PM.PROGRAM",
        name: "Program Establishment",
        subcategories: [
          {
            id: "PM-1",
            description:
              "Develop and disseminate an organization-wide information security and privacy program plan",
          },
          {
            id: "PM-2",
            description:
              "Appoint a senior information security officer with the mission and resources to coordinate and implement the organization-wide program",
          },
          {
            id: "PM-3",
            description:
              "Address information security and privacy in the capital planning and investment control process",
          },
          {
            id: "PM-4",
            description:
              "Implement a process for ensuring that plans of action and milestones are maintained and document remedial actions",
          },
        ],
      },
      {
        id: "PM.GOVERNANCE",
        name: "Governance & Risk",
        subcategories: [
          {
            id: "PM-5",
            description:
              "Develop and maintain an inventory of organizational information systems",
          },
          {
            id: "PM-6",
            description:
              "Develop performance measures for monitoring the effectiveness of the information security program",
          },
          {
            id: "PM-7",
            description:
              "Develop and maintain an enterprise architecture with consideration for information security and privacy",
          },
          {
            id: "PM-8",
            description:
              "Identify individuals fulfilling critical information security and privacy roles and document contingency plans for their absence",
          },
          {
            id: "PM-9",
            description:
              "Develop and maintain an organization-wide risk management strategy consistently applied across the organization",
          },
          {
            id: "PM-10",
            description:
              "Implement a governance structure and process for managing and coordinating security and privacy authorization activities",
          },
        ],
      },
      {
        id: "PM.OPERATIONS",
        name: "Operational Controls",
        subcategories: [
          {
            id: "PM-11",
            description:
              "Define quality control and quality assurance processes for information security and privacy",
          },
          {
            id: "PM-12",
            description:
              "Implement an insider threat program that includes a cross-discipline insider threat incident handling team",
          },
          {
            id: "PM-13",
            description:
              "Establish and institutionalize an information security workforce development and improvement program",
          },
          {
            id: "PM-14",
            description:
              "Implement a testing, training, and monitoring process for organizational security and privacy controls",
          },
          {
            id: "PM-15",
            description:
              "Establish and maintain contacts with security groups, associations, and forums to stay current on security issues and recommendations",
          },
          {
            id: "PM-16",
            description:
              "Implement a threat awareness program that includes a cross-organization information sharing capability",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PERSONNEL SECURITY (PS) - 9 base controls
  // ============================================================
  {
    id: "PS",
    name: "Personnel Security",
    description:
      "Policies for screening individuals, managing transfers and terminations, and enforcing personnel security requirements.",
    color: "emerald",
    categories: [
      {
        id: "PS.SCREENING",
        name: "Screening & Agreements",
        subcategories: [
          {
            id: "PS-1",
            description:
              "Develop, document, and disseminate personnel security policy and procedures",
          },
          {
            id: "PS-2",
            description:
              "Assign a risk designation to all organizational positions, establish screening criteria, and review and update designations periodically",
          },
          {
            id: "PS-3",
            description:
              "Screen individuals prior to authorizing access to the information system and rescreen according to defined conditions",
          },
          {
            id: "PS-6",
            description:
              "Establish personnel security requirements including third-party providers and require compliance with policies",
          },
          {
            id: "PS-7",
            description:
              "Establish and document personnel security requirements for third-party providers and monitor compliance",
          },
        ],
      },
      {
        id: "PS.TRANSFERS",
        name: "Termination & Transfer",
        subcategories: [
          {
            id: "PS-4",
            description:
              "Upon termination of employment, disable system access, terminate authenticators, conduct exit interviews, and retrieve property",
          },
          {
            id: "PS-5",
            description:
              "Review and confirm ongoing operational need for current logical and physical access authorizations when personnel are transferred",
          },
          {
            id: "PS-8",
            description:
              "Employ a formal sanctions process for individuals failing to comply with established security and privacy policies",
          },
          {
            id: "PS-9",
            description:
              "Protect information during personnel actions such as terminations and transfers",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PERSONALLY IDENTIFIABLE INFORMATION PROCESSING AND TRANSPARENCY (PT) - 8 base controls
  // ============================================================
  {
    id: "PT",
    name: "PII Processing and Transparency",
    description:
      "Policies for managing personally identifiable information processing, ensuring transparency, consent, and individual participation.",
    color: "blue",
    categories: [
      {
        id: "PT.POLICY",
        name: "Policy & Authority",
        subcategories: [
          {
            id: "PT-1",
            description:
              "Develop, document, and disseminate PII processing and transparency policy and procedures",
          },
          {
            id: "PT-2",
            description:
              "Identify the legal bases that permit the processing of personally identifiable information",
          },
          {
            id: "PT-3",
            description:
              "Provide notice to individuals regarding PII processing that covers processing purposes, PII sharing, retention, and individual rights",
          },
        ],
      },
      {
        id: "PT.CONSENT",
        name: "Consent & Individual Rights",
        subcategories: [
          {
            id: "PT-4",
            description:
              "Implement consent mechanisms for individuals regarding the processing of their personally identifiable information",
          },
          {
            id: "PT-5",
            description:
              "Implement privacy notice and consent requirements and include privacy terms in system-of-records notices",
          },
          {
            id: "PT-6",
            description:
              "Develop and maintain a system of records notice for systems that process personally identifiable information",
          },
          {
            id: "PT-7",
            description:
              "Identify and document specific purposes for which PII is collected and link those purposes to the elements of PII",
          },
          {
            id: "PT-8",
            description:
              "Apply data processing rules governing the processing of PII for specific authorized purposes",
          },
        ],
      },
    ],
  },

  // ============================================================
  // RISK ASSESSMENT (RA) - 10 base controls
  // ============================================================
  {
    id: "RA",
    name: "Risk Assessment",
    description:
      "Policies for assessing risk including vulnerability scanning, threat intelligence, and privacy impact assessments.",
    color: "amber",
    categories: [
      {
        id: "RA.ASSESSMENT",
        name: "Risk Assessment",
        subcategories: [
          {
            id: "RA-1",
            description:
              "Develop, document, and disseminate risk assessment policy and procedures",
          },
          {
            id: "RA-2",
            description:
              "Categorize the information system and the information processed, stored, and transmitted based on an impact analysis",
          },
          {
            id: "RA-3",
            description:
              "Conduct risk assessments to identify threats, vulnerabilities, impact, likelihood, and risk to organizational operations and assets",
          },
        ],
      },
      {
        id: "RA.VULNERABILITY",
        name: "Vulnerability Management",
        subcategories: [
          {
            id: "RA-5",
            description:
              "Monitor and scan for vulnerabilities in the system and hosted applications, and remediate discovered vulnerabilities",
          },
          {
            id: "RA-7",
            description:
              "Respond to findings from security and privacy assessments, monitoring, and audits",
          },
          {
            id: "RA-8",
            description:
              "Conduct a privacy impact assessment on the system when there is a change that creates new or increases privacy risk",
          },
          {
            id: "RA-9",
            description:
              "Assess and document the criticality of software components used in the system",
          },
          {
            id: "RA-10",
            description:
              "Conduct threat hunting activities to detect advanced threats that evade existing controls",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND SERVICES ACQUISITION (SA) - 23 base controls
  // ============================================================
  {
    id: "SA",
    name: "System and Services Acquisition",
    description:
      "Policies for allocating resources, managing the system development life cycle, and acquiring systems and services.",
    color: "purple",
    categories: [
      {
        id: "SA.POLICY",
        name: "Policy & Resources",
        subcategories: [
          {
            id: "SA-1",
            description:
              "Develop, document, and disseminate system and services acquisition policy and procedures",
          },
          {
            id: "SA-2",
            description:
              "Determine the high-level information security and privacy requirements for the system as part of capital planning",
          },
          {
            id: "SA-3",
            description:
              "Manage the system using a system development life cycle that incorporates security and privacy considerations",
          },
          {
            id: "SA-4",
            description:
              "Include security and privacy functional requirements, strength requirements, and assurance requirements in the acquisition contract",
          },
        ],
      },
      {
        id: "SA.DEVELOPMENT",
        name: "Development & Testing",
        subcategories: [
          {
            id: "SA-5",
            description:
              "Obtain or develop administrator and user documentation that describes secure configuration, installation, and operation of the system",
          },
          {
            id: "SA-8",
            description:
              "Apply security and privacy engineering principles in the specification, design, development, implementation, and modification of the system",
          },
          {
            id: "SA-9",
            description:
              "Require that providers of external system services comply with organizational security and privacy requirements and employ defined controls",
          },
          {
            id: "SA-10",
            description:
              "Require the developer to perform configuration management during system design, development, implementation, and operation",
          },
          {
            id: "SA-11",
            description:
              "Require the developer to create and implement a security and privacy assessment plan",
          },
        ],
      },
      {
        id: "SA.SUPPLY_CHAIN",
        name: "Supply Chain Protection",
        subcategories: [
          {
            id: "SA-12",
            description:
              "Protect against supply chain threats by employing security safeguards as part of a comprehensive supply chain risk management strategy",
          },
          {
            id: "SA-15",
            description:
              "Require the developer to follow a documented development process that addresses security and privacy requirements",
          },
          {
            id: "SA-17",
            description:
              "Require the developer to produce a design specification and security architecture consistent with the organization's security architecture",
          },
          {
            id: "SA-20",
            description:
              "Replace system components when support for the components is no longer available from the developer or vendor",
          },
          {
            id: "SA-22",
            description:
              "Replace system components when support for the components is no longer available from the developer, vendor, or manufacturer",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND COMMUNICATIONS PROTECTION (SC) - 51 base controls (key selections)
  // ============================================================
  {
    id: "SC",
    name: "System and Communications Protection",
    description:
      "Policies for protecting communications, establishing security boundaries, and ensuring data integrity and confidentiality.",
    color: "green",
    categories: [
      {
        id: "SC.POLICY",
        name: "Policy & Partitioning",
        subcategories: [
          {
            id: "SC-1",
            description:
              "Develop, document, and disseminate system and communications protection policy and procedures",
          },
          {
            id: "SC-2",
            description:
              "Separate user functionality including user interface services from system management functionality",
          },
          {
            id: "SC-3",
            description:
              "Isolate security functions from nonsecurity functions through hardware and software mechanisms",
          },
          {
            id: "SC-4",
            description:
              "Prevent unauthorized and unintended information transfer via shared system resources",
          },
        ],
      },
      {
        id: "SC.NETWORK",
        name: "Network & Boundary Protection",
        subcategories: [
          {
            id: "SC-5",
            description:
              "Protect against or limit the effects of denial-of-service attacks by employing defined security safeguards",
          },
          {
            id: "SC-7",
            description:
              "Monitor and control communications at managed interfaces including external boundary and key internal boundaries of the system",
          },
          {
            id: "SC-8",
            description:
              "Protect the confidentiality and integrity of transmitted information",
          },
          {
            id: "SC-10",
            description:
              "Terminate the network connection associated with a communications session at the end of the session or after a defined period of inactivity",
          },
          {
            id: "SC-11",
            description:
              "Establish a trusted communications path between the user and the security and privacy functions of the system",
          },
        ],
      },
      {
        id: "SC.CRYPTO",
        name: "Cryptographic Protection",
        subcategories: [
          {
            id: "SC-12",
            description:
              "Establish and manage cryptographic keys when cryptography is employed within the system",
          },
          {
            id: "SC-13",
            description:
              "Determine the required uses of cryptography and implement the types of cryptography required for each specified use",
          },
          {
            id: "SC-17",
            description:
              "Issue public key certificates under an appropriate certificate policy or obtain public key certificates from an approved service provider",
          },
          {
            id: "SC-28",
            description:
              "Protect the confidentiality and integrity of information at rest",
          },
        ],
      },
      {
        id: "SC.ADVANCED",
        name: "Advanced Protection",
        subcategories: [
          {
            id: "SC-18",
            description:
              "Define acceptable and unacceptable use of mobile code technologies and establish usage restrictions and implementation guidance",
          },
          {
            id: "SC-20",
            description:
              "Provide additional data origin authentication and integrity verification artifacts along with the authoritative name resolution data",
          },
          {
            id: "SC-21",
            description:
              "Request and perform data origin authentication and data integrity verification on name and address resolution responses",
          },
          {
            id: "SC-22",
            description:
              "Ensure the systems performing name and address resolution provide fault-tolerant and role-separation capabilities",
          },
          {
            id: "SC-23",
            description:
              "Protect the authenticity of communications sessions including mechanisms to invalidate session identifiers at logout",
          },
          {
            id: "SC-39",
            description:
              "Maintain a separate execution domain for each executing system process",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND INFORMATION INTEGRITY (SI) - 23 base controls (key selections)
  // ============================================================
  {
    id: "SI",
    name: "System and Information Integrity",
    description:
      "Policies for identifying, reporting, and correcting system flaws, monitoring information systems, and protecting against malicious code.",
    color: "orange",
    categories: [
      {
        id: "SI.FLAWS",
        name: "Flaw Remediation & Malware",
        subcategories: [
          {
            id: "SI-1",
            description:
              "Develop, document, and disseminate system and information integrity policy and procedures",
          },
          {
            id: "SI-2",
            description:
              "Identify, report, and correct system flaws in a timely manner",
          },
          {
            id: "SI-3",
            description:
              "Implement malicious code protection mechanisms at system entry and exit points to detect and eradicate malicious code",
          },
          {
            id: "SI-4",
            description:
              "Monitor the information system to detect attacks and indicators of potential attacks and unauthorized connections",
          },
          {
            id: "SI-5",
            description:
              "Receive information system security alerts and advisories and generate internal alerts and advisories as deemed necessary",
          },
        ],
      },
      {
        id: "SI.VERIFICATION",
        name: "Integrity Verification",
        subcategories: [
          {
            id: "SI-6",
            description:
              "Verify the correct operation of security and privacy relevant functions and notify designated personnel upon discovery of anomalies",
          },
          {
            id: "SI-7",
            description:
              "Employ integrity verification tools to detect unauthorized changes to software, firmware, and information",
          },
          {
            id: "SI-8",
            description:
              "Employ spam protection mechanisms at system entry and exit points to detect and take action on unsolicited messages",
          },
          {
            id: "SI-10",
            description:
              "Check the validity of information inputs including syntax, semantics, and plausibility",
          },
        ],
      },
      {
        id: "SI.HANDLING",
        name: "Error Handling & Resilience",
        subcategories: [
          {
            id: "SI-11",
            description:
              "Generate error messages that provide information necessary for corrective actions without revealing information that could be exploited",
          },
          {
            id: "SI-12",
            description:
              "Manage and retain information within the system and information output from the system in accordance with applicable laws and policies",
          },
          {
            id: "SI-13",
            description:
              "Implement predictable failure prevention to protect the system from failing in a manner that results in unauthorized information release",
          },
          {
            id: "SI-16",
            description:
              "Implement memory protection mechanisms to protect the integrity of information in memory",
          },
          {
            id: "SI-18",
            description:
              "Check the accuracy, relevance, timeliness, and completeness of PII across the information life cycle",
          },
          {
            id: "SI-19",
            description:
              "Remove element of PII from datasets prior to distribution to de-identify data",
          },
          {
            id: "SI-23",
            description:
              "Employ defined techniques to verify the correctness of information on data inputs that are critical to operations",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SUPPLY CHAIN RISK MANAGEMENT (SR) - 12 base controls
  // ============================================================
  {
    id: "SR",
    name: "Supply Chain Risk Management",
    description:
      "Policies for managing supply chain risks including acquisition strategies, supplier assessments, and component authenticity.",
    color: "teal",
    categories: [
      {
        id: "SR.POLICY",
        name: "Policy & Strategy",
        subcategories: [
          {
            id: "SR-1",
            description:
              "Develop, document, and disseminate supply chain risk management policy and procedures and establish a SCRM team",
          },
          {
            id: "SR-2",
            description:
              "Develop a plan for managing supply chain risks associated with the development, acquisition, maintenance, and disposal of systems",
          },
          {
            id: "SR-3",
            description:
              "Employ processes to identify and address weaknesses or deficiencies in the supply chain elements and processes",
          },
        ],
      },
      {
        id: "SR.PROVENANCE",
        name: "Provenance & Authenticity",
        subcategories: [
          {
            id: "SR-4",
            description:
              "Describe the provenance of systems, components, and services and employ verification methods where feasible",
          },
          {
            id: "SR-5",
            description:
              "Employ acquisition strategies, contract tools, and procurement methods to protect against, identify, and mitigate supply chain risks",
          },
          {
            id: "SR-6",
            description:
              "Assess and review the supply chain-related risks associated with suppliers or contractors and the system components they provide",
          },
          {
            id: "SR-8",
            description:
              "Establish processes to address weaknesses or deficiencies in supply chain elements identified during independent or organizational assessments",
          },
        ],
      },
      {
        id: "SR.OPERATIONS",
        name: "Operational Supply Chain",
        subcategories: [
          {
            id: "SR-9",
            description:
              "Employ tamper protection and detection mechanisms for the system to detect and respond to physical tampering",
          },
          {
            id: "SR-10",
            description:
              "Inspect defined systems or system components to detect tampering at defined frequency",
          },
          {
            id: "SR-11",
            description:
              "Establish and maintain a process for component authenticity by developing anti-counterfeit measures",
          },
          {
            id: "SR-12",
            description:
              "Establish a process for addressing the disposal of system components using defined techniques and methods",
          },
        ],
      },
    ],
  },
];
