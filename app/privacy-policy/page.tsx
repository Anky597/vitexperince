export default function PrivacyPolicyPage() {
  const privacySections = [
    {
      title: "Our Commitment",
      content: "As final year VIT students, we understand the importance of data privacy. This policy reflects our commitment to transparency and protecting the student community's information."
    },
    {
      title: "Information Collection",
      content: "We collect minimal, essential information to improve our platform and user experience. This includes:",
      details: [
        "Your name and email (optional)",
        "Interview experiences and contributions",
        "Anonymous usage data",
        "Consent-based interactions"
      ]
    },
    {
      title: "Data Usage",
      content: "Your data helps us:",
      details: [
        "Enhance interview experience sharing",
        "Improve platform functionalities",
        "Maintain community standards"
      ]
    },
    {
      title: "Student-First Protection",
      content: "We implement robust security measures:",
      details: [
        "End-to-end data encryption",
        "Limited data access"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Created by VIT students, for VIT students. Your trust and data privacy are our top priorities.
          </p>
        </div>

        <div className="space-y-8">
          {privacySections.map((section, index) => (
            <div 
              key={section.title} 
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
                <span className="mr-3 text-3xl">{index + 1}.</span>
                {section.title}
              </h2>
              <p className="text-gray-300 mb-4">{section.content}</p>
              {section.details && (
                <ul className="space-y-2 text-gray-400 pl-6 list-disc">
                  {section.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Questions or Concerns?</h3>
            <p className="text-gray-300 mb-6">
              We're always open to feedback. Reach out to us at{" "}
              <a 
                href="mailto:vitexperince@gmail.com" 
                className="text-blue-400 hover:underline"
              >
                vitexperince@gmail.com
              </a>
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/contact" 
                className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

