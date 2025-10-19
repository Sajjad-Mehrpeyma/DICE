import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">
          Manage your account and application settings
        </p>
      </div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="pilot">Pilot</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p>Account settings content goes here.</p>
        </TabsContent>
        <TabsContent value="integrations">
          <p>Integrations settings content goes here.</p>
        </TabsContent>
        <TabsContent value="audit">
          <p>Audit log content goes here.</p>
        </TabsContent>
        <TabsContent value="pilot">
          <p>Pilot settings content goes here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
