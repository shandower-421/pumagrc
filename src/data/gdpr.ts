// EU General Data Protection Regulation (GDPR) - Key Compliance Requirements
// Source: Regulation (EU) 2016/679 of the European Parliament and of the Council
// https://eur-lex.europa.eu/eli/reg/2016/679/oj

import type { FunctionDef } from '../types/assessment';

export const GDPR: FunctionDef[] = [
  // ============================================================
  // PRINCIPLES — Chapter II, Articles 5-11
  // ============================================================
  {
    id: "PRIN",
    name: "Principles",
    description:
      "Core data processing principles that form the foundation of GDPR compliance. These principles govern how personal data must be collected, processed, stored, and managed, establishing the baseline obligations for all controllers and processors.",
    color: "amber",
    categories: [
      {
        id: "Art.5",
        name: "Principles relating to processing of personal data",
        subcategories: [
          {
            id: "Art.5.1a",
            description:
              "Lawfulness, fairness and transparency: Personal data shall be processed lawfully, fairly and in a transparent manner in relation to the data subject.",
          },
          {
            id: "Art.5.1b",
            description:
              "Purpose limitation: Personal data shall be collected for specified, explicit and legitimate purposes and not further processed in a manner incompatible with those purposes.",
          },
          {
            id: "Art.5.1c",
            description:
              "Data minimisation: Personal data shall be adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed.",
          },
          {
            id: "Art.5.1d",
            description:
              "Accuracy: Personal data shall be accurate and, where necessary, kept up to date; every reasonable step must be taken to ensure that inaccurate personal data are erased or rectified without delay.",
          },
          {
            id: "Art.5.1e",
            description:
              "Storage limitation: Personal data shall be kept in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed.",
          },
          {
            id: "Art.5.1f",
            description:
              "Integrity and confidentiality: Personal data shall be processed in a manner that ensures appropriate security, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures.",
          },
          {
            id: "Art.5.2",
            description:
              "Accountability: The controller shall be responsible for, and be able to demonstrate compliance with, all data processing principles.",
          },
        ],
      },
      {
        id: "Art.6",
        name: "Lawfulness of processing",
        subcategories: [
          {
            id: "Art.6.1a",
            description:
              "Processing is lawful only if the data subject has given consent to the processing of their personal data for one or more specific purposes.",
          },
          {
            id: "Art.6.1b",
            description:
              "Processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract.",
          },
          {
            id: "Art.6.1c",
            description:
              "Processing is necessary for compliance with a legal obligation to which the controller is subject.",
          },
          {
            id: "Art.6.1d",
            description:
              "Processing is necessary in order to protect the vital interests of the data subject or of another natural person.",
          },
          {
            id: "Art.6.1e",
            description:
              "Processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller.",
          },
          {
            id: "Art.6.1f",
            description:
              "Processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights of the data subject.",
          },
        ],
      },
      {
        id: "Art.7",
        name: "Conditions for consent",
        subcategories: [
          {
            id: "Art.7.1",
            description:
              "Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented to processing of their personal data.",
          },
          {
            id: "Art.7.2",
            description:
              "If the data subject's consent is given in the context of a written declaration which also concerns other matters, the request for consent shall be presented in a manner clearly distinguishable from the other matters, in an intelligible and easily accessible form, using clear and plain language.",
          },
          {
            id: "Art.7.3",
            description:
              "The data subject shall have the right to withdraw consent at any time. Withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal. The data subject shall be informed thereof before giving consent. It shall be as easy to withdraw as to give consent.",
          },
        ],
      },
      {
        id: "Art.8",
        name: "Conditions applicable to child's consent",
        subcategories: [
          {
            id: "Art.8.1",
            description:
              "Where consent applies to information society services offered directly to a child, processing shall be lawful where the child is at least 16 years old. Where the child is below 16, processing is lawful only if consent is given or authorised by the holder of parental responsibility over the child.",
          },
          {
            id: "Art.8.2",
            description:
              "The controller shall make reasonable efforts to verify that consent is given or authorised by the holder of parental responsibility over the child, taking into consideration available technology.",
          },
        ],
      },
      {
        id: "Art.9",
        name: "Processing of special categories of personal data",
        subcategories: [
          {
            id: "Art.9.1",
            description:
              "Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health data, or data concerning sex life or sexual orientation shall be prohibited unless a specific exemption applies.",
          },
          {
            id: "Art.9.2",
            description:
              "The prohibition shall not apply where the data subject has given explicit consent, processing is necessary for employment or social security obligations, processing is necessary to protect vital interests, or another specific exemption under Article 9(2) is met.",
          },
        ],
      },
      {
        id: "Art.10",
        name: "Processing of personal data relating to criminal convictions and offences",
        subcategories: [
          {
            id: "Art.10.1",
            description:
              "Processing of personal data relating to criminal convictions and offences shall be carried out only under the control of official authority or when the processing is authorised by Union or Member State law providing for appropriate safeguards for the rights and freedoms of data subjects.",
          },
        ],
      },
      {
        id: "Art.11",
        name: "Processing which does not require identification",
        subcategories: [
          {
            id: "Art.11.1",
            description:
              "If the purposes for which a controller processes personal data do not require the identification of a data subject, the controller shall not be obliged to maintain, acquire or process additional information in order to identify the data subject solely to comply with the GDPR.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // DATA SUBJECT RIGHTS — Chapter III, Articles 12-23
  // ============================================================
  {
    id: "RIGHTS",
    name: "Data Subject Rights",
    description:
      "Rights afforded to individuals regarding their personal data, including the right to access, rectify, erase, restrict processing, data portability, and the right to object. Controllers must facilitate the exercise of these rights through transparent and accessible mechanisms.",
    color: "blue",
    categories: [
      {
        id: "Art.12",
        name: "Transparent information, communication and modalities",
        subcategories: [
          {
            id: "Art.12.1",
            description:
              "The controller shall take appropriate measures to provide any information referred to in Articles 13 and 14 and any communication under Articles 15 to 22 relating to processing to the data subject in a concise, transparent, intelligible and easily accessible form, using clear and plain language.",
          },
          {
            id: "Art.12.2",
            description:
              "The controller shall facilitate the exercise of data subject rights under Articles 15 to 22. The controller shall not refuse to act on the request of the data subject unless the controller demonstrates that it is not in a position to identify the data subject.",
          },
          {
            id: "Art.12.3",
            description:
              "The controller shall provide information on action taken on a request under Articles 15 to 22 to the data subject without undue delay and in any event within one month of receipt of the request, extendable by two further months where necessary.",
          },
        ],
      },
      {
        id: "Art.13",
        name: "Information to be provided where personal data are collected from the data subject",
        subcategories: [
          {
            id: "Art.13.1",
            description:
              "Where personal data are collected from the data subject, the controller shall at the time of obtaining provide the identity and contact details of the controller, contact details of the DPO, the purposes and legal basis for processing, the legitimate interests pursued (if applicable), and the recipients or categories of recipients.",
          },
          {
            id: "Art.13.2",
            description:
              "In addition to information in Art.13.1, the controller shall provide the data subject with the period for which data will be stored, the existence of each data subject right, the right to withdraw consent, the right to lodge a complaint, whether provision of data is a statutory or contractual requirement, and the existence of automated decision-making including profiling.",
          },
        ],
      },
      {
        id: "Art.14",
        name: "Information to be provided where data have not been obtained from the data subject",
        subcategories: [
          {
            id: "Art.14.1",
            description:
              "Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the identity and contact details of the controller, the DPO contact details, the purposes and legal basis for processing, the categories of personal data concerned, and the recipients.",
          },
          {
            id: "Art.14.2",
            description:
              "In addition, the controller shall provide the data subject with the storage period, legitimate interests pursued, the existence of each data subject right, the source from which the personal data originate, and the existence of automated decision-making including profiling.",
          },
          {
            id: "Art.14.3",
            description:
              "The controller shall provide the information referred to in paragraphs 1 and 2 within a reasonable period after obtaining the personal data, but at the latest within one month, or at the time of first communication with the data subject, or when data are first disclosed to another recipient.",
          },
        ],
      },
      {
        id: "Art.15",
        name: "Right of access by the data subject",
        subcategories: [
          {
            id: "Art.15.1",
            description:
              "The data subject shall have the right to obtain from the controller confirmation as to whether personal data concerning them are being processed, and where that is the case, access to the personal data and information including the purposes of processing, categories of data, recipients, envisaged storage period, and applicable rights.",
          },
          {
            id: "Art.15.3",
            description:
              "The controller shall provide a copy of the personal data undergoing processing. For any further copies requested, the controller may charge a reasonable fee based on administrative costs. Where the data subject makes the request by electronic means, information shall be provided in a commonly used electronic form.",
          },
        ],
      },
      {
        id: "Art.16",
        name: "Right to rectification",
        subcategories: [
          {
            id: "Art.16.1",
            description:
              "The data subject shall have the right to obtain from the controller without undue delay the rectification of inaccurate personal data concerning them. Taking into account the purposes of the processing, the data subject shall have the right to have incomplete personal data completed.",
          },
        ],
      },
      {
        id: "Art.17",
        name: "Right to erasure (right to be forgotten)",
        subcategories: [
          {
            id: "Art.17.1",
            description:
              "The data subject shall have the right to obtain from the controller the erasure of personal data without undue delay where the data are no longer necessary, consent is withdrawn, the data subject objects to processing, data have been unlawfully processed, or erasure is required by law.",
          },
          {
            id: "Art.17.2",
            description:
              "Where the controller has made the personal data public and is obliged to erase them, the controller shall take reasonable steps including technical measures to inform other controllers processing the data that the data subject has requested erasure of any links to, copies or replications of those personal data.",
          },
        ],
      },
      {
        id: "Art.18",
        name: "Right to restriction of processing",
        subcategories: [
          {
            id: "Art.18.1",
            description:
              "The data subject shall have the right to obtain restriction of processing where the accuracy is contested, the processing is unlawful and the data subject opposes erasure, the controller no longer needs the data but the data subject requires them for legal claims, or the data subject has objected to processing pending verification.",
          },
        ],
      },
      {
        id: "Art.19",
        name: "Notification obligation regarding rectification, erasure or restriction",
        subcategories: [
          {
            id: "Art.19.1",
            description:
              "The controller shall communicate any rectification or erasure of personal data or restriction of processing to each recipient to whom the personal data have been disclosed, unless this proves impossible or involves disproportionate effort. The controller shall inform the data subject about those recipients if requested.",
          },
        ],
      },
      {
        id: "Art.20",
        name: "Right to data portability",
        subcategories: [
          {
            id: "Art.20.1",
            description:
              "The data subject shall have the right to receive the personal data concerning them in a structured, commonly used and machine-readable format, and have the right to transmit those data to another controller without hindrance, where processing is based on consent or contract and carried out by automated means.",
          },
          {
            id: "Art.20.2",
            description:
              "In exercising the right to data portability, the data subject shall have the right to have the personal data transmitted directly from one controller to another, where technically feasible.",
          },
        ],
      },
      {
        id: "Art.21",
        name: "Right to object",
        subcategories: [
          {
            id: "Art.21.1",
            description:
              "The data subject shall have the right to object at any time to processing of personal data based on public interest or legitimate interests, including profiling. The controller shall no longer process the data unless it demonstrates compelling legitimate grounds which override the interests, rights and freedoms of the data subject.",
          },
          {
            id: "Art.21.2",
            description:
              "Where personal data are processed for direct marketing purposes, the data subject shall have the right to object at any time to processing of personal data for such marketing, including profiling related to such direct marketing.",
          },
          {
            id: "Art.21.3",
            description:
              "Where the data subject objects to processing for direct marketing purposes, the personal data shall no longer be processed for such purposes.",
          },
        ],
      },
      {
        id: "Art.22",
        name: "Automated individual decision-making, including profiling",
        subcategories: [
          {
            id: "Art.22.1",
            description:
              "The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning them or similarly significantly affects them.",
          },
          {
            id: "Art.22.3",
            description:
              "Where automated decisions are permitted, the controller shall implement suitable measures to safeguard the data subject's rights and freedoms, including at least the right to obtain human intervention, to express their point of view, and to contest the decision.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONTROLLER AND PROCESSOR — Chapter IV, Articles 24-43
  // ============================================================
  {
    id: "CTRL",
    name: "Controller & Processor",
    description:
      "Obligations for data controllers and processors, including responsibility for compliance, data protection by design and by default, records of processing activities, security measures, breach notification, impact assessments, and the designation of Data Protection Officers.",
    color: "green",
    categories: [
      {
        id: "Art.24",
        name: "Responsibility of the controller",
        subcategories: [
          {
            id: "Art.24.1",
            description:
              "The controller shall implement appropriate technical and organisational measures to ensure and be able to demonstrate that processing is performed in accordance with the GDPR, taking into account the nature, scope, context and purposes of processing as well as the risks to the rights and freedoms of natural persons.",
          },
          {
            id: "Art.24.2",
            description:
              "Where proportionate in relation to processing activities, the measures referred to in paragraph 1 shall include the implementation of appropriate data protection policies by the controller.",
          },
        ],
      },
      {
        id: "Art.25",
        name: "Data protection by design and by default",
        subcategories: [
          {
            id: "Art.25.1",
            description:
              "The controller shall implement appropriate technical and organisational measures, such as pseudonymisation, designed to implement data protection principles (like data minimisation) effectively and to integrate necessary safeguards into the processing, both at the time of determination of means and at the time of processing itself.",
          },
          {
            id: "Art.25.2",
            description:
              "The controller shall implement appropriate technical and organisational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of processing are processed. This obligation applies to the amount of data collected, the extent of processing, the period of storage and their accessibility.",
          },
        ],
      },
      {
        id: "Art.26",
        name: "Joint controllers",
        subcategories: [
          {
            id: "Art.26.1",
            description:
              "Where two or more controllers jointly determine the purposes and means of processing, they shall in a transparent manner determine their respective responsibilities for compliance with the GDPR, in particular regarding exercising data subject rights and providing information, by means of an arrangement between them.",
          },
        ],
      },
      {
        id: "Art.27",
        name: "Representatives of controllers or processors not established in the Union",
        subcategories: [
          {
            id: "Art.27.1",
            description:
              "Where Article 3(2) applies, the controller or processor shall designate in writing a representative in the Union. The representative shall be established in one of the Member States where the data subjects whose personal data are processed are.",
          },
        ],
      },
      {
        id: "Art.28",
        name: "Processor",
        subcategories: [
          {
            id: "Art.28.1",
            description:
              "Where processing is to be carried out on behalf of a controller, the controller shall use only processors providing sufficient guarantees to implement appropriate technical and organisational measures in such a manner that processing will meet the requirements of the GDPR and ensure the protection of data subject rights.",
          },
          {
            id: "Art.28.3",
            description:
              "Processing by a processor shall be governed by a contract or other legal act that is binding on the processor, setting out the subject-matter and duration of processing, the nature and purpose of processing, the type of personal data, categories of data subjects, and the obligations and rights of the controller.",
          },
          {
            id: "Art.28.4",
            description:
              "Where a processor engages another processor (sub-processor) for carrying out specific processing activities, the same data protection obligations set out in the contract between controller and processor shall be imposed on that sub-processor by way of a contract, providing sufficient guarantees of compliance.",
          },
        ],
      },
      {
        id: "Art.29",
        name: "Processing under the authority of the controller or processor",
        subcategories: [
          {
            id: "Art.29.1",
            description:
              "The processor and any person acting under the authority of the controller or of the processor who has access to personal data shall not process those data except on instructions from the controller, unless required to do so by Union or Member State law.",
          },
        ],
      },
      {
        id: "Art.30",
        name: "Records of processing activities",
        subcategories: [
          {
            id: "Art.30.1",
            description:
              "Each controller shall maintain a record of processing activities under its responsibility, containing the name and contact details of the controller and DPO, the purposes of processing, categories of data subjects and personal data, categories of recipients, transfers to third countries, envisaged time limits for erasure, and a description of technical and organisational security measures.",
          },
          {
            id: "Art.30.2",
            description:
              "Each processor shall maintain a record of all categories of processing activities carried out on behalf of a controller, containing the name and contact details of the processor(s) and controller(s), categories of processing carried out, transfers to third countries, and a description of technical and organisational security measures.",
          },
        ],
      },
      {
        id: "Art.32",
        name: "Security of processing",
        subcategories: [
          {
            id: "Art.32.1",
            description:
              "The controller and processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including the pseudonymisation and encryption of personal data, the ability to ensure ongoing confidentiality, integrity, availability and resilience of processing systems, the ability to restore availability and access to data in a timely manner, and a process for regularly testing, assessing and evaluating effectiveness of security measures.",
          },
          {
            id: "Art.32.2",
            description:
              "In assessing the appropriate level of security, account shall be taken of the risks that are presented by processing, in particular from accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data transmitted, stored or otherwise processed.",
          },
          {
            id: "Art.32.4",
            description:
              "The controller and processor shall take steps to ensure that any natural person acting under the authority of the controller or processor who has access to personal data does not process them except on instructions from the controller, unless required to do so by Union or Member State law.",
          },
        ],
      },
      {
        id: "Art.33",
        name: "Notification of a personal data breach to the supervisory authority",
        subcategories: [
          {
            id: "Art.33.1",
            description:
              "In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the competent supervisory authority, unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons.",
          },
          {
            id: "Art.33.2",
            description:
              "The processor shall notify the controller without undue delay after becoming aware of a personal data breach.",
          },
          {
            id: "Art.33.3",
            description:
              "The notification to the supervisory authority shall describe the nature of the breach including approximate categories and number of data subjects and records concerned, communicate the DPO contact details, describe the likely consequences, and describe the measures taken or proposed to address and mitigate the breach.",
          },
        ],
      },
      {
        id: "Art.34",
        name: "Communication of a personal data breach to the data subject",
        subcategories: [
          {
            id: "Art.34.1",
            description:
              "When the personal data breach is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall communicate the personal data breach to the data subject without undue delay.",
          },
          {
            id: "Art.34.2",
            description:
              "The communication to the data subject shall describe in clear and plain language the nature of the personal data breach and contain the name and contact details of the DPO, the likely consequences of the breach, and the measures taken or proposed to address and mitigate the breach.",
          },
        ],
      },
      {
        id: "Art.35",
        name: "Data protection impact assessment",
        subcategories: [
          {
            id: "Art.35.1",
            description:
              "Where a type of processing, in particular using new technologies and taking into account the nature, scope, context and purposes, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall carry out an assessment of the impact of the envisaged processing operations on the protection of personal data prior to the processing.",
          },
          {
            id: "Art.35.3",
            description:
              "A data protection impact assessment shall be required in particular in the case of a systematic and extensive evaluation of personal aspects based on automated processing including profiling, processing on a large scale of special categories of data or criminal conviction data, or systematic monitoring of a publicly accessible area on a large scale.",
          },
          {
            id: "Art.35.7",
            description:
              "The assessment shall contain a systematic description of the envisaged processing operations and purposes, an assessment of the necessity and proportionality of the processing, an assessment of the risks to the rights and freedoms of data subjects, and the measures envisaged to address the risks including safeguards, security measures and mechanisms to demonstrate compliance.",
          },
        ],
      },
      {
        id: "Art.36",
        name: "Prior consultation",
        subcategories: [
          {
            id: "Art.36.1",
            description:
              "The controller shall consult the supervisory authority prior to processing where a data protection impact assessment indicates that the processing would result in a high risk in the absence of measures taken by the controller to mitigate the risk.",
          },
        ],
      },
      {
        id: "Art.37",
        name: "Designation of the Data Protection Officer",
        subcategories: [
          {
            id: "Art.37.1",
            description:
              "The controller and processor shall designate a Data Protection Officer where the processing is carried out by a public authority or body, where core activities consist of processing operations requiring regular and systematic monitoring of data subjects on a large scale, or where core activities consist of processing special categories of data or criminal conviction data on a large scale.",
          },
        ],
      },
      {
        id: "Art.38",
        name: "Position of the Data Protection Officer",
        subcategories: [
          {
            id: "Art.38.1",
            description:
              "The controller and processor shall ensure that the Data Protection Officer is involved properly and in a timely manner in all issues which relate to the protection of personal data.",
          },
          {
            id: "Art.38.3",
            description:
              "The controller and processor shall ensure that the Data Protection Officer does not receive any instructions regarding the exercise of their tasks. The DPO shall not be dismissed or penalised for performing their tasks and shall directly report to the highest management level.",
          },
        ],
      },
      {
        id: "Art.39",
        name: "Tasks of the Data Protection Officer",
        subcategories: [
          {
            id: "Art.39.1",
            description:
              "The Data Protection Officer shall have the tasks of informing and advising the controller or processor, monitoring compliance with the GDPR and other data protection provisions, providing advice on data protection impact assessments, cooperating with the supervisory authority, and acting as the contact point for the supervisory authority.",
          },
        ],
      },
      {
        id: "Art.40-43",
        name: "Codes of conduct and certification",
        subcategories: [
          {
            id: "Art.40.1",
            description:
              "Member States, supervisory authorities, the Board and the Commission shall encourage the drawing up of codes of conduct intended to contribute to the proper application of the GDPR, taking account of the specific features of the various processing sectors.",
          },
          {
            id: "Art.42.1",
            description:
              "Member States, supervisory authorities, the Board and the Commission shall encourage the establishment of data protection certification mechanisms, seals and marks for the purpose of demonstrating compliance with the GDPR of processing operations by controllers and processors.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // TRANSFERS — Chapter V, Articles 44-49
  // ============================================================
  {
    id: "XFER",
    name: "Transfers",
    description:
      "Rules governing the transfer of personal data to third countries or international organisations, ensuring that the level of protection guaranteed by the GDPR is not undermined when personal data is transferred outside the European Economic Area.",
    color: "purple",
    categories: [
      {
        id: "Art.44",
        name: "General principle for transfers",
        subcategories: [
          {
            id: "Art.44.1",
            description:
              "Any transfer of personal data which are undergoing processing or are intended for processing after transfer to a third country or to an international organisation shall take place only if the conditions laid down in Chapter V are complied with by the controller and processor, including for onward transfers.",
          },
        ],
      },
      {
        id: "Art.45",
        name: "Transfers on the basis of an adequacy decision",
        subcategories: [
          {
            id: "Art.45.1",
            description:
              "A transfer of personal data to a third country or international organisation may take place where the Commission has decided that the third country, territory, sector or international organisation ensures an adequate level of protection. Such a transfer shall not require any specific authorisation.",
          },
          {
            id: "Art.45.2",
            description:
              "When assessing adequacy, the Commission shall take into account the rule of law, respect for human rights, relevant legislation, data protection rules, professional rules and security measures, the existence and effective functioning of supervisory authorities, and international commitments entered into by the third country.",
          },
        ],
      },
      {
        id: "Art.46",
        name: "Transfers subject to appropriate safeguards",
        subcategories: [
          {
            id: "Art.46.1",
            description:
              "In the absence of an adequacy decision, a controller or processor may transfer personal data to a third country or international organisation only if the controller or processor has provided appropriate safeguards, and on condition that enforceable data subject rights and effective legal remedies are available.",
          },
          {
            id: "Art.46.2a",
            description:
              "Appropriate safeguards may be provided by a legally binding and enforceable instrument between public authorities or bodies.",
          },
          {
            id: "Art.46.2b",
            description:
              "Appropriate safeguards may be provided by binding corporate rules in accordance with Article 47.",
          },
          {
            id: "Art.46.2c",
            description:
              "Appropriate safeguards may be provided by standard data protection clauses adopted by the Commission in accordance with the examination procedure.",
          },
        ],
      },
      {
        id: "Art.47",
        name: "Binding corporate rules",
        subcategories: [
          {
            id: "Art.47.1",
            description:
              "The competent supervisory authority shall approve binding corporate rules provided that they are legally binding and apply to and are enforced by every member of the group of undertakings, expressly confer enforceable rights on data subjects, and fulfil the requirements of Article 47(2).",
          },
          {
            id: "Art.47.2",
            description:
              "Binding corporate rules shall specify the structure and contact details of the group, the data transfers including categories of personal data and type of processing, their legally binding nature, the application of the general data protection principles, the rights of data subjects, acceptance of liability by the controller or processor, and how information on the rules is provided to data subjects.",
          },
        ],
      },
      {
        id: "Art.49",
        name: "Derogations for specific situations",
        subcategories: [
          {
            id: "Art.49.1a",
            description:
              "In the absence of an adequacy decision or appropriate safeguards, a transfer may take place if the data subject has explicitly consented to the proposed transfer, after having been informed of the possible risks.",
          },
          {
            id: "Art.49.1b",
            description:
              "A transfer may take place if it is necessary for the performance of a contract between the data subject and the controller or the implementation of pre-contractual measures taken at the data subject's request.",
          },
          {
            id: "Art.49.1c",
            description:
              "A transfer may take place if it is necessary for the conclusion or performance of a contract concluded in the interest of the data subject between the controller and another natural or legal person.",
          },
          {
            id: "Art.49.1d",
            description:
              "A transfer may take place if it is necessary for important reasons of public interest.",
          },
          {
            id: "Art.49.1e",
            description:
              "A transfer may take place if it is necessary for the establishment, exercise or defence of legal claims.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // SUPERVISORY AUTHORITIES & REMEDIES — Chapters VI-VIII
  // ============================================================
  {
    id: "SUPV",
    name: "Supervision & Enforcement",
    description:
      "Provisions relating to independent supervisory authorities, cooperation and consistency mechanisms, remedies available to data subjects, liability, and the conditions for administrative fines, ensuring effective enforcement of data protection rules across the European Union.",
    color: "red",
    categories: [
      {
        id: "Art.51",
        name: "Supervisory authority",
        subcategories: [
          {
            id: "Art.51.1",
            description:
              "Each Member State shall provide for one or more independent public authorities to be responsible for monitoring the application of the GDPR, in order to protect the fundamental rights and freedoms of natural persons in relation to processing and to facilitate the free flow of personal data within the Union.",
          },
        ],
      },
      {
        id: "Art.77",
        name: "Right to lodge a complaint with a supervisory authority",
        subcategories: [
          {
            id: "Art.77.1",
            description:
              "Every data subject shall have the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, place of work or place of the alleged infringement, if the data subject considers that the processing of personal data relating to them infringes the GDPR.",
          },
        ],
      },
      {
        id: "Art.82",
        name: "Right to compensation and liability",
        subcategories: [
          {
            id: "Art.82.1",
            description:
              "Any person who has suffered material or non-material damage as a result of an infringement of the GDPR shall have the right to receive compensation from the controller or processor for the damage suffered.",
          },
          {
            id: "Art.82.2",
            description:
              "Any controller involved in processing shall be liable for the damage caused by processing which infringes the GDPR. A processor shall be liable for the damage caused by processing only where it has not complied with GDPR obligations specifically directed to processors or where it has acted outside or contrary to lawful instructions of the controller.",
          },
          {
            id: "Art.82.3",
            description:
              "A controller or processor shall be exempt from liability if it proves that it is not in any way responsible for the event giving rise to the damage.",
          },
        ],
      },
      {
        id: "Art.83",
        name: "General conditions for imposing administrative fines",
        subcategories: [
          {
            id: "Art.83.1",
            description:
              "Each supervisory authority shall ensure that the imposition of administrative fines shall be effective, proportionate and dissuasive in each individual case.",
          },
          {
            id: "Art.83.4",
            description:
              "Infringements of obligations of the controller and processor (Articles 8, 11, 25-39, 42-43) shall be subject to administrative fines up to 10,000,000 EUR or up to 2% of total worldwide annual turnover of the preceding financial year, whichever is higher.",
          },
          {
            id: "Art.83.5",
            description:
              "Infringements of the basic principles for processing including conditions for consent (Articles 5-7, 9), data subject rights (Articles 12-22), or transfers to third countries (Articles 44-49) shall be subject to administrative fines up to 20,000,000 EUR or up to 4% of total worldwide annual turnover of the preceding financial year, whichever is higher.",
          },
        ],
      },
    ],
  },
];
