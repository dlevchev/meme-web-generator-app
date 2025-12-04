import React, { useState } from 'react';
import styles from './DownloadGuide.module.css';

interface Props {
  buildId?: string;
  downloadUrl?: string;
  onBack?: () => void;
}

type TabType = 'extract' | 'preview' | 'customize' | 'deploy' | 'promote' | 'faq';

export const DownloadGuide: React.FC<Props> = ({ buildId, downloadUrl, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('extract');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Can I edit the HTML/CSS?',
      answer: 'Yes! You can modify any file except config.json. Use a text editor and refresh your browser to see changes.'
    },
    {
      question: 'Can I add more pages?',
      answer: 'Yes! Create new .html files and link them with <a> tags in your HTML.'
    },
    {
      question: 'Can I use my own domain?',
      answer: 'Yes! Deploy to Vercel/Netlify/GitHub Pages and add your custom domain in their settings.'
    },
    {
      question: 'How do I make it SEO friendly?',
      answer: 'Add descriptive title in <title> tag, meta descriptions, proper heading tags, alt text to images, and create sitemap.xml'
    },
    {
      question: 'Can I add Google Analytics?',
      answer: 'Yes! Get tracking code from analytics.google.com and paste in <head> section.'
    },
    {
      question: 'How do I update the website later?',
      answer: 'Edit HTML/CSS files locally, push changes to Git, and your platform (Vercel/Netlify) auto-deploys.'
    }
  ];

  const deploymentOptions = [
    {
      name: 'Vercel',
      difficulty: 'Easiest',
      cost: 'Free',
      description: 'One-click deployment from GitHub',
      steps: ['Sign up at vercel.com', 'Connect GitHub repo', 'Select app folder', 'Deploy!'],
      pros: ['Instant deployment', 'Automatic HTTPS', 'Free tier generous', 'Easy custom domain']
    },
    {
      name: 'Netlify',
      difficulty: 'Easy',
      cost: 'Free',
      description: 'Drag & drop deployment',
      steps: ['Sign up at netlify.com', 'Drag website folder into Netlify', 'Get your live URL', 'Share!'],
      pros: ['Drag & drop upload', 'Instant live', 'No Git required', 'Built-in analytics']
    },
    {
      name: 'GitHub Pages',
      difficulty: 'Medium',
      cost: 'Free',
      description: 'GitHub-hosted static site',
      steps: ['Create GitHub repo', 'Push code to main', 'Enable Pages in settings', 'Live at yourusername.github.io'],
      pros: ['Free forever', 'Version control', 'Custom domain support']
    }
  ];

  return (
    <div className={styles.container}>
      {onBack && (
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
      )}

      <div className={styles.header}>
        <h1>🎉 Your Website is Ready!</h1>
        <p>Follow this guide to extract, preview, and deploy your meme website</p>
      </div>

      <div className={styles.quickActions}>
        {downloadUrl && (
          <>
            <a href={downloadUrl} className={styles.downloadBtn} download>
              📥 Download Your Website
            </a>
            {buildId && <span className={styles.buildId}>Build ID: {buildId}</span>}
          </>
        )}
        {!downloadUrl && (
          <p style={{ color: '#ffbe0b', fontSize: '14px' }}>
            📌 Build and download your website first to get the download link
          </p>
        )}
      </div>

      <div className={styles.tabNav}>
        <button
          className={`${styles.tab} ${activeTab === 'extract' ? styles.active : ''}`}
          onClick={() => setActiveTab('extract')}
        >
          📦 Extract
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'customize' ? styles.active : ''}`}
          onClick={() => setActiveTab('customize')}
        >
          ✏️ Customize
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'deploy' ? styles.active : ''}`}
          onClick={() => setActiveTab('deploy')}
        >
          🚀 Deploy
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'promote' ? styles.active : ''}`}
          onClick={() => setActiveTab('promote')}
        >
          📢 Promote
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'faq' ? styles.active : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          ❓ FAQ
        </button>
      </div>

      <div className={styles.content}>
        {/* Extract Tab */}
        {activeTab === 'extract' && (
          <div className={styles.tabContent}>
            <h2>Step 1: Extract Your ZIP File</h2>
            <div className={styles.osGuide}>
              <div className={styles.osSection}>
                <h3>Windows</h3>
                <ol>
                  <li>Right-click the downloaded ZIP file</li>
                  <li>Select <strong>"Extract All..."</strong></li>
                  <li>Choose a location (e.g., Desktop)</li>
                  <li>Click <strong>"Extract"</strong></li>
                </ol>
              </div>
              <div className={styles.osSection}>
                <h3>macOS</h3>
                <ol>
                  <li>Double-click the ZIP file</li>
                  <li>It automatically extracts to the same folder</li>
                  <li>Look for folder with your website name</li>
                </ol>
              </div>
              <div className={styles.osSection}>
                <h3>Linux</h3>
                <code>unzip website-name.zip</code>
                <code>cd website-name</code>
              </div>
            </div>

            <div className={styles.fileStructure}>
              <h3>📁 What's Inside</h3>
              <pre>{`your-website/
