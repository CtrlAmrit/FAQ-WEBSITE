export const faqData = {
    categories: [
        {
            id: 'general',
            title: 'General',
            description: 'Common questions about our services and general information.',
            icon: '🔍'
        },
        {
            id: 'events',
            title: 'Events',
            description: 'Information about upcoming events, registrations, and schedules.',
            icon: '📅'
        },
        {
            id: 'membership',
            title: 'Membership',
            description: 'Everything you need to know about joining and benefits.',
            icon: '💎'
        },
        {
            id: 'technical',
            title: 'Technical',
            description: 'Troubleshooting, platform usage, and technical support.',
            icon: '🛠️'
        }
    ],
    questions: {
        general: [
            {
                id: 'g1',
                question: 'What is this service?',
                answer: 'Our service provides a comprehensive platform for managing your FAQ content efficiently and beautifully.'
            },
            {
                id: 'g2',
                question: 'How do I get started?',
                answer: 'Simply browse the categories on the home page and click on any topic to see the related questions.'
            }
        ],
        events: [
            {
                id: 'e1',
                question: 'How do I register for an event?',
                answer: 'You can register through the events page by selecting the specific event and filling out the registration form.'
            },
            {
                id: 'e2',
                question: 'Are events recorded?',
                answer: 'Most of our virtual events are recorded and made available to members within 48 hours.'
            }
        ],
        membership: [
            {
                id: 'm1',
                question: 'What are the membership tiers?',
                answer: 'We offer Basic, Pro, and Enterprise tiers to suit different needs and scales.'
            },
            {
                id: 'm2',
                question: 'How can I cancel my membership?',
                answer: 'You can cancel your membership at any time through your account settings.'
            }
        ],
        technical: [
            {
                id: 't1',
                question: 'Is there an API available?',
                answer: 'Yes, we provide a robust REST API for developers to integrate our services into their own applications.'
            },
            {
                id: 't2',
                question: 'What browsers are supported?',
                answer: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge.'
            }
        ]
    }
} as const;

export type CategoryId = keyof typeof faqData.questions;
