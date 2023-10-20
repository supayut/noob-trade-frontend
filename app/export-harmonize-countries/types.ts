export type ExportHarmonizeCountriesResponse = {
  year: number;
  month: number;
  country_code: string;
  country_name_en: string;
  quantity: number;
  acc_quantity: number;
  value_usd: number;
  acc_value_usd: number;
  value_baht: number;
  acc_value_baht: number;
}

export type ExportHarmonizeCountriesResponseList = ExportHarmonizeCountriesResponse[];

export type ExportHarmonizeCountriesPerYear = {
  year: number;
  country_code: string;
  country_name_en: string;
  quantity: number[];
  acc_quantity: number[];
  value_usd: number[];
  acc_value_usd: number[];
  value_baht: number[];
  acc_value_baht: number[];
}


