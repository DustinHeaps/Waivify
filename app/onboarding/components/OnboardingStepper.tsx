"use client";

import { useState } from "react";
import { UploadLogo } from "./UploadLogo";

import BusinessType from "./BusinessType";
import EmailPrefrences from "./EmailPrefrences";
import WaiverPreview from "./WaiverPreview";
import WaiverStep from "./WaiverStep";
import { completeOnboarding } from '@/app/actions/onboarding';
import posthog from 'posthog-js';

const steps = [
  "Welcome to Waivify ✍️",
  "What kind of business do you run?",
  "Upload your logo",
  "Create your first waiver",
  "Confirm email preferences",
  "Waiver Preview",
];

type FormData = {
  businessType?: string;
  logoUrl?: string;
  waiverTitle?: string;
  waiverDescription?: string;
};

export default function OnboardingStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async (data?: FormData) => {
    posthog.capture('onboarding_step_completed', { step });
    setFormData((prev) => ({ ...prev, ...data }));

    const isFinalStep = step === steps.length - 1;

    if (isFinalStep) {
      setIsSubmitting(true);
      try {
        const safeData = {
          onboardingComplete: true,
          businessType: formData.businessType,
          logoUrl: formData.logoUrl,
          waiverTitle: formData.waiverTitle,
          waiverDescription: formData.waiverDescription,
        };

        await completeOnboarding(safeData);

        window.location.href = "/admin";
      } catch (error) {
        console.error("Failed to complete onboarding:", error);
        setIsSubmitting(false);
      }
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className='text-center space-y-4'>
            
              <p className='text-gray-500 max-w-md mx-auto'>
                We're excited to have you here! Let's set up your account so you
                can start collecting waivers in minutes.
              </p>
              <div className='space-x-2'>
                <button
                  onClick={() => handleNext()}
                  className='bg-black text-white rounded px-4 py-2'
                >
                  Get Started
                </button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <BusinessType
            onNext={(selected) => handleNext({ businessType: selected })}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <UploadLogo onNext={(data) => handleNext(data)} onBack={handleBack} />
        );
      case 3:
        return (
          <WaiverStep
            onNext={(waiverData) => handleNext(waiverData)}
            onBack={handleBack}
          />
        );

      case 4:
        return (
          <EmailPrefrences
            onNext={(emailPrefs) => handleNext(emailPrefs)}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <WaiverPreview
            title={(formData as any).waiverTitle}
            description={(formData as any).waiverDescription}
            onNext={() => handleNext({})}
            onBack={handleBack}
          />
        );
      default:
        return <p>Unknown step</p>;
    }
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow'>
      <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
        {steps[step]}
      </h1>

      <div className='text-center text-gray-600 mb-8'>
        {renderStepContent()}
      </div>
    </div>
  );
}
