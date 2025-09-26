import React, { useState } from 'react';
import { Shield, Mail, ExternalLink, FileText, Users, Globe } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Logo size="md" className="mb-4" />
              <h3 className="text-lg font-semibold">Geeks & Nerds</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The premier social platform connecting tech professionals, developers, 
                and technology enthusiasts worldwide.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                <span>Global Community • 50+ Countries</span>
              </div>
            </div>

            {/* Legal & Privacy */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowCookieModal(true)}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    GDPR Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    CCPA Rights
                  </a>
                </li>
              </ul>
            </div>

            {/* Data Controller Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Data Controller
              </h4>
              <div className="text-sm text-gray-300 space-y-2">
                <p><strong>Geeks & Nerds Inc.</strong></p>
                <p>Tech Valley Drive<br /> Antioch, CA 94105<br />United States</p>
                <p>
                  <strong>DPO Contact:</strong><br />
                  <a href="mailto:privacy@geeksandnerds.com" className="text-indigo-400 hover:text-indigo-300">
                    privacy@geeksandnerds.com
                  </a>
                </p>
                <p>
                  <strong>EU Representative:</strong><br />
                  DataGuard Legal GmbH<br />
                  Munich, Germany
                </p>
              </div>
            </div>

            {/* User Rights */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Your Rights
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Right to Access Your Data</li>
                <li>• Right to Rectification</li>
                <li>• Right to Erasure</li>
                <li>• Right to Data Portability</li>
                <li>• Right to Object</li>
                <li>• Right to Restrict Processing</li>
              </ul>
              <div className="pt-2">
                <a 
                  href="mailto:privacy@geeksandnerds.com?subject=Data Rights Request"
                  className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Exercise Your Rights
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Geeks & Nerds Inc. All rights reserved. | 
              <span className="ml-2">Reg. No: 12345678 | VAT: GB123456789</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>🇺🇸 English (US)</span>
              <span>•</span>
              <span>Last updated: December 2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh] text-gray-700 space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">1. Data We Collect</h3>
                <p>We collect information you provide directly, usage data, and technical information to provide our services.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">2. How We Use Your Data</h3>
                <p>Your data is used to provide services, improve user experience, and communicate with you about our platform.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">3. Data Sharing</h3>
                <p>We do not sell your personal data. We may share data with service providers under strict agreements.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">4. Your Rights (GDPR/CCPA)</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access: Request a copy of your personal data</li>
                  <li>Rectification: Correct inaccurate data</li>
                  <li>Erasure: Request deletion of your data</li>
                  <li>Portability: Receive your data in a structured format</li>
                  <li>Object: Opt-out of certain processing activities</li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">5. International Transfers</h3>
                <p>Data may be transferred to countries with adequate protection levels or under appropriate safeguards.</p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
              <button
                onClick={() => setShowCookieModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh] text-gray-700 space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                <p>Required for basic site functionality, authentication, and security. Cannot be disabled.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                <p>Help us understand how users interact with our platform to improve user experience.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                <p>Used to deliver relevant advertisements and track campaign effectiveness.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold mb-2">Preference Cookies</h3>
                <p>Remember your settings and preferences for a personalized experience.</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};