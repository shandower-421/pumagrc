// PCI DSS 4.0.1 - Payment Card Industry Data Security Standard
// Source: PCI Security Standards Council, PCI DSS v4.0.1 (June 2024)
// https://www.pcisecuritystandards.org

import type { FunctionDef } from '../types/assessment';

export const PCI_DSS: FunctionDef[] = [
  // ============================================================
  // Requirement 1: Install and Maintain Network Security Controls
  // ============================================================
  {
    id: "R1",
    name: "Install and Maintain Network Security Controls",
    description:
      "Network security controls (NSCs), such as firewalls and other network security technologies, are network policy enforcement points that typically control network traffic between two or more logical or physical network segments based on pre-defined policies or rules.",
    color: "blue",
    categories: [
      {
        id: "1.1",
        name: "Processes and Mechanisms for Installing and Maintaining Network Security Controls Are Defined and Understood",
        subcategories: [
          {
            id: "1.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 1 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "1.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 1 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "1.2",
        name: "Network Security Controls (NSCs) Are Configured and Maintained",
        subcategories: [
          {
            id: "1.2.1",
            description:
              "Configuration standards for NSC rulesets are defined, implemented, and maintained.",
          },
          {
            id: "1.2.2",
            description:
              "All changes to network connections and to configurations of NSCs are approved and managed in accordance with the change control process defined at Requirement 6.5.1.",
          },
          {
            id: "1.2.3",
            description:
              "An accurate network diagram(s) is maintained that shows all connections between the cardholder data environment (CDE) and other networks, including any wireless networks.",
          },
          {
            id: "1.2.4",
            description:
              "An accurate data-flow diagram(s) is maintained that meets the following: shows all account data flows across systems and networks, and is updated as needed upon changes to the environment.",
          },
          {
            id: "1.2.5",
            description:
              "All services, protocols, and ports allowed are identified, approved, and have a defined business need.",
          },
          {
            id: "1.2.6",
            description:
              "Security features are defined and implemented for all services, protocols, and ports that are in use and considered to be insecure, such that the risk is mitigated.",
          },
          {
            id: "1.2.7",
            description:
              "Configurations of NSCs are reviewed at least once every six months to confirm they are relevant and effective.",
          },
          {
            id: "1.2.8",
            description:
              "Configuration files for NSCs are secured from unauthorized access and kept consistent with active network configurations.",
          },
        ],
      },
      {
        id: "1.3",
        name: "Network Access to and from the Cardholder Data Environment Is Restricted",
        subcategories: [
          {
            id: "1.3.1",
            description:
              "Inbound traffic to the CDE is restricted to only that traffic which is necessary, and all other traffic is specifically denied.",
          },
          {
            id: "1.3.2",
            description:
              "Outbound traffic from the CDE is restricted to only that traffic which is necessary, and all other traffic is specifically denied.",
          },
          {
            id: "1.3.3",
            description:
              "NSCs are installed between all wireless networks and the CDE, regardless of whether the wireless network is a CDE, such that all wireless traffic into the CDE is denied by default and only authorized wireless traffic is allowed.",
          },
        ],
      },
      {
        id: "1.4",
        name: "Network Connections Between Trusted and Untrusted Networks Are Controlled",
        subcategories: [
          {
            id: "1.4.1",
            description:
              "NSCs are implemented between trusted and untrusted networks.",
          },
          {
            id: "1.4.2",
            description:
              "Inbound traffic from untrusted networks to trusted networks is restricted to communications with system components that are authorized to provide publicly accessible services, protocols, and ports.",
          },
          {
            id: "1.4.3",
            description:
              "Anti-spoofing measures are implemented to detect and block forged source IP addresses from entering the trusted network.",
          },
          {
            id: "1.4.4",
            description:
              "System components that store cardholder data are not directly accessible from untrusted networks.",
          },
          {
            id: "1.4.5",
            description:
              "The disclosure of internal IP addresses and routing information is limited to only authorized parties.",
          },
        ],
      },
      {
        id: "1.5",
        name: "Risks to the CDE from Computing Devices That Are Able to Connect via Both Untrusted Networks and the CDE Are Mitigated",
        subcategories: [
          {
            id: "1.5.1",
            description:
              "Security controls are implemented on any computing devices, including company- and employee-owned devices, that connect to both untrusted networks (including the Internet) and the CDE, to prevent threats being introduced into the entity's network.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 2: Apply Secure Configurations to All System Components
  // ============================================================
  {
    id: "R2",
    name: "Apply Secure Configurations to All System Components",
    description:
      "Malicious individuals, both external and internal to an entity, often use default passwords and other vendor default settings to compromise systems. These passwords and settings are well known and are easily determined via public information.",
    color: "purple",
    categories: [
      {
        id: "2.1",
        name: "Processes and Mechanisms for Applying Secure Configurations to All System Components Are Defined and Understood",
        subcategories: [
          {
            id: "2.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 2 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "2.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 2 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "2.2",
        name: "System Components Are Configured and Managed Securely",
        subcategories: [
          {
            id: "2.2.1",
            description:
              "Configuration standards are developed, implemented, and maintained to cover all system components, address all known security vulnerabilities, be consistent with industry-accepted system hardening standards, and be updated as new vulnerability issues are identified.",
          },
          {
            id: "2.2.2",
            description:
              "Vendor default accounts are managed as follows: if the vendor default account(s) will be used, the default password is changed. If the vendor default account(s) will not be used, the account is removed or disabled.",
          },
          {
            id: "2.2.3",
            description:
              "Primary functions requiring different security levels are managed as follows: only one primary function exists on a system component, or primary functions with differing security levels that exist on the same system component are isolated from each other, or primary functions with differing security levels on the same system component are all secured to the level required by the function with the highest security need.",
          },
          {
            id: "2.2.4",
            description:
              "Only necessary services, protocols, daemons, and functions are enabled, and all unnecessary functionality is removed or disabled.",
          },
          {
            id: "2.2.5",
            description:
              "If any insecure services, protocols, or daemons are present, business justification is documented, and additional security features are documented and implemented that reduce the risk of using insecure services, protocols, or daemons.",
          },
          {
            id: "2.2.6",
            description:
              "System security parameters are configured to prevent misuse.",
          },
          {
            id: "2.2.7",
            description:
              "All non-console administrative access is encrypted using strong cryptography.",
          },
        ],
      },
      {
        id: "2.3",
        name: "Wireless Environments Are Configured and Managed Securely",
        subcategories: [
          {
            id: "2.3.1",
            description:
              "For wireless environments connected to the CDE or transmitting account data, all wireless vendor defaults are changed at installation or are confirmed to be secure, including but not limited to default wireless encryption keys, passwords, and SNMP community strings.",
          },
          {
            id: "2.3.2",
            description:
              "For wireless environments connected to the CDE or transmitting account data, wireless encryption keys are changed whenever personnel with knowledge of the key leave the company or the role for which the knowledge was necessary, and whenever a key is suspected of or known to be compromised.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 3: Protect Stored Account Data
  // ============================================================
  {
    id: "R3",
    name: "Protect Stored Account Data",
    description:
      "Protection methods such as encryption, truncation, masking, and hashing are critical components of account data protection. If an intruder circumvents other security controls and gains access to encrypted data, the data is unreadable without the proper cryptographic keys.",
    color: "green",
    categories: [
      {
        id: "3.1",
        name: "Processes and Mechanisms for Protecting Stored Account Data Are Defined and Understood",
        subcategories: [
          {
            id: "3.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 3 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "3.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 3 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "3.2",
        name: "Storage of Account Data Is Kept to a Minimum",
        subcategories: [
          {
            id: "3.2.1",
            description:
              "Account data storage is kept to a minimum through implementation of data retention and disposal policies, procedures, and processes that include coverage for all locations of stored account data, coverage for any sensitive authentication data (SAD) stored prior to completion of authorization, limiting data storage amount and retention time to that which is required for legal, regulatory, and/or business requirements, specific retention requirements for stored account data that defines length of retention period and includes a documented business justification, processes for securely deleting or rendering account data unrecoverable when no longer needed, and a process for verifying at least once every three months that stored account data exceeding the defined retention period has been securely deleted or rendered unrecoverable.",
          },
        ],
      },
      {
        id: "3.3",
        name: "Sensitive Authentication Data (SAD) Is Not Stored After Authorization",
        subcategories: [
          {
            id: "3.3.1",
            description:
              "SAD is not retained after authorization, even if encrypted. All sensitive authentication data received is rendered unrecoverable upon completion of the authorization process.",
          },
          {
            id: "3.3.1.1",
            description:
              "The full contents of any track are not retained upon completion of the authorization process.",
          },
          {
            id: "3.3.1.2",
            description:
              "The card verification code is not retained upon completion of the authorization process.",
          },
          {
            id: "3.3.1.3",
            description:
              "The personal identification number (PIN) and the PIN block are not retained upon completion of the authorization process.",
          },
          {
            id: "3.3.2",
            description:
              "SAD that is stored electronically prior to completion of authorization is encrypted using strong cryptography.",
          },
          {
            id: "3.3.3",
            description:
              "Additional requirement for issuers and companies that support issuing services and store sensitive authentication data: any storage of sensitive authentication data is limited to that which is needed for a legitimate issuing business need and is secured, and encrypted using strong cryptography.",
          },
        ],
      },
      {
        id: "3.4",
        name: "Access to Displays of Full PAN and Ability to Copy Cardholder Data Are Restricted",
        subcategories: [
          {
            id: "3.4.1",
            description:
              "PAN is masked when displayed (the BIN and last four digits are the maximum number of digits to be displayed), such that only personnel with a legitimate business need can see more than the BIN and last four digits of the PAN.",
          },
          {
            id: "3.4.2",
            description:
              "When using remote-access technologies, technical controls prevent copy and/or relocation of PAN for all personnel, except for those with documented, explicit authorization and a legitimate, defined business need.",
          },
        ],
      },
      {
        id: "3.5",
        name: "Primary Account Number (PAN) Is Secured Wherever It Is Stored",
        subcategories: [
          {
            id: "3.5.1",
            description:
              "PAN is rendered unreadable anywhere it is stored by using any of the following approaches: one-way hashes based on strong cryptography of the entire PAN, truncation, index tokens, or strong cryptography with associated key-management processes and procedures.",
          },
          {
            id: "3.5.1.1",
            description:
              "Hashes used to render PAN unreadable (per the first bullet of Requirement 3.5.1) are keyed cryptographic hashes of the entire PAN, with associated key-management processes and procedures.",
          },
          {
            id: "3.5.1.2",
            description:
              "If disk-level or partition-level encryption (rather than file-, column-, or field-level database encryption) is used to render PAN unreadable, it is implemented only as follows: on removable electronic media, or if used for non-removable electronic media, PAN is also rendered unreadable via another mechanism that meets Requirement 3.5.1.",
          },
          {
            id: "3.5.1.3",
            description:
              "If disk-level or partition-level encryption is used (rather than file-, column-, or field-level database encryption) to render PAN unreadable, it is managed as follows: logical access is managed separately and independently of native operating system authentication and access control mechanisms, decryption keys are not associated with user accounts, and authentication factors that allow access to unencrypted PAN are stored securely.",
          },
        ],
      },
      {
        id: "3.6",
        name: "Cryptographic Keys Used to Protect Stored Account Data Are Secured",
        subcategories: [
          {
            id: "3.6.1",
            description:
              "Procedures are defined and implemented to protect cryptographic keys used to protect stored account data against disclosure and misuse.",
          },
          {
            id: "3.6.1.1",
            description:
              "Additional requirement for service providers only: a documented description of the cryptographic architecture is maintained that includes details of all algorithms, protocols, and keys used for the protection of stored account data, including key strength and expiry date, description of the key usage for each key, and inventory of any HSMs, KMIs, and other SCDs used for key management.",
          },
          {
            id: "3.6.1.2",
            description:
              "Secret and private keys used to encrypt/decrypt stored account data are stored in one (or more) of the following forms at all times: encrypted with a key-encrypting key that is at least as strong as the data-encrypting key, within a secure cryptographic device (SCD), as at least two full-length key components or key shares, in accordance with an industry-accepted method.",
          },
          {
            id: "3.6.1.3",
            description:
              "Access to cleartext cryptographic key components is restricted to the fewest number of custodians necessary.",
          },
          {
            id: "3.6.1.4",
            description:
              "Cryptographic keys are stored in the fewest possible locations.",
          },
        ],
      },
      {
        id: "3.7",
        name: "Where Cryptography Is Used to Protect Stored Account Data, Key Management Processes and Procedures Covering All Aspects of the Key Lifecycle Are Defined and Implemented",
        subcategories: [
          {
            id: "3.7.1",
            description:
              "Key-management policies and procedures are implemented to include generation of strong cryptographic keys.",
          },
          {
            id: "3.7.2",
            description:
              "Key-management policies and procedures are implemented to include secure distribution of cryptographic keys.",
          },
          {
            id: "3.7.3",
            description:
              "Key-management policies and procedures are implemented to include secure storage of cryptographic keys.",
          },
          {
            id: "3.7.4",
            description:
              "Key-management policies and procedures are implemented for cryptographic key changes for keys that have reached the end of their cryptoperiod, as defined by the associated application vendor or key owner, and based on industry best practices and guidelines.",
          },
          {
            id: "3.7.5",
            description:
              "Key-management policies and procedures are implemented to include the retirement, replacement, or destruction of keys as deemed necessary when the integrity of the key has been weakened, keys are suspected of or known to be compromised, or upon request of an entity using the key.",
          },
          {
            id: "3.7.6",
            description:
              "Where manual cleartext cryptographic key-management operations are performed by personnel, key-management policies and procedures are implemented to include split knowledge and dual control of keys.",
          },
          {
            id: "3.7.7",
            description:
              "Key-management policies and procedures are implemented to include prevention of unauthorized substitution of cryptographic keys.",
          },
          {
            id: "3.7.8",
            description:
              "Key-management policies and procedures are implemented to include that cryptographic key custodians formally acknowledge that they understand and accept their key-custodian responsibilities.",
          },
          {
            id: "3.7.9",
            description:
              "Additional requirement for service providers only: where a service provider shares cryptographic keys with its customers for transmission or storage of account data, guidance on secure transmission, storage, and updating of such keys is documented and distributed to the service provider's customers.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 4: Protect Cardholder Data with Strong Cryptography During Transmission
  // ============================================================
  {
    id: "R4",
    name: "Protect Cardholder Data with Strong Cryptography During Transmission Over Open, Public Networks",
    description:
      "Use of strong cryptography provides a greater assurance that account data is not accessible to malicious individuals during transmission over open, public networks. Certain implementations of PAN transmissions can be excluded from the scope of PCI DSS when specific conditions are met.",
    color: "amber",
    categories: [
      {
        id: "4.1",
        name: "Processes and Mechanisms for Protecting Cardholder Data with Strong Cryptography During Transmission Over Open, Public Networks Are Defined and Understood",
        subcategories: [
          {
            id: "4.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 4 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "4.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 4 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "4.2",
        name: "PAN Is Protected with Strong Cryptography During Transmission",
        subcategories: [
          {
            id: "4.2.1",
            description:
              "Strong cryptography and security protocols are implemented to safeguard PAN during transmission over open, public networks, including only trusted keys and certificates are accepted, certificates used to safeguard PAN during transmission over open public networks are confirmed as valid and are not expired or revoked, the protocol in use supports only secure versions or configurations and does not support fallback to or use of insecure versions configurations or cipher suites, and the encryption strength is appropriate for the encryption methodology in use.",
          },
          {
            id: "4.2.1.1",
            description:
              "An inventory of the entity's trusted keys and certificates used to protect PAN during transmission is maintained.",
          },
          {
            id: "4.2.1.2",
            description:
              "Wireless networks transmitting PAN or connected to the CDE use industry best practices to implement strong cryptography for authentication and transmission.",
          },
          {
            id: "4.2.2",
            description:
              "PAN is secured with strong cryptography whenever it is sent via end-user messaging technologies.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 5: Protect All Systems and Networks from Malicious Software
  // ============================================================
  {
    id: "R5",
    name: "Protect All Systems and Networks from Malicious Software",
    description:
      "Malicious software (malware) inserted into the network during many business-approved activities, including employee email, use of the Internet, mobile computers, and storage devices, results in the exploitation of system vulnerabilities.",
    color: "orange",
    categories: [
      {
        id: "5.1",
        name: "Processes and Mechanisms for Protecting All Systems and Networks from Malicious Software Are Defined and Understood",
        subcategories: [
          {
            id: "5.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 5 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "5.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 5 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "5.2",
        name: "Malicious Software (Malware) Is Prevented, or Detected and Addressed",
        subcategories: [
          {
            id: "5.2.1",
            description:
              "An anti-malware solution(s) is deployed on all system components, except for those system components identified in periodic evaluations per Requirement 5.2.3 that concludes the system components are not at risk from malware.",
          },
          {
            id: "5.2.2",
            description:
              "The deployed anti-malware solution(s) detects all known types of malware and removes, blocks, or contains all known types of malware.",
          },
          {
            id: "5.2.3",
            description:
              "Any system components that are not at risk for malware are evaluated periodically to include a documented list of all system components not at risk for malware, identification and evaluation of evolving malware threats for those system components, and confirmation whether such system components continue to not require anti-malware protection.",
          },
          {
            id: "5.2.3.1",
            description:
              "The frequency of periodic evaluations of system components identified as not at risk for malware is defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1.",
          },
        ],
      },
      {
        id: "5.3",
        name: "Anti-Malware Mechanisms and Processes Are Active, Maintained, and Monitored",
        subcategories: [
          {
            id: "5.3.1",
            description:
              "The anti-malware solution(s) is kept current via automatic updates.",
          },
          {
            id: "5.3.2",
            description:
              "The anti-malware solution(s) performs periodic scans and active or real-time scans, or performs continuous behavioral analysis of systems or processes.",
          },
          {
            id: "5.3.2.1",
            description:
              "If periodic malware scans are performed to meet Requirement 5.3.2, the frequency of scans is defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1.",
          },
          {
            id: "5.3.3",
            description:
              "For removable electronic media, the anti-malware solution(s) performs automatic scans of when the media is inserted, connected, or logically mounted, or performs continuous behavioral analysis of systems or processes when the media is inserted, connected, or logically mounted.",
          },
          {
            id: "5.3.4",
            description:
              "Audit logs for the anti-malware solution(s) are enabled and retained in accordance with Requirement 10.5.1.",
          },
          {
            id: "5.3.5",
            description:
              "Anti-malware mechanisms cannot be disabled or altered by users, unless specifically documented and authorized by management on a case-by-case basis for a limited time period.",
          },
        ],
      },
      {
        id: "5.4",
        name: "Anti-Phishing Mechanisms Protect Users Against Phishing Attacks",
        subcategories: [
          {
            id: "5.4.1",
            description:
              "Processes and automated mechanisms are in place to detect and protect personnel against phishing attacks.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 6: Develop and Maintain Secure Systems and Software
  // ============================================================
  {
    id: "R6",
    name: "Develop and Maintain Secure Systems and Software",
    description:
      "Actors with malicious intent can exploit security vulnerabilities to gain privileged access to systems. Many of these vulnerabilities are fixed by vendor-provided security patches, which must be installed by the entities that manage the systems.",
    color: "red",
    categories: [
      {
        id: "6.1",
        name: "Processes and Mechanisms for Developing and Maintaining Secure Systems and Software Are Defined and Understood",
        subcategories: [
          {
            id: "6.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 6 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "6.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 6 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "6.2",
        name: "Bespoke and Custom Software Are Developed Securely",
        subcategories: [
          {
            id: "6.2.1",
            description:
              "Bespoke and custom software are developed securely, as follows: based on industry standards and/or best practices for secure development, in accordance with PCI DSS, and incorporating information security throughout the software-development life cycle.",
          },
          {
            id: "6.2.2",
            description:
              "Software development personnel working on bespoke and custom software are trained at least once every 12 months on software security relevant to their job function and development languages, including secure software design and secure coding techniques, the use of tools/methods for detecting vulnerabilities in software, and how to use secure development techniques.",
          },
          {
            id: "6.2.3",
            description:
              "Bespoke and custom software is reviewed prior to being released into production or to customers, to identify and correct potential coding vulnerabilities, as follows: code reviews ensure code is developed according to secure coding guidelines, code reviews look for both existing and emerging software vulnerabilities, and appropriate corrections are implemented prior to release.",
          },
          {
            id: "6.2.3.1",
            description:
              "If manual code reviews are performed for bespoke and custom software prior to release to production, code changes are reviewed by individuals other than the originating code author, and by individuals who are knowledgeable about code-review techniques and secure coding practices, and management signs off that the review has been completed before the code is released.",
          },
          {
            id: "6.2.4",
            description:
              "Software engineering techniques or other methods are defined and in use by software development personnel to prevent or mitigate common software attacks and related vulnerabilities in bespoke and custom software, including but not limited to injection attacks, attacks on data and data structures, attacks on cryptography usage, attacks on business logic, attacks on access control mechanisms, and attacks on client-side handling.",
          },
        ],
      },
      {
        id: "6.3",
        name: "Security Vulnerabilities Are Identified and Addressed",
        subcategories: [
          {
            id: "6.3.1",
            description:
              "Security vulnerabilities are identified and managed as follows: new security vulnerabilities are identified using industry-recognized sources for security vulnerability information, vulnerabilities are assigned a risk ranking based on industry best practices and consideration of potential impact, risk rankings at a minimum identify all vulnerabilities considered to be high risk or critical to the environment, and vulnerabilities for bespoke and custom and third-party software are covered.",
          },
          {
            id: "6.3.2",
            description:
              "An inventory of bespoke and custom software, and third-party software components incorporated into bespoke and custom software, is maintained to facilitate vulnerability and patch management.",
          },
          {
            id: "6.3.3",
            description:
              "All system components are protected from known vulnerabilities by installing applicable security patches/updates as follows: critical or high-security patches/updates are installed within one month of release, and all other applicable security patches/updates are installed within an appropriate time frame as determined by the entity.",
          },
        ],
      },
      {
        id: "6.4",
        name: "Public-Facing Web Applications Are Protected Against Attacks",
        subcategories: [
          {
            id: "6.4.1",
            description:
              "For public-facing web applications, new threats and vulnerabilities are addressed on an ongoing basis and these applications are protected against known attacks as follows: reviewing public-facing web applications via manual or automated application vulnerability security assessment tools or methods at least once every 12 months and after significant changes, or installing an automated technical solution that continually detects and prevents web-based attacks.",
          },
          {
            id: "6.4.2",
            description:
              "For public-facing web applications, an automated technical solution is deployed that continually detects and prevents web-based attacks, with at least the following: is installed in front of public-facing web applications and is configured to detect and prevent web-based attacks, is actively running and up to date as applicable, is generating audit logs, and is configured to either block web-based attacks or generate an alert that is immediately investigated.",
          },
          {
            id: "6.4.3",
            description:
              "All payment page scripts that are loaded and executed in the consumer's browser are managed as follows: a method is implemented to confirm that each script is authorized, a method is implemented to assure the integrity of each script, an inventory of all scripts is maintained with written justification as to why each is necessary, and all scripts are authorized.",
          },
        ],
      },
      {
        id: "6.5",
        name: "Changes to All System Components Are Managed Securely",
        subcategories: [
          {
            id: "6.5.1",
            description:
              "Changes to all system components in the production environment are made according to established procedures that include documented change requests with description of change, documentation of security impact, documented change approval by authorized parties, testing to verify that the change does not adversely impact system security, for bespoke and custom software changes all updates are tested for compliance with Requirement 6.2.4 before being deployed into production, and procedures to address failures and return to a secure state.",
          },
          {
            id: "6.5.2",
            description:
              "Upon completion of a significant change, all applicable PCI DSS requirements are confirmed to be in place on all new or changed systems and networks, and documentation is updated as applicable.",
          },
          {
            id: "6.5.3",
            description:
              "Pre-production environments are separated from production environments and the separation is enforced with access controls.",
          },
          {
            id: "6.5.4",
            description:
              "Roles and functions are separated between production and pre-production environments to provide accountability such that only reviewed and approved changes are deployed.",
          },
          {
            id: "6.5.5",
            description:
              "Live PANs are not used in pre-production environments, except where those environments are included in the CDE and protected in accordance with all applicable PCI DSS requirements.",
          },
          {
            id: "6.5.6",
            description:
              "Test data and test accounts are removed from system components before the system goes into production.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 7: Restrict Access to System Components and Cardholder Data by Business Need to Know
  // ============================================================
  {
    id: "R7",
    name: "Restrict Access to System Components and Cardholder Data by Business Need to Know",
    description:
      "Unauthorized individuals may gain access to critical data or systems due to ineffective access control rules and definitions. To ensure critical data can only be accessed by authorized personnel, systems and processes must be in place to limit access based on need to know and according to job responsibilities.",
    color: "teal",
    categories: [
      {
        id: "7.1",
        name: "Processes and Mechanisms for Restricting Access to System Components and Cardholder Data by Business Need to Know Are Defined and Understood",
        subcategories: [
          {
            id: "7.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 7 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "7.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 7 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "7.2",
        name: "Access to System Components and Data Is Appropriately Defined and Assigned",
        subcategories: [
          {
            id: "7.2.1",
            description:
              "An access control model is defined and includes granting access as follows: appropriate access depending on the entity's business and access needs, access to system components and data resources that is based on users' job classification and functions, and the least privileges required (for example, user, administrator) to perform a job function.",
          },
          {
            id: "7.2.2",
            description:
              "Access is assigned to users, including privileged users, based on job classification and function, the least privileges necessary to perform job responsibilities, and is approved by authorized management.",
          },
          {
            id: "7.2.3",
            description:
              "Required privileges are approved by authorized personnel.",
          },
          {
            id: "7.2.4",
            description:
              "All user accounts and related access privileges, including third-party/vendor accounts, are reviewed at least once every six months to ensure user accounts and access remain appropriate based on job function, excessive privileges are removed, and accounts are still valid.",
          },
          {
            id: "7.2.5",
            description:
              "All application and system accounts and related access privileges are assigned and managed as follows: based on the least privileges necessary for the operability of the system or application, access is limited to the systems, applications, or processes that specifically require their use, and accounts are reviewed periodically to confirm that access remains appropriate.",
          },
          {
            id: "7.2.5.1",
            description:
              "All access by application and system accounts and related access privileges are reviewed at least once every six months to ensure such accounts and related access remain appropriate.",
          },
          {
            id: "7.2.6",
            description:
              "All user access to query repositories of stored cardholder data is restricted as follows: via applications or other programmatic methods, with access and allowed actions based on user roles and least privileges, and only the minimum amount of data needed is returned for the query.",
          },
        ],
      },
      {
        id: "7.3",
        name: "Access to System Components and Data Is Managed via an Access Control System(s)",
        subcategories: [
          {
            id: "7.3.1",
            description:
              "An access control system(s) is in place that restricts access based on a user's need to know and covers all system components.",
          },
          {
            id: "7.3.2",
            description:
              "The access control system(s) is configured to enforce permissions assigned to individuals, applications, and systems based on job classification and function.",
          },
          {
            id: "7.3.3",
            description:
              "The access control system(s) is set to 'deny all' by default.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 8: Identify Users and Authenticate Access to System Components
  // ============================================================
  {
    id: "R8",
    name: "Identify Users and Authenticate Access to System Components",
    description:
      "Two fundamental principles of identifying and authenticating users are to 1) establish the identity of an individual or process on a computer system, and 2) prove or verify the user associated with the identity is who the user claims to be.",
    color: "indigo",
    categories: [
      {
        id: "8.1",
        name: "Processes and Mechanisms for Identifying Users and Authenticating Access to System Components Are Defined and Understood",
        subcategories: [
          {
            id: "8.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 8 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "8.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 8 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "8.2",
        name: "User Identification and Related Accounts for Users and Administrators Are Strictly Managed Throughout an Account's Lifecycle",
        subcategories: [
          {
            id: "8.2.1",
            description:
              "All users are assigned a unique ID before access to system components or cardholder data is allowed.",
          },
          {
            id: "8.2.2",
            description:
              "Group, shared, or generic accounts, or other shared authentication credentials are only used when necessary on an exception basis and are managed as follows: account use is prevented unless needed for an exceptional circumstance, use is limited to the time needed for the exceptional circumstance, business justification for use is documented, individual user identity is confirmed before access to an account is granted, and every action taken is attributable to an individual user.",
          },
          {
            id: "8.2.3",
            description:
              "Additional requirement for service providers only: service providers with remote access to customer premises use unique authentication factors for each customer premises.",
          },
          {
            id: "8.2.4",
            description:
              "Addition, deletion, and modification of user IDs, authentication factors, and other identifier objects are managed as follows: defined and implemented with appropriate approvals, implemented with only the privileges specified on the documented approval, and the user list is reviewed and verified at regular intervals.",
          },
          {
            id: "8.2.5",
            description:
              "Access for terminated users is immediately revoked.",
          },
          {
            id: "8.2.6",
            description:
              "Inactive user accounts are removed or disabled within 90 days of inactivity.",
          },
          {
            id: "8.2.7",
            description:
              "Accounts used by third parties to access, support, or maintain system components via remote access are managed as follows: enabled only during the time period needed and disabled when not in use, and use is monitored for unexpected activity.",
          },
          {
            id: "8.2.8",
            description:
              "If a user session has been idle for more than 15 minutes, the user is required to re-authenticate to re-activate the terminal or session.",
          },
        ],
      },
      {
        id: "8.3",
        name: "Strong Authentication for Users and Administrators Is Established and Managed",
        subcategories: [
          {
            id: "8.3.1",
            description:
              "All user access to system components for users and administrators is authenticated via at least one of the following authentication factors: something you know, such as a password or passphrase, something you have, such as a token device or smart card, or something you are, such as a biometric element.",
          },
          {
            id: "8.3.2",
            description:
              "Strong cryptography is used to render all authentication factors unreadable during transmission and storage on all system components.",
          },
          {
            id: "8.3.3",
            description:
              "User identity is verified before modifying any authentication factor.",
          },
          {
            id: "8.3.4",
            description:
              "Invalid authentication attempts are limited by locking out the user ID after not more than 10 attempts, setting the lockout duration to a minimum of 30 minutes or until the user's identity is confirmed.",
          },
          {
            id: "8.3.5",
            description:
              "If passwords/passphrases are used as authentication factors to meet Requirement 8.3.1, they are set and reset for each user as follows: set to a unique value for first-time use and upon reset, and forced to be changed immediately after first use.",
          },
          {
            id: "8.3.6",
            description:
              "If passwords/passphrases are used as authentication factors to meet Requirement 8.3.1, they meet the following minimum level of complexity: a minimum length of 12 characters (or if the system does not support 12 characters, a minimum length of eight characters), and contain both numeric and alphabetic characters.",
          },
          {
            id: "8.3.7",
            description:
              "Individuals are not allowed to submit a new password/passphrase that is the same as any of the last four passwords/passphrases used.",
          },
          {
            id: "8.3.8",
            description:
              "Authentication policies and procedures are documented and communicated to all users including guidance on selecting strong authentication factors, guidance for how users should protect their authentication factors, instructions not to reuse previously used passwords/passphrases, and instructions to change the password/passphrase if there is any suspicion or knowledge that the password/passphrase has been compromised.",
          },
          {
            id: "8.3.9",
            description:
              "If passwords/passphrases are used as the only authentication factor for user access (i.e., in any single-factor authentication implementation), then either passwords/passphrases are changed at least once every 90 days, or the security posture of accounts is dynamically analyzed, and real-time access to resources is automatically determined accordingly.",
          },
          {
            id: "8.3.10",
            description:
              "Additional requirement for service providers only: if passwords/passphrases are used as the only authentication factor for customer user access to cardholder data (i.e., in any single-factor authentication implementation), then guidance is provided to customer users including guidance for customers to change their user passwords/passphrases periodically, and guidance as to when and under what circumstances passwords/passphrases are to be changed.",
          },
          {
            id: "8.3.10.1",
            description:
              "Additional requirement for service providers only: if passwords/passphrases are used as the only authentication factor for customer user access (i.e., in any single-factor authentication implementation), then either passwords/passphrases are changed at least once every 90 days, or the security posture of accounts is dynamically analyzed, and real-time access to resources is automatically determined accordingly.",
          },
          {
            id: "8.3.11",
            description:
              "Where authentication factors such as physical or logical security tokens, smart cards, or certificates are used, use of the factors is assigned to an individual user and not shared among multiple users, physical and/or logical controls ensure only the intended user can use that factor to gain access.",
          },
        ],
      },
      {
        id: "8.4",
        name: "Multi-Factor Authentication (MFA) Is Implemented to Secure Access into the CDE",
        subcategories: [
          {
            id: "8.4.1",
            description:
              "MFA is implemented for all non-console access into the CDE for personnel with administrative access.",
          },
          {
            id: "8.4.2",
            description:
              "MFA is implemented for all access into the CDE.",
          },
          {
            id: "8.4.3",
            description:
              "MFA is implemented for all remote network access originating from outside the entity's network that could access or impact the CDE as follows: all remote access by all personnel, both users and administrators, originating from outside the entity's network, and all remote access by third parties and vendors.",
          },
        ],
      },
      {
        id: "8.5",
        name: "Multi-Factor Authentication (MFA) Systems Are Configured to Prevent Misuse",
        subcategories: [
          {
            id: "8.5.1",
            description:
              "MFA systems are implemented as follows: the MFA system is not susceptible to replay attacks, MFA systems cannot be bypassed by any users including administrative users unless specifically documented and authorized by management on an exception basis for a limited time period, and at least two different types of authentication factors are used.",
          },
        ],
      },
      {
        id: "8.6",
        name: "Use of Application and System Accounts and Associated Authentication Factors Is Strictly Managed",
        subcategories: [
          {
            id: "8.6.1",
            description:
              "If accounts used by systems or applications can be used for interactive login, they are managed as follows: interactive use is prevented unless needed for an exceptional circumstance, interactive use is limited to the time needed for the exceptional circumstance, business justification for interactive use is documented, interactive use is explicitly approved by management, and individual user identity is confirmed before access to account is granted.",
          },
          {
            id: "8.6.2",
            description:
              "Passwords/passphrases for any application and system accounts that can be used for interactive login are not hard coded in scripts, configuration/property files, or bespoke and custom source code.",
          },
          {
            id: "8.6.3",
            description:
              "Passwords/passphrases for any application and system accounts are protected against misuse as follows: passwords/passphrases are changed periodically (at the frequency defined in the entity's targeted risk analysis) and upon suspicion or confirmation of compromise, and passwords/passphrases are constructed with sufficient complexity appropriate for how frequently the entity changes the passwords/passphrases.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 9: Restrict Physical Access to Cardholder Data
  // ============================================================
  {
    id: "R9",
    name: "Restrict Physical Access to Cardholder Data",
    description:
      "Any physical access to cardholder data or systems that store, process, or transmit cardholder data provides the opportunity for individuals to access and/or remove systems or hardcopies containing cardholder data; therefore, physical access should be appropriately restricted.",
    color: "pink",
    categories: [
      {
        id: "9.1",
        name: "Processes and Mechanisms for Restricting Physical Access to Cardholder Data Are Defined and Understood",
        subcategories: [
          {
            id: "9.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 9 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "9.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 9 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "9.2",
        name: "Physical Access Controls Manage Entry into Facilities and Systems Containing Cardholder Data",
        subcategories: [
          {
            id: "9.2.1",
            description:
              "Appropriate facility entry controls are in place to restrict physical access to systems in the CDE.",
          },
          {
            id: "9.2.1.1",
            description:
              "Individual physical access to sensitive areas within the CDE is monitored with either video cameras or physical access control mechanisms (or both) as follows: entry and exit points to/from sensitive areas within the CDE are monitored, monitoring devices or mechanisms are protected from tampering or disabling, and collected data is reviewed and correlated with other entries.",
          },
          {
            id: "9.2.2",
            description:
              "Physical and/or logical controls are implemented to restrict use of publicly accessible network jacks within the facility.",
          },
          {
            id: "9.2.3",
            description:
              "Physical access to wireless access points, gateways, networking/communications hardware, and telecommunication lines within the facility is restricted.",
          },
          {
            id: "9.2.4",
            description:
              "Access to consoles in sensitive areas is restricted via locking when not in use.",
          },
        ],
      },
      {
        id: "9.3",
        name: "Physical Access for Personnel and Visitors Is Authorized and Managed",
        subcategories: [
          {
            id: "9.3.1",
            description:
              "Procedures are implemented for authorizing and managing physical access of personnel to the CDE, including identifying personnel, managing changes to individual physical access requirements, and revoking or terminating personnel identification.",
          },
          {
            id: "9.3.1.1",
            description:
              "Physical access to sensitive areas within the CDE is controlled as follows: access is authorized and based on individual job function, access is revoked immediately upon termination, and all physical access mechanisms, such as keys, access cards, etc., are returned or disabled upon termination.",
          },
          {
            id: "9.3.2",
            description:
              "Procedures are implemented for authorizing and managing visitor access to the CDE, including visitors are authorized before entering, visitors are identified and given a badge or other identification that visibly distinguishes the visitors from personnel, visitors surrender the badge or identification before leaving the facility or at the date of expiration, and a visitor log is used to maintain a physical record of visitor activity.",
          },
          {
            id: "9.3.3",
            description:
              "Visitor badges or identification are surrendered or deactivated before visitors leave the facility or at the date of expiration.",
          },
          {
            id: "9.3.4",
            description:
              "A visitor log is used to maintain a physical audit trail of visitor activity to the facility as well as computer rooms and data centers where cardholder data is stored or transmitted. The log records the visitor's name, the firm represented, and the personnel authorizing physical access. The log is retained for at least three months unless otherwise restricted by law.",
          },
        ],
      },
      {
        id: "9.4",
        name: "Media with Cardholder Data Is Securely Stored, Accessed, Distributed, and Destroyed",
        subcategories: [
          {
            id: "9.4.1",
            description:
              "All media with cardholder data is physically secured.",
          },
          {
            id: "9.4.1.1",
            description:
              "Offline media backups with cardholder data are stored in a secure location.",
          },
          {
            id: "9.4.1.2",
            description:
              "The security of the offline media backup location(s) is reviewed at least once every 12 months.",
          },
          {
            id: "9.4.2",
            description:
              "All media with cardholder data is classified in accordance with the sensitivity of the data.",
          },
          {
            id: "9.4.3",
            description:
              "Media with cardholder data sent outside the facility is secured as follows: media sent outside the facility is logged, media is sent by secured courier or other delivery method that can be accurately tracked, and management approval is obtained prior to moving the media outside the facility.",
          },
          {
            id: "9.4.4",
            description:
              "Management approves all media with cardholder data that is moved outside the facility (including when media is distributed to individuals).",
          },
          {
            id: "9.4.5",
            description:
              "Inventory logs of all electronic media with cardholder data are maintained.",
          },
          {
            id: "9.4.5.1",
            description:
              "Inventories of electronic media with cardholder data are conducted at least once every 12 months.",
          },
          {
            id: "9.4.6",
            description:
              "Hard-copy materials with cardholder data are destroyed when no longer needed for business or legal reasons, as follows: materials are cross-cut shredded, incinerated, or pulped so that cardholder data cannot be reconstructed, and materials are stored in secure storage containers prior to destruction.",
          },
          {
            id: "9.4.7",
            description:
              "Electronic media with cardholder data is destroyed when no longer needed for business or legal reasons via one of the following: the electronic media is destroyed, the cardholder data is rendered unrecoverable so that it cannot be reconstructed.",
          },
        ],
      },
      {
        id: "9.5",
        name: "Point of Interaction (POI) Devices Are Protected from Tampering and Unauthorized Substitution",
        subcategories: [
          {
            id: "9.5.1",
            description:
              "POI devices that capture payment card data via direct physical interaction with the payment card form factor are protected from tampering and unauthorized substitution, including maintaining a list of POI devices, periodically inspecting POI device surfaces to detect tampering or unauthorized substitution, and training personnel to be aware of suspicious behavior and to report tampering or unauthorized substitution of devices.",
          },
          {
            id: "9.5.1.1",
            description:
              "An up-to-date list of POI devices is maintained, including make and model of the device, location of the device, and device serial number or other method of unique identification.",
          },
          {
            id: "9.5.1.2",
            description:
              "POI device surfaces are periodically inspected to detect tampering and unauthorized substitution.",
          },
          {
            id: "9.5.1.2.1",
            description:
              "The frequency of periodic POI device inspections and the type of inspections performed is defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1.",
          },
          {
            id: "9.5.1.3",
            description:
              "Training is provided for personnel in POI environments to be aware of attempted tampering or replacement of POI devices, and includes verifying the identity of any third-party persons claiming to be repair or maintenance personnel prior to granting them access to modify or troubleshoot devices, not to install, replace, or return devices without verification, being aware of suspicious behavior around devices, and reporting suspicious behavior and indications of device tampering or substitution to appropriate personnel.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 10: Log and Monitor All Access to System Components and Cardholder Data
  // ============================================================
  {
    id: "R10",
    name: "Log and Monitor All Access to System Components and Cardholder Data",
    description:
      "Logging mechanisms and the ability to track user activities are critical in preventing, detecting, or minimizing the impact of a data compromise. The presence of logs on all system components and in the cardholder data environment allows thorough tracking, alerting, and analysis when something does go wrong.",
    color: "cyan",
    categories: [
      {
        id: "10.1",
        name: "Processes and Mechanisms for Logging and Monitoring All Access to System Components and Cardholder Data Are Defined and Understood",
        subcategories: [
          {
            id: "10.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 10 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "10.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 10 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "10.2",
        name: "Audit Logs Are Implemented to Support the Detection of Anomalies and Suspicious Activity",
        subcategories: [
          {
            id: "10.2.1",
            description:
              "Audit logs are enabled and active for all system components and cardholder data.",
          },
          {
            id: "10.2.1.1",
            description:
              "Audit logs capture all individual user access to cardholder data.",
          },
          {
            id: "10.2.1.2",
            description:
              "Audit logs capture all actions taken by any individual with administrative access, including any interactive use of application or system accounts.",
          },
          {
            id: "10.2.1.3",
            description:
              "Audit logs capture all access to audit logs.",
          },
          {
            id: "10.2.1.4",
            description:
              "Audit logs capture all invalid logical access attempts.",
          },
          {
            id: "10.2.1.5",
            description:
              "Audit logs capture all changes to identification and authentication credentials including but not limited to creation of new accounts, elevation of privileges, and all changes, additions, or deletions to accounts with administrative access.",
          },
          {
            id: "10.2.1.6",
            description:
              "Audit logs capture the following: all initialization of new audit logs and all starting, stopping, or pausing of the existing audit logs.",
          },
          {
            id: "10.2.1.7",
            description:
              "Audit logs capture all creation and deletion of system-level objects.",
          },
          {
            id: "10.2.2",
            description:
              "Audit logs record the following details for each auditable event: user identification, type of event, date and time, success and failure indication, origination of event, and identity or name of affected data, system component, resource, or service.",
          },
        ],
      },
      {
        id: "10.3",
        name: "Audit Logs Are Protected from Destruction and Unauthorized Modifications",
        subcategories: [
          {
            id: "10.3.1",
            description:
              "Read access to audit logs files is limited to those with a job-related need.",
          },
          {
            id: "10.3.2",
            description:
              "Audit log files are protected to prevent modifications by individuals.",
          },
          {
            id: "10.3.3",
            description:
              "Audit log files, including those for external-facing technologies, are promptly backed up to a secure, central, internal log server(s) or other media that is difficult to alter.",
          },
          {
            id: "10.3.4",
            description:
              "File integrity monitoring or change-detection mechanisms is used on audit logs to ensure that existing log data cannot be changed without generating alerts.",
          },
        ],
      },
      {
        id: "10.4",
        name: "Audit Logs Are Reviewed to Identify Anomalies or Suspicious Activity",
        subcategories: [
          {
            id: "10.4.1",
            description:
              "The following audit logs are reviewed at least once daily: all security events, logs of all system components that store, process, or transmit CHD and/or SAD, logs of all critical system components, and logs of all servers and system components that perform security functions.",
          },
          {
            id: "10.4.1.1",
            description:
              "Automated mechanisms are used to perform audit log reviews.",
          },
          {
            id: "10.4.2",
            description:
              "Logs of all other system components (those not specified in Requirement 10.4.1) are reviewed periodically.",
          },
          {
            id: "10.4.2.1",
            description:
              "The frequency of periodic log reviews for all other system components (not defined in Requirement 10.4.1) is defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1.",
          },
          {
            id: "10.4.3",
            description:
              "Exceptions and anomalies identified during the review process are addressed.",
          },
        ],
      },
      {
        id: "10.5",
        name: "Audit Log History Is Retained and Available for Analysis",
        subcategories: [
          {
            id: "10.5.1",
            description:
              "Retain audit log history for at least 12 months, with at least the most recent three months immediately available for analysis.",
          },
        ],
      },
      {
        id: "10.6",
        name: "Time-Synchronization Mechanisms Support Consistent Time Settings Across All Systems",
        subcategories: [
          {
            id: "10.6.1",
            description:
              "System clocks and time are synchronized using time-synchronization technology.",
          },
          {
            id: "10.6.2",
            description:
              "Systems are configured to the correct and consistent time as follows: one or more designated time servers are in use, only the designated central time server(s) receives time from external sources, time received from external sources is based on International Atomic Time or Coordinated Universal Time (UTC), the designated time server(s) accept time updates only from specific industry-accepted external sources, and where there is more than one designated time server, the time servers peer with one another to keep accurate time.",
          },
          {
            id: "10.6.3",
            description:
              "Time synchronization settings and data are protected as follows: access to time data is restricted to only personnel with a business need, and any changes to time settings on critical systems are logged, monitored, and reviewed.",
          },
        ],
      },
      {
        id: "10.7",
        name: "Failures of Critical Security Control Systems Are Detected, Reported, and Responded to Promptly",
        subcategories: [
          {
            id: "10.7.1",
            description:
              "Additional requirement for service providers only: failures of critical security control systems are detected, alerted, and addressed promptly, including but not limited to failure of network security controls, IDS/IPS, FIM, anti-malware solutions, physical access controls, logical access controls, audit logging mechanisms, and segmentation controls (if used).",
          },
          {
            id: "10.7.2",
            description:
              "Failures of critical security control systems are detected, alerted, and addressed promptly, including but not limited to failure of network security controls, IDS/IPS, change-detection mechanisms, anti-malware solutions, physical access controls, logical access controls, audit logging mechanisms, segmentation controls (if used), and audit log review mechanisms.",
          },
          {
            id: "10.7.3",
            description:
              "Failures of any critical security controls systems are responded to promptly, including but not limited to restoring security functions, identifying and documenting the duration of the security failure, identifying and documenting the cause(s) of failure and documenting remediation required, performing a risk assessment to determine whether further actions are required, implementing controls to prevent the cause of failure from recurring, and resuming monitoring of security controls.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 11: Test Security of Systems and Networks Regularly
  // ============================================================
  {
    id: "R11",
    name: "Test Security of Systems and Networks Regularly",
    description:
      "Vulnerabilities are being discovered continually by malicious individuals and researchers, and being introduced by new software. System components, processes, and bespoke and custom software should be tested frequently to ensure security controls continue to reflect a changing environment.",
    color: "lime",
    categories: [
      {
        id: "11.1",
        name: "Processes and Mechanisms for Regularly Testing Security of Systems and Networks Are Defined and Understood",
        subcategories: [
          {
            id: "11.1.1",
            description:
              "All security policies and operational procedures that are identified in Requirement 11 are documented, kept up to date, in use, and known to all affected parties.",
          },
          {
            id: "11.1.2",
            description:
              "Roles and responsibilities for performing activities in Requirement 11 are documented, assigned, and understood.",
          },
        ],
      },
      {
        id: "11.2",
        name: "Wireless Access Points Are Identified and Monitored, and Unauthorized Wireless Access Points Are Addressed",
        subcategories: [
          {
            id: "11.2.1",
            description:
              "Authorized and unauthorized wireless access points are managed as follows: the presence of wireless (Wi-Fi) access points is tested for, all authorized and unauthorized wireless access points are detected and identified, testing, detection, and identification occurs at least once every three months, and if automated monitoring is used, personnel are notified via generated alerts.",
          },
          {
            id: "11.2.2",
            description:
              "An inventory of authorized wireless access points is maintained, including a documented business justification.",
          },
        ],
      },
      {
        id: "11.3",
        name: "External and Internal Vulnerabilities Are Regularly Identified, Prioritized, and Addressed",
        subcategories: [
          {
            id: "11.3.1",
            description:
              "Internal vulnerability scans are performed as follows: at least once every three months, and high-risk and critical vulnerabilities (per the entity's vulnerability risk rankings defined at Requirement 6.3.1) are resolved, rescans are performed that confirm all high-risk and critical vulnerabilities (as noted above) have been resolved, and the scan tool is kept up to date with latest vulnerability information.",
          },
          {
            id: "11.3.1.1",
            description:
              "All other applicable vulnerabilities (those not ranked as high-risk or critical per the entity's vulnerability risk rankings defined at Requirement 6.3.1) are managed as follows: addressed based on the risk defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1, and rescans are conducted as needed.",
          },
          {
            id: "11.3.1.2",
            description:
              "Internal vulnerability scans are performed via authenticated scanning as follows: systems that are unable to accept credentials for authenticated scanning are documented, sufficient privileges are used for those systems that accept credentials for scanning, and if accounts used for authenticated scanning can be used for interactive login, they are managed in accordance with Requirement 8.6.1.",
          },
          {
            id: "11.3.1.3",
            description:
              "Internal vulnerability scans are performed after any significant change as follows: high-risk and critical vulnerabilities (per the entity's vulnerability risk rankings defined at Requirement 6.3.1) are resolved, and rescans are conducted as needed.",
          },
          {
            id: "11.3.2",
            description:
              "External vulnerability scans are performed as follows: at least once every three months, by a PCI SSC Approved Scanning Vendor (ASV), vulnerabilities are resolved and ASV Program Guide requirements for a passing scan are met, and rescans are performed as needed to confirm that vulnerabilities are resolved per the ASV Program Guide requirements for a passing scan.",
          },
          {
            id: "11.3.2.1",
            description:
              "External vulnerability scans are performed after any significant change as follows: vulnerabilities that are scored 4.0 or higher by the CVSS are resolved, and rescans are conducted as needed.",
          },
        ],
      },
      {
        id: "11.4",
        name: "External and Internal Penetration Testing Is Regularly Performed, and Exploitable Vulnerabilities and Security Weaknesses Are Corrected",
        subcategories: [
          {
            id: "11.4.1",
            description:
              "A penetration testing methodology is defined, documented, and implemented by the entity, and includes industry-accepted penetration testing approaches, coverage for the entire CDE perimeter and critical systems, testing from both inside and outside the network, testing to validate any segmentation and scope-reduction controls, application-layer penetration testing to identify at a minimum the vulnerabilities listed in Requirement 6.2.4, and network-layer penetration tests that encompass all components that support network functions as well as operating systems.",
          },
          {
            id: "11.4.2",
            description:
              "Internal penetration testing is performed per the entity's defined methodology at least once every 12 months, and after any significant infrastructure or application upgrade or change.",
          },
          {
            id: "11.4.3",
            description:
              "External penetration testing is performed per the entity's defined methodology at least once every 12 months, and after any significant infrastructure or application upgrade or change.",
          },
          {
            id: "11.4.4",
            description:
              "Exploitable vulnerabilities and security weaknesses found during penetration testing are corrected as follows: in accordance with the entity's assessment of the risk posed by the security issue as defined in Requirement 6.3.1, penetration testing is repeated to verify the corrections.",
          },
          {
            id: "11.4.5",
            description:
              "If segmentation is used to isolate the CDE from other networks, penetration tests are performed on segmentation controls as follows: at least once every 12 months and after any changes to segmentation controls/methods, covering all segmentation controls/methods in use, according to the entity's defined penetration testing methodology, confirming that the segmentation controls/methods are operational and effective, and confirming PCI DSS scope is accurate.",
          },
          {
            id: "11.4.6",
            description:
              "Additional requirement for service providers only: if segmentation is used to isolate the CDE from other networks, penetration tests are performed on segmentation controls as follows: at least once every six months and after any changes to segmentation controls/methods, covering all segmentation controls/methods in use, according to the entity's defined penetration testing methodology, confirming that the segmentation controls/methods are operational and effective, and confirming PCI DSS scope is accurate.",
          },
          {
            id: "11.4.7",
            description:
              "Additional requirement for multi-tenant service providers only: multi-tenant service providers support their customers for external penetration testing per Requirement 11.4.3 and 11.4.4.",
          },
        ],
      },
      {
        id: "11.5",
        name: "Network Intrusions and Unexpected File Changes Are Detected and Responded To",
        subcategories: [
          {
            id: "11.5.1",
            description:
              "Intrusion-detection and/or intrusion-prevention techniques are used to detect and/or prevent intrusions into the network as follows: all traffic is monitored at the perimeter of the CDE, all traffic is monitored at critical points in the CDE, and personnel are alerted to suspected compromises.",
          },
          {
            id: "11.5.1.1",
            description:
              "Additional requirement for service providers only: intrusion-detection and/or intrusion-prevention techniques detect, alert on/prevent, and address covert malware communication channels.",
          },
          {
            id: "11.5.2",
            description:
              "A change-detection mechanism (for example, file integrity monitoring tools) is deployed as follows: to alert personnel to unauthorized modification (including changes, additions, and deletions) of critical files, and critical file comparisons are performed at least once weekly.",
          },
        ],
      },
      {
        id: "11.6",
        name: "Unauthorized Changes on Payment Pages Are Detected and Responded To",
        subcategories: [
          {
            id: "11.6.1",
            description:
              "A change- and tamper-detection mechanism is deployed as follows: to alert personnel to unauthorized modification (including indicators of compromise, changes, additions, and deletions) to the HTTP headers and the contents of payment pages as received by the consumer browser, and the mechanism is configured to evaluate the received HTTP header and payment page.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Requirement 12: Support Information Security with Organizational Policies and Programs
  // ============================================================
  {
    id: "R12",
    name: "Support Information Security with Organizational Policies and Programs",
    description:
      "The organization's overall information security policy sets the tone for the whole entity and informs personnel what is expected of them. All personnel should be aware of the sensitivity of cardholder data and their responsibilities for protecting it.",
    color: "rose",
    categories: [
      {
        id: "12.1",
        name: "A Comprehensive Information Security Policy That Governs and Provides Direction for Protection of the Entity's Information Assets Is Known and Current",
        subcategories: [
          {
            id: "12.1.1",
            description:
              "An overall information security policy is established, published, maintained, and disseminated to all relevant personnel, as well as to relevant vendors and business partners.",
          },
          {
            id: "12.1.2",
            description:
              "The information security policy is reviewed at least once every 12 months and updated as needed to reflect changes to business objectives or the risk environment.",
          },
          {
            id: "12.1.3",
            description:
              "The security policy clearly defines information security roles and responsibilities for all personnel, and all personnel are aware of and acknowledge their information security responsibilities.",
          },
          {
            id: "12.1.4",
            description:
              "Responsibility for information security is formally assigned to a Chief Information Security Officer or other information security knowledgeable member of executive management.",
          },
        ],
      },
      {
        id: "12.2",
        name: "Acceptable Use Policies for End-User Technologies Are Defined and Implemented",
        subcategories: [
          {
            id: "12.2.1",
            description:
              "Acceptable use policies for end-user technologies are documented and implemented, including explicit approval by authorized parties to use the technology, acceptable uses of the technology, and a list of company-approved products for employee use including hardware and software.",
          },
        ],
      },
      {
        id: "12.3",
        name: "Risks to the Cardholder Data Environment Are Formally Identified, Evaluated, and Managed",
        subcategories: [
          {
            id: "12.3.1",
            description:
              "Each PCI DSS requirement that provides flexibility for how frequently it is performed (for example, requirements to be performed periodically) is supported by a targeted risk analysis that is documented and includes identification of the assets being protected, identification of the threat(s) that the requirement is protecting against, identification of factors that contribute to the likelihood and/or impact of a threat being realized, resulting analysis that determines and includes justification for how frequently the requirement must be performed to minimize the likelihood of the threat being realized, and review of each targeted risk analysis at least once every 12 months to determine whether the results are still valid or an updated risk analysis is needed.",
          },
          {
            id: "12.3.2",
            description:
              "A targeted risk analysis is performed for each PCI DSS requirement that the entity meets with the customized approach, to include a documented evidence of detailed analysis for each element specified in that requirement, approval of documented evidence by senior management, and performance of the targeted risk analysis at least once every 12 months.",
          },
          {
            id: "12.3.3",
            description:
              "Cryptographic cipher suites and protocols in use are documented and reviewed at least once every 12 months, including an up-to-date inventory of all cryptographic cipher suites and protocols in use including purpose and where used, active monitoring of industry trends regarding continued viability of all cryptographic cipher suites and protocols in use, and a documented strategy to respond to anticipated changes in cryptographic vulnerabilities.",
          },
          {
            id: "12.3.4",
            description:
              "Hardware and software technologies in use are reviewed at least once every 12 months, including analysis that the technologies continue to receive security fixes from vendors promptly, analysis that the technologies continue to support (and do not preclude) the entity's PCI DSS compliance, and documentation of any industry announcements or trends related to a technology, such as when a vendor has announced 'end of life' plans for a technology.",
          },
        ],
      },
      {
        id: "12.4",
        name: "PCI DSS Compliance Is Managed",
        subcategories: [
          {
            id: "12.4.1",
            description:
              "Additional requirement for service providers only: responsibility is established by executive management for the protection of cardholder data and a PCI DSS compliance program to include overall accountability for maintaining PCI DSS compliance, defining a charter for a PCI DSS compliance program and communication to executive management.",
          },
          {
            id: "12.4.2",
            description:
              "Additional requirement for service providers only: reviews are performed at least once every three months to confirm that personnel are performing their tasks in accordance with all security policies and operational procedures. Reviews are performed by personnel other than those responsible for performing the given task and include but are not limited to daily log reviews, firewall rule-set reviews, applying configuration standards to new systems, responding to security alerts, and change management processes.",
          },
          {
            id: "12.4.2.1",
            description:
              "Additional requirement for service providers only: reviews performed per Requirement 12.4.2 are documented to include results of the reviews, documented remediation actions taken for any tasks that were found to not be performed, and review and sign-off of results by personnel assigned responsibility for the PCI DSS compliance program.",
          },
        ],
      },
      {
        id: "12.5",
        name: "PCI DSS Scope Is Documented and Validated",
        subcategories: [
          {
            id: "12.5.1",
            description:
              "An inventory of system components that are in scope for PCI DSS, including a description of function/use for each, is maintained and kept current.",
          },
          {
            id: "12.5.2",
            description:
              "PCI DSS scope is documented and confirmed by the entity at least once every 12 months and upon significant change to the in-scope environment. At a minimum, the scoping validation includes identifying all data flows for account data, identifying all locations where account data is stored processed and transmitted, identifying all system components in the CDE, identifying all segmentation controls in use and the environment(s) from which the CDE is segmented, identifying any connections from third-party entities with access to the CDE, and confirming that all identified data flows locations system components segmentation controls and third-party connections are included in scope.",
          },
          {
            id: "12.5.2.1",
            description:
              "Additional requirement for service providers only: PCI DSS scope is documented and confirmed by the entity at least once every six months and upon significant change to the in-scope environment.",
          },
          {
            id: "12.5.3",
            description:
              "Additional requirement for service providers only: significant changes to organizational structure result in a documented (internal) review of the impact to PCI DSS scope and applicability of controls, with results communicated to executive management.",
          },
        ],
      },
      {
        id: "12.6",
        name: "Security Awareness Education Is an Ongoing Activity",
        subcategories: [
          {
            id: "12.6.1",
            description:
              "A formal security awareness program is implemented to make all personnel aware of the entity's information security policy and procedures, and their role in protecting cardholder data.",
          },
          {
            id: "12.6.2",
            description:
              "The security awareness program is reviewed at least once every 12 months and updated as needed to address any new threats and vulnerabilities that may impact the security of the entity's CDE, or the information provided to personnel about their role in protecting cardholder data.",
          },
          {
            id: "12.6.3",
            description:
              "Personnel receive security awareness training as follows: upon hire and at least once every 12 months, and multiple methods of communication are used.",
          },
          {
            id: "12.6.3.1",
            description:
              "Security awareness training includes awareness of threats and vulnerabilities that could impact the security of the CDE, including but not limited to phishing and related attacks, and social engineering.",
          },
          {
            id: "12.6.3.2",
            description:
              "Security awareness training includes awareness about the acceptable use of end-user technologies in accordance with Requirement 12.2.1.",
          },
        ],
      },
      {
        id: "12.7",
        name: "Personnel Are Screened to Reduce Risks from Insider Threats",
        subcategories: [
          {
            id: "12.7.1",
            description:
              "Potential personnel who will have access to the CDE are screened, within the constraints of local laws, prior to hire to minimize the risk of attacks from internal sources.",
          },
        ],
      },
      {
        id: "12.8",
        name: "Risk to Information Assets Associated with Third-Party Service Provider (TPSP) Relationships Is Managed",
        subcategories: [
          {
            id: "12.8.1",
            description:
              "A list of all third-party service providers (TPSPs) with which account data is shared or that could affect the security of account data is maintained, including a description of each of the services provided.",
          },
          {
            id: "12.8.2",
            description:
              "Written agreements with TPSPs are maintained as follows: written agreements are maintained with all TPSPs with which account data is shared or that could affect the security of the CDE, and written agreements include acknowledgements from TPSPs that they are responsible for the security of account data the TPSPs possess or otherwise store, process, or transmit on behalf of the entity, or to the extent that they could impact the security of the entity's CDE.",
          },
          {
            id: "12.8.3",
            description:
              "An established process is implemented for engaging TPSPs, including proper due diligence prior to engagement.",
          },
          {
            id: "12.8.4",
            description:
              "A program is implemented to monitor TPSPs' PCI DSS compliance status at least once every 12 months.",
          },
          {
            id: "12.8.5",
            description:
              "Information is maintained about which PCI DSS requirements are managed by each TPSP, which are managed by the entity, and any that are shared between the TPSP and the entity.",
          },
        ],
      },
      {
        id: "12.9",
        name: "Third-Party Service Providers (TPSPs) Support Their Customers' PCI DSS Compliance",
        subcategories: [
          {
            id: "12.9.1",
            description:
              "Additional requirement for service providers only: TPSPs provide written agreements to customers that include acknowledgements that the TPSP is responsible for the security of account data the TPSP possesses or otherwise stores, processes, or transmits on behalf of the customer, or to the extent that the TPSP could impact the security of the customer's CDE.",
          },
          {
            id: "12.9.2",
            description:
              "Additional requirement for service providers only: TPSPs support their customers' requests for information to meet Requirements 12.8.4 and 12.8.5 by providing upon customer request PCI DSS compliance status information for any service the TPSP performs on behalf of customers, and information about which PCI DSS requirements are the responsibility of the TPSP and which are the responsibility of the customer.",
          },
        ],
      },
      {
        id: "12.10",
        name: "Suspected and Confirmed Security Incidents That Could Impact the CDE Are Responded to Immediately",
        subcategories: [
          {
            id: "12.10.1",
            description:
              "An incident response plan exists and is ready to be activated in the event of a suspected or confirmed security incident. The plan addresses at a minimum roles responsibilities and communication and contact strategies in the event of a suspected or confirmed security incident, incident response procedures with specific containment and mitigation activities for different types of incidents, business recovery and continuity procedures, data backup processes, analysis of legal requirements for reporting compromises, coverage and responses of all critical system components, and reference or inclusion of incident response procedures from the payment brands.",
          },
          {
            id: "12.10.2",
            description:
              "At least once every 12 months, the security incident response plan is reviewed and the content is updated as needed, and tested including all elements listed in Requirement 12.10.1.",
          },
          {
            id: "12.10.3",
            description:
              "Specific personnel are designated to be available on a 24/7 basis to respond to suspected or confirmed security incidents.",
          },
          {
            id: "12.10.4",
            description:
              "Personnel responsible for responding to suspected and confirmed security incidents are appropriately and periodically trained on their incident response responsibilities.",
          },
          {
            id: "12.10.4.1",
            description:
              "The frequency of periodic training for incident response personnel is defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1.",
          },
          {
            id: "12.10.5",
            description:
              "The security incident response plan includes monitoring and responding to alerts from security monitoring systems, including but not limited to intrusion-detection and intrusion-prevention systems, network security controls, change-detection mechanisms for critical files, the change- and tamper-detection mechanism for payment pages, and detection of unauthorized wireless access points.",
          },
          {
            id: "12.10.6",
            description:
              "The security incident response plan is modified and evolved according to lessons learned and to incorporate industry developments.",
          },
          {
            id: "12.10.7",
            description:
              "Incident response procedures are in place, to be initiated upon the detection of stored PAN anywhere it is not expected, and include determining what to do if PAN is discovered outside the CDE, including its retrieval, secure deletion, and/or migration into the currently defined CDE as applicable, identifying whether sensitive authentication data is stored with PAN, determining where the account data came from and how it ended up where it was not expected, and remediating data leaks or process gaps that resulted in the account data being where it was not expected.",
          },
        ],
      },
    ],
  },
];
