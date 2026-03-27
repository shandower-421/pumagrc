// CMMC 2.0 (Cybersecurity Maturity Model Certification) - Level 2 Framework Data
// Source: CMMC 2.0 Model Overview / NIST SP 800-171 Rev 2
// https://dodcio.defense.gov/CMMC/
// 14 Domains, 110 Practices (Level 2)

import type { FunctionDef } from '../types/assessment';

export const CMMC: FunctionDef[] = [
  // ============================================================
  // ACCESS CONTROL (AC) - 22 practices
  // ============================================================
  {
    id: "AC",
    name: "Access Control",
    description:
      "Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems) and to the types of transactions and functions that authorized users are permitted to exercise.",
    color: "blue",
    categories: [
      {
        id: "AC",
        name: "Access Control",
        subcategories: [
          {
            id: "AC.L2-3.1.1",
            description:
              "Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems).",
          },
          {
            id: "AC.L2-3.1.2",
            description:
              "Limit information system access to the types of transactions and functions that authorized users are permitted to execute.",
          },
          {
            id: "AC.L2-3.1.3",
            description:
              "Control the flow of CUI in accordance with approved authorizations.",
          },
          {
            id: "AC.L2-3.1.4",
            description:
              "Separate the duties of individuals to reduce the risk of malevolent activity without collusion.",
          },
          {
            id: "AC.L2-3.1.5",
            description:
              "Employ the principle of least privilege, including for specific security functions and privileged accounts.",
          },
          {
            id: "AC.L2-3.1.6",
            description:
              "Use non-privileged accounts or roles when accessing nonsecurity functions.",
          },
          {
            id: "AC.L2-3.1.7",
            description:
              "Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs.",
          },
          {
            id: "AC.L2-3.1.8",
            description:
              "Limit unsuccessful logon attempts.",
          },
          {
            id: "AC.L2-3.1.9",
            description:
              "Provide privacy and security notices consistent with applicable CUI rules.",
          },
          {
            id: "AC.L2-3.1.10",
            description:
              "Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.",
          },
          {
            id: "AC.L2-3.1.11",
            description:
              "Terminate (automatically) a user session after a defined condition.",
          },
          {
            id: "AC.L2-3.1.12",
            description:
              "Monitor and control remote access sessions.",
          },
          {
            id: "AC.L2-3.1.13",
            description:
              "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.",
          },
          {
            id: "AC.L2-3.1.14",
            description:
              "Route remote access via managed access control points.",
          },
          {
            id: "AC.L2-3.1.15",
            description:
              "Authorize remote execution of privileged commands and remote access to security-relevant information.",
          },
          {
            id: "AC.L2-3.1.16",
            description:
              "Authorize wireless access prior to allowing such connections.",
          },
          {
            id: "AC.L2-3.1.17",
            description:
              "Protect wireless access using authentication and encryption.",
          },
          {
            id: "AC.L2-3.1.18",
            description:
              "Control connection of mobile devices.",
          },
          {
            id: "AC.L2-3.1.19",
            description:
              "Encrypt CUI on mobile devices and mobile computing platforms.",
          },
          {
            id: "AC.L2-3.1.20",
            description:
              "Verify and control/limit connections to and use of external information systems.",
          },
          {
            id: "AC.L2-3.1.21",
            description:
              "Limit use of portable storage devices on external systems.",
          },
          {
            id: "AC.L2-3.1.22",
            description:
              "Control CUI posted or processed on publicly accessible information systems.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AWARENESS AND TRAINING (AT) - 3 practices
  // ============================================================
  {
    id: "AT",
    name: "Awareness and Training",
    description:
      "Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.",
    color: "green",
    categories: [
      {
        id: "AT",
        name: "Awareness and Training",
        subcategories: [
          {
            id: "AT.L2-3.2.1",
            description:
              "Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.",
          },
          {
            id: "AT.L2-3.2.2",
            description:
              "Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities.",
          },
          {
            id: "AT.L2-3.2.3",
            description:
              "Provide security awareness training on recognizing and reporting potential indicators of insider threat.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AUDIT AND ACCOUNTABILITY (AU) - 9 practices
  // ============================================================
  {
    id: "AU",
    name: "Audit and Accountability",
    description:
      "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.",
    color: "purple",
    categories: [
      {
        id: "AU",
        name: "Audit and Accountability",
        subcategories: [
          {
            id: "AU.L2-3.3.1",
            description:
              "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.",
          },
          {
            id: "AU.L2-3.3.2",
            description:
              "Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions.",
          },
          {
            id: "AU.L2-3.3.3",
            description:
              "Review and update logged events.",
          },
          {
            id: "AU.L2-3.3.4",
            description:
              "Alert in the event of an audit logging process failure.",
          },
          {
            id: "AU.L2-3.3.5",
            description:
              "Correlate audit record review, analysis, and reporting processes to support organizational processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity.",
          },
          {
            id: "AU.L2-3.3.6",
            description:
              "Provide audit record reduction and report generation to support on-demand analysis and reporting.",
          },
          {
            id: "AU.L2-3.3.7",
            description:
              "Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.",
          },
          {
            id: "AU.L2-3.3.8",
            description:
              "Protect audit information and audit logging tools from unauthorized access, modification, and deletion.",
          },
          {
            id: "AU.L2-3.3.9",
            description:
              "Limit management of audit logging functionality to a subset of privileged users.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONFIGURATION MANAGEMENT (CM) - 9 practices
  // ============================================================
  {
    id: "CM",
    name: "Configuration Management",
    description:
      "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.",
    color: "amber",
    categories: [
      {
        id: "CM",
        name: "Configuration Management",
        subcategories: [
          {
            id: "CM.L2-3.4.1",
            description:
              "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.",
          },
          {
            id: "CM.L2-3.4.2",
            description:
              "Establish and enforce security configuration settings for information technology products employed in organizational systems.",
          },
          {
            id: "CM.L2-3.4.3",
            description:
              "Track, review, approve or disapprove, and log changes to organizational systems.",
          },
          {
            id: "CM.L2-3.4.4",
            description:
              "Analyze the security impact of changes prior to implementation.",
          },
          {
            id: "CM.L2-3.4.5",
            description:
              "Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems.",
          },
          {
            id: "CM.L2-3.4.6",
            description:
              "Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.",
          },
          {
            id: "CM.L2-3.4.7",
            description:
              "Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services.",
          },
          {
            id: "CM.L2-3.4.8",
            description:
              "Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software or deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized software.",
          },
          {
            id: "CM.L2-3.4.9",
            description:
              "Control and monitor user-installed software.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // IDENTIFICATION AND AUTHENTICATION (IA) - 11 practices
  // ============================================================
  {
    id: "IA",
    name: "Identification and Authentication",
    description:
      "Identify information system users, processes acting on behalf of users, or devices and authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
    color: "orange",
    categories: [
      {
        id: "IA",
        name: "Identification and Authentication",
        subcategories: [
          {
            id: "IA.L2-3.5.1",
            description:
              "Identify information system users, processes acting on behalf of users, or devices.",
          },
          {
            id: "IA.L2-3.5.2",
            description:
              "Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
          },
          {
            id: "IA.L2-3.5.3",
            description:
              "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.",
          },
          {
            id: "IA.L2-3.5.4",
            description:
              "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.",
          },
          {
            id: "IA.L2-3.5.5",
            description:
              "Prevent reuse of identifiers for a defined period.",
          },
          {
            id: "IA.L2-3.5.6",
            description:
              "Disable identifiers after a defined period of inactivity.",
          },
          {
            id: "IA.L2-3.5.7",
            description:
              "Enforce a minimum password complexity and change of characters when new passwords are created.",
          },
          {
            id: "IA.L2-3.5.8",
            description:
              "Prohibit password reuse for a specified number of generations.",
          },
          {
            id: "IA.L2-3.5.9",
            description:
              "Allow temporary password use for system logons with an immediate change to a permanent password.",
          },
          {
            id: "IA.L2-3.5.10",
            description:
              "Store and transmit only cryptographically-protected passwords.",
          },
          {
            id: "IA.L2-3.5.11",
            description:
              "Obscure feedback of authentication information.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // INCIDENT RESPONSE (IR) - 3 practices
  // ============================================================
  {
    id: "IR",
    name: "Incident Response",
    description:
      "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.",
    color: "red",
    categories: [
      {
        id: "IR",
        name: "Incident Response",
        subcategories: [
          {
            id: "IR.L2-3.6.1",
            description:
              "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.",
          },
          {
            id: "IR.L2-3.6.2",
            description:
              "Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization.",
          },
          {
            id: "IR.L2-3.6.3",
            description:
              "Test the organizational incident response capability.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MAINTENANCE (MA) - 6 practices
  // ============================================================
  {
    id: "MA",
    name: "Maintenance",
    description:
      "Perform maintenance on organizational systems and provide effective controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.",
    color: "teal",
    categories: [
      {
        id: "MA",
        name: "Maintenance",
        subcategories: [
          {
            id: "MA.L2-3.7.1",
            description:
              "Perform maintenance on organizational systems.",
          },
          {
            id: "MA.L2-3.7.2",
            description:
              "Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.",
          },
          {
            id: "MA.L2-3.7.3",
            description:
              "Ensure equipment removed for off-site maintenance is sanitized of any CUI.",
          },
          {
            id: "MA.L2-3.7.4",
            description:
              "Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems.",
          },
          {
            id: "MA.L2-3.7.5",
            description:
              "Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete.",
          },
          {
            id: "MA.L2-3.7.6",
            description:
              "Supervise the maintenance activities of maintenance personnel without required access authorization.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MEDIA PROTECTION (MP) - 9 practices
  // ============================================================
  {
    id: "MP",
    name: "Media Protection",
    description:
      "Protect information system media containing CUI, both paper and digital; limit access to CUI on system media to authorized users; and sanitize or destroy system media before disposal or release for reuse.",
    color: "indigo",
    categories: [
      {
        id: "MP",
        name: "Media Protection",
        subcategories: [
          {
            id: "MP.L2-3.8.1",
            description:
              "Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital.",
          },
          {
            id: "MP.L2-3.8.2",
            description:
              "Limit access to CUI on system media to authorized users.",
          },
          {
            id: "MP.L2-3.8.3",
            description:
              "Sanitize or destroy system media containing CUI before disposal or release for reuse.",
          },
          {
            id: "MP.L2-3.8.4",
            description:
              "Mark media with necessary CUI markings and distribution limitations.",
          },
          {
            id: "MP.L2-3.8.5",
            description:
              "Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas.",
          },
          {
            id: "MP.L2-3.8.6",
            description:
              "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.",
          },
          {
            id: "MP.L2-3.8.7",
            description:
              "Control the use of removable media on system components.",
          },
          {
            id: "MP.L2-3.8.8",
            description:
              "Prohibit the use of portable storage devices when such devices have no identifiable owner.",
          },
          {
            id: "MP.L2-3.8.9",
            description:
              "Protect the confidentiality of backup CUI at storage locations.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHYSICAL PROTECTION (PE) - 6 practices
  // ============================================================
  {
    id: "PE",
    name: "Physical Protection",
    description:
      "Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals.",
    color: "pink",
    categories: [
      {
        id: "PE",
        name: "Physical Protection",
        subcategories: [
          {
            id: "PE.L2-3.10.1",
            description:
              "Limit physical access to organizational information systems, equipment, and the respective operating environments to authorized individuals.",
          },
          {
            id: "PE.L2-3.10.2",
            description:
              "Protect and monitor the physical facility and support infrastructure for organizational systems.",
          },
          {
            id: "PE.L2-3.10.3",
            description:
              "Escort visitors and monitor visitor activity.",
          },
          {
            id: "PE.L2-3.10.4",
            description:
              "Maintain audit logs of physical access.",
          },
          {
            id: "PE.L2-3.10.5",
            description:
              "Control and manage physical access devices.",
          },
          {
            id: "PE.L2-3.10.6",
            description:
              "Enforce safeguarding measures for CUI at alternate work sites.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PERSONNEL SECURITY (PS) - 2 practices
  // ============================================================
  {
    id: "PS",
    name: "Personnel Security",
    description:
      "Screen individuals prior to authorizing access to organizational systems containing CUI and ensure that CUI and organizational systems containing CUI are protected during and after personnel actions.",
    color: "cyan",
    categories: [
      {
        id: "PS",
        name: "Personnel Security",
        subcategories: [
          {
            id: "PS.L2-3.9.1",
            description:
              "Screen individuals prior to authorizing access to organizational systems containing CUI.",
          },
          {
            id: "PS.L2-3.9.2",
            description:
              "Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // RISK ASSESSMENT (RA) - 3 practices
  // ============================================================
  {
    id: "RA",
    name: "Risk Assessment",
    description:
      "Periodically assess the risk to organizational operations, organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.",
    color: "lime",
    categories: [
      {
        id: "RA",
        name: "Risk Assessment",
        subcategories: [
          {
            id: "RA.L2-3.11.1",
            description:
              "Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.",
          },
          {
            id: "RA.L2-3.11.2",
            description:
              "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified.",
          },
          {
            id: "RA.L2-3.11.3",
            description:
              "Remediate vulnerabilities in accordance with risk assessments.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SECURITY ASSESSMENT (CA) - 4 practices
  // ============================================================
  {
    id: "CA",
    name: "Security Assessment",
    description:
      "Develop, document, and periodically update system security plans; assess the security controls in organizational systems periodically; and develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities.",
    color: "rose",
    categories: [
      {
        id: "CA",
        name: "Security Assessment",
        subcategories: [
          {
            id: "CA.L2-3.12.1",
            description:
              "Periodically assess the security controls in organizational systems to determine if the controls are effective in their application.",
          },
          {
            id: "CA.L2-3.12.2",
            description:
              "Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems.",
          },
          {
            id: "CA.L2-3.12.3",
            description:
              "Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls.",
          },
          {
            id: "CA.L2-3.12.4",
            description:
              "Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND COMMUNICATIONS PROTECTION (SC) - 16 practices
  // ============================================================
  {
    id: "SC",
    name: "System and Communications Protection",
    description:
      "Monitor, control, and protect organizational communications at the external boundaries and key internal boundaries of the information systems and employ architectural designs, software development techniques, and systems engineering principles that promote effective information security.",
    color: "violet",
    categories: [
      {
        id: "SC",
        name: "System and Communications Protection",
        subcategories: [
          {
            id: "SC.L2-3.13.1",
            description:
              "Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems.",
          },
          {
            id: "SC.L2-3.13.2",
            description:
              "Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational systems.",
          },
          {
            id: "SC.L2-3.13.3",
            description:
              "Separate user functionality from system management functionality.",
          },
          {
            id: "SC.L2-3.13.4",
            description:
              "Prevent unauthorized and unintended information transfer via shared system resources.",
          },
          {
            id: "SC.L2-3.13.5",
            description:
              "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.",
          },
          {
            id: "SC.L2-3.13.6",
            description:
              "Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception).",
          },
          {
            id: "SC.L2-3.13.7",
            description:
              "Prevent remote devices from simultaneously establishing non-remote connections with organizational systems and communicating via some other connection to resources in external networks (i.e., split tunneling).",
          },
          {
            id: "SC.L2-3.13.8",
            description:
              "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards.",
          },
          {
            id: "SC.L2-3.13.9",
            description:
              "Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.",
          },
          {
            id: "SC.L2-3.13.10",
            description:
              "Establish and manage cryptographic keys for cryptography employed in organizational systems.",
          },
          {
            id: "SC.L2-3.13.11",
            description:
              "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.",
          },
          {
            id: "SC.L2-3.13.12",
            description:
              "Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device.",
          },
          {
            id: "SC.L2-3.13.13",
            description:
              "Control and monitor the use of mobile code.",
          },
          {
            id: "SC.L2-3.13.14",
            description:
              "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.",
          },
          {
            id: "SC.L2-3.13.15",
            description:
              "Protect the authenticity of communications sessions.",
          },
          {
            id: "SC.L2-3.13.16",
            description:
              "Protect the confidentiality of CUI at rest.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND INFORMATION INTEGRITY (SI) - 7 practices
  // ============================================================
  {
    id: "SI",
    name: "System and Information Integrity",
    description:
      "Identify, report, and correct information and information system flaws in a timely manner; provide protection from malicious code at appropriate locations within organizational information systems; and monitor information system security alerts and advisories and take appropriate actions in response.",
    color: "emerald",
    categories: [
      {
        id: "SI",
        name: "System and Information Integrity",
        subcategories: [
          {
            id: "SI.L2-3.14.1",
            description:
              "Identify, report, and correct information and information system flaws in a timely manner.",
          },
          {
            id: "SI.L2-3.14.2",
            description:
              "Provide protection from malicious code at designated locations within organizational systems.",
          },
          {
            id: "SI.L2-3.14.3",
            description:
              "Monitor system security alerts and advisories and take action in response.",
          },
          {
            id: "SI.L2-3.14.4",
            description:
              "Update malicious code protection mechanisms when new releases are available.",
          },
          {
            id: "SI.L2-3.14.5",
            description:
              "Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed.",
          },
          {
            id: "SI.L2-3.14.6",
            description:
              "Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.",
          },
          {
            id: "SI.L2-3.14.7",
            description:
              "Identify unauthorized use of organizational systems.",
          },
        ],
      },
    ],
  },
];
