import { ServiceCategory } from '../types';

export const servicesData: ServiceCategory[] = [
  {
    id: 'electrician',
    name: 'Electrician',
    hindiName: 'इलेक्ट्रीशियन',
    marathiName: 'इलेक्ट्रिशियन',
    iconName: 'Zap',
    description: 'Certified wiring, short circuit fixes, switchboard installs, inverter setup & safety checks.',
    hindiDescription: 'प्रमाणित वायरिंग, शॉर्ट सर्किट समाधान, स्विचबोर्ड स्थापना एवं इनवर्टर सेटअप।',
    marathiDescription: 'प्रमाणित वायरिंग, शॉर्ट सर्किट दुरुस्ती, स्विचबोर्ड इन्स्टॉलेशन आणि इन्व्हर्टर सेटअप.',
    minPrice: 199,
    turnaround: '30–45 mins',
    popularTag: 'Most Booked',
    guarantee: '30-Day Cooperative Warranty',
    activeWorkers: 3420,
    subServices: [
      { id: 'el-1', name: 'Switchboard & Socket Repair', basePrice: 199, timeEst: '30 mins' },
      { id: 'el-2', name: 'Ceiling Fan Installation & Repair', basePrice: 249, timeEst: '45 mins' },
      { id: 'el-3', name: 'MCB / Fuse Box Tripping Fix', basePrice: 349, timeEst: '45 mins' },
      { id: 'el-4', name: 'Inverter & Battery Wiring', basePrice: 599, timeEst: '60 mins' },
      { id: 'el-5', name: 'Full House Electrical Inspection', basePrice: 799, timeEst: '90 mins' }
    ]
  },
  {
    id: 'plumber',
    name: 'Plumber',
    hindiName: 'प्लंबर (नलसाज)',
    marathiName: 'प्लंबर (नळ कारागीर)',
    iconName: 'Droplet',
    description: 'Expert leak repairs, pipe fitting, sanitary fixture installs, geyser and water tank maintenance.',
    hindiDescription: 'नल लीकेज मरम्मत, पाइप फिटिंग, सैनिटरी फिटिंग एवं वाटर टैंक रखरखाव।',
    marathiDescription: 'नळ गळती दुरुस्ती, पाईप फिटिंग, सॅनिटरी फिटिंग्ज आणि वॉटर टँक देखभाल.',
    minPrice: 199,
    turnaround: '30–45 mins',
    popularTag: 'High Demand',
    guarantee: '30-Day Cooperative Warranty',
    activeWorkers: 2890,
    subServices: [
      { id: 'pl-1', name: 'Tap / Mixer Repair & Replacement', basePrice: 199, timeEst: '30 mins' },
      { id: 'pl-2', name: 'Drainage & Pipe Blockage Clearing', basePrice: 299, timeEst: '40 mins' },
      { id: 'pl-3', name: 'Toilet / Commode Fitting & Repair', basePrice: 449, timeEst: '60 mins' },
      { id: 'pl-4', name: 'Overhead Water Tank Cleaning', basePrice: 749, timeEst: '90 mins' },
      { id: 'pl-5', name: 'Geyser Pipeline Connection Fix', basePrice: 399, timeEst: '45 mins' }
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning & Sanitization',
    hindiName: 'सफाई एवं स्वच्छता',
    marathiName: 'स्वच्छता आणि सॅनिटायझेशन',
    iconName: 'Sparkles',
    description: 'Thorough deep home cleaning, kitchen degreasing, bathroom disinfection and sofa sanitization.',
    hindiDescription: 'संपूर्ण घर की गहरी सफाई, किचन डीग्रीजिंग, बाथरूम एवं सोफा सैनिटाइजेशन।',
    marathiDescription: 'घराची सखोल स्वच्छता, किचन डीग्रीजिंग, बाथरूम आणि सोफा सॅनिटायझेशन.',
    minPrice: 499,
    turnaround: 'Flexible Slots',
    popularTag: 'Weekend Favorite',
    guarantee: '100% Satisfaction Re-clean Guarantee',
    activeWorkers: 3950,
    subServices: [
      { id: 'cl-1', name: 'Full Deep Home Cleaning (1–3 BHK)', basePrice: 1499, timeEst: '3–5 hours' },
      { id: 'cl-2', name: 'Intense Bathroom Descaling (2 Baths)', basePrice: 599, timeEst: '60 mins' },
      { id: 'cl-3', name: 'Kitchen Chimney & Counter Degreasing', basePrice: 699, timeEst: '90 mins' },
      { id: 'cl-4', name: 'Fabric Sofa & Carpet Shampooing', basePrice: 649, timeEst: '60 mins' },
      { id: 'cl-5', name: 'Balcony & Floor Scrubbing Machine Clean', basePrice: 499, timeEst: '45 mins' }
    ]
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    hindiName: 'बढ़ई (कारपेंटर)',
    marathiName: 'सुतार (कारपेंटर)',
    iconName: 'Hammer',
    description: 'Custom furniture repair, lock replacements, modular woodwork fixes, and wardrobe hinge repairs.',
    hindiDescription: 'फर्नीचर मरम्मत, दरवाजा लॉक बदलना, मॉड्यूलर वुडवर्क एवं अलमारी हिंज दुरुस्ती।',
    marathiDescription: 'फर्निचर दुरुस्ती, दरवाजा लॉक बदलणे, मॉड्युलर वूडवर्क आणि कपाट बिजागऱ्या दुरुस्ती.',
    minPrice: 249,
    turnaround: '45–60 mins',
    popularTag: 'Master Craftsmen',
    guarantee: 'Cooperative Quality Inspected',
    activeWorkers: 1840,
    subServices: [
      { id: 'cp-1', name: 'Door Lock / Handle Repair & Fitting', basePrice: 249, timeEst: '40 mins' },
      { id: 'cp-2', name: 'Wardrobe & Drawer Channel Fix', basePrice: 349, timeEst: '45 mins' },
      { id: 'cp-3', name: 'Bed / Table Wooden Repair & Polish', basePrice: 499, timeEst: '60 mins' },
      { id: 'cp-4', name: 'Custom Shelving & Wall Mounting', basePrice: 399, timeEst: '45 mins' },
      { id: 'cp-5', name: 'Modular Kitchen Cabinet Alignment', basePrice: 599, timeEst: '75 mins' }
    ]
  },
  {
    id: 'painting',
    name: 'Painting & Waterproofing',
    hindiName: 'पेंटिंग एवं वॉटरप्रूफिंग',
    marathiName: 'रंगकाम आणि वॉटरप्रूफिंग',
    iconName: 'Paintbrush',
    description: 'Interior & exterior painting, dampness treatment, wall crack filling, and stencil accent walls.',
    hindiDescription: 'आंतरिक व बाह्य पेंटिंग, सीलन (वॉटरप्रूफिंग) उपचार, दरार भराई एवं वॉल फिनिशिंग।',
    marathiDescription: 'घराचे रंगकाम, ओल प्रतिबंधक (वॉटरप्रूफिंग) उपचार, भिंतींच्या भेगा भरणे व डिझाइन.',
    minPrice: 899,
    turnaround: 'Free Site Inspection',
    popularTag: 'Eco Friendly Paint',
    guarantee: '1-Year Cooperative Weather Warranty',
    activeWorkers: 1220,
    subServices: [
      { id: 'pt-1', name: 'Single Room Fresh Wall Coat', basePrice: 899, timeEst: '1 day' },
      { id: 'pt-2', name: 'Wall Seepage & Waterproofing Treatment', basePrice: 1199, timeEst: '1 day' },
      { id: 'pt-3', name: 'Full Home Painting (Consultation + Labor)', basePrice: 3499, timeEst: '2–4 days' },
      { id: 'pt-4', name: 'Wood Polish & Door Enamel Finishing', basePrice: 799, timeEst: '5 hours' }
    ]
  },
  {
    id: 'appliances',
    name: 'Appliance Repair',
    hindiName: 'उपकरण मरम्मत (अप्लायंसेज)',
    marathiName: 'घरगुती उपकरणे दुरुस्ती',
    iconName: 'Wrench',
    description: 'Expert diagnostics for AC, refrigerator, washing machine, microwave, and water purifier.',
    hindiDescription: 'एसी, फ्रिज, वाशिंग मशीन, माइक्रोवेव एवं आरओ वाटर प्यूरीफायर की कुशल मरम्मत।',
    marathiDescription: 'एसी, फ्रिज, वॉशिंग मशीन, मायक्रोवेव्ह आणि आरओ वॉटर प्युरिफायरची तज्ज्ञ दुरुस्ती.',
    minPrice: 299,
    turnaround: '45–60 mins',
    popularTag: 'Transparent Spares',
    guarantee: '60-Day Spare Parts Guarantee',
    activeWorkers: 2110,
    subServices: [
      { id: 'ap-1', name: 'AC Deep Foam Jet Service & Gas Check', basePrice: 499, timeEst: '60 mins' },
      { id: 'ap-2', name: 'Refrigerator Cooling & Compressor Diagnostics', basePrice: 349, timeEst: '45 mins' },
      { id: 'ap-3', name: 'Washing Machine Drum & Motor Repair', basePrice: 399, timeEst: '60 mins' },
      { id: 'ap-4', name: 'RO Water Purifier Filter & Membrane Change', basePrice: 299, timeEst: '45 mins' },
      { id: 'ap-5', name: 'Microwave Heating Element Repair', basePrice: 349, timeEst: '40 mins' }
    ]
  },
  {
    id: 'other',
    name: 'Other Skilled Services',
    hindiName: 'अन्य कुशल सेवाएँ',
    marathiName: 'इतर कुशल सेवा',
    iconName: 'LayoutGrid',
    description: 'Pest control, masonry, metal welding, CCTV surveillance setup, and solar panel rooftop cleaning.',
    hindiDescription: 'कीट नियंत्रण, राजमिस्त्री, वेल्डिंग एवं ग्रिल कार्य, सीसीटीवी कैमरा व सोलर रखरखाव।',
    marathiDescription: 'कीटक नियंत्रण, गवंडी काम, वेल्डिंग, सीसीटीव्ही कॅमेरा इन्स्टॉलेशन आणि सोलर देखभाल.',
    minPrice: 299,
    turnaround: 'Same Day Available',
    popularTag: 'Community Network',
    guarantee: 'Verified Cooperative Skill Assured',
    activeWorkers: 1530,
    subServices: [
      { id: 'ot-1', name: 'Eco Pest Control (Cockroach & Termite)', basePrice: 599, timeEst: '60 mins' },
      { id: 'ot-2', name: 'Masonry & Tile Repair / Grouting', basePrice: 499, timeEst: '90 mins' },
      { id: 'ot-3', name: 'Gate / Window Grill Welding & Fix', basePrice: 399, timeEst: '60 mins' },
      { id: 'ot-4', name: 'CCTV Camera Setup & Router Config', basePrice: 699, timeEst: '90 mins' },
      { id: 'ot-5', name: 'Rooftop Solar Panel Cleaning & Output Test', basePrice: 449, timeEst: '45 mins' }
    ]
  }
];
