import { useState } from 'react';
import '../../css/SystemSettings.css';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      organizationName: 'Minutor Corp',
      timeZone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      language: 'English',
      currency: 'USD'
    },
    notifications: {
      emailNotifications: true,
      meetingReminders: true,
      reminderTime: '15',
      systemAlerts: true,
      weeklyReports: false
    },
    security: {
      passwordComplexity: 'medium',
      sessionTimeout: '60',
      twoFactorAuth: false,
      loginAttempts: '5',
      accountLockout: '30'
    },
    meetings: {
      defaultDuration: '30',
      allowGuestAccess: true,
      recordMeetings: false,
      autoTranscription: false,
      maxParticipants: '50'
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionPeriod: '30',
      cloudStorage: 'aws'
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      setHasChanges(false);
      alert('Settings reset to default values.');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'meetings', label: 'Meetings', icon: '📋' },
    { id: 'backup', label: 'Backup', icon: '💾' }
  ];

  return (
    <div className="system-settings">
      {/* Settings Navigation */}
      <div className="settings-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <h3>General Settings</h3>
            
            <div className="setting-group">
              <label>Organization Name</label>
              <input
                type="text"
                value={settings.general.organizationName}
                onChange={(e) => handleSettingChange('general', 'organizationName', e.target.value)}
              />
            </div>

            <div className="setting-group">
              <label>Time Zone</label>
              <select
                value={settings.general.timeZone}
                onChange={(e) => handleSettingChange('general', 'timeZone', e.target.value)}
              >
                <option value="UTC-12">UTC-12 (Baker Island)</option>
                <option value="UTC-8">UTC-8 (Pacific)</option>
                <option value="UTC-5">UTC-5 (Eastern)</option>
                <option value="UTC+0">UTC+0 (London)</option>
                <option value="UTC+3">UTC+3 (Moscow)</option>
                <option value="UTC+8">UTC+8 (Beijing)</option>
                <option value="UTC+9">UTC+9 (Tokyo)</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Date Format</label>
              <select
                value={settings.general.dateFormat}
                onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Language</label>
              <select
                value={settings.general.language}
                onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Currency</label>
              <select
                value={settings.general.currency}
                onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            
            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                />
                <span className="toggle-label">Email Notifications</span>
              </label>
              <span className="setting-description">Receive email notifications for important events</span>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.meetingReminders}
                  onChange={(e) => handleSettingChange('notifications', 'meetingReminders', e.target.checked)}
                />
                <span className="toggle-label">Meeting Reminders</span>
              </label>
              <span className="setting-description">Get reminded before scheduled meetings</span>
            </div>

            <div className="setting-group">
              <label>Reminder Time (minutes before meeting)</label>
              <select
                value={settings.notifications.reminderTime}
                onChange={(e) => handleSettingChange('notifications', 'reminderTime', e.target.value)}
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.systemAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
                />
                <span className="toggle-label">System Alerts</span>
              </label>
              <span className="setting-description">Receive alerts for system maintenance and updates</span>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyReports}
                  onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                />
                <span className="toggle-label">Weekly Reports</span>
              </label>
              <span className="setting-description">Receive weekly meeting summary reports</span>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="settings-section">
            <h3>Security Settings</h3>
            
            <div className="setting-group">
              <label>Password Complexity</label>
              <select
                value={settings.security.passwordComplexity}
                onChange={(e) => handleSettingChange('security', 'passwordComplexity', e.target.value)}
              >
                <option value="low">Low - 6+ characters</option>
                <option value="medium">Medium - 8+ chars, numbers</option>
                <option value="high">High - 12+ chars, mixed case, symbols</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Session Timeout (minutes)</label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
              </select>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                />
                <span className="toggle-label">Two-Factor Authentication</span>
              </label>
              <span className="setting-description">Require 2FA for all user accounts</span>
            </div>

            <div className="setting-group">
              <label>Max Login Attempts</label>
              <select
                value={settings.security.loginAttempts}
                onChange={(e) => handleSettingChange('security', 'loginAttempts', e.target.value)}
              >
                <option value="3">3 attempts</option>
                <option value="5">5 attempts</option>
                <option value="10">10 attempts</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Account Lockout Duration (minutes)</label>
              <select
                value={settings.security.accountLockout}
                onChange={(e) => handleSettingChange('security', 'accountLockout', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        )}

        {/* Meeting Settings */}
        {activeTab === 'meetings' && (
          <div className="settings-section">
            <h3>Meeting Settings</h3>
            
            <div className="setting-group">
              <label>Default Meeting Duration (minutes)</label>
              <select
                value={settings.meetings.defaultDuration}
                onChange={(e) => handleSettingChange('meetings', 'defaultDuration', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
              </select>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.meetings.allowGuestAccess}
                  onChange={(e) => handleSettingChange('meetings', 'allowGuestAccess', e.target.checked)}
                />
                <span className="toggle-label">Allow Guest Access</span>
              </label>
              <span className="setting-description">Allow non-registered users to join meetings</span>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.meetings.recordMeetings}
                  onChange={(e) => handleSettingChange('meetings', 'recordMeetings', e.target.checked)}
                />
                <span className="toggle-label">Record Meetings by Default</span>
              </label>
              <span className="setting-description">Automatically record all meetings</span>
            </div>

            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.meetings.autoTranscription}
                  onChange={(e) => handleSettingChange('meetings', 'autoTranscription', e.target.checked)}
                />
                <span className="toggle-label">Auto Transcription</span>
              </label>
              <span className="setting-description">Automatically transcribe meeting recordings</span>
            </div>

            <div className="setting-group">
              <label>Maximum Participants</label>
              <select
                value={settings.meetings.maxParticipants}
                onChange={(e) => handleSettingChange('meetings', 'maxParticipants', e.target.value)}
              >
                <option value="25">25 participants</option>
                <option value="50">50 participants</option>
                <option value="100">100 participants</option>
                <option value="250">250 participants</option>
                <option value="500">500 participants</option>
              </select>
            </div>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === 'backup' && (
          <div className="settings-section">
            <h3>Backup & Recovery Settings</h3>
            
            <div className="setting-group toggle-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.backup.autoBackup}
                  onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
                />
                <span className="toggle-label">Automatic Backup</span>
              </label>
              <span className="setting-description">Enable automatic system backups</span>
            </div>

            <div className="setting-group">
              <label>Backup Frequency</label>
              <select
                value={settings.backup.backupFrequency}
                onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
              >
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Backup Time</label>
              <input
                type="time"
                value={settings.backup.backupTime}
                onChange={(e) => handleSettingChange('backup', 'backupTime', e.target.value)}
              />
            </div>

            <div className="setting-group">
              <label>Data Retention Period (days)</label>
              <select
                value={settings.backup.retentionPeriod}
                onChange={(e) => handleSettingChange('backup', 'retentionPeriod', e.target.value)}
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Cloud Storage Provider</label>
              <select
                value={settings.backup.cloudStorage}
                onChange={(e) => handleSettingChange('backup', 'cloudStorage', e.target.value)}
              >
                <option value="aws">Amazon S3</option>
                <option value="azure">Azure Blob Storage</option>
                <option value="gcp">Google Cloud Storage</option>
                <option value="local">Local Storage Only</option>
              </select>
            </div>

            <div className="backup-actions">
              <button className="backup-btn">
                💾 Create Backup Now
              </button>
              <button className="restore-btn">
                ↩️ Restore from Backup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Save Actions */}
      <div className="settings-actions">
        <button 
          className="reset-btn" 
          onClick={handleResetSettings}
        >
          Reset to Default
        </button>
        <button 
          className={`save-btn ${hasChanges ? 'has-changes' : ''}`}
          onClick={handleSaveSettings}
          disabled={!hasChanges}
        >
          {hasChanges ? 'Save Changes' : 'All Changes Saved'}
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
