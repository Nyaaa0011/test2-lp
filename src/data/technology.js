export const TECH_PRODUCTS = [
  {
    id: 'foundation',
    name: 'Glow Veil Foundation',
    nameJa: 'グロウヴェール ファンデーション',
    image: './images/product-foundation.webp',
    technologies: [
      {
        id: 'skin-melt',
        title: 'Skin Melt Technology',
        titleJa: 'スキンメルトテクノロジー',
        stat: '0.1',
        unit: 'mm',
        description:
          '0.1mmの極薄ヴェールが体温で肌と一体化。つけていることを忘れる軽さで、素肌そのものが美しく見える仕上がりを実現。',
      },
      {
        id: 'aqua-bloom',
        title: 'Aqua Bloom Formula',
        titleJa: 'アクアブルーム処方',
        stat: '72',
        unit: 'h',
        description:
          '独自のウォーターカプセルが時間とともにはじけ、72時間うるおいが持続。乾燥を感じさせない、みずみずしい仕上がりをキープ。',
      },
      {
        id: 'light-diffuse',
        title: 'Light Diffusion Pearl',
        titleJa: 'ライトディフュージョンパール',
        stat: '360',
        unit: '°',
        description:
          '360°全方位から光を拡散する微細パールが、毛穴や小じわを目立たなくし、ソフトフォーカスのような透明感を演出。',
      },
    ],
  },
  {
    id: 'lip',
    name: 'Water Bloom Lip',
    nameJa: 'ウォーターブルーム リップ',
    image: './images/product-lip.webp',
    technologies: [
      {
        id: 'water-bloom-tint',
        title: 'Water Bloom Tint',
        titleJa: 'ウォーターブルームティント処方',
        stat: '8',
        unit: 'h',
        description:
          '水溶性色素が唇の角質層に浸透し、内側からにじみ出るように発色。塗り重ねで濃淡を自在に調整でき、8時間経っても自然な血色感が持続。',
      },
      {
        id: 'triple-hyaluronic',
        title: 'Triple Hyaluronic Complex',
        titleJa: 'トリプルヒアルロン酸処方',
        stat: '3',
        unit: '種',
        description:
          '異なる分子量の3種のヒアルロン酸が角層のすみずみまで浸透。唇の表面をうるおいのヴェールで包み、乾燥や縦ジワを防ぎながらプランプな仕上がりに。',
      },
      {
        id: 'color-stay-bond',
        title: 'Color Stay Bond',
        titleJa: 'カラーステイボンド技術',
        stat: '98',
        unit: '%',
        description:
          '独自のポリマーネットワークが色素を唇にしっかり定着。飲食後も98%の色残りを実現し、塗り直しの手間を最小限に抑えます。',
      },
    ],
  },
];

// Legacy export for backward compatibility
export const TECHNOLOGIES = TECH_PRODUCTS[0].technologies;
