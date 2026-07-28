import type { IconName } from "@/components/icon";

export interface CareService {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface ContactDetail {
  readonly icon: IconName;
  readonly value: string;
  readonly secondary?: string;
  readonly emphasis?: boolean;
}

export const siteData = {
  doctor: "Dr. Yasmine Belkacem",
  specialty: "Pédiatre",
  hero: {
    eyebrow: "PRENDRE SOIN D’EUX, C’EST NOTRE PRIORITÉ",
    title: "Une enfance en bonne santé, un avenir heureux",
    description:
      "Un accompagnement médical complet et bienveillant pour chaque étape de la croissance de votre enfant.",
  },
  services: [
    {
      icon: "baby",
      title: "Consultation générale",
      description: "Suivi médical complet de 0 à 18 ans.",
    },
    {
      icon: "stethoscope",
      title: "Suivi de croissance",
      description: "Surveillance régulière de la croissance et du développement.",
    },
    {
      icon: "syringe",
      title: "Vaccination",
      description: "Calendrier vaccinal complet et conseils personnalisés.",
    },
    {
      icon: "lungs",
      title: "Maladies infantiles",
      description: "Prise en charge des maladies courantes de l’enfant.",
    },
    {
      icon: "baby",
      title: "Nourrissons",
      description: "Conseils et suivi pour le bien-être de votre bébé.",
    },
    {
      icon: "brain",
      title: "Santé & développement",
      description: "Évaluation du développement psychomoteur et cognitif.",
    },
    {
      icon: "shield",
      title: "Urgences pédiatriques",
      description: "Prise en charge rapide et adaptée aux enfants.",
    },
  ] satisfies readonly CareService[],
  stats: [
    { value: "12+", label: "Années d’expérience" },
    { value: "5000+", label: "Petits patients suivis" },
    { value: "98%", label: "Parents satisfaits" },
    { value: "7j/7", label: "Rendez-vous disponibles" },
    { value: "1", label: "Cabinet moderne & ludique" },
  ] satisfies readonly Stat[],
  contacts: [
    { icon: "pin", value: "Cité 20 Août 1956, Bâtiment A, Batna, Algérie" },
    { icon: "phone", value: "0555 12 34 56", emphasis: true },
    { icon: "mail", value: "contact@dr-yasmine-pediatre.dz" },
    {
      icon: "clock",
      value: "Sam - Jeu : 08h30 - 18h00",
      secondary: "Vendredi : 08h30 - 12h30",
      emphasis: true,
    },
  ] satisfies readonly ContactDetail[],
} as const;
