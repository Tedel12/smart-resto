export const RESTAURANT = {
  name: 'Le Baobab',
  tagline: 'Cuisine locale & internationale',
  table: 'Table 7',
  logo: '',
  footer: {
    address: 'Cotonou, Bénin',
    phone: '+229 00 00 00 00',
    email: 'contact@lebaobab.com',
    socials: { facebook: '#', instagram: '#' },
    newsletterEnabled: true
  }
};

export const MENU = {
  'Entrées': [
    { id:1,  name:'Salade Niçoise',       price:2500, img:'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&q=80', desc:'Thon, olives, œufs, tomates fraîches',         hot:false, badge:null },
    { id:2,  name:'Soupe du jour',         price:1800, img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80', desc:'Velouté de légumes de saison',                  hot:true,  badge:'chef' },
    { id:3,  name:'Beignets de crevette',  price:3200, img:'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=500&q=80', desc:'Crevettes panées, sauce pimentée',             hot:false, badge:'populaire' },
    { id:4,  name:'Accras de morue',       price:2200, img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', desc:'Beignets de morue épicés',                    hot:true,  badge:null },
    { id:5,  name:'Avocat aux crevettes',  price:3500, img:'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=500&q=80', desc:'Avocat frais, crevettes, sauce cocktail',     hot:false, badge:'léger' },
    { id:6,  name:'Samoussas légumes',     price:1500, img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80', desc:'Triangles croustillants farcis',              hot:true,  badge:null },
  ],
  'Plats principaux': [
    { id:10, name:'Poulet DG',             price:5500, img:'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80', desc:'Poulet sauté, plantain, légumes',             hot:true,  badge:'populaire' },
    { id:11, name:'Riz sauce arachide',    price:4200, img:'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80', desc:'Riz parfumé, sauce arachide traditionnelle',  hot:false, badge:'chef' },
    { id:12, name:'Poisson braisé',        price:6000, img:'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=500&q=80', desc:'Poisson grillé, piment, oignons',             hot:true,  badge:null },
    { id:13, name:'Attiéké viande',        price:4800, img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80', desc:'Semoule de manioc, viande grillée',            hot:false, badge:null },
    { id:14, name:'Jollof Rice',           price:4500, img:'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&q=80', desc:'Riz épicé à la tomate, poulet',               hot:true,  badge:'populaire' },
    { id:15, name:'Brochettes grillées',   price:5000, img:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80', desc:'Bœuf mariné, légumes grillés',                hot:true,  badge:null },
    { id:16, name:'Spaghetti bolognaise',  price:4000, img:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80', desc:'Pâtes fraîches, sauce viande maison',          hot:false, badge:null },
    { id:17, name:'Pizza Margherita',      price:5200, img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80', desc:'Tomate, mozzarella, basilic frais',           hot:true,  badge:'chef' },
    { id:18, name:'Burger maison',         price:4700, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', desc:'Steak bœuf, cheddar, frites maison',         hot:true,  badge:'populaire' },
    { id:19, name:'Couscous royal',        price:5800, img:'https://images.unsplash.com/photo-1644321828561-d8ef7a1e2ba1?w=500&q=80', desc:'Semoule, agneau, merguez, légumes',           hot:true,  badge:null },
  ],
  'Desserts': [
    { id:30, name:'Tarte aux fruits',      price:2000, img:'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=500&q=80', desc:'Fruits de saison, pâte croustillante',        hot:false, badge:null },
    { id:31, name:'Fondant au chocolat',   price:2300, img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80', desc:'Cœur coulant, glace vanille',                hot:true,  badge:'populaire' },
    { id:32, name:'Salade de fruits',      price:1800, img:'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=500&q=80', desc:'Mangue, ananas, papaye locale',               hot:false, badge:'léger' },
    { id:33, name:'Beignets sucrés',       price:1500, img:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80', desc:'Beignets traditionnels, sucre glace',           hot:true,  badge:null },
    { id:34, name:'Glace artisanale',      price:1700, img:'https://images.unsplash.com/photo-1497034825429-c343d7c6a68c?w=500&q=80', desc:'3 boules, parfums de saison',                hot:false, badge:null },
  ],
  'Boissons': [
    { id:40, name:'Jus de bissap',         price:800,  img:'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&q=80', desc:'Hibiscus frais, gingembre',                    hot:false, badge:'maison' },
    { id:41, name:'Eau minérale',          price:500,  img:'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500&q=80', desc:'50cl',                                       hot:false, badge:null },
    { id:42, name:'Bière locale',          price:1200, img:'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&q=80', desc:'Pression fraîche 33cl',                      hot:false, badge:null },
    { id:43, name:'Café noir',             price:700,  img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80', desc:'Arabica torréfié maison',                    hot:true,  badge:null },
    { id:44, name:'Jus de gingembre',      price:900,  img:'https://images.unsplash.com/photo-1622597489216-8f8e6d6e0e9d?w=500&q=80', desc:'Gingembre frais, citron, miel',              hot:false, badge:'maison' },
    { id:45, name:'Smoothie mangue',       price:1500, img:'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80', desc:'Mangue fraîche, yaourt',                     hot:false, badge:'populaire' },
    { id:46, name:'Cocktail tropical',     price:2500, img:'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80', desc:'Ananas, rhum, fruit de la passion',            hot:false, badge:null },
    { id:47, name:'Thé glacé maison',      price:1000, img:'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80', desc:'Citron, menthe fraîche',                     hot:false, badge:null },
  ],
};

export const ALL_ITEMS = Object.values(MENU).flat();

export const THEMES = {
  1: {
    id:1, name:'Élégance Sombre', sub:'Animé · Gastronomique', animated:true,
    bg:'#0A0C0F', card:'#13161C', border:'#1E2330', text:'#EEF0F6', muted:'#5A6480',
    accent:'#F5A623', accent2:'#00D68F', danger:'#FF4757',
    font:`'Sora', system-ui, sans-serif`, fontImport:'Sora:wght@300;400;500;600;700;800',
    cardRadius:18, heroStyle:'dark-gold', chipStyle:'pill',
    preview: 'Dark & Gold'
  },
  2: {
    id:2, name:'Coffee Lounge', sub:'Carousel horizontal', animated:true,
    bg:'#F5EFE6', card:'#FFFFFF', border:'#E8DFD3', text:'#4A3728', muted:'#8C7865',
    accent:'#A1887F', accent2:'#D7CCC8', danger:'#BF360C',
    font:`'Inter', sans-serif`, fontImport:'Inter:wght@400;600',
    cardRadius:16, heroStyle:'coffee', chipStyle:'pill',
    preview: 'Coffee Carousel'
  },
  3: {
    id:3, name:'Bakery Pastel', sub:'Zigzag Alterné', animated:false,
    bg:'#FFF0F5', card:'#FFFFFF', border:'#FFD1DC', text:'#5D4037', muted:'#A1887F',
    accent:'#F06292', accent2:'#81C784', danger:'#E57373',
    font:`'Quicksand', sans-serif`, fontImport:'Quicksand:wght@400;600',
    cardRadius:8, heroStyle:'bakery', chipStyle:'square',
    preview: 'Pastel Zigzag'
  },
  4: {
    id:4, name:'QR Digital Menu', sub:'Liste mobile-first', animated:false,
    bg:'#FFFFFF', card:'#FAFAFA', border:'#EEEEEE', text:'#212121', muted:'#757575',
    accent:'#007AFF', accent2:'#5856D6', danger:'#FF3B30',
    font:`'SF Pro', sans-serif`, fontImport: null,
    cardRadius:12, heroStyle:'minimal', chipStyle:'pill',
    preview: 'Simple List'
  },
  5: {
    id:5, name:'Zen Africain', sub:'Statique · Haut de gamme Cotonou', animated:false,
    bg:'#FAF8F3', card:'#FFFFFF', border:'#E0DBD0', text:'#1C1A15', muted:'#8A8375',
    accent:'#3D5A40', accent2:'#B08D57', danger:'#A14444',
    font:`'Cormorant Garamond', serif`, fontImport:'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600',
    bodyFont:`'Inter', sans-serif`, bodyFontImport:'Inter:wght@300;400;500;600',
    cardRadius:0, heroStyle:'zen-africa', chipStyle:'line',
    preview: 'Zen African'
  },
};


export const D_DARK = {
  bg:'#0A0C0F', card:'#13161C', border:'#1E2330', text:'#EEF0F6', muted:'#5A6480',
  gold:'#F5A623', green:'#00D68F', red:'#FF4757', blue:'#3D8EFF', purple:'#9B59FF',
};
export const D_LIGHT = {
  bg:'#F3F4F6', card:'#FFFFFF', border:'#E5E7EB', text:'#111827', muted:'#6B7280',
  gold:'#D97706', green:'#10B981', red:'#EF4444', blue:'#3B82F6', purple:'#8B5CF6',
};


export const D = D_DARK; 
export const dFont = `'Sora', system-ui, sans-serif`;
