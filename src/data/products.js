export const PRODUCTS = [
  {
    id: 'glow-veil-foundation',
    name: 'Glow Veil Foundation',
    nameJa: 'グロウヴェール ファンデーション',
    price: 4200,
    priceFormatted: '¥4,200',
    tagline: '素肌が透ける、ヴェール仕立て',
    description:
      'まるで素肌そのものが発光しているかのような、透明感あふれる仕上がり。スキンケア発想の軽やかなテクスチャーが、毛穴や色ムラを自然にカバーしながら、一日中うるおいを保ちます。',
    features: [
      'SPF30 PA++',
      '24時間保湿',
      'ブルーライトカット',
      '石鹸オフ',
    ],
    shades: [
      { id: 'porcelain', name: 'Porcelain', nameJa: 'ポーセリン', hex: '#F5E6D3' },
      { id: 'vanilla', name: 'Vanilla', nameJa: 'バニラ', hex: '#F0D5B8' },
      { id: 'sand', name: 'Sand', nameJa: 'サンド', hex: '#DFC0A0' },
      { id: 'honey', name: 'Honey', nameJa: 'ハニー', hex: '#C9A882' },
    ],
    category: 'foundation',
    badge: 'BEST SELLER',
    image: './images/product-foundation.png',
  },
  {
    id: 'water-bloom-lip',
    name: 'Water Bloom Lip',
    nameJa: 'ウォーターブルーム リップ',
    price: 2800,
    priceFormatted: '¥2,800',
    tagline: '唇に咲く、水彩の一滴',
    description:
      '水のように軽く、花のように色づく。独自のウォーターブルーム処方が、唇の内側からにじみ出るような自然な血色感を演出。ベタつかず、うるおいが長時間続きます。',
    features: [
      'ティント処方',
      'ヒアルロン酸配合',
      'グロス不要の艶感',
      '飲食後も色持ち',
    ],
    shades: [
      { id: 'petal', name: 'Petal Pink', nameJa: 'ペタルピンク', hex: '#E8A0A0' },
      { id: 'coral', name: 'Coral Dream', nameJa: 'コーラルドリーム', hex: '#E8967A' },
      { id: 'rose', name: 'Dusty Rose', nameJa: 'ダスティローズ', hex: '#C48B91' },
      { id: 'berry', name: 'Berry Mist', nameJa: 'ベリーミスト', hex: '#B07080' },
    ],
    category: 'lip',
    badge: 'NEW',
    image: './images/product-lip.png',
  },
];
