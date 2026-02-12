// Mock API data for IndusInd insurance flow

export interface CoverageItem {
  CoverageName: string;
  CoverageID: string;
  ISMANDATORY: boolean;
  LISTVALUE: string;
  AMOUNT: number;
  TypeofCover: string;
  rate: number;
  lstPACoverBenefits: string;
  DerivedVehicleIDV: number;
  IncreasedIDV: number;
  DecreasedIDV: number;
}

export interface MotorPolicy {
  NetPremium: number; BasicPremium: number; OriginalPremium: number; EndorsedPremium: number;
  FinalPremium: number; ECessAmount: number; HECessAmount: number; TotalPremium: number;
  TotalOD: number; ServiceTaxRate: number; EducationalCessRate: number; HigherEducationalCessRate: number;
  TotalScheduleODPremium: number; TotalODPremium: number; ServiceTaxAmount: number;
  TotalLiabilityPremium: number; TotalPackagePremium: number; TotalAddonPremium: number;
  TotalChangeAmount: number; InspectionCharges: number; InspectionChargesapplicable: boolean;
  ErrorMessages: string; IsEligible: boolean; ReferalMessages: string; status: string;
  TraceID: string; ServiceRequestID: string; ErrorCode: string; IDV: number;
  BodyIDV: number; ChassisIDV: number; MinIDV: number; MaxIDV: number;
  MinBodyIDV: number; MaxBodyIDV: number; MinChassisIDV: number; MaxChassisIDV: number;
  DerivedVehicleIDV: number; ProposalNo: string; SalesTaxAmount: number; SalesTaxRate: number;
  SurchargeAmount: number; SurchrgeRate: number; IsClaimedInLastPolicy: boolean;
  CurrentYearNCB: number; Current2YearNCB: number; Current3YearNCB: number;
  InspectionErrorMessage: string; SwachhBharatCess: number; SwachhBharatCessRate: number;
  KrishiKalyanCess: number; KrishiKalyanCessRate: number; InvoiceNo: string;
  NetPremium2Year: number; BasicPremium2Year: number; FinalPremium2Year: number;
  TotalOD2Year: number; TotalODPremium2Year: number; TotalLiabilityPremium2Year: number;
  TotalPackagePremium2Year: number; TotalAddonPremium2Year: number; SecondYearBasicVehicleIDV: number;
  NetPremium3Year: number; BasicPremium3Year: number; FinalPremium3Year: number;
  TotalOD3Year: number; TotalODPremium3Year: number; TotalLiabilityPremium3Year: number;
  TotalPackagePremium3Year: number; TotalAddonPremium3Year: number; CompulsoryDeductible: number;
  ThirdYearBasicVehicleIDV: number; FourthYearBasicVehicleIDV: number; FifthYearBasicVehicleIDV: number;
  IDVDepreciationPercentage: number; BasicODwithoutDiscount: number; BasicTPPerPaxAmount: number;
  BasicTPAmount: number; HevTpDiscount: number;
}

export interface TaxComponent {
  TaxComponent: string; TaxName: string; Rate: number; Amount: number;
  TaxComponent2YEARS: number; TaxComponent3YEARS: number;
}

