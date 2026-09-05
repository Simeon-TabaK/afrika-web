import React, { useState, useRef, useEffect } from 'react';
import { AuthService } from '../services/authService';
import type { UserRole } from '../types';
import type { AuthUserProfile } from '../models/auth';
import { 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AuthViewProps {
  onAuthSuccess: (user: AuthUserProfile, role: UserRole) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [resendCooldown, setResendCooldown] = useState(30);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: any;
    if (step === 'otp' && resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  // Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Veuillez saisir une adresse email valide.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const res = await AuthService.requestOtp(email);
    setIsLoading(false);

    if (res.success) {
      setStep('otp');
      setResendCooldown(30);
      setStatusMessage({ type: 'success', text: res.message });
      // Focus first OTP input
      setTimeout(() => otpInputRefs.current[0]?.focus(), 150);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Handle OTP digit changes
  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);

    // Auto advance
    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const split = pasteData.split('');
      setOtpDigits(split);
      otpInputRefs.current[5]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setStatusMessage({ type: 'error', text: 'Veuillez saisir les 6 chiffres du code OTP.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const res = await AuthService.verifyOtp(email, fullOtp);
    setIsLoading(false);

    if (res.success && res.user) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onAuthSuccess(res.user!, res.user!.role);
      }, 500);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Social Logins
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    const res = await AuthService.loginWithGoogle();
    setIsLoading(false);
    if (res.success && res.user) {
      onAuthSuccess(res.user, 'user');
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    const res = await AuthService.loginWithApple();
    setIsLoading(false);
    if (res.success && res.user) {
      onAuthSuccess(res.user, 'user');
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Quick Demo Fast-Selection (Authenticates via real OTP pipeline)
  const handleQuickDemo = async (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setIsLoading(true);
    setStatusMessage(null);
    const res = await AuthService.requestOtp(demoEmail);
    setIsLoading(false);
    if (res.success) {
      setStep('otp');
      setResendCooldown(30);
      setStatusMessage({
        type: 'success',
        text: `Compte [${role}] : Demande OTP transmise à ${demoEmail}. Saisissez le code pour valider l'authentification.`,
      });
      setTimeout(() => otpInputRefs.current[0]?.focus(), 150);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #14280B 0%, #0c1507 50%, #060a03 100%)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Glow Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '550px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(109, 190, 71, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Glassmorphism Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(24, 38, 18, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(109, 190, 71, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          padding: '36px 32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Brand & Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '8px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 24px rgba(109, 190, 71, 0.3)',
              marginBottom: '16px',
            }}
          >
            <img
              src="/afrikalogoicon.png"
              alt="Afri'Ka"
              style={{ width: '56px', height: '56px', objectFit: 'contain' }}
            />
          </div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 6px 0',
              letterSpacing: '-0.3px',
            }}
          >
            Afri'Ka
          </h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
            {step === 'email' ? 'Content de te revoir !' : 'Vérifiez le code OTP'}
          </p>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              background:
                statusMessage.type === 'success'
                  ? 'rgba(76, 175, 80, 0.15)'
                  : 'rgba(244, 67, 54, 0.15)',
              border: `1px solid ${
                statusMessage.type === 'success' ? '#4CAF50' : '#F44336'
              }`,
              color: statusMessage.type === 'success' ? '#81C784' : '#E57373',
            }}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* STEP 1: EMAIL REQUEST */}
        {step === 'email' ? (
          <form onSubmit={handleRequestOtp}>
            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '8px',
                }}
              >
                Entrez votre email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@domaine.com"
                  required
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '13px 14px 13px 44px',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(109, 190, 71, 0.3)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#6B9E41')}
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(107, 158, 65, 0.3)')
                  }
                />
              </div>
            </div>

            {/* Remember Me */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    accentColor: '#6B9E41',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                  }}
                />
                Se rappeler
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6B9E41 0%, #437D28 100%)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(109, 190, 71, 0.4)',
                opacity: isLoading ? 0.7 : 1,
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={18} className="spin-animation" />
                  <span>Envoi du code...</span>
                </>
              ) : (
                <>
                  <span>Recevoir le code OTP</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Social Logins Divider (like Flutter login_otp) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '28px 0 20px 0',
                gap: '12px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'rgba(255,255,255,0.15)',
                }}
              />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                Se connecter avec
              </span>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'rgba(255,255,255,0.15)',
                }}
              />
            </div>

            {/* Social Logins: Gmail & Apple iCloud */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '11px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')
                }
              >
                <img
                  src="/google.png"
                  alt="Google"
                  style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                />
                <span>Gmail</span>
              </button>

              <button
                type="button"
                onClick={handleAppleLogin}
                disabled={isLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '11px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')
                }
              >
                <img
                  src="/apple.png"
                  alt="Apple"
                  style={{
                    width: '18px',
                    height: '18px',
                    objectFit: 'contain',
                    filter: 'invert(1)',
                  }}
                />
                <span>iCloud</span>
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION (like Flutter verify_otp) */
          <form onSubmit={handleVerifyOtp}>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  margin: '0 0 6px 0',
                }}
              >
                Un code à 6 chiffres a été envoyé à :
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(109, 190, 71, 0.15)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(109, 190, 71, 0.3)',
                  color: '#81C784',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <span>{email}</span>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6B9E41',
                    cursor: 'pointer',
                    fontSize: '11px',
                    textDecoration: 'underline',
                    padding: 0,
                    marginLeft: '4px',
                  }}
                >
                  Modifier
                </button>
              </div>
            </div>

            {/* 6 Digits Boxes */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '24px',
              }}
              onPaste={handlePaste}
            >
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  style={{
                    width: '46px',
                    height: '54px',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.4)',
                    border: digit
                      ? '2px solid #6B9E41'
                      : '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontSize: '22px',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                />
              ))}
            </div>

            {/* Quick Fill OTP Helper */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => {
                  setOtpDigits(['1', '2', '3', '4', '5', '6']);
                  setTimeout(() => otpInputRefs.current[5]?.focus(), 50);
                }}
                style={{
                  background: 'rgba(109, 190, 71, 0.15)',
                  border: '1px dashed rgba(109, 190, 71, 0.4)',
                  color: '#81C784',
                  fontSize: '12px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={13} />
                <span>Saisir le code de test reçu (123456)</span>
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                fontSize: '13px',
              }}
            >
              <button
                type="button"
                onClick={() => setStep('email')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                }}
              >
                <ArrowLeft size={16} />
                <span>Retour</span>
              </button>

              {resendCooldown > 0 ? (
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Renvoyer dans {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6B9E41',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Renvoyer le code</span>
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6B9E41 0%, #437D28 100%)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(109, 190, 71, 0.4)',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={18} className="spin-animation" />
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Vérifier & Accéder</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Quick Demo Fast-Access Bar */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#81C784',
              marginBottom: '10px',
              fontWeight: 600,
            }}
          >
            <Sparkles size={14} />
            <span>Accès Rapide Démo & Audit RBAC :</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => handleQuickDemo('super_admin', 'superadmin@afrika.com')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(156, 39, 176, 0.2)',
                border: '1px solid #9C27B0',
                color: '#E1BEE7',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickDemo('donations_agent', 'agent.donations@afrika.com')
              }
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(33, 150, 243, 0.2)',
                border: '1px solid #2196F3',
                color: '#90CAF9',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              💰 Agent Dons
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickDemo('communities_agent', 'agent.comm@afrika.com')
              }
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(76, 175, 80, 0.2)',
                border: '1px solid #4CAF50',
                color: '#A5D6A7',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🌍 Agent Communautés
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('user', 'entrepreneur@kintech.cd')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 215, 0, 0.2)',
                border: '1px solid #FFD700',
                color: '#FFF59D',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🚀 Membre / Entrepreneur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
