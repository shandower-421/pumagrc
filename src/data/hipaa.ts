// HIPAA Security Rule (45 CFR Part 164 Subpart C) - Complete Implementation Specifications
// Source: U.S. Department of Health and Human Services
// https://www.hhs.gov/hipaa/for-professionals/security/index.html

import type { FunctionDef } from '../types/assessment';

export const HIPAA: FunctionDef[] = [
  // ============================================================
  // ADMINISTRATIVE SAFEGUARDS — §164.308
  // ============================================================
  {
    id: "ADM",
    name: "Administrative Safeguards",
    description:
      "Administrative actions, policies, and procedures to manage the selection, development, implementation, and maintenance of security measures to protect electronic protected health information (ePHI) and to manage the conduct of the covered entity's or business associate's workforce.",
    color: "blue",
    categories: [
      {
        id: "308.a1",
        name: "Security Management Process",
        subcategories: [
          {
            id: "308.a1.i",
            description:
              "Implement policies and procedures to prevent, detect, contain, and correct security violations.",
          },
          {
            id: "308.a1.iiA",
            description:
              "(Required) Risk Analysis: Conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of ePHI held by the covered entity or business associate.",
          },
          {
            id: "308.a1.iiB",
            description:
              "(Required) Risk Management: Implement security measures sufficient to reduce risks and vulnerabilities to a reasonable and appropriate level to comply with §164.306(a).",
          },
          {
            id: "308.a1.iiC",
            description:
              "(Required) Sanction Policy: Apply appropriate sanctions against workforce members who fail to comply with the security policies and procedures of the covered entity or business associate.",
          },
          {
            id: "308.a1.iiD",
            description:
              "(Required) Information System Activity Review: Implement procedures to regularly review records of information system activity, such as audit logs, access reports, and security incident tracking reports.",
          },
        ],
      },
      {
        id: "308.a2",
        name: "Assigned Security Responsibility",
        subcategories: [
          {
            id: "308.a2.i",
            description:
              "(Required) Identify the security official who is responsible for the development and implementation of the policies and procedures required by this subpart for the covered entity or business associate.",
          },
        ],
      },
      {
        id: "308.a3",
        name: "Workforce Security",
        subcategories: [
          {
            id: "308.a3.i",
            description:
              "Implement policies and procedures to ensure that all members of its workforce have appropriate access to ePHI, as provided under the Information Access Management standard, and to prevent those workforce members who do not have access from obtaining access to ePHI.",
          },
          {
            id: "308.a3.iiA",
            description:
              "(Addressable) Authorization and/or Supervision: Implement procedures for the authorization and/or supervision of workforce members who work with ePHI or in locations where it might be accessed.",
          },
          {
            id: "308.a3.iiB",
            description:
              "(Addressable) Workforce Clearance Procedure: Implement procedures to determine that the access of a workforce member to ePHI is appropriate.",
          },
          {
            id: "308.a3.iiC",
            description:
              "(Addressable) Termination Procedures: Implement procedures for terminating access to ePHI when the employment of, or other arrangement with, a workforce member ends or as required by determinations made as specified in the Workforce Clearance Procedure.",
          },
        ],
      },
      {
        id: "308.a4",
        name: "Information Access Management",
        subcategories: [
          {
            id: "308.a4.i",
            description:
              "Implement policies and procedures for authorizing access to ePHI that are consistent with the applicable requirements of subpart E of this part.",
          },
          {
            id: "308.a4.iiA",
            description:
              "(Addressable) Isolating Health Care Clearinghouse Functions: If a health care clearinghouse is part of a larger organization, the clearinghouse must implement policies and procedures that protect the ePHI of the clearinghouse from unauthorized access by the larger organization.",
          },
          {
            id: "308.a4.iiB",
            description:
              "(Addressable) Access Authorization: Implement policies and procedures for granting access to ePHI, for example, through access to a workstation, transaction, program, process, or other mechanism.",
          },
          {
            id: "308.a4.iiC",
            description:
              "(Addressable) Access Establishment and Modification: Implement policies and procedures that, based upon the covered entity's or the business associate's access authorization policies, establish, document, review, and modify a user's right of access to a workstation, transaction, program, or process.",
          },
        ],
      },
      {
        id: "308.a5",
        name: "Security Awareness and Training",
        subcategories: [
          {
            id: "308.a5.i",
            description:
              "Implement a security awareness and training program for all members of its workforce (including management).",
          },
          {
            id: "308.a5.iiA",
            description:
              "(Addressable) Security Reminders: Implement periodic security updates.",
          },
          {
            id: "308.a5.iiB",
            description:
              "(Addressable) Protection from Malicious Software: Implement procedures for guarding against, detecting, and reporting malicious software.",
          },
          {
            id: "308.a5.iiC",
            description:
              "(Addressable) Log-in Monitoring: Implement procedures for monitoring log-in attempts and reporting discrepancies.",
          },
          {
            id: "308.a5.iiD",
            description:
              "(Addressable) Password Management: Implement procedures for creating, changing, and safeguarding passwords.",
          },
        ],
      },
      {
        id: "308.a6",
        name: "Security Incident Procedures",
        subcategories: [
          {
            id: "308.a6.i",
            description:
              "Implement policies and procedures to address security incidents.",
          },
          {
            id: "308.a6.ii",
            description:
              "(Required) Response and Reporting: Identify and respond to suspected or known security incidents; mitigate, to the extent practicable, harmful effects of security incidents that are known to the covered entity or business associate; and document security incidents and their outcomes.",
          },
        ],
      },
      {
        id: "308.a7",
        name: "Contingency Plan",
        subcategories: [
          {
            id: "308.a7.i",
            description:
              "Establish (and implement as needed) policies and procedures for responding to an emergency or other occurrence (for example, fire, vandalism, system failure, and natural disaster) that damages systems that contain ePHI.",
          },
          {
            id: "308.a7.iiA",
            description:
              "(Required) Data Backup Plan: Establish and implement procedures to create and maintain retrievable exact copies of ePHI.",
          },
          {
            id: "308.a7.iiB",
            description:
              "(Required) Disaster Recovery Plan: Establish (and implement as needed) procedures to restore any loss of data.",
          },
          {
            id: "308.a7.iiC",
            description:
              "(Required) Emergency Mode Operation Plan: Establish (and implement as needed) procedures to enable continuation of critical business processes for protection of the security of ePHI while operating in emergency mode.",
          },
          {
            id: "308.a7.iiD",
            description:
              "(Addressable) Testing and Revision Procedures: Implement procedures for periodic testing and revision of contingency plans.",
          },
          {
            id: "308.a7.iiE",
            description:
              "(Addressable) Applications and Data Criticality Analysis: Assess the relative criticality of specific applications and data in support of other contingency plan components.",
          },
        ],
      },
      {
        id: "308.a8",
        name: "Evaluation",
        subcategories: [
          {
            id: "308.a8.i",
            description:
              "(Required) Perform a periodic technical and nontechnical evaluation, based initially upon the standards implemented under this rule and, subsequently, in response to environmental or operational changes affecting the security of ePHI, that establishes the extent to which a covered entity's or business associate's security policies and procedures meet the requirements of this subpart.",
          },
        ],
      },
      {
        id: "308.b1",
        name: "Business Associate Contracts and Other Arrangements",
        subcategories: [
          {
            id: "308.b1.i",
            description:
              "A covered entity may permit a business associate to create, receive, maintain, or transmit ePHI on the covered entity's behalf only if the covered entity obtains satisfactory assurances, in accordance with §164.314(a), that the business associate will appropriately safeguard the information. A covered entity is not required to obtain such satisfactory assurances from a business associate that is a subcontractor.",
          },
          {
            id: "308.b1.ii",
            description:
              "A business associate may permit a business associate that is a subcontractor to create, receive, maintain, or transmit ePHI on its behalf only if the business associate obtains satisfactory assurances, in accordance with §164.314(a), that the subcontractor will appropriately safeguard the information.",
          },
          {
            id: "308.b1.iii",
            description:
              "(Required) Written Contract or Other Arrangement: Document the satisfactory assurances required by this standard through a written contract or other arrangement with the business associate that meets the applicable requirements of §164.314(a).",
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHYSICAL SAFEGUARDS — §164.310
  // ============================================================
  {
    id: "PHY",
    name: "Physical Safeguards",
    description:
      "Physical measures, policies, and procedures to protect a covered entity's or business associate's electronic information systems and related buildings and equipment from natural and environmental hazards and unauthorized intrusion.",
    color: "green",
    categories: [
      {
        id: "310.a1",
        name: "Facility Access Controls",
        subcategories: [
          {
            id: "310.a1.i",
            description:
              "Implement policies and procedures to limit physical access to its electronic information systems and the facility or facilities in which they are housed, while ensuring that properly authorized access is allowed.",
          },
          {
            id: "310.a1.iiA",
            description:
              "(Addressable) Contingency Operations: Establish (and implement as needed) procedures that allow facility access in support of restoration of lost data under the disaster recovery plan and emergency mode operations plan in the event of an emergency.",
          },
          {
            id: "310.a1.iiB",
            description:
              "(Addressable) Facility Security Plan: Implement policies and procedures to safeguard the facility and the equipment therein from unauthorized physical access, tampering, and theft.",
          },
          {
            id: "310.a1.iiC",
            description:
              "(Addressable) Access Control and Validation Procedures: Implement procedures to control and validate a person's access to facilities based on their role or function, including visitor control, and control of access to software programs for testing and revision.",
          },
          {
            id: "310.a1.iiD",
            description:
              "(Addressable) Maintenance Records: Implement policies and procedures to document repairs and modifications to the physical components of a facility which are related to security (for example, hardware, walls, doors, and locks).",
          },
        ],
      },
      {
        id: "310.b",
        name: "Workstation Use",
        subcategories: [
          {
            id: "310.b.i",
            description:
              "(Required) Implement policies and procedures that specify the proper functions to be performed, the manner in which those functions are to be performed, and the physical attributes of the surroundings of a specific workstation or class of workstation that can access ePHI.",
          },
        ],
      },
      {
        id: "310.c",
        name: "Workstation Security",
        subcategories: [
          {
            id: "310.c.i",
            description:
              "(Required) Implement physical safeguards for all workstations that access ePHI, to restrict access to authorized users.",
          },
        ],
      },
      {
        id: "310.d1",
        name: "Device and Media Controls",
        subcategories: [
          {
            id: "310.d1.i",
            description:
              "Implement policies and procedures that govern the receipt and removal of hardware and electronic media that contain ePHI into and out of a facility, and the movement of these items within the facility.",
          },
          {
            id: "310.d1.iiA",
            description:
              "(Required) Disposal: Implement policies and procedures to address the final disposition of ePHI and/or the hardware or electronic media on which it is stored.",
          },
          {
            id: "310.d1.iiB",
            description:
              "(Required) Media Re-use: Implement procedures for removal of ePHI from electronic media before the media are made available for re-use.",
          },
          {
            id: "310.d1.iiC",
            description:
              "(Addressable) Accountability: Maintain a record of the movements of hardware and electronic media and any person responsible therefor.",
          },
          {
            id: "310.d1.iiD",
            description:
              "(Addressable) Data Backup and Storage: Create a retrievable, exact copy of ePHI, when needed, before movement of equipment.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // TECHNICAL SAFEGUARDS — §164.312
  // ============================================================
  {
    id: "TECH",
    name: "Technical Safeguards",
    description:
      "The technology and the policy and procedures for its use that protect electronic protected health information and control access to it.",
    color: "purple",
    categories: [
      {
        id: "312.a1",
        name: "Access Control",
        subcategories: [
          {
            id: "312.a1.i",
            description:
              "Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to those persons or software programs that have been granted access rights as specified in §164.308(a)(4).",
          },
          {
            id: "312.a1.iiA",
            description:
              "(Required) Unique User Identification: Assign a unique name and/or number for identifying and tracking user identity.",
          },
          {
            id: "312.a1.iiB",
            description:
              "(Required) Emergency Access Procedure: Establish (and implement as needed) procedures for obtaining necessary ePHI during an emergency.",
          },
          {
            id: "312.a1.iiC",
            description:
              "(Addressable) Automatic Logoff: Implement electronic procedures that terminate an electronic session after a predetermined time of inactivity.",
          },
          {
            id: "312.a1.iiD",
            description:
              "(Addressable) Encryption and Decryption: Implement a mechanism to encrypt and decrypt ePHI.",
          },
        ],
      },
      {
        id: "312.b",
        name: "Audit Controls",
        subcategories: [
          {
            id: "312.b.i",
            description:
              "(Required) Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI.",
          },
        ],
      },
      {
        id: "312.c1",
        name: "Integrity",
        subcategories: [
          {
            id: "312.c1.i",
            description:
              "Implement policies and procedures to protect ePHI from improper alteration or destruction.",
          },
          {
            id: "312.c1.iiA",
            description:
              "(Addressable) Mechanism to Authenticate Electronic Protected Health Information: Implement electronic mechanisms to corroborate that ePHI has not been altered or destroyed in an unauthorized manner.",
          },
        ],
      },
      {
        id: "312.d",
        name: "Person or Entity Authentication",
        subcategories: [
          {
            id: "312.d.i",
            description:
              "(Required) Implement procedures to verify that a person or entity seeking access to ePHI is the one claimed.",
          },
        ],
      },
      {
        id: "312.e1",
        name: "Transmission Security",
        subcategories: [
          {
            id: "312.e1.i",
            description:
              "Implement technical security measures to guard against unauthorized access to ePHI that is being transmitted over an electronic communications network.",
          },
          {
            id: "312.e1.iiA",
            description:
              "(Addressable) Integrity Controls: Implement security measures to ensure that electronically transmitted ePHI is not improperly modified without detection until disposed of.",
          },
          {
            id: "312.e1.iiB",
            description:
              "(Addressable) Encryption: Implement a mechanism to encrypt ePHI whenever deemed appropriate.",
          },
        ],
      },
    ],
  },
];
