type HeroData = {
  title: string;
  disc: string;
};

// types/service.ts
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
}

export interface ServiceCardSection {
  id: string;
  sectionTitle: string;
  sectionDescription: string;
  cards: ServiceCard[];
}

export interface Service {
  id: string;
  categoryId: string;
  heroSection: {
    image: string;
    title: string;
    description: string;
  };
  cardSections: ServiceCardSection[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
  createdAt: Date;
  updatedAt: Date;
}
