'use strict';

/* ── Gallery images (language-independent) ── */
const GALLERY_ITEMS = [
    /* Полагане на бетонова настилка */
    { src: 'images/Полагане на бетонова настилка.jpg',     category: 'pouring' },
    { src: 'images/Полагане на бетонова настилка_(1).jpg', category: 'pouring' },
    { src: 'images/Полагане на бетон_.jpg',                category: 'pouring' },
    /* Имитация на камък */
    { src: 'images/Имитация на камък_.jpg',     category: 'stone' },
    { src: 'images/Имитация на камък_(1).jpg',  category: 'stone' },
    { src: 'images/Имитация на камък_(2).jpg',  category: 'stone' },
    { src: 'images/Имитация на камък_(3).jpg',  category: 'stone' },
    { src: 'images/Имитация на камък_(4).jpg',  category: 'stone' },
    { src: 'images/Имитация на камък_(5).jpg',  category: 'stone' },
    { src: 'images/Имитация на камък_(6).jpg',  category: 'stone' },
    /* Имитация на дърво */
    { src: 'images/Имитация на дърво_(1).jpg',  category: 'wood' },
    { src: 'images/Имитация на дърво_(2).jpg',  category: 'wood' },
    { src: 'images/Имитация на дърво_(3).jpg',  category: 'wood' },
    /* Имитация на плочки */
    { src: 'images/Имитация на плочки_.jpg',    category: 'tiles' },
    { src: 'images/Имитация на плочки_(1).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(2).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(3).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(4).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(5).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(6).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(7).jpg', category: 'tiles' },
    { src: 'images/Имитация на плочки_(8).jpg', category: 'tiles' },
    /* Имитация на павета */
    { src: 'images/Имитация на павета_.jpg',    category: 'cobblestone' },
    { src: 'images/Имитация на павета_(1).jpg', category: 'cobblestone' },
];

/* ── Hero slideshow images ── */
const HERO_IMAGES = [
    'images/Полагане на бетонова настилка.jpg',
    'images/Имитация на камък_(3).jpg',
    'images/Имитация на плочки_(4).jpg',
    'images/Имитация на павета_(1).jpg',
    'images/Имитация на дърво_(2).jpg',
    'images/Имитация на камък_.jpg',
    'images/Полагане на бетон_.jpg',
];

