/* Lalazar Nursery – shared data. Edit products & prices here. */
window.LZ = window.LZ || {};

/* Business details – edit here and every page updates */
LZ.BIZ = {
  name: 'Lalazar Nursery',
  owner: 'Muhammad Talha Butt',
  phone: '0339-7688799',
  tel: '+923397688799',
  wa: '923397688799',
  email: 'muhammadtalhabuttsb@gmail.com',
  addr: ['Lower Canal Road, near Lucky Petrol Pump', 'Opposite Sitara Gold City Phase 2, Faisalabad'],
  maps: 'https://maps.app.goo.gl/ZHDaXia6Bn6pn7Bx6?g_st=aw',
  lat: 31.393111, lng: 73.131543
};
LZ.waLink = text => `https://wa.me/${LZ.BIZ.wa}${text ? '?text=' + encodeURIComponent(text) : ''}`;

/* Unsplash photo ids (free to use). Served resized + auto-WebP via the CDN, so pages stay light. */
LZ.IMG = {
  tools: '1416879595882-3373a0480b5b', cactus: '1459411552884-841db9b3cc2a', haworthia: '1485955900006-10f4d324d411',
  seedlings: '1466692476868-aef1dfb1e735', cactusField: '1463936575829-25148e1db1b8', aloe: '1509423350716-97f9360b4e09',
  topiary: '1520412099551-62b6bafeb5bb', monstera: '1545241047-6083a3684587', rubber: '1501004318641-b39e6451bec6',
  shelf: '1530968464165-7a1861cbaf9f', peace: '1593691509543-c55fb32d8de5', bonsai: '1512428813834-c702c7702b78',
  calathea: '1491147334573-44cbb4602074', jungle: '1470058869958-2a77ade41c02', pothos: '1598880940080-ff9a29891b85',
  echeveria: '1446071103084-c257b5f70672', fiddle: '1453904300235-0f2f60b15b5d', pots: '1523348837708-15d4a09cfac2',
  lawn: '1558904541-efa843a96f01', garden: '1585320806297-9794b3e4eeae', eucalyptus: '1466781783364-36c955e42a7f',
  shelf2: '1604762524889-3e2fcc145683', leaf: '1525498128493-380d1990a112', sunflower: '1455659817273-f96807779a8a'
};
/* NOTE: keys above are arbitrary labels; the products below pick the right photo by visual match. */
LZ.PHOTO = {
  tools: LZ.IMG.tools, cactus: LZ.IMG.cactus, haworthia: LZ.IMG.haworthia, seedlings: LZ.IMG.seedlings,
  cactusField: LZ.IMG.cactusField, aloe: LZ.IMG.aloe, topiary: LZ.IMG.topiary, monstera: LZ.IMG.monstera,
  rubber: LZ.IMG.rubber, shelf: LZ.IMG.shelf, peace: LZ.IMG.peace, bonsai: LZ.IMG.bonsai, calathea: LZ.IMG.calathea,
  jungle: LZ.IMG.jungle, pothos: LZ.IMG.pothos, echeveria: LZ.IMG.echeveria, fiddle: LZ.IMG.fiddle, pots: LZ.IMG.pots,
  lawn: LZ.IMG.lawn, garden: LZ.IMG.garden, eucalyptus: LZ.IMG.eucalyptus, shelf2: LZ.IMG.shelf2,
  leaf: LZ.IMG.leaf, sunflower: LZ.IMG.sunflower
};

/* Product photos from Pexels (free licence). key -> Pexels photo id */
LZ.PEX = {
  chrysanthemum: 2795605, dahlia: 28118143, gerbera: 850359, osteospermum: 531774, ranunculus: 31416570,
  carnation: 4622762, dianthus: 34002795, areca: 15448195, spider: 31757820, fittonia: 17351228,
  jade: 9130764, bougainvillea: 12010795, adenium: 29862214, hibiscus: 31569219
};

/* Your own photos: put the file in images/products/ and list it here, e.g.
   LZ.LOCAL = { chrysanthemum: 'images/products/chrysanthemum.jpg', osteospermum: 'images/products/osteospermum.jpg' }; */
LZ.LOCAL = {};

LZ.U = (key, w) => LZ.LOCAL[key] ? LZ.LOCAL[key] : LZ.PEX[key]
  ?`https://images.pexels.com/photos/${LZ.PEX[key]}/pexels-photo-${LZ.PEX[key]}.jpeg?auto=compress&cs=tinysrgb&w=${w || 900}`
  : `https://images.unsplash.com/photo-${LZ.PHOTO[key]}?auto=format&fit=crop&q=75&w=${w || 900}`;
LZ.SRCSET = key => LZ.LOCAL[key] ? `${LZ.LOCAL[key]} 1600w` : [480, 800, 1200, 1800, 2400].map(w => `${LZ.U(key, w)} ${w}w`).join(', ');

LZ.fmt = n => 'Rs ' + n.toLocaleString('en-PK');

/* light: low|medium|bright   pet: true = pet-safe   care: easy|moderate|expert
   Prices in Rs. Edit name / price / description here and the whole site updates. */