├── index.html          # Main page
├── styles.css          # Styling
├── script.js           # Interactivity
├── config.json         # Your settings (don't edit!)
├── assets/
│   ├── images/         # Your images
│   ├── videos/         # Your videos
│   └── music.mp3       # Background music
└── README.md           # Info about your site`}</pre>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className={styles.tabContent}>
            <h2>Step 2: Preview Your Website</h2>

            <div className={styles.previewMethod}>
              <h3>🚀 Method 1: Quick Preview (Easiest)</h3>
              <p>Find <strong>index.html</strong> and double-click it to open in your browser</p>
              <p className={styles.note}>Note: Some features like video may not work. Use Method 2 for full functionality.</p>
            </div>

            <div className={styles.previewMethod}>
              <h3>🔧 Method 2: Local Server (Recommended)</h3>
              <p>This enables all features including videos and music.</p>

              <div className={styles.serverOption}>
                <h4>Using Python (if you have it installed)</h4>
                <code>python -m http.server 8000</code>
                <p>Then open: <strong>http://localhost:8000</strong></p>
              </div>

              <div className={styles.serverOption}>
                <h4>Using Node.js (if you have it installed)</h4>
                <code>npm install -g http-server</code>
                <code>http-server</code>
                <p>Then open the provided URL (usually <strong>http://localhost:8080</strong>)</p>
              </div>

              <div className={styles.serverOption}>
                <h4>Using VS Code (Easiest if you have it)</h4>
                <ol>
                  <li>Download <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">VS Code</a> (free)</li>
                  <li>Install "Live Server" extension</li>
                  <li>Right-click index.html → "Open with Live Server"</li>
                  <li>Your website opens automatically!</li>
                </ol>
              </div>
            </div>

            <div className={styles.checklistBox}>
              <h3>✅ What to Check</h3>
              <ul>
                <li>All text displays correctly</li>
                <li>Images load properly</li>
                <li>Colors match your choices</li>
                <li>Videos/music play (if included)</li>
                <li>Responsive on mobile (resize browser)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Customize Tab */}
        {activeTab === 'customize' && (
          <div className={styles.tabContent}>
            <h2>Step 3: Customize Your Website</h2>

            <div className={styles.customizeGuide}>
              <div className={styles.customizeSection}>
                <h3>✏️ Edit Text & Content</h3>
                <ol>
                  <li>Open <strong>index.html</strong> with a text editor</li>
                  <li>Find the text you want to change</li>
                  <li>Edit and save the file</li>
                  <li>Refresh your browser to see changes</li>
                </ol>
                <p className={styles.note}>Recommended editors: VS Code, Sublime Text (free trial)</p>
              </div>

              <div className={styles.customizeSection}>
                <h3>🎨 Edit Colors & Styling</h3>
                <ol>
                  <li>Open <strong>styles.css</strong> in a text editor</li>
                  <li>Find color codes like <code>#8338ec</code> or <code>rgb(131, 56, 236)</code></li>
                  <li>Use a <a href="https://htmlcolorcodes.com" target="_blank" rel="noopener noreferrer">color picker</a> to find your color code</li>
                  <li>Replace the old color with new one</li>
                  <li>Save and refresh browser</li>
                </ol>
              </div>

              <div className={styles.customizeSection}>
                <h3>📷 Replace Images</h3>
                <ol>
                  <li>Add new images to <strong>assets/images/</strong> folder</li>
                  <li>Update image filenames in <strong>index.html</strong></li>
                  <li>Keep image names simple (no spaces)</li>
                  <li>Use PNG or JPG format</li>
                </ol>
              </div>

              <div className={styles.customizeSection}>
                <h3>⚠️ What NOT to Edit</h3>
                <ul>
                  <li>❌ <strong>config.json</strong> - This breaks your website</li>
                  <li>❌ Don't use Word or Google Docs (corrupts code)</li>
                  <li>❌ Don't remove important div tags or closing tags</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className={styles.tabContent}>
            <h2>Step 4: Deploy Your Website Online</h2>
            <p className={styles.introText}>
              Choose one of these hosting options to make your website live on the internet:
            </p>

            <div className={styles.deploymentGrid}>
              {deploymentOptions.map((option, idx) => (
                <div key={idx} className={styles.deploymentCard}>
                  <div className={styles.cardHeader}>
                    <h3>{option.name}</h3>
                    <span className={styles.difficulty}>{option.difficulty}</span>
                  </div>

                  <div className={styles.cost}>💰 {option.cost}</div>
                  <p className={styles.description}>{option.description}</p>

                  <div className={styles.steps}>
                    <h4>Steps:</h4>
                    <ol>
                      {option.steps.map((step, sidx) => (
                        <li key={sidx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className={styles.pros}>
                    <h4>Why this option:</h4>
                    <ul>
                      {option.pros.map((pro, pidx) => (
                        <li key={pidx}>✨ {pro}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.customDomainBox}>
              <h3>🏠 Deploy to Shared Hosting (Traditional Web Host)</h3>
              <p>Get your website live with affordable shared hosting from providers like Hostinger, SiteGround, Bluehost, or Namecheap</p>

              <h4>Step 1 — Buy your domain name</h4>
              <p>Purchase a domain from:</p>
              <ul style={{ marginLeft: '20px' }}>
                <li>🔗 Namecheap (~$10/year)</li>
                <li>🔗 GoDaddy (~$12/year)</li>
                <li>🔗 Google Domains (~$12/year)</li>
                <li>🔗 Any domain registrar you prefer</li>
              </ul>
              <p style={{ marginTop: '12px' }}>Keep your domain registrar login info saved for Step 4</p>

              <h4>Step 2 — Buy hosting</h4>
              <p>Purchase a hosting plan from:</p>
              <ul style={{ marginLeft: '20px' }}>
                <li>🔗 Hostinger</li>
                <li>🔗 SiteGround</li>
                <li>🔗 Bluehost</li>
                <li>🔗 Namecheap Shared Hosting</li>
              </ul>
              <p style={{ marginTop: '12px', color: '#ffbe0b' }}>You will receive:</p>
              <ul style={{ marginLeft: '20px' }}>
                <li>A cPanel login</li>
                <li>An FTP username & password</li>
              </ul>

              <h4>Step 3 — Upload your dist folder</h4>
              <p>You have two upload options:</p>

              <div style={{ marginLeft: '20px' }}>
                <p><strong>A) Upload via cPanel File Manager</strong></p>
                <ol style={{ marginLeft: '20px' }}>
                  <li>Log into cPanel</li>
                  <li>Go to File Manager</li>
                  <li>Open the folder: <code style={{ background: '#000', padding: '4px 8px', borderRadius: '4px' }}>public_html/</code></li>
                  <li>Inside public_html:
                    <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                      <li>Delete existing placeholder files</li>
                      <li>Upload your dist/ folder contents</li>
                      <li>Make sure index.html is directly inside public_html</li>
                    </ul>
                  </li>
                </ol>

                <p style={{ marginTop: '16px' }}><strong>B) Upload via FTP (FileZilla)</strong></p>
                <ol style={{ marginLeft: '20px' }}>
                  <li>Open FileZilla</li>
                  <li>Enter your FTP host, username, password</li>
                  <li>Connect</li>
                  <li>Navigate to <code style={{ background: '#000', padding: '4px 8px', borderRadius: '4px' }}>public_html/</code></li>
                  <li>Drag your dist/ folder contents into it</li>
                </ol>
              </div>

              <h4>Step 4 — Connect your domain</h4>
              <p>Usually automatic, because hosting providers include domain setup.</p>
              <p style={{ marginTop: '12px' }}>If not:</p>
              <ul style={{ marginLeft: '20px' }}>
                <li>Go to your domain provider → DNS → Change nameservers to the ones your hosting gave you</li>
              </ul>
            </div>
          </div>
        )}

        {/* Promote Tab */}
        {activeTab === 'promote' && (
          <div className={styles.tabContent}>
            <h2>Step 5: Promote Your Website</h2>

            <div className={styles.promoteSection}>
              <h3>📱 Social Media</h3>
              <div className={styles.promoteList}>
                <div className={styles.promoteItem}>
                  <strong>Twitter/X</strong>
                  <p>Share screenshots, meme videos, and your website link. Use crypto hashtags: #Memecoin #CryptoMeme</p>
                </div>
                <div className={styles.promoteItem}>
                  <strong>TikTok</strong>
                  <p>Create short videos showing your meme coin website. Trending sounds = more views!</p>
                </div>
                <div className={styles.promoteItem}>
                  <strong>Discord</strong>
                  <p>Join crypto communities and share your project in promotion channels</p>
                </div>
                <div className={styles.promoteItem}>
                  <strong>Telegram</strong>
                  <p>Create group for your community. Post daily updates and meme content</p>
                </div>
              </div>
            </div>

            <div className={styles.promoteSection}>
              <h3>👥 Communities</h3>
              <ul>
                <li><strong>Reddit:</strong> r/Memecoins, r/Crypto, r/CryptoCurrency</li>
                <li><strong>Discord:</strong> Crypto communities, meme coin servers</li>
                <li><strong>Telegram:</strong> Crypto trader groups, meme coin channels</li>
              </ul>
              <p className={styles.note}>Tip: Share value first! Post memes and updates, don't just spam your link.</p>
            </div>

            <div className={styles.promoteSection}>
              <h3>💡 Marketing Tips</h3>
              <ul>
                <li>✅ Create eye-catching thumbnails/previews</li>
                <li>✅ Post consistently (daily or 3x weekly)</li>
                <li>✅ Engage with similar projects</li>
                <li>✅ Use trending hashtags and sounds</li>
                <li>✅ Host contests/giveaways</li>
                <li>✅ Collaborate with other meme token creators</li>
                <li>✅ Share behind-the-scenes content</li>
                <li>✅ Get featured on meme coin aggregators</li>
              </ul>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className={styles.tabContent}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {faqItems.map((item, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{item.question}</span>
                    <span className={styles.faqIcon}>{expandedFaq === idx ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === idx && (
                    <div className={styles.faqAnswer}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.nextSteps}>
        <h2>🎯 You're All Set!</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <strong>Extract</strong> your ZIP file
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <strong>Preview</strong> locally in browser
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <strong>Customize</strong> colors and text
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <strong>Deploy</strong> to Vercel/Netlify
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>5</div>
            <strong>Promote</strong> on social media
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Good luck with your meme website! 🚀</p>
        <p>Have questions? Check the FAQ tab or visit our documentation.</p>
      </div>
    </div>
  );
};