const translations = {

    /* ══════════════════════════════════════
       BULGARIAN (default)
    ══════════════════════════════════════ */
    bg: {
        nav: {
            home:       'Начало',
            services:   'Услуги',
            gallery:    'Галерия',
            advantages: 'Предимства',
            about:      'За нас',
            contact:    'Контакти',
        },

        hero: {
            typed:    ['Щампован бетон', 'Шлайфан бетон', 'Дворове и алеи', 'Промишлени подове', 'Декоративни настилки'],
            title:    'Декоративни Бетонни Настилки',
            subtitle: 'Практично и красиво решение за дворове, алеи, гаражи, халета и индустриални помещения. Устойчив на натоварване, атмосферни условия и ежедневно износване.',
            cta1:     'Вижте услугите',
            cta2:     'Свържете се',
        },

        trustBar: [
            { icon: 'fas fa-medal',          text: 'Качествени материали' },
            { icon: 'fas fa-shield-alt',     text: 'Гарантиран резултат'  },
            { icon: 'fas fa-map-marker-alt', text: 'Русе и региона'        },
            { icon: 'fas fa-phone',          text: 'Безплатна консултация' },
        ],

        services: {
            sectionLabel:    'Услуги',
            sectionTitle:    'Какво предлагаме',
            sectionSubtitle: 'Пълен цикъл — от армировъчни работи и изливане до финалното оформяне на повърхността.',
            items: [
                {
                    icon:  'fas fa-paint-roller',
                    color: 'amber',
                    title: 'Щампован бетон за дворове и алеи',
                    desc:  'Красиви и устойчиви настилки за дворове, алеи, тераси и паркинги — имитация на камък, дърво, плочки или павета. Здраво решение, устойчиво на атмосферни условия и натоварване.',
                },
                {
                    icon:  'fas fa-industry',
                    color: 'amber',
                    title: 'Шлайфан бетон за халета',
                    desc:  'Издръжливи, лесни за поддръжка настилки за промишлени и складови помещения, гаражи и магазини.',
                },
                {
                    icon:  'fas fa-layer-group',
                    color: 'stone',
                    title: 'Полагане на бетонова настилка',
                    desc:  'Пълно полагане на бетонова настилка — подготовка на основата, нивелиране, уплътняване и обработка на повърхността преди щамповане или шлайфане.',
                },
                {
                    icon:  'fas fa-truck',
                    color: 'amber',
                    title: 'Изливане на бетон',
                    desc:  'Професионално изливане на бетон с правилно уплътняване, дебелина и качество на сместа — здрава основа за всяка бетонова настилка.',
                },
                {
                    icon:  'fas fa-drafting-compass',
                    color: 'amber',
                    title: 'Кофражни работи',
                    desc:  'Изграждане на кофраж за точно оформяне на бетонни плочи — дворове, тераси, подпорни стени и алеи.',
                },
                {
                    icon:  'fas fa-wrench',
                    color: 'stone',
                    title: 'Армировъчни работи',
                    desc:  'Полагане на армировъчна мрежа или стомана за усилване на конструкцията и предотвратяване на напукване.',
                },
            ],
        },

        gallery: {
            sectionLabel:    'Галерия',
            sectionTitle:    'Нашите проекти',
            sectionSubtitle: 'Разгледайте реализирани обекти — всяка настилка е уникален проект.',
            filters: {
                all:         'Всички',
                pouring:     'Полагане на бетонова настилка',
                stone:       'Камък',
                wood:        'Дърво',
                tiles:       'Плочки',
                cobblestone: 'Павета',
            },
            catLabels: {
                stone:       'Имитация на камък',
                wood:        'Имитация на дърво',
                tiles:       'Имитация на плочки',
                cobblestone: 'Имитация на павета',
                pouring:     'Полагане на бетонова настилка',
            },
        },

        advantages: {
            sectionLabel:    'Предимства',
            sectionTitle:    'Защо да изберете нас',
            sectionSubtitle: 'Съчетавайте здравина, естетика и функционалност с професионално изпълнение.',
            adText: 'Получавате модерна настилка, устойчива на время, натоварване и износване — без компромис в качеството.',
            stamped: {
                title: 'Предимства на щампования бетон',
                icon:  'fas fa-paint-roller',
                items: [
                    'Висока здравина и дълъг живот',
                    'Устойчивост на дъжд, сняг и UV лъчи',
                    'Богат избор от цветове и текстури',
                    'Имитира камък, павета, дърво и естествени настилки',
                    'Без разместване и пропадане като при паветата',
                    'Лесна поддръжка и почистване',
                    'Отлично решение за дворове, алеи и паркинги',
                ],
            },
            polished: {
                title: 'Предимства на шлайфания бетон',
                icon:  'fas fa-industry',
                items: [
                    'Гладка и модерна визия',
                    'Изключително износоустойчива повърхност',
                    'Намалява праха в помещенията',
                    'Лесен за почистване и поддръжка',
                    'Подходящ за халета, гаражи, магазини и индустриални обекти',
                    'Дълготрайно решение с минимални разходи за поддръжка',
                ],
            },
            cta: 'Свържете се с нас',
        },

        about: {
            sectionLabel:    'За нас',
            sectionTitle:    'Decorfloors',
            sectionSubtitle: 'Специалисти в декоративни бетонни настилки в Русе и региона.',
            p1: 'Decorfloors е специализирана в изграждането на щампован и шлайфан бетон — решения, които съчетават здравина, естетика и дълготрайност. Работим с висококачествени материали и доказани технологии, за да гарантираме отличен резултат при всеки обект.',
            p2: 'От жилищни дворове и алеи до промишлени халета и паркинги — предлагаме пълен цикъл: кофражни работи, армировка, изливане на бетон, шлайфане и декоративно щамповане. Базирани в Русе, обслужваме клиенти в цяла Северна България и Румъния.',
            cards: [
                { icon: 'fas fa-map-marker-alt', title: 'Обслужвани райони', text: 'Русе, Северна България, Румъния' },
                { icon: 'fas fa-tools',          title: 'Пълен цикъл',       text: 'Кофраж, армировка, изливане, декорация' },
                { icon: 'fas fa-star',           title: 'Качество',          text: 'Висококачествени материали и финиши' },
            ],
        },

        contact: {
            sectionLabel:    'Контакти',
            sectionTitle:    'Свържете се с нас',
            sectionSubtitle: 'Готови сме да обсъдим вашия проект. Обадете се или пишете за безплатна консултация.',
            description:     'Независимо дали планирате нов двор, алея, гараж или промишлена настилка — свържете се с нас за безплатна консултация и оферта.',
            phone:           '+359895321977',
            phoneDisplay:    '+359 895 321 977',
            email:           'diqnangelov99@gmail.com',
            location:        'Русе, България',
            phoneLabel:      'Обадете се',
            emailLabel:      'Пишете ни',
            locationLabel:   'Русе и региона',
        },

        footer: {
            copy:  'Всички права запазени.',
            brand: 'Decorfloors',
        },
    },

    /* ══════════════════════════════════════
       ENGLISH
    ══════════════════════════════════════ */
    en: {
        nav: {
            home:       'Home',
            services:   'Services',
            gallery:    'Gallery',
            advantages: 'Why Us',
            about:      'About',
            contact:    'Contact',
        },

        hero: {
            typed:    ['Stamped Concrete', 'Polished Concrete', 'Yards & Driveways', 'Industrial Floors', 'Decorative Surfaces'],
            title:    'Decorative Concrete Flooring',
            subtitle: 'Practical and beautiful solutions for yards, driveways, garages, warehouses and industrial spaces. Resistant to load, weather and daily wear.',
            cta1:     'Our Services',
            cta2:     'Get in Touch',
        },

        trustBar: [
            { icon: 'fas fa-medal',          text: 'Quality Materials'    },
            { icon: 'fas fa-shield-alt',     text: 'Guaranteed Results'   },
            { icon: 'fas fa-map-marker-alt', text: 'Ruse & Region'        },
            { icon: 'fas fa-phone',          text: 'Free Consultation'    },
        ],

        services: {
            sectionLabel:    'Services',
            sectionTitle:    'What We Offer',
            sectionSubtitle: 'Full cycle — from reinforcement and pouring to the final decorative surface finish.',
            items: [
                {
                    icon:  'fas fa-paint-roller',
                    color: 'amber',
                    title: 'Stamped Concrete for Yards & Driveways',
                    desc:  'Beautiful, durable surfaces for yards, driveways, terraces and parking — stone, wood, tile or cobblestone imitation. Resistant to weather and load.',
                },
                {
                    icon:  'fas fa-industry',
                    color: 'amber',
                    title: 'Polished Concrete for Warehouses',
                    desc:  'Durable, low-maintenance flooring for industrial spaces, garages and shops.',
                },
                {
                    icon:  'fas fa-layer-group',
                    color: 'stone',
                    title: 'Concrete Flooring Installation',
                    desc:  'Full installation of concrete flooring — base preparation, levelling, compaction and surface treatment before stamping or polishing.',
                },
                {
                    icon:  'fas fa-truck',
                    color: 'amber',
                    title: 'Concrete Pouring',
                    desc:  'Professional concrete pouring with proper compaction, thickness and mix quality — a solid base for any concrete floor.',
                },
                {
                    icon:  'fas fa-drafting-compass',
                    color: 'amber',
                    title: 'Formwork',
                    desc:  'Formwork construction for accurate shaping of concrete slabs — yards, terraces, retaining walls.',
                },
                {
                    icon:  'fas fa-wrench',
                    color: 'stone',
                    title: 'Reinforcement Works',
                    desc:  'Laying reinforcement mesh or steel to strengthen the structure and prevent cracking.',
                },
            ],
        },

        gallery: {
            sectionLabel:    'Gallery',
            sectionTitle:    'Our Projects',
            sectionSubtitle: 'Browse completed projects — every surface is a unique project.',
            filters: {
                all:         'All',
                pouring:     'Floor Installation',
                stone:       'Stone',
                wood:        'Wood',
                tiles:       'Tiles',
                cobblestone: 'Cobblestone',
            },
            catLabels: {
                stone:       'Stone Imitation',
                wood:        'Wood Imitation',
                tiles:       'Tile Imitation',
                cobblestone: 'Cobblestone Imitation',
                pouring:     'Concrete Flooring Installation',
            },
        },

        advantages: {
            sectionLabel:    'Why Us',
            sectionTitle:    'Why Choose Us',
            sectionSubtitle: 'Combine strength, aesthetics and functionality with professional execution.',
            adText: 'Get a modern surface resistant to weather, load and wear — with no compromise on quality.',
            stamped: {
                title: 'Advantages of Stamped Concrete',
                icon:  'fas fa-paint-roller',
                items: [
                    'High strength and long lifespan',
                    'Resistant to rain, snow and UV rays',
                    'Wide choice of colors and textures',
                    'Imitates stone, cobblestone, wood and natural surfaces',
                    'No displacement or sinking like with paving stones',
                    'Easy maintenance and cleaning',
                    'Excellent for yards, driveways and parking',
                ],
            },
            polished: {
                title: 'Advantages of Polished Concrete',
                icon:  'fas fa-industry',
                items: [
                    'Smooth and modern appearance',
                    'Extremely wear-resistant surface',
                    'Reduces dust in spaces',
                    'Easy to clean and maintain',
                    'Suitable for warehouses, garages and industrial objects',
                    'Long-lasting with minimal maintenance costs',
                ],
            },
            cta: 'Contact Us',
        },

        about: {
            sectionLabel:    'About',
            sectionTitle:    'Decorfloors',
            sectionSubtitle: 'Specialists in decorative concrete flooring in Ruse and the region.',
            p1: 'Decorfloors specializes in stamped and polished concrete — solutions that combine durability, aesthetics and longevity. We work with quality materials and proven technologies to guarantee excellent results on every project.',
            p2: 'From residential yards and driveways to industrial warehouses and parking lots — we offer a full execution cycle: formwork, reinforcement, concrete pouring, polishing and decorative stamping. Based in Ruse, we serve clients throughout Northern Bulgaria and Romania.',
            cards: [
                { icon: 'fas fa-map-marker-alt', title: 'Service Areas',  text: 'Ruse, Northern Bulgaria, Romania' },
                { icon: 'fas fa-tools',          title: 'Full Cycle',     text: 'Formwork, reinforcement, pouring, decoration' },
                { icon: 'fas fa-star',           title: 'Quality',        text: 'Premium materials and finishes' },
            ],
        },

        contact: {
            sectionLabel:    'Contact',
            sectionTitle:    'Get in Touch',
            sectionSubtitle: 'Ready to discuss your project. Call or write for a free consultation.',
            description:     "Whether you're planning a new yard, driveway, garage or industrial flooring — contact us for a free consultation and quote.",
            phone:           '+359895321977',
            phoneDisplay:    '+359 895 321 977',
            email:           'diqnangelov99@gmail.com',
            location:        'Ruse, Bulgaria',
            phoneLabel:      'Call Us',
            emailLabel:      'Email Us',
            locationLabel:   'Ruse & Region',
        },

        footer: {
            copy:  'All rights reserved.',
            brand: 'Decorfloors',
        },
    },
};