LZ.PRODUCTS = [
  { id: 'chrysanthemum', name: 'Chrysanthemum', latin: 'Chrysanthemum morifolium', cat: 'Flowering', price: 1200, img: 'chrysanthemum', light: 'bright', pet: false, care: 'moderate', water: 'Every 2\u20133 days', desc: 'Fully double, long-lasting blooms in rich colour. A garden and balcony favourite that flowers heavily in the cooler months.' },
  { id: 'dahlia', name: 'Indian Dahlia', latin: 'Dahlia pinnata', cat: 'Flowering', price: 1000, img: 'dahlia', light: 'bright', pet: false, care: 'moderate', water: 'Every 2\u20133 days', desc: 'Deep, velvety dahlia blooms with a dramatic dark red tone. Loves full sun and rewards you with flowers for weeks.' },
  { id: 'gerbera', name: 'Gerbera', latin: 'Gerbera jamesonii', cat: 'Flowering', price: 800, img: 'gerbera', light: 'bright', pet: true, care: 'moderate', water: 'Every 2\u20133 days', desc: 'Big, cheerful daisy flowers on tall stems. Brightens a sunny window, balcony or garden bed.' },
  { id: 'osteospermum', name: 'Osteospermum', latin: 'African daisy', cat: 'Flowering', price: 700, img: 'osteospermum', light: 'bright', pet: false, care: 'easy', water: 'Every 2\u20133 days', desc: 'Daisy-like flowers that open in the sun. Compact, colourful and happy in pots and borders.' },
  { id: 'ranunculus', name: 'Ranunculus', latin: 'Persian buttercup', cat: 'Flowering', price: 1000, img: 'ranunculus', light: 'bright', pet: false, care: 'moderate', water: 'Keep lightly moist', desc: 'Layered, rose-like petals in vivid colour. A winter-spring beauty that makes a showy pot.' },
  { id: 'carnation', name: 'Carnation', latin: 'Dianthus caryophyllus', cat: 'Flowering', price: 1200, img: 'carnation', light: 'bright', pet: false, care: 'moderate', water: 'Every 2\u20133 days', desc: 'Ruffled, softly scented flowers loved for gifting and cut-flower arrangements.' },
  { id: 'dianthus', name: 'Dianthus', latin: 'Sweet William / pinks', cat: 'Flowering', price: 1000, img: 'dianthus', light: 'bright', pet: false, care: 'easy', water: 'Every 2\u20133 days', desc: 'Frilly-edged blooms in pink, red and white with a light clove scent. Tough and long-flowering.' },
  { id: 'moneyplant', name: 'Money Plant', latin: 'Epipremnum aureum', cat: 'Indoor', price: 1200, img: 'pothos', light: 'medium', pet: false, care: 'easy', water: 'Every 7\u201310 days', desc: 'The classic easy houseplant: glossy heart-shaped leaves that trail or climb. Thrives in water or soil.' },
  { id: 'areca', name: 'Areca Palm', latin: 'Dypsis lutescens', cat: 'Indoor', price: 1000, img: 'areca', light: 'medium', pet: true, care: 'moderate', water: 'Weekly', desc: 'Feathery, arching fronds that bring a tropical feel indoors. Pet-safe and a natural air freshener.' },
  { id: 'spider', name: 'Spider Plant', latin: 'Chlorophytum comosum', cat: 'Indoor', price: 300, img: 'spider', light: 'medium', pet: true, care: 'easy', water: 'Weekly', desc: 'Striped, arching leaves and baby plantlets on long stems. Very forgiving and pet-safe.' },
  { id: 'fittonia', name: 'Fittonia', latin: 'Nerve plant', cat: 'Indoor', price: 4500, img: 'fittonia', light: 'medium', pet: true, care: 'moderate', water: 'Keep lightly moist', desc: 'Colourful, finely veined leaves in a compact mound. A striking pet-safe accent for shelves and terrariums.' },
  { id: 'jade', name: 'Jade Plant', latin: 'Crassula ovata', cat: 'Succulents', price: 10000, img: 'jade', light: 'bright', pet: false, care: 'easy', water: 'Every 2 weeks', desc: 'A long-lived succulent with thick, glossy leaves and a tree-like shape. Said to bring good fortune.' },
  { id: 'bougainvillea', name: 'Bougainvillea', latin: 'Paper flower', cat: 'Outdoor', price: 2000, img: 'bougainvillea', light: 'bright', pet: false, care: 'easy', water: 'Twice weekly', desc: 'Waves of papery magenta blooms for walls, gates and terraces. Loves heat and full sun.' },
  { id: 'adenium', name: 'Adenium Obesum', latin: 'Desert rose', cat: 'Succulents', price: 3000, img: 'adenium', light: 'bright', pet: false, care: 'moderate', water: 'Every 10\u201314 days', desc: 'A sculptural swollen trunk topped with bright trumpet flowers. Needs sun, heat and well-drained soil.' },
  { id: 'cactus', name: 'Cactus', latin: 'Potted desert cactus', cat: 'Succulents', price: 500, img: 'cactus', light: 'bright', pet: false, care: 'easy', water: 'Monthly', desc: 'A low-maintenance desert beauty in a terracotta pot. Loves full sun and a little neglect.' },
  { id: 'hibiscus', name: 'Hibiscus', latin: 'Hibiscus rosa-sinensis', cat: 'Outdoor', price: 400, img: 'hibiscus', light: 'bright', pet: false, care: 'easy', water: 'Every 2\u20133 days', desc: 'Large, showy trumpet flowers that bloom through the warm months. Easy to grow in a sunny spot.' }
];
LZ.byId = id => LZ.PRODUCTS.find(p => p.id === id);
