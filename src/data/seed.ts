import type { Region, UnescoDomain, IchElement, NewsItem, Bearer } from '@/types';

export const REGIONS: Region[] = [
  { id: 'akmola', name_kk: 'Ақмола облысы', name_ru: 'Акмолинская область', name_en: 'Akmola Region', latitude: 51.1, longitude: 69.4 },
  { id: 'aktobe', name_kk: 'Ақтөбе облысы', name_ru: 'Актюбинская область', name_en: 'Aktobe Region', latitude: 50.3, longitude: 57.2 },
  { id: 'almaty_obl', name_kk: 'Алматы облысы', name_ru: 'Алматинская область', name_en: 'Almaty Region', latitude: 45.0, longitude: 77.0 },
  { id: 'atyrau', name_kk: 'Атырау облысы', name_ru: 'Атырауская область', name_en: 'Atyrau Region', latitude: 47.1, longitude: 51.9 },
  { id: 'east_kz', name_kk: 'Шығыс Қазақстан облысы', name_ru: 'Восточно-Казахстанская область', name_en: 'East Kazakhstan Region', latitude: 49.9, longitude: 82.6 },
  { id: 'zhambyl', name_kk: 'Жамбыл облысы', name_ru: 'Жамбылская область', name_en: 'Zhambyl Region', latitude: 42.9, longitude: 71.4 },
  { id: 'west_kz', name_kk: 'Батыс Қазақстан облысы', name_ru: 'Западно-Казахстанская область', name_en: 'West Kazakhstan Region', latitude: 51.2, longitude: 51.4 },
  { id: 'karaganda', name_kk: 'Қарағанды облысы', name_ru: 'Карагандинская область', name_en: 'Karaganda Region', latitude: 49.8, longitude: 73.1 },
  { id: 'kostanay', name_kk: 'Қостанай облысы', name_ru: 'Костанайская область', name_en: 'Kostanay Region', latitude: 53.2, longitude: 63.6 },
  { id: 'kyzylorda', name_kk: 'Қызылорда облысы', name_ru: 'Кызылординская область', name_en: 'Kyzylorda Region', latitude: 44.8, longitude: 65.5 },
  { id: 'mangystau', name_kk: 'Маңғыстау облысы', name_ru: 'Мангистауская область', name_en: 'Mangystau Region', latitude: 43.3, longitude: 52.1 },
  { id: 'pavlodar', name_kk: 'Павлодар облысы', name_ru: 'Павлодарская область', name_en: 'Pavlodar Region', latitude: 52.3, longitude: 76.9 },
  { id: 'north_kz', name_kk: 'Солтүстік Қазақстан облысы', name_ru: 'Северо-Казахстанская область', name_en: 'North Kazakhstan Region', latitude: 54.9, longitude: 69.2 },
  { id: 'turkistan', name_kk: 'Түркістан облысы', name_ru: 'Туркестанская область', name_en: 'Turkistan Region', latitude: 43.3, longitude: 68.3 },
  { id: 'almaty_city', name_kk: 'Алматы қаласы', name_ru: 'город Алматы', name_en: 'Almaty City', latitude: 43.2, longitude: 76.9 },
  { id: 'astana_city', name_kk: 'Астана қаласы', name_ru: 'город Астана', name_en: 'Astana City', latitude: 51.1, longitude: 71.4 },
  { id: 'shymkent_city', name_kk: 'Шымкент қаласы', name_ru: 'город Шымкент', name_en: 'Shymkent City', latitude: 42.3, longitude: 69.6 },
];

export const UNESCO_DOMAINS: UnescoDomain[] = [
  {
    id: 'oral_traditions', name_kk: 'Ауызша дәстүрлер мен көріністер', name_ru: 'Устные традиции и формы выражения', name_en: 'Oral traditions and expressions',
    description_kk: 'Тіл, эпос, аңыз, ертегі, мақал-мәтел', description_ru: 'Язык, эпос, легенды, сказки, пословицы', description_en: 'Language, epic, legends, tales, proverbs',
  },
  {
    id: 'performing_arts', name_kk: 'Орындаушылық өнер', name_ru: 'Исполнительские искусства', name_en: 'Performing arts',
    description_kk: 'Музыка, би, театр', description_ru: 'Музыка, танцы, театр', description_en: 'Music, dance, theatre',
  },
  {
    id: 'social_practices', name_kk: 'Әлеуметтік практикалар, рәсімдер', name_ru: 'Социальные практики, ритуалы', name_en: 'Social practices, rituals and festive events',
    description_kk: 'Салт-дәстүрлер, мерекелер, рәсімдер', description_ru: 'Обычаи, праздники, ритуалы', description_en: 'Customs, celebrations, rituals',
  },
  {
    id: 'nature_knowledge', name_kk: 'Табиғат пен әлем туралы білім', name_ru: 'Знания о природе и вселенной', name_en: 'Knowledge and practices concerning nature and the universe',
    description_kk: 'Дәстүрлі медицина, астрономия, малшылық', description_ru: 'Традиционная медицина, астрономия, скотоводство', description_en: 'Traditional medicine, astronomy, herding',
  },
  {
    id: 'craftsmanship', name_kk: 'Дәстүрлі қолөнер', name_ru: 'Традиционные ремёсла', name_en: 'Traditional craftsmanship',
    description_kk: 'Киіз үй, кілем, зергерлік, ағаш өңдеу', description_ru: 'Юрта, ковры, ювелирное дело, деревообработка', description_en: 'Yurt, carpets, jewelry, woodworking',
  },
];

