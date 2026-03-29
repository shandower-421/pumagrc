// NIST SP 800-171 Revision 3 — Protecting Controlled Unclassified Information
// in Nonfederal Systems and Organizations
// Source: https://csrc.nist.gov/pubs/sp/800/171/r3/final
// Published: May 2024
// 17 families, 110 security requirements

import type { FunctionDef } from '../types/assessment';

export const NIST_800_171: FunctionDef[] = [
  // ============================================================
  // ACCESS CONTROL (AC) — 22 requirements
  // ============================================================
  {
    id: "AC",
    name: "Access Control",
    description:
      "Limit system access to authorized users, processes acting on behalf of authorized users, and devices. Control the types of transactions and functions that authorized users are permitted to execute.",
    color: "blue",
    categories: [
      {
        id: "3.1",
        name: "Access Control",
        subcategories: [
          {
            id: "3.1.1",
            description:
              "Limit system access to authorized users, processes acting on behalf of authorized users, and devices, including other systems.",
          },
          {
            id: "3.1.2",
            description:
              "Limit system access to the types of transactions and functions that authorized users are permitted to execute.",
          },
          {
            id: "3.1.3",
            description:
              "Control the flow of CUI in accordance with approved authorizations.",
          },
          {
            id: "3.1.4",
            description:
              "Separate the duties of individuals to reduce the risk of malevolent activity without collusion.",
          },
          {
            id: "3.1.5",
            description:
              "Employ the principle of least privilege, including for specific security functions and privileged accounts.",
          },
          {
            id: "3.1.6",
            description:
              "Use non-privileged accounts or roles when accessing nonsecurity functions.",
          },
          {
            id: "3.1.7",
            description:
              "Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs.",
          },
          {
            id: "3.1.8",
            description:
              "Limit unsuccessful logon attempts.",
          },
          {
            id: "3.1.9",
            description:
              "Provide privacy and security notices consistent with applicable CUI rules.",
          },
          {
            id: "3.1.10",
            description:
              "Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.",
          },
          {
            id: "3.1.11",
            description:
              "Terminate (automatically) user sessions after a defined condition.",
          },
          {
            id: "3.1.12",
            description:
              "Monitor and control remote access sessions.",
          },
          {
            id: "3.1.13",
            description:
              "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.",
          },
          {
            id: "3.1.14",
            description:
              "Route remote access via managed access control points.",
          },
          {
            id: "3.1.15",
            description:
              "Authorize remote execution of privileged commands and remote access to security-relevant information.",
          },
          {
            id: "3.1.16",
            description:
              "Authorize wireless access prior to allowing such connections.",
          },
          {
            id: "3.1.17",
            description:
              "Protect wireless access using authentication and encryption.",
          },
          {
            id: "3.1.18",
            description:
              "Control connection of mobile devices.",
          },
          {
            id: "3.1.19",
            description:
              "Encrypt CUI on mobile devices and mobile computing platforms.",
          },
          {
            id: "3.1.20",
            description:
              "Verify and control/limit connections to and use of external systems.",
          },
          {
            id: "3.1.21",
            description:
              "Limit use of portable storage devices on external systems.",
          },
          {
            id: "3.1.22",
            description:
              "Control CUI posted or processed on publicly accessible systems.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AWARENESS AND TRAINING (AT) — 3 requirements
  // ============================================================
  {
    id: "AT",
    name: "Awareness and Training",
    description:
      "Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.",
    color: "green",
    categories: [
      {
        id: "3.2",
        name: "Awareness and Training",
        subcategories: [
          {
            id: "3.2.1",
            description:
              "Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.",
          },
          {
            id: "3.2.2",
            description:
              "Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities.",
          },
          {
            id: "3.2.3",
            description:
              "Provide security awareness training on recognizing and reporting potential indicators of insider threat.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // AUDIT AND ACCOUNTABILITY (AU) — 9 requirements
  // ============================================================
  {
    id: "AU",
    name: "Audit and Accountability",
    description:
      "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.",
    color: "purple",
    categories: [
      {
        id: "3.3",
        name: "Audit and Accountability",
        subcategories: [
          {
            id: "3.3.1",
            description:
              "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.",
          },
          {
            id: "3.3.2",
            description:
              "Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions.",
          },
          {
            id: "3.3.3",
            description:
              "Review and update logged events.",
          },
          {
            id: "3.3.4",
            description:
              "Alert in the event of an audit logging process failure.",
          },
          {
            id: "3.3.5",
            description:
              "Correlate audit record review, analysis, and reporting processes to support organizational processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity.",
          },
          {
            id: "3.3.6",
            description:
              "Provide audit record reduction and report generation to support on-demand analysis and reporting.",
          },
          {
            id: "3.3.7",
            description:
              "Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.",
          },
          {
            id: "3.3.8",
            description:
              "Protect audit information and audit logging tools from unauthorized access, modification, and deletion.",
          },
          {
            id: "3.3.9",
            description:
              "Limit management of audit logging functionality to a subset of privileged users.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONFIGURATION MANAGEMENT (CM) — 9 requirements
  // ============================================================
  {
    id: "CM",
    name: "Configuration Management",
    description:
      "Establish and maintain baseline configurations and inventories of organizational systems throughout the respective system development life cycles.",
    color: "amber",
    categories: [
      {
        id: "3.4",
        name: "Configuration Management",
        subcategories: [
          {
            id: "3.4.1",
            description:
              "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.",
          },
          {
            id: "3.4.2",
            description:
              "Establish and enforce security configuration settings for information technology products employed in organizational systems.",
          },
          {
            id: "3.4.3",
            description:
              "Track, review, approve or disapprove, and log changes to organizational systems.",
          },
          {
            id: "3.4.4",
            description:
              "Analyze the security impact of changes prior to implementation.",
          },
          {
            id: "3.4.5",
            description:
              "Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems.",
          },
          {
            id: "3.4.6",
            description:
              "Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.",
          },
          {
            id: "3.4.7",
            description:
              "Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services.",
          },
          {
            id: "3.4.8",
            description:
              "Apply deny-by-exception policy to prevent the use of unauthorized software or deny-all, permit-by-exception policy to allow the execution of authorized software.",
          },
          {
            id: "3.4.9",
            description:
              "Control and monitor user-installed software.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // IDENTIFICATION AND AUTHENTICATION (IA) — 11 requirements
  // ============================================================
  {
    id: "IA",
    name: "Identification and Authentication",
    description:
      "Identify system users, processes acting on behalf of users, and devices, and authenticate (or verify) the identities of those users, processes, or devices as a prerequisite to allowing access to organizational systems.",
    color: "orange",
    categories: [
      {
        id: "3.5",
        name: "Identification and Authentication",
        subcategories: [
          {
            id: "3.5.1",
            description:
              "Identify system users, processes acting on behalf of users, and devices.",
          },
          {
            id: "3.5.2",
            description:
              "Authenticate (or verify) the identities of users, processes, or devices as a prerequisite to allowing access to organizational systems.",
          },
          {
            id: "3.5.3",
            description:
              "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.",
          },
          {
            id: "3.5.4",
            description:
              "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.",
          },
          {
            id: "3.5.5",
            description:
              "Prevent reuse of identifiers for a defined period.",
          },
          {
            id: "3.5.6",
            description:
              "Disable identifiers after a defined period of inactivity.",
          },
          {
            id: "3.5.7",
            description:
              "Enforce a minimum password complexity and change of characters when new passwords are created.",
          },
          {
            id: "3.5.8",
            description:
              "Prohibit password reuse for a specified number of generations.",
          },
          {
            id: "3.5.9",
            description:
              "Allow temporary password use for system logons with an immediate change to a permanent password.",
          },
          {
            id: "3.5.10",
            description:
              "Store and transmit only cryptographically-protected passwords.",
          },
          {
            id: "3.5.11",
            description:
              "Obscure feedback of authentication information.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // INCIDENT RESPONSE (IR) — 3 requirements
  // ============================================================
  {
    id: "IR",
    name: "Incident Response",
    description:
      "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.",
    color: "red",
    categories: [
      {
        id: "3.6",
        name: "Incident Response",
        subcategories: [
          {
            id: "3.6.1",
            description:
              "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.",
          },
          {
            id: "3.6.2",
            description:
              "Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization.",
          },
          {
            id: "3.6.3",
            description:
              "Test the organizational incident response capability.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MAINTENANCE (MA) — 6 requirements
  // ============================================================
  {
    id: "MA",
    name: "Maintenance",
    description:
      "Perform maintenance on organizational systems and provide effective controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.",
    color: "teal",
    categories: [
      {
        id: "3.7",
        name: "Maintenance",
        subcategories: [
          {
            id: "3.7.1",
            description:
              "Perform maintenance on organizational systems.",
          },
          {
            id: "3.7.2",
            description:
              "Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.",
          },
          {
            id: "3.7.3",
            description:
              "Ensure equipment removed for off-site maintenance is sanitized of any CUI.",
          },
          {
            id: "3.7.4",
            description:
              "Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems.",
          },
          {
            id: "3.7.5",
            description:
              "Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete.",
          },
          {
            id: "3.7.6",
            description:
              "Supervise the maintenance activities of maintenance personnel without required access authorization.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MEDIA PROTECTION (MP) — 9 requirements
  // ============================================================
  {
    id: "MP",
    name: "Media Protection",
    description:
      "Protect system media containing CUI, both paper and digital. Limit access to CUI on system media to authorized users, and sanitize or destroy system media before disposal or release for reuse.",
    color: "indigo",
    categories: [
      {
        id: "3.8",
        name: "Media Protection",
        subcategories: [
          {
            id: "3.8.1",
            description:
              "Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital.",
          },
          {
            id: "3.8.2",
            description:
              "Limit access to CUI on system media to authorized users.",
          },
          {
            id: "3.8.3",
            description:
              "Sanitize or destroy system media containing CUI before disposal or release for reuse.",
          },
          {
            id: "3.8.4",
            description:
              "Mark media with necessary CUI markings and distribution limitations.",
          },
          {
            id: "3.8.5",
            description:
              "Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas.",
          },
          {
            id: "3.8.6",
            description:
              "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.",
          },
          {
            id: "3.8.7",
            description:
              "Control the use of removable media on system components.",
          },
          {
            id: "3.8.8",
            description:
              "Prohibit the use of portable storage devices when such devices have no identifiable owner.",
          },
          {
            id: "3.8.9",
            description:
              "Protect the confidentiality of backup CUI at storage locations.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PERSONNEL SECURITY (PS) — 2 requirements
  // ============================================================
  {
    id: "PS",
    name: "Personnel Security",
    description:
      "Screen individuals prior to authorizing access to organizational systems containing CUI and ensure that CUI and systems containing CUI are protected during and after personnel actions.",
    color: "cyan",
    categories: [
      {
        id: "3.9",
        name: "Personnel Security",
        subcategories: [
          {
            id: "3.9.1",
            description:
              "Screen individuals prior to authorizing access to organizational systems containing CUI.",
          },
          {
            id: "3.9.2",
            description:
              "Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHYSICAL PROTECTION (PE) — 6 requirements
  // ============================================================
  {
    id: "PE",
    name: "Physical Protection",
    description:
      "Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals.",
    color: "pink",
    categories: [
      {
        id: "3.10",
        name: "Physical Protection",
        subcategories: [
          {
            id: "3.10.1",
            description:
              "Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals.",
          },
          {
            id: "3.10.2",
            description:
              "Protect and monitor the physical facility and support infrastructure for organizational systems.",
          },
          {
            id: "3.10.3",
            description:
              "Escort visitors and monitor visitor activity.",
          },
          {
            id: "3.10.4",
            description:
              "Maintain audit logs of physical access.",
          },
          {
            id: "3.10.5",
            description:
              "Control and manage physical access devices.",
          },
          {
            id: "3.10.6",
            description:
              "Enforce safeguarding measures for CUI at alternate work sites.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // RISK ASSESSMENT (RA) — 3 requirements
  // ============================================================
  {
    id: "RA",
    name: "Risk Assessment",
    description:
      "Periodically assess the risk to organizational operations, organizational assets, and individuals resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.",
    color: "lime",
    categories: [
      {
        id: "3.11",
        name: "Risk Assessment",
        subcategories: [
          {
            id: "3.11.1",
            description:
              "Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.",
          },
          {
            id: "3.11.2",
            description:
              "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified.",
          },
          {
            id: "3.11.3",
            description:
              "Remediate vulnerabilities in accordance with risk assessments.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SECURITY ASSESSMENT AND MONITORING (CA) — 4 requirements
  // ============================================================
  {
    id: "CA",
    name: "Security Assessment",
    description:
      "Develop, document, and periodically update system security plans. Assess the security controls in organizational systems periodically, and develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities.",
    color: "rose",
    categories: [
      {
        id: "3.12",
        name: "Security Assessment",
        subcategories: [
          {
            id: "3.12.1",
            description:
              "Periodically assess the security controls in organizational systems to determine if the controls are effective in their application.",
          },
          {
            id: "3.12.2",
            description:
              "Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems.",
          },
          {
            id: "3.12.3",
            description:
              "Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls.",
          },
          {
            id: "3.12.4",
            description:
              "Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND COMMUNICATIONS PROTECTION (SC) — 16 requirements
  // ============================================================
  {
    id: "SC",
    name: "System and Communications Protection",
    description:
      "Monitor, control, and protect communications at the external boundaries and key internal boundaries of organizational systems. Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security.",
    color: "violet",
    categories: [
      {
        id: "3.13",
        name: "System and Communications Protection",
        subcategories: [
          {
            id: "3.13.1",
            description:
              "Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems.",
          },
          {
            id: "3.13.2",
            description:
              "Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational systems.",
          },
          {
            id: "3.13.3",
            description:
              "Separate user functionality from system management functionality.",
          },
          {
            id: "3.13.4",
            description:
              "Prevent unauthorized and unintended information transfer via shared system resources.",
          },
          {
            id: "3.13.5",
            description:
              "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.",
          },
          {
            id: "3.13.6",
            description:
              "Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception).",
          },
          {
            id: "3.13.7",
            description:
              "Prevent remote devices from simultaneously establishing non-remote connections with organizational systems and communicating via some other connection to resources in external networks (i.e., split tunneling).",
          },
          {
            id: "3.13.8",
            description:
              "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards.",
          },
          {
            id: "3.13.9",
            description:
              "Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.",
          },
          {
            id: "3.13.10",
            description:
              "Establish and manage cryptographic keys for cryptography employed in organizational systems.",
          },
          {
            id: "3.13.11",
            description:
              "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.",
          },
          {
            id: "3.13.12",
            description:
              "Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device.",
          },
          {
            id: "3.13.13",
            description:
              "Control and monitor the use of mobile code.",
          },
          {
            id: "3.13.14",
            description:
              "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.",
          },
          {
            id: "3.13.15",
            description:
              "Protect the authenticity of communications sessions.",
          },
          {
            id: "3.13.16",
            description:
              "Protect the confidentiality of CUI at rest.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SYSTEM AND INFORMATION INTEGRITY (SI) — 7 requirements
  // ============================================================
  {
    id: "SI",
    name: "System and Information Integrity",
    description:
      "Identify, report, and correct system flaws in a timely manner. Provide protection from malicious code at appropriate locations within organizational systems, and monitor system security alerts and advisories and take appropriate actions in response.",
    color: "emerald",
    categories: [
      {
        id: "3.14",
        name: "System and Information Integrity",
        subcategories: [
          {
            id: "3.14.1",
            description:
              "Identify, report, and correct system flaws in a timely manner.",
          },
          {
            id: "3.14.2",
            description:
              "Provide protection from malicious code at designated locations within organizational systems.",
          },
          {
            id: "3.14.3",
            description:
              "Monitor system security alerts and advisories and take action in response.",
          },
          {
            id: "3.14.4",
            description:
              "Update malicious code protection mechanisms when new releases are available.",
          },
          {
            id: "3.14.5",
            description:
              "Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed.",
          },
          {
            id: "3.14.6",
            description:
              "Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.",
          },
          {
            id: "3.14.7",
            description:
              "Identify unauthorized use of organizational systems.",
          },
        ],
      },
    ],
  },
];
