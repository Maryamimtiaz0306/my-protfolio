// All site content lives here. Later weeks can replace these arrays with API calls.

const services = [
  { id: "electrician", name: "Electrician", icon: "⚡", blurb: "Wiring, fittings, load faults and generator hookups." },
  { id: "plumber",     name: "Plumber",     icon: "🔧", blurb: "Leaks, geysers, blocked drains and bathroom fittings." },
  { id: "cleaning",    name: "Home cleaning", icon: "🧹", blurb: "Deep cleaning, sofa washing and post-renovation cleanup." },
  { id: "ac",          name: "AC repair",   icon: "❄️", blurb: "Servicing, gas refill, installation and repairs." },
  { id: "painter",     name: "Painter",     icon: "🎨", blurb: "Interior and exterior painting with clean finishing." },
  { id: "carpenter",   name: "Carpenter",   icon: "🪚", blurb: "Wardrobes, doors, kitchen cabinets and furniture repair." }
];

const providers = [
  { id: 1, name: "Imran Siddiqui", service: "electrician", area: "F-10, Islamabad",    rating: 4.9, reviews: 212, rate: 1500, years: 12, verified: true },
  { id: 2, name: "Bilal Ahmed",    service: "plumber",     area: "G-11, Islamabad",    rating: 4.7, reviews: 148, rate: 1200, years: 8,  verified: true },
  { id: 3, name: "Sana Home Care", service: "cleaning",    area: "DHA Phase 2",        rating: 4.8, reviews: 96,  rate: 2500, years: 6,  verified: true },
  { id: 4, name: "Kamran Cooling", service: "ac",          area: "Bahria Town, Rawalpindi", rating: 4.6, reviews: 175, rate: 1800, years: 10, verified: true },
  { id: 5, name: "Rizwan Colors",  service: "painter",     area: "Satellite Town, Rawalpindi", rating: 4.5, reviews: 63, rate: 1400, years: 9, verified: false },
  { id: 6, name: "Nadeem Woodworks", service: "carpenter", area: "I-8, Islamabad",     rating: 4.8, reviews: 84,  rate: 1700, years: 15, verified: true },
  { id: 7, name: "Faisal Electric", service: "electrician", area: "Saddar, Rawalpindi", rating: 4.4, reviews: 57,  rate: 1000, years: 5,  verified: false },
  { id: 8, name: "Aqsa Cleaners",  service: "cleaning",    area: "F-7, Islamabad",     rating: 4.9, reviews: 131, rate: 2800, years: 7,  verified: true },
  { id: 9, name: "Tariq Pipes",    service: "plumber",     area: "E-11, Islamabad",    rating: 4.6, reviews: 102, rate: 1100, years: 11, verified: true }
];

const testimonials = [
  { name: "Hina Malik",   area: "F-8, Islamabad",  rating: 5, text: "The electrician arrived on time, explained the fault and fixed it in under an hour. The price matched the quote." },
  { name: "Usman Qureshi", area: "Bahria Town",    rating: 5, text: "I booked AC servicing for three rooms on a Sunday morning and it was done by lunch. Very tidy work." },
  { name: "Maryam Raza",  area: "G-13, Islamabad", rating: 4, text: "Good deep cleaning team. They missed one window track but came back the next day to finish it at no cost." }
];
