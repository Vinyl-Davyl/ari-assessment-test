import { z } from "zod";

export const formSchema = z.object({
  companyName: z.string().trim().min(1, {
    message: "Company name cannot empty.",
  }),
  companyWebsite: z.string().url({
    message: "Please enter a valid URL.",
  }),
  companyLinkedin: z.string().url({
    message: "Please enter a valid URL",
  }),
  companyIndustry: z.string().trim().min(1, {
    message: "Company industry is required",
  }),
  companyDescription: z.string().trim().min(1, {
    message: "Company description must not be empty.",
  }),
  companyGoals: z.string().trim().min(1, {
    message: "Company goals required.",
  }),
  companyHeadquarters: z.string().trim().min(1, {
    message: "Company headquarters required.",
  }),
  fundingRound: z.string().trim().min(1, {
    message: "Please select a not funding round.",
  }),
  faqsUrl: z.string().trim().min(1, {
    message: "FAQs URL required.",
  }),
  emplyeeCount: z.string(),
});
