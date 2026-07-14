/** Editorial Discipline: canonical content is transcribed from the supplied build brief only; do not paraphrase visible copy. */
export const navigation = [
  { label: "About", href: "/about" },
  { label: "Private Coaching", href: "/private-coaching" },
  { label: "Corporate", href: "/corporate" },
  { label: "Kids", href: "/kids" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  { index: "01", title: "Private Coaching", href: "/private-coaching" },
  { index: "02", title: "Corporate Programmes", href: "/corporate" },
  { index: "03", title: "Kids Coaching", href: "/kids" },
  { index: "04", title: "Seminars", href: "/contact" },
] as const;

export const credentials = [
  "3rd Degree Roger Gracie Black Belt",
  "Head Coach at Roger Gracie Euston",
  "3× IBJJF European Champion",
  "4× British Champion",
] as const;

export type Testimonial = {
  name: string;
  title: string;
  paragraphs: readonly string[];
  excerpt: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    name: "Dean Steele",
    title: "Founder & Chairman, Steele & Rose",
    excerpt: "He has become a trusted partner to our business. We value his integrity, commitment and ability to adapt his coaching to different audiences.",
    paragraphs: [
      "Henrique Junior has worked with us for a number of years; during that time, he has delivered exceptional Brazilian Jiu-Jitsu training for our business staff directly and our clients through community-based programmes.",
      "His work has included both personal coaching and group seminars; in every setting, Henrique has brought professionalism, energy, expertise and a clear focus on performance improvement. His training is particularly well suited to business executives; it supports flexible working hours and improves mobility, strength, focus, resilience and overall physical capability.",
      "What makes Henrique's approach so valuable is the way he connects physical training with mental performance. His sessions help people manage stress, build confidence, stay calm under pressure and develop greater discipline. The benefits extend well beyond the mats; participants leave feeling sharper, stronger, more balanced and better equipped to deal with the demands of high-performance business environments.",
      "Henrique has also worked with our clients, consistently delivering engaging, accessible and memorable sessions that combine practical Brazilian Jiu-Jitsu principles with wider lessons around wellbeing, mindset and personal resilience.",
      "He has become a trusted partner to our business. We value his integrity, commitment and ability to adapt his coaching to different audiences. We would highly recommend Henrique Junior to any organisation looking to invest in the health, wellbeing, resilience and performance of its people.",
    ],
  },
  {
    name: "Stephen O'Shea",
    title: "Founder, KAOS Capital",
    excerpt: "He is a great martial artist, but more importantly, he possesses the even rarer quality of being an exceptional teacher.",
    paragraphs: [
      "I have known Professor Juniao for over eight years.",
      "He is a great martial artist, but more importantly, he possesses the even rarer quality of being an exceptional teacher.",
      "Professor Juniao has an incredible ability to take complex theory and make Brazilian Jiu-Jitsu understandable and enjoyable for students at every level.",
      "His technical skill, sense of humour and leadership inspire everyone fortunate enough to train with him. Any training room is better and more energetic with Professor Henrique Jr. in it.",
    ],
  },
  {
    name: "Bijan Dhanani",
    title: "Property Developer",
    excerpt: "He pushes you when you need to be challenged, encourages you when your confidence is low and always expects the best from you.",
    paragraphs: [
      "When I first walked onto the mats at 18, I wasn't particularly strong and I certainly wasn't confident in any kind of physical confrontation. Looking back now, starting Brazilian Jiu-Jitsu was one of the best decisions I've ever made.",
      "Jiu-Jitsu has given me so much more than the ability to defend myself. It's built my confidence, made me stronger, more athletic and more resilient. It has taught me how to stay calm under pressure. Along the way, I've made lifelong friends and become part of a community that has genuinely shaped who I am.",
      "A huge part of that journey has been Professor Juniao. He has an incredible ability to know exactly what each student needs. He pushes you when you need to be challenged, encourages you when your confidence is low and always expects the best from you because he genuinely believes you're capable of it. He's demanding in all the right ways while remaining supportive, patient and invested in your progress.",
      "Years later, as a black belt, I can honestly say Brazilian Jiu-Jitsu has had a profound impact on my life, and Professor Juniao has been central to that journey. I'm incredibly grateful for everything he's taught me, both on and off the mats.",
      "If you're considering starting Brazilian Jiu-Jitsu, you couldn't ask for a better coach or a better place to begin.",
    ],
  },
  {
    name: "Mark Nuttall",
    title: "Partner, Linklaters LLP",
    excerpt: "I started because I wanted to get fitter. I didn't expect it to become such an important part of my week.",
    paragraphs: [
      "As a corporate lawyer, I spend most of my week in meetings, on calls and behind a screen. An hour on the mats is the complete opposite. It's one of the few times I completely switch off because you simply can't think about work when someone is trying to choke you.",
      "The private sessions are hard work—but that's exactly why I keep coming back. I always leave exhausted, stronger, fitter and in a much better frame of mind than when I arrived.",
      "What I appreciate most is the way the club is run. The coaching is first class, challenging without ever feeling unsafe, and there's a genuinely friendly atmosphere. Everyone is welcoming, there's no ego and it's a great community to be part of.",
      "I started because I wanted to get fitter. I didn't expect it to become such an important part of my week.",
      "I can't recommend the club highly enough.",
    ],
  },
  {
    name: "Vince Sammon",
    title: "Founder & CEO, Sammon Mortgages",
    excerpt: "Professor Juniao's coaching is what makes the place. Training is always challenging but enjoyable.",
    paragraphs: [
      "Joining the Roger Gracie Academy four years ago turned out to be one of the best decisions I've made.",
      "Professor Juniao's coaching is what makes the place. Training is always challenging but enjoyable. He's technical, patient and knows exactly how to push you to achieve your best.",
      "Over the years I've combined group classes with private coaching, and four years later I'm still discovering new layers to the fundamentals he showed me on day one.",
      "He has created an outstanding environment to learn and train with a great team.",
    ],
  },
  {
    name: "Alain Nsiona Defise",
    title: "Founder & Chairman, Defise Foundation",
    excerpt: "Every session is different, whether one-to-one or in a group class, yet we continue building on the same fundamental principles.",
    paragraphs: [
      "I keep telling all my friends to try a Brazilian Jiu-Jitsu class at Roger Gracie Euston because I simply love it.",
      "Brazilian Jiu-Jitsu combines technique, fitness and a real sense of purpose and perseverance. Every session is different, whether one-to-one or in a group class, yet we continue building on the same fundamental principles.",
      "What I appreciate most is the authentic, welcoming Brazilian atmosphere. Everyone is ambitious and eager to improve while maintaining a genuine family spirit inspired by Professor Juniao. Our community supports one another both on and off the mats.",
      "I've been training with Professor Juniao for over two years, and becoming a blue belt has been one of the most rewarding journeys I've undertaken. This has become my favourite escape from daily stress.",
      "They say a black belt is simply a white belt who never gave up.",
      "I have no intention of giving up, and I encourage anyone considering Brazilian Jiu-Jitsu to begin their own journey.",
      "Oss!",
    ],
  },
] as const;