export const SAMPLE_ELEMENTS: IchElement[] = [
  {
    id: '1', name_kk: 'Қазақ киіз үйі', name_ru: 'Казахская юрта', name_en: 'Kazakh Yurt Construction',
    brief_description_kk: 'Қазақтың дәстүрлі тұрғын үйі — киіз үйді жасау өнері', brief_description_ru: 'Искусство создания традиционного казахского жилища — юрты', brief_description_en: 'The art of constructing the traditional Kazakh dwelling — the yurt',
    detailed_description_kk: 'Киіз үй — қазақ халқының көшпелі өмір салтына бейімделген дәстүрлі тұрғын үйі. Оның құрылымы кереге, уық, шаңырақ, киіз жабындылардан тұрады. Киіз үй жасау өнері ата-бабадан ұрпаққа жалғасып, бүгінгі күнге дейін сақталған.\n\nКиіз үйдің ерекшелігі — оны тез орнатуға және бөлшектеуге болады, бұл көшпелі өмір салтына өте ыңғайлы.', detailed_description_ru: 'Юрта — традиционное жилище казахского народа, приспособленное к кочевому образу жизни. Конструкция юрты состоит из кереге (решетчатый каркас), уыков (купольных жердей), шанырака (верхнего круга) и войлочных покрытий. Искусство создания юрты передавалось из поколения в поколение и сохранилось до наших дней.\n\nОсобенность юрты в том, что её можно быстро собрать и разобрать, что очень удобно для кочевого образа жизни.', detailed_description_en: 'The yurt is a traditional dwelling of the Kazakh people, adapted to the nomadic lifestyle. Its structure consists of kereges (lattice frames), uyks (dome poles), shanyrak (upper circle), and felt coverings. The art of yurt construction has been passed down through generations and preserved to this day.\n\nThe unique feature of the yurt is that it can be quickly assembled and disassembled, making it very convenient for the nomadic lifestyle.',
    region_id: 'almaty_obl', unesco_domain_id: 'craftsmanship', latitude: 45.0, longitude: 77.0, status: 'published',
    created_at: '2026-01-15', updated_at: '2026-01-15', created_by: 'admin',
    photos: [
      'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504858700536-882c978a3464?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    ],
    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
    audio: [],
  },
  {
    id: '2', name_kk: 'Наурыз мейрамы', name_ru: 'Праздник Наурыз', name_en: 'Nauryz Celebration',
    brief_description_kk: 'Жаңа жылды қарсы алу — көктемгі теңдік мерекесі', brief_description_ru: 'Празднование нового года — весеннего равноденствия', brief_description_en: 'New Year celebration — spring equinox festival',
    detailed_description_kk: 'Наурыз — қазақ халқының ежелгі жаңа жыл мерекесі, 22 наурызда тойланады. Бұл мереке табиғаттың оянуын, жаңа өмірдің басталуын білдіреді.\n\nНаурыз мейрамында дастарқанға наурыз көже қойылады, ұлттық ойындар ойналады, ән-күй шырқалады.', detailed_description_ru: 'Наурыз — древний праздник нового года у казахов, отмечается 22 марта. Этот праздник символизирует пробуждение природы и начало новой жизни.\n\nВо время Наурыза на дастархан ставится наурыз-коже, проводятся национальные игры, звучат песни и музыка.', detailed_description_en: 'Nauryz is the ancient Kazakh New Year celebration, observed on March 22. This holiday symbolizes the awakening of nature and the beginning of new life.\n\nDuring Nauryz, nauriz-kozhe is served at the dastarkhan, national games are played, and songs and music fill the air.',
    region_id: 'astana_city', unesco_domain_id: 'social_practices', latitude: 51.1, longitude: 71.4, status: 'published',
    created_at: '2026-01-20', updated_at: '2026-01-20', created_by: 'admin',
    photos: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    ],
    videos: [],
    audio: [],
  },
  {
    id: '3', name_kk: 'Домбыра өнері', name_ru: 'Искусство домбры', name_en: 'Dombra Music',
    brief_description_kk: 'Қазақтың дәстүрлі музыкалық аспабы — домбырада ойнау өнері', brief_description_ru: 'Искусство игры на традиционном казахском музыкальном инструменте — домбре', brief_description_en: 'The art of playing the traditional Kazakh musical instrument — the dombra',
    detailed_description_kk: 'Домбыра — қазақ халқының ең кең тараған музыкалық аспабы. Домбырада күй тарту — қазақ мәдениетінің ажырамас бөлігі. Күйлер табиғат суреттерін, тарихи оқиғаларды, адам сезімдерін бейнелейді.\n\nДомбыраның екі ішекті түрі ең көп таралған.', detailed_description_ru: 'Домбра — самый распространённый музыкальный инструмент казахского народа. Исполнение кюев на домбре — неотъемлемая часть казахской культуры. Кюи описывают картины природы, исторические события, человеческие чувства.\n\nНаиболее распространён двухструнный вариант домбры.', detailed_description_en: 'The dombra is the most widespread musical instrument of the Kazakh people. Playing kuis on the dombra is an integral part of Kazakh culture. Kuis depict scenes of nature, historical events, and human emotions.\n\nThe two-stringed version of the dombra is the most common.',
    region_id: 'almaty_city', unesco_domain_id: 'performing_arts', latitude: 43.2, longitude: 76.9, status: 'published',
    created_at: '2026-01-25', updated_at: '2026-01-25', created_by: 'admin',
    photos: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop',
    ],
    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
    audio: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
  },
  {
    id: '4', name_kk: 'Бүркітшілік', name_ru: 'Охота с беркутом', name_en: 'Eagle Hunting (Berkutchi)',
    brief_description_kk: 'Бүркітпен аң аулау — қазақтың ежелгі аңшылық дәстүрі', brief_description_ru: 'Охота с беркутом — древняя казахская охотничья традиция', brief_description_en: 'Eagle hunting — ancient Kazakh hunting tradition',
    detailed_description_kk: 'Бүркітшілік — қазақ халқының бүркітті баптап, аңға салу өнері. Бүркітші бүркітті балапан кезінен баптап, аңға салуға үйретеді.\n\nБұл дәстүр негізінен Шығыс Қазақстан мен Алматы облысында кең тараған.', detailed_description_ru: 'Беркутчи — искусство казахского народа по дрессировке беркутов для охоты. Беркутчи воспитывает беркута с птенца, обучая его охоте.\n\nЭта традиция наиболее распространена в Восточно-Казахстанской и Алматинской областях.', detailed_description_en: 'Berkutchi is the Kazakh art of training golden eagles for hunting. The berkutchi raises the eagle from a chick, training it for hunting.\n\nThis tradition is most widespread in East Kazakhstan and Almaty regions.',
    region_id: 'east_kz', unesco_domain_id: 'nature_knowledge', latitude: 49.9, longitude: 82.6, status: 'published',
    created_at: '2026-02-01', updated_at: '2026-02-01', created_by: 'admin',
    photos: [
      'https://images.unsplash.com/photo-1611689342806-0863700ce8e4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1557401620-67270b4737fa?w=800&h=600&fit=crop',
    ],
    videos: [],
    audio: [],
  },
  {
    id: '5', name_kk: 'Қазақ кілем тоқу', name_ru: 'Казахское ковроткачество', name_en: 'Kazakh Carpet Weaving',
    brief_description_kk: 'Қолдан кілем тоқу — қазақ қолөнерінің бірі', brief_description_ru: 'Ручное ткачество ковров — одно из казахских ремёсел', brief_description_en: 'Hand carpet weaving — one of Kazakh traditional crafts',
    detailed_description_kk: 'Кілем тоқу — қазақ әйелдерінің ежелгі қолөнері. Кілемдердің ою-өрнектері қазақ халқының дүниетанымын, табиғатқа деген көзқарасын білдіреді.\n\nӘр аймақтың өзіне тән ою-өрнек стилі бар.', detailed_description_ru: 'Ковроткачество — древнее ремесло казахских женщин. Узоры ковров отражают мировоззрение казахского народа и его отношение к природе.\n\nКаждый регион имеет свой характерный стиль орнаментов.', detailed_description_en: 'Carpet weaving is an ancient craft of Kazakh women. The patterns of carpets reflect the worldview of the Kazakh people and their relationship with nature.\n\nEach region has its own distinctive ornamental style.',
    region_id: 'turkistan', unesco_domain_id: 'craftsmanship', latitude: 43.3, longitude: 68.3, status: 'published',
    created_at: '2026-02-05', updated_at: '2026-02-05', created_by: 'admin',
    photos: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=600&fit=crop',
    ],
    videos: [],
    audio: [],
  },
  {
    id: '6', name_kk: 'Көкпар', name_ru: 'Кокпар', name_en: 'Kokpar (Traditional Horse Game)',
    brief_description_kk: 'Атпен ойналатын дәстүрлі қазақ ойыны', brief_description_ru: 'Традиционная казахская конная игра', brief_description_en: 'Traditional Kazakh equestrian game',
    detailed_description_kk: 'Көкпар — қазақ халқының ежелгі атты спорт ойыны. Ойынға екі топ қатысады, әрбір топтың мақсаты — лақ денесін қарсылас қақпасына тастау.\n\nБұл ойын батырлықты, шеберлікті және ат мінуді талап етеді.', detailed_description_ru: 'Кокпар — древняя конная игра казахского народа. В игре участвуют две команды, цель каждой — забросить тушу козла в ворота противника.\n\nЭта игра требует мужества, мастерства и умения верховой езды.', detailed_description_en: 'Kokpar is an ancient equestrian game of the Kazakh people. Two teams compete, with each team\'s goal being to throw the goat carcass into the opponent\'s goal.\n\nThis game requires courage, skill, and horsemanship.',
    region_id: 'shymkent_city', unesco_domain_id: 'social_practices', latitude: 42.3, longitude: 69.6, status: 'published',
    created_at: '2026-02-10', updated_at: '2026-02-10', created_by: 'admin',
    photos: [
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=800&h=600&fit=crop',
    ],
    videos: [],
    audio: [],
  },
];

