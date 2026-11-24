import { site } from "@/lib/site";

export interface CompanyInfo {
  name: string;
  tagline: string;
  shortDescription: string;
  baseCity: string;
  region: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsappUrl: string;
  email: string;
  address: string;
  foundedYear: string;
  sltdaRegistration: string;
  hours: string;
  facebookUrl: string;
  instagramUrl: string;
  productionDomain: string;
  canonicalUrl: string;
  responseTime: string;
}

export const company: CompanyInfo = {
  name: site.brandName,
  tagline: site.tagline,
  shortDescription: site.description,
  baseCity: site.city,
  region: site.region,
  country: site.country,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  whatsappUrl: site.whatsappUrl,
  email: site.email,
  address: site.streetAddress || `${site.city}, ${site.region}, ${site.country}`,
  foundedYear: site.foundedYear,
  sltdaRegistration: site.sltdaNumber,
  hours: site.hours,
  facebookUrl: site.facebookUrl,
  instagramUrl: site.instagramUrl,
  productionDomain: site.domain,
  canonicalUrl: site.siteUrl,
  responseTime: site.responseTime,
};
