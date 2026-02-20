export interface CustomerDetails {
  salutation: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
  maritalStatus: string;
  nationality: string;
  occupation: string;
  gstRegistered: boolean;
  address1: string;
  address2: string;
  cityId: string;
  districtId: string;
  stateId: string;
  pincode: string;
  country: string;
  nomineeName: string;
  nomineeRelationship: string;
  nomineeDob: string;
}

export interface VehicleDetails {
  registrationNumber: string;
  registrationDate: string;
  engineNumber: string;
  chassisNumber: string;
  makeId: string;
  modelId: string;
  variant: string;
  cubicCapacity: string;
  fuelType: string;
  manufactureMonth: string;
  manufactureYear: string;
  dateOfPurchase: string;
  rtoLocationId: string;
  stateOfRegistrationId: string;
  rtoRegionCode: string;
  zone: string;
  exShowroomPrice: string;
  idv: string;
  isNewVehicle: boolean;
  isHypothecated: boolean;
}

export interface PreviousInsurance {
  isPreviousPolicyAvailable: boolean;
  previousInsurerId: string;
  policyNumber: string;
  policyType: string;
  startDate: string;
  endDate: string;
  ncbApplicable: boolean;
  previousNcbPercent: string;
  anyClaimLastYear: boolean;
}

export interface AccessoryItem {
  serialNo: string;
  description: string;
  makeModel: string;
  sumInsured: string;
}

export interface CoverSelection {
  basicOd: boolean;
  basicLiability: boolean;
  tppd: boolean;
  tppdSi: number;
  paOwnerDriver: boolean;
  paOwnerDriverTenure: string;
  nilDepreciation: boolean;
  engineProtector: boolean;
  keyProtect: boolean;
  keyProtectSi: string;
  tyreProtector: boolean;
  rimProtector: boolean;
  consumables: boolean;
  returnToInvoice: boolean;
  ncbRetention: boolean;
  lossOfPersonalBelongings: boolean;
  payAsYouDrive: boolean;
  payAsYouDriveOdometer: string;
  payAsYouDrivePlan: string;
  electricalAccessories: AccessoryItem[];
  nonElectricalAccessories: AccessoryItem[];
  antiTheft: boolean;
  biFuelKit: boolean;
  fibreGlassTank: boolean;
  geographicalExtension: boolean;
  automobileAssociation: boolean;
}

export interface PremiumResult {
  odPremium: number;
  tpPremium: number;
  addonPremium: number;
  gst: number;
  total: number;
  rawResponse?: any;
}

export interface ProposalResult {
  proposalNumber: string;
  finalPremium: number;
  rawResponse?: any;
}

export interface InsuranceFormData {
  customer: CustomerDetails;
  vehicle: VehicleDetails;
  previousInsurance: PreviousInsurance;
  coverSelection: CoverSelection;
}

export const defaultCustomer: CustomerDetails = {
  salutation: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  mobile: "",
  email: "",
  maritalStatus: "",
  nationality: "Indian",
  occupation: "",
  gstRegistered: false,
  address1: "",
  address2: "",
  cityId: "",
  districtId: "",
  stateId: "",
  pincode: "",
  country: "India",
  nomineeName: "",
  nomineeRelationship: "",
  nomineeDob: "",
};

export const defaultVehicle: VehicleDetails = {
  registrationNumber: "",
  registrationDate: "",
  engineNumber: "",
  chassisNumber: "",
  makeId: "",
  modelId: "",
  variant: "",
  cubicCapacity: "",
  fuelType: "",
  manufactureMonth: "",
  manufactureYear: "",
  dateOfPurchase: "",
  rtoLocationId: "",
  stateOfRegistrationId: "",
  rtoRegionCode: "",
  zone: "",
  exShowroomPrice: "",
  idv: "",
  isNewVehicle: false,
  isHypothecated: false,
};

export const defaultPreviousInsurance: PreviousInsurance = {
  isPreviousPolicyAvailable: false,
  previousInsurerId: "",
  policyNumber: "",
  policyType: "",
  startDate: "",
  endDate: "",
  ncbApplicable: false,
  previousNcbPercent: "0",
  anyClaimLastYear: false,
};

export const defaultCoverSelection: CoverSelection = {
  basicOd: true,
  basicLiability: true,
  tppd: true,
  tppdSi: 750000,
  paOwnerDriver: true,
  paOwnerDriverTenure: "1",
  nilDepreciation: false,
  engineProtector: false,
  keyProtect: false,
  keyProtectSi: "",
  tyreProtector: false,
  rimProtector: false,
  consumables: false,
  returnToInvoice: false,
  ncbRetention: false,
  lossOfPersonalBelongings: false,
  payAsYouDrive: false,
  payAsYouDriveOdometer: "",
  payAsYouDrivePlan: "",
  electricalAccessories: [],
  nonElectricalAccessories: [],
  antiTheft: false,
  biFuelKit: false,
  fibreGlassTank: false,
  geographicalExtension: false,
  automobileAssociation: false,
};