export const SAMPLE_BEARERS: Bearer[] = [
  {
    id: '1', full_name: 'Айтқалиев Нұрлан Қайратұлы',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    biography: 'Нұрлан Қайратұлы — киіз үй шебері, 30 жылдан аса тәжірибесі бар. Ол киіз үй жасау өнерін әкесінен үйренген. Қазіргі уақытта Алматы облысында шеберлік сабақтарын өткізеді.',
    region_id: 'almaty_obl', awards: 'Қазақстан Республикасының еңбек сіңірген қайраткері (2020), ЮНЕСКО мәдени мұра сыйлығы (2022)',
    created_at: '2026-01-10', updated_at: '2026-01-10', video_interviews: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
  },
  {
    id: '2', full_name: 'Сериков Бауыржан Маратович',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    biography: 'Бауыржан Маратович — домбырашы, күйші. 20 жылдан астам домбыра өнерімен айналысады. Ол көптеген халықаралық фестивальдарға қатысқан.',
    region_id: 'almaty_city', awards: 'Халықаралық домбыра фестивалінің лауреаты (2019)',
    created_at: '2026-01-12', updated_at: '2026-01-12', video_interviews: [],
  },
  {
    id: '3', full_name: 'Тұрсынбаева Гүлнәр Сәбитқызы',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    biography: 'Гүлнәр Сәбитқызы — кілем тоқу шебері. Түркістан облысындағы ең танымал қолөнершілердің бірі. Ол 40 жылдан аса кілем тоқу өнерімен айналысады.',
    region_id: 'turkistan', awards: 'Қазақстан қолөнершілер одағының мүшесі, «Үздік шебер» атағы (2021)',
    created_at: '2026-01-15', updated_at: '2026-01-15', video_interviews: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
  },
  {
    id: '4', full_name: 'Жұмабеков Ерлан Асқарұлы',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    biography: 'Ерлан Асқарұлы — бүркітші, Шығыс Қазақстан облысының тұрғыны. Бүркітшілік өнерін атасынан үйренген. 15 жылдан аса бүркітпен аң аулайды.',
    region_id: 'east_kz', awards: 'Халықаралық бүркітшілер фестивалінің жеңімпазы (2023)',
    created_at: '2026-01-20', updated_at: '2026-01-20', video_interviews: [],
  },
  {
    id: '5', full_name: 'Әбілқасымова Мәдина Оразбекқызы',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    biography: 'Мәдина Оразбекқызы — фольклорист, ауыз әдебиеті зерттеушісі. Ол 200-ден астам қазақ ертегісі мен аңызын жинап, жариялаған.',
    region_id: 'astana_city', awards: 'Қазақстан ғылым академиясының сыйлығы (2024)',
    created_at: '2026-01-25', updated_at: '2026-01-25', video_interviews: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
  },
];

