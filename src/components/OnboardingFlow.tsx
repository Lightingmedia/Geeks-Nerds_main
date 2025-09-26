import React, { useState, useEffect } from 'react';
import { CheckCircle, User, CreditCard as Edit3, Share2, Users, BarChart3, ArrowRight, X } from 'lucide-react';

interface OnboardingFlowProps {
  user: any;
  onComplete: () => void;
  onSkip: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ user, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Geeks & Nerds!',
      description: 'You now have full owner access to your profile and all platform features.',
      icon: User,
      completed: completedSteps.has('welcome')
    },
    {
      id: 'profile',
      title: 'Customize Your Profile',
      description: 'Add your bio, skills, and professional information to connect with like-minded developers.',
      icon: Edit3,
      completed: completedSteps.has('profile')
    },
    {
      id: 'content',
      title: 'Create & Share Content',
      description: 'Share code snippets, documents, projects, and thoughts with the community.',
      icon: Share2,
      completed: completedSteps.has('content')
    },
    {
      id: 'community',
      title: 'Join the Community',
      description: 'Connect with other developers, comment on posts, and build your network.',
      icon: Users,
      completed: completedSteps.has('community')
    },
    {
      id: 'analytics',
      title: 'Track Your Impact',
      description: 'Monitor your post engagement, profile views, and community interactions.',
      icon: BarChart3,
      completed: completedSteps.has('analytics')
    }
  ];

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    
    // Auto-advance to next step after a brief delay
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 1000);
  };

  const handleFinish = () => {
    // Grant owner status and complete onboarding
    const updatedUser = {
      ...user,
      is_owner: true,
      onboarding_completed: true,
      owner_permissions: {
        profile_management: true,
        content_creation: true,
        social_features: true,
        community_interaction: true,
        analytics_access: true,
        advanced_settings: true
      }
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Getting Started</h2>
            <button
              onClick={onSkip}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-2 opacity-90">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Step-specific content */}
          {currentStep === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-800">Owner Status Granted!</h4>
                  <p className="text-green-700 text-sm">
                    You now have full access to all platform features and can manage your content freely.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Edit3 className="w-6 h-6 text-indigo-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Profile Setup</h4>
                <p className="text-sm text-gray-600">Add bio, skills, and experience</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <User className="w-6 h-6 text-indigo-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Professional Info</h4>
                <p className="text-sm text-gray-600">Showcase your expertise</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">💻</div>
                <p className="text-xs font-medium">Code Snippets</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">📄</div>
                <p className="text-xs font-medium">Documents</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🚀</div>
                <p className="text-xs font-medium">Projects</p>
              </div>
            </div>
          )}

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => handleStepComplete(currentStepData.id)}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Get Started!</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-gray-50 p-6 border-t">
          <h4 className="font-semibold text-gray-900 mb-3">Your Owner Privileges Include:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Full profile customization</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Unlimited content creation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Advanced social features</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Analytics dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};