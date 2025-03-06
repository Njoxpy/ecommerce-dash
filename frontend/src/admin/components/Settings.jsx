import { useState } from "react";
import {
  Save,
  Globe,
  CreditCard,
  Truck,
  Shield,
  Bell,
  Users,
  Database,
} from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "My eCommerce Store",
    siteLogo: "",
    favicon: "",
    siteDescription: "",
    currency: "USD",
    language: "en",
    timezone: "GMT",
    paymentGateways: {
      paypal: true,
      stripe: true,
      creditCard: true,
    },
    shippingMethods: {
      standard: true,
      express: true,
    },
    taxRates: {
      included: false,
      rates: [],
    },
    notifications: {
      order: true,
      account: true,
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      googleAnalyticsId: "",
      socialMediaLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireSpecialChar: true,
      },
      twoFactorAuth: true,
      ipWhitelist: [],
    },
    adminUsers: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleToggle = (section, key) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: !settings[section][key],
      },
    });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Globe size={20} className="mr-2" /> General Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site Logo
            </label>
            <input
              type="file"
              name="siteLogo"
              onChange={(e) =>
                setSettings({ ...settings, siteLogo: e.target.files[0] })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Favicon
            </label>
            <input
              type="file"
              name="favicon"
              onChange={(e) =>
                setSettings({ ...settings, favicon: e.target.files[0] })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site Description
            </label>
            <textarea
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="GMT">GMT</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CreditCard size={20} className="mr-2" /> Payment Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Gateways
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.paymentGateways.paypal}
                  onChange={() => handleToggle("paymentGateways", "paypal")}
                  className="mr-2"
                />
                <span>PayPal</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.paymentGateways.stripe}
                  onChange={() => handleToggle("paymentGateways", "stripe")}
                  className="mr-2"
                />
                <span>Stripe</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.paymentGateways.creditCard}
                  onChange={() => handleToggle("paymentGateways", "creditCard")}
                  className="mr-2"
                />
                <span>Credit Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Truck size={20} className="mr-2" /> Shipping Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shipping Methods
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.shippingMethods.standard}
                  onChange={() => handleToggle("shippingMethods", "standard")}
                  className="mr-2"
                />
                <span>Standard Shipping</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.shippingMethods.express}
                  onChange={() => handleToggle("shippingMethods", "express")}
                  className="mr-2"
                />
                <span>Express Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Tax Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tax Included in Price
            </label>
            <input
              type="checkbox"
              checked={settings.taxRates.included}
              onChange={() => handleToggle("taxRates", "included")}
              className="mr-2"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bell size={20} className="mr-2" /> Notification Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Notifications
            </label>
            <input
              type="checkbox"
              checked={settings.notifications.order}
              onChange={() => handleToggle("notifications", "order")}
              className="mr-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Notifications
            </label>
            <input
              type="checkbox"
              checked={settings.notifications.account}
              onChange={() => handleToggle("notifications", "account")}
              className="mr-2"
            />
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          SEO Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={settings.seo.metaTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={settings.seo.metaDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Google Analytics ID
            </label>
            <input
              type="text"
              name="googleAnalyticsId"
              value={settings.seo.googleAnalyticsId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Shield size={20} className="mr-2" /> Security Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </label>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={() => handleToggle("security", "twoFactorAuth")}
              className="mr-2"
            />
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Users size={20} className="mr-2" /> Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admin Users
            </label>
            <div className="mt-2 space-y-2">
              {settings.adminUsers.map((user, index) => (
                <div key={index} className="flex items-center">
                  <span>{user.name}</span>
                  <button className="text-[#FF6347] hover:text-[#EE5A42] ml-2">
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Database size={20} className="mr-2" /> Backup & Restore
        </h2>
        <div className="space-y-4">
          <button className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg hover:bg-[#1C86EE]">
            Backup Data
          </button>
          <button className="bg-[#FF6347] text-white px-4 py-2 rounded-lg hover:bg-[#EE5A42]">
            Restore Backup
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE]"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
