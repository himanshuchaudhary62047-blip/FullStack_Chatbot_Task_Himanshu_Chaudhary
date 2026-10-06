export interface BotResponse {
  answer: string;
  suggestedQuestions?: string[];
  actionTarget?: 'services' | 'courses' | 'contact';
}

export const PREDEFINED_QUESTIONS = [
  "What services does DroneTV provide?",
  "What courses / training are available?",
  "How can I contact DroneTV?",
  "How can I register?",
  "I am interested in a service.",
  "I am a student.",
  "I want to speak with someone.",
];

export const INITIAL_BOT_MESSAGE = {
  text: "Hello! Welcome to DroneTV AI Support & Lead Assistant. How can I assist you today? You can pick one of the options below or ask a question.",
  suggestedQuestions: PREDEFINED_QUESTIONS,
};

export function getBotResponse(userQuestion: string): BotResponse {
  const query = userQuestion.toLowerCase().trim();

  // 1. Services inquiry
  if (query.includes("service") || query.includes("what services") || query.includes("drone tv provide")) {
    return {
      answer: "DroneTV provides aerial survey & mapping, industrial inspection, precision agricultural drone monitoring, and custom cinematography solutions. Scroll down to our Services section to explore details!",
      suggestedQuestions: [
        "What courses / training are available?",
        "I am interested in a service.",
        "How can I contact DroneTV?"
      ],
      actionTarget: 'services'
    };
  }

  // 2. Courses & Training inquiry
  if (query.includes("course") || query.includes("training") || query.includes("learn") || query.includes("pilot")) {
    return {
      answer: "DroneTV offers DGCA-certified Commercial Drone Pilot Training, Aerial Mapping & Data Analytics, and FPV Drone Photography Masterclasses for beginners and professionals.",
      suggestedQuestions: [
        "I am a student.",
        "How can I register?",
        "How can I contact DroneTV?"
      ],
      actionTarget: 'courses'
    };
  }

  // 3. Contact inquiry
  if (query.includes("contact") || query.includes("reach") || query.includes("location") || query.includes("phone") || query.includes("email")) {
    return {
      answer: "You can reach out to us via our Contact/Enquiry Form below, email us at support@dronetv.ai, or call our hotline at +91 (800) 555-DRONE.",
      suggestedQuestions: [
        "I want to speak with someone.",
        "How can I register?",
        "What services does DroneTV provide?"
      ],
      actionTarget: 'contact'
    };
  }

  // 4. Registration inquiry
  if (query.includes("register") || query.includes("sign up") || query.includes("enroll") || query.includes("join")) {
    return {
      answer: "To register for a course or service, simply scroll down to our Contact / Enquiry form, select your user type (Student or Customer), choose your interest, and submit your details!",
      suggestedQuestions: [
        "What courses / training are available?",
        "I am a student.",
        "I am interested in a service."
      ],
      actionTarget: 'contact'
    };
  }

  // 5. Service interest
  if (query.includes("interested in a service") || query.includes("hire drone") || query.includes("service inquiry")) {
    return {
      answer: "Awesome! Whether you need aerial survey, crop monitoring, or industrial inspection, please submit an enquiry through our form below and our team will get back to you within 24 hours.",
      suggestedQuestions: [
        "What services does DroneTV provide?",
        "I want to speak with someone.",
        "How can I contact DroneTV?"
      ],
      actionTarget: 'contact'
    };
  }

  // 6. Student inquiry
  if (query.includes("student") || query.includes("college") || query.includes("discount") || query.includes("certification")) {
    return {
      answer: "We welcome students! DroneTV offers special student discounts on DGCA certified drone training and hands-on workshops. Check out our Courses section or fill out the enquiry form selecting 'Student'.",
      suggestedQuestions: [
        "What courses / training are available?",
        "How can I register?",
        "How can I contact DroneTV?"
      ],
      actionTarget: 'courses'
    };
  }

  // 7. Speak with someone / Human rep
  if (query.includes("speak with someone") || query.includes("human") || query.includes("talk") || query.includes("call me") || query.includes("representative")) {
    return {
      answer: "Our support specialists are ready to help! Please fill in your name, phone number, and message in the Enquiry Form below so our representative can contact you directly.",
      suggestedQuestions: [
        "How can I contact DroneTV?",
        "I am interested in a service.",
        "What services does DroneTV provide?"
      ],
      actionTarget: 'contact'
    };
  }

  // Fallback response for unknown questions
  return {
    answer: "I'm sorry, I didn't quite understand that question. You can choose from the quick questions below or fill out our Enquiry Form to get in touch with our team directly.",
    suggestedQuestions: PREDEFINED_QUESTIONS,
  };
}
