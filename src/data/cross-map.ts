// Cross-Framework Control Mappings
// Anchor: NIST CSF 2.0 subcategories mapped to ISO 27001:2022, SOC 2 TSC, CMMC 2.0, PCI DSS 4.0.1, and HIPAA Security Rule
//
// Sources:
//   - NIST CSF 2.0 Reference Tool (https://csrc.nist.gov/projects/cybersecurity-framework)
//   - NIST SP 800-53 Rev 5 to ISO 27001 mapping
//   - NIST SP 800-171 Rev 2 (basis for CMMC 2.0 Level 2)
//   - AICPA SOC 2 Trust Services Criteria (2017)
//   - CMMC 2.0 Model Overview (DoD)
//   - PCI DSS v4.0.1 (PCI Security Standards Council, June 2024)
//   - HIPAA Security Rule, 45 CFR Part 164 Subpart C (HHS)

export interface ControlMapping {
  nist: string;        // NIST CSF 2.0 subcategory ID (e.g., "GV.OC-01")
  iso27001: string[];  // Mapped ISO 27001:2022 control IDs
  soc2: string[];      // Mapped SOC 2 TSC criteria IDs
  cmmc: string[];      // Mapped CMMC 2.0 practice IDs
  pci_dss: string[];   // Mapped PCI DSS 4.0.1 requirement IDs
  hipaa: string[];     // Mapped HIPAA Security Rule specification IDs
}

