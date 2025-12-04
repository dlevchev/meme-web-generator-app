import { useState } from 'react';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';
import { Template, BuildResponse } from './types';
import { LandingPage } from './components/LandingPage';
import { TemplateSelector } from './components/TemplateSelector';
import { ConfigEditor } from './components/ConfigEditor';
import { LoadingOverlay } from './components/LoadingOverlay';
import { BuildSuccess } from './components/BuildSuccess';
import { PaymentModal } from './components/PaymentModal';
import { DownloadGuide } from './components/DownloadGuide';
import { WalletConnector, WalletButton } from './components/WalletConnector';
import { API_BASE_URL } from './config/api';
import './App.css';

const getFilePrefix = (file: File): string => {
  const prefixMatch = file.name.match(/^(meme_|favicon_)/);
  if (prefixMatch) return prefixMatch[1];
  if (file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) return 'music_';
  return 'video_';
};

const updateUploadedFiles = (prevFiles: File[], newFiles: File[]): File[] => {
  const fileMap = new Map<string, File[]>();

  // Initialize with existing files
  prevFiles.forEach(f => {
    if (!f?.name) return;
    const prefix = getFilePrefix(f);
    if (!fileMap.has(prefix)) fileMap.set(prefix, []);
    fileMap.get(prefix)!.push(f);
  });

  // Process new files
  newFiles.forEach(f => {
    if (!f?.name) return;
    const prefix = getFilePrefix(f);

    if (f.size === 0) {
      fileMap.delete(prefix);
    } else if (prefix === 'video_') {
      // Append videos (multiple allowed)
      if (!fileMap.has(prefix)) fileMap.set(prefix, []);
      fileMap.get(prefix)!.push(f);
    } else {
      // Replace others (only one per type)
      fileMap.set(prefix, [f]);
    }
  });

  return Array.from(fileMap.values()).flat();
};

interface AppContentProps {
  wallet: ReturnType<typeof useWallet>;
}

const AppContent = ({ wallet }: AppContentProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateConfig, setTemplateConfig] = useState<Template | null>(null);
  const [editedConfig, setEditedConfig] = useState<Template | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [buildResponse, setBuildResponse] = useState<BuildResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDownloadGuide, setShowDownloadGuide] = useState(false);

  const handleTemplateSelect = async (templateName: string) => {
    try {
      setError(null);
      setSelectedTemplate(templateName);
      setEditedConfig(null);
      setBuildResponse(null);

      // Fetch the template config
      const response = await axios.get<Template>(
        `${API_BASE_URL}/api/build/configs/${templateName}.json`
      );
      setTemplateConfig(response.data);
      setEditedConfig(response.data);
    } catch (err) {
      setError(`Failed to load template: ${(err as Error).message}`);
    }
  };

  const handleConfigChange = (config: Template, files?: File[]) => {
    setEditedConfig(config);
    if (files) {
      setUploadedFiles(prev => updateUploadedFiles(prev, files));
    }
  };

  const handleBuild = async () => {
    if (!selectedTemplate || !editedConfig) {
      setError('Please select a template and configure it');
      return;
    }

    // Check if payments are disabled for testing
    const paymentDisabled = (import.meta as any).env.VITE_DISABLE_PAYMENTS === 'true';

    if (!paymentDisabled && !wallet.connected) {
      setError('Please connect your wallet to proceed with the build');
      return;
    }

    if (paymentDisabled) {
      // Skip payment, go directly to build
      await handlePaymentSuccess('test_transaction_disabled_payments');
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = async (txSignature: string) => {
    setShowPaymentModal(false);

    try {
      setError(null);
      setIsLoading(true);

      const formData = new FormData();
      formData.append('templateName', selectedTemplate!);
      formData.append('configJson', JSON.stringify(editedConfig));
      formData.append('userEmail', editedConfig?.userEmail || '');
      formData.append('paymentTx', txSignature);

      uploadedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post<BuildResponse>(`${API_BASE_URL}/api/build/build`, formData);

      setBuildResponse(response.data);
      setUploadedFiles([]);
      // Show success page first, user can click to view guide
      setShowDownloadGuide(false);
    } catch (err) {
      setError(`Build failed: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBuild = () => {
    setSelectedTemplate(null);
    setTemplateConfig(null);
    setEditedConfig(null);
    setBuildResponse(null);
    setError(null);
    setShowDownloadGuide(false);
  };

  const handleStartCreating = () => {
    // Navigate to template selector by setting a flag
    setSelectedTemplate('__viewing_templates__');
  };

  const handleBackToLanding = () => {
    setSelectedTemplate(null);
    setTemplateConfig(null);
    setEditedConfig(null);
    setUploadedFiles([]);
    setError(null);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate('__viewing_templates__');
    setTemplateConfig(null);
    setEditedConfig(null);
    setUploadedFiles([]);
    setError(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>🎨 MWG</h1>
            <p>Create custom meme website from a template</p>
          </div>
        </div>
      </header>

      <WalletButton />

      <main className="main">
        {showDownloadGuide ? (
          <DownloadGuide
            buildId={buildResponse?.buildId}
            downloadUrl={buildResponse?.downloadUrl}
            onBack={() => setShowDownloadGuide(false)}
          />
        ) : buildResponse ? (
          <BuildSuccess
            response={buildResponse}
            onNewBuild={handleNewBuild}
            onViewGuide={() => setShowDownloadGuide(true)}
          />
        ) : !selectedTemplate || selectedTemplate === '__viewing_templates__' ? (
          <>
            {!selectedTemplate ? (
              <LandingPage
                onExplore={handleStartCreating}
                onViewGuide={() => {
                  setShowDownloadGuide(true);
                }}
              />
            ) : (
              <>
                <button
                  onClick={handleBackToLanding}
                  className="back-btn"
                >
                  ← Back to Home
                </button>
                <TemplateSelector
                  onSelect={handleTemplateSelect}
                  selectedTemplate={selectedTemplate}
                />
              </>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleBackToTemplates}
              className="back-btn"
            >
              ← Back to Templates
            </button>

            {error && (
              <div className="error-box">
                {error}
              </div>
            )}

            {selectedTemplate && templateConfig && editedConfig && (
              <div className="config-container">
                <div className="config-wrapper">
                  <ConfigEditor
                    templateName={selectedTemplate}
                    initialConfig={editedConfig}
                    onConfigChange={handleConfigChange}
                  />

                  <button
                    onClick={handleBuild}
                    disabled={isLoading || !editedConfig}
                    className="build-btn"
                  >
                    {isLoading ? 'Building...' : 'Build Website'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <LoadingOverlay isLoading={isLoading} />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <footer className="footer">
        <p>Meme Web Generator v1.0.0</p>
        <div className="footer-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            𝕏 Twitter
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            💬 Discord
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            📸 Instagram
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            🐙 GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const wallet = useWallet();
  return <AppContent wallet={wallet} />;
}

export default function AppWithWallet() {
  return (
    <WalletConnector>
      <App />
    </WalletConnector>
  );
}
