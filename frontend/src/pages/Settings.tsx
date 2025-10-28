import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoalsTargetsTab from '@/components/settings/GoalsTargetsTab';
import '../styles/settings.css';

export const Settings = () => {
  return (
    <div className="settings-page">
      <div className="settings-page__header">
        <h1 className="settings-page__title">Settings</h1>
        <p className="settings-page__description">
          Manage your account, business goals, and application preferences
        </p>
      </div>

      <Tabs defaultValue="goals" className="settings-page__tabs">
        <TabsList>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="settings-page__tab-content">
          <GoalsTargetsTab />
        </TabsContent>

        <TabsContent value="account" className="settings-page__tab-content">
          <div className="settings__placeholder">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Account Settings
            </h3>
            <p className="text-muted-foreground">
              Account management features coming soon.
            </p>
          </div>
        </TabsContent>

        <TabsContent
          value="integrations"
          className="settings-page__tab-content"
        >
          <div className="settings__placeholder">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Integrations
            </h3>
            <p className="text-muted-foreground">
              Integration settings and connected services will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="settings-page__tab-content">
          <div className="settings__placeholder">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Preferences
            </h3>
            <p className="text-muted-foreground">
              Application preferences and customization options coming soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