export const CROSS_MAP: ControlMapping[] = [
  // ============================================================
  // GOVERN (GV) - 31 subcategories
  // ============================================================

  // GV.OC - Organizational Context
  {
    nist: "GV.OC-01",
    iso27001: ["A.5.1", "A.5.4"],
    soc2: ["CC1.1", "CC1.2", "CC3.1"],
    cmmc: [],
    pci_dss: ["12.1.1", "12.1.2"],
    hipaa: ["308.a1.i", "308.a1.iiB"],
  },
  {
    nist: "GV.OC-02",
    iso27001: ["A.5.1", "A.5.2", "A.5.4", "A.5.6"],
    soc2: ["CC1.2", "CC2.2", "CC2.3"],
    cmmc: [],
    pci_dss: ["12.1.1", "12.1.3"],
    hipaa: ["308.a1.i", "308.a1.iiB"],
  },
  {
    nist: "GV.OC-03",
    iso27001: ["A.5.31", "A.5.32", "A.5.33", "A.5.34"],
    soc2: ["CC1.1", "CC2.3", "CC3.1"],
    cmmc: [],
    pci_dss: ["12.1.1", "12.3.1"],
    hipaa: ["308.a1.i"],
  },
  {
    nist: "GV.OC-04",
    iso27001: ["A.5.1", "A.5.6", "A.5.29", "A.5.30"],
    soc2: ["CC2.3", "CC3.1", "A1.1"],
    cmmc: [],
    pci_dss: ["12.1.1"],
    hipaa: ["308.a7.i", "308.a7.iiE"],
  },
  {
    nist: "GV.OC-05",
    iso27001: ["A.5.19", "A.5.21", "A.5.22", "A.5.29", "A.5.30"],
    soc2: ["CC2.3", "CC9.2", "A1.1"],
    cmmc: [],
    pci_dss: ["12.8.1", "12.8.2"],
    hipaa: ["308.b1.i", "308.b1.iii"],
  },

  // GV.RM - Risk Management Strategy
  {
    nist: "GV.RM-01",
    iso27001: ["A.5.1", "A.5.4"],
    soc2: ["CC1.1", "CC1.2", "CC3.1"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1", "12.3.2"],
    hipaa: ["308.a1.iiA", "308.a1.iiB"],
  },
  {
    nist: "GV.RM-02",
    iso27001: ["A.5.1"],
    soc2: ["CC3.1", "CC3.2"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1"],
    hipaa: ["308.a1.iiA", "308.a1.iiB"],
  },
  {
    nist: "GV.RM-03",
    iso27001: ["A.5.1", "A.5.4", "A.5.8"],
    soc2: ["CC1.2", "CC3.1", "CC3.2"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "GV.RM-04",
    iso27001: ["A.5.1", "A.5.4"],
    soc2: ["CC3.1", "CC3.2", "CC5.1"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1", "12.3.2"],
    hipaa: ["308.a1.iiA", "308.a1.iiB"],
  },
  {
    nist: "GV.RM-05",
    iso27001: ["A.5.1", "A.5.5", "A.5.6"],
    soc2: ["CC2.1", "CC2.2", "CC2.3"],
    cmmc: [],
    pci_dss: ["12.1.1"],
    hipaa: ["308.a1.i"],
  },
  {
    nist: "GV.RM-06",
    iso27001: ["A.5.1", "A.5.12"],
    soc2: ["CC3.1", "CC3.2", "CC3.3"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1"],
    hipaa: ["308.a1.iiA", "308.a1.iiB"],
  },
  {
    nist: "GV.RM-07",
    iso27001: ["A.5.1", "A.5.8"],
    soc2: ["CC3.1", "CC3.4"],
    cmmc: [],
    pci_dss: ["12.3.1"],
    hipaa: ["308.a1.iiA"],
  },

  // GV.RR - Roles, Responsibilities, and Authorities
  {
    nist: "GV.RR-01",
    iso27001: ["A.5.1", "A.5.2", "A.5.4"],
    soc2: ["CC1.1", "CC1.2", "CC1.3"],
    cmmc: [],
    pci_dss: ["12.1.2", "12.1.4"],
    hipaa: ["308.a2.i"],
  },
  {
    nist: "GV.RR-02",
    iso27001: ["A.5.2", "A.5.3", "A.5.4"],
    soc2: ["CC1.3", "CC1.4", "CC1.5"],
    cmmc: [],
    pci_dss: ["12.1.2"],
    hipaa: ["308.a2.i"],
  },
  {
    nist: "GV.RR-03",
    iso27001: ["A.5.1", "A.5.2"],
    soc2: ["CC1.3", "CC1.4"],
    cmmc: [],
    pci_dss: ["12.1.2"],
    hipaa: ["308.a2.i"],
  },
  {
    nist: "GV.RR-04",
    iso27001: ["A.6.1", "A.6.2", "A.6.3", "A.6.4", "A.6.5"],
    soc2: ["CC1.4", "CC1.5"],
    cmmc: ["PS.L2-3.9.1", "PS.L2-3.9.2"],
    pci_dss: ["12.7.1"],
    hipaa: ["308.a3.i", "308.a3.iiA", "308.a3.iiB"],
  },

  // GV.PO - Policy
  {
    nist: "GV.PO-01",
    iso27001: ["A.5.1", "A.5.36", "A.5.37"],
    soc2: ["CC1.1", "CC5.3"],
    cmmc: ["CA.L2-3.12.4"],
    pci_dss: ["12.1.1", "12.1.3"],
    hipaa: ["308.a1.i"],
  },
  {
    nist: "GV.PO-02",
    iso27001: ["A.5.1", "A.5.36"],
    soc2: ["CC1.1", "CC3.4", "CC5.3"],
    cmmc: ["CA.L2-3.12.4"],
    pci_dss: ["12.1.1", "12.1.3"],
    hipaa: ["308.a1.i", "308.a8.i"],
  },

  // GV.OV - Oversight
  {
    nist: "GV.OV-01",
    iso27001: ["A.5.1", "A.5.35"],
    soc2: ["CC1.2", "CC4.1", "CC4.2"],
    cmmc: ["CA.L2-3.12.1"],
    pci_dss: ["12.4.1", "12.4.2"],
    hipaa: ["308.a8.i"],
  },
  {
    nist: "GV.OV-02",
    iso27001: ["A.5.1", "A.5.35", "A.5.36"],
    soc2: ["CC1.2", "CC4.1", "CC4.2"],
    cmmc: ["CA.L2-3.12.1", "CA.L2-3.12.3"],
    pci_dss: ["12.4.1", "12.4.2"],
    hipaa: ["308.a8.i"],
  },
  {
    nist: "GV.OV-03",
    iso27001: ["A.5.35", "A.5.36"],
    soc2: ["CC4.1", "CC4.2"],
    cmmc: ["CA.L2-3.12.1", "CA.L2-3.12.3"],
    pci_dss: ["12.4.2", "12.4.2.1"],
    hipaa: ["308.a8.i"],
  },

  // GV.SC - Cybersecurity Supply Chain Risk Management
  {
    nist: "GV.SC-01",
    iso27001: ["A.5.19", "A.5.21"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.1"],
    hipaa: ["308.b1.i"],
  },
  {
    nist: "GV.SC-02",
    iso27001: ["A.5.2", "A.5.19", "A.5.20"],
    soc2: ["CC1.3", "CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.1", "12.8.5"],
    hipaa: ["308.b1.i", "308.b1.iii"],
  },
  {
    nist: "GV.SC-03",
    iso27001: ["A.5.19", "A.5.21", "A.5.22"],
    soc2: ["CC3.2", "CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.2", "12.8.3"],
    hipaa: ["308.b1.iii"],
  },
  {
    nist: "GV.SC-04",
    iso27001: ["A.5.19", "A.5.22"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.1", "12.8.2"],
    hipaa: ["308.b1.i"],
  },
  {
    nist: "GV.SC-05",
    iso27001: ["A.5.20", "A.5.21", "A.5.23"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.2", "12.8.4"],
    hipaa: ["308.b1.iii"],
  },
  {
    nist: "GV.SC-06",
    iso27001: ["A.5.19", "A.5.20"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.1", "12.8.5"],
    hipaa: ["308.b1.i", "308.b1.ii"],
  },
  {
    nist: "GV.SC-07",
    iso27001: ["A.5.19", "A.5.20", "A.5.22"],
    soc2: ["CC3.2", "CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.2", "12.8.4"],
    hipaa: ["308.b1.iii"],
  },
  {
    nist: "GV.SC-08",
    iso27001: ["A.5.24", "A.5.26"],
    soc2: ["CC7.4", "CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.3", "12.10.5"],
    hipaa: ["308.a6.ii", "308.b1.iii"],
  },
  {
    nist: "GV.SC-09",
    iso27001: ["A.5.21", "A.5.22", "A.5.23"],
    soc2: ["CC4.1", "CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.4"],
    hipaa: ["308.b1.iii"],
  },
  {
    nist: "GV.SC-10",
    iso27001: ["A.5.20", "A.5.22"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.5"],
    hipaa: ["308.b1.iii"],
  },

  // ============================================================
  // IDENTIFY (ID) - 21 subcategories
  // ============================================================

  // ID.AM - Asset Management
  {
    nist: "ID.AM-01",
    iso27001: ["A.5.9", "A.8.9"],
    soc2: ["CC6.1"],
    cmmc: ["CM.L2-3.4.1"],
    pci_dss: ["2.2.1", "12.5.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.AM-02",
    iso27001: ["A.5.9", "A.8.9", "A.8.19"],
    soc2: ["CC6.1"],
    cmmc: ["CM.L2-3.4.1"],
    pci_dss: ["2.2.1", "6.3.2", "12.5.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.AM-03",
    iso27001: ["A.8.20", "A.8.21", "A.8.22"],
    soc2: ["CC6.1", "CC6.6"],
    cmmc: ["SC.L2-3.13.1"],
    pci_dss: ["1.2.3", "1.2.4"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.AM-04",
    iso27001: ["A.5.19", "A.5.22", "A.5.23"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.1"],
    hipaa: ["308.b1.i"],
  },
  {
    nist: "ID.AM-05",
    iso27001: ["A.5.9", "A.5.10", "A.5.12"],
    soc2: ["CC3.1", "CC6.1"],
    cmmc: ["CM.L2-3.4.1"],
    pci_dss: ["2.2.1", "12.5.1"],
    hipaa: ["308.a1.iiA", "308.a7.iiE"],
  },
  {
    nist: "ID.AM-07",
    iso27001: ["A.5.9", "A.5.12", "A.5.13", "A.5.33"],
    soc2: ["CC6.1", "C1.1"],
    cmmc: ["MP.L2-3.8.1", "MP.L2-3.8.4"],
    pci_dss: ["3.2.1", "9.4.1"],
    hipaa: ["308.a1.iiA", "310.d1.i"],
  },
  {
    nist: "ID.AM-08",
    iso27001: ["A.5.9", "A.5.10", "A.5.11", "A.7.14", "A.8.10"],
    soc2: ["CC6.1", "CC6.5"],
    cmmc: ["CM.L2-3.4.1", "MP.L2-3.8.3"],
    pci_dss: ["9.4.5", "9.4.6"],
    hipaa: ["310.d1.i", "310.d1.iiA", "310.d1.iiB"],
  },

  // ID.RA - Risk Assessment
  {
    nist: "ID.RA-01",
    iso27001: ["A.8.8"],
    soc2: ["CC3.2", "CC7.1"],
    cmmc: ["RA.L2-3.11.2", "RA.L2-3.11.3"],
    pci_dss: ["6.3.1", "11.3.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.RA-02",
    iso27001: ["A.5.7"],
    soc2: ["CC3.2"],
    cmmc: ["SI.L2-3.14.3"],
    pci_dss: ["6.3.1", "12.3.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.RA-03",
    iso27001: ["A.5.7"],
    soc2: ["CC3.2", "CC3.3"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.RA-04",
    iso27001: ["A.5.7", "A.8.8"],
    soc2: ["CC3.2", "CC3.3"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["6.3.1", "12.3.1"],
    hipaa: ["308.a1.iiA", "308.a1.iiB"],
  },
  {
    nist: "ID.RA-05",
    iso27001: ["A.5.7", "A.8.8"],
    soc2: ["CC3.2", "CC5.1"],
    cmmc: ["RA.L2-3.11.1"],
    pci_dss: ["12.3.1", "12.3.2"],
    hipaa: ["308.a1.iiA", "308.a1.iiB"],
  },
  {
    nist: "ID.RA-06",
    iso27001: ["A.5.1"],
    soc2: ["CC3.2", "CC5.1", "CC9.1"],
    cmmc: ["RA.L2-3.11.1", "RA.L2-3.11.3"],
    pci_dss: ["12.3.1", "12.3.2"],
    hipaa: ["308.a1.iiB"],
  },
  {
    nist: "ID.RA-07",
    iso27001: ["A.8.32"],
    soc2: ["CC3.4", "CC8.1"],
    cmmc: ["CM.L2-3.4.3", "CM.L2-3.4.4"],
    pci_dss: ["6.5.1", "6.5.2"],
    hipaa: ["308.a1.iiB"],
  },
  {
    nist: "ID.RA-08",
    iso27001: ["A.5.7", "A.8.8"],
    soc2: ["CC3.2", "CC7.1"],
    cmmc: ["RA.L2-3.11.2"],
    pci_dss: ["6.3.1", "11.3.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "ID.RA-09",
    iso27001: ["A.5.19", "A.5.20", "A.5.21"],
    soc2: ["CC6.8", "CC9.2"],
    cmmc: ["SI.L2-3.14.1"],
    pci_dss: ["6.3.2", "12.8.1"],
    hipaa: ["308.b1.i"],
  },
  {
    nist: "ID.RA-10",
    iso27001: ["A.5.19", "A.5.20"],
    soc2: ["CC9.2"],
    cmmc: [],
    pci_dss: ["12.8.4"],
    hipaa: ["308.b1.iii"],
  },

  // ID.IM - Improvement
  {
    nist: "ID.IM-01",
    iso27001: ["A.5.35", "A.5.36"],
    soc2: ["CC4.1", "CC4.2"],
    cmmc: ["CA.L2-3.12.1", "CA.L2-3.12.2"],
    pci_dss: ["12.4.1", "12.4.2"],
    hipaa: ["308.a8.i"],
  },
  {
    nist: "ID.IM-02",
    iso27001: ["A.5.35", "A.8.29", "A.8.34"],
    soc2: ["CC4.1"],
    cmmc: ["CA.L2-3.12.1", "IR.L2-3.6.3"],
    pci_dss: ["11.3.1", "11.3.1.1"],
    hipaa: ["308.a8.i"],
  },
  {
    nist: "ID.IM-03",
    iso27001: ["A.5.36", "A.5.37"],
    soc2: ["CC4.1", "CC4.2"],
    cmmc: ["CA.L2-3.12.1"],
    pci_dss: ["12.4.2", "12.4.2.1"],
    hipaa: ["308.a8.i"],
  },
  {
    nist: "ID.IM-04",
    iso27001: ["A.5.24", "A.5.26", "A.5.29", "A.5.30"],
    soc2: ["CC7.4", "CC7.5", "CC9.1"],
    cmmc: ["IR.L2-3.6.1", "IR.L2-3.6.3"],
    pci_dss: ["12.10.2"],
    hipaa: ["308.a6.ii", "308.a7.iiD"],
  },

  // ============================================================
  // PROTECT (PR) - 22 subcategories
  // ============================================================

  // PR.AA - Identity Management, Authentication, and Access Control
  {
    nist: "PR.AA-01",
    iso27001: ["A.5.15", "A.5.16", "A.5.18", "A.8.2"],
    soc2: ["CC6.1", "CC6.2"],
    cmmc: ["AC.L2-3.1.1", "IA.L2-3.5.1", "IA.L2-3.5.2", "IA.L2-3.5.5", "IA.L2-3.5.6"],
    pci_dss: ["7.2.1", "8.2.1", "8.2.4"],
    hipaa: ["312.a1.i", "312.a1.iiA", "308.a4.i"],
  },
  {
    nist: "PR.AA-02",
    iso27001: ["A.5.16", "A.5.17"],
    soc2: ["CC6.1", "CC6.2"],
    cmmc: ["IA.L2-3.5.1", "IA.L2-3.5.2"],
    pci_dss: ["8.2.1", "8.2.2", "8.6.1"],
    hipaa: ["312.a1.iiA", "312.d.i"],
  },
  {
    nist: "PR.AA-03",
    iso27001: ["A.5.17", "A.8.5"],
    soc2: ["CC6.1", "CC6.2"],
    cmmc: ["IA.L2-3.5.2", "IA.L2-3.5.3", "IA.L2-3.5.4", "IA.L2-3.5.7", "IA.L2-3.5.8", "IA.L2-3.5.9", "IA.L2-3.5.10", "IA.L2-3.5.11"],
    pci_dss: ["8.3.1", "8.3.2", "8.3.6", "8.4.1", "8.4.2", "8.5.1"],
    hipaa: ["312.d.i", "308.a5.iiD"],
  },
  {
    nist: "PR.AA-04",
    iso27001: ["A.5.17", "A.8.5", "A.8.24"],
    soc2: ["CC6.1"],
    cmmc: ["IA.L2-3.5.2", "IA.L2-3.5.4", "SC.L2-3.13.15"],
    pci_dss: ["8.3.2", "8.5.1"],
    hipaa: ["312.d.i", "308.a5.iiD"],
  },
  {
    nist: "PR.AA-05",
    iso27001: ["A.5.3", "A.5.15", "A.5.18", "A.8.2", "A.8.3"],
    soc2: ["CC6.1", "CC6.2", "CC6.3"],
    cmmc: ["AC.L2-3.1.1", "AC.L2-3.1.2", "AC.L2-3.1.4", "AC.L2-3.1.5", "AC.L2-3.1.6", "AC.L2-3.1.7"],
    pci_dss: ["7.2.1", "7.2.2", "7.2.4", "7.3.1", "7.3.3"],
    hipaa: ["308.a4.i", "308.a4.iiB", "308.a4.iiC", "312.a1.i"],
  },
  {
    nist: "PR.AA-06",
    iso27001: ["A.7.1", "A.7.2", "A.7.3", "A.7.4", "A.7.6"],
    soc2: ["CC6.4"],
    cmmc: ["PE.L2-3.10.1", "PE.L2-3.10.2", "PE.L2-3.10.3", "PE.L2-3.10.4", "PE.L2-3.10.5"],
    pci_dss: ["9.2.1", "9.3.1", "9.4.1"],
    hipaa: ["310.a1.i", "310.a1.iiB", "310.a1.iiC"],
  },

  // PR.AT - Awareness and Training
  {
    nist: "PR.AT-01",
    iso27001: ["A.6.3"],
    soc2: ["CC1.4", "CC2.2"],
    cmmc: ["AT.L2-3.2.1", "AT.L2-3.2.3"],
    pci_dss: ["12.6.1", "12.6.2", "12.6.3"],
    hipaa: ["308.a5.i", "308.a5.iiA"],
  },
  {
    nist: "PR.AT-02",
    iso27001: ["A.6.3"],
    soc2: ["CC1.4", "CC2.2"],
    cmmc: ["AT.L2-3.2.2"],
    pci_dss: ["12.6.2", "12.6.3"],
    hipaa: ["308.a5.i", "308.a5.iiA"],
  },

  // PR.DS - Data Security
  {
    nist: "PR.DS-01",
    iso27001: ["A.5.33", "A.8.10", "A.8.11", "A.8.24"],
    soc2: ["CC6.1", "CC6.7", "C1.1"],
    cmmc: ["MP.L2-3.8.1", "MP.L2-3.8.9", "SC.L2-3.13.16"],
    pci_dss: ["3.5.1", "3.5.1.1", "3.6.1", "3.7.1"],
    hipaa: ["312.a1.iiD", "312.c1.i"],
  },
  {
    nist: "PR.DS-02",
    iso27001: ["A.5.14", "A.8.20", "A.8.21", "A.8.24"],
    soc2: ["CC6.1", "CC6.6", "CC6.7"],
    cmmc: ["AC.L2-3.1.13", "MP.L2-3.8.5", "MP.L2-3.8.6", "SC.L2-3.13.1", "SC.L2-3.13.8"],
    pci_dss: ["4.2.1", "4.2.1.1", "4.2.2"],
    hipaa: ["312.e1.i", "312.e1.iiA", "312.e1.iiB"],
  },
  {
    nist: "PR.DS-10",
    iso27001: ["A.8.11", "A.8.12"],
    soc2: ["CC6.1", "C1.1"],
    cmmc: ["AC.L2-3.1.3", "SC.L2-3.13.4"],
    pci_dss: ["3.4.1", "3.5.1"],
    hipaa: ["312.c1.i", "312.c1.iiA"],
  },
  {
    nist: "PR.DS-11",
    iso27001: ["A.8.13"],
    soc2: ["A1.2", "CC6.1"],
    cmmc: ["MP.L2-3.8.9"],
    pci_dss: [],
    hipaa: ["308.a7.iiA", "310.d1.iiD"],
  },

  // PR.PS - Platform Security
  {
    nist: "PR.PS-01",
    iso27001: ["A.8.9"],
    soc2: ["CC5.2", "CC7.1", "CC8.1"],
    cmmc: ["CM.L2-3.4.1", "CM.L2-3.4.2"],
    pci_dss: ["2.2.1", "2.2.4", "2.2.6"],
    hipaa: ["308.a1.iiB"],
  },
  {
    nist: "PR.PS-02",
    iso27001: ["A.8.8", "A.8.19", "A.8.32"],
    soc2: ["CC6.8", "CC7.1", "CC8.1"],
    cmmc: ["CM.L2-3.4.3", "CM.L2-3.4.8", "CM.L2-3.4.9", "SI.L2-3.14.1"],
    pci_dss: ["6.3.1", "6.3.3", "6.5.1"],
    hipaa: ["308.a1.iiB"],
  },
  {
    nist: "PR.PS-03",
    iso27001: ["A.7.8", "A.7.13", "A.7.14", "A.8.9"],
    soc2: ["CC6.1", "CC6.5"],
    cmmc: ["MA.L2-3.7.1", "MA.L2-3.7.2", "MA.L2-3.7.3", "MA.L2-3.7.4", "MA.L2-3.7.5", "MA.L2-3.7.6"],
    pci_dss: ["9.5.1"],
    hipaa: ["310.a1.iiD", "310.d1.i"],
  },
  {
    nist: "PR.PS-04",
    iso27001: ["A.8.15", "A.8.17"],
    soc2: ["CC7.1", "CC7.2"],
    cmmc: ["AU.L2-3.3.1", "AU.L2-3.3.2", "AU.L2-3.3.7"],
    pci_dss: ["10.2.1", "10.2.2", "10.3.1"],
    hipaa: ["312.b.i", "308.a1.iiD"],
  },
  {
    nist: "PR.PS-05",
    iso27001: ["A.8.7", "A.8.19"],
    soc2: ["CC6.8"],
    cmmc: ["CM.L2-3.4.6", "CM.L2-3.4.7", "CM.L2-3.4.8", "CM.L2-3.4.9", "SI.L2-3.14.2", "SI.L2-3.14.4", "SI.L2-3.14.5"],
    pci_dss: ["5.2.1", "5.2.2", "5.3.1", "5.3.5", "6.3.3"],
    hipaa: ["308.a5.iiB"],
  },
  {
    nist: "PR.PS-06",
    iso27001: ["A.8.25", "A.8.26", "A.8.27", "A.8.28", "A.8.29", "A.8.30", "A.8.31"],
    soc2: ["CC8.1"],
    cmmc: ["SC.L2-3.13.2"],
    pci_dss: ["6.2.1", "6.2.3", "6.2.4"],
    hipaa: [],
  },

  // PR.IR - Technology Infrastructure Resilience
  {
    nist: "PR.IR-01",
    iso27001: ["A.8.20", "A.8.21", "A.8.22", "A.8.23"],
    soc2: ["CC6.1", "CC6.6"],
    cmmc: ["AC.L2-3.1.12", "AC.L2-3.1.14", "AC.L2-3.1.16", "AC.L2-3.1.17", "SC.L2-3.13.1", "SC.L2-3.13.5", "SC.L2-3.13.6", "SC.L2-3.13.7"],
    pci_dss: ["1.2.1", "1.3.1", "1.3.2", "1.4.1"],
    hipaa: ["312.e1.i", "312.e1.iiA"],
  },
  {
    nist: "PR.IR-02",
    iso27001: ["A.7.5", "A.7.8", "A.7.11", "A.7.12"],
    soc2: ["A1.2"],
    cmmc: ["PE.L2-3.10.2"],
    pci_dss: ["9.2.1"],
    hipaa: ["310.a1.i", "310.a1.iiA"],
  },
  {
    nist: "PR.IR-03",
    iso27001: ["A.5.29", "A.5.30", "A.8.14"],
    soc2: ["A1.1", "A1.2", "CC9.1"],
    cmmc: [],
    pci_dss: [],
    hipaa: ["308.a7.i", "308.a7.iiB", "308.a7.iiC"],
  },
  {
    nist: "PR.IR-04",
    iso27001: ["A.8.6", "A.8.14"],
    soc2: ["A1.1"],
    cmmc: [],
    pci_dss: [],
    hipaa: ["308.a7.i", "308.a7.iiC"],
  },

  // ============================================================
  // DETECT (DE) - 11 subcategories
  // ============================================================

  // DE.CM - Continuous Monitoring
  {
    nist: "DE.CM-01",
    iso27001: ["A.8.16", "A.8.20", "A.8.21"],
    soc2: ["CC7.1", "CC7.2"],
    cmmc: ["SI.L2-3.14.6", "SC.L2-3.13.1"],
    pci_dss: ["10.4.1", "11.4.1"],
    hipaa: ["308.a1.iiD", "312.b.i"],
  },
  {
    nist: "DE.CM-02",
    iso27001: ["A.7.1", "A.7.2", "A.7.4"],
    soc2: ["CC6.4", "CC7.2"],
    cmmc: ["PE.L2-3.10.2"],
    pci_dss: ["9.2.1", "9.2.2"],
    hipaa: ["310.a1.iiB", "310.a1.iiC"],
  },
  {
    nist: "DE.CM-03",
    iso27001: ["A.8.15", "A.8.16", "A.8.18"],
    soc2: ["CC6.1", "CC6.3", "CC7.2"],
    cmmc: ["AC.L2-3.1.7", "AU.L2-3.3.1", "AU.L2-3.3.2", "SI.L2-3.14.7"],
    pci_dss: ["10.2.1", "10.2.2", "10.4.1"],
    hipaa: ["308.a1.iiD", "308.a5.iiC", "312.b.i"],
  },
  {
    nist: "DE.CM-06",
    iso27001: ["A.5.22", "A.5.23"],
    soc2: ["CC7.2", "CC9.2"],
    cmmc: ["AC.L2-3.1.20"],
    pci_dss: ["12.8.4"],
    hipaa: ["308.b1.iii"],
  },
  {
    nist: "DE.CM-09",
    iso27001: ["A.8.7", "A.8.8", "A.8.16"],
    soc2: ["CC7.1", "CC7.2", "CC6.8"],
    cmmc: ["SI.L2-3.14.2", "SI.L2-3.14.4", "SI.L2-3.14.5", "SI.L2-3.14.6"],
    pci_dss: ["5.2.1", "5.2.2", "5.3.2", "11.3.1", "11.3.2"],
    hipaa: ["308.a5.iiB"],
  },

  // DE.AE - Adverse Event Analysis
  {
    nist: "DE.AE-02",
    iso27001: ["A.5.25", "A.8.15", "A.8.16"],
    soc2: ["CC7.2", "CC7.3"],
    cmmc: ["AU.L2-3.3.5", "SI.L2-3.14.6"],
    pci_dss: ["10.4.1", "10.4.2"],
    hipaa: ["308.a1.iiD", "312.b.i"],
  },
  {
    nist: "DE.AE-03",
    iso27001: ["A.8.15", "A.8.16"],
    soc2: ["CC7.2", "CC7.3"],
    cmmc: ["AU.L2-3.3.5", "AU.L2-3.3.6"],
    pci_dss: ["10.4.1", "10.4.2", "10.4.3"],
    hipaa: ["308.a1.iiD", "312.b.i"],
  },
  {
    nist: "DE.AE-04",
    iso27001: ["A.5.25"],
    soc2: ["CC7.3"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["10.4.1", "12.10.1"],
    hipaa: ["308.a6.i", "308.a6.ii"],
  },
  {
    nist: "DE.AE-06",
    iso27001: ["A.5.25", "A.6.8"],
    soc2: ["CC7.3", "CC7.4"],
    cmmc: ["AU.L2-3.3.4", "IR.L2-3.6.2"],
    pci_dss: ["10.4.1", "12.10.1"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "DE.AE-07",
    iso27001: ["A.5.7"],
    soc2: ["CC3.2", "CC7.2"],
    cmmc: ["SI.L2-3.14.3"],
    pci_dss: ["6.3.1", "11.3.1"],
    hipaa: ["308.a1.iiA"],
  },
  {
    nist: "DE.AE-08",
    iso27001: ["A.5.25"],
    soc2: ["CC7.3"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a6.i", "308.a6.ii"],
  },

  // ============================================================
  // RESPOND (RS) - 13 subcategories
  // ============================================================

  // RS.MA - Incident Management
  {
    nist: "RS.MA-01",
    iso27001: ["A.5.24", "A.5.26"],
    soc2: ["CC7.4"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a6.i", "308.a6.ii"],
  },
  {
    nist: "RS.MA-02",
    iso27001: ["A.5.25"],
    soc2: ["CC7.3"],
    cmmc: ["IR.L2-3.6.1", "IR.L2-3.6.2"],
    pci_dss: ["12.10.1", "12.10.4"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RS.MA-03",
    iso27001: ["A.5.25"],
    soc2: ["CC7.3"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RS.MA-04",
    iso27001: ["A.5.25", "A.5.26"],
    soc2: ["CC7.3", "CC7.4"],
    cmmc: ["IR.L2-3.6.1", "IR.L2-3.6.2"],
    pci_dss: ["12.10.1", "12.10.5"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RS.MA-05",
    iso27001: ["A.5.26", "A.5.29"],
    soc2: ["CC7.4", "CC7.5"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1", "12.10.2"],
    hipaa: ["308.a6.ii"],
  },

  // RS.AN - Incident Analysis
  {
    nist: "RS.AN-03",
    iso27001: ["A.5.25", "A.5.26", "A.5.27"],
    soc2: ["CC7.3", "CC7.4"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1", "12.10.6"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RS.AN-06",
    iso27001: ["A.5.28"],
    soc2: ["CC7.3", "CC7.4"],
    cmmc: ["AU.L2-3.3.1", "AU.L2-3.3.8"],
    pci_dss: ["10.2.1", "10.2.2"],
    hipaa: ["308.a1.iiD", "312.b.i"],
  },
  {
    nist: "RS.AN-07",
    iso27001: ["A.5.28"],
    soc2: ["CC7.3", "CC7.4"],
    cmmc: ["AU.L2-3.3.1", "AU.L2-3.3.8"],
    pci_dss: ["10.2.1", "10.2.2", "10.5.1"],
    hipaa: ["308.a1.iiD", "312.b.i"],
  },
  {
    nist: "RS.AN-08",
    iso27001: ["A.5.25"],
    soc2: ["CC7.3"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a6.ii"],
  },

  // RS.CO - Incident Response Reporting and Communication
  {
    nist: "RS.CO-02",
    iso27001: ["A.5.5", "A.5.26", "A.6.8"],
    soc2: ["CC2.3", "CC7.4"],
    cmmc: ["IR.L2-3.6.2"],
    pci_dss: ["12.10.1", "12.10.5"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RS.CO-03",
    iso27001: ["A.5.5", "A.5.6", "A.5.26"],
    soc2: ["CC2.3", "CC7.4"],
    cmmc: ["IR.L2-3.6.2"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a6.ii"],
  },

  // RS.MI - Incident Mitigation
  {
    nist: "RS.MI-01",
    iso27001: ["A.5.26"],
    soc2: ["CC7.4"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1", "12.10.4"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RS.MI-02",
    iso27001: ["A.5.26", "A.8.7"],
    soc2: ["CC7.4"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1", "12.10.4"],
    hipaa: ["308.a6.ii"],
  },

  // ============================================================
  // RECOVER (RC) - 8 subcategories
  // ============================================================

  // RC.RP - Incident Recovery Plan Execution
  {
    nist: "RC.RP-01",
    iso27001: ["A.5.26", "A.5.29", "A.5.30"],
    soc2: ["CC7.5"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a7.i", "308.a7.iiB"],
  },
  {
    nist: "RC.RP-02",
    iso27001: ["A.5.26", "A.5.29"],
    soc2: ["CC7.5"],
    cmmc: ["IR.L2-3.6.1"],
    pci_dss: ["12.10.1", "12.10.2"],
    hipaa: ["308.a7.i", "308.a7.iiB"],
  },
  {
    nist: "RC.RP-03",
    iso27001: ["A.8.13"],
    soc2: ["A1.2", "A1.3"],
    cmmc: ["MP.L2-3.8.9"],
    pci_dss: [],
    hipaa: ["308.a7.iiA", "310.d1.iiD"],
  },
  {
    nist: "RC.RP-04",
    iso27001: ["A.5.26", "A.5.29", "A.5.30"],
    soc2: ["CC7.5", "CC9.1"],
    cmmc: [],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a7.i", "308.a7.iiC"],
  },
  {
    nist: "RC.RP-05",
    iso27001: ["A.5.26", "A.5.29", "A.8.13", "A.8.14"],
    soc2: ["A1.2", "A1.3", "CC7.5"],
    cmmc: [],
    pci_dss: [],
    hipaa: ["308.a7.iiA", "308.a7.iiB"],
  },
  {
    nist: "RC.RP-06",
    iso27001: ["A.5.26", "A.5.27"],
    soc2: ["CC7.5"],
    cmmc: ["IR.L2-3.6.2"],
    pci_dss: ["12.10.2"],
    hipaa: ["308.a7.iiD"],
  },

  // RC.CO - Incident Recovery Communication
  {
    nist: "RC.CO-03",
    iso27001: ["A.5.5", "A.5.26"],
    soc2: ["CC2.3", "CC7.5"],
    cmmc: ["IR.L2-3.6.2"],
    pci_dss: ["12.10.1", "12.10.5"],
    hipaa: ["308.a6.ii"],
  },
  {
    nist: "RC.CO-04",
    iso27001: ["A.5.5", "A.5.26"],
    soc2: ["CC2.3", "CC7.5"],
    cmmc: ["IR.L2-3.6.2"],
    pci_dss: ["12.10.1"],
    hipaa: ["308.a6.ii", "308.a7.iiD"],
  },
];