export interface PricingItem {
  QuoteNo: string; EndorsementNo: string; RequestTime: string; ResponseTime: string;
  CoverID: string; Premium: number; Premium2Year: number; Premium3Year: number;
  CoverageName: string; SumInsured: number; OriginalPremium: number; EndorsementPremium: number;
  PremiumDifference: number; TariffRate: number; ODDiscPer: number;
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function fetchCoverages(): Promise<CoverageItem[]> {
  await delay(1200);
  return [
    { CoverageName: "Own Damage", CoverageID: "COV001", ISMANDATORY: true, LISTVALUE: "Basic", AMOUNT: 12500, TypeofCover: "OD", rate: 2.5, lstPACoverBenefits: "Accident, Fire, Theft", DerivedVehicleIDV: 500000, IncreasedIDV: 550000, DecreasedIDV: 450000 },
    { CoverageName: "Third Party Liability", CoverageID: "COV002", ISMANDATORY: true, LISTVALUE: "Mandatory", AMOUNT: 6500, TypeofCover: "TP", rate: 1.8, lstPACoverBenefits: "Third Party Damage", DerivedVehicleIDV: 500000, IncreasedIDV: 0, DecreasedIDV: 0 },
    { CoverageName: "Personal Accident Cover", CoverageID: "COV003", ISMANDATORY: true, LISTVALUE: "PA", AMOUNT: 750, TypeofCover: "PA", rate: 0.15, lstPACoverBenefits: "Death, Disability", DerivedVehicleIDV: 0, IncreasedIDV: 0, DecreasedIDV: 0 },
    { CoverageName: "Zero Depreciation", CoverageID: "COV004", ISMANDATORY: false, LISTVALUE: "AddOn", AMOUNT: 3200, TypeofCover: "AddOn", rate: 0.8, lstPACoverBenefits: "Full Claim without Depreciation", DerivedVehicleIDV: 500000, IncreasedIDV: 550000, DecreasedIDV: 450000 },
    { CoverageName: "Roadside Assistance", CoverageID: "COV005", ISMANDATORY: false, LISTVALUE: "AddOn", AMOUNT: 1500, TypeofCover: "AddOn", rate: 0.3, lstPACoverBenefits: "Towing, Flat Tire, Battery", DerivedVehicleIDV: 0, IncreasedIDV: 0, DecreasedIDV: 0 },
    { CoverageName: "Engine Protection", CoverageID: "COV006", ISMANDATORY: false, LISTVALUE: "AddOn", AMOUNT: 2800, TypeofCover: "AddOn", rate: 0.6, lstPACoverBenefits: "Engine Damage, Water Ingress", DerivedVehicleIDV: 500000, IncreasedIDV: 550000, DecreasedIDV: 450000 },
  ];
}

export async function fetchMotorPolicy(): Promise<MotorPolicy> {
  await delay(1500);
  return {
    NetPremium: 22950, BasicPremium: 19250, OriginalPremium: 19250, EndorsedPremium: 0,
    FinalPremium: 27087, ECessAmount: 413, HECessAmount: 207, TotalPremium: 27087,
    TotalOD: 15750, ServiceTaxRate: 18, EducationalCessRate: 2, HigherEducationalCessRate: 1,
    TotalScheduleODPremium: 12500, TotalODPremium: 15750, ServiceTaxAmount: 4131,
    TotalLiabilityPremium: 6500, TotalPackagePremium: 22950, TotalAddonPremium: 7500,
    TotalChangeAmount: 0, InspectionCharges: 0, InspectionChargesapplicable: false,
    ErrorMessages: "", IsEligible: true, ReferalMessages: "", status: "Success",
    TraceID: "TRC-2026-00451", ServiceRequestID: "SRQ-2026-78123", ErrorCode: "",
    IDV: 500000, BodyIDV: 350000, ChassisIDV: 150000, MinIDV: 400000, MaxIDV: 600000,
    MinBodyIDV: 280000, MaxBodyIDV: 420000, MinChassisIDV: 120000, MaxChassisIDV: 180000,
    DerivedVehicleIDV: 500000, ProposalNo: "APAY-2026-INS-00451",
    SalesTaxAmount: 0, SalesTaxRate: 0, SurchargeAmount: 0, SurchrgeRate: 0,
    IsClaimedInLastPolicy: false, CurrentYearNCB: 20, Current2YearNCB: 25, Current3YearNCB: 35,
    InspectionErrorMessage: "", SwachhBharatCess: 115, SwachhBharatCessRate: 0.5,
    KrishiKalyanCess: 115, KrishiKalyanCessRate: 0.5, InvoiceNo: "INV-2026-00451",
    NetPremium2Year: 44800, BasicPremium2Year: 37500, FinalPremium2Year: 52896,
    TotalOD2Year: 30200, TotalODPremium2Year: 30200, TotalLiabilityPremium2Year: 13000,
    TotalPackagePremium2Year: 44800, TotalAddonPremium2Year: 14600,
    SecondYearBasicVehicleIDV: 425000,
    NetPremium3Year: 65500, BasicPremium3Year: 54900, FinalPremium3Year: 77290,
    TotalOD3Year: 43800, TotalODPremium3Year: 43800, TotalLiabilityPremium3Year: 19500,
    TotalPackagePremium3Year: 65500, TotalAddonPremium3Year: 21300,
    CompulsoryDeductible: 1000,
    ThirdYearBasicVehicleIDV: 361250, FourthYearBasicVehicleIDV: 307062,
    FifthYearBasicVehicleIDV: 261003, IDVDepreciationPercentage: 15,
    BasicODwithoutDiscount: 15750, BasicTPPerPaxAmount: 750, BasicTPAmount: 6500, HevTpDiscount: 0,
  };
}

export async function fetchTaxComponents(): Promise<TaxComponent[]> {
  await delay(800);
  return [
    { TaxComponent: "GST", TaxName: "Goods & Services Tax", Rate: 18, Amount: 4131, TaxComponent2YEARS: 8064, TaxComponent3YEARS: 11790 },
    { TaxComponent: "E-Cess", TaxName: "Education Cess", Rate: 2, Amount: 413, TaxComponent2YEARS: 806, TaxComponent3YEARS: 1179 },
    { TaxComponent: "HE-Cess", TaxName: "Higher Education Cess", Rate: 1, Amount: 207, TaxComponent2YEARS: 403, TaxComponent3YEARS: 590 },
    { TaxComponent: "SBC", TaxName: "Swachh Bharat Cess", Rate: 0.5, Amount: 115, TaxComponent2YEARS: 224, TaxComponent3YEARS: 328 },
    { TaxComponent: "KKC", TaxName: "Krishi Kalyan Cess", Rate: 0.5, Amount: 115, TaxComponent2YEARS: 224, TaxComponent3YEARS: 328 },
  ];
}

export async function fetchPricing(): Promise<PricingItem[]> {
  await delay(1000);
  return [
    { QuoteNo: "QT-2026-00451", EndorsementNo: "", RequestTime: "2026-02-12T10:30:00", ResponseTime: "2026-02-12T10:30:02", CoverID: "COV001", Premium: 12500, Premium2Year: 24000, Premium3Year: 34800, CoverageName: "Own Damage", SumInsured: 500000, OriginalPremium: 12500, EndorsementPremium: 0, PremiumDifference: 0, TariffRate: 2.5, ODDiscPer: 0 },
    { QuoteNo: "QT-2026-00451", EndorsementNo: "", RequestTime: "2026-02-12T10:30:00", ResponseTime: "2026-02-12T10:30:02", CoverID: "COV002", Premium: 6500, Premium2Year: 13000, Premium3Year: 19500, CoverageName: "Third Party Liability", SumInsured: 0, OriginalPremium: 6500, EndorsementPremium: 0, PremiumDifference: 0, TariffRate: 1.8, ODDiscPer: 0 },
    { QuoteNo: "QT-2026-00451", EndorsementNo: "", RequestTime: "2026-02-12T10:30:00", ResponseTime: "2026-02-12T10:30:02", CoverID: "COV003", Premium: 750, Premium2Year: 1500, Premium3Year: 2250, CoverageName: "Personal Accident", SumInsured: 1500000, OriginalPremium: 750, EndorsementPremium: 0, PremiumDifference: 0, TariffRate: 0.15, ODDiscPer: 0 },
    { QuoteNo: "QT-2026-00451", EndorsementNo: "", RequestTime: "2026-02-12T10:30:00", ResponseTime: "2026-02-12T10:30:02", CoverID: "COV004", Premium: 3200, Premium2Year: 6100, Premium3Year: 8850, CoverageName: "Zero Depreciation", SumInsured: 500000, OriginalPremium: 3200, EndorsementPremium: 0, PremiumDifference: 0, TariffRate: 0.8, ODDiscPer: 5 },
  ];
}
