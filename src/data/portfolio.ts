export interface PortfolioImage {
  id: string
  src: string
  alt: string
  category: 'portraits' | 'street' | 'usual-suspects'
  width: number
  height: number
  featured?: boolean
}

export interface PortfolioCategory {
  slug: string
  title: string
  description: string
}

const SQ = 'https://images.squarespace-cdn.com/content/v1/635972523daff54c9ff48d5e'

export const categories: PortfolioCategory[] = [
  { slug: 'portraits', title: 'Portraits', description: 'Intimate portraits capturing personality and emotion' },
  { slug: 'street', title: 'Street', description: 'Urban life and the energy of New York City' },
  { slug: 'usual-suspects', title: 'Usual Suspects', description: 'Culinary artistry and the beauty of food' },
]

export const portfolioImages: PortfolioImage[] = [
  // Portraits
  {
    id: 'p1',
    src: `${SQ}/4445fa71-dc6d-4b7d-ae92-dffd0b7ae37d/IMG_3663-Edit.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
    featured: true,
  },
  {
    id: 'p2',
    src: `${SQ}/4f55c16a-963f-422a-bdee-c3b6d045c9f6/IMG_8835-1.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p3',
    src: `${SQ}/51a813ec-92bf-4413-b9d8-5c88fe28419f/45740023.jpg?format=750w`,
    alt: 'Portrait — film',
    category: 'portraits',
    width: 750,
    height: 1000,
    featured: true,
  },
  {
    id: 'p4',
    src: `${SQ}/109f6be2-8042-4cd9-bdbe-4bea175d97e6/IMG_7152-Edit.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p5',
    src: `${SQ}/abbb00c9-53d8-44ee-bed8-a8b8fed96e87/528A7475.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
    featured: true,
  },
  {
    id: 'p6',
    src: `${SQ}/f758f891-2418-4506-ac47-f264c6cdfecd/IMG_4877.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p7',
    src: `${SQ}/d42cebd8-69b9-46a0-ba22-a8ef99fd6302/IMG_7383-2-1+2.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p8',
    src: `${SQ}/ae2d2913-9e68-4b80-b2c1-5d564e23dcd1/IMG_8099.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
    featured: true,
  },
  {
    id: 'p9',
    src: `${SQ}/ff2ba5bf-9044-4295-9da1-4ea7054e8178/IMG_7602-2-1.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p10',
    src: `${SQ}/11b58733-6a39-4662-ad06-fc8c28f534ce/IMG_4716-1.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p11',
    src: `${SQ}/eb3e3b08-4eed-479a-a701-b055f3bc60a0/75780017-Edit.jpg?format=750w`,
    alt: 'Portrait — film',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p12',
    src: `${SQ}/e1735edf-dae0-4f79-8768-40dcc41ee0a0/528A3062.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p13',
    src: `${SQ}/6100a81b-0df2-45d5-915a-62e70287ca02/IMG_1166-Edit.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p14',
    src: `${SQ}/cbd623d4-fc23-4a7d-a20f-22fd7f23079f/IMG_3349-Edit.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },
  {
    id: 'p15',
    src: `${SQ}/c544186d-db5d-4bfd-9cf8-a20cdd2cdd4f/IMG_0238-Edit.jpg?format=750w`,
    alt: 'Portrait',
    category: 'portraits',
    width: 750,
    height: 1000,
  },

  // Street
  {
    id: 's1',
    src: `${SQ}/a3691fd2-0065-4fbe-9da7-9c4107d3faa3/98520002.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 500,
    featured: true,
  },
  {
    id: 's2',
    src: `${SQ}/90bb0bc0-7da1-4ba6-9286-49827e2c921c/528A1849.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 1000,
  },
  {
    id: 's3',
    src: `${SQ}/4f711cba-56d6-4b8a-af48-3d980ea08252/75490001.jpg?format=750w`,
    alt: 'Street — film',
    category: 'street',
    width: 750,
    height: 500,
    featured: true,
  },
  {
    id: 's4',
    src: `${SQ}/b8ff2c65-b650-44bd-937d-88270884a922/45760026+2.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 500,
  },
  {
    id: 's5',
    src: `${SQ}/ee1d6e51-29e6-4b01-baf1-b3a179d37542/98520035.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 500,
    featured: true,
  },
  {
    id: 's6',
    src: `${SQ}/eac641b1-86f2-46dd-90de-b3f0a5c7d643/45740031.jpg?format=750w`,
    alt: 'Street — film',
    category: 'street',
    width: 750,
    height: 500,
  },
  {
    id: 's7',
    src: `${SQ}/aa3f1346-9c4b-41ad-9bd7-ac0a9fe9b528/528A4056.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 1000,
  },
  {
    id: 's8',
    src: `${SQ}/171db2ec-2f51-4e09-b6f3-2dd608c2b3d1/IMG_6552-1.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 1000,
  },
  {
    id: 's9',
    src: `${SQ}/ca89ce88-5d2b-49c7-986c-a2148b61bc86/08590013.jpg?format=750w`,
    alt: 'Street — film',
    category: 'street',
    width: 750,
    height: 500,
  },
  {
    id: 's10',
    src: `${SQ}/d9f63488-5473-4a19-895f-70abb93f8bb1/528A5378.jpg?format=750w`,
    alt: 'Street',
    category: 'street',
    width: 750,
    height: 500,
  },

  // Usual Suspects (Food)
  {
    id: 'f1',
    src: `${SQ}/8f18542a-b526-491f-9d5b-f6e2332545e2/60160015.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
    featured: true,
  },
  {
    id: 'f2',
    src: `${SQ}/7431a95c-7dd7-4eac-a9e5-39348767e64d/11030008-Edit.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
  {
    id: 'f3',
    src: `${SQ}/bb71ce0a-3a37-409f-9c10-4a073bed2431/10990001.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 1000,
    featured: true,
  },
  {
    id: 'f4',
    src: `${SQ}/9125c22d-37da-4e5f-b782-f04425313ecf/38030007-Edit.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
  {
    id: 'f5',
    src: `${SQ}/c8969b12-bf12-484f-a894-9862cb6eb36b/45760007.jpg?format=750w`,
    alt: 'Usual Suspects — film',
    category: 'usual-suspects',
    width: 750,
    height: 500,
    featured: true,
  },
  {
    id: 'f6',
    src: `${SQ}/66491801-0d7e-40e3-a2de-0e99afbd7bbd/37530006-Edit.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
  {
    id: 'f7',
    src: `${SQ}/905984b8-c9d5-4c15-9574-b585f5dc2a72/98520029.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
  {
    id: 'f8',
    src: `${SQ}/a9d63a3d-be4d-4459-91a9-3ac5bd22a297/20710029.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
  {
    id: 'f9',
    src: `${SQ}/f8034df6-ede4-4804-ac51-335a4afedb05/38000029.jpg?format=750w`,
    alt: 'Usual Suspects',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
  {
    id: 'f10',
    src: `${SQ}/64fb5c90-fe11-4aff-920b-059fde5fee34/79160011.jpg?format=750w`,
    alt: 'Usual Suspects — film',
    category: 'usual-suspects',
    width: 750,
    height: 500,
  },
]

export const heroSlides = [
  {
    id: 'hero-1',
    src: `${SQ}/a6c3d28b-9487-43c2-afde-3a81bb58a777/IMG_4585-Edit.jpg?format=2500w`,
    alt: 'Portrait',
  },
  {
    id: 'hero-2',
    src: `${SQ}/1666807179347-9AXVEZRYHCZ4BV3BWXGU/IMG_9903-1.jpg?format=2500w`,
    alt: 'Portrait',
  },
  {
    id: 'hero-3',
    src: `${SQ}/a3691fd2-0065-4fbe-9da7-9c4107d3faa3/98520002.jpg?format=2500w`,
    alt: 'Street',
  },
  {
    id: 'hero-4',
    src: `${SQ}/1667881516418-89KW7OXMY54V8K4TENDF/IMG_7714-2-1-Edit.jpg?format=2500w`,
    alt: 'Usual Suspects',
  },
  {
    id: 'hero-5',
    src: `${SQ}/abbb00c9-53d8-44ee-bed8-a8b8fed96e87/528A7475.jpg?format=2500w`,
    alt: 'Portrait',
  },
]
