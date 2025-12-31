/**
 * FAQ Data
 * Central storage for all categories and their questions
 */

const faqData = {
    categories: [
        {
            id: 'general',
            title: 'General',
            description: 'Common questions about our services and policies.',
            icon: '🔍'
        },
        {
            id: 'account',
            title: 'Account',
            description: 'Manage your profile, password, and security settings.',
            icon: '👤'
        },
        {
            id: 'billing',
            title: 'Billing',
            description: 'Questions about payments, invoices, and subscriptions.',
            icon: '💳'
        },
        {
            id: 'technical',
            title: 'Technical Support',
            description: 'Troubleshooting and technical assistance.',
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
        account: [
            {
                id: 'a1',
                question: 'How do I change my password?',
                answer: 'You can change your password in the settings section of your profile page after logging in.'
            },
            {
                id: 'a2',
                question: 'Can I delete my account?',
                answer: 'Yes, you can request account deletion from the security tab in your account settings.'
            }
        ],
        billing: [
            {
                id: 'b1',
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers.'
            },
            {
                id: 'b2',
                question: 'How can I download my invoices?',
                answer: 'Invoices are available for download in the billing history section of your dashboard.'
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
};

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = faqData;
}
