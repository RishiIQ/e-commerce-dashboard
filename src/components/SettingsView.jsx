import React, { useState } from 'react';
import { Globe, Lock, Bell, ShieldCheck, Database, Save } from 'lucide-react';

export function SettingsView({ addToast }) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    storeName: 'Amazon Terracotta Commerce',
    supportEmail: 'support@amazon.co',
    currency: 'USD ($)',
    timezone: 'UTC -5 (Eastern Time)',
    orderAlerts: true,
    smsNotifications: false,
    twoFactorAuth: true,
    apiWebhookUrl: 'https://api.terracotta.io/v1/webhooks/live'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Enterprise workspace settings successfully updated.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h3 className="font-serif font-bold text-xl text-[#2C2421]">Workspace Settings</h3>
        <p className="text-xs text-[#7B6F6A]">Manage global store configurations, security policies, and notification channels.</p>
      </div>


      <div className="flex flex-wrap gap-2 border-b border-[#EFECE6] pb-4">
        <button 
          onClick={() => setActiveTab('general')} 
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${activeTab === 'general' ? 'bg-[#C86D51] text-white shadow-sm' : 'bg-white border border-[#EFECE6] text-[#7B6F6A] hover:bg-[#F7F6F3]'}`}
        >
          General Store
        </button>
        <button 
          onClick={() => setActiveTab('regional')} 
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${activeTab === 'regional' ? 'bg-[#C86D51] text-white shadow-sm' : 'bg-white border border-[#EFECE6] text-[#7B6F6A] hover:bg-[#F7F6F3]'}`}
        >
          Regional & Currency
        </button>
        <button 
          onClick={() => setActiveTab('notifications')} 
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${activeTab === 'notifications' ? 'bg-[#C86D51] text-white shadow-sm' : 'bg-white border border-[#EFECE6] text-[#7B6F6A] hover:bg-[#F7F6F3]'}`}
        >
          Notifications
        </button>
        <button 
          onClick={() => setActiveTab('security')} 
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${activeTab === 'security' ? 'bg-[#C86D51] text-white shadow-sm' : 'bg-white border border-[#EFECE6] text-[#7B6F6A] hover:bg-[#F7F6F3]'}`}
        >
          Security & API
        </button>
      </div>


      <form onSubmit={handleSave} className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {activeTab === 'general' && (
          <div className="space-y-4 text-xs animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-[#2C2421] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C86D51]" /> Store Identity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#7B6F6A] mb-1">Store / Workspace Name</label>
                <input 
                  type="text" 
                  name="storeName" 
                  value={settings.storeName} 
                  onChange={handleChange} 
                  className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5 text-[#2C2421]" 
                />
              </div>
              <div>
                <label className="block font-semibold text-[#7B6F6A] mb-1">Support Email Address</label>
                <input 
                  type="email" 
                  name="supportEmail" 
                  value={settings.supportEmail} 
                  onChange={handleChange} 
                  className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5 text-[#2C2421]" 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regional' && (
          <div className="space-y-4 text-xs animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-[#2C2421] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#C86D51]" /> Regional Preferences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#7B6F6A] mb-1">Default Currency</label>
                <select 
                  name="currency" 
                  value={settings.currency} 
                  onChange={handleChange} 
                  className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5 text-[#2C2421]"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                  <option value="INR (₹)">INR (₹)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#7B6F6A] mb-1">Store Timezone</label>
                <select 
                  name="timezone" 
                  value={settings.timezone} 
                  onChange={handleChange} 
                  className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5 text-[#2C2421]"
                >
                  <option value="UTC -5 (Eastern Time)">UTC -5 (Eastern Time)</option>
                  <option value="UTC +0 (Greenwich Mean Time)">UTC +0 (Greenwich Mean Time)</option>
                  <option value="UTC +5:30 (Indian Standard Time)">UTC +5:30 (Indian Standard Time)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-[#2C2421] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#C86D51]" /> Notification Channels
            </h4>
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="orderAlerts" 
                  checked={settings.orderAlerts} 
                  onChange={handleChange} 
                  className="w-4 h-4 accent-[#C86D51] rounded" 
                />
                <span className="font-medium text-[#2C2421]">Receive instant email alerts for new high-value orders</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="smsNotifications" 
                  checked={settings.smsNotifications} 
                  onChange={handleChange} 
                  className="w-4 h-4 accent-[#C86D51] rounded" 
                />
                <span className="font-medium text-[#2C2421]">Enable SMS notifications for low-stock inventory warnings</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4 text-xs animate-fade-in">
            <h4 className="font-serif font-bold text-sm text-[#2C2421] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C86D51]" /> Security & API Access
            </h4>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="twoFactorAuth" 
                  checked={settings.twoFactorAuth} 
                  onChange={handleChange} 
                  className="w-4 h-4 accent-[#C86D51] rounded" 
                />
                <span className="font-medium text-[#2C2421]">Enforce Two-Factor Authentication (2FA) for all administrator roles</span>
              </label>
              <div>
                <label className="block font-semibold text-[#7B6F6A] mb-1">Live Webhook Endpoint URL</label>
                <input 
                  type="url" 
                  name="apiWebhookUrl" 
                  value={settings.apiWebhookUrl} 
                  onChange={handleChange} 
                  className="w-full bg-[#F7F6F3] border border-[#EFECE6] rounded-2xl px-4 py-2.5 font-mono text-[11px] text-[#2C2421]" 
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#EFECE6] flex justify-end">
          <button 
            type="submit" 
            className="bg-[#C86D51] text-white px-6 py-2.5 rounded-2xl text-xs font-semibold hover:bg-[#B35B40] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>

      </form>
    </div>
  );
}