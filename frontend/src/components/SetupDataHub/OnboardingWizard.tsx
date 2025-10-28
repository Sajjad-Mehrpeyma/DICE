import OnboardingStepper from './OnboardingStepper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OnboardingWizard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Wizard</CardTitle>
      </CardHeader>
      <CardContent>
        <OnboardingStepper />
        {/* The content for each step will be added here */}
      </CardContent>
    </Card>
  );
};

export default OnboardingWizard;