export const SAMPLE_BEARER_ELEMENTS: { bearer_id: string; element_id: string }[] = [
  { bearer_id: '1', element_id: '1' },
  { bearer_id: '2', element_id: '3' },
  { bearer_id: '3', element_id: '5' },
  { bearer_id: '4', element_id: '4' },
  { bearer_id: '1', element_id: '5' },
  { bearer_id: '5', element_id: '2' },
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1', title_kk: 'Жаңа мәдени мұра элементтері тізілімге енгізілді', title_ru: 'Новые элементы наследия внесены в реестр', title_en: 'New heritage elements added to registry',
    content_kk: 'Бірнеше жаңа мәдени мұра элементтері ұлттық тізілімге ресми түрде енгізілді. Бұл элементтер Қазақстанның түрлі аймақтарынан жиналып, сараптамадан өткен. Жаңа элементтердің арасында дәстүрлі қолөнер, музыка және мерекелік рәсімдер бар.\n\nЖаңа элементтерді тізілімге енгізу — ұлттық мәдени мұраны сақтау бағытындағы маңызды қадам.',
    content_ru: 'Несколько новых элементов наследия были официально внесены в национальный реестр. Эти элементы были собраны из различных регионов Казахстана и прошли экспертизу. Среди новых элементов — традиционные ремёсла, музыка и праздничные обряды.\n\nВнесение новых элементов в реестр — важный шаг в сохранении национального культурного наследия.',
    content_en: 'Several new heritage elements have been officially added to the national registry. These elements were collected from various regions of Kazakhstan and underwent expert review. Among the new elements are traditional crafts, music, and festive rituals.\n\nAdding new elements to the registry is an important step in preserving national cultural heritage.',
    featured_image_url: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&h=400&fit=crop', category: 'new_elements', published_at: '2026-02-20', status: 'published', created_by: 'admin', created_at: '2026-02-20', updated_at: '2026-02-20',
  },
  {
    id: '2', title_kk: 'Наурыз мерекесіне дайындық', title_ru: 'Подготовка к празднику Наурыз', title_en: 'Preparations for Nauryz Festival',
    content_kk: 'Наурыз мерекесін тойлауға елордада дайындық жұмыстары басталды. Астана қаласында арнайы мерекелік бағдарлама жасалды. Бағдарламада ұлттық ойындар, концерттер және дәстүрлі тағамдар фестивалі жоспарланған.\n\nМерекеге барлық азаматтар шақырылады.',
    content_ru: 'В столице начались подготовительные работы к празднованию Наурыза. В городе Астана разработана специальная праздничная программа. В программу включены национальные игры, концерты и фестиваль традиционной кухни.\n\nНа праздник приглашаются все граждане.',
    content_en: 'Preparations have begun in the capital for the Nauryz celebrations. A special festive program has been developed in Astana. The program includes national games, concerts, and a traditional cuisine festival.\n\nAll citizens are invited to the celebration.',
    featured_image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop', category: 'festivals', published_at: '2026-02-18', status: 'published', created_by: 'admin', created_at: '2026-02-18', updated_at: '2026-02-18',
  },
  {
    id: '3', title_kk: 'ЮНЕСКО делегациясының сапары', title_ru: 'Визит делегации ЮНЕСКО', title_en: 'UNESCO Delegation Visit',
    content_kk: 'ЮНЕСКО делегациясы Қазақстанға ресми сапармен келді. Делегация мүшелері Қазақстанның мәдени мұра объектілерімен танысып, жергілікті шеберлермен кездесті.\n\nСапар нәтижесінде Қазақстанның материалдық емес мәдени мұрасын сақтау бойынша бірлескен жоба туралы меморандумға қол қойылды.',
    content_ru: 'Делегация ЮНЕСКО прибыла в Казахстан с официальным визитом. Члены делегации ознакомились с объектами культурного наследия Казахстана и встретились с местными мастерами.\n\nПо итогам визита был подписан меморандум о совместном проекте по сохранению нематериального культурного наследия Казахстана.',
    content_en: 'A UNESCO delegation has arrived in Kazakhstan on an official visit. The delegation members familiarized themselves with Kazakhstan\'s cultural heritage sites and met with local artisans.\n\nAs a result of the visit, a memorandum was signed regarding a joint project for the preservation of Kazakhstan\'s intangible cultural heritage.',
    featured_image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop', category: 'cooperation', published_at: '2026-02-15', status: 'published', created_by: 'admin', created_at: '2026-02-15', updated_at: '2026-02-15',
  },
];
