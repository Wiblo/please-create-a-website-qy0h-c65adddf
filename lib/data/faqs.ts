export interface FaqItem {
  id: string
  question: string
  answer: string
}

/**
 * Frequently Asked Questions
 * Update this array to modify FAQs shown on the site
 */
export const faqs: FaqItem[] = [
  {
    id: 'first-visit',
    question: 'What should I expect on my first visit?',
    answer:
      "Your initial consultation includes a thorough history taking and physical examination to determine if chiropractic care is suitable for you. We'll discuss your health goals and create a personalized treatment plan. The first visit typically lasts 45 minutes to ensure we understand your needs completely. Follow-up appointments are 30 minutes.",
  },
  {
    id: 'medical-aid',
    question: 'Do you accept medical aid?',
    answer:
      'Yes, we process medical aid claims on your behalf. We work with most major medical aids in South Africa. You settle your bill after your session and then we will submit the claim to your medical aid.',
  },
  {
    id: 'painful',
    question: 'Is chiropractic treatment painful?',
    answer:
      "Chiropractic adjustments are generally not painful. You may feel slight pressure or hear a popping sound, but the treatment is designed to relieve pain, not cause it. We adapt techniques to each patient's comfort level and always communicate throughout the treatment to ensure you're comfortable.",
  },
  {
    id: 'sessions',
    question: 'How many sessions will I need?',
    answer:
      "The number of sessions varies depending on your condition, its severity, and your health goals. After your initial assessment, we'll provide a treatment plan with an estimated timeline. Most patients see improvement within 2-4 sessions, though chronic conditions may require ongoing care.",
  },
  {
    id: 'pregnancy',
    question: 'Is chiropractic care safe during pregnancy?',
    answer:
      'Yes, chiropractic care is safe and beneficial during pregnancy. We use specialized techniques designed for pregnant women to help manage pain and ensure proper pelvic alignment for easier delivery. Many women find relief from pregnancy-related back pain through gentle chiropractic care.',
  },
  {
    id: 'children',
    question: 'Can children receive chiropractic treatment?',
    answer:
      'Absolutely! Children can benefit greatly from chiropractic care. We use gentle, age-appropriate techniques to address issues like colic, growing pains, sports injuries, and posture problems. Pediatric chiropractic care supports healthy development and can prevent future problems.',
  },
  {
    id: 'appointment',
    question: 'How do I book an appointment?',
    answer:
      'You can book an appointment through our online booking system at Sticks and Stones Wellness Hub, call us at 082 940 7129, or email kamilahjordaan@gmail.com. We offer flexible scheduling with appointments available 6 days a week to accommodate your busy lifestyle.',
  },
  {
    id: 'what-to-wear',
    question: 'What should I wear to my appointment?',
    answer:
      'Wear comfortable, loose-fitting clothing that allows for movement. Avoid wearing dresses or skirts if possible, as you may need to perform certain movements during the examination.',
  },
]

/**
 * Get all FAQs
 */
export function getAllFaqs(): FaqItem[] {
  return faqs
}

/**
 * Get a single FAQ by ID
 */
export function getFaqById(id: string): FaqItem | undefined {
  return faqs.find((faq) => faq.id === id)
}
