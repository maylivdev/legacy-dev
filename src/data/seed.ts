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
    detailed_description_kk: 'Киіз үй — қазақ халқының көшпелі өмір салтына бейімделген дәстүрлі тұрғын үйі.', detailed_description_ru: 'Юрта — традиционное жилище казахского народа, приспособленное к кочевому образу жизни.', detailed_description_en: 'The yurt is a traditional dwelling of the Kazakh people, adapted to the nomadic lifestyle.',
    region_id: 'almaty_obl', unesco_domain_id: 'craftsmanship', latitude: 45.0, longitude: 77.0, status: 'published',
    created_at: '2026-01-15', updated_at: '2026-01-15', created_by: 'admin', photos: [], videos: [], audio: [],
  },
  {
    id: '2', name_kk: 'Наурыз мейрамы', name_ru: 'Праздник Наурыз', name_en: 'Nauryz Celebration',
    brief_description_kk: 'Жаңа жылды қарсы алу — көктемгі теңдік мерекесі', brief_description_ru: 'Празднование нового года — весеннего равноденствия', brief_description_en: 'New Year celebration — spring equinox festival',
    detailed_description_kk: 'Наурыз — қазақ халқының ежелгі жаңа жыл мерекесі, 22 наурызда тойланады.', detailed_description_ru: 'Наурыз — древний праздник нового года у казахов, отмечается 22 марта.', detailed_description_en: 'Nauryz is the ancient Kazakh New Year celebration, observed on March 22.',
    region_id: 'astana_city', unesco_domain_id: 'social_practices', latitude: 51.1, longitude: 71.4, status: 'published',
    created_at: '2026-01-20', updated_at: '2026-01-20', created_by: 'admin', photos: [], videos: [], audio: [],
  },
  {
    id: '3', name_kk: 'Домбыра өнері', name_ru: 'Искусство домбры', name_en: 'Dombra Music',
    brief_description_kk: 'Қазақтың дәстүрлі музыкалық аспабы — домбырада ойнау өнері', brief_description_ru: 'Искусство игры на традиционном казахском музыкальном инструменте — домбре', brief_description_en: 'The art of playing the traditional Kazakh musical instrument — the dombra',
    detailed_description_kk: 'Домбыра — қазақ халқының ең кең тараған музыкалық аспабы.', detailed_description_ru: 'Домбра — самый распространённый музыкальный инструмент казахского народа.', detailed_description_en: 'The dombra is the most widespread musical instrument of the Kazakh people.',
    region_id: 'almaty_city', unesco_domain_id: 'performing_arts', latitude: 43.2, longitude: 76.9, status: 'published',
    created_at: '2026-01-25', updated_at: '2026-01-25', created_by: 'admin', photos: [], videos: [], audio: [],
  },
  {
    id: '4', name_kk: 'Бүркітшілік', name_ru: 'Охота с беркутом', name_en: 'Eagle Hunting (Berkutchi)',
    brief_description_kk: 'Бүркітпен аң аулау — қазақтың ежелгі аңшылық дәстүрі', brief_description_ru: 'Охота с беркутом — древняя казахская охотничья традиция', brief_description_en: 'Eagle hunting — ancient Kazakh hunting tradition',
    detailed_description_kk: 'Бүркітшілік — қазақ халқының бүркітті баптап, аңға салу өнері.', detailed_description_ru: 'Беркутчи — искусство казахского народа по дрессировке беркутов для охоты.', detailed_description_en: 'Berkutchi is the Kazakh art of training golden eagles for hunting.',
    region_id: 'east_kz', unesco_domain_id: 'nature_knowledge', latitude: 49.9, longitude: 82.6, status: 'published',
    created_at: '2026-02-01', updated_at: '2026-02-01', created_by: 'admin', photos: [], videos: [], audio: [],
  },
  {
    id: '5', name_kk: 'Қазақ кілем тоқу', name_ru: 'Казахское ковроткачество', name_en: 'Kazakh Carpet Weaving',
    brief_description_kk: 'Қолдан кілем тоқу — қазақ қолөнерінің бірі', brief_description_ru: 'Ручное ткачество ковров — одно из казахских ремёсел', brief_description_en: 'Hand carpet weaving — one of Kazakh traditional crafts',
    detailed_description_kk: 'Кілем тоқу — қазақ әйелдерінің ежелгі қолөнері.', detailed_description_ru: 'Ковроткачество — древнее ремесло казахских женщин.', detailed_description_en: 'Carpet weaving is an ancient craft of Kazakh women.',
    region_id: 'turkistan', unesco_domain_id: 'craftsmanship', latitude: 43.3, longitude: 68.3, status: 'published',
    created_at: '2026-02-05', updated_at: '2026-02-05', created_by: 'admin', photos: [], videos: [], audio: [],
  },
  {
    id: '6', name_kk: 'Көкпар', name_ru: 'Кокпар', name_en: 'Kokpar (Traditional Horse Game)',
    brief_description_kk: 'Атпен ойналатын дәстүрлі қазақ ойыны', brief_description_ru: 'Традиционная казахская конная игра', brief_description_en: 'Traditional Kazakh equestrian game',
    detailed_description_kk: 'Көкпар — қазақ халқының ежелгі атты спорт ойыны.', detailed_description_ru: 'Кокпар — древняя конная игра казахского народа.', detailed_description_en: 'Kokpar is an ancient equestrian game of the Kazakh people.',
    region_id: 'shymkent_city', unesco_domain_id: 'social_practices', latitude: 42.3, longitude: 69.6, status: 'published',
    created_at: '2026-02-10', updated_at: '2026-02-10', created_by: 'admin', photos: [], videos: [], audio: [],
  },
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1', title_kk: 'Жаңа мәдени мұра элементтері тізілімге енгізілді', title_ru: 'Новые элементы наследия внесены в реестр', title_en: 'New heritage elements added to registry',
    content_kk: 'Бірнеше жаңа мәдени мұра элементтері ұлттық тізілімге ресми түрде енгізілді.', content_ru: 'Несколько новых элементов наследия были официально внесены в национальный реестр.', content_en: 'Several new heritage elements have been officially added to the national registry.',
    featured_image_url: '', category: 'new_elements', published_at: '2026-02-20', status: 'published', created_by: 'admin', created_at: '2026-02-20', updated_at: '2026-02-20',
  },
  {
    id: '2', title_kk: 'Наурыз мерекесіне дайындық', title_ru: 'Подготовка к празднику Наурыз', title_en: 'Preparations for Nauryz Festival',
    content_kk: 'Наурыз мерекесін тойлауға елордада дайындық жұмыстары басталды.', content_ru: 'В столице начались подготовительные работы к празднованию Наурыза.', content_en: 'Preparations have begun in the capital for the Nauryz celebrations.',
    featured_image_url: '', category: 'festivals', published_at: '2026-02-18', status: 'published', created_by: 'admin', created_at: '2026-02-18', updated_at: '2026-02-18',
  },
  {
    id: '3', title_kk: 'ЮНЕСКО делегациясының сапары', title_ru: 'Визит делегации ЮНЕСКО', title_en: 'UNESCO Delegation Visit',
    content_kk: 'ЮНЕСКО делегациясы Қазақстанға ресми сапармен келді.', content_ru: 'Делегация ЮНЕСКО прибыла в Казахстан с официальным визитом.', content_en: 'A UNESCO delegation has arrived in Kazakhstan on an official visit.',
    featured_image_url: '', category: 'cooperation', published_at: '2026-02-15', status: 'published', created_by: 'admin', created_at: '2026-02-15', updated_at: '2026-02-15',
  },
];
