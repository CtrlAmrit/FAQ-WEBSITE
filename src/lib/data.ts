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
            },
            {
                id: 'g3',
                question: 'What are your operating hours?',
                answer: 'Our support team is available Monday through Friday, 9:00 AM to 6:00 PM EST.'
            },
            {
                id: 'g4',
                question: 'Where can I find your office?',
                answer: 'We are primarily a remote-first company, but our main campus is located at SRM Kattankulathur.'
            },
            {
                id: 'g5',
                question: 'Do you offer a satisfaction guarantee?',
                answer: 'Yes, we offer a 30-day money-back guarantee if you are not completely satisfied with our service.'
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
            },
            {
                id: 'e3',
                question: 'Can I bring a guest to in-person events?',
                answer: 'Yes, most in-person events allow for one guest per member, though some specific events may require a guest ticket.'
            },
            {
                id: 'e4',
                question: 'What is your event cancellation policy?',
                answer: 'You can cancel your event registration up to 24 hours before the start time for a full refund.'
            },
            {
                id: 'e5',
                question: 'Where can I find the full event schedule?',
                answer: 'The complete calendar of upcoming events is available on our dedicated Events page.'
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
            },
            {
                id: 'm3',
                question: 'How do I upgrade my plan?',
                answer: 'You can upgrade your membership at any time from your dashboard under the Billing section.'
            },
            {
                id: 'm4',
                question: 'Is there a discount for annual billing?',
                answer: 'Yes, choosing annual billing over monthly billing saves you approximately 20% per year.'
            },
            {
                id: 'm5',
                question: 'Can I share my membership with my team?',
                answer: 'Our Enterprise plan supports multiple users and team collaboration features.'
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
            },
            {
                id: 't3',
                question: 'How do I reset my password?',
                answer: 'Click the "Forgot Password" link on the login page and follow the instructions sent to your email.'
            },
            {
                id: 't4',
                question: 'Do you support Two-Factor Authentication (2FA)?',
                answer: 'Yes, we strongly recommend enabling 2FA in your security settings for enhanced account protection.'
            },
            {
                id: 't5',
                question: 'How often is data backed up?',
                answer: 'We perform automated daily backups of all user data to ensure maximum reliability and recovery options.'
            }
        ]
    }
} as const;

export type CategoryId = keyof typeof faqData.questions;
