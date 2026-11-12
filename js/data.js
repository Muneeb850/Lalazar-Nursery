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

LZ.U = (key, w) => `https://images.unsplash.com/photo-${LZ.PHOTO[key]}?auto=format&fit=crop&q=75&w=${w || 900}`;
LZ.SRCSET = key => [480, 800, 1200, 1800, 2400].map(w => `${LZ.U(key, w)} ${w}w`).join(', ');

LZ.fmt = n => 'Rs ' + n.toLocaleString('en-PK');

/* light: low|medium|bright   pet: true = pet-safe   care: easy|moderate|expert */
LZ.PRODUCTS = [
  { id: 'monstera', name: 'Monstera Deliciosa', latin: 'Swiss cheese plant', cat: 'Indoor', price: 2800, img: 'monstera', light: 'medium', pet: false, care: 'easy', water: 'Weekly', desc: 'Iconic split leaves that grow bolder every season. A living statement for any bright corner.' },
  { id: 'peace', name: 'Peace Lily', latin: 'Spathiphyllum', cat: 'Flowering', price: 1800, img: 'peace', light: 'low', pet: false, care: 'easy', water: 'When leaves droop', desc: 'Glossy dark foliage and elegant white blooms. Thrives where other plants sulk.' },
  { id: 'rubber', name: 'Rubber Plant', latin: 'Ficus elastica', cat: 'Indoor', price: 2200, img: 'rubber', light: 'bright', pet: false, care: 'easy', water: 'Every 10 days', desc: 'Thick, polished leaves on a sculptural stem. Tough, tall and effortlessly modern.' },
  { id: 'fiddle', name: 'Fiddle Leaf Fig', latin: 'Ficus lyrata', cat: 'Indoor', price: 4500, img: 'fiddle', light: 'bright', pet: false, care: 'moderate', water: 'Weekly', desc: 'The designer favourite. Big violin-shaped leaves that reward bright light and a steady routine.' },
  { id: 'pothos', name: 'Golden Pothos', latin: 'Epipremnum aureum', cat: 'Indoor', price: 900, img: 'pothos', light: 'low', pet: false, care: 'easy', water: 'Every 10 days', desc: 'Trailing, forgiving and fast. Hang it, shelve it, let it cascade.' },
  { id: 'calathea', name: 'Calathea Orbifolia', latin: 'Goeppertia orbifolia', cat: 'Indoor', price: 2600, img: 'calathea', light: 'medium', pet: true, care: 'moderate', water: 'Keep lightly moist', desc: 'Painted, striped leaves that fold with the day. Pet-safe and quietly dramatic.' },
  { id: 'haworthia', name: 'Zebra Haworthia', latin: 'Haworthiopsis', cat: 'Succulents', price: 700, img: 'haworthia', light: 'bright', pet: true, care: 'easy', water: 'Every 2 weeks', desc: 'Tiny architectural rosettes in a mint pot. Perfect for desks and sills.' },
  { id: 'aloe', name: 'Aloe Vera', latin: 'Aloe barbadensis', cat: 'Succulents', price: 800, img: 'aloe', light: 'bright', pet: false, care: 'easy', water: 'Every 2 weeks', desc: 'Sun-loving, soothing and nearly indestructible. A kitchen-window classic.' },
  { id: 'cactus', name: 'Blue Columnar Cactus', latin: 'Pilosocereus', cat: 'Succulents', price: 650, img: 'cactus', light: 'bright', pet: false, care: 'easy', water: 'Monthly', desc: 'A powder-blue desert column in a terracotta pot. Loves neglect and full sun.' },
  { id: 'echeveria', name: 'Echeveria Rosette', latin: 'Echeveria elegans', cat: 'Succulents', price: 500, img: 'echeveria', light: 'bright', pet: true, care: 'easy', water: 'Every 2 weeks', desc: 'Sculpted jade-teal rosettes. Pet-safe, collectible, and endlessly photogenic.' },
  { id: 'bonsai', name: 'Ficus Ginseng Bonsai', latin: 'Ficus microcarpa', cat: 'Outdoor', price: 3800, img: 'bonsai', light: 'bright', pet: true, care: 'moderate', water: 'Every 5 days', desc: 'A twisted trunk and tiny glossy leaves. Living art for a patient hand.' },
  { id: 'topiary', name: 'Boxwood Topiary', latin: 'Buxus sempervirens', cat: 'Outdoor', price: 3200, img: 'topiary', light: 'bright', pet: true, care: 'moderate', water: 'Twice weekly', desc: 'A sculpted green sphere on a slim stem. Frames entrances with formal calm.' },
  { id: 'eucalyptus', name: 'Eucalyptus Cutting', latin: 'Eucalyptus cinerea', cat: 'Outdoor', price: 1500, img: 'eucalyptus', light: 'bright', pet: false, care: 'moderate', water: 'Weekly', desc: 'Silver-blue, coin-shaped leaves with a fresh, clean scent. Fast growing outdoors.' },
  { id: 'sunflower', name: 'Sunflower Seedlings', latin: 'Helianthus annuus', cat: 'Flowering', price: 600, img: 'sunflower', light: 'bright', pet: true, care: 'easy', water: 'Every 3 days', desc: 'A tray of young sunflowers ready to plant out. Instant summer.' },
  { id: 'starter', name: 'Seed Starter Pot Kit', latin: '12 pots + premium soil', cat: 'Supplies', price: 450, img: 'pots', light: 'medium', pet: true, care: 'easy', water: 'Mist daily', desc: 'Everything to begin: twelve pots, seed-starting mix and plant tags.' },
  { id: 'tools', name: 'Gardener’s Tool Set', latin: 'Trowel, shears, scoop', cat: 'Supplies', price: 2400, img: 'tools', light: 'medium', pet: true, care: 'easy', water: '—', desc: 'A compact, sturdy hand-tool set for potting, pruning and propagating.' }
];
LZ.byId = id => LZ.PRODUCTS.find(p => p.id === id);
